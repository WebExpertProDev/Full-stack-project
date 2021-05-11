from django.contrib.auth.models import BaseUserManager
from django.conf import settings

class UserManager(BaseUserManager):
    def create_user(self, email, phone_number, password='1', full_name='', ip_address=''):
        if password != '1' and len(password) < 8:
            raise ValueError('A password must have at least 8 characters.')

        if not phone_number:
            raise ValueError('A user must have a phone number')

        user = self.model(
            email=email,
            phone_number=phone_number,
            full_name=full_name,
            ip_address=ip_address
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, phone_number, password, full_name=''):
        user = self.create_user(
            email=email,
            phone_number=phone_number,
            password=password,
            full_name=full_name
        )
        user.is_admin = True
        user.save(using=self._db)
        return user

    def change_password(self, user, password):
        user.set_password(password)
        user.save(using=self._db)

    def get_full_name(self):
        return ''

    def get_short_name(self):
        return self.phone_number

    def __str__(self):
        return self.phone_number

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    def has_usable_password(self):
        return True

    @property
    def is_staff(self):
        return self.is_admin

    @property
    def is_superuser(self):
        return self.is_admin

    class Meta:
        app_label = 'HouseeApp'
