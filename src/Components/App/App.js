import React, { createContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from '../Login/Login';
import Products from '../Products/Products';
import Home from '../Home/Home';
import AddProduct from '../Products/AddProducts';

// Créer un contexte d'authentification
export const AuthContext = createContext();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Mettre à jour l'état d'authentification lorsque le token change
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <Router>
        {isAuthenticated && <p>Vous êtes connecté !</p>}
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/products" element={<Products />} />
            <Route path="/add-product" element={<AddProduct />} />
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;