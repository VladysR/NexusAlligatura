from django.urls import path
from . import views

urlpatterns = [
    path('mascotas/', views.MascotaListCreateView.as_view(), name='mascota-list-create'),
    path('mascotas/delete/<int:pk>/', views.MascotaDeleteView.as_view(), name='mascota-delete'),
    path('servicios/', views.ServicioListCreateView.as_view(), name='servicio-list-create'),
    path('servicios/delete/<int:pk>/', views.ServicioDeleteView.as_view(), name='servicio-delete'),
    path('citas/', views.CitaListCreateView.as_view(), name='cita-list-create'),
    path('citas/delete/<int:pk>/', views.CitaDeleteView.as_view(), name='cita-delete'),
    path('historias/', views.HistoriaListCreateView.as_view(), name='historia-list-create'),
    path('historias/delete/<int:pk>/', views.HistoriaDeleteView.as_view(), name='historia-delete'),
    
]