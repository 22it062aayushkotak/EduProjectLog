import { Route, Routes } from 'react-router-dom'
import './App.css'
import Not_found_404 from './Components/Not_found_404';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import Register from './Components/Register';


function App() {
  return (
    <>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Not_found_404 />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />        
      </Routes>      
    </>
  )
}

export default App
