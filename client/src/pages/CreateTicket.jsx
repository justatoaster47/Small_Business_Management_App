import React, { useState, useEffect } from 'react';
import Fuse from 'fuse.js';

// Mock Users Data
const mockUsers = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', address: '123 Elm St, Springfield, IL', phone: '555-1234' },
  { id: 2, name: 'Bob Smith', email: 'bob.smith@example.com', address: '456 Oak St, Springfield, IL', phone: '555-5678' },
  { id: 3, name: 'Charlie Brown', email: 'charlie.brown@example.com', address: '789 Pine St, Springfield, IL', phone: '555-9876' },
  { id: 4, name: 'David Lee', email: 'david.lee@example.com', address: '321 Maple St, Springfield, IL', phone: '555-6543' },
  { id: 5, name: 'Emily Davis', email: 'emily.davis@example.com', address: '654 Birch St, Springfield, IL', phone: '555-1122' },
  { id: 6, name: 'Frank White', email: 'frank.white@example.com', address: '987 Cedar St, Springfield, IL', phone: '555-3344' },
  { id: 7, name: 'Grace Green', email: 'grace.green@example.com', address: '123 Willow St, Springfield, IL', phone: '555-5566' },
  { id: 8, name: 'Hannah Black', email: 'hannah.black@example.com', address: '432 Birchwood Ave, Springfield, IL', phone: '555-7788' },
];

const CreateTicket = () => {
  // Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Fuse.js configuration for fuzzy search
  const fuse = new Fuse(mockUsers, {
    keys: ['name', 'email', 'address', 'phone'], // Fields to search in
    threshold: 0.6, // Sensitivity (0 = exact match, 1 = everything)
    includeScore: true, // Include score for ranking results
  });

  // Function to handle form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') setName(value);
    if (name === 'email') setEmail(value);
    if (name === 'address') setAddress(value);
    if (name === 'phone') setPhone(value);
  };

  // Function to filter users using Fuse.js
  const filterUsers = () => {
    const query = name || email || address || phone;
    if (query) {
      const results = fuse.search(query).map(result => result.item); // Get filtered users
      setFilteredUsers(results);
      setShowDropdown(results.length > 0); // Show dropdown only if there are results
    } else {
      setFilteredUsers([]);
      setShowDropdown(false); // Hide dropdown if no query
    }
  };

  useEffect(() => {
    filterUsers();
  }, [name, email, address, phone]); // Run filter whenever any field changes

  // Handle user selection
  const handleUserSelect = (user) => {
    setName(user.name);
    setEmail(user.email);
    setAddress(user.address);
    setPhone(user.phone);
    setFilteredUsers([]); // Clear the dropdown after selection
    setShowDropdown(false); // Hide the dropdown after selection
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle creating a new user here (send to API or update state)
    alert('New user created!');
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-4">Create or Search User</h2>

      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md mb-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md mb-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            value={address}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md mb-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="text"
            name="phone"
            value={phone}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md mb-2"
          />
        </div>

        <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded-md mb-4">
          Create New User
        </button>
      </form>

      {/* User Search Dropdown */}
      {showDropdown && filteredUsers.length > 0 && (
        <div className="bg-white border rounded-md mt-4 max-h-60 overflow-y-auto">
          <ul>
            {filteredUsers.map((user) => (
              <li
                key={user.id}
                className="cursor-pointer p-3 hover:bg-gray-200"
                onClick={() => handleUserSelect(user)}
              >
                <strong>{user.name}</strong> - {user.email} - {user.phone}
                <br/>
                <small>{user.address}</small>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CreateTicket;

