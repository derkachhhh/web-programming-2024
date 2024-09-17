from django.urls import path

from tickets import views

urlpatterns = [
    path("flights/", views.get_flights),
]
