import React, { useEffect, useState } from 'react';
import "./styles.css";

import Menu from '../../components/menu/menu';
import Header from '../../components/header';
import TotalCount from '../../components/common/total-count';
import Crud from '../../components/common/crud/crud';

import Pedestales from "../../assets/images/pedestales.jpg"
import Aire from "../../assets/images/aire.jpg"
import Ceramica from "../../assets/images/ceramica.jpg"
import Concreto from "../../assets/images/concreto.jpg"
import Tierra from "../../assets/images/tierra.jpg"

import { db } from '../../firebase/config';
import { collection, getDocs, query, where } from 'firebase/firestore';

const Producto = ({ producto, titulo }) => {
    const [totalGrande, setTotalGrande] = useState(0);
    const [totalMediano, setTotalMediano] = useState(0);
    const [totalChico, setTotalChico] = useState(0);
    const [totalNoAplica, setTotalNoAplica] = useState(0);
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

        const fetchNoAplica = async () => {
            const q = query(productCollection, where('size', '==', 'No aplica'));
            const querySnapshot = await getDocs(q);
            setTotalNoAplica(querySnapshot.size);
        }

        fetchTotalGrande();
        fetchTotalMediano();
        fetchTotalChico();
        fetchNoAplica();
        setTotal(totalGrande + totalMediano + totalChico + totalNoAplica);
        
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
                                    <TotalCount imagen={Pedestales} texto={"Chico"} producto={"pedestales"} totalProdutos={totalChico} />
                                    <TotalCount imagen={Pedestales} texto={"Mediano"} producto={"maceta-aire"} totalProdutos={totalMediano}/>
                                    <TotalCount imagen={Pedestales} texto={"Grande"} producto={"maceta-ceramica"} totalProdutos={totalGrande} />
                                    <TotalCount imagen={Pedestales} texto={"Total"} producto={"maceta-concreto"} totalProdutos={total} />
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