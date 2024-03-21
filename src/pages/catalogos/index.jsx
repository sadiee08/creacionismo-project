import Menu from "../../components/menu/menu";
import Header from "../../components/header";
import "./styles.css";
import MenuCatalogo from "../../components/common/menu-catalogo/menu-catalogo";
import Pedestales from "../../assets/images/pedestales.jpg"
import Aire from "../../assets/images/aire.jpg"
import Ceramica from "../../assets/images/ceramica.jpg"
import Concreto from "../../assets/images/concreto.jpg"
import Tierra from "../../assets/images/tierra.jpg"

const Catalogos = () => {

    return (
        <>
            <div>
                <Header />
                <div className="display-menu">
                    <Menu />
                    <div className="width-menu">
                        <div className="menu-align">
                            <MenuCatalogo imagen={Pedestales} texto={"Pedestales"} />
                            <MenuCatalogo imagen={Aire} texto={"Maceta Aire"} />
                            <MenuCatalogo imagen={Ceramica} texto={"Maceta Ceramica"} />
                            <MenuCatalogo imagen={Concreto} texto={"Maceta Concreto"} />
                            <MenuCatalogo imagen={Tierra} texto={"Maceta Tierra"} />
                        </div>
                        
                    </div>
                </div>
            </div>

        </>
    )
}

export default Catalogos;