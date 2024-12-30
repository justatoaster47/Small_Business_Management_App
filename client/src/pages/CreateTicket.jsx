import React, { useState, useEffect } from 'react';
// import NewItemForm from '../components/NewItemForm';
// import ItemList from '../components/ItemList';
import NewTicketForm from '../components/NewTicketForm';
import UserSearchForm from '../components/UserSearchForm';

const CreateTicket = () => {
  
  // Mock users data, would be fetched from an API in a real app
  const mockUsers = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
    { id: 2, name: 'Bob Smith', email: 'bob.smith@example.com' },
    { id: 3, name: 'Charlie Brown', email: 'charlie.brown@example.com' },
    { id: 4, name: 'David Lee', email: 'david.lee@example.com' },
    { id: 5, name: 'Emily Davis', email: 'emily.davis@example.com' },
    { id: 6, name: 'Frank White', email: 'frank.white@example.com' },
    { id: 7, name: 'Grace Green', email: 'grace.green@example.com' },
    { id: 8, name: 'Hannah Black', email: 'hannah.black@example.com' },
  ];

  // State to store the selected user from the search
  const [selectedUser, setSelectedUser] = useState(null);

  // Function to update selected user
  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  return (
    <div>
      <UserSearchForm users={mockUsers} onUserSelect={handleUserSelect} />

      <div>
        {selectedUser && (
          <div>
            <h3>User Selected: {selectedUser.name}</h3>
            <p>Email: {selectedUser.email}</p>
          </div>
        )}
      </div>

      <NewTicketForm selectedUser={selectedUser} />
    </div>
  );
}

export default CreateTicket;

