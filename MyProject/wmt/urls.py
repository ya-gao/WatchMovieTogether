from rest_framework import routers

from .api import GroupViewSet, GroupManageViewSet, GroupInViewSet, GorupUnsubscribeViewSet,EventViewSet

router = routers.DefaultRouter()
router.register('api/groups', GroupManageViewSet, 'groups')
router.register('api/viewGroups', GroupViewSet, 'groups')
router.register('api/viewBelongedGroups', GroupInViewSet, 'groups')
router.register('api/unsubscribeBelongedGroup', GorupUnsubscribeViewSet, 'groups')
router.register('api/events', EventViewSet, 'events')

urlpatterns = router.urls