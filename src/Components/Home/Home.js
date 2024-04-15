import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import axios from 'axios';

function Home() {
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
        <div>
            <h1>Bienvenue sur Starbucks</h1>
            <div>
                <Link to="/login">
                    <button className="button">Connexion/déconnexion</button>
                </Link>
            </div>
            <div>
            {roles.includes("ROLE_USER") && (
                <Link to="/products">
                    <button className="button2">Voir les produits</button>
                </Link>)} {/* N'afficher le bouton Voir les produits que si le rôle contient 'ROLE_USER' */}
            </div>
            <div>
            {roles.includes("ROLE_ADMIN") && (
        <Link to="/add-product">
                    <button className="button2">Ajouter un produit</button>
                </Link>)} {/* N'afficher le bouton Ajouter un produit que si le rôle contient 'ROLE_ADMIN' */}
            </div>
            <div>
            {roles.includes("ROLE_ADMIN") && (
        <Link to="/remove-product">
                    <button className="button3">Supprimer un produit</button>
                </Link>)} {/* N'afficher le bouton Ajouter un produit que si le rôle contient 'ROLE_ADMIN' */}
            </div>
        </div>
    );
}

export default Home;