import CitaList from "../components/Citas/citaList";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../styles/index.css"; // Import your CSS file


function Index({ user }) {
    return (
        <div className="container">
            <Navbar user={user} />
            <div className="content">
                <Sidebar user={user}/>
                <div className="main-content">
                    <div className = "welcomeText">
                    <h1>Bienvenido a <br></br>NexusAlligatura</h1>
                    <p>Tu plataforma de citas y servicios veterinarios.</p>
                    </div>
                    <CitaList />
                </div>
            </div>
            <div className="footer">
                <p>&copy; 2023 NexusAlligatura. Todos los derechos reservados.</p>
            </div>
        </div>
    );
}

export default Index;