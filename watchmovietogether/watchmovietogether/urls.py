from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('', include('frontend.urls')),
    path('', include('wmt.urls')),
    path('', include('accounts.urls')),
    path('', include('invitations.urls')),
    path('admin/', admin.site.urls)
]
