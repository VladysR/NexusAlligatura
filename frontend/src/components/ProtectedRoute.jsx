import {Navigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useEffect, useState } from "react";

function ProtectedRoute({ children }) {
    const [IsAuthorized, setIsAuthorized] = useState(null);
    const [userType, setUserType] = useState(null);


    useEffect(() => {
        auth().catch(() => setIsAuthorized(false));
    },[]);

    const refrechToken = async () => {
        const refrechToken = localStorage.getItem(REFRESH_TOKEN);
    try{
        const res = await api.post('/api/token/refresh/', {
            refresh: refrechToken
        });
        if (res.status === 200){
            localStorage.setItem(ACCESS_TOKEN, res.data.access);
            const decodedToken = jwtDecode(res.data.access);
            setUserType(decodedToken.is_veterinario); // Cambiado de user_type a is_veterinario
            setIsAuthorized(true);
        }else{
            setIsAuthorized(false);
        };
    }catch (error){
        console.error("Error refreshing token:", error);
        setIsAuthorized(false);
    };
}
    
    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setIsAuthorized(false);
            return;
        };
        const decodedToken = jwtDecode(token);
        const tokenExpiration = decodedToken.exp;
        const currentTime = Date.now() / 1000;
        setUserType(decodedToken.is_veterinario); // Cambiado de user_type a is_veterinario

        if (tokenExpiration < currentTime) {
            await refrechToken();
        } else {
            setIsAuthorized(true);
        };
    };

    const checkIsVeterinario = (token) => {
        // Cambiar la verificación para usar is_veterinario
        const decoded = jwtDecode(token);
        return decoded.is_veterinario === true;
    };

    if (IsAuthorized === null) {
        return <div>Loading...</div>;
    }
     if (!IsAuthorized) {
        return <Navigate to="/login" />;
    }
    
    return children; // Simplificado ya que no necesitamos verificar user_type
}

export default ProtectedRoute;