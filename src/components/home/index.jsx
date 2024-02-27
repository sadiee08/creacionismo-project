import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config.js";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/usersSlice.js";
import Header from "../header/index.jsx";

const Home = () => {
    const dispatch = useDispatch();

    return (
        <div>
            <Header />
            Hello, te has logeado correctamente.
        </div>
    )
}
export default Home;