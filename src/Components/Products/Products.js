import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Products.css';

function Products() {
    const [post, setPost] = useState([]);
    const [page, setPage] = useState(1);
    const token = localStorage.getItem('token');
    const navigate = useNavigate(); // Utiliser useNavigate

    useEffect(() => {
        if (!token) {
            navigate('/login'); // Rediriger vers la page de connexion si le token n'existe pas
        } else {
            const headers = {
                'Authorization': 'Bearer '+ token
            };
            axios.get(`http://localhost:8000/api/products?page=${page}`, { headers }).then((data) => {
                console.log(data);
                setPost(data.data);
            });
        }
    }, [navigate, token, page]);

    const nextPage = () => {
        setPage(page + 1);
    }

    const prevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    }

    return (
        <div className="product">
            <Link to="/"> {/* Ajouter un lien vers la page d'accueil */}
            <button className="buttonHome">Retour à la page d'accueil</button>
            </Link>
            <h1>Products</h1>
            {post.map((data) => {
                return (
                    <ul className="products" key={data.id}>
                        <li>{"id: " + data.id}</li>
                        <li>{"Nom: " + data.name}</li>
                        <li>{"Prix: " + data.price + " €"}</li>
                    </ul>
                );
            })}
            <button onClick={prevPage}>Page précédente</button>
            <button onClick={nextPage}>Page suivante</button>
        </div>
    );
}

export default Products;