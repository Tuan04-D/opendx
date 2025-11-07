from django.urls import path
from .views import *

urlpatterns = [
    path("api/data_worldbank/<str:indicator>/", fetch_indicator_worldbank, name="fetch_indicator"),
    path('api/train/<str:indicator_key>/', train_indicator, name='train_indicator'),
]
