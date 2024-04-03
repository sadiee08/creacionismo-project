import React, { useState, useEffect } from 'react';
import "./styles.css";

import { db } from '../../../firebase/config';
import { collection, getDocs } from 'firebase/firestore';

const TotalCount = ({ imagen, texto, producto, totalProdutos }) => {
    const [total, setTotal] = useState(0);
    console.log(producto)

    useEffect(() => {
        const fetchTotal = async () => {
            const productCollection = collection(db, producto);
            const productSnapshot = await getDocs(productCollection);
            setTotal(productSnapshot.size);
        };

        fetchTotal();
    }, []);

    let totalAux = totalProdutos ? totalProdutos : total;


    return (
        <>
            <div className="total-count">
                <img src={imagen} alt={texto} />
                <div>
                    <p className="p-margin-bottom">{texto}</p>
                    <p className="p-margin-top">{totalAux}</p>
                </div>
            </div>
        </>
    )
}
export default TotalCount;