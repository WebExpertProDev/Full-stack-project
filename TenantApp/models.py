from django.db import models
from django.contrib.auth import get_user_model
from PublicApp.models import Estate


class TenantUser(get_user_model()):
    pass


class TenantEstateWishList(models.Model):
    """
    estates_wishlist from Tenant POV: All estates I (as a tenant) added to my wishlist
    """
    tenant = models.ForeignKey('TenantUser', related_name='estates_wishlist', on_delete=models.SET_NULL)

    """
    wished_tenants from Estate POV: Tenants who added this estate to their wishlist
    """
    estate = models.ForeignKey(Estate, related_name='wished_tenants', on_delete=models.SET_NULL)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
