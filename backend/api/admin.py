from django.contrib import admin
from .models import CustomUser, Mascota, Servicio, Cita, Historia

@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('email', 'first_name', 'last_name', 'is_veterinario', 'get_extra_info')
    search_fields = ('email', 'first_name', 'last_name', 'num_colegiado')
    list_filter = ('is_veterinario',)

    def get_extra_info(self, obj):
        if obj.is_veterinario:
            return f"Nº Colegiado: {obj.num_colegiado}"
        return f"Tel: {obj.telefono}, Dir: {obj.domicilio}"
    get_extra_info.short_description = 'Información adicional'

@admin.register(Mascota)
class MascotaAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'especie', 'raza', 'sexo', 'dueno')
    search_fields = ('nombre', 'especie', 'raza')
    list_filter = ('especie', 'sexo', 'esterilizado')

@admin.register(Servicio)
class ServicioAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'tiempo', 'precio')
    search_fields = ('nombre',)

@admin.register(Cita)
class CitaAdmin(admin.ModelAdmin):
    list_display = ('fecha', 'hora', 'motivo', 'get_veterinario', 'mascota', 'servicio')
    search_fields = ('motivo', 'veterinario__first_name', 'mascota__nombre')
    list_filter = ('fecha', 'veterinario')

    def get_veterinario(self, obj):
        return f"{obj.veterinario.first_name} {obj.veterinario.last_name}"
    get_veterinario.short_description = 'Veterinario'

@admin.register(Historia)
class HistoriaAdmin(admin.ModelAdmin):
    list_display = ('mascota', 'get_veterinario', 'cita')
    search_fields = ('mascota__nombre', 'veterinario__first_name', 'diagnostico')

    def get_veterinario(self, obj):
        return f"{obj.veterinario.first_name} {obj.veterinario.last_name}"
    get_veterinario.short_description = 'Veterinario'
# Register your models here.
