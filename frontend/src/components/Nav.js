import React ,{ useContext } from 'react';
import { Link } from 'react-router-dom';
import {  useNavigate  } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
const Nav = () => {
  const handleLogout = () => {
    // Implement the logout functionality here
    // You can call an API or clear the authentication token, etc.
    setIsAuthenticated(false);
    navigate("/");
  };
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {isAuthenticated ? (
          <>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Sign up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
