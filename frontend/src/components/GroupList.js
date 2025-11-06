import React, { useState, useEffect } from 'react';
import { groupsAPI } from '../services/api';
import './GroupList.css';

const GroupList = ({ onSelectGroup, selectedGroup }) => {
  const [groups, setGroups] = useState([]);
  const [newGroup, setNewGroup] = useState({ name: '', description: '' });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadGroups();
  }, []);

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
      await groupsAPI.create(newGroup);
      setNewGroup({ name: '', description: '' });
      setShowForm(false);
      loadGroups();
    } catch (error) {
      console.error('Erreur lors de la création du groupe:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce groupe ?')) {
      try {
        await groupsAPI.delete(id);
        loadGroups();
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
      }
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">
          📁 Groupes
        </h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn btn-toggle"
        >
          {showForm ? '✕' : '+'}
        </button>
      </div>
      
      {showForm && (
        <div className="group-form">
          <form onSubmit={handleSubmit} className="form-grid">
            <input
              type="text"
              placeholder="Nom du groupe"
              value={newGroup.name}
              onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
              required
              className="input"
            />
            <textarea
              placeholder="Description (optionnelle)"
              value={newGroup.description}
              onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
              rows={3}
              className="input textarea"
            />
            <button type="submit" className="btn btn-success">
              Créer le groupe
            </button>
          </form>
        </div>
      )}

      <div className="card-body">
        <div className="group-list">
          {groups.map((group) => (
            <div
              key={group.id}
              className={`group-item ${selectedGroup?.id === group.id ? 'selected' : ''}`}
              onClick={() => onSelectGroup(group)}
            >
              <div className="group-header">
                <div className="group-content">
                  <h3 className="group-name">{group.name}</h3>
                  {group.description && (
                    <p className="group-description">{group.description}</p>
                  )}
                  <p className="group-count">
                    {group.contacts?.length || 0} contact(s)
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(group.id);
                  }}
                  className="btn-delete"
                  title="Supprimer le groupe"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
          {groups.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">📁</div>
              <p>Aucun groupe créé</p>
              <p>Cliquez sur + pour créer votre premier groupe</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupList;