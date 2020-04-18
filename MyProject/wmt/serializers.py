# Serializers allow complex data such as querysets and model instances to be converted to 
# native Python datatypes that can then be easily rendered into JSON
from rest_framework import serializers
from .models import GroupExtend, Event, Vote
from django.contrib.auth.models import User

# # NewUserManager Serializer
# class NewUserManagerSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = NewUserManager
#         fields = '__all__'

class VoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vote
        fields = '__all__'

# Event Serializer
class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'

    def create(self, validated_data):
        print(validated_data)


# NewGroupManager Serializer
class UserNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username',)


class ShowGroupSerializer(serializers.ModelSerializer):
    owner = UserNameSerializer()
    members = UserNameSerializer(many=True)

    class Meta:
        model = GroupExtend
        fields = '__all__'


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroupExtend
        fields = '__all__'
    # def create(self, validated_data):
    #     print("creating group")
    #     owner = validated_data.pop('owner')
    #     members = validated_data.pop('members')

    #     group = GroupExtend.objects.create(owner=owner, **validated_data)
    #     for member in members:
    #         group.members.add(member)

    #     return group


# # Movie Serializer
# class MovieSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Movie
#         fields = '__all__'