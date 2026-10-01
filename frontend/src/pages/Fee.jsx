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
  headSymbol: "#52525B",
  border: "#BED3FC",
  rowLine: "#EEF1F7",
  blue: "#2563EB",
  page: "#F7F9FC",
};

/* ------------------------------------------------------------------ */
/* Dummy rows (varied so sorting can be seen working)                   */
/* ------------------------------------------------------------------ */
const SAMPLE = [
  ["Fresh Original", "589065", "8475875747", "-", "Whole Blood", "-", "PDCM", "2024-08-06 - 2024-06-16", "$1,110"],
  ["Hitex", "412873", "9123456780", "Cardiology", "Urine Test", "25", "CCM", "2023-03-14 - 2024-03-13", "$320"],
  ["Balance Report", "731920", "7345678123", "Neurology", "Imaging", "59", "RPM", "2025-01-02 - 2025-12-31", "$2,450"],
  ["Fresh", "218456", "6456781234", "Orthopedics", "Whole Blood", "-", "PDCM", "2022-11-20 - 2023-11-19", "$780"],
  ["Hitex", "905312", "9567812345", "-", "Consultation", "26", "CCM", "2024-05-09 - 2025-05-08", "$150"],
  ["Balance Report", "347201", "5678123456", "Cardiology", "Imaging", "-", "RPM", "2023-07-30 - 2024-07-29", "$1,980"],
  ["Fresh Original", "660148", "8781234567", "Neurology", "Urine Test", "TC", "PDCM", "2025-02-17 - 2026-02-16", "$95"],
  ["Fresh", "129884", "4892345678", "-", "Whole Blood", "-", "CCM", "2021-09-01 - 2022-08-31", "$610"],
  ["Hitex", "854730", "9903456781", "Orthopedics", "Consultation", "59", "RPM", "2024-12-12 - 2025-12-11", "$430"],
  ["Balance Report", "503917", "3014567812", "Cardiology", "Imaging", "25", "PDCM", "2022-04-25 - 2023-04-24", "$3,200"],
  ["Fresh Original", "776205", "7125678123", "-", "Urine Test", "-", "CCM", "2023-10-08 - 2024-10-07", "$275"],
];

const ROWS = SAMPLE.map(
  ([practice, cpt, description, specialty, typeOfService, modifiers, program, effectiveDate, charge], id) => ({
    id, practice, cpt, description, specialty, typeOfService, modifiers, program, effectiveDate, charge,
  })
);

/* ------------------------------------------------------------------ */
/* Table columns                                                        */
/* sort: "alpha" = A-Z / Z-A, "number" = low-high, "date" = start date  */
/* ------------------------------------------------------------------ */
const COLUMNS = [
  { id: "practice", label: "Practice", sort: "alpha" },
  { id: "cpt", label: "CPT/HCPCS", sort: "number" },
  { id: "description", label: "Description", sort: "number" },
  { id: "specialty", label: "Specialty", sort: "alpha" },
  { id: "typeOfService", label: "Type of\nService", sort: "alpha" },
  { id: "modifiers", label: "Modifiers", sort: "alpha" },
  { id: "program", label: "Program", sort: "alpha" },
  { id: "effectiveDate", label: "Effective\nDate", sort: "date" },
  { id: "charge", label: "Charge" },
  { id: "actions", label: "Action", last: true },
];

/* ------------------------------------------------------------------ */
/* Sort helpers                                                         */
/* ------------------------------------------------------------------ */
const toStartTime = (s) => {
  const t = new Date(String(s).slice(0, 10)).getTime();
  return Number.isNaN(t) ? 0 : t;
};

const COMPARERS = {
  alpha: (a, b) =>
    String(a).localeCompare(String(b), undefined, { sensitivity: "base", numeric: true }),
  number: (a, b) => (Number(a) || 0) - (Number(b) || 0),
  date: (a, b) => toStartTime(a) - toStartTime(b),
};

const SORT_TITLES = {
  alpha: { asc: "Sorted A–Z", desc: "Sorted Z–A", none: "Sort A–Z" },
  number: { asc: "Sorted low to high", desc: "Sorted high to low", none: "Sort low to high" },
  date: { asc: "Sorted oldest first", desc: "Sorted newest first", none: "Sort oldest first" },
};

/* asc <-> desc only, no reset to original order */
function useSortedRows(rows, columns) {
  const [sort, setSort] = React.useState({ columnId: null, dir: null });

  const sortedRows = React.useMemo(() => {
    if (!sort.columnId || !sort.dir) return rows;
    const column = columns.find((c) => c.id === sort.columnId);
    if (!column?.sort) return rows;
    const factor = sort.dir === "asc" ? 1 : -1;
    const compare = COMPARERS[column.sort];
    return [...rows].sort((a, b) => compare(a[sort.columnId], b[sort.columnId]) * factor);
  }, [rows, columns, sort]);

  const handleSort = (columnId) =>
    setSort((prev) => {
      if (prev.columnId !== columnId || !prev.dir) return { columnId, dir: "asc" };
      return { columnId, dir: prev.dir === "asc" ? "desc" : "asc" };
    });

  return { sort, sortedRows, handleSort };
}

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
/* Header cell (arrow toggles sort)                                     */
/* ------------------------------------------------------------------ */
function HeaderCell({ column, sortDir, onSort }) {
  const active = !!sortDir;
  const titles = column.sort ? SORT_TITLES[column.sort] : null;

  return (
    <TableCell
      sx={{
        ...headCellSx,
        borderRight: column.last ? "none" : `1px solid ${T.border}`,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        {column.label}
        {column.sort && (
          <Tooltip title={titles[sortDir || "none"]} arrow>
            <IconButton
              size="small"
              aria-label={`Sort ${column.label.replace("\n", " ")}`}
              onClick={() => onSort(column.id)}
              sx={{
                p: 0.2,
                ml: "auto",
                flexShrink: 0,
                borderRadius: "6px",
                color: active ? T.blue : T.headSymbol,
                bgcolor: active ? "#DCE7FD" : "transparent",
                "&:hover": { bgcolor: "#DCE7FD" },
              }}
            >
              <KeyboardArrowDownIcon
                sx={{
                  fontSize: 16,
                  transform: sortDir === "desc" ? "rotate(180deg)" : "none",
                  transition: "transform .15s ease",
                }}
              />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </TableCell>
  );
}

/* ------------------------------------------------------------------ */
/* Main Page                                                            */
/* ------------------------------------------------------------------ */
export default function Fee() {
  const navigate = useNavigate();
  const { sort, sortedRows, handleSort } = useSortedRows(ROWS, COLUMNS);

  return (
    <Box
      sx={{
        bgcolor: T.page,
        minHeight: "100vh",
        width: "100%",
        py: { xs: 2, md: 3 },
        px: { xs: 1.5, sm: 2, md: 2.5, lg: 2.5 },
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
              fontWeight: 500,
              borderRadius: "8px",
              color: T.blue,
              border: "1.5px solid #015DFF",
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
              fontWeight: 500,
              borderRadius: "8px",
              color: T.blue,
              border: "1.5px solid #015DFF",
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
              fontWeight: 500,
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
              {COLUMNS.map((col) => (
                <HeaderCell
                  key={col.id}
                  column={col}
                  sortDir={sort.columnId === col.id ? sort.dir : null}
                  onSort={handleSort}
                />
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {sortedRows.map((row) => (
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