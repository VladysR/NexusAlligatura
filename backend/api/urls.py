from django.urls import path
from  . import views

urlpatterns = [
    #MASCOTA
    path('mascota/', views.MascotaAddLista.as_view(), name='mascota-list-create'),
    path('mascota/delete/<int:pk>/', views.MascotaDelete.as_view(), name='mascota-delete'),
    path('mascota/update/<int:pk>/', views.MascotaUpdate.as_view(), name='mascota-update'),
    path('mascota/list/', views.MascotaList.as_view(), name='mascota-list'),
    
    #CITA    
    path('cita/', views.AddCitaView.as_view(), name='cita-list-create'),
    path('cita/delete/<int:pk>/', views.DeleteCitaView.as_view(), name='cita-delete'),
    path('cita/update/<int:pk>/', views.CitaUpdateView.as_view(), name='cita-update'),
    path('cita/list/', views.ListCitaView.as_view(), name='cita-list'),

    #SERVICIO
    path('servicio/', views.CreateServicioView.as_view(), name='servicio-list'),
    path('servicio/delete/<int:pk>/', views.DeleteServicioView.as_view(), name='servicio-delete'),
    path('servicio/list/', views.ListServicioView.as_view(), name='servicio-list'),
    
    #VETERINARIO
    path('veterinario/', views.CreateVeterinarioView.as_view(), name='veterinario-list'),
    path('veterinario/delete/<int:pk>/', views.DeleteVeterinarioView.as_view(), name='veterinario-delete'),
    path('veterinario/update/<int:pk>/', views.VeterinarioUpdateView.as_view(), name='veterinario-update'),
    path('veterinario/list/', views.ListVeterinarioView.as_view(), name='veterinario-list'),


]