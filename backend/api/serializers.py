from .models import CustomUser, Mascota,Servicio,Cita,Historia
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'password', 'first_name', 'last_name', 'telefono', 'domicilio', 'URL_imagen_perfil']
        extra_kwargs = {'password': {'write_only': True}}

class VeterinarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'password', 'first_name', 'last_name', 'num_colegiado']
        extra_kwargs = {
            'password': {'write_only': True},
            'num_colegiado': {'required': True}
        }

    def create(self, validated_data):
        user = CustomUser(**validated_data)
        user.set_password(validated_data['password'])
        user.is_veterinario = True
        user.save()
        return user

class MascotaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mascota
        fields = ['id','nombre','especie','raza','sexo','fecha_nacimiento','peso','capa','esterilizado','url_historial','url_imagen_perfil','dueno']
        extra_kwargs = {'dueno': {'write_only': True}}

    def create(self, validated_data):
        dueno_data = validated_data.pop('dueno')
        dueno = CustomUser.objects.get(id=dueno_data['id'])
        mascota = Mascota.objects.create(dueno=dueno, **validated_data)
        return mascota
class ServicioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Servicio
        fields = ['id','nombre','precio']
    def create(self, validated_data):
        servicio = Servicio.objects.create(**validated_data)
        return servicio
    
class CitaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cita
        fields = ['id','motivo','mascota','veterinario','fecha','hora','servicio']
        extra_kwargs = {'mascota': {'write_only': True}}
        extra_kwargs = {'veterinario': {'write_only': True}}
        extra_kwargs = {'servicio': {'write_only': True}}
    def create(self, validated_data):
        mascota = Mascota.objects.get(id=validated_data['mascota'])
        veterinario = Veterinario.objects.get(id=validated_data['veterinario'])
        servicio = Servicio.objects.get(id=validated_data['servicio'])
        cita = Cita.objects.create(mascota=mascota,veterinario=veterinario,servicio=servicio,**validated_data)
        return cita

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['user_type'] = 'veterinario' if hasattr(user, 'num_colegiado') else 'customuser'

        return token