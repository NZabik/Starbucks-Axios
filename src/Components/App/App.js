import React, { createContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from '../Login/Login';
import Products from '../Products/Products';
import Home from '../Home/Home';
import AddProduct from '../Products/AddProducts';
import RemoveProduct from '../Products/RemoveProduct';
import UpdateProduct from '../Products/UpdateProduct';
import axios from 'axios';

// Créer un contexte d'authentification
export const AuthContext = createContext();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [roles, setRoles] = useState('');
  const token = localStorage.getItem('token');
  // Mettre à jour l'état d'authentification lorsque le token change
  useEffect(() => {
    
    if (!token) return;
    setIsAuthenticated(!!token);
    const headers = {
      'Authorization': 'bearer ' + token
    };

    axios.get('http://localhost:8000/api/decode', { headers }).then(data => {
        setUsername(data.data.username);
        setRoles(data.data.roles);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération du nom d\'utilisateur', error);
      });
  }, [token]);
  // const roles = JSON.parse(role);
  
  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <Router>
        {isAuthenticated && <p>Bonjour {username}, vous êtes connecté.</p>}
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