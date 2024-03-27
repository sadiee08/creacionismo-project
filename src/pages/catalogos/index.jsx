import "./styles.css";
import Menu from "../../components/menu/menu";
import Header from "../../components/header";
import MenuCatalogo from "../../components/common/menu-catalogo/menu-catalogo";
import TotalCount from "../../components/common/total-count";

import Pedestales from "../../assets/images/pedestales.jpg"
import Aire from "../../assets/images/aire.jpg"
import Ceramica from "../../assets/images/ceramica.jpg"
import Concreto from "../../assets/images/concreto.jpg"
import Tierra from "../../assets/images/tierra.jpg"
import { Margin } from "@mui/icons-material";


const Catalogos = () => {

    return (
        <>
            <div className="con">
                <Header />
                <div className="display-menu">
                    <Menu />
                    <div className="container">
                        <div className="width-menu">
                            <div className="total-count-center">
                                <div className="total-count-align">
                                    <TotalCount imagen={Pedestales} texto={"Pedestales"} />
                                    <TotalCount imagen={Aire} texto={"Aire"} />
                                    <TotalCount imagen={Ceramica} texto={"Cerámica"} />
                                    <TotalCount imagen={Concreto} texto={"Concreto"} />
                                    <TotalCount imagen={Tierra} texto={"Tierra"} />
                                </div>
                            </div>

                            <div className="menu-align">
                                <MenuCatalogo imagen={Pedestales} texto={"Pedestales"} />
                                <MenuCatalogo imagen={Aire} texto={"Maceta Aire"} />
                                <MenuCatalogo imagen={Ceramica} texto={"Maceta Cerámica"} />
                                <MenuCatalogo imagen={Concreto} texto={"Maceta Concreto"} />
                                <MenuCatalogo imagen={Tierra} texto={"Maceta Tierra"} />
                            </div>

                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}

export default Catalogos;