import './App.css';
import LoginPage from './components/auth/login/LoginPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { selectUsers } from './store/usersSlice.js';
import { useSelector } from 'react-redux';
import  Home from './pages/home/index.jsx';
import  Catalogos from './pages/catalogos/index.jsx';
import Pedidos from './pages/pedidos/index.jsx';
import Configuracion from './pages/configuracion/index.jsx';

function App() {
  const user = useSelector(selectUsers);

  return (
    <>  
      { user.currentUser ?
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />}  />
          <Route path="/menu-catalogos" element={<Catalogos />} />
          <Route path="/pedidos" element={<Pedidos />} />
          <Route path="/configuracion" element={<Configuracion />} />
        </Routes>
      </BrowserRouter> 
      :
      <LoginPage />
      }
    </>
  )
}

export default App

