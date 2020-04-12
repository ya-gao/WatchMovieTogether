from django.contrib import admin
from .models import GroupExtend

class GroupExtendAdmin(admin.ModelAdmin):
    save_on_top = True
    list_display = ('id','group_name', 'group_events', 'owner')
    filter_horizontal = ('members',)

# Register your models here.
admin.site.register(GroupExtend,GroupExtendAdmin)