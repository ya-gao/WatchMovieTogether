# Generated by Django 3.0.5 on 2020-04-08 19:15

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('wmt', '0007_auto_20200408_1513'),
    ]

    operations = [
        migrations.AlterField(
            model_name='groupextend',
            name='members',
            field=models.ManyToManyField(to=settings.AUTH_USER_MODEL),
        ),
    ]
