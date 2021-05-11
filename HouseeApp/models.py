from django.contrib.auth.models import AbstractBaseUser
from django.db import models
from django.utils.translation import ugettext_lazy as _
from .managers import UserManager
from common.choices import UserType, UserRegistrationStatus
from django.core.exceptions import ValidationError


class HouseeUser(AbstractBaseUser):
    objects = UserManager()
    full_name = models.CharField(_("Full Name"), max_length=30, null=False, blank=False)
    email = models.EmailField(_("Email Address"), unique=True, null=True, blank=True)
    phone_number = models.CharField(max_length=15, unique=True, null=True, blank=True)
    user_type = models.CharField(max_length=20, choices=UserType.CHOICES, null=True, blank=True, default=UserType.Admin)
    ip_address = models.GenericIPAddressField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    registration_status = models.PositiveSmallIntegerField(
        choices=UserRegistrationStatus.CHOICES, default=UserRegistrationStatus.Done)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = [] #TODO: should I use this? or set null=False, blank=True?

    def clean(self):
        if not self.email and not self.phone_number:
            raise ValidationError("At least one of email or phone_number is needed")

    def save(self, *args, **kwargs):
        first_creation = not self.id
        self.email = HouseeUser.objects.normalize_email(self.email)
        if first_creation:
            pass
        if not "sha256" in self.password:
            self.set_password(self.password)
        self.full_clean()
        super(HouseeUser, self).save(*args, **kwargs)

    def delete(self, using=None, keep_parents=False, soft_deletion=True):
        super(HouseeUser, self).delete()

    def __str__(self):
        return self.full_name

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    def has_usable_password(self):
        return True

    def get_full_name(self):
        return self.full_name

    @property
    def is_staff(self):
        return self.is_admin

    @property
    def is_superuser(self):
        return self.is_admin

    class Meta:
        app_label = 'HouseeApp'
        verbose_name = 'Housee User'
        verbose_name_plural = 'Housee Users'
