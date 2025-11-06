import React, { useState, useEffect } from 'react';
import { contactsAPI, groupsAPI } from '../services/api';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalContacts: 0,
    totalGroups: 0,
    recentContacts: []
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [contactsRes, groupsRes] = await Promise.all([
        contactsAPI.getAll(),
        groupsAPI.getAll()
      ]);
      
      setStats({
        totalContacts: contactsRes.data.length,
        totalGroups: groupsRes.data.length,
        recentContacts: contactsRes.data.slice(0, 5)
      });
    } catch (error) {
      console.error('Erreur lors du chargement des statistiques:', error);
    }
  };

  return (
    <div className="container" style={{ paddingTop: '2rem' }}>
      <h1 className="title">📊 Dashboard</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', margin: '2rem 0' }}>
        <div className="card">
          <div className="card-body" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👥</div>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '2rem', color: '#3b82f6' }}>{stats.totalContacts}</h3>
            <p style={{ margin: 0, color: '#6b7280' }}>Contacts</p>
            <Link to="/contacts" className="btn btn-primary" style={{ marginTop: '1rem', display: 'inline-block', textDecoration: 'none' }}>
              Voir tous
            </Link>
          </div>
        </div>

        <div className="card">
          <div className="card-body" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📁</div>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '2rem', color: '#10b981' }}>{stats.totalGroups}</h3>
            <p style={{ margin: 0, color: '#6b7280' }}>Groupes</p>
            <Link to="/groups" className="btn btn-success" style={{ marginTop: '1rem', display: 'inline-block', textDecoration: 'none' }}>
              Voir tous
            </Link>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">📋 Actions rapides</h2>
        </div>
        <div className="card-body">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <Link to="/contacts/new" className="btn btn-success" style={{ textDecoration: 'none', textAlign: 'center' }}>
              ➕ Nouveau contact
            </Link>
            <Link to="/groups/new" className="btn btn-primary" style={{ textDecoration: 'none', textAlign: 'center' }}>
              📁 Nouveau groupe
            </Link>
          </div>
        </div>
      </div>

      {stats.recentContacts.length > 0 && (
        <div className="card" style={{ marginTop: '2rem' }}>
          <div className="card-header">
            <h2 className="card-title">🕒 Contacts récents</h2>
          </div>
          <div className="card-body">
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              {stats.recentContacts.map((contact) => (
                <div key={contact.id} style={{ padding: '0.75rem', border: '1px solid #e5e7eb', borderRadius: '0.375rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong>{contact.first_name} {contact.last_name}</strong>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>{contact.email}</div>
                  </div>
                  {contact.group && (
                    <span className="contact-badge">{contact.group.name}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;