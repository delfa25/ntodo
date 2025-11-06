import React, { useState, useEffect, useCallback } from 'react';
import { contactsAPI, groupsAPI } from '../services/api';
import { Link } from 'react-router-dom';
import '../components/Table.css';

const ContactsPage = () => {
  const [contacts, setContacts] = useState([]);
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState('');

  const loadContacts = useCallback(async () => {
    try {
      const response = selectedGroup 
        ? await contactsAPI.getByGroup(selectedGroup)
        : await contactsAPI.getAll();
      setContacts(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des contacts:', error);
    }
  }, [selectedGroup]);

  const loadGroups = async () => {
    try {
      const response = await groupsAPI.getAll();
      setGroups(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des groupes:', error);
    }
  };

  useEffect(() => {
    loadContacts();
    loadGroups();
  }, [loadContacts]);

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce contact ?')) {
      try {
        await contactsAPI.delete(id);
        loadContacts();
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
      }
    }
  };

  return (
    <div className="container" style={{ paddingTop: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 className="title">👥 Contacts</h1>
        <Link to="/contacts/new" className="btn btn-success" style={{ textDecoration: 'none' }}>
          ➕ Nouveau contact
        </Link>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <select
          value={selectedGroup}
          onChange={(e) => setSelectedGroup(e.target.value)}
          className="input"
          style={{ maxWidth: '300px' }}
        >
          <option value="">Tous les groupes</option>
          {groups.map((group) => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>
      </div>

      {contacts.length === 0 ? (
        <div className="empty-contacts">
          <div className="empty-icon">📞</div>
          <p>Aucun contact</p>
          <Link to="/contacts/new" className="btn btn-success" style={{ textDecoration: 'none' }}>
            Créer le premier contact
          </Link>
        </div>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Email</th>
                <th>Téléphone</th>
                <th>Adresse</th>
                <th>Groupe</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact.id}>
                  <td>{contact.first_name} {contact.last_name}</td>
                  <td>
                    <a href={`mailto:${contact.email}`} className="table-link">
                      {contact.email}
                    </a>
                  </td>
                  <td>
                    {contact.phone ? (
                      <a href={`tel:${contact.phone}`} className="table-link">
                        {contact.phone}
                      </a>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td>{contact.address || '-'}</td>
                  <td>
                    {contact.group ? (
                      <span className="table-badge">
                        {contact.group.name}
                      </span>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td>
                    <div className="table-actions">
                      <Link
                        to={`/contacts/edit/${contact.id}`}
                        className="table-btn edit"
                        title="Modifier le contact"
                      >
                        ✏️
                      </Link>
                      <button
                        onClick={() => handleDelete(contact.id)}
                        className="table-btn delete"
                        title="Supprimer le contact"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ContactsPage;