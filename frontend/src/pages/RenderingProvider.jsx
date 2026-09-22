import { Box, Typography } from '@mui/material';

function RenderingProvider() {
  return (
    <Box
      sx={{
        padding: '24px',
        width: '100%',
        height: '100%',
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
     RenderingProvider
      </Typography>
    
    </Box>
  );
}

export default RenderingProvider;
