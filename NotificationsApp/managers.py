from django.db import models


class UserFcmTokenManager(models.Manager):
    # user: a Housee user object
    # notification_object sample: {'message_body': 'dot dot dot', 'message_title': 'titleeee'}
    def notify_user_devices(self, user_id, notification_object):
        user_fcm_object = self.get_or_create(user_id=user_id)
        return user_fcm_object.notify_user_devices(notification_object)

    def get_or_create(self, user_id):
        try:
            return self.get(user_id=user_id)
        except self.model.DoesNotExist:
            return self.create(user_id=user_id)


from django.db import models


class SmsManager(models.Manager):

    def get_or_create(self, phone_number):
        try:
            return self.get(phone_number=phone_number)
        except:
            return self.create(phone_number=phone_number)

    def send_code_verification_sms(self, phone_number, verification_code):
        # TODO: to be implemented
        pass

    def send_reset_password_sms(self, phone_number, uid, token):
        # TODO: to be implemented
        pass
