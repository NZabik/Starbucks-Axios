import React, { useState } from 'react';
import axios from 'axios';

function AddProduct() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const headers = {
      'Authorization': 'bearer ' + token
    };
    axios({
      method: 'post',
      url: 'http://localhost:8000/api/products',
      headers: headers,
      data: {
        name: name,
        price: price
      }
    })
      .then(response => {
        console.log(response);
        alert('Produit ajouté avec succès !'); // Afficher un message de succès
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className='container text-center'>
            <h1>Ajouter un produit</h1>
      <form onSubmit={handleSubmit}>
        <div className="Form">
          <input className='form-control form-control-lg' type="text" placeholder="Nom du produit" onChange={e => setName(e.target.value)} />
        </div>
        <div className="Form">
          <input className='form-control form-control-lg' type="float" placeholder="Prix du produit" onChange={e => setPrice(e.target.value)} />
        </div>
        <div>
          <button type="submit" className='btn button2'>Ajouter le produit</button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;