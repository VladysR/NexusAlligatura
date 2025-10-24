from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('El Email es obligatorio')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user
    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    telefono = models.CharField(max_length=20, blank=True, null=True)
    domicilio = models.CharField(max_length=255, blank=True, null=True)
    URL_imagen_perfil = models.URLField(blank=True, null=True)
    is_veterinario = models.BooleanField(default=False)
    num_colegiado = models.CharField(max_length=20, null=True, blank=True, unique=True)
    username = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()
    
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='customuser_set',
        blank=True,
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
        related_query_name='customuser',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='customuser_permissions_set',
        blank=True,
        help_text='Specific permissions for this user.',
        related_query_name='customuser_permissions',
    )

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
class Mascota(models.Model):
    nombre = models.CharField(max_length=255)
    especie = models.CharField(max_length=255)
    raza = models.CharField(max_length=255)
    sexo = models.CharField(max_length=10)
    fecha_nacimiento = models.DateField()
    peso = models.DecimalField(max_digits=5, decimal_places=2)
    capa = models.CharField(max_length=255)
    esterilizado = models.BooleanField(default=False)
    url_historial = models.URLField(blank=True, null=True)
    url_imagen_perfil = models.URLField(blank=True, null=True)
    dueno = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='mascotas') 

    def __str__(self):
        return self.nombre + ' - ' + self.raza + ' - ' + self.especie + ' - ' + self.sexo + ' - ' +  self.dueno.first_name + ' ' + self.dueno.last_name 


class Servicio(models.Model):
    nombre = models.CharField(max_length=255)
    tiempo = models.TimeField(null=True, blank=True)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
        
    def __str__(self):
        return self.nombre + ' - ' + str(self.precio) + ' - ' + str(self.tiempo)

class Cita(models.Model):
    motivo = models.CharField(max_length=255)
    fecha = models.DateField()
    hora = models.TimeField()
    veterinario = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='citas')
    mascota = models.ForeignKey(Mascota, on_delete=models.CASCADE, related_name='citas')
    servicio = models.ForeignKey(Servicio, on_delete=models.CASCADE, related_name='citas')

    def __str__(self):
        return self.motivo + ' - ' + str(self.fecha) + ' - ' + str(self.hora) + ' - ' + self.veterinario.first_name + ' ' + self.veterinario.last_name + ' - ' + self.mascota.nombre

class Historia(models.Model):
    anamnesis = models.TextField()
    exploracion = models.TextField()
    diagnostico = models.TextField()
    tratamiento = models.TextField()
    veterinario = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='historias')
    mascota = models.ForeignKey(Mascota, on_delete=models.CASCADE, related_name='historias')
    cita = models.ForeignKey(Cita, on_delete=models.CASCADE, related_name='historias')

    def __str__(self):
        return self.mascota.nombre + ' - ' + self.veterinario.first_name + ' ' + self.veterinario.last_name + ' - ' + str(self.cita.fecha) + ' - ' + str(self.cita.hora) + ' - ' + self.cita.motivo