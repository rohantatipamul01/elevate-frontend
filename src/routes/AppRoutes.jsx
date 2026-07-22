import { Navigate, Route, Routes } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import DashboardLayout from "../layouts/DashboardLayout";

import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Register from "../pages/Register";

import Dashboard from "../pages/Dashboard";
import Tasks from "../pages/Tasks";
import Habits from "../pages/Habits";
import Calendar from "../pages/Calendar";
import Analytics from "../pages/Analytics";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import OAuthSuccess from "../pages/OAuthSuccess";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function PublicRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Landing */}
      <Route
        path="/"
        element={
          <PublicRoute>
            <Landing />
          </PublicRoute>
        }
      />

      {/* Authentication */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      {/* Protected Routes */}
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/habits" element={<Habits />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      {/* Unknown Routes */}
      <Route path="*" element={<Navigate to="/" replace />} />

      <Route
    path="/oauth/success"
    element={<OAuthSuccess />}
/>
    </Routes>
  );
}