from django.db import models
from common.choices import City, Country, ResidentialEstatePropertyType


class Estate(models.Model):
    """
    get Estate photos through : self.estate_photos
    """
    luxury_percentage = models.SmallIntegerField(null=True, blank=True) # TODO: validation for this (0 - 100)
    elevation = models.SmallIntegerField(null=True, blank=True)
    is_usable = models.BooleanField(null=True, blank=True)
    building_age = models.SmallIntegerField(null=True, blank=True)
    main_photo = models.OneToOneField('EstatePhoto', related_name='estate', on_delete=models.CASCADE, null=False, blank=False)
    num_owners = models.SmallIntegerField(null=True, blank=True)
    is_rebuilt = models.BooleanField(null=True, blank=True)
    # exists if is_rebuilt is True... TODO: needs validation for these two fields
    rebuilt_date = models.DateField(null=True, blank=True)
    width = models.IntegerField(null=True, blank=True)
    length = models.IntegerField(null=True, blank=True)
    # TODO: Amin please add the rest
    # area
    # landArea
    # rebuiltPart <>
    # landOwnershipArea
    location = models.ForeignKey('Location', related_name='estates', on_delete=models.CASCADE, null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class ResidentialEstate(Estate):
    num_floors = models.SmallIntegerField(null=True, blank=True)
    num_bathrooms = models.SmallIntegerField(null=True, blank=True)
    num_bedrooms = models.SmallIntegerField(null=True, blank=True)
    property_type = models.CharField(max_length=20, choices=ResidentialEstatePropertyType.CHOICES, null=True, blank=True)


class GardenEstate(Estate):
    has_building = models.BooleanField(null=False, blank=False)


class FactoryEstate(Estate):
    has_building = models.BooleanField(null=False, blank=False)
    num_ceiling_areas = models.SmallIntegerField(null=True, blank=True)
    # TODO: Amin please add the rest
    # ceiling_area = ?


class CommercialEstate(Estate):
    is_good_will = models.BooleanField(null=True, blank=True)


class EstatePhoto(models.Model):
    estate = models.ForeignKey('Estate', related_name='estate_photos', on_delete=models.CASCADE, blank=False, null=False)
    title = models.CharField(max_length=80, null=True, blank=True)
    file = models.OneToOneField('CloudApp.CloudFile', related_name='estate_photo', on_delete=models.CASCADE, null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    # TODO: Amin please add the rest
    # connect it to Aws S3


class Location(models.Model):
    street = models.CharField(max_length=200, null=False, blank=False) # 1288 West Georgia Street
    city = models.CharField(max_length=100, choices=City.CHOICES, null=False, blank=False) # Vancouver
    state = models.CharField(max_length=100, null=False, blank=False) # British Columbia
    zip_code = models.CharField(max_length=10, null=True, blank=True) # maybe regional zip_code later? (Canada vs US)
    country = models.CharField(max_length=100, choices=Country.CHOICES, null=False, blank=False) # Canada
    printable_address = models.CharField(max_length=400, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


# reviews on an Estate
class EstateReview(models.Model):
    estate = models.ForeignKey('PublicApp.models.Estate', related_name='estate_reviews', on_delete=models.CASCADE, blank=False, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    # TODO: Amin please add the rest



