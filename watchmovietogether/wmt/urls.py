from rest_framework import routers
from .api import GroupViewSet

router = routers.DefaultRouter()
router.register('api/groups', GroupViewSet, 'groups')

urlpatterns = router.urls