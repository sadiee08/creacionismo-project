import Menu from "../../components/menu/menu";
import Header from "../../components/header";
import "./styles.css";

import Pedestales from "../../assets/images/pedestales.jpg"
import Aire from "../../assets/images/aire.jpg"
import Ceramica from "../../assets/images/ceramica.jpg"

import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';

const Home = () => {
    const productos = [
        { nombre: 'Pedestal', precio: 1500, porcentaje: 80 },
        { nombre: 'Maceta aire', precio: 2000, porcentaje: 40 },
        { nombre: 'Maceta cerámica', precio: 500, porcentaje: 50 },
    ];

    const randomData = () => {
        return Array.from({ length: 7 }, () => Math.floor(Math.random() * 10));
    };

    const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

    const data = [
        { id: 0, value: 10, label: 'series A' },
        { id: 1, value: 15, label: 'series B' },
        { id: 2, value: 20, label: 'series C' },
    ];

    return (
        <>
            <div className="con">
                <Header />
                <div className="display-menu">
                    <Menu />
                    <div className="container-dashboard">
                        <div className="container-dashboard-div-1">
                            <div className="display-title-container">
                                <h2>Productos tendencia</h2>
                                <table>
                                    <thead>
                                        <tr className="line-header">
                                            <th>Nombre</th>
                                            <th>Precio</th>
                                            <th>Porcentaje</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {productos.map((producto) => (
                                            <tr key={producto.nombre} className="center-body">
                                                <td>{producto.nombre}</td>
                                                <td>${producto.precio}</td>
                                                <td className="color-td">+{producto.porcentaje}%</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                            </div>
                            <div className="display-title-container-2">
                                <h2>Por acabar</h2>
                                <table>
                                    <tbody>
                                        <tr className="left-body-acabar">
                                            <td className="img-size">
                                                <img src={Pedestales} alt={"Pedestales"} />
                                            </td>
                                            <td>Pedestales</td>
                                            <td className="color-td-acabar">3</td>
                                        </tr>
                                        <tr className="left-body-acabar">
                                            <td className="img-size">
                                                <img src={Aire} alt={"Aire"} />
                                            </td>
                                            <td>Maceta Aire</td>
                                            <td className="color-td-acabar">5</td>
                                        </tr>
                                        <tr className="left-body-acabar">
                                            <td className="img-size">
                                                <img src={Ceramica} alt={"Ceramica"} />
                                            </td>
                                            <td>Maceta Céramica</td>
                                            <td className="color-td-acabar">6</td>
                                        </tr>
                                    </tbody>
                                </table>

                            </div>
                        </div>
                        <div className="container-dashboard-div-2">
                            <div className="display-title-container-bar">
                                <h2>Actividad semanal</h2>
                                <div className="bar-chart-style">
                                    <BarChart
                                        xAxis={[{ scaleType: 'band', data: daysOfWeek }]}
                                        series={[
                                            { data: randomData() },
                                            { data: randomData() }
                                        ]}
                                        width={500}
                                        height={300}
                                        colors={['#AEB879', '#EAB35A']}
                                    />
                                </div>

                            </div>
                            <div className="display-title-container">
                                <h2>Estadisticas tipo de servicio</h2>
                                <div className="pie-chart-style">
                                    <PieChart
                                        series={[
                                            {
                                                data: [
                                                    { id: 0, value: 10, label: 'Interior', color: '#AEB879'},
                                                    { id: 1, value: 15, label: 'Jardín', color: '#EAB35A' },
                                                    { id: 2, value: 20, label: 'Plantas', color: '#79A1B8'},
                                                ],
                                            },
                                        ]}
                                        width={400}
                                        height={200}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Home;