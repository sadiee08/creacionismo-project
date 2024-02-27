import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config.js";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/usersSlice.js";

const Home = () => {
    const dispatch = useDispatch();

    function handleSignOut() {
        // if (confirm("Are you sure you want to sign out?")){
          signOut(auth).then(() => {
          // Sign-out successful.
          dispatch(setUser(null));
          }).catch((error) => {
            // An error happened.
            console.log(error);
          });
        //}
    }

    return (
        <div>
            Hello, te has logeado correctamente.
            <button onClick={handleSignOut} className="btn transparent">
                Logout
            </button>
        </div>
    )
}
export default Home;