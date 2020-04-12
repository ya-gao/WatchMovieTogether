from .models import GroupExtend
from rest_framework import viewsets, permissions
from .serializers import ShowGroupSerializer, GroupSerializer
from rest_framework.response import Response


class GroupManageViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = GroupSerializer

    # overwrite getQueryset method because we only want return the groups of the authenticated user
    def get_queryset(self):
        # return [[0],[1]]
        groups = self.request.user.group_owned.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


# Group Viewset
class GroupViewSet(viewsets.ModelViewSet):
    #queryset = NewGroupManager.objects.all()
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = ShowGroupSerializer

    # overwrite getQueryset method because we only want return the groups of the authenticated user
    def get_queryset(self):
        # return [[0],[1]]
        groups = self.request.user.group_owned.all()
        # for group in groups:
        #     group.owner = group.owner.username
        #     newMember = []
        #     for member in group.members:
        #         newMember.append(member.username)
        #     print(newMember)
        #     print(group.owner)
        return groups
    

