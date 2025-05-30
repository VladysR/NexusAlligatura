import { useEffect, useState } from "react";
import api from "../../api";
import { redirect, useNavigate } from "react-router-dom";
import { ACCESS_TOKEN,REFRESH_TOKEN } from "../../constants";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function FormMascota ({user}) {
    const [nombre, setNombre] = useState("");
    const [especie, setEspecie] = useState("");
    const [raza, setRaza] = useState("");
    const [sexo, setSexo] = useState("");
    const [fechaNacimiento, setFechaNacimiento] = useState("");
    const [peso, setPeso] = useState("");
    const [capa, setCapa] = useState("");
    const [dueno , setDueno] = useState("");
    const [esterilizado, setEsterilizado] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/api/mascota/", {
                nombre,
                especie,
                raza,
                sexo,
                fecha_nacimiento: fechaNacimiento,
                peso,
                capa,
                dueno: user.id, // Assuming user is passed as a prop
                esterilizado
            });
            if (res.status === 201) {
                alert("Mascota creada exitosamente");
                fetchMascota(); // Refresh the list of mascotas
            }
        } catch (error) {
            console.error("Error creating mascota:", error);
            alert("Error al crear la mascota");
        }
    };

    return(
        <form onSubmit={handleSubmit} className="form-container">
            
            <h1>Registrar Mascota</h1>
            <input 
                type="text"
                className="form-input"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Nombre"
                required
            />
            <input 
                type="text"
                className="form-input"
                value={especie}
                onChange={(e) => setEspecie(e.target.value)}
                placeholder="Especie"
                required
            />
            <input 
                type="text"
                className="form-input"
                value={raza}
                onChange={(e) => setRaza(e.target.value)}
                placeholder="Raza"
            />
            <select 
                className="form-input"
                value={sexo}
                onChange={(e) => setSexo(e.target.value)}
            >
                <option value="">Seleccione Sexo</option>
                <option value="Macho">Macho</option>
                <option value="Hembra">Hembra</option>
            </select>
            <DatePicker
                selected={fechaNacimiento}
                onChange={(date) => setFechaNacimiento(date)}
                className="form-input"
                placeholderText="Fecha de Nacimiento"
            />
            <input 
                type="number"
                className="form-input"
                value={peso}
                onChange={(e) => setPeso(e.target.value)}
                placeholder="Peso (kg)"
            />
            <input 
                type="text"
                className="form-input"
                value={capa}
                onChange={(e) => setCapa(e.target.value)}
                placeholder="Capa (color)"
            />
            <input 
                type="text"
                className="form-input"
                value={dueno}
                defaultValue={user.id} // Assuming user ID is passed as a prop
                onChange={(e) => setDueno(e.target.value)}
                placeholder="Dueño (ID)"
            />
            <label>
              <input 
                  type="checkbox" 
                  checked={esterilizado} 
                  onChange={() => setEsterilizado(!esterilizado)} 
              /> Esterilizado
            </label>
            <button type="submit" className="form-button">Registrar Mascota</button>
        </form>
    )

}
export default FormMascota;