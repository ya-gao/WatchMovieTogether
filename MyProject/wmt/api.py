from .models import GroupExtend
from rest_framework import viewsets, permissions
from .serializers import ShowGroupSerializer, GroupSerializer
from rest_framework.response import Response


class GroupInViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = ShowGroupSerializer

    def get_queryset(self):
        # print("I'm getting something")
        # print(GroupExtend.objects.filter(members__in=[self.request.user]))
        return GroupExtend.objects.filter(members__in=[self.request.user])
    

class GorupUnsubscribeViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = GroupSerializer

    def update(self, request, *args, **kwargs):
        print("perform update")
        print(request.data)
        # print(request)
        # group = GroupExtend.objects.get(id=self.action.id)
        # print(group)
        # new_user = User.objects.get(username=request.user.username) 
        # group.members.remove(new_user)
        # group.save()
        return Response()


class GroupManageViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = GroupSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        group = self.request.user.group_owned.all()
        return group


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
    

