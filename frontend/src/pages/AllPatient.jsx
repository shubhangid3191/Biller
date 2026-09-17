import { Box, Typography } from '@mui/material';

function AllPatient() {
  return (
    <Box
      sx={{
        padding: '24px',
        width: '100%',
        height: '100%',
      }}
    >
   
      <Typography variant="body1" sx={{ color: 'black ' }}>
        Patient list table will go here
      </Typography>
    </Box>
  );
}

export default AllPatient;