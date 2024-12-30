import React, { useState, useEffect } from 'react';

const UserSearchBox = ({ users = [], onUserSelect }) => {
  const [query, setQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [showAll, setShowAll] = useState(false);

  // Function to handle search input change
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);
  };

  // Effect to filter users based on query
  useEffect(() => {
    if (users && users.length > 0) {
      const results = users.filter(
        (user) =>
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query)
      );
      setFilteredUsers(results);
    } else {
      setFilteredUsers([]); // Reset to empty if no users are provided
    }
  }, [query, users]);

  // Function to handle selecting a user from the list
  const handleUserClick = (user) => {
    onUserSelect(user); // Pass selected user to the parent
  };

  // Toggle show/hide more users
  const handleShowAll = () => {
    setShowAll((prevState) => !prevState); // Toggle the state
  };

  // Limit the number of users displayed to 3, and show a dropdown with "..."
  const displayedUsers = showAll ? filteredUsers : filteredUsers.slice(0, 3);

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-4">User Search (for autofill)</h2>
      <input
        type="text"
        placeholder="Search by name or email"
        value={query}
        onChange={handleSearch}
        className="w-full p-3 border border-gray-300 rounded-md mb-4"
      />
      <ul className="space-y-2">
        {displayedUsers.length > 0 ? (
          displayedUsers.map((user) => (
            <li
              key={user.id}
              onClick={() => handleUserClick(user)}
              className="cursor-pointer p-2 hover:bg-gray-200 rounded-md"
            >
              <strong>{user.name}</strong> - {user.email}
            </li>
          ))
        ) : (
          <li className="text-gray-500">No users found</li>
        )}
        {filteredUsers.length > 3 && (
          <li
            onClick={handleShowAll}
            className="cursor-pointer p-2 text-blue-500 hover:bg-gray-100"
          >
            <strong>{showAll ? '... Show less' : '... Show more'}</strong>
          </li>
        )}
      </ul>
    </div>
  );
};

export default UserSearchBox;

