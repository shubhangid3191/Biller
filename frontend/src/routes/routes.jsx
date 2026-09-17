import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import AllPatient from '../pages/AllPatient';
import AddNewPatient from '../pages/AddNewPatient';
import Statement from '../pages/Statement';
import Refunds from '../pages/Refunds';
import BulkEligibility from '../pages/BulkEligibility';
import Login from '../pages/Login';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route
        path="/summary"
        element={
          <ProtectedRoute>
            <div style={{ padding: '24px' }}>Summary Page</div>
          </ProtectedRoute>
        }
      />
      <Route
        path="/ai-insights"
        element={
          <ProtectedRoute>
            <div style={{ padding: '24px' }}>AI Insights Page</div>
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-tasks"
        element={
          <ProtectedRoute>
            <div style={{ padding: '24px' }}>My Tasks Page</div>
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-patient"
        element={
          <ProtectedRoute>
            <AddNewPatient  />
          </ProtectedRoute>
        }
      />
      <Route
        path="/patient-list"
        element={
          <ProtectedRoute>
            <AllPatient />
          </ProtectedRoute>
        }
      />
      <Route
        path="/statement"
        element={
          <ProtectedRoute>
            <Statement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/refunds"
        element={
          <ProtectedRoute>
            <Refunds />
          </ProtectedRoute>
        }
      />
      <Route
        path="/bulk-eligibility"
        element={
          <ProtectedRoute>
            <BulkEligibility />
          </ProtectedRoute>
        }
      />
      <Route
        path="/eob-upload"
        element={
          <ProtectedRoute>
            <div style={{ padding: '24px' }}>EOB Upload Page</div>
          </ProtectedRoute>
        }
      />
      <Route
        path="/icd-10-search"
        element={
          <ProtectedRoute>
            <div style={{ padding: '24px' }}>ICD 10 Search Page</div>
          </ProtectedRoute>
        }
      />
      <Route
        path="/excel-access"
        element={
          <ProtectedRoute>
            <div style={{ padding: '24px' }}>Excel Access Page</div>
          </ProtectedRoute>
        }
      />
      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <div style={{ padding: '24px' }}>Reports Page</div>
          </ProtectedRoute>
        }
      />
      <Route
        path="/documents"
        element={
          <ProtectedRoute>
            <div style={{ padding: '24px' }}>Documents Page</div>
          </ProtectedRoute>
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <div style={{ padding: '24px' }}>Welcome to TiaSTAT</div>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
