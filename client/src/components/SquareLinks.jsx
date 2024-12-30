import React from 'react';
import { Link } from 'react-router-dom';

const SquareLinks = () => {
  const links = [
    { to: '/records', text: 'Records' },
    { to: '/login', text: 'Login' },
    { to: '/create-ticket', text: 'Create Ticket' },
    { to: '/page4', text: 'Page 4' },
    { to: '/page5', text: 'Page 5' },
    { to: '/page6', text: 'Page 6' },
    { to: '/page7', text: 'Page 7' },
    { to: '/page8', text: 'Page 8' },
    { to: '/page9', text: 'Page 9' },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto p-4">
      {links.map((link, index) => (
        <Link
          key={index}
          to={link.to}
          className="flex items-center justify-center aspect-square bg-blue-500 text-white font-bold text-lg rounded-lg hover:bg-blue-600 transition-colors duration-300"
        >
          {link.text}
        </Link>
      ))}
    </div>
  );
};

export default SquareLinks;

