from .models import Invitation
from rest_framework import viewsets, permissions, generics
from .serializers import InvitationSerializer
from rest_framework.response import Response
from wmt.models import GroupExtend
from django.contrib.auth.models import User

# viewset basically allows us to create a full CRUD API without having to specigy explicit methods for the functionality

# Invitation Viewset
class InvitationViewSet(viewsets.ModelViewSet):
    #queryset = Invitation.objects.all()
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = InvitationSerializer

    # overwrite getQueryset method because we only want to return the invitation of the authenticated user got
    def get_queryset(self):
        #self.request.user.id.all()
        return Invitation.objects.all().filter(invited_username=self.request.user.username)
    
    # save the inviter when send invitation
    def perform_create(self, serializer):
        serializer.save(inviter_username=self.request.user.username)

    def destroy(self, request, *args, **kwargs):
        print("perform destroy")
        instance = self.get_object()
        print(instance)
        group = GroupExtend.objects.get(id=instance.group_id)
        print(group)
        new_user = User.objects.get(username=instance.invited_username) 
        group.members.add(new_user)
        group.save()
        self.perform_destroy(instance)
        return Response()

