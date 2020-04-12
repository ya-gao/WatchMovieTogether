from .models import GroupExtend
from rest_framework import viewsets, permissions
from .serializers import GroupSerializer
from rest_framework.response import Response

# Group Viewset
class GroupViewSet(viewsets.ModelViewSet):
    #queryset = NewGroupManager.objects.all()
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = GroupSerializer

    # overwrite getQueryset method because we only want return the groups of the authenticated user
    def get_queryset(self):
        # return [[0],[1]]
        groups =  self.request.user.group_owned.all()
        # for group in groups:
        #     group.owner = group.owner.username
        #     newMember = []
        #     for member in group.members:
        #         newMember.append(member.username)
        #     print(newMember)
        #     print(group.owner)
        return groups
    
    # save the group owner when create group
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def update(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        print(serializer)
        print("finish print\n\n")
        serializer.is_valid(raise_exception=True)  # make sure it's valid
        
        group = serializer.save()  # save the group into database
        
        return Response(group.data)
    # def partial_update(self, request, *args, **kwargs):
    #         instance = self.get_object()
    #         serializer = self.serialize(instance, data=request.data, partial=True)
    #         serializer.is_valid(raise_exception=True)
    #         #.... Your code ....
    #         serializer.save()
    #         return Response(serializer.data)