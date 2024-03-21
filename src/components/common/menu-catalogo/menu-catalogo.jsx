import React from 'react';
import "./styles.css";

const MenuCatalogo = ({ imagen, texto }) => {


    return (
        <>
            <div className="cuadro">
                <a href="#">
                    <div className="contenedor-imagen">
                        <img src={imagen} alt="Pedestales" />
                        <div className="texto-imagen">{texto}</div>
                    </div>
                </a>
            </div>

        </>
    )
}

export default MenuCatalogo;
