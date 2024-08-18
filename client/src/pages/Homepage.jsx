import React, { useState, useEffect } from 'react';
import NewItemForm from '../components/NewItemForm';

const Homepage = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAddItem = (newItem) => {
  setData(prevData => [...prevData, newItem]);
  };


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/items');
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


  const handleDelete = async (id) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:8000/api/items/${id}`, {
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

  return (
    <div>
      <h1>Homepage</h1>

      {error && <p className="text-red-500">{error}</p>}

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        data.map(item => (
          <div key={item.id} className="mb-4 p-4 border rounded">
            <p>{item.name}, {item.description}</p>
            <button 
              onClick={() => handleDelete(item.id)} 
              className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition'
              disabled={isLoading}
            >
              {isLoading ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        ))
      )}

      <NewItemForm onAddItem={handleAddItem} />


    </div>
  );
}

export default Homepage;

