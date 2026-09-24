import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
  Tooltip,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  FilterIcon,
  ExportIcon,
  RPEditIcon,
  RPDeleteIcon,
} from "../assets/Assets";

/* ------------------------------------------------------------------ */
/* Design tokens                                                        */
/* ------------------------------------------------------------------ */
const T = {
  border: "#E5E7EB",
  rowLine: "#EEF1F7",
  blue: "#2563EB",
  page: "#F7F9FC",
};

/* ------------------------------------------------------------------ */
/* Dummy rows                                                           */
/* ------------------------------------------------------------------ */
const createRows = (count = 11) =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    programName: "Clare Jane",
    description: "Provider-Delivered Care Management.",
    cpt: "11980; 00934",
  }));

const ROWS = createRows(11);

/* ------------------------------------------------------------------ */
/* Cell styles                                                          */
/* ------------------------------------------------------------------ */
const cellSx = {
  borderBottom: `1px solid ${T.rowLine}`,
  py: 1.4,
  px: 2,
  fontSize: 13,
  fontWeight: 500,
  color: "#2E2E2E",
  whiteSpace: "nowrap",
};

const headCellSx = {
  bgcolor: "#EBF1FE",
  fontWeight: 700,
  fontSize: 13,
  color: "#373B4D",
  borderBottom: "none",
  borderRight: "1px solid #BED3FC",
  py: 1.4,
  px: 2,
  whiteSpace: "nowrap",
};

/* ------------------------------------------------------------------ */
/* Main Page                                                            */
/* ------------------------------------------------------------------ */
export default function Program() {
  const navigate = useNavigate();
  const [data] = React.useState(ROWS);

  return (
    <Box
      sx={{
        bgcolor: T.page,
        minHeight: "100vh",
        width: "100%",
        py: { xs: 2, md: 3 },
        px: { xs: 2, sm: 3, md: 5, lg: 7 },
        boxSizing: "border-box",
      }}
    >
      {/* ── HEADER ── */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
          mb: 3,
        }}
      >
        <Typography sx={{ fontSize: 28, fontWeight: 700, color: "#111827" }}>
          Program Management
        </Typography>

        <Stack direction="row" spacing={1.5} flexWrap="wrap">
          <Button
            variant="outlined"
            startIcon={<FilterIcon width={16} height={16} color={T.blue} />}
            sx={{
              textTransform: "none",
              fontSize: 13,
              fontWeight: 700,
              borderRadius: "8px",
              color: T.blue,
              border: "2px solid #015DFF",
              px: 2,
              whiteSpace: "nowrap",
              "&:hover": { borderColor: T.blue, bgcolor: "#F4F8FF" },
            }}
          >
            Filter
          </Button>

          <Button
            variant="outlined"
            startIcon={<ExportIcon width={16} height={16} color={T.blue} />}
            sx={{
              textTransform: "none",
              fontSize: 13,
              fontWeight: 700,
              borderRadius: "8px",
              color: T.blue,
              border: "2px solid #015DFF",
              px: 2,
              whiteSpace: "nowrap",
              "&:hover": { borderColor: T.blue, bgcolor: "#F4F8FF" },
            }}
          >
            Export
          </Button>

          <Button
            variant="contained"
            disableElevation
            onClick={() => navigate("/program/configuration")}
            sx={{
              textTransform: "none",
              fontSize: 13,
              fontWeight: 600,
              borderRadius: "8px",
              bgcolor: T.blue,
              px: 2.5,
              whiteSpace: "nowrap",
              "&:hover": { bgcolor: "#1D4ED8" },
            }}
          >
            Add New
          </Button>
        </Stack>
      </Box>

      {/* ── TABLE ── */}
      <TableContainer
        sx={{
          border: `1px solid ${T.border}`,
          borderRadius: "10px",
          bgcolor: "#fff",
          overflowX: "auto",
        }}
      >
        <Table
          size="small"
          sx={{ tableLayout: "auto", borderCollapse: "collapse" }}
        >
          <TableHead>
            <TableRow>
              {[
                { label: "Program Name", arrow: true },
                { label: "Description", arrow: true },
                { label: "CPT", arrow: true },
                { label: "Action", center: true, last: true },
              ].map((col) => (
                <TableCell
                  key={col.label}
                  align={col.center ? "center" : "left"}
                  sx={{
                    ...headCellSx,
                    borderRight: col.last ? "none" : "1px solid #BED3FC",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: col.center ? "center" : "flex-start",
                      gap: 0.5,
                    }}
                  >
                    {col.label}
                    {col.arrow && (
                      <KeyboardArrowDownIcon
                        sx={{ fontSize: 16, color: "#9CA3AF" }}
                      />
                    )}
                  </Box>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((row, idx) => (
              <TableRow
                key={row.id}
                hover
                sx={{
                  "&:hover": { bgcolor: "#FAFBFE" },
                  "&:last-of-type td": { borderBottom: "none" },
                }}
              >
                <TableCell sx={cellSx}>{row.programName}</TableCell>
                <TableCell sx={cellSx}>{row.description}</TableCell>
                <TableCell sx={cellSx}>{row.cpt}</TableCell>
                <TableCell align="center" sx={cellSx}>
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Tooltip title="Edit" arrow>
                      <IconButton
                        size="small"
                        //onClick={() => navigate("/program/configuration")}
                        sx={{
                          color: T.blue,
                          "&:hover": { bgcolor: "#EEF4FF" },
                        }}
                      >
                        <RPEditIcon width={20} height={20} color={T.blue} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete" arrow>
                      <IconButton
                        size="small"
                        sx={{
                          color: T.blue,
                          "&:hover": { bgcolor: "#EEF4FF" },
                        }}
                      >
                        <RPDeleteIcon width={20} height={20} color={T.blue} />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
