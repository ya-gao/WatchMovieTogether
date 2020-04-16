from django.contrib import admin
from .models import GroupExtend, Event


class GroupExtendAdmin(admin.ModelAdmin):
    save_on_top = True
    list_display = ('id','group_name', 'owner')
    filter_horizontal = ('members',)


# Register your models here.
admin.site.register(GroupExtend, GroupExtendAdmin)


class EventAdmin(admin.ModelAdmin):
    save_on_top = True
    list_display = ('event_name', 'group', 'event_location', 'event_start_vote_time','event_end_vote_time','event_time')
    filter_horizontal = ('movies',)


admin.site.register(Event, EventAdmin)
