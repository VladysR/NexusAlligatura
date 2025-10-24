import {useState} from "react";
import api from "../api";
import {useNavigate} from "react-router-dom";
import {REFRESH_TOKEN, ACCESS_TOKEN} from "../constants";

function Form({route, dueno}) {
    const [nombre, setNombre] = useState("");
    const [especie, setEspecie] = useState("");
    const [raza, setRaza] = useState("");
    const [sexo, setSexo] = useState("");
    const [fecha_nacimiento, setFecha_nacimiento] = useState("");
    const [peso, setPeso] = useState("");
    const [capa, setCapa] = useState("");
    const [esterilizado, setEsterilizado] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, { nombre, especie, raza, sexo, fecha_nacimiento, peso, capa, esterilizado, dueno });
            alert("Registracion completa");
            navigate(-1);
            } catch (error) {
                alert(error)
            } finally {
                setLoading(false);
            }
    }
        return(
            <form onSubmit={handleSubmit}>
                <h1>Registrar Mascota</h1>
                <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                <input type="text" placeholder="Especie" value={especie} onChange={(e) => setEspecie(e.target.value)} required />
                <input type="text" placeholder="Raza" value={raza} onChange={(e) => setRaza(e.target.value)} required />
                <input type="text" placeholder="Sexo" value={sexo} onChange={(e) => setSexo(e.target.value)} required />
                <input type="date" placeholder="Fecha de Nacimiento" value={fecha_nacimiento} onChange={(e) => setFecha_nacimiento(e.target.value)} required />
                <input type="number" step="0.01" placeholder="Peso (kg)" value={peso} onChange={(e) => setPeso(e.target.value)} required />
                <input type="text" placeholder="Capa" value={capa} onChange={(e) => setCapa(e.target.value)} required />
                <label>
                    Esterilizado:
                    <input type="checkbox" checked={esterilizado} onChange={(e) => setEsterilizado(e.target.checked)} />
                </label>
                <button type="submit" disabled={loading}>
                    Registrar Mascota
                </button>
            </form>
        )
    }

export default FormMascota;