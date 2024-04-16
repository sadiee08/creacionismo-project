import React, { useEffect, useState } from 'react';
import "./styles.css";

import Menu from '../../components/menu/menu';
import Header from '../../components/header';
import TotalCount from '../../components/common/total-count';
import Crud from '../../components/common/crud/crud';

import { db } from '../../firebase/config';
import { collection, getDocs, query, where, onSnapshot } from 'firebase/firestore';

const Producto = ({ producto, titulo, img }) => {
    const [totalGrande, setTotalGrande] = useState(0);
    const [totalMediano, setTotalMediano] = useState(0);
    const [totalChico, setTotalChico] = useState(0);
    const [total, setTotal] = useState(0);


    useEffect(() => {
        const productCollection = collection(db, producto);


        const fetchTotalGrande = async () => {
            const q = query(productCollection, where('size', '==', 'Grande'));
            const querySnapshot = await getDocs(q);
            setTotalGrande(querySnapshot.size);
        };

        const fetchTotalMediano = async () => {
            const q = query(productCollection, where('size', '==', 'Mediano'));
            const querySnapshot = await getDocs(q);
            setTotalMediano(querySnapshot.size);
        }

        const fetchTotalChico = async () => {
            const q = query(productCollection, where('size', '==', 'Chico'));
            const querySnapshot = await getDocs(q);
            setTotalChico(querySnapshot.size);
        }

        fetchTotalGrande();
        fetchTotalMediano();
        fetchTotalChico();

    }, []);

    useEffect(() => {
        const productsRef = collection(db, producto); // Reference to the collection

        // Create a query (optional, filter by size if needed)
        const productsQuery = productsRef; // No filtering in this example

        const unsubscribe = onSnapshot(productsQuery, (snapshot) => {
            const totalDocs = snapshot.docs.length;
            setTotal(totalDocs);
        });

        // Perform cleanup on component unmount (important for memory leaks)
        return () => unsubscribe(); // Unsubscribe from the listener
    }, []);


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
                                    <TotalCount imagen={img} texto={"Chico"} producto={"pedestales"} totalProdutos={totalChico} />
                                    <TotalCount imagen={img} texto={"Mediano"} producto={"maceta-aire"} totalProdutos={totalMediano} />
                                    <TotalCount imagen={img} texto={"Grande"} producto={"maceta-ceramica"} totalProdutos={totalGrande} />
                                    <TotalCount imagen={img} texto={"Total"} producto={"maceta-concreto"} totalProdutos={total} />
                                </div>
                            </div>

                            <div className='crud-align'>
                                <Crud producto={producto} titulo={titulo} />
                            </div>

                        </div>

                    </div>

                </div>
            </div>

        </>
    )
}

export default Producto;