from django.urls import path 

from . import views 

urlpatterns = [
    path('', views.IndexView.as_view()),
    path('producto',views.ProductoView.as_view()),
    path('producto/<int:pk>',views.ProductoDetailView.as_view())
]