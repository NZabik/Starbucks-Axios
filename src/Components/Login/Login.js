import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate
import './Login.css';
import { AuthContext } from '../App/App';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // Ajouter un état pour le message d'erreur
    const navigate = useNavigate(); // Utiliser useNavigate
    const {isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/login_check', {
                username: username,
                password: password
            });

            const token = response.data.token;
            localStorage.setItem('token', token); // Stocker le token dans le localStorage pour une utilisation ultérieure
            setIsAuthenticated(true);
            setUsername(''); // Réinitialiser le nom d'utilisateur
            navigate('/'); // Rediriger vers la page d'accueil
        } catch (error) {
            console.error('Erreur lors de la connexion', error);
            setError('Nom d\'utilisateur ou mot de passe incorrect');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // Supprimer le token du localStorage
        setIsAuthenticated(false);
        navigate('/'); // Rediriger vers la page de connexion
    };

    return (
        <div className='container text-center'>
            <h1>Connexion / déconnexion</h1>
            {error && <p>{error}</p>} {/* Afficher le message d'erreur s'il existe */}
            {!isAuthenticated && <div className="Form">
            <input className="form-control form-control-lg" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Nom d'utilisateur" />
            </div>}
            {!isAuthenticated && <div className="Form">
            <input className="form-control form-control-lg" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" />
            </div>}
            <div>
            {isAuthenticated && <button className="btn button2 mt-3" onClick={handleLogout}>Se déconnecter</button>}
            {!isAuthenticated && <button className="btn button2 mt-3" onClick={handleLogin}>Se connecter</button>}
            </div>
        </div>
    );
}

export default Login;