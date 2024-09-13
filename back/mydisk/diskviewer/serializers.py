from rest_framework import serializers


class YandexDiskSerializer(serializers.Serializer):
    public_link = serializers.URLField()
