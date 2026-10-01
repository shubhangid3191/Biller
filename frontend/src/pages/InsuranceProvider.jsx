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
  ["Clare Jane", "8475875747", "WashingtonUSe, Aleutians East, Ala...", "8475875747", true],
  ["Aetna", "1123456780", "Hartford, Hartford County, Conn...", "1123456781", true],
  ["Blue Cross", "7345678123", "Chicago, Cook County, Illinois...", "7345678124", false],
  ["Cigna", "6456781234", "Bloomfield, Hartford County, C...", "6456781235", true],
  ["Humana", "9567812345", "Louisville, Jefferson County, K...", "9567812346", true],
  ["Kaiser", "5678123456", "Oakland, Alameda County, Cali...", "5678123457", true],
  ["Medicare", "8781234567", "Baltimore, Baltimore County, ...", "8781234568", false],
  ["Molina", "4892345678", "Long Beach, Los Angeles Coun...", "4892345679", true],
  ["Oscar Health", "9903456781", "New York, New York County, ...", "9903456782", true],
  ["Tricare", "3014567812", "Falls Church, Fairfax County, ...", "3014567813", true],
  ["United Health", "7125678123", "Minnetonka, Hennepin County...", "7125678124", true],
];

const ROWS = SAMPLE.map(([payorName, payorCode, address, fax, active], id) => ({
  id, payorName, payorCode, address, fax, active,
}));

/* ------------------------------------------------------------------ */
/* Table columns                                                        */
/* sort: "alpha" = A-Z / Z-A, "number" = low-high / high-low            */
/* ------------------------------------------------------------------ */
const COLUMNS = [
  { id: "payorName", label: "Payor Name", sort: "alpha" },
  { id: "payorCode", label: "Payor Code", sort: "number" },
  { id: "address", label: "Address", sort: "alpha" },
  { id: "fax", label: "Fax", sort: "number" },
  { id: "active", label: "Active", center: true },
  { id: "actions", label: "Action", center: true, last: true },
];

/* ------------------------------------------------------------------ */
/* Sort helpers                                                         */
/* ------------------------------------------------------------------ */
const COMPARERS = {
  alpha: (a, b) =>
    String(a).localeCompare(String(b), undefined, { sensitivity: "base", numeric: true }),
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
      align={column.center ? "center" : "left"}
      sx={{
        ...headCellSx,
        borderRight: column.last ? "none" : `1px solid ${T.border}`,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: column.center ? "center" : "flex-start",
          gap: 0.5,
        }}
      >
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
export default function InsuranceProvider() {
  const navigate = useNavigate();
  const [data, setData] = React.useState(ROWS);
  const { sort, sortedRows, handleSort } = useSortedRows(data, COLUMNS);

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
          Insurance Provider
        </Typography>

        <Stack direction="row" spacing={1.5} flexWrap="wrap">
          <Button
            variant="outlined"
            startIcon={<FilterIcon width={16} height={16} color={T.blue} />}
            sx={{
              textTransform: "none",
              fontSize: 13,
              fontWeight: 500,
              borderRadius: "8px",
              color: T.blue,
              border: "1.5px solid #015DFF",
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
              fontWeight: 500,
              borderRadius: "8px",
              color: T.blue,
              border: "1.5px solid #015DFF",
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
              fontWeight: 500,
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