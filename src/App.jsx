import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import AddStudent from './pages/AddStudent';
import EditStudent from './pages/EditStudent';
import SchoolSettings from './pages/SchoolSettings';
import Subjects from './pages/Subjects';
import ReportCardPage from './pages/ReportCardPage';
import UpdateReportCardPage from './pages/UpdateReportCardPage';
import CreateReportCardPage from './pages/CreateReportCardPage';

const ProtectedLayout = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-xs font-bold text-maroon">Loading Application...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

const ReportCardWrapper = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return (
      <ProtectedLayout>
        <ReportCardPage />
      </ProtectedLayout>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 font-body">
      <div className="max-w-6xl mx-auto space-y-4">
        <div className="no-print bg-maroon text-white p-4 rounded-xl flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <img src="/mahaviri_shishu_vidya_mandir_logo/screen.png" alt="Logo" className="w-10 h-10 bg-white p-1 rounded" />
            <div>
              <h1 className="font-heading font-extrabold text-base">MAHAVIRI SHISHU VIDYA MANDIR</h1>
              <p className="text-[11px] text-gold-light font-medium">Student Result Portal & Live Report Card Management</p>
            </div>
          </div>
          <a href="/login" className="px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-lg text-xs font-bold transition-all">
            Admin Login
          </a>
        </div>

        <ReportCardPage />
      </div>
    </div>
  );
};

const UpdateReportCardWrapper = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return (
      <ProtectedLayout>
        <UpdateReportCardPage />
      </ProtectedLayout>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 font-body">
      <div className="max-w-6xl mx-auto space-y-4">
        <div className="no-print bg-maroon text-white p-4 rounded-xl flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <img src="/mahaviri_shishu_vidya_mandir_logo/screen.png" alt="Logo" className="w-10 h-10 bg-white p-1 rounded" />
            <div>
              <h1 className="font-heading font-extrabold text-base">MAHAVIRI SHISHU VIDYA MANDIR</h1>
              <p className="text-[11px] text-gold-light font-medium">Full Report Card Data Editor Page</p>
            </div>
          </div>
          <a href="/login" className="px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-lg text-xs font-bold transition-all">
            Admin Login
          </a>
        </div>

        <UpdateReportCardPage />
      </div>
    </div>
  );
};

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} />
      <Route path="/register" element={<Navigate to="/login" replace />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedLayout>
            <Dashboard />
          </ProtectedLayout>
        }
      />
      <Route
        path="/students"
        element={
          <ProtectedLayout>
            <Students />
          </ProtectedLayout>
        }
      />
      <Route
        path="/add-student"
        element={
          <ProtectedLayout>
            <AddStudent />
          </ProtectedLayout>
        }
      />
      <Route
        path="/edit-student/:id"
        element={
          <ProtectedLayout>
            <EditStudent />
          </ProtectedLayout>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedLayout>
            <SchoolSettings />
          </ProtectedLayout>
        }
      />
      <Route
        path="/subjects"
        element={
          <ProtectedLayout>
            <Subjects />
          </ProtectedLayout>
        }
      />

      {/* Create New Report Card Route */}
      <Route
        path="/create-report-card"
        element={
          <ProtectedLayout>
            <CreateReportCardPage />
          </ProtectedLayout>
        }
      />

      {/* Dedicated Update Report Card Data Page Routes */}
      <Route path="/update-report-card" element={<UpdateReportCardWrapper />} />
      <Route path="/update-report-card/:id" element={<UpdateReportCardWrapper />} />

      {/* Direct Report Card & Result Routes (Accessible without Admin login) */}
      <Route path="/report-cards" element={<ReportCardWrapper />} />
      <Route path="/result" element={<ReportCardWrapper />} />

      <Route path="*" element={<Navigate to="/report-cards" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
