import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../App/App';
import './Home.css';
import axios from 'axios';

function Home() {
    const { isAuthenticated } = React.useContext(AuthContext);
    const [roles, setRoles] = useState('');
    const token = localStorage.getItem('token');
    
    useEffect(() => {
        if (!token) return;
        const headers = {
            'Authorization': 'bearer ' + token
          };
        axios.get('http://localhost:8000/api/decode', { headers }).then(data => {
            setRoles(data.data.roles);
          })
          .catch(error => {
            console.error('Erreur lors de la récupération du role d\'utilisateur');
          });
      }, [token]);



    return (
        <body>
            <h1>Bienvenue sur Starbucks</h1>
            {!isAuthenticated && <p>Veuillez vous connecter pour voir nos produits</p>}
            <div>
            {roles.includes("ROLE_USER") && (
                <Link to="/products">
                    <button className="btn button2">Voir les produits</button>
                </Link>)} {/* N'afficher le bouton Voir les produits que si le rôle contient 'ROLE_USER' */}
            </div>
            <div>
            {roles.includes("ROLE_ADMIN") && (
        <Link to="/add-product">
                    <button className="btn button2">Ajouter un produit</button>
                </Link>)} {/* N'afficher le bouton Ajouter un produit que si le rôle contient 'ROLE_ADMIN' */}
            </div>
            <div>
            {roles.includes("ROLE_ADMIN") && (
        <Link to="/update-product">
                    <button className="btn button2">Modifier un produit</button>
                </Link>)} {/* N'afficher le bouton Ajouter un produit que si le rôle contient 'ROLE_ADMIN' */}
            </div>
            <div>
            {roles.includes("ROLE_ADMIN") && (
        <Link to="/remove-product">
                    <button className="btn button3">Supprimer un produit</button>
                </Link>)} {/* N'afficher le bouton Ajouter un produit que si le rôle contient 'ROLE_ADMIN' */}
            </div>
        </body>
    );
}

export default Home;