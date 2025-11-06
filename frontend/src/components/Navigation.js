import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navigation = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={{ 
      background: 'white', 
      borderBottom: '1px solid #e5e7eb', 
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' 
    }}>
      <div className="container">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: '1rem 0' 
        }}>
          <Link 
            to="/" 
            style={{ 
              textDecoration: 'none', 
              fontSize: '1.5rem', 
              fontWeight: 'bold', 
              color: '#111827' 
            }}
          >
            📞 Gestion de Contacts
          </Link>
          
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Link 
              to="/" 
              className={`btn ${isActive('/') ? 'btn-primary' : 'btn-secondary'}`}
              style={{ textDecoration: 'none' }}
            >
              📊 Dashboard
            </Link>
            <Link 
              to="/contacts" 
              className={`btn ${isActive('/contacts') ? 'btn-primary' : 'btn-secondary'}`}
              style={{ textDecoration: 'none' }}
            >
              👥 Contacts
            </Link>
            <Link 
              to="/groups" 
              className={`btn ${isActive('/groups') ? 'btn-primary' : 'btn-secondary'}`}
              style={{ textDecoration: 'none' }}
            >
              📁 Groupes
            </Link>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginLeft: '1rem', paddingLeft: '1rem', borderLeft: '1px solid #e5e7eb' }}>
              <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>👋 {user?.name}</span>
              <button 
                onClick={logout}
                className="btn btn-secondary"
                style={{ fontSize: '0.875rem' }}
              >
                🚪 Déconnexion
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;