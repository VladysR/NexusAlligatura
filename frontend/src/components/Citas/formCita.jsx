import { useEffect, useState } from "react";
import api from "../../api";
import { redirect, useNavigate } from "react-router-dom";
import { ACCESS_TOKEN,REFRESH_TOKEN } from "../../constants";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/CitasForm.css";


function FormCita ({}){
    const [motivo, setMotivo] = useState("");
    const [fecha, setFecha] = useState("");
    const [hora, setHora] = useState("");
    const [veterinario, setVeterinario] = useState("");
    const [mascota, setMascota] = useState("");
    const [servicio, setServicio] = useState("");
    const [mascotas, setMascotas] = useState([]);
    const [servicios, setServicios] = useState([]);
    const [veterinarios, setVeterinarios] = useState([]);

    useEffect(() => {
        fetchMascotas();
        fetchServicios();
        fetchVeterinarios();
    }, []);
  const fetchMascotas = async () => {
    try {
        const res = await api.get("/api/mascota/list/");
        setMascotas(res.data);
        // Si hay mascotas, seleccionar la primera por defecto
        if (res.data.length > 0) {
            setMascota(res.data[0].id);
        }
    } catch (error) {
        console.error("Error fetching mascotas:", error);
    }
};
   const fetchServicios = async () => {
    try {
        const res = await api.get("/api/servicio/list/");
        // Lista de servicios permitidos por nombre
        const serviciosPermitidos = [
            "Consulta en Casa",
            "Consulta Ordinaria",
            "Consulta Exóticos",
            "Consulta de Comportamiento",
            "Consulta Etológica",
            "Pasaporte Oficial Europeo",
            "Cert. Salud Internacional",
            "Cambio de Propietario/Comunidad",
            "Identificación por microchip",
            "Peluquería general",
            "Toma de tensión",
            "Cortes de uñas",
            "Curas",
            "Limpieza de perianales",
            "Test Felv/Fiv",
            "Test Leishmania",
            "V. RCP",
            "Limpieza y Pulido Bucal"
        ];

        // Filtrar los servicios
        const serviciosFiltrados = res.data.filter(servicio => 
            serviciosPermitidos.includes(servicio.nombre)
        );

        setServicios(serviciosFiltrados);
    } catch (error) {
        console.error("Error fetching servicios:", error);
    }
};
 const fetchVeterinarios = async () => {
    try {
        // Ahora debes filtrar por is_veterinario
        const res = await api.get("/api/veterinario/list/");
        setVeterinarios(res.data);
    } catch (error) {
        console.error("Error fetching veterinarios:", error);
    }
};
    const  handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try{
            const res = await api.post('api/cita/', {motivo, fecha, hora, veterinario, mascota, servicio});     
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);    
        } catch (error){
            alert("Error: " + error);
            setLoading(false);
        }
        } 
    
    const handleDateChange = (date) => {
        setFecha(date);
    };
    const disableDateRange = [
        {start: new Date(), end: new Date(new Date().setDate(new Date().getDate() + 30))},
    ]

    return( 
  <div>
          <DatePicker
                selected={fecha}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
                maxDate={new Date().setDate(new Date().getDate() + 30)}
                filterDate={(date) => {
                    const day = date.getDay();
                    return day !== 0 && day !== 6;
                }}
                placeholderText="Selecciona una fecha"
                className="form-control" // Puedes añadir tus propias clases CSS
                popperPlacement="bottom" // Controla dónde aparece el calendario
                showPopperArrow={true} // Muestra una flecha indicadora
        />
        <textarea 
            className="form-input textarea-auto"
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            placeholder="Motivo de la cita"
            style={{ 
                resize: 'none',
                width: '100%',
                minHeight: '100px',
                padding: '10px',
                whiteSpace: 'pre-wrap',
                overflowWrap: 'break-word'
            }}
            />
       <select
    className="form-input"
    value={mascota}
    onChange={(e) => setMascota(e.target.value)}
>
    {mascotas.length === 0 ? (
        <option value="">Selecciona una mascota</option>
    ) : (
        mascotas.map((mascota) => (
            <option key={mascota.id} value={mascota.id}>
                {mascota.nombre}
            </option>
        ))
    )}
    </select>
        <select
      className="form-input"
      value={servicio}
      onChange={(e) => setServicio(e.target.value)}
    >
      <option value="">Selecciona un servicio</option>
      {servicios.map((servicio) => (
        <option key={servicio.id} value={servicio.id}>
          {servicio.nombre}
        </option>
      ))}
    </select>
    </div>
    )
    
}

export default FormCita;