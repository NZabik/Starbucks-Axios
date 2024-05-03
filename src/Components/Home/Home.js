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

    const hexagonItems = [
        { title: 'Voir les produits', route: '/products', role: 'ROLE_USER' },
        { title: 'Ajouter un produit', route: '/add-product', role: 'ROLE_ADMIN' },
        { title: 'Modifier un produit', route: '/update-product', role: 'ROLE_ADMIN' },
        { title: 'Supprimer un produit', route: '/remove-product', role: 'ROLE_ADMIN' },
    ];


    return (
        <div className='container'>
            <div className="text-center">
                <h1>Bienvenue sur Starbucks</h1>
                {!isAuthenticated && <p>Veuillez vous connecter pour voir nos produits</p>}
            </div>
            <div className="hexagon-menu clear row">
                {hexagonItems.map((item, index) => {
                    if (item.role && !roles.includes(item.role)) {
                        return null; // Ne pas afficher les éléments si l'utilisateur n'a pas le bon rôle
                    }
                    return (
                        <Link key={index} to={item.route} className="hexagon-item">
                            <div className="hex-item">
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                            <div className="hex-item">
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                            <div className="hex-content">
                                <div className="hex-content-inner">
                                    <div className="title">{item.title}</div>
                                </div>
                                <svg viewBox="0 0 173.20508075688772 200" height="200" width="174" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M86.60254037844386 0L173.20508075688772 50L173.20508075688772 150L86.60254037844386 200L0 150L0 50Z"
                                        fill="#1e2530"></path>
                                </svg>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );

}

export default Home;