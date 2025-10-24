import React from 'react'
import { BrowserRouter,Route,Navigate, Routes } from 'react-router-dom'
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import NotFound from "./pages/NotFound.jsx"
import Index from "./pages/index.jsx"
import ProtectedRoute from "./components/ProtectedRoutes.jsx"

function Logout(){
  localStorage.clear();
  return <Login />;
}

function RegisterAndLogout(){   /* ASI ME ASEGURO QUE NO HAY TOKENS ACTIVOS/GUARDADOS */ 
  localStorage.clear();
  return <Register />;
}



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path ="/" element={
          <ProtectedRoute>
            <Index />
          </ProtectedRoute>} 
        />
        
        <Route path="/login" element={<Login />} />
        
        <Route path="/register" element={<RegisterAndLogout />} />
        
        <Route path="/logout" element={<Logout />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>  )
}

export default App
