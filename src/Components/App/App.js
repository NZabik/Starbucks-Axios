import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from '../Login/Login';
import Products from '../Products/Products';
import Home from '../Home/Home';
import AddProduct from '../Products/AddProducts';
import RemoveProduct from '../Products/RemoveProduct';
import UpdateProduct from '../Products/UpdateProduct';
import Header from '../Header/Header';
import axios from 'axios';

// Créer un contexte d'authentification
export const AuthContext = React.createContext();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [roles, setRoles] = useState('');
  const [username, setUsername] = useState('');
  const token = localStorage.getItem('token');
  // Mettre à jour l'état d'authentification lorsque le token change
  useEffect(() => {
    
    if (!token) return;
    setIsAuthenticated(!!token);
    const headers = {
      'Authorization': 'bearer ' + token
    };

    axios.get('http://localhost:8000/api/decode', { headers }).then(data => {
        setRoles(data.data.roles);
        setUsername(data.data.username);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération du role utilisateur', error);
      });
  }, [token]);
  
  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, roles, username, setUsername }}>
      <Router>
        <Header />
        
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            {roles.includes("ROLE_USER") && <Route path="/products" element={<Products />} />} {/* N'afficher la route Product que si le rôle contient 'ROLE_USER' */}
            {roles.includes("ROLE_ADMIN") && <Route path="/add-product" element={<AddProduct />} />} {/* N'afficher la route AddProduct que si le rôle contient 'ROLE_ADMIN' */}
            {roles.includes("ROLE_ADMIN") && <Route path="/update-product" element={<UpdateProduct />} />} {/* N'afficher la route RemoveProduct que si le rôle contient 'ROLE_ADMIN' */}
            {roles.includes("ROLE_ADMIN") && <Route path="/remove-product" element={<RemoveProduct />} />} {/* N'afficher la route RemoveProduct que si le rôle contient 'ROLE_ADMIN' */}
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;