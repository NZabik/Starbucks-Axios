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
          <h2 className='title fs-1'>Starbucks</h2>
      </Link>
        
        <div className='userName'>
        {isAuthenticated && <div>Bonjour </div>}
        {isAuthenticated && <div>{username}</div>}
                <Link to="/login">
                <button className="btn button mt-3">{isAuthenticated ? 'Déconnexion' : 'Connexion'}</button>
                </Link>
            </div>
      </nav>
    </header>
  );
}
export default Header;