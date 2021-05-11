from django.db import models
from django.contrib.auth import get_user_model
from common.choices import AdvertisementStatus, AdvertisementType
from address.models import AddressField
from django.core.exceptions import ValidationError

class LandlordUser(get_user_model()):
    phone_number = models.CharField(max_length=20, null=False, blank=False, unique=True)
    register_address = AddressField(related_name='+', blank=False, null=False)
    birthday = models.DateField(verbose_name="Birthday", null=False)

    skype_id = models.CharField(max_length=128, blank=True, null=True, default='')

    is_verified = models.BooleanField(null=False, blank=False)
    is_visible = models.BooleanField(default=True)
    is_premium = models.BooleanField(default=False)

    # Check if each user can multiple agents!
    agent = models.ForeignKey('AgentApp.AgentUser', related_name='client_list', on_delete=models.DO_NOTHING, blank=True, null=True, default=None)


class TimeSlot(models.Model):
    start_time = models.DateTimeField(blank=False, null=False)
    end_time = models.DateTimeField(blank=False, null=False)
    max_people = models.IntegerField(default=1)
    open_house = models.ForeignKey('OpenHouse', on_delete=models.CASCADE, related_name='time_slots', blank=False, null=False)
    visitors = models.ManyToManyField('HouseeApp.HouseeUser')

    def add_visitor(self, new_visitor):
        if self.visitors.count() >= self.max_people:
            return False
        self.visitors.add(new_visitor)
        self.save()


class OpenHouse(models.Model):
    estate = models.ForeignKey('EstateAdvertisement', on_delete=models.CASCADE, related_name='open_house', blank=False, null=False)

    def get_time_slots(self):
        return sorted(self.time_slots.all(), key=lambda x: x.start_time)

class EstateAdvertisement(models.Model):
    """
    get number of ad likes by doing self.ad_likes.count()
    """
    # estate = models.ForeignKey('Estate', related_name='estate_ads', on_delete=models.CASCADE, blank=False, null=False)
    owner = models.ForeignKey('LandlordUser', related_name='ads', on_delete=models.CASCADE, blank=False, null=False)
    description = models.TextField(max_length=5000, null=False, blank=False)
    is_special = models.BooleanField(default=False)
    pets_allowed = models.BooleanField(default=False)

    status = models.CharField(max_length=20, choices=AdvertisementStatus.CHOICES, null=True, blank=True)
    type = models.CharField(max_length=20, choices=AdvertisementType.CHOICES, null=True, blank=True)
    is_location_visible = models.BooleanField(blank=False, null=False)
    evacuation_date = models.DateField(null=False, blank=False)
    published_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField(null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    bedrooms = models.IntegerField()
    bathrooms = models.DecimalField(max_digits=2, decimal_places=1)
    garage = models.IntegerField(default=0)
    sqft = models.IntegerField()
    lot_size = models.DecimalField(max_digits=5, decimal_places=1, blank=True, null=True)

    # isVisibleInAr
    # hasSmsNotifications
    # hasEmailNotifications
    # isSeen
    # visitedCount
    # agents



    def get_images(self):
        return self.estate_media.all()

    def get_features(self):
        return self.estate_feature.all()

    def clean(self):
        if self.get_images().count() > 10:
            raise ValidationError('Exceeding total number of images allowed!')

        features_list = list( x.value for x in self.get_features())
        if len(features_list) > 32:
            raise ValidationError('Exceeding total number of features!')

        if len(set(features_list)) != len(features_list):
            raise ValidationError('Duplicated value in feature list')

        if self.expires_at < self.published_at:
            raise ValidationError('Expiry date should be greater than publishing date!')

class EstateMedia(models.Model):
    image = models.ImageField(upload_to='listings/%Y/%m/%d/', blank=True, null=True, default=None)
    image_360 = models.ImageField(upload_to='listings/360/%Y/%m/%d/', blank=True, null=True, default=None)
    is_360 = models.BooleanField(default=False)
    estate = models.ForeignKey(EstateAdvertisement, related_name='estate_media', on_delete=models.CASCADE, blank=True, null=True, default=None)


class features(models.Model):
    value =  models.CharField(max_length=64)
    estate = models.ForeignKey(EstateAdvertisement, related_name='estate_feature', on_delete=models.CASCADE, blank=True,
                               null=True, default=None)

class TenantAdvertisementLike(models.Model):
    advertisement = models.ForeignKey('EstateAdvertisement', related_name='ad_likes', on_delete=models.CASCADE, null=False, blank=False)
    tenant = models.ForeignKey('TenantApp.TenantUser', related_name='ads_liked', on_delete=models.CASCADE, null=False, blank=False)
