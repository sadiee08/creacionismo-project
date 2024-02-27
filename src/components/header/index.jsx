import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
// import { useAuth } from "../../contexts/authContext";

const Header = () => {
    const navigate = useNavigate();
    const { userLoggedIn } = useAuth();
    return (
        <nav className="flex flex-row w-full">
            {
                // userLoggedIn 
                // ? 
                // <>
                //     <button onClick={() => {doSignOut().then(() => { navigate('/login') }) }} className="p-2">Logout</button>
                // </>
                // :
                // <>
                //     <Link className='text-sm text-blue-600 underline' to={'/login'}>Login</Link>
                // </>
                
            }
        </nav>
    )
}
export default Header;