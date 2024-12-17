import React, { useState, useEffect } from 'react';
import NewItemForm from '../components/NewItemForm';
import ItemList from '../components/ItemList';

const Records = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);


  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/items`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load items. Please try again later.');
    }
  };

  const handleAddItem = (newItem) => {
    setData(prevData => [...prevData, newItem]);
  };

  const handleDelete = async (id) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/items/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete item');
      }

      // Update the local state by filtering out the deleted item
      setData(prevData => prevData.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
      setError('Failed to delete item. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = async (id, updatedItem) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/items/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedItem),
      });

      if (!response.ok) {
        throw new Error('Failed to update item');
      }

      const updatedItemFromServer = await response.json();

      // Update the local state
      setData(prevData => prevData.map(item => 
        item.id === id ? updatedItemFromServer : item
      ));

    } catch (error) {
      console.error('Error updating item:', error);
      setError('Failed to update item. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Homepage</h1>

      {error && <p className="text-red-500">{error}</p>}

      <ItemList 
        data={data} 
        isLoading={isLoading} 
        handleDelete={handleDelete} 
        handleEdit={handleEdit}
      />

      <NewItemForm onAddItem={handleAddItem} />


    </div>
  );
}

export default Records;

