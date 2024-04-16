import './App.css';
import LoginPage from './components/auth/login/LoginPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { selectUsers } from './store/usersSlice.js';
import { useSelector } from 'react-redux';
import Home from './pages/home/index.jsx';
import Catalogos from './pages/catalogos/index.jsx';
import Pedidos from './pages/pedidos/index.jsx';
import Configuracion from './pages/configuracion/index.jsx';
import Producto from './pages/producto/producto.jsx';

import Pedestales from "../src/assets/images/pedestales.jpg"
import Aire from "../src/assets/images/aire.jpg"
import Ceramica from "../src/assets/images/ceramica.jpg"
import Concreto from "../src/assets/images/concreto.jpg"
import Tierra from "../src/assets/images/tierra.jpg"

function App() {
  const user = useSelector(selectUsers);

  return (
    <>  
      { user.currentUser ?
      <BrowserRouter>
        <Routes>
          {/* Menu */}
          <Route index element={<Home />}  />
          <Route path="/menu-catalogos" element={<Catalogos />} />
          <Route path="/pedidos" element={<Pedidos />} />
          <Route path="/configuracion" element={<Configuracion />} />

          {/* menu-catalogos */}
          <Route path="/menu-catalogos/pedestales" element={<Producto producto={"pedestales"} titulo={"Pedestales"} img={Pedestales} />} />
          <Route path="/menu-catalogos/maceta-aire" element={<Producto producto={"maceta-aire"} titulo={"Macetas Aire"} img={Aire} />} />
          <Route path="/menu-catalogos/maceta-ceramica" element={<Producto producto={"maceta-ceramica"} titulo={"Macetas Cerámica"} img={Ceramica} />} />
          <Route path="/menu-catalogos/maceta-concreto" element={<Producto producto={"maceta-concreto"} titulo={"Macetas Concreto"} img={Concreto} />} />
          <Route path="/menu-catalogos/maceta-tierra" element={<Producto producto={"maceta-tierra"} titulo={"Macetas Tierra"} img={Tierra} />} />

        </Routes>
      </BrowserRouter> 
      :
      <LoginPage />
      }
    </>
  )
}

export default App

