import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import api from "../api";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Usuarios.css";

function Usuarios({ user,client }) {
    const [clients, setClients] = useState([]);
    const navigate = useNavigate(); // Hook para navegación

    useEffect(() => {
        fetchClient();
    }, []);
    const fetchClient = async () => {
        try {
            const res = await api.get('/api/user/list/');
            console.log("API Response:", res.data);
            const filteredUsers = res.data.filter(user => {
                // Filter out users with empty names
                return user.first_name !== "" || user.last_name !== "";
            });
            console.log("Filtered Clients:", filteredUsers);
            setClients(filteredUsers);
        } catch (error) {
            console.error("Error fetching Clients:", error);
        }
    };
    return (
        <div className="container">
            <Navbar user={user} />
            <div className="content">
                <Sidebar user={user} />
                <div className="main-content">
                    {clients.length > 0 ? (
                        <div className="usuarios">
                            <h1>Usuarios Registrados</h1>
                            <table className="usuarios-table">
                                <thead>
                                    <tr>
                                        <th>Foto</th>
                                        <th>Nombre</th>
                                        <th>Email</th>
                                        <th>Telefono</th>
                                        <th>Domicilio</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {clients.map((client) => (
                                        <tr
                                            key={client.id}
                                            style={{ cursor: "pointer" }}
                                            onClick={() => navigate(`/perfilusr/${client.id}`)}
                                        >
                                            <td>
                                                <img src={client.URL_imagen_perfil} alt="foto" className="usuario-foto" />
                                            </td>
                                            <td>{client.first_name} {client.last_name}</td>
                                            <td>{client.email}</td>
                                            <td>{client.telefono}</td>
                                            <td>{client.domicilio}</td>
                                            <td onClick={(e) => e.stopPropagation()}>
                                                <Link to="/addMascota" user={user} dueno={client.id} className="add-mascota-link">
                                                    Añadir Mascota
                                                </Link>
                                            </td>
                                        </tr>                                          
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <h2 className="no-usuarios">No hay usuarios registrados</h2>
                    )}
                </div>
            </div>
            <div className="footer">
                <p>&copy; 2023 NexusAlligatura. Todos los derechos reservados.</p>
            </div>
        </div>
    );
}
export default Usuarios;