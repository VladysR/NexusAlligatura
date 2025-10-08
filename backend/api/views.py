from django.shortcuts import render
from rest_framework import generics
from .models import CustomUser,Mascota,Servicio,Cita,Historia
from .serializers import UserSerializer, MyTokenObtainPairSerializer, MascotaSerializer, ServicioSerializer, CitaSerializer, HistoriaSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.exceptions import PermissionDenied
from rest_framework import serializers


# Create your views here.
 #CRUD MASCOTAS
class MascotaListCreateView(generics.ListCreateAPIView):
    serializer_class = MascotaSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.is_veterinario:
            return Mascota.objects.all()
        return Mascota.objects.filter(dueno=user)
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
        else:
            raise serializers.ValidationError(serializer.errors)

class MascotaDeleteView(generics.DestroyAPIView):
    serializer_class = MascotaSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.is_veterinario:
            return Mascota.objects.all()
        return Mascota.objects.filter(dueno=user)
    
    #CRUD SERVICIOS
class ServicioListCreateView(generics.ListCreateAPIView):
    serializer_class = ServicioSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Servicio.objects.all()
    
    def perform_create(self, serializer):
        if self.request.user.is_veterinario:
            if serializer.is_valid():
                serializer.save()
            else:
                raise serializers.ValidationError(serializer.errors)
        else:
            raise PermissionDenied("No tienes permiso para crear servicios.")
        
    
class ServicioDeleteView(generics.DestroyAPIView):
    serializer_class = ServicioSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        if self.request.user.is_veterinario:
            return Servicio.objects.all()
        else:
            raise PermissionDenied("No tienes permiso para eliminar servicios.")

    #CRUD USUARIOS
class CreateUserView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

     #CRUD CITAS
class CitaListCreateView(generics.ListCreateAPIView):
    serializer_class = CitaSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.is_veterinario:
            return Cita.objects.all()
        return Cita.objects.filter(mascota__dueno=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
        else:
            raise serializers.ValidationError(serializer.errors)
class CitaDeleteView(generics.DestroyAPIView):
    serializer_class = CitaSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.is_veterinario:
            return Cita.objects.all()
        return Cita.objects.filter(mascota__dueno=user)

      #CRUD HISTORIAS
class HistoriaListCreateView(generics.ListCreateAPIView):
    serializer_class = HistoriaSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.is_veterinario:
            return Historia.objects.all()
        return Historia.objects.filter(mascota__dueno=user)
    
    def perform_create(self, serializer):
        if self.request.user.is_veterinario:
            if serializer.is_valid():
                serializer.save()
            else:
                raise serializers.ValidationError(serializer.errors)
        else:
            raise PermissionDenied("No tienes permiso para crear historias.")
class HistoriaDeleteView(generics.DestroyAPIView):
    serializer_class = HistoriaSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.is_veterinario:
            return Historia.objects.all()
        return Historia.objects.filter(mascota__dueno=user)

#VISTA TOKEN PERSONALIZADO PARA EL USO DE USUARIO CUSTOM
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
