import React, { useEffect } from 'react';
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
import { useLocation } from "react-router-dom";

import Catalogos from '../../pages/catalogos/index.jsx';

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

    const { pathname } = useLocation();

    useEffect(() => {
        console.log("Ruta actual:", pathname);
    }, [pathname]);

    return (
        <>
            <div className='display-menu'>
                <div className="header-btns">

                    <NavLink to="/" className="btn" style={({ isActive }) => isActive ? { color: '#AEB879', fontWeight: '600' } : { color: '#B1B1B1' } }>
                        <HomeRoundedIcon></HomeRoundedIcon>
                        Dashboard
                    </NavLink>

                    <NavLink to="/menu-catalogos" className="btn" style={({ isActive }) => isActive ? { color: '#AEB879', fontWeight: '600' } : { color: '#B1B1B1' } }>
                        <StorageRoundedIcon></StorageRoundedIcon>
                        Catálogos
                    </NavLink>

                    <NavLink to="/pedidos" className="btn" style={({ isActive }) => isActive ? { color: '#AEB879', fontWeight: '600' } : { color: '#B1B1B1' } }>
                        <ShoppingBasketRoundedIcon></ShoppingBasketRoundedIcon>
                        Pedidos
                    </NavLink>

                    <NavLink to="/configuracion" className="btn" style={({ isActive }) => isActive ? { color: '#AEB879', fontWeight: '600' } : { color: '#B1B1B1' } }>
                        <SettingsRoundedIcon></SettingsRoundedIcon>
                        Configuración
                    </NavLink>

                </div>

            </div>

        </>
    )
}

export default Menu;
