import { Box, Typography } from "@mui/material";

function PriBilling() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: "#f5f7fa",
        p: 3,
      }}
    >
      <Typography variant="h4" sx={{ mb: 2, color: "#1f2937", fontWeight: 600 }}>
        Pri Billing Claim
      </Typography>
     
    </Box>
  );
}

export default PriBilling;
