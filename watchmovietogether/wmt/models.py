from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from datetime import datetime


# Create your models here.


class MMTest(models.Model):
    users = models.ManyToManyField(User)


# class NewUserManager(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
#     group_owned = models.ManyToManyField(Group, verbose_name='group_owned', blank=True)
#    @receiver(post_save, sender=User)
#     def create_user_manager(self, sender, instance, created, **kwargs):
#         if created:
#             NewUserManager.objects.create(user=instance)

#     @receiver(post_save, sender=User)
#     def save_user_manager(self, sender, instance, **kwargs):
#         instance.newusermanager.save()

#     def __str__(self):
#         return self.user.username


class Event(models.Model):
    event_name = models.CharField(max_length=200)
    event_location = models.CharField(max_length=200)  # may change in the future
    event_start_vote_time = models.DateTimeField("start vote time", default=datetime.now)
    event_end_vote_time = models.DateTimeField("end vote time", default=datetime.now)
    event_time = models.DateTimeField("event time", default=datetime.now)

#     # def __str__(self):
#     #     return self.event_name


class Group(models.Model):
    group_name = models.CharField(max_length=100, default="New Group")
    group_events = models.CharField(max_length=100, default="no events")
    owner = models.ForeignKey(User, related_name="group_owned", on_delete=models.CASCADE, null=True)
    # group = models.OneToOneField(Group, on_delete=models.CASCADE)
    # group_events = models.ManyToManyField(Event)
    # group_user = models.ManyToManyField(User)
    # @receiver(post_save, sender=Group)
    # def create_group_manager(self, sender, instance, created, **kwargs):
    #     if created:
    #         NewGroupManager.objects.create(group=instance)

    # @receiver(post_save, sender=Group)
    # def save_group_manager(self, sender, instance, **kwargs):
    #     instance.newgroupmanager.save()

    # def __str__(self):
    #     return self.group.name


class Movie(models.Model):
    movie_title = models.CharField(max_length=200)
    movie_simple_describe = models.CharField(max_length=200)
    movie_detailed_describe = models.TextField()
    movie_link = models.URLField()
    movie_published = models.DateTimeField("date published")

    # def __str__(self):
    #     return self.movie_title
