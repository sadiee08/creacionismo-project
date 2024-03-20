import Menu from "../../components/menu/menu";
import Header from "../../components/header";
import "./styles.css";

const Dashboard = () => {
    return (
        <>
            <div>
                <Header/>
                <div className="display-menu">
                    <Menu />
                    <h1>hola desde Pedidos</h1>
                </div>
            </div>
        </>
    )
}

export default Dashboard;