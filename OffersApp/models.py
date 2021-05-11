from django.db import models


class SaleOffer(models.Model):
    """
    total_price, user_price, market_price, and charge are all accurate to cents (1000 means $10)
    """
    total_price = models.IntegerField(null=False, blank=False) # accurate to cents (1000 means $10)
    user_price = models.IntegerField(null=False, blank=False)
    market_price = models.IntegerField(null=False, blank=False)
    charge = models.IntegerField(null=False, blank=False)
    has_loan = models.BooleanField(null=False, blank=False)
    # TODO: validation for both has_loan & loan_amount. if loan_amount exists, has_loan should be True
    loan_amount = models.IntegerField(null=True, blank=True)
    ownership_percentage = models.SmallIntegerField(null=True, blank=True) # TODO: validation for this (0 - 100)
    is_furnished = models.BooleanField(null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    pass


class RentOffer(models.Model):
    """
    mortgage_fee, rent_fee, and charge are all accurate to cents (1000 means $10)
    """
    mortgage_fee = models.IntegerField(null=False, blank=False)
    rent_fee = models.IntegerField(null=False, blank=False)
    charge = models.IntegerField(null=False, blank=False)
    has_resident_owner = models.BooleanField(null=False, blank=False)
    num_max_residents = models.SmallIntegerField(null=False, blank=False)
    is_furnished = models.BooleanField(null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class PresaleOffer(models.Model):
    """
    total_price is accurate to cents (1000 means $10)
    """
    total_price = models.IntegerField(null=False, blank=False)
    has_loan = models.BooleanField(null=False, blank=False)
    is_furnished = models.BooleanField(null=False, blank=False)
    ownership_percentage = models.SmallIntegerField(null=True, blank=True) # TODO: validation for this (0 - 100)
    progress_percentage = models.SmallIntegerField(null=True, blank=True) # TODO: validation for this (0 - 100)
    delivery_date = models.DateField(null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
