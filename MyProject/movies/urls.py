from rest_framework import routers
from .api import MovieViewSet

router = routers.DefaultRouter()
router.register('api/movies', MovieViewSet, 'movies')
# router.register('api/denyInvitations', DenyInvitationViewSet, 'invitations')
urlpatterns = router.urls