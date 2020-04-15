# Serializers allow complex data such as querysets and model instances to be converted to 
# native Python datatypes that can then be easily rendered into JSON
from rest_framework import serializers
from .models import Movie




# Movie Serializer
class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = '__all__'