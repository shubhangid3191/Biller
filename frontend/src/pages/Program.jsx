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
  headSymbol: "#9CA3AF",
  blue: "#2563EB",
  page: "#F7F9FC",
};

/* ------------------------------------------------------------------ */
/* Dummy rows (varied so sorting can be seen working)                   */
/* ------------------------------------------------------------------ */
const SAMPLE = [
  ["Clare Jane", "Provider-Delivered Care Management.", "11980; 00934"],
  ["Adam Ross", "Chronic Care Management.", "99490; 99439"],
  ["Zoe Martin", "Remote Patient Monitoring.", "99453; 99454"],
  ["Brian Cox", "Principal Care Management.", "99424; 99425"],
  ["Maya Singh", "Transitional Care Management.", "99495; 99496"],
  ["Liam Turner", "Behavioral Health Integration.", "99484; 99492"],
  ["Nora Blake", "Annual Wellness Visit.", "G0438; G0439"],
  ["Ethan Hall", "Advance Care Planning.", "99497; 99498"],
  ["Ivy Morgan", "Home Health Certification.", "G0180; G0179"],
  ["Owen Reed", "Telehealth Consultation.", "99441; 99442"],
  ["Ruby Fox", "Preventive Medicine Counseling.", "99401; 99402"],
];

const ROWS = SAMPLE.map(([programName, description, cpt], id) => ({
  id, programName, description, cpt,
}));

/* ------------------------------------------------------------------ */
/* Table columns                                                        */
/* ------------------------------------------------------------------ */
const COLUMNS = [
  { id: "programName", label: "Program Name", sort: "alpha" },
  { id: "description", label: "Description", sort: "alpha" },
  { id: "cpt", label: "CPT", sort: "alpha" },
  { id: "actions", label: "Action", center: true, last: true, width: 140 },
];

/* ------------------------------------------------------------------ */
/* Sort helpers                                                         */
/* ------------------------------------------------------------------ */
const COMPARERS = {
  alpha: (a, b) =>
    String(a).localeCompare(String(b), undefined, { sensitivity: "base", numeric: true }),
};

const SORT_TITLES = {
  alpha: { asc: "Sorted A–Z", desc: "Sorted Z–A", none: "Sort A–Z" },
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

/* Action buttons: plain icons, evenly spaced and centered under header */
const actionBtnSx = {
  p: 0.6,
  color: T.blue,
  "&:hover": { bgcolor: "#EEF4FF" },
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
        borderRight: column.last ? "none" : "1px solid #BED3FC",
        ...(column.width && { width: column.width, minWidth: column.width }),
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
export default function Program() {
  const navigate = useNavigate();
  const [data] = React.useState(ROWS);
  const { sort, sortedRows, handleSort } = useSortedRows(data, COLUMNS);

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
          Program Management
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
            onClick={() => navigate("/program/configuration")}
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
                sx={{
                  "&:hover": { bgcolor: "#FAFBFE" },
                  "&:last-of-type td": { borderBottom: "none" },
                }}
              >
                <TableCell sx={cellSx}>{row.programName}</TableCell>
                <TableCell sx={cellSx}>{row.description}</TableCell>
                <TableCell sx={cellSx}>{row.cpt}</TableCell>
                <TableCell
                  align="center"
                  sx={{ ...cellSx, width: 140, minWidth: 140 }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 1.5,
                    }}
                  >
                    <Tooltip title="Edit" arrow>
                      <IconButton
                        size="small"
                        aria-label="Edit"
                        //onClick={() => navigate("/program/configuration")}
                        sx={actionBtnSx}
                      >
                        <RPEditIcon width={20} height={20} color={T.blue} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete" arrow>
                      <IconButton
                        size="small"
                        aria-label="Delete"
                        sx={actionBtnSx}
                      >
                        <RPDeleteIcon width={20} height={20} color={T.blue} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}