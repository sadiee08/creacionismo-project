import Menu from "../../components/menu/menu";
import Header from "../../components/header";
import "./styles.css";

const Configuracion = () => {
    return (
        <>
            <div>
                <Header/>
                <div className="display-menu">
                    <Menu />
                    <h1>hola desde Configuración</h1>
                </div>
            </div>

        </>
    )
}

export default Configuracion;