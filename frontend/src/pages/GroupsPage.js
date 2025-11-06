import React, { useState, useEffect } from 'react';
import { groupsAPI } from '../services/api';
import { Link } from 'react-router-dom';
import '../components/Table.css';

const GroupsPage = () => {
  const [groups, setGroups] = useState([]);

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
    <div className="container" style={{ paddingTop: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 className="title">📁 Groupes</h1>
        <Link to="/groups/new" className="btn btn-success" style={{ textDecoration: 'none' }}>
          ➕ Nouveau groupe
        </Link>
      </div>

      {groups.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📁</div>
          <p>Aucun groupe créé</p>
          <Link to="/groups/new" className="btn btn-success" style={{ textDecoration: 'none' }}>
            Créer le premier groupe
          </Link>
        </div>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Description</th>
                <th>Contacts</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {groups.map((group) => (
                <tr key={group.id}>
                  <td><strong>{group.name}</strong></td>
                  <td>{group.description || '-'}</td>
                  <td>{group.contacts?.length || 0} contact(s)</td>
                  <td>
                    <div className="table-actions">
                      <Link
                        to={`/groups/edit/${group.id}`}
                        className="table-btn edit"
                        title="Modifier le groupe"
                      >
                        ✏️
                      </Link>
                      <button
                        onClick={() => handleDelete(group.id)}
                        className="table-btn delete"
                        title="Supprimer le groupe"
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

export default GroupsPage;