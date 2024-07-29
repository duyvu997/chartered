import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import React from 'react';
import UserStats from './pages/UserStats'; // Import UserStats component

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/user-stats" element={<ProtectedRoute element={<UserStats />} />} /> {/* Protected route */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
