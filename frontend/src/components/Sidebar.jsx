import React from 'react';
import "../styles/Bars.css";
import { Link } from 'react-router-dom';

function Sidebar({user}) {
  console.log("Sidebar user prop:", user); // Add this line
  return (
    <aside className="sidebar">
      <ul className="sidebar-list">
        <li className="sidebar-item">
          <Link to="/">
            <i className="fas fa-home"></i>
            Inicio
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/cita">
            <i className="fas fa-calendar-alt"></i>
            Citas
          </Link>
        </li>
        <li className="sidebar-item">
          <a href="#">
            <i className="fas fa-calendar-week"></i>
            Calendario
          </a>
        </li>
        {user && user.user_type === "veterinario" && (
           <li className="sidebar-item">
             <Link to="/pacientes">
               <i className="fas fa-users"></i>
               Pacientes     
             </Link>
          </li>
        )}
      </ul>
    </aside>
  );
}

export default Sidebar;