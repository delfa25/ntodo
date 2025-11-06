import React, { useState, useEffect, useCallback } from 'react';
import { contactsAPI, groupsAPI } from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';

const ContactForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [contact, setContact] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
    group_id: ''
  });
  const [groups, setGroups] = useState([]);

  const loadGroups = async () => {
    try {
      const response = await groupsAPI.getAll();
      setGroups(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des groupes:', error);
    }
  };

  const loadContact = useCallback(async () => {
    try {
      const response = await contactsAPI.getAll();
      const contactData = response.data.find(c => c.id === parseInt(id));
      if (contactData) {
        setContact({
          first_name: contactData.first_name,
          last_name: contactData.last_name,
          email: contactData.email,
          phone: contactData.phone || '',
          address: contactData.address || '',
          group_id: contactData.group_id || ''
        });
      }
    } catch (error) {
      console.error('Erreur lors du chargement du contact:', error);
    }
  }, [id]);

  useEffect(() => {
    loadGroups();
    if (isEdit) {
      loadContact();
    }
  }, [isEdit, loadContact]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const contactData = {
        ...contact,
        group_id: contact.group_id || null
      };
      
      if (isEdit) {
        await contactsAPI.update(id, contactData);
      } else {
        await contactsAPI.create(contactData);
      }
      navigate('/contacts');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      if (error.response) {
        console.error('Détails de l\'erreur:', error.response.data);
        alert('Erreur: ' + (error.response.data.message || 'Erreur inconnue'));
      }
    }
  };

  return (
    <div className="container" style={{ paddingTop: '2rem' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1 className="title">
          {isEdit ? '✏️ Modifier le contact' : '➕ Nouveau contact'}
        </h1>

        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit} className="form-grid-2">
              <input
                type="text"
                placeholder="Prénom"
                value={contact.first_name}
                onChange={(e) => setContact({ ...contact, first_name: e.target.value })}
                required
                className="input"
              />
              <input
                type="text"
                placeholder="Nom"
                value={contact.last_name}
                onChange={(e) => setContact({ ...contact, last_name: e.target.value })}
                required
                className="input"
              />
              <input
                type="email"
                placeholder="Email"
                value={contact.email}
                onChange={(e) => setContact({ ...contact, email: e.target.value })}
                required
                className="input full-width"
              />
              <input
                type="text"
                placeholder="Téléphone"
                value={contact.phone}
                onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                className="input"
              />
              <textarea
                placeholder="Adresse"
                value={contact.address}
                onChange={(e) => setContact({ ...contact, address: e.target.value })}
                rows={3}
                className="input textarea"
              />
              <select
                value={contact.group_id}
                onChange={(e) => setContact({ ...contact, group_id: e.target.value })}
                className="input"
              >
                <option value="">Aucun groupe</option>
                {groups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </select>
              
              <div className="full-width" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="submit" className="btn btn-success" style={{ flex: 1 }}>
                  {isEdit ? 'Modifier' : 'Créer'}
                </button>
                <button 
                  type="button" 
                  onClick={() => navigate('/contacts')} 
                  className="btn btn-secondary"
                  style={{ flex: 1 }}
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;