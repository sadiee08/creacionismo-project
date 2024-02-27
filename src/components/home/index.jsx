import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config.js";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/usersSlice.js";
import Menu from "../menu/menu.jsx";

const Home = () => {
    const dispatch = useDispatch();

    return (
        <div>
            <Menu />
        </div>
    )
}
export default Home;