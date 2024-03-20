import Menu from "../../components/menu/menu";
import Header from "../../components/header";
import "./styles.css";

const Catalogos = () => {
    return (
        <>
            <div>
                <Header/>
                <div className="display-menu">
                    <Menu />
                    <h1>hola desde catalogos</h1>
                </div>
            </div>

        </>
    )
}

export default Catalogos;