from rest_framework import routers
from .api import InvitationViewSet, DenyInvitationViewSet

router = routers.DefaultRouter()
router.register('api/invitations', InvitationViewSet, 'invitations')
router.register('api/denyInvitations', DenyInvitationViewSet, 'invitations')
urlpatterns = router.urls