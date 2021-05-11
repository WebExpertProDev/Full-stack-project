from django.db import models
from .managers import ActivityLogManager
from common.choices import LogSeverity


class ActivityLog(models.Model):
    objects = ActivityLogManager()
    user = models.ForeignKey('HouseeApp.HouseeUser', related_name='logs', on_delete=models.CASCADE, null=True, blank=True)
    ip_address = models.CharField(max_length=30, null=True, blank=True)
    message = models.CharField(max_length=4096, null=True, blank=True)
    where = models.CharField(max_length=200, null=False, blank=False)
    context = models.TextField(max_length=4096, null=True, blank=True)
    severity = models.CharField(choices=LogSeverity.CHOICES, default=LogSeverity.Low, max_length=10)
    date_created = models.DateTimeField(auto_now_add=True)


    class Meta:
        verbose_name = 'Activity Log'
        verbose_name_plural = 'Activity Logs'
        ordering = ['-date_created']

    # def __str__(self):
    #     return printself.ip_address
