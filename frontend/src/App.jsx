import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import Sidebar, { SidebarProvider } from './components/Sidebar';
import TopBar from './components/TopBar';
import AppRoutes from './routes/routes';

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  if (isLoginPage) {
    return <AppRoutes />;
  }

  return (
    <SidebarProvider>
      <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden', backgroundColor: '#ECEEF4' }}>
        <Sidebar />
        <TopBar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            pt: '56px',
            height: '100vh',
            overflow: 'auto',
            backgroundColor: '#ECEEF4',
            minWidth: 0,
          }}
        >
          <AppRoutes />
        </Box>
      </Box>
    </SidebarProvider>
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