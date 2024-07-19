import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemList from './components/ItemList';
import NewItemForm  from './components/NewItemForm';

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

  const handleUpdate = async (id) => {
    const newName = window.prompt('Enter the new name');
    const newDescription = window.prompt('Enter the new description');
    await axios.patch(`/api/items/${id}`, { name: newName, description: newDescription });
    fetchItems();
  }




  return (
    <div>
      <h1>My Items</h1>
      
      <ItemList items={items} handleDelete={handleDelete} handleUpdate={handleUpdate} />
      <NewItemForm handleAdd={handleAdd} newItem={newItem} setNewItem={setNewItem} />

    </div>
  );
}

export default App;

