import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Importer useNavigate
import './Login.css';
import { AuthContext } from '../App/App';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Utiliser useNavigate
    const { setIsAuthenticated } = useContext(AuthContext);
    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/login_check', {
                username: username,
                password: password
            });

            const token = response.data.token;
            localStorage.setItem('token', token); // Stocker le token dans le localStorage pour une utilisation ultérieure
            setIsAuthenticated(true);
            navigate('/'); // Rediriger vers la page d'accueil
        } catch (error) {
            console.error('Erreur lors de la connexion', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // Supprimer le token du localStorage
        setIsAuthenticated(false);
        navigate('/'); // Rediriger vers la page de connexion
    };

    return (
        <div>
            <Link to="/"> {/* Ajouter un lien vers la page d'accueil */}
                <button className="buttonHome">Retour à la page d'accueil</button>
            </Link>
            <h1>Connexion</h1>
            <div className="Form">
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Nom d'utilisateur" />
            </div>
            <div className="Form">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" />
            </div>
            <div>
            <button className="button3" onClick={handleLogout}>Se déconnecter</button>
            <button className="button" onClick={handleLogin}>Se connecter</button>
            </div>
        </div>
    );
}

export default Login;