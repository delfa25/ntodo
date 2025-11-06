import React, { useState, useEffect } from 'react';
import { contactsAPI, groupsAPI } from '../services/api';
import './ContactList.css';

const ContactList = ({ selectedGroup }) => {
  const [contacts, setContacts] = useState([]);
  const [groups, setGroups] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [newContact, setNewContact] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
    group_id: ''
  });

  useEffect(() => {
    loadContacts();
    loadGroups();
  }, [selectedGroup]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadContacts = async () => {
    try {
      const response = selectedGroup 
        ? await contactsAPI.getByGroup(selectedGroup.id)
        : await contactsAPI.getAll();
      setContacts(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des contacts:', error);
    }
  };

  const loadGroups = async () => {
    try {
      const response = await groupsAPI.getAll();
      setGroups(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des groupes:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const contactData = {
        ...newContact,
        group_id: newContact.group_id || (selectedGroup ? selectedGroup.id : null)
      };
      
      if (editingContact) {
        await contactsAPI.update(editingContact.id, contactData);
      } else {
        await contactsAPI.create(contactData);
      }
      
      handleCancelEdit();
      loadContacts();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du contact:', error);
    }
  };

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

  const handleEdit = (contact) => {
    setEditingContact(contact);
    setNewContact({
      first_name: contact.first_name,
      last_name: contact.last_name,
      email: contact.email,
      phone: contact.phone || '',
      address: contact.address || '',
      group_id: contact.group_id || ''
    });
    setShowForm(true);
  };

  const handleCancelEdit = () => {
    setEditingContact(null);
    setNewContact({
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      address: '',
      group_id: ''
    });
    setShowForm(false);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">
          👥 Contacts {selectedGroup && <span style={{color: '#3b82f6'}}> - {selectedGroup.name}</span>}
        </h2>
        <div style={{display: 'flex', gap: '0.5rem'}}>
          {editingContact && (
            <button onClick={handleCancelEdit} className="btn btn-secondary">
              Annuler
            </button>
          )}
          <button
            onClick={() => editingContact ? handleCancelEdit() : setShowForm(!showForm)}
            className="btn btn-success"
          >
            {showForm ? 'Annuler' : '+ Nouveau contact'}
          </button>
        </div>
      </div>
      
      {showForm && (
        <div className="contact-form">
          <form onSubmit={handleSubmit} className="form-grid-2">
            <input
              type="text"
              placeholder="Prénom"
              value={newContact.first_name}
              onChange={(e) => setNewContact({ ...newContact, first_name: e.target.value })}
              required
              className="input"
            />
            <input
              type="text"
              placeholder="Nom"
              value={newContact.last_name}
              onChange={(e) => setNewContact({ ...newContact, last_name: e.target.value })}
              required
              className="input"
            />
            <input
              type="email"
              placeholder="Email"
              value={newContact.email}
              onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
              required
              className="input full-width"
            />
            <input
              type="text"
              placeholder="Téléphone"
              value={newContact.phone}
              onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
              className="input"
            />
            <textarea
              placeholder="Adresse"
              value={newContact.address}
              onChange={(e) => setNewContact({ ...newContact, address: e.target.value })}
              rows={2}
              className="input textarea"
            />
            {!selectedGroup && (
              <select
                value={newContact.group_id}
                onChange={(e) => setNewContact({ ...newContact, group_id: e.target.value })}
                className="input"
              >
                <option value="">Aucun groupe</option>
                {groups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </select>
            )}
            <button type="submit" className="btn btn-success full-width">
              {editingContact ? 'Modifier le contact' : 'Ajouter le contact'}
            </button>
          </form>
        </div>
      )}

      <div className="card-body">
        {contacts.length === 0 ? (
          <div className="empty-contacts">
            <div className="empty-icon">📞</div>
            <p>Aucun contact</p>
            <p>Cliquez sur "+ Nouveau contact" pour commencer</p>
          </div>
        ) : (
          <div className="contact-grid">
            {contacts.map((contact) => (
              <div key={contact.id} className="contact-card">
                <div className="contact-header">
                  <div className="contact-content">
                    <h3 className="contact-name">
                      {contact.first_name} {contact.last_name}
                    </h3>
                    <div className="contact-info">
                      <div className="contact-info-item">
                        <span>✉️</span>
                        <a href={`mailto:${contact.email}`} className="contact-link">
                          {contact.email}
                        </a>
                      </div>
                      {contact.phone && (
                        <div className="contact-info-item">
                          <span>📞</span>
                          <a href={`tel:${contact.phone}`} className="contact-link">
                            {contact.phone}
                          </a>
                        </div>
                      )}
                      {contact.address && (
                        <div className="contact-info-item">
                          <span>📍</span>
                          <span>{contact.address}</span>
                        </div>
                      )}
                      {contact.group && (
                        <div className="contact-info-item">
                          <span>📁</span>
                          <span className="contact-badge">
                            {contact.group.name}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div style={{display: 'flex', gap: '0.25rem'}}>
                    <button
                      onClick={() => handleEdit(contact)}
                      className="btn-delete"
                      style={{color: '#3b82f6'}}
                      title="Modifier le contact"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(contact.id)}
                      className="btn-delete"
                      title="Supprimer le contact"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactList;