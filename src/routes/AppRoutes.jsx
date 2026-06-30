import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// User Pages
import Home from '../pages/user/Home';
import Search from '../pages/user/Search';
import Report from '../pages/user/Report';
import Announcement from '../pages/user/Announcement';
import About from '../pages/user/About';

// Admin Pages
import Login from '../pages/admin/Login';
import Dashboard from '../pages/admin/Dashboard';
import Reports from '../pages/admin/Reports';
import Schedule from '../pages/admin/Schedule';
import AdminAnnouncement from '../pages/admin/Announcement';
import Statistics from '../pages/admin/Statistics';
import Settings from '../pages/admin/Settings';
import Profile from '../pages/admin/Profile';

// Routes Wrapper
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />
        <Route path="/search" element={<PublicRoute><Search /></PublicRoute>} />
        <Route path="/report" element={<PublicRoute><Report /></PublicRoute>} />
        <Route path="/announcement" element={<PublicRoute><Announcement /></PublicRoute>} />
        <Route path="/about" element={<PublicRoute><About /></PublicRoute>} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/admin/reports" element={<PrivateRoute><Reports /></PrivateRoute>} />
        <Route path="/admin/schedule" element={<PrivateRoute><Schedule /></PrivateRoute>} />
        <Route path="/admin/announcement" element={<PrivateRoute><AdminAnnouncement /></PrivateRoute>} />
        <Route path="/admin/statistics" element={<PrivateRoute><Statistics /></PrivateRoute>} />
        <Route path="/admin/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
        <Route path="/admin/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
