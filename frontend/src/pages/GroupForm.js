import React, { useState, useEffect, useCallback } from 'react';
import { groupsAPI } from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';

const GroupForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [group, setGroup] = useState({
    name: '',
    description: ''
  });

  const loadGroup = useCallback(async () => {
    try {
      const response = await groupsAPI.getAll();
      const groupData = response.data.find(g => g.id === parseInt(id));
      if (groupData) {
        setGroup({
          name: groupData.name,
          description: groupData.description || ''
        });
      }
    } catch (error) {
      console.error('Erreur lors du chargement du groupe:', error);
    }
  }, [id]);

  useEffect(() => {
    if (isEdit) {
      loadGroup();
    }
  }, [isEdit, loadGroup]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await groupsAPI.update(id, group);
      } else {
        await groupsAPI.create(group);
      }
      navigate('/groups');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  };

  return (
    <div className="container" style={{ paddingTop: '2rem' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1 className="title">
          {isEdit ? '✏️ Modifier le groupe' : '📁 Nouveau groupe'}
        </h1>

        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit} className="form-grid">
              <input
                type="text"
                placeholder="Nom du groupe"
                value={group.name}
                onChange={(e) => setGroup({ ...group, name: e.target.value })}
                required
                className="input"
              />
              <textarea
                placeholder="Description (optionnelle)"
                value={group.description}
                onChange={(e) => setGroup({ ...group, description: e.target.value })}
                rows={4}
                className="input textarea"
              />
              
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="submit" className="btn btn-success" style={{ flex: 1 }}>
                  {isEdit ? 'Modifier' : 'Créer'}
                </button>
                <button 
                  type="button" 
                  onClick={() => navigate('/groups')} 
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

export default GroupForm;