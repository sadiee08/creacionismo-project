import './App.css';
import LoginPage from './components/auth/login/LoginPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { selectUsers } from './store/usersSlice.js';
import { useSelector } from 'react-redux';
import  Home from './components/home/index.jsx';


function App() {
  const user = useSelector(selectUsers);

  return (
    <>  
      { user.currentUser ?
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />}  />
        </Routes>
      </BrowserRouter> 
      :
      <LoginPage />
      }
    </>
  )
}

export default App

