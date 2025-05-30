from django.shortcuts import render
from .models import CustomUser, Mascota,Servicio,Cita,Historia
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated,AllowAny
from .serializers import UserSerializer, MascotaSerializer, ServicioSerializer,CitaSerializer, VeterinarioSerializer, MyTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response

# Create your views here.
#CRUD MASCOTA
class MascotaAddLista(generics.ListCreateAPIView):
    seralizer_class = MascotaSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        return Mascota.objects.filter(dueno=self.request.user)
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(dueno=self.request.user)
        else:
            print(serializer.errors)
class MascotaUpdate(generics.UpdateAPIView):
    serializer_class = MascotaSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        return Mascota.objects.filter(dueno=self.request.user)
    def perform_update(self, serializer):
        if serializer.is_valid():
            serializer.save(dueno=self.request.user)
        else:
            print(serializer.errors)

class MascotaDelete(generics.DestroyAPIView):
    serializer_class = MascotaSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        return Mascota.objects.filter(dueno=self.request.user)

class MascotaList(generics.ListAPIView):
    serializer_class = MascotaSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        user = self.request.user
        if user.is_veterinario:  
            return Mascota.objects.all()  
        else:
            return Mascota.objects.filter(dueno=user)

#CRUD USER
class CreateUserView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]  
class GetCurrentUserView(generics.RetrieveAPIView):
    queryset = CustomUser.objects.filter(is_active=True)
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        print(serializer.data)  # Print the serialized data
        return Response(serializer.data)
class UserListView(generics.ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        user = self.request.user
        return CustomUser.objects.filter(is_veterinario=False)  
#CRUD CITA
class AddCitaView(generics.CreateAPIView):
    queryset = Cita.objects.all()
    serializer_class = CitaSerializer
    permission_classes = [IsAuthenticated]  
    def get_queryset(self):
        user = self.request.user
        if user.is_veterinario:  
            return Cita.objects.all()  
        else:
            return Cita.objects.filter(mascota__dueno=user)
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(dueno=self.request.user)
        else:
            print(serializer.errors)

class ListCitaView(generics.ListAPIView):
    queryset = Cita.objects.all()
    serializer_class = CitaSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        user = self.request.user
        if user.is_veterinario:  
            return Cita.objects.all()  
        else:
            return Cita.objects.filter(mascota__dueno=user) 
    
class DeleteCitaView(generics.DestroyAPIView):
    queryset = Cita.objects.all()
    serializer_class = CitaSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        user = self.request.user
        if user.is_veterinario:  
            return Cita.objects.all()  
        else:
            return Cita.objects.filter(mascota__dueno=user) 
    
class CitaUpdateView(generics.UpdateAPIView):
    queryset = Cita.objects.all()
    serializer_class = CitaSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        user = self.request.user
        if user.is_veterinario:  # Cambiar aquí
            return Cita.objects.all()
        else:
            return Cita.objects.filter(mascota__dueno=user)
    def perform_update(self, serializer):
        if serializer.is_valid():
            serializer.save(dueno=self.request.user)
        else:
            print(serializer.errors)
    
    

#CRUD VETERINARIO
class ListVeterinarioView(generics.ListAPIView):
    queryset = CustomUser.objects.filter(is_veterinario=True)
    serializer_class = VeterinarioSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        user = self.request.user
        if user.is_veterinario:  
            return CustomUser.objects.filter(is_veterinario=True)  
        else:
            return None   
class CreateVeterinarioView(generics.CreateAPIView):
    queryset = CustomUser.objects.filter(is_veterinario=True)
    serializer_class = VeterinarioSerializer
    permission_classes = [IsAuthenticated]
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)
class DeleteVeterinarioView(generics.DestroyAPIView):
    queryset = CustomUser.objects.filter(is_veterinario=True)
    serializer_class = VeterinarioSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        user = self.request.user
        if user.is_veterinario:  
            return CustomUser.objects.filter(is_veterinario=True)  
        else:
            return None 
class VeterinarioUpdateView(generics.UpdateAPIView):
    queryset = CustomUser.objects.filter(is_veterinario=True)
    serializer_class = VeterinarioSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        user = self.request.user
        if user.is_veterinario:  
            return CustomUser.objects.filter(is_veterinario=True)  
        else:
            return None 
    def perform_update(self, serializer):
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)


#CRUD SERVICIO
class ListServicioView(generics.ListAPIView):
    queryset = Servicio.objects.all()
    serializer_class = ServicioSerializer
    perSmission_classes = [IsAuthenticated]
    def get_queryset(self):
        return Servicio.objects.all()
class CreateServicioView(generics.CreateAPIView):
    queryset = Servicio.objects.all()
    serializer_class = ServicioSerializer
    permission_classes = [IsAuthenticated]
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)
class DeleteServicioView(generics.DestroyAPIView):
    queryset = Servicio.objects.all()
    serializer_class = ServicioSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        return Servicio.objects.filter()
    

#VISTA TOKEN PERSONALIZADO
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
