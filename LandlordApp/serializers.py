from rest_framework import serializers
from .models import LandlordUser


class LandlordGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = LandlordUser
        exclude = ('id', )

    def create(self, validated_data):
        return LandlordUser.objects.create(**validated_data)
