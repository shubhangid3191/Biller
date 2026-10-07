import {
  AppBar,
  Toolbar,
  Box,
  InputBase,
  IconButton,
  Button,
  Typography,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { StarIcon, EditIcon, Bell, TiaChatIcon} from '../assets/Assets';
import { useSidebar } from './Sidebar';

function TopBar() {
  const sidebarContext = useSidebar();
  const sidebarWidth = sidebarContext?.currentWidth || 70;

  return (
    <AppBar
      position="fixed"
      sx={{
        left: 0,
        right: 0,
        width: '100%',
        backgroundColor: '#ffffff',
        boxShadow: '0 1px 4px rgba(0, 0, 0, 0.08)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        zIndex: (theme) => theme.zIndex.drawer - 1,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', py: 1, minHeight: '56px !important', ml: `${sidebarWidth}px`, transition: 'margin-left 0.3s ease' }}>
        {/* Search Bar */}
        <Box
          sx={{
            position: 'relative',
            borderRadius: '8px',
            backgroundColor: '#f9fafb',
            border: '1px solid #e5e7eb',
            transition: 'all 0.2s ease',
            '&:hover': {
              borderColor: '#0066ff',
            },
            '&:focus-within': {
              backgroundColor: '#ffffff',
              borderColor: '#0066ff',
            },
            flexGrow: 1,
            maxWidth: 600,
            mr: 2,
          }}
        >
          <Box
            sx={{
              padding: '0 16px',
              height: '100%',
              position: 'absolute',
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <StarIcon width={18} height={18} color="rgba(0, 0, 0, 0.54)" />
          </Box>
          <InputBase
            placeholder='Ask anything — "show denied claims over $500 from BCBSM"'
            sx={{
              color: 'rgba(0, 0, 0, 0.87)',
              width: '100%',
              fontFamily: "'Roboto', sans-serif",
              '& .MuiInputBase-input': {
                padding: '10px 48px 10px 0',
                paddingLeft: `calc(1em + 32px)`,
                fontSize: 13.5,
                '&::placeholder': {
                  color: 'rgba(0, 0, 0, 0.5)',
                  opacity: 1,
                },
              },
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              right: 12,
              top: '50%',
              transform: 'translateY(-50%)',
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              backgroundColor: alpha('#000', 0.08),
              px: 1,
              py: 0.3,
              borderRadius: 1,
            }}
          >
            <Typography
              sx={{
                fontSize: 11,
                fontWeight: 500,
                fontFamily: "'Roboto', sans-serif",
                color: 'rgba(0, 0, 0, 0.6)',
              }}
            >
              ⌘K
            </Typography>
          </Box>
        </Box>

        {/* Right Side Icons */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
          {/* Edit Icon */}
       
            <IconButton
              size="small"
              sx={{
                color: 'rgba(0, 0, 0, 0.54)',
                p: 0.5,
                '&:hover': {
                  backgroundColor: alpha('#000', 0.04),
                },
              }}
            >
              <EditIcon width={16} height={16} color="rgba(0, 0, 0, 0.54)" />
            </IconButton>
         

          {/* Notification Bell */}
         
            <IconButton
              size="small"
              sx={{
                color: 'rgba(0, 0, 0, 0.54)',
                p: 0.5,
                '&:hover': {
                  backgroundColor: alpha('#000', 0.04),
                },
              }}
            >
              <Bell width={14} height={16} color="rgba(0, 0, 0, 0.54)" />
            </IconButton>

          {/* TiaChat Button */}
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#0066ff',
              color: '#ffffff',
              textTransform: 'none',
              fontWeight: 500,
              fontFamily: "'Roboto', sans-serif",
              px: 2.5,
              py: 1,
              borderRadius: 2,
              gap: 0.7, 
              whiteSpace: "nowrap",
              boxShadow: '0 2px 8px rgba(0, 102, 255, 0.3)',
              '&:hover': {
                backgroundColor: '#0052cc',
                boxShadow: '0 4px 12px rgba(0, 102, 255, 0.4)',
              },
            }}
          >
            <TiaChatIcon color="#fff" width={25} height={25} />
             TiaChat
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
