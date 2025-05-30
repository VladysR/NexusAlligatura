import React, { use } from 'react';
import "../styles/Bars.css"; 
import {Link} from 'react-router-dom';

function Navbar({user}) {
  return (
    <nav className="navbar">
      <div className="navbar-logo">NexusAlligatura</div>
      <div className="navbar-links">
        {user && user.user_type === "veterinario" ? (
        <Link to="/usuarios">Usuarios</Link>
        ) : (
        <Link to="/perfilusr">Perfil</Link>
        )}
        <a href="#">Servicios</a>
        <a href="#">Informacion</a>
        <a href="#">Foro</a>
        <a href="#">Chatbot</a>
        <Link to="/logout">Logout</Link>
      </div>
    </nav>
  );
}

export default Navbar;