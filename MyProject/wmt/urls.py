from rest_framework import routers
from .api import GroupViewSet, GroupManageViewSet

router = routers.DefaultRouter()
router.register('api/groups', GroupManageViewSet, 'groups')
router.register('api/viewGroups', GroupViewSet, 'groups')
urlpatterns = router.urls