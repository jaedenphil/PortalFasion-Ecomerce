import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutScreen = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div>
      <h2>Logout</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default LogoutScreen;
