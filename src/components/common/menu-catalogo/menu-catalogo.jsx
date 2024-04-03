import React from 'react';
import { NavLink } from "react-router-dom";
import "./styles.css";

const MenuCatalogo = ({ imagen, texto, url }) => {

    const linkName = "/menu-catalogos/" + url;

    return (
        <>
            <div className="cuadro">
                <NavLink to={linkName}>
                    <div className="contenedor-imagen">
                        <img src={imagen} alt={texto} />
                        <div className="texto-imagen">{texto}</div>
                    </div>
                </NavLink>
            </div>

        </>
    )
}

export default MenuCatalogo;
