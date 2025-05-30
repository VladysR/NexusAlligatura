import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ACCESS_TOKEN } from "./constants";
import { jwtDecode } from "jwt-decode";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PerfilUsr from "./pages/PerfilUser";
import Citas from "./pages/Citas";
import Usuarios from "./pages/Usuarios";
import AddMascota from "./pages/AddMascota";

function Logout() {
    localStorage.clear();
    return <Navigate to="/login" />;
}

function RegisterAndLogout() {
    localStorage.clear();
    return <Register />;
}

function App() {
    const [user, setUser] = useState(null); // Initialize user state to null

    useEffect(() => {
        // Fetch user data on component mount
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUser(decodedToken); // Set user state with decoded token
            } catch (error) {
                console.error("Error decoding token:", error);
                setUser(null); // Set user to null in case of error
            }
        }
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                {/*Index*/}
                <Route path="/" element={<ProtectedRoute><Index user={user} /></ProtectedRoute>} />
                {/*Session*/}
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/register" element={<RegisterAndLogout />} />
                {/*Perfil*/}
                <Route path="/perfilusr" element={<ProtectedRoute><PerfilUsr user={user} /></ProtectedRoute>} />
                <Route path="/perfilusr/:id" element={<ProtectedRoute><PerfilUsr/></ProtectedRoute>} />
                {/*Usuarios*/}
                <Route path="/usuarios" element={<ProtectedRoute><Usuarios user={user} /></ProtectedRoute>} />
                {/*Mascotas*/}
                <Route path="/addMascota" element={<ProtectedRoute><AddMascota user={user} /></ProtectedRoute>} />
                {/*Citas*/}
                <Route path="/cita" element={<ProtectedRoute><Citas user={user} /></ProtectedRoute>} />
                {/*Error*/}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
