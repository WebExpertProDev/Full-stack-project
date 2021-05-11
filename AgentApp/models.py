from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.postgres.fields import ArrayField
from common.choices import Language


class AgentUser(get_user_model()):
    biography = models.TextField(max_length=3000, null=False, blank=False)
    start_work_date = models.DateField(null=False, blank=False)
    is_verified = models.BooleanField(null=False, blank=False) #TODO: This field should be read_only by an agent and should be only set by website admin
    is_visible = models.BooleanField(default=True)
    is_union_member = models.BooleanField(default=False)
    is_premium = models.BooleanField(default=False)
    has_license = models.BooleanField(null=False, blank=False)
    is_suggested = models.BooleanField(null=False, blank=False) #TODO: This field should be read_only by an agent and should be only set by website admin
    id_card_file = models.OneToOneField('CloudApp.CloudFile', related_name='agent_user', on_delete=models.CASCADE, null=False, blank=False)
    licence_card_file = models.OneToOneField('CloudApp.CloudFile', related_name='agent_user', on_delete=models.CASCADE, null=False, blank=False)
    languages = ArrayField(models.PositiveSmallIntegerField(choices=Language.CHOICES), default=list)


# reviews on an Agent
class AgentReview(models.Model):
    reviewer = models.ForeignKey(get_user_model(), related_name='posted_reviews', on_delete=models.SET_NULL)
    reviewee = models.ForeignKey('AgentUser', related_name='received_reviews', on_delete=models.SET_NULL)
    content = models.CharField(max_length=200, null=False, blank=False)
    is_editable = models.BooleanField(default=True) #TODO: this should be read_only from the Agent side
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    # TODO: Amin please add the rest

