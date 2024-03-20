import Menu from "../../components/menu/menu";
import Header from "../../components/header";
import "./styles.css";

const Home = () => {
    return (
        <>
            <div>
                <Header/>
                <div className="display-menu">
                    <Menu />
                    <h1>hola desde Dashboard</h1>
                </div>
            </div>

        </>
    )
}

export default Home;