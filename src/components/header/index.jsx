import React from "react";
import { NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config.js";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/usersSlice.js";
import "./styles.css";
import LogoutIcon from '@mui/icons-material/Logout';
import Logo from "../../assets/images/Logo.jpg";

const Header = () => {
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
        <nav className="nav-style">
            <div className="h1-img-style">
                <img src={Logo} alt="Creacionismo" className="img-style"/>
                <h1>Creacionismo 104</h1>
            </div>
            

            <div className="header-btn">

                <button onClick={handleSignOut} className="btn-logout">
                   <LogoutIcon></LogoutIcon>
                </button>

            </div>
        </nav>
    )
}
export default Header;