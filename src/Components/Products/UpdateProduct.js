import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UpdateProduct() {
  const [post, setPost] = useState([]);
  const [isLastPage, setIsLastPage] = useState(false);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const fetchProducts = () => {
    if (!token) {
      navigate('/login'); // Rediriger vers la page de connexion si le token n'existe pas
    } else {
      const headers = {
        'Authorization': 'bearer ' + token
      };
      axios.get(`http://localhost:8000/api/products?page=${page}`, { headers })
        .then(data => {
          setPost(data.data);
          setIsLastPage(data.data.length < 6);
        });
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/login'); // Rediriger vers la page de connexion si le token n'existe pas
    } else {
      const headers = {
        'Authorization': 'bearer ' + token
      };
      axios.get(`http://localhost:8000/api/products?page=${page}`, { headers })
        .then(data => {
          setPost(data.data);
          setIsLastPage(data.data.length < 6);
        });
    }
  }, [navigate, token, page]);

  const handleUpdate = (id, name, price) => {
    const updatedProduct = {
      name: name,
      price: price
    };
    const headers = {
      'Authorization': 'bearer ' + token
    };
    axios({
      method: 'put',
      url: `http://localhost:8000/api/products/${id}`,
      headers: headers,
      data: updatedProduct,
    })
      .then(response => {
        console.log(response);
        alert('Produit modifié avec succès !');
        setPost(post.map(product => product.id === id ? response.data : product)); // Mettre à jour la liste des produits
        fetchProducts(); // Rafraîchir la liste des produits après la mise à jour
      })
      .catch(error => {
        console.error('Erreur lors de la modification du produit', error);
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
    <h1>Modifier un produit</h1>
    <div className="row">
      {post.map((data) => {
        return (
          <div className="col-sm-4 products" key={data.id}>
            <div className="card">
              <div className="card-body">
                <form onSubmit={(e) => {
                  e.preventDefault();
                  handleUpdate(data.id, data.name, data.price);
                }}>
                  <div className="form-group">
                    <label>ID:</label>
                    <input type="text" value={data.id} readOnly className="form-control" />
                  </div>
                  <div className="form-group">
                    <label>Nom:</label>
                    <input type="text" defaultValue={data.name} onChange={(e) => data.name = e.target.value} className="form-control" />
                  </div>
                  <div className="form-group">
                    <label>Prix:</label>
                    <input type="text" defaultValue={data.price} onChange={(e) => data.price = e.target.value} className="form-control" />
                  </div>
                  <button type="submit" className="btn button2 mt-3">Modifier</button>
                </form>
              </div>
            </div>
          </div>
        );
      })}
    </div>
      <button onClick={prevPage} className="btn buttonNav" disabled={page === 1}>Page précédente</button>
      <button onClick={nextPage} className="btn buttonNav" disabled={isLastPage}>Page suivante</button>
    </div>
  );
}

export default UpdateProduct;