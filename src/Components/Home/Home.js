import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
    return (
        <div>
            <h1>Bienvenue sur Starbucks</h1>
            <div>
                <Link to="/login">
                    <button className="button">Se connecter</button>
                </Link>
            </div>
            <div>
                <Link to="/products">
                    <button className="button2">Voir les produits</button>
                </Link>
            </div>
            <div>
                <Link to="/add-product">
                    <button className="button2">Ajouter un produit</button>
                </Link>
            </div>
        </div>
    );
}

export default Home;