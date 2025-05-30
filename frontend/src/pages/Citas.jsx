import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import CitaList from "../components/Citas/citaList";
import FormCita from "../components/Citas/formCita";

function Citas({user}){

    return (
        <div className="container">
            <Navbar user={user} />
            <div className="content">
                <Sidebar user={user} />
                <div className="maincontent">
                    <button><a href="#">MODIFICAR CITAS</a></button>
                    <form action="#">
                        <h1>Crear Cita</h1>
                        <FormCita/>
                        <button type="submit">CREAR CITA</button>
                    </form>
                    <button><a href="#">CANCELAR CITAS</a></button>
                </div>
                <div className="citas">
                    <h1>Proximas citas</h1>
                    <CitaList user={user}/>
                </div>
            </div>
        </div>
    );
}
export default Citas;