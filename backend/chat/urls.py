from django.urls import path
from .views import MessageAPIView
# chat/urls.py
from django.urls import path

from . import views

 
urlpatterns = [
    path('messages', MessageAPIView.as_view()),
    path("", views.index, name="index"),
    path("<str:room_name>/", views.room, name="room"),
]