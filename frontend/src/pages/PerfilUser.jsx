import CitaList from "../components/Citas/citaList";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import api from "../api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PerfilUsr() {
    const [user, setUser] = useState(null);
    const [mascotas, setMascotas] = useState([]);
    const { id } = useParams(); // <-- aquí obtenemos el id de la URL

    useEffect(() => {
        fetchUser();
    }, [id]);

    useEffect(() => {
        if (user) {
            fetchMascotas();
        }
    }, [user]);

    const fetchUser = async () => {
        try {
            let response;
            if (id) {
                response = await api.get(`/api/user/list/`);
                response.data = response.data.find(u => u.id === parseInt(id));
            } else {
                response = await api.get('/api/user/current/');
            }

            setUser(response.data);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    const fetchMascotas = async () => {
        if (user) {
            try {
                const response = await api.get(`/api/mascota/list/${user.id}/`);
                setMascotas(response.data);
            } catch (error) {
                console.error("Error fetching mascotas:", error);
            }
        }
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <Navbar user={user}/>
            <div className="content">
                <Sidebar user={user}/>
                <div className="main-content">
                    <div className="usuario">
                        <img src={user.URL_imagen_perfil} alt="foto" />
                        <h1> {user.first_name} {user.last_name}</h1>
                        <p>Email: {user.email}</p>
                        <p>Telefono : {user.telefono}</p>
                        <p>Domicilio: {user.domicilio}</p>
                    </div>
                    {mascotas.length > 0 ? (
                        <div className="mascotas">
                            <h2>Mis Mascotas</h2>
                            {mascotas.map((mascota) => (
                                <div key={mascota.id} className="mascota-item">
                                    <h3>{mascota.nombre}</h3>
                                    <p>Especie: {mascota.especie}</p>
                                    <p>Raza: {mascota.raza}</p>
                                    <p>Edad: {mascota.edad} años</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="no-mascotas">
                            <h2>Contacte con el veterinario para registrar a su mascota</h2>
                        </div>
                    )}
                </div>
            </div>
            <div className="footer">
                <p>&copy; 2023 NexusAlligatura. Todos los derechos reservados.</p>
            </div>
        </div>
    );
}

export default PerfilUsr;