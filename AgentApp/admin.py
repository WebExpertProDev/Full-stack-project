from django.contrib import admin
from .models import AgentUser


@admin.register(AgentUser)
class AgentUserAdmin(admin.ModelAdmin):
    list_display = ['full_name', 'email', ]
    search_fields = ('full_name', 'email', )
