from django.contrib import admin
from .models import TenantUser


@admin.register(TenantUser)
class TenantUserAdmin(admin.ModelAdmin):
    list_display = ['full_name', 'email', ]
    search_fields = ('full_name', 'email', )
