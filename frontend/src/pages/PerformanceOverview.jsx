import { Box, Typography } from "@mui/material";

function PerformanceOverview() {
  return (
    <Box
      sx={{
        padding: "24px",
        width: "100%",
        height: "100%",
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
        PerformanceOverview{" "}
      </Typography>
    </Box>
  );
}

export default PerformanceOverview;
