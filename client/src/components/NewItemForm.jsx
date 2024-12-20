import React, { useState } from 'react';

const NewItemForm = ({ onAddItem }) => {
  const [newItem, setNewItem] = useState({ name: '', description: '' });
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem(prevItem => ({ ...prevItem, [name]: value }));
  };

  const token = localStorage.getItem('jwt');
  if (token) {
    const base64Payload = token.split('.')[1]; // Get the payload part
    const payload = JSON.parse(atob(base64Payload)); // Decode Base64
    console.log('Decoded payload:', payload);
  } else {
    console.error('No token found in localStorage');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsAdding(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include JWT in the Authorization header
        },
        body: JSON.stringify(newItem),
      });

      if (!response.ok) {
        throw new Error('Failed to create item');
      }

      const result = await response.json();
      onAddItem(result);
      setNewItem({ name: '', description: '' }); // Reset form
    } catch (error) {
      console.error('Error creating item:', error);
      setError('Failed to create item. Please try again.');
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 p-4 bg-gray-100 rounded">
      <h2 className="text-xl font-bold mb-4">Add New Item</h2>
      <div className="mb-4">
        <label htmlFor="name" className="block mb-2">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={newItem.name}
          onChange={handleInputChange}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block mb-2">Description:</label>
        <textarea
          id="description"
          name="description"
          value={newItem.description}
          onChange={handleInputChange}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <button 
        type="submit" 
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        disabled={isAdding}
      >
        {isAdding ? 'Adding...' : 'Add Item'}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
};

export default NewItemForm;

