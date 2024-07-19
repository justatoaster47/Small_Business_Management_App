
import React from 'react';

const ItemList = ({ items, handleDelete, handleUpdate }) => {
  return (
    <div>

      <ol>
        {items.map(item => (
          <li key={item.id}>
            {item.name}: {item.description}
            <button onClick={() => handleDelete(item.id)}>Delete</button>
            <button onClick={() => handleUpdate(item.id)}>Edit</button>
          </li>
        ))}
      </ol>

    </div>
  )
}

export default ItemList;
