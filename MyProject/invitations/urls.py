from rest_framework import routers
from .api import InvitationViewSet

router = routers.DefaultRouter()
router.register('api/invitations', InvitationViewSet, 'invitations')

urlpatterns = router.urls