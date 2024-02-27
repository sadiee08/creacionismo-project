import { NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config.js";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/usersSlice.js";
import Header from "../header/index.jsx";
import "./styles.css";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import ShoppingBasketRoundedIcon from '@mui/icons-material/ShoppingBasketRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';

const Menu = () => {

    const dispatch = useDispatch();

    function handleSignOut() {
        signOut(auth).then(() => {
            // Sign-out successful.
            dispatch(setUser(null));
        }).catch((error) => {
            // An error happened.
            console.log(error);
        });
    }

    return (
        <>
            <Header />

            <div className="header-btns">

                <NavLink to="/">
                    <button className="btn">
                        <HomeRoundedIcon></HomeRoundedIcon>
                        Dashboard
                    </button>
                </NavLink>

                <NavLink to="/add-book">
                    <button className="btn">
                        <StorageRoundedIcon></StorageRoundedIcon>
                        Catálogos
                    </button>
                </NavLink>

                <NavLink to="/add-book">
                    <button className="btn">
                        <ShoppingBasketRoundedIcon></ShoppingBasketRoundedIcon>
                        Pedidos
                    </button>
                </NavLink>

                <NavLink to="/add-book">
                    <button className="btn">
                        <SettingsRoundedIcon></SettingsRoundedIcon>
                        Configuración
                    </button>
                </NavLink>

            </div>

        </>
    )
}

export default Menu;
