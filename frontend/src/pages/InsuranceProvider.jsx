import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Checkbox,
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
  SettingsIcon2,
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
    payorName: "Clare Jane",
    payorCode: "8475875747",
    address: "WashingtonUSe, Aleutians East, Ala...",
    fax: "8475875747",
    active: true,
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
export default function InsuranceProvider() {
  const navigate = useNavigate();
  const [data, setData] = React.useState(ROWS);

  const toggleActive = (id) => {
    setData((prev) =>
      prev.map((r) => (r.id === id ? { ...r, active: !r.active } : r)),
    );
  };

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
          Insurance Provider
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
            onClick={() => navigate("/insurance-provider/edit")}
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
                { label: "Payor Name", arrow: true },
                { label: "Payor Code", arrow: true },
                { label: "Address", arrow: true },
                { label: "Fax", arrow: true },
                { label: "Active" },
                { label: "Action", last: true },
              ].map((col) => (
                <TableCell
                  key={col.label}
                  align={
                    col.label === "Active" || col.label === "Action"
                      ? "center"
                      : "left"
                  }
                  sx={{
                    ...headCellSx,
                    borderRight: col.last ? "none" : `1px solid ${T.border}`,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent:
                        col.label === "Active" || col.label === "Action"
                          ? "center"
                          : "flex-start",
                      gap: 0.5,
                    }}
                  >
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
            {data.map((row) => (
              <TableRow
                key={row.id}
                hover
                sx={{ "&:hover": { bgcolor: "#FAFBFE" } }}
              >
                <TableCell sx={cellSx}>{row.payorName}</TableCell>
                <TableCell sx={cellSx}>{row.payorCode}</TableCell>
                <TableCell
                  sx={{
                    ...cellSx,
                    maxWidth: 260,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {row.address}
                </TableCell>
                <TableCell sx={cellSx}>{row.fax}</TableCell>
                <TableCell align="center" sx={{ ...cellSx }}>
                  <Checkbox
                    checked={row.active}
                    onChange={() => toggleActive(row.id)}
                    size="small"
                    sx={{
                      color: T.blue,
                      "&.Mui-checked": { color: T.blue },
                      "& .MuiSvgIcon-root": { fontSize: 20 },
                    }}
                  />
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ ...cellSx, borderRight: "none" }}
                >
                  <Stack
                    direction="row"
                    spacing={0.5}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Tooltip title="Edit" arrow>
                      <IconButton
                        size="small"
                        onClick={() => navigate("/insurance-provider/edit")}
                        sx={{
                          color: T.blue,
                          "&:hover": { bgcolor: "#EEF4FF" },
                        }}
                      >
                        <RPEditIcon width={20} height={20} color={T.blue} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Settings" arrow>
                      <IconButton
                        size="small"
                        sx={{
                          color: T.blue,
                          "&:hover": { bgcolor: "#EEF4FF" },
                        }}
                      >
                        <SettingsIcon2 width={20} height={20} color={T.blue} />
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
