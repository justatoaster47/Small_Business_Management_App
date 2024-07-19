import React from 'react';

const NewItemForm = ({ handleAdd, newItem, setNewItem }) => {
  return (
  <div>

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
  )
}

export default NewItemForm;



