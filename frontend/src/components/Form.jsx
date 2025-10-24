import {useState} from "react";
import api from "../api";
import {useNavigate} from "react-router-dom";
import {REFRESH_TOKEN, ACCESS_TOKEN} from "../constants";

function Form({route, method}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [telefono, setTelefono] = useState("");
    const [domicilio, setDomicilio] = useState("");
    const [isVeterinario, setIsVeterinario] = useState(false);
    const [num_colegiado, setNum_colegiado] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === "register" ? "Register" : "Login";

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            if (method === "register") {
            const res = await api.post(route, { email,password, telefono, domicilio, isVeterinario, num_colegiado });
            alert("Registration successful! Please log in.");
            navigate("/login");
        } else {
            const res =  await api.post(route, { email, password });
            localStorage.setItem(ACCESS_TOKEN, res.data.access);
            localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
            navigate("/");
            }
            } catch (error) {
                alert(error)
            } finally {
                setLoading(false);
            }
    }

    if (method === "login") {
        return(
            <form onSubmit={handleSubmit}>
                <h1>Iniciar Sesion</h1>
                <input 
                    type="email" 
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input 
                    type="password" 
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}>
                    Iniciar Sesion
                </button>
            </form>
        ) 
    }else{
        return(
            <form onSubmit={handleSubmit}>
                <h1>Crear Cuenta</h1>
                <input 
                    type="email" 
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input 
                    type="password" 
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Teléfono"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Domicilio"
                    value={domicilio}
                    onChange={(e) => setDomicilio(e.target.value)}
                    required
                />
                <label>
                    <input
                        type="checkbox"
                        checked={isVeterinario}
                        onChange={(e) => setIsVeterinario(e.target.checked)}
                    />
                     Veterinario
                
                {isVeterinario && (
                    <input
                        type="text"
                        placeholder="Número de Colegiado"
                        value={num_colegiado}
                        onChange={(e) => setNum_colegiado(e.target.value)}
                        required
                    />
                )}
                </label>
                <button type="submit" disabled={loading}>
                    Crear Cuenta
                </button>
            </form>
        )
    }
}
export default Form;