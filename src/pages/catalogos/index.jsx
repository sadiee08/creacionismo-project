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
                                    <TotalCount imagen={Pedestales} texto={"Pedestales"} producto={"pedestales"}/>
                                    <TotalCount imagen={Aire} texto={"Aire"} producto={"maceta-aire"} />
                                    <TotalCount imagen={Ceramica} texto={"Cerámica"} producto={"maceta-ceramica"} />
                                    <TotalCount imagen={Concreto} texto={"Concreto"} producto={"maceta-concreto"} />
                                    <TotalCount imagen={Tierra} texto={"Tierra"} producto={"maceta-tierra"} />
                                </div>
                            </div>

                            <div className="menu-align">
                                <MenuCatalogo imagen={Pedestales} texto={"Pedestales"} url={"pedestales"} />
                                <MenuCatalogo imagen={Aire} texto={"Maceta Aire"} url={"maceta-aire"} />
                                <MenuCatalogo imagen={Ceramica} texto={"Maceta Cerámica"} url={"maceta-ceramica"} />
                                <MenuCatalogo imagen={Concreto} texto={"Maceta Concreto"} url={"maceta-concreto"} />
                                <MenuCatalogo imagen={Tierra} texto={"Maceta Tierra"} url={"maceta-tierra"} />
                            </div>

                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}

export default Catalogos;