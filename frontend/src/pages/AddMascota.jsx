import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import FormMascota from "../components/Mascotas/formMascota";

function AddMascota({ user,dueno }) {
    console.log(dueno);
    console.log(user);
    return (
        <div className="container">
            <Navbar user={user} />
            <div className="content">
                <Sidebar user={user} />
                <div className="main-content">
                    <h1>Añadir Mascota</h1>
                    <FormMascota user={dueno} />
                </div>
            </div>
            <div className="footer">
                <p>&copy; 2023 NexusAlligatura. Todos los derechos reservados.</p>
            </div>
        </div>
    );
}
export default AddMascota;