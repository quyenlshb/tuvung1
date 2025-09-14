import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  return (
    <header className="w-full bg-white shadow p-4 flex justify-between items-center">
      <Link to='/' className="font-bold text-lg">Learn JP</Link>
      <nav className="flex items-center gap-4">
        <Link to="/">Home</Link>
        <Link to="/leaderboard">Leaderboard</Link>
        {user ? (
          <>
            <Link to="/profile">Profile</Link>
            <button onClick={logout} className="text-sm text-red-500">Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
