import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import AppRoutes from './routes/routes';

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  if (isLoginPage) {
    return <AppRoutes />;
  }

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden', backgroundColor: '#f5f7fa' }}>
      <Sidebar />
      <TopBar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: '64px',
          height: '100vh',
          overflow: 'auto',
          backgroundColor: '#f5f7fa',
          minWidth: 0,
        }}
      >
        <AppRoutes />
      </Box>
    </Box>
  );
}

function App() {
  return (
    <Router>
      <CssBaseline />
      <AppContent />
    </Router>
  );
}

export default App;