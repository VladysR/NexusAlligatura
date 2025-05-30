import { useState } from "react";
import api from "../api";
import { redirect, useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css";

function Form ({route,method}){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [telefono, setTelefono] = useState("");
    const [domicilio, setDomicilio] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

const name = method === "login" ? "Login" : "Register";

    const  handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        if (method === "login"){
        try{
            const res = await api.post(route, {email, password})
            if (res.status === 200) { // Check for successful login
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/");
            } else {
                alert("Error: Invalid credentials"); // Handle invalid credentials
            }
        }   
        catch (error){
            alert("Error: " + error.response.data.detail); // Display backend error message
            setLoading(false);
        }
        } else {
            try{
                const res = await api.post(route, {first_name, last_name, email, password, telefono, domicilio})
                if (res.status === 201){
                    navigate("/login");
                }
            }catch (error){
                alert("Error: " + error);
                setLoading(false);
            }
       
        }
    };
    if (method === "login"){
    return( 
    <form onSubmit={handleSubmit} className="form-container">
            
            <h1>{name}</h1>
         <input 
         type="text"
         className ="form-input"
         value={email}
         onChange={(e) => setEmail(e.target.value)}
         placeholder="email"
         />
         <input 
         type="password" 
         className ="form-input"
         value={password}
         onChange={(e) => setPassword(e.target.value)}
         placeholder="password"
         />
         <button className="form-button" type="submit">
            {name}
         </button>
         <button className="form-button" type="redirect" onClick={() => navigate("/register")}>
            Registrarse
         </button>
    </form>
    )
}else{
    return(
    <form onSubmit={handleSubmit} className="form-container">
            
    <h1>{name}</h1>
 <input 
 type="text" 
 className ="form-input"
 value={first_name}
 onChange={(e) => setFirstName(e.target.value)}
 placeholder="Nombre"
 />
 <input 
 type="text" 
 className ="form-input"
 value={last_name}
 onChange={(e) => setLastName(e.target.value)}
 placeholder="Apellido"
 />
 <input 
 type="text"
 className ="form-input"
 value={email}
 onChange={(e) => setEmail(e.target.value)}
 placeholder="email"
 />
 <input 
 type="password" 
 className ="form-input"
 value={password}
 onChange={(e) => setPassword(e.target.value)}
 placeholder="password"
 />
 <input 
 type="number" 
 className ="form-input"
 value={telefono}
 onChange={(e) => setTelefono(e.target.value)}
 placeholder="telefono"
 />
 <input 
 type="text" 
 className ="form-input"
 value={domicilio}
 onChange={(e) => setDomicilio(e.target.value)}
 placeholder="Domicilio"
 />
 <button className="form-button" type="submit">
    {name}
 </button>

</form> 
    )
}

}

export default Form;