from django.db import models
from django.contrib.postgres.fields import ArrayField
from .clients.firebase import FirebaseCloudMessagingManager
from .managers import UserFcmTokenManager
from .managers import SmsManager
from django.utils import timezone
from django.core.exceptions import ValidationError
from LoggerApp.models import ActivityLog
from .clients.sib import SibSmsClient
import random


class UserFcmToken(models.Model):
    objects = UserFcmTokenManager()
    user = models.OneToOneField('HouseeApp.HouseeUser', on_delete=models.CASCADE, null=False, blank=False)
    fcm_tokens = ArrayField(models.CharField(max_length=4096), default=list, blank=True)

    # notification_object sample: {'message_body': 'dot dot dot', 'message_title': 'titleeee'}
    def notify_user_devices(self, notification_object):
        if len(self.fcm_tokens) == 0:
            raise Exception('fcm_tokens is empty')
        return FirebaseCloudMessagingManager.notify_all_devices(registration_ids=self.fcm_tokens, **notification_object)

    def add_fcm_token(self, fcm_token):
        if fcm_token not in self.fcm_tokens:
            self.fcm_tokens.append(fcm_token)
            self.save()

    def remove_fcm_token(self, fcm_token):
        if fcm_token in self.fcm_tokens:
            self.fcm_tokens.remove(fcm_token)
            self.save()


class SmsCode(models.Model):
    objects = SmsManager()
    email = models.EmailField(max_length=100, null=True, blank=True) #TODO: turn to False False in future
    phone_number = models.CharField(max_length=20, null=False, blank=False, unique=True)
    verification_code = models.PositiveIntegerField(null=True, blank=True)
    ip_address = models.CharField(max_length=30, null=True, blank=True)
    last_code_sent = models.DateTimeField(null=True, blank=True)
    num_sms_sent = models.IntegerField(default=0, null=True, blank=True)
    date_created = models.DateTimeField(null=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.id:
            self.date_created = timezone.now()
        return super(SmsCode, self).save(*args, **kwargs)

    def send_verification_code(self):
        minutes_ago_date = timezone.now() - timezone.timedelta(minutes=1)
        if not self.last_code_sent or self.last_code_sent <= minutes_ago_date:
            try:
                client = SibSmsClient('+1{}'.format(self.phone_number))
                self.verification_code = random.randint(1001, 9999)
                content = 'Your verification code is: {} \nhttps://housee.ai'.format(self.verification_code)
                response = client.send_transactional_sms(content)
                if response.status_code == 201:
                    self.last_code_sent = timezone.now()
                    self.num_sms_sent += 1
                    self.save()
                else:
                    ActivityLog.objects.create(message=str(response), where='sib response code not 200')
            except Exception as e: #TODO: make a clear exception, add ip address
                ActivityLog.objects.create(message=str(e), where='send_verification_code failed')
                raise ValidationError('could not send sms to the provided phone number.')
            return True
        else:
            raise ValidationError('Sms has been already sent. Please wait for at least 1 minute.' +
                                     ' If didnt get any codes, request again')

    class Meta:
        verbose_name = 'Sms Code'
        verbose_name_plural = 'Sms Codes'
        ordering = ['-date_created']

    def __str__(self):
        return self.phone_number
