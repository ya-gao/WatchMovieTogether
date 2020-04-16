from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from datetime import datetime
from movies.models import Movie


# Create your models here.
class GroupExtend(models.Model):
    group_name = models.CharField(max_length=100, default="New Group")
    owner = models.ForeignKey(User, related_name="group_owned", on_delete=models.CASCADE, null=True)
    members = models.ManyToManyField(User, blank=True)

    def __str__(self):
        return self.group_name


class Event(models.Model):
    group = models.ForeignKey(GroupExtend, default=None, on_delete=models.CASCADE)
    event_name = models.CharField(max_length=200)
    event_location = models.CharField(max_length=200)  # may change in the future
    event_start_vote_time = models.DateTimeField("start vote time", default=datetime.now)
    event_end_vote_time = models.DateTimeField("end vote time", default=datetime.now)
    event_time = models.DateTimeField("event time", default=datetime.now)
    movies = models.ManyToManyField(Movie, blank=True)

    def __str__(self):
        return self.event_name


