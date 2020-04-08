# Serializers allow complex data such as querysets and model instances to be converted to 
# native Python datatypes that can then be easily rendered into JSON
from rest_framework import serializers
from .models import Group

# # NewUserManager Serializer
# class NewUserManagerSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = NewUserManager
#         fields = '__all__'

# # Event Serializer
# class EventSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Event
#         fields = '__all__'

# NewGroupManager Serializer
class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = '__all__'

# # Movie Serializer
# class MovieSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Movie
#         fields = '__all__'