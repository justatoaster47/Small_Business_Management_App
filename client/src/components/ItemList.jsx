// src/components/ItemList.js

import React from 'react';

const ItemList = ({ data, isLoading, handleDelete }) => {
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {data.map(item => (
        <div key={item.id} className="mb-4 p-4 border rounded">
          <p>{item.name}, {item.description}</p>
          <button 
            onClick={() => handleDelete(item.id)} 
            className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition'
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default ItemList;

