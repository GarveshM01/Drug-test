import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { TestProvider } from './context/TestContext';

import { OfficerLayout } from './components/layout/OfficerLayout';
import { AdminLayout } from './components/layout/AdminLayout';

import { Login } from './pages/Login';
import { OfficerDashboard } from './pages/OfficerDashboard';
import { NewTestWizard } from './pages/NewTestWizard';
import { ResultPage } from './pages/ResultPage';
import { DigitalRecordPage } from './pages/DigitalRecordPage';
import { TestHistoryPage } from './pages/TestHistoryPage';
import { OfficerProfilePage } from './pages/OfficerProfilePage';

import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminAllTests } from './pages/admin/AdminAllTests';
import { AdminOfficers } from './pages/admin/AdminOfficers';
import { AdminAuditLogs } from './pages/admin/AdminAuditLogs';

// Route guard component: redirects unauthenticated users to /login
const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

// Root index redirect: / -> /dashboard if logged in, /login if not logged in
const RootRedirect: React.FC = () => {
  const { isAuthenticated } = useAuth();
  return <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />;
};

export const AppContent: React.FC = () => {
  return (
    <Routes>
      {/* Public Login Route */}
      <Route path="/login" element={<Login />} />

      {/* Root URL redirect */}
      <Route path="/" element={<RootRedirect />} />

      {/* Protected Field Officer Routes */}
      <Route
        element={
          <RequireAuth>
            <OfficerLayout />
          </RequireAuth>
        }
      >
        <Route path="/dashboard" element={<OfficerDashboard />} />
        <Route path="/new-test" element={<NewTestWizard />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/result/:id" element={<ResultPage />} />
        <Route path="/record/:id" element={<DigitalRecordPage />} />
        <Route path="/history" element={<TestHistoryPage />} />
        <Route path="/profile" element={<OfficerProfilePage />} />
      </Route>

      {/* Protected Admin / Supervisor Routes */}
      <Route
        path="/admin"
        element={
          <RequireAuth>
            <AdminLayout />
          </RequireAuth>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="tests" element={<AdminAllTests />} />
        <Route path="officers" element={<AdminOfficers />} />
        <Route path="audit" element={<AdminAuditLogs />} />
      </Route>

      {/* Fallback unknown route */}
      <Route path="*" element={<RootRedirect />} />
    </Routes>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TestProvider>
          <AppContent />
        </TestProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
