# Generated by Django 3.0.5 on 2020-04-11 15:23

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('wmt', '0010_auto_20200408_1542'),
    ]

    operations = [
        migrations.AlterField(
            model_name='groupextend',
            name='members',
            field=models.ManyToManyField(blank=True, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='groupextend',
            name='owner',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='group_owned', to=settings.AUTH_USER_MODEL),
        ),
    ]
