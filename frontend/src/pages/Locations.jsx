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
  Checkbox,
  Stack,
  Tooltip,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { FilterIcon, ExportIcon, RPEditIcon } from "../assets/Assets";

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
  ["Location 1", "WashingtonUSe, Aleuti...", "8475875747", "8475875747", "8475875747", "Fresh Original", true],
  ["Location 2", "Boston, Suffolk Coun...", "9123456780", "9123456781", "9123456782", "Hitex", true],
  ["Location 3", "Denver, Denver Coun...", "7345678123", "7345678124", "7345678125", "Balance Report", false],
  ["Annex Clinic", "Austin, Travis Count...", "6456781234", "6456781235", "6456781236", "Fresh Original", true],
  ["Central Hospital", "Chicago, Cook County...", "9567812345", "9567812346", "9567812347", "Hitex", true],
  ["East Wing", "Seattle, King County...", "5678123456", "5678123457", "5678123458", "Balance Report", true],
  ["Lakeside Center", "Miami, Miami-Dade...", "8781234567", "8781234568", "8781234569", "Fresh", false],
  ["Northgate Care", "Phoenix, Maricopa...", "4892345678", "4892345679", "4892345670", "Hitex", true],
  ["Riverside Unit", "Portland, Multnomah...", "9903456781", "9903456782", "9903456783", "Fresh Original", true],
  ["South Campus", "Dallas, Dallas County...", "3014567812", "3014567813", "3014567814", "Balance Report", true],
  ["West Point", "Atlanta, Fulton Coun...", "7125678123", "7125678124", "7125678125", "Fresh", true],
];

const ROWS = SAMPLE.map(
  ([location, address, contact, fax, npi, practice, active], id) => ({
    id, location, address, contact, fax, npi, practice, active,
  })
);

/* ------------------------------------------------------------------ */
/* Table columns                                                        */
/* sort: "alpha" = A-Z / Z-A, "number" = low-high / high-low            */
/* ------------------------------------------------------------------ */
const COLUMNS = [
  { id: "location", label: "Service Location", sort: "alpha" },
  { id: "address", label: "Address", sort: "alpha" },
  { id: "contact", label: "Contact number", sort: "number" },
  { id: "fax", label: "Fax", sort: "number" },
  { id: "npi", label: "NPI", sort: "number" },
  { id: "practice", label: "Practice", sort: "alpha" },
  { id: "active", label: "Active", center: true },
  { id: "actions", label: "Action", last: true },
];

/* ------------------------------------------------------------------ */
/* Sort helpers                                                         */
/* ------------------------------------------------------------------ */
const COMPARERS = {
  alpha: (a, b) => String(a).localeCompare(String(b), undefined, { sensitivity: "base" }),
  number: (a, b) => (Number(a) || 0) - (Number(b) || 0),
};

const SORT_TITLES = {
  alpha: { asc: "Sorted A–Z", desc: "Sorted Z–A", none: "Sort A–Z" },
  number: { asc: "Sorted low to high", desc: "Sorted high to low", none: "Sort low to high" },
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
};

const headCellSx = {
  ...cellSx,
  bgcolor: T.headBg,
  fontWeight: 700,
  fontSize: 14,
  color: "#373B4D",
  borderBottom: "none",
  borderRight: `1px solid ${T.border}`,
  whiteSpace: "nowrap",
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
        textAlign: column.center ? "center" : "left",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        {column.label}
        {column.sort && (
          <Tooltip title={titles[sortDir || "none"]} arrow>
            <IconButton
              size="small"
              aria-label={`Sort ${column.label}`}
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
export default function Locations() {
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
    Service Location Management
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
                <TableCell sx={cellSx}>{row.location}</TableCell>
                <TableCell sx={cellSx}>{row.address}</TableCell>
                <TableCell sx={cellSx}>{row.contact}</TableCell>
                <TableCell sx={cellSx}>{row.fax}</TableCell>
                <TableCell sx={cellSx}>{row.npi}</TableCell>
                <TableCell sx={cellSx}>{row.practice}</TableCell>
                <TableCell sx={{ ...cellSx, textAlign: "center" }}>
                  <Checkbox
                    defaultChecked={row.active}
                    size="small"
                    sx={{
                      p: 0,
                      color: "#C8D0DC",
                      "&.Mui-checked": { color: T.blue },
                      "& svg": { fontSize: 18 },
                    }}
                  />
                </TableCell>
                <TableCell sx={{ ...cellSx, borderRight: "none" }}>
                  <Tooltip title="Edit" arrow>
                    <IconButton
                      size="small"
                      onClick={() => navigate("/locations/edit")}
                      sx={{ color: T.blue, "&:hover": { bgcolor: "#EEF4FF" } }}
                    >
                      <RPEditIcon width={20} height={20} color={T.blue} />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}