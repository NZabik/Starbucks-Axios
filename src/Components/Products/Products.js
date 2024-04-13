import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Products.css';

function Products() {
    const [post, setPost] = useState([]);
    const [page, setPage] = useState(1);
    const [isLastPage, setIsLastPage] = useState(false); // Ajouter un état pour suivre si vous êtes à la dernière page
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
                setPost(data.data);
                setIsLastPage(data.data.length < 10); // Si le nombre de produits est inférieur à 10, vous êtes à la dernière page
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
                    <div className="products" key={data.id}>
                        <div>{"id: " + data.id}</div>
                        <div>{"Nom: " + data.name}</div>
                        <div>{"Prix: " + data.price + " €"}</div>
                    </div>
                );
            })}
            <button onClick={prevPage} className="buttonNav">Page précédente</button>
            <button onClick={nextPage} className="buttonNav" disabled={isLastPage}>Page suivante</button>
        </div>
    );
}

export default Products;