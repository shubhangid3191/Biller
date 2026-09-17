import { Box, Typography } from '@mui/material';

function BulkEligibility() {
  return (
    <Box
      sx={{
        padding: '24px',
        width: '100%',
        height: '100%',
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
        Bulk Eligibility
      </Typography>
      <Typography variant="body1" sx={{ color: 'rgba(0, 0, 0, 0.6)' }}>
        Bulk eligibility checking will go here...
      </Typography>
    </Box>
  );
}

export default BulkEligibility;
