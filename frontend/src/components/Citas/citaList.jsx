import { useState, useEffect } from "react";
import api from "../../api";
import { ACCESS_TOKEN } from "../../constants";
import { jwtDecode } from "jwt-decode";

function CitaList({ user }) {
    const [citas, setCitas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCitas();
    }, []);

    const fetchCitas = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await api.get("/api/cita/list/");
            setCitas(res.data);
        } catch (err) {
            console.error("Error fetching citas:", err);
            setError("Failed to load citas. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (id) => {
        // Implement edit logic
        console.log(`Edit cita with id: ${id}`);
    };

    const handleDelete = (id) => {
        // Implement delete logic
        console.log(`Delete cita with id: ${id}`);
    };

    const handleAdd = () => {
        // Implement add logic
        console.log("Add new cita");
    };

    if (loading) {
        return <div>Loading citas...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="cita-list">
            <h1>Citas</h1>
            {citas.length === 0 ? (
                <h2 className="no-citas">No hay citas disponibles</h2>
            ) : (
                <>
                    {citas.map((cita) => (
                        <div key={cita.id} className="cita-item">
                            <h2>{cita.motivo}</h2>
                            <p>{cita.fecha}</p>
                            <p>{cita.hora}</p>
                            {user && user.is_veterinario && (
                                <>
                                    <button onClick={() => handleEdit(cita.id)}>Edit</button>
                                    <button onClick={() => handleDelete(cita.id)}>Delete</button>
                                </>
                            )}
                        </div>
                    ))}
                    {user && user.is_veterinario && (
                        <button onClick={handleAdd}>Add Cita</button>
                    )}
                </>
            )}
        </div>
    );
}

export default CitaList;