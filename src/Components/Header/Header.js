import React, { useState, useEffect } from 'react';
import { AuthContext } from '../App/App';
import { Link } from 'react-router-dom';
import './Header.css';


function Header() {
  const { isAuthenticated, username } = React.useContext(AuthContext);
  const [refresh, setRefresh] = useState(false); // Ajouter un état pour forcer le rafraîchissement

  useEffect(() => {
    setRefresh(!refresh); // Changer l'état refresh chaque fois que isAuthenticated ou username change
  }, [isAuthenticated, username, refresh]);

  return (
    <header>
      <nav>
      <Link to="/" className='siteTitle'>
          <img className='logo' src="/BSG.png" alt="logo" />
          <h1 className='title'>Starbucks</h1>
      </Link>
        {isAuthenticated && <p>Bonjour {username}, vous êtes connecté.</p>}
        {/* Ajoutez d'autres éléments à votre en-tête ici */}
      </nav>
    </header>
  );
}
export default Header;