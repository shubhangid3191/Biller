import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AllPatient from "../pages/AllPatient";
import AddNewPatient from "../pages/AddNewPatient";
import NewEncounter from "../pages/NewEncounter";
import Statement from "../pages/Statement";
import Refunds from "../pages/Refunds";
import BulkEligibility from "../pages/BulkEligibility";
import Login from "../pages/Login";
import ConfirmPatientList from "../pages/ConfirmPatientList";
import PreBillingClaim from '../pages/PreBillingClaim';
import PostBillingClaimPage from '../pages/PostBillingClaimPage';

import Summary from "../pages/Summary";
import AIInsight from "../pages/AIInsight";
import MyTask from "../pages/MyTask";
import PerformanceOverview from "../pages/PerformanceOverview";

import ReferringProvider from "../pages/ReferringProvider";
import RenderingProvider from "../pages/RenderingProvider";
import Locations from "../pages/Locations";
import Practice from "../pages/Practice";
import Fee from "../pages/Fee";
import InsuranceProvider from "../pages/InsuranceProvider";
import Program from "../pages/Program";



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
         <Summary />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ai-insights"
        element={
          <ProtectedRoute>
         <AIInsight />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-tasks"
        element={
          <ProtectedRoute>
          <MyTask/>
          </ProtectedRoute>
        }
      />
      <Route
        path="/performance-overview"
        element={
          <ProtectedRoute>
         <PerformanceOverview/>
         </ProtectedRoute>
        }
      />
      <Route
  path="/referring-provider"
  element={
    <ProtectedRoute>
      <ReferringProvider />
    </ProtectedRoute>
  }
/>

<Route
  path="/rendering-provider"
  element={
    <ProtectedRoute>
      <RenderingProvider />
    </ProtectedRoute>
  }
/>

<Route
  path="/locations"
  element={
    <ProtectedRoute>
      <Locations />
    </ProtectedRoute>
  }
/>

<Route
  path="/practice"
  element={
    <ProtectedRoute>
      <Practice />
    </ProtectedRoute>
  }
/>

<Route
  path="/fee"
  element={
    <ProtectedRoute>
      <Fee />
    </ProtectedRoute>
  }
/>

<Route
  path="/insurance-provider"
  element={
    <ProtectedRoute>
      <InsuranceProvider />
    </ProtectedRoute>
  }
/>

<Route
  path="/program"
  element={
    <ProtectedRoute>
      <Program />
    </ProtectedRoute>
  }
/>
      <Route
        path="/add-patient"
        element={
          <ProtectedRoute>
            <AllPatient />
          </ProtectedRoute>
        }
      />
      <Route
        path="/patient-list"
        element={
          <ProtectedRoute>
            <ConfirmPatientList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-new-patient"
        element={
          <ProtectedRoute>
            <AddNewPatient />
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
            <div style={{ padding: "24px" }}>EOB Upload Page</div>
          </ProtectedRoute>
        }
      />
      <Route
        path="/pre-billing-claim"
        element={
          <ProtectedRoute>
            <PreBillingClaim />
          </ProtectedRoute>
        }
      />
      <Route
        path="/post-billing-claim-page"
        element={
          <ProtectedRoute>
            <PostBillingClaimPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/encounter-list"
        element={
          <ProtectedRoute>
            <div style={{ padding: '24px' }}>Encounter List Page</div>
          </ProtectedRoute>
        }
      />
      <Route
        path="/era"
        element={
          <ProtectedRoute>
            <div style={{ padding: '24px' }}>ERA Page</div>
          </ProtectedRoute>
        }
      />
      <Route
        path="/collections"
        element={
          <ProtectedRoute>
            <div style={{ padding: '24px' }}>Collections Page</div>
          </ProtectedRoute>
        }
      />
      <Route
        path="/icd-10-search"
        element={
          <ProtectedRoute>
            <div style={{ padding: "24px" }}>ICD 10 Search Page</div>
          </ProtectedRoute>
        }
      />
      <Route
        path="/excel-access"
        element={
          <ProtectedRoute>
            <div style={{ padding: "24px" }}>Excel Access Page</div>
          </ProtectedRoute>
        }
      />
      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <div style={{ padding: "24px" }}>Reports Page</div>
          </ProtectedRoute>
        }
      />
      <Route
        path="/documents"
        element={
          <ProtectedRoute>
            <div style={{ padding: "24px" }}>Documents Page</div>
          </ProtectedRoute>
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <div style={{ padding: "24px" }}>Welcome to TiaSTAT</div>
          </ProtectedRoute>
        }
      />

      <Route
        path="/new-encounter"
        element={
          <ProtectedRoute>
            <NewEncounter />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
