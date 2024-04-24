import Menu from "../../components/menu/menu";
import Header from "../../components/header";
import "./styles.css";

import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/config";

const Configuracion = () => {

    const handlePasswordReset = () => {
        const email = prompt("Ingresa tu correo electrónico para restablecer la contraseña");
        sendPasswordResetEmail(auth, email);
        alert("Se ha enviado un correo electrónico a tu bandeja de entrada con las instrucciones para restablecer la contraseña");
    }
    
    return (
        <>
            <div className="con">
                <Header/>
                <div className="display-menu">
                    <Menu />
                    <div className="container-config">
                        <h2>Configuración</h2>
                        <div>
                            <p>¿Deseas cambiar la contraseña?</p>
                            <button onClick={handlePasswordReset} className="btn-password">Cambiar contraseña</button>
                        </div>
                        
                    </div>
                </div>
            </div>

        </>
    )
}

export default Configuracion;