import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {

  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <header className="bg-black bg-gray-900 text-white p-4 shadow-md">
      <h1 className="text-2xl font-bold">The Query</h1>
      <hr className="border-t border-gray-700 my-2" />
      <nav className="flex justify-between">
        <div></div> {/* Empty div for spacing */}
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:text-blue-400 transition duration-200">
              Home
            </Link>
          </li>
          {/* Conditionally render the Login link */}
          {!isLoggedIn ? (
            <li>
              <Link to="/profile" className="hover:text-blue-400 transition duration-200">
                Login
              </Link>
            </li>
          ) : (
            <li className="text-gray-500 cursor-not-allowed">
              Login
            </li>
          )}
          <li>
            <Link to="/dashboard" className="hover:text-blue-400 transition duration-200">
              Dashboard
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
