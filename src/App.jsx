import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import Not_found_404 from './Components/Not_found_404';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import Register from './Components/Register';
import { jwtDecode } from "jwt-decode";
import ViewProject from './Components/ViewProject';
import AddProject from './Components/AddProject';
import { useEffect } from 'react';


function App() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  
  let decodedToken = "";
  if (token) {
     decodedToken = jwtDecode(token);
    console.log(decodedToken.name);
  }

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }
  , [navigate]);
  return (
    <>
      <Routes>
        <Route path="/dashboard" element={<Dashboard name={decodedToken.name}/>} />   
        <Route path="/" element={<Dashboard name={decodedToken.name}/>} />
        <Route path="/viewProject" element={<ViewProject  name={decodedToken.name} />} />
        <Route path="/addProject" element={<AddProject  name={decodedToken.name} />} />     
        <Route path="*" element={<Not_found_404 />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />        
      </Routes>      
    </>
  )
}

export default App
