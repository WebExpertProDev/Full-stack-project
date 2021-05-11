from django.contrib import admin
from .models import LandlordUser


@admin.register(LandlordUser)
class LandlordUserAdmin(admin.ModelAdmin):
    list_display = ['full_name', 'email', ]
    search_fields = ('full_name', 'email', )
