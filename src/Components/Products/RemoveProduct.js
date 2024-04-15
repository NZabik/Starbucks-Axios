import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Products.css';

function RemoveProducts() {
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
                'Authorization': 'Bearer ' + token
            };
            axios.get(`http://localhost:8000/api/products?page=${page}&limit=6`, { headers }).then((data) => {
                setPost(data.data);
                setIsLastPage(data.data.length < 6); // Si le nombre de produits est inférieur à 10, vous êtes à la dernière page
            });
        }
    }, [navigate, token, page]);

    const handleDelete = (id) => {
        const headers = {
            'Authorization': 'Bearer ' + token
        };
        axios({
            method: 'delete',
            url: `http://localhost:8000/api/products/${id}`,
            headers: headers,
        })
            .then(response => {
                console.log(response);
                alert('Produit supprimé avec succès !');
                setPost(post.filter(product => product.id !== id)); // Mettre à jour la liste des produits
            })
            .catch(error => {
                console.error('Erreur lors de la suppression du produit', error);
            });
    };

    const nextPage = () => {
        setPage(page + 1);
    }

    const prevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    }

    return (
        <div className='container'>
            <h1>Supprimer un produit</h1>
            <div className="row">
                {post.map((data) => {
                    return (
                        <div className="col-sm-4 products" key={data.id}>
                            <div className="card">
                                <div className="card-body">
                                <p className="card-text">{"Id: " + data.id }</p>
                                    <h5 className="card-title">{"Nom: " + data.name}</h5>
                                    <p className="card-text">{"Prix: " + data.price + " €"}</p>
                                    <button onClick={() => handleDelete(data.id)} className="btn button3">Supprimer</button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <button onClick={prevPage} className="btn buttonNav">Page précédente</button>
            <button onClick={nextPage} className="btn buttonNav" disabled={isLastPage}>Page suivante</button>
        </div>
    );
}

export default RemoveProducts;