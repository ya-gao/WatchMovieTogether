from rest_framework import serializers
from .models import Invitation

# Invitation Serializer
class InvitationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invitation
        fields = "__all__"