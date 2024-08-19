// src/components/ItemList.js

import React, { useState } from 'react';

const ItemList = ({ data, isLoading, handleDelete, handleEdit }) => {
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const startEditing = (item) => {
    setEditingId(item.id);
    setEditName(item.name);
    setEditDescription(item.description);
  };

  const saveEdit = (id) => {
    handleEdit(id, { name: editName, description: editDescription });
    setEditingId(null);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (data.length === 0) {
    return <p>No items to display.</p>;
  }

  return (
  <ul className="space-y-4">
    {data.map(item => (
      <li key={item.id} className="bg-white shadow-md rounded-lg p-4">
        {editingId === item.id ? (
          <div className="space-y-2">
            <input 
              value={editName} 
              onChange={(e) => setEditName(e.target.value)} 
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Name"
            />
            <input 
              value={editDescription} 
              onChange={(e) => setEditDescription(e.target.value)} 
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Description"
            />
            <div className="flex space-x-2">
              <button 
                onClick={() => saveEdit(item.id)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save
              </button>
              <button 
                onClick={() => setEditingId(null)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
            <div className="space-x-2">
              <button 
                onClick={() => startEditing(item)}
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Edit
              </button>
              <button 
                onClick={() => handleDelete(item.id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </li>
    ))}
  </ul>
);


};

export default ItemList;

