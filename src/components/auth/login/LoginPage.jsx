import { useState } from "react";
import { auth } from "../../../firebase/config";
import { sendPasswordResetEmail, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../../../store/usersSlice";
import './styles.css';
import Logo from '../../../assets/images/Logo.jpg';

function LoginPage() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line
  // const [loginType, setLoginType] = useState("login");
  const [userCredentials, setUserCredentials] = useState({});
  const [error, setError] = useState("");

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      dispatch(setUser({id: user.uid, email: user.email}));
      
    } else {
      // User is signed out
      dispatch(setUser(null));
    }
    if (isLoading) {setIsLoading(false)};
  });

  function handleCredentials(e) {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  }

  // eslint-disable-next-line
  // function handleSignUp(e) {
  //   e.preventDefault();
  //   setError("");

  //   createUserWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
  //     .catch((error) => {
  //       setError(error.message);
  //     });
  // }

  function handleLogin(e) {
    e.preventDefault();
    setError("");

    signInWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
      .catch((error) => {
        setError(error.message);
      });
  }

  function handlePasswordReset() {
    const email = prompt("Please enter your email");
    sendPasswordResetEmail(auth, email)
    alert("Email sent! Check your inbox for reset instructions.");
  }

  return (
    <>
      {isLoading}

      <div className="container login-page">
        <div className="logo">
          <img src={Logo} alt="Creacionismo" />
        </div>
        <section>
          <h1>Iniciar sesión</h1>
          <p>______________</p>
          
          {/*
          // eslint-disable-next-line<div className="login-type">
            <button className={`btn ${loginType === "login" ? "selected" : ""}`} onClick={() => setLoginType("login")}>
              Login
            </button>
             <button className={`btn ${loginType === "signup" ? "selected" : ""}`} onClick={() => setLoginType("signup")}>
              Signup
            </button> 
          </div>*/}
          <form className="add-form login">
            <div className="form-control">
              <input onChange={(e) => { handleCredentials(e); }} type="text" name="email" placeholder="Correo electrónico"/>
            </div>
            <div className="form-control">
              <input onChange={(e) => { handleCredentials(e); }} type="password" name="password" placeholder="Contraseña" autoComplete="true"/>
            </div>
            
            {/* // eslint-disable-next-line
            {loginType === "login" ? ( */}
              <button onClick={(e) => { handleLogin(e); }} className="active btn btn-block">Ingresar</button>
            
            {/* // eslint-disable-next-line
            ) : (
               <button onClick={(e) => { handleSignUp(e); }} className="active btn btn-block">Sign Up</button>
             )} */}

            {
              error && 
              <div className="error">
                {error}
              </div>
            }

            <p onClick={handlePasswordReset} className="forgot-password">¿Olvidaste tu contraseña?</p>
          </form>
        </section>
      </div>
    </>
  );
}

export default LoginPage;
