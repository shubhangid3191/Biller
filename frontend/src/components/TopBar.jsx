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
import { StarIcon, EditIcon, NotificationIcon } from '../Assets/Icons';

const drawerWidth = 240;

function TopBar() {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
        backgroundColor: '#ffffff',
        boxShadow: '0 1px 4px rgba(0, 0, 0, 0.08)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
        {/* Search Bar */}
        <Box
          sx={{
            position: 'relative',
            borderRadius: 2,
            backgroundColor: alpha('#000', 0.04),
            '&:hover': {
              backgroundColor: alpha('#000', 0.06),
            },
            width: '100%',
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
              '& .MuiInputBase-input': {
                padding: '12px 48px 12px 0',
                paddingLeft: `calc(1em + 32px)`,
                fontSize: 14,
                '&::placeholder': {
                  color: 'rgba(0, 0, 0, 0.4)',
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
                color: 'rgba(0, 0, 0, 0.6)',
              }}
            >
              ⌘K
            </Typography>
          </Box>
        </Box>

        {/* Right Side Icons */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.7 }}>
          {/* Edit Icon */}
          <IconButton
            size="medium"
            sx={{
              color: 'rgba(0, 0, 0, 0.54)',
              '&:hover': {
                backgroundColor: alpha('#000', 0.04),
              },
            }}
          >
            <EditIcon width={16} height={16} color="rgba(0, 0, 0, 0.54)" />
          </IconButton>

          {/* Notification Bell */}
          <IconButton
            size="medium"
            sx={{
              color: 'rgba(0, 0, 0, 0.54)',
              '&:hover': {
                backgroundColor: alpha('#000', 0.04),
              },
            }}
          >
            <NotificationIcon width={14} height={16} color="rgba(0, 0, 0, 0.54)" />
          </IconButton>

          {/* TiaChat Button */}
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#0066ff',
              color: '#ffffff',
              textTransform: 'none',
              fontWeight: 600,
              px: 2.5,
              py: 1,
              borderRadius: 2,
              boxShadow: '0 2px 8px rgba(0, 102, 255, 0.3)',
              '&:hover': {
                backgroundColor: '#0052cc',
                boxShadow: '0 4px 12px rgba(0, 102, 255, 0.4)',
              },
            }}
          >
            + TiaChat
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
