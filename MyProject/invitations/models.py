from django.db import models

# Create your models here.
class Invitation(models.Model):
    group_name = models.CharField(max_length=100)
    group_id = models.IntegerField()
    inviter_username = models.CharField(max_length=100, null=True)
    invited_username = models.CharField(max_length=100, default='not selected')

    def __str__(self):
        return f"{self.group_id} group name: {self.group_name} invite user:  {self.invited_username}"