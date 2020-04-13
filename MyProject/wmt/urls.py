from rest_framework import routers
from .api import EventViewSet, GroupViewSet

router = routers.DefaultRouter()
router.register('api/events', EventViewSet, 'events')
router.register('api/groups', GroupViewSet, 'groups')

urlpatterns = router.urls