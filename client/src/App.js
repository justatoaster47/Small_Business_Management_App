import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', description: '' });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await axios.get('/api/items');
    setItems(res.data);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    await axios.post('/api/items', newItem);
    setNewItem({ name: '', description: '' });
    fetchItems();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      await axios.delete(`/api/items/${id}`);
    }
    fetchItems();
  };


  return (
    <div>
      <h1>My Items</h1>

      <ol>
      {items.map(item => (
        <li key={item.id}>
          {item.name}: {item.description}
          <button onClick={() => handleDelete(item.id)}>Delete</button>
        </li>
      ))}
      </ol>

      <form onSubmit={handleAdd}>
        <input
          type="text"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          placeholder="Item name"
        />
        <input
          type="text"
          value={newItem.description}
          onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
          placeholder="Item description"
        />
        <button type="submit">Add Item</button>
      </form>

    </div>
  );
}

export default App;

