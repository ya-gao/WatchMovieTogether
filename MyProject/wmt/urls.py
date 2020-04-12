from rest_framework import routers
from .api import GroupViewSet, GroupManageViewSet, GroupInViewSet, GorupUnsubscribeViewSet

router = routers.DefaultRouter()
router.register('api/groups', GroupManageViewSet, 'groups')
router.register('api/viewGroups', GroupViewSet, 'groups')
router.register('api/viewBelongedGroups', GroupInViewSet, 'groups')
router.register('api/unsubscribeBelongedGroups', GorupUnsubscribeViewSet, 'groups')
urlpatterns = router.urls