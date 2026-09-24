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
  headBg: "#EBF1FE",
  border: "#BED3FC",
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
    practice: "Fresh Original",
    cpt: "589065",
    description: "8475875747",
    specialty: "-",
    typeOfService: "Whole Blood",
    modifiers: "-",
    program: "PDCM",
    effectiveDate: "2024-08-06 - 2024-06-16",
    charge: "$1,110",
  }));

const ROWS = createRows(11);

/* ------------------------------------------------------------------ */
/* Cell styles                                                          */
/* ------------------------------------------------------------------ */
const cellSx = {
  borderBottom: `1px solid ${T.rowLine}`,
  py: 1.2,
  px: 1.5,
  fontSize: 13,
  fontWeight: 500,
  color: "#2E2E2E",
  whiteSpace: "nowrap",
};

const headCellSx = {
  ...cellSx,
  bgcolor: T.headBg,
  fontWeight: 700,
  fontSize: 13,
  color: "#373B4D",
  borderBottom: "none",
  borderRight: `1px solid ${T.border}`,
  whiteSpace: "pre-line",
  lineHeight: 1.3,
};

/* ------------------------------------------------------------------ */
/* Main Page                                                            */
/* ------------------------------------------------------------------ */
export default function Fee() {
  const navigate = useNavigate();

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
          Fee Management
        </Typography>

        <Stack direction="row" spacing={1.5} flexWrap="wrap">
          <Button
            variant="outlined"
            startIcon={<FilterIcon color="#2563EB" />}
            sx={{
              textTransform: "none",
              fontSize: 13,
              fontWeight: 700,
              borderRadius: "8px",
              color: T.blue,
              border: "2px solid #015DFF",
              px: 2,
              "&:hover": { borderColor: T.blue, bgcolor: "#F4F8FF" },
            }}
          >
            Filter
          </Button>

          <Button
            variant="outlined"
            startIcon={<ExportIcon color="#2563EB" />}
            sx={{
              textTransform: "none",
              fontSize: 13,
              fontWeight: 700,
              borderRadius: "8px",
              color: T.blue,
              border: "2px solid #015DFF",
              px: 2,
              "&:hover": { borderColor: T.blue, bgcolor: "#F4F8FF" },
            }}
          >
            Export
          </Button>

          <Button
            variant="contained"
            disableElevation
            onClick={() => navigate("/fee/configuration")}
            sx={{
              textTransform: "none",
              fontSize: 13,
              fontWeight: 600,
              borderRadius: "8px",
              bgcolor: T.blue,
              px: 2.5,
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
                { label: "Practice", arrow: true },
                { label: "CPT/HCPCS", arrow: true },
                { label: "Description", arrow: true },
                { label: "Specialty", arrow: true },
                { label: "Type of\nService", arrow: true },
                { label: "Modifiers", arrow: true },
                { label: "Program", arrow: true },
                { label: "Effective\nDate", arrow: true },
                { label: "Charge" },
                { label: "Action", last: true },
              ].map((col) => (
                <TableCell
                  key={col.label}
                  sx={{
                    ...headCellSx,
                    borderRight: col.last ? "none" : `1px solid ${T.border}`,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    {col.label}
                    {col.arrow && (
                      <KeyboardArrowDownIcon
                        sx={{
                          fontSize: 16,
                          color: "#52525B",
                          ml: "auto",
                          flexShrink: 0,
                        }}
                      />
                    )}
                  </Box>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {ROWS.map((row) => (
              <TableRow
                key={row.id}
                hover
                sx={{ "&:hover": { bgcolor: "#FAFBFE" } }}
              >
                <TableCell sx={cellSx}>{row.practice}</TableCell>
                <TableCell sx={cellSx}>{row.cpt}</TableCell>
                <TableCell sx={cellSx}>{row.description}</TableCell>
                <TableCell sx={cellSx}>{row.specialty}</TableCell>
                <TableCell sx={cellSx}>{row.typeOfService}</TableCell>
                <TableCell sx={cellSx}>{row.modifiers}</TableCell>
                <TableCell sx={cellSx}>{row.program}</TableCell>
                <TableCell sx={cellSx}>{row.effectiveDate}</TableCell>
                <TableCell sx={cellSx}>{row.charge}</TableCell>
                <TableCell sx={{ ...cellSx, borderRight: "none" }}>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <Tooltip title="Edit" arrow>
                      <IconButton
                        size="small"
                        onClick={() => navigate("/fee/configuration")}
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
