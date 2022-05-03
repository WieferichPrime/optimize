from django.urls import path
from leads.views import methodinfo

urlpatterns = [
    path('get', methodinfo),
]