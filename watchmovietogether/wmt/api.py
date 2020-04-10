from .models import GroupExtend
from rest_framework import viewsets, permissions
from .serializers import GroupSerializer

# Group Viewset
class GroupViewSet(viewsets.ModelViewSet):
    #queryset = NewGroupManager.objects.all()
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = GroupSerializer

    # overwrite getQueryset method because we only want return the groups of the authenticated user
    def get_queryset(self):
        return self.request.user.group_owned.all()
    
    # save the group owner when create group
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

