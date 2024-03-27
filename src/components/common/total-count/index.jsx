import React from "react";
import "./styles.css";

const TotalCount = ({ imagen, texto }) => {

    return (
        <>
            <div className="total-count">
                <img src={imagen} alt={texto} />
                <div>
                    <p className="p-margin-bottom">{texto}</p>
                    <p className="p-margin-top">10</p>
                </div>
            </div>
        </>
    )
}
export default TotalCount;