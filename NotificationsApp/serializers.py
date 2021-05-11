from rest_framework import serializers
from .models import SmsCode


class SmsCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = SmsCode
        exclude = ('id', )

    def create(self, validated_data):
        return SmsCode.objects.create(**validated_data)
