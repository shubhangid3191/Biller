import { Box, Typography } from '@mui/material';

function AddNewPatient() {
  return (
    <Box
      sx={{
        padding: '24px',
        width: '100%',
        height: '100%',
      }}
    >
     
      <Typography variant="body1" sx={{ color: 'black' }}>
        Add patient form will go here
      </Typography>
    </Box>
  );
}

export default AddNewPatient;