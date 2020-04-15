from rest_framework import viewsets, permissions, generics
from .serializers import MovieSerializer
from rest_framework.response import Response
from wmt.models import GroupExtend
from django.contrib.auth.models import User

# viewset basically allows us to create a full CRUD API without having to specigy explicit methods for the functionality

class MovieViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    serializer_class = MovieSerializer

    def perform_create(self, serializer):
        pass

    def get_queryset(self):
        pass
