import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemList from '../components/ItemList';
import NewItemForm  from '../components/NewItemForm';

const Home = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', description: '' });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get('/api/items');
      setItems(res.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/items', newItem);
      setNewItem({ name: '', description: '' });
      fetchItems();
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await axios.delete(`/api/items/${id}`);
        fetchItems();
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };

  const handleUpdate = async (id) => {
    const newName = window.prompt('Enter the new name');
    const newDescription = window.prompt('Enter the new description');
    try {
      await axios.patch(`/api/items/${id}`, { name: newName, description: newDescription });
      fetchItems();
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };


  return (
    <div>
      Home
      
      <ItemList items={items} handleDelete={handleDelete} handleUpdate={handleUpdate} />

      <NewItemForm handleAdd={handleAdd} newItem={newItem} setNewItem={setNewItem} />

    </div>
  );
}

export default Home;


