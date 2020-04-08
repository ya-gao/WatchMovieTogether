from .models import Group
from rest_framework import viewsets, permissions
from .serializers import GroupSerializer

# # NewUserManager Viewset
# class NewUserManagerViewSet(viewsets.ModelViewSet):
#     queryset = NewUserManager.objects.all()
#     permission_classes = [
#         permissions.AllowAny
#     ]
#     serializer_class = NewUserManagerSerializer

# # Event Viewset
# class EventViewSet(viewsets.ModelViewSet):
#     queryset = Event.objects.all()
#     permission_classes = [
#         permissions.AllowAny
#     ]
#     serializer_class = EventSerializer

# NewGroupManager Viewset
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

    

# # Movie Viewset
# class MovieViewSet(viewsets.ModelViewSet):
#     queryset = Movie.objects.all()
#     permission_classes = [
#         permissions.AllowAny
#     ]
#     serializer_class = MovieSerializer
