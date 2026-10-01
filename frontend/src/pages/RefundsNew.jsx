import * as React from "react";
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
  InputBase,
  Tooltip,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  SettingsIcon,
  DownloadIcon,
  SearchIcon,
  FilterIcon1,
  InfoOutlinedIcon,
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
  headText: "#373B4D",
  headSymbol: "#52525B",
};

/* ------------------------------------------------------------------ */
/* Dummy rows — New tab (varied so sorting can be seen working)         */
/* ------------------------------------------------------------------ */
const NEW_SAMPLE = [
  ["Lisha Cook", "863", "24/08/1965", "864", "9759402598", "$200", "12/05/2026", "-", "Draft", "Mode 1"],
  ["Aamir Pathan", "864", "13/05/1984", "865", "9370937902", "$20", "03/06/2026", "-", "Approved", "Mode 2"],
  ["Rahul Sharma", "865", "14/03/1973", "866", "9812345670", "$75", "21/04/2026", "-", "Pending", "Mode 3"],
  ["Priya Patel", "866", "02/07/1991", "867", "9898989898", "$310", "09/01/2026", "-", "Draft", "Mode 1"],
  ["John Miller", "867", "29/01/1964", "868", "9123456780", "$45", "30/03/2026", "-", "Rejected", "Mode 2"],
  ["Anita Desai", "868", "18/09/1997", "869", "9345678123", "$500", "17/07/2026", "-", "Approved", "Mode 3"],
  ["Mark Wilson", "869", "06/05/1978", "870", "9456781234", "$90", "05/02/2026", "-", "Pending", "Mode 1"],
  ["Sneha Kulkarni", "870", "11/12/1986", "871", "9567812345", "$60", "28/05/2026", "-", "Draft", "Mode 2"],
  ["David Brown", "871", "23/08/1955", "872", "9678123456", "$240", "11/11/2025", "-", "Approved", "Mode 3"],
  ["Meera Nair", "872", "17/02/1970", "873", "9781234567", "$35", "19/08/2026", "-", "Rejected", "Mode 1"],
  ["Kevin Zhang", "873", "09/10/1995", "874", "9892345678", "$150", "03/09/2026", "-", "Pending", "Mode 2"],
  ["Fatima Khan", "874", "25/04/1983", "875", "9903456781", "$410", "14/12/2025", "-", "Draft", "Mode 3"],
  ["Robert King", "875", "30/06/1959", "876", "9014567812", "$25", "26/04/2026", "-", "Approved", "Mode 1"],
  ["Nisha Verma", "876", "09/02/1989", "877", "9125678123", "$130", "07/10/2026", "-", "Pending", "Mode 2"],
  ["Omar Ali", "877", "30/10/1967", "878", "9236781234", "$95", "12/03/2026", "-", "Rejected", "Mode 3"],
];

const NEW_ROWS = NEW_SAMPLE.map(
  ([patientName, patientId, dob, refundId, phone, refundAmount, lastUpdated, description, status, refundMode], id) => ({
    id, patientName, patientId, dob, refundId, phone, refundAmount, lastUpdated, description, status, refundMode,
  })
);

/* ------------------------------------------------------------------ */
/* Dummy rows — History tab                                             */
/* ------------------------------------------------------------------ */
const HISTORY_SAMPLE = [
  ["Lisha Cook", "863", "24/08/1965", "864", "9759402598", "$200", "12/05/2026", "-", "Draft"],
  ["Aamir Pathan", "864", "13/05/1984", "865", "9370937902", "$20", "03/06/2026", "-", "Approved"],
  ["Rahul Sharma", "865", "14/03/1973", "866", "9812345670", "$75", "21/04/2026", "-", "Pending"],
  ["Priya Patel", "866", "02/07/1991", "867", "9898989898", "$310", "09/01/2026", "-", "Draft"],
  ["John Miller", "867", "29/01/1964", "868", "9123456780", "$45", "30/03/2026", "-", "Rejected"],
  ["Anita Desai", "868", "18/09/1997", "869", "9345678123", "$500", "17/07/2026", "-", "Approved"],
  ["Mark Wilson", "869", "06/05/1978", "870", "9456781234", "$90", "05/02/2026", "-", "Pending"],
  ["Sneha Kulkarni", "870", "11/12/1986", "871", "9567812345", "$60", "28/05/2026", "-", "Draft"],
  ["David Brown", "871", "23/08/1955", "872", "9678123456", "$240", "11/11/2025", "-", "Approved"],
  ["Meera Nair", "872", "17/02/1970", "873", "9781234567", "$35", "19/08/2026", "-", "Rejected"],
  ["Kevin Zhang", "873", "09/10/1995", "874", "9892345678", "$150", "03/09/2026", "-", "Pending"],
  ["Fatima Khan", "874", "25/04/1983", "875", "9903456781", "$410", "14/12/2025", "-", "Draft"],
  ["Robert King", "875", "30/06/1959", "876", "9014567812", "$25", "26/04/2026", "-", "Approved"],
  ["Nisha Verma", "876", "09/02/1989", "877", "9125678123", "$130", "07/10/2026", "-", "Pending"],
  ["Omar Ali", "877", "30/10/1967", "878", "9236781234", "$95", "12/03/2026", "-", "Rejected"],
];

const HISTORY_ROWS = HISTORY_SAMPLE.map(
  ([patientName, patientId, dob, refundId, phone, refundAmount, lastUpdated, description, status], id) => ({
    id, patientName, patientId, dob, refundId, phone, refundAmount, lastUpdated, description, status,
  })
);

/* ------------------------------------------------------------------ */
/* Table columns                                                        */
/* sort: "alpha" = A-Z / Z-A, "number" = amount, "date" = DD/MM/YYYY    */
/* ------------------------------------------------------------------ */
const NEW_COLUMNS = [
  { id: "patientName", label: "Patient name" },
  { id: "patientId", label: "Patient ID" },
  { id: "dob", label: "DOB" },
  { id: "refundId", label: "Refund ID" },
  { id: "phone", label: "Phone number" },
  { id: "refundAmount", label: "Refund Amt", sort: "number" },
  { id: "lastUpdated", label: "Last updated", sort: "date" },
  { id: "description", label: "Description" },
  { id: "status", label: "Status", sort: "alpha" },
  { id: "refundMode", label: "Refund Mode", sort: "alpha" },
  { id: "actions", label: "Action", last: true },
];

const HISTORY_COLUMNS = [
  { id: "patientName", label: "Patient name" },
  { id: "patientId", label: "Patient ID" },
  { id: "dob", label: "DOB" },
  { id: "refundId", label: "Refund ID" },
  { id: "phone", label: "Phone number" },
  { id: "refundAmount", label: "Refund Amount", sort: "number" },
  { id: "lastUpdated", label: "Last updated", sort: "date" },
  { id: "description", label: "Description" },
  { id: "status", label: "Status", sort: "alpha" },
  { id: "actions", label: "Action", last: true },
];

/* ------------------------------------------------------------------ */
/* Search helper — matches any column value, case-insensitive           */
/* ------------------------------------------------------------------ */
const filterRows = (rows, query) => {
  const q = query.trim().toLowerCase();
  if (!q) return rows;
  return rows.filter((row) =>
    Object.entries(row).some(
      ([key, value]) => key !== "id" && String(value).toLowerCase().includes(q)
    )
  );
};

/* ------------------------------------------------------------------ */
/* Sort helpers                                                         */
/* ------------------------------------------------------------------ */
const toAmount = (s) => parseFloat(String(s).replace(/[^0-9.-]/g, "")) || 0;

const parseDMY = (s) => {
  const [d, m, y] = String(s).split("/").map(Number);
  const t = new Date(y, (m || 1) - 1, d || 1).getTime();
  return Number.isNaN(t) ? 0 : t;
};

const COMPARERS = {
  alpha: (a, b) => String(a).localeCompare(String(b), undefined, { sensitivity: "base" }),
  number: (a, b) => toAmount(a) - toAmount(b),
  date: (a, b) => parseDMY(a) - parseDMY(b),
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
  py: 1.1,
  px: 1.5,
  fontSize: 13,
  color: "#2E2E2E",
};

const headCellSx = {
  ...cellSx,
  bgcolor: T.headBg,
  fontWeight: 700,
  fontSize: 13,
  color: T.headText,
  borderBottom: "none",
  borderRight: `1px solid ${T.border}`,
  whiteSpace: "nowrap",
};

const checkboxSx = {
  p: 0,
  color: "#C3CBD9",
  "&.Mui-checked": { color: T.blue },
};

const iconBtnSx = {
  width: 40,
  height: 30,
  border: "none",
  borderRadius: "8px",
  backgroundColor: "white",
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  "&:hover": { backgroundColor: "#f9fafb" },
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
/* Row actions (shared by both tabs)                                    */
/* ------------------------------------------------------------------ */
function RowActions() {
  return (
    <Stack direction="row" spacing={0.5} alignItems="center">
      <IconButton
        size="small"
        aria-label="Info"
        sx={{ color: T.blue, "&:hover": { bgcolor: "#EEF4FF" } }}
      >
        <InfoOutlinedIcon width={20} height={20} color={T.blue} />
      </IconButton>

      <IconButton
        size="small"
        aria-label="Delete"
        sx={{ color: T.blue, "&:hover": { bgcolor: "#EEF4FF" } }}
      >
        <RPDeleteIcon width={20} height={20} color={T.blue} />
      </IconButton>
    </Stack>
  );
}

/* ------------------------------------------------------------------ */
/* Status chip (shared by both tabs)                                    */
/* ------------------------------------------------------------------ */
function StatusChip({ label }) {
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        px: 1.5,
        py: 0.3,
        borderRadius: "6px",
        bgcolor: "#EEF4FF",
        color: T.blue,
        fontSize: 12,
        fontWeight: 600,
      }}
    >
      {label}
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* Empty state row (shown when search has no matches)                   */
/* ------------------------------------------------------------------ */
function EmptyRow({ colSpan }) {
  return (
    <TableRow>
      <TableCell
        colSpan={colSpan}
        align="center"
        sx={{ ...cellSx, py: 6, color: "#6B7280", borderBottom: "none" }}
      >
        No records match to your search
      </TableCell>
    </TableRow>
  );
}

/* ------------------------------------------------------------------ */
/* Toolbar (shared)                                                     */
/* ------------------------------------------------------------------ */
function Toolbar({
  activeTab,
  onTabChange,
  counts,
  query,
  onQueryChange,
  onOpenSettings,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 1.5,
        mb: 1.5,
      }}
    >
      {/* Left — tabs */}
      <Stack direction="row" spacing={1}>
        {["new", "history"].map((tab) => {
          const isActive = activeTab === tab;
          return (
            <Box
              key={tab}
              onClick={() => onTabChange(tab)}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.6,
                px: 1.5,
                py: 0.5,
                borderRadius: "20px",
                cursor: "pointer",
                bgcolor: isActive ? T.blue : "#fff",
                border: isActive ? "none" : "1.5px solid #D1D5DB",
                color: isActive ? "#fff" : "#6B7280",
                fontSize: 13,
                fontWeight: 500,
                userSelect: "none",
                transition: "all 0.2s",
                "&:hover": !isActive ? { bgcolor: "#fff" } : {},
              }}
            >
              {tab === "new" ? "New" : "History"}
              <Box
                component="span"
                sx={{
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? "#fff" : "#9CA3AF",
                }}
              >
                {counts[tab]}
              </Box>
            </Box>
          );
        })}
      </Stack>

      {/* Right — icons + search + filter */}
      <Stack direction="row" alignItems="center" spacing={1}>
        {/* Settings */}
        <IconButton
          size="small"
          aria-label="Column settings"
          onClick={onOpenSettings}
          sx={iconBtnSx}
        >
          <SettingsIcon />
        </IconButton>

        {/* Download */}
        <IconButton size="small" aria-label="Download" sx={iconBtnSx}>
          <DownloadIcon />
        </IconButton>

        {/* Search bar */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.8,
            border: "1px solid #D1D5DB",
            borderRadius: "30px",
            px: 1.2,
            py: 0.5,
            bgcolor: "#F4F8FF",
            width: { xs: "100%", sm: 320 },
            "&:focus-within": { borderColor: "#DBE3EF" },
          }}
        >
          <SearchIcon width={14} height={14} color="#9CA3AF" />
          <InputBase
            placeholder="Search patient, ID, phone, status..."
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            inputProps={{ "aria-label": "Search refunds" }}
            sx={{
              fontSize: 12.5,
              flex: 1,
              "& input::placeholder": { color: "#9CA3AF", opacity: 1 },
            }}
          />
        </Box>

        {/* Advanced filters */}
        <Button
          variant="outlined"
          startIcon={<FilterIcon1 width={14} height={14} color={T.blue} />}
          sx={{
            textTransform: "none",
            fontSize: 13,
            fontWeight: 600,
            borderRadius: "30px",
            bgcolor: "#fff",
            color: "#000",
            borderColor: "#D1D5DB",
            px: 1.5,
            whiteSpace: "nowrap",
            "&:hover": { borderColor: T.blue, bgcolor: "#F4F8FF" },
          }}
        >
          Advanced filters
        </Button>
      </Stack>
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* New Table                                                            */
/* ------------------------------------------------------------------ */
function NewTable({ rows }) {
  const [selected, setSelected] = React.useState([]);
  const { sort, sortedRows, handleSort } = useSortedRows(rows, NEW_COLUMNS);

  const allSelected = sortedRows.length > 0 && sortedRows.every((r) => selected.includes(r.id));
  const someSelected = sortedRows.some((r) => selected.includes(r.id)) && !allSelected;

  const handleSelectAll = (e) =>
    setSelected(e.target.checked ? sortedRows.map((r) => r.id) : []);

  const handleSelect = (id) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  return (
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
            <TableCell
              padding="checkbox"
              sx={{ ...headCellSx, borderRight: `1px solid ${T.border}` }}
            >
              <Checkbox
                size="small"
                checked={allSelected}
                indeterminate={someSelected}
                onChange={handleSelectAll}
                sx={checkboxSx}
              />
            </TableCell>
            {NEW_COLUMNS.map((col) => (
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
          {sortedRows.length === 0 && (
            <EmptyRow colSpan={NEW_COLUMNS.length + 1} />
          )}
          {sortedRows.map((row) => (
            <TableRow
              key={row.id}
              hover
              sx={{ bgcolor: "#fff", "&:hover": { bgcolor: "#FAFBFE" } }}
            >
              <TableCell padding="checkbox" sx={{ ...cellSx, pl: 1 }}>
                <Checkbox
                  size="small"
                  checked={selected.includes(row.id)}
                  onChange={() => handleSelect(row.id)}
                  sx={checkboxSx}
                />
              </TableCell>
              <TableCell sx={{ ...cellSx, fontWeight: 600 }}>
                {row.patientName}
              </TableCell>
              <TableCell sx={cellSx}>{row.patientId}</TableCell>
              <TableCell sx={cellSx}>{row.dob}</TableCell>
              <TableCell sx={cellSx}>{row.refundId}</TableCell>
              <TableCell sx={cellSx}>{row.phone}</TableCell>
              <TableCell sx={{ ...cellSx, color: "#8A5B12", fontWeight: 500 }}>
                {row.refundAmount}
              </TableCell>
              <TableCell sx={cellSx}>{row.lastUpdated}</TableCell>
              <TableCell sx={cellSx}>{row.description}</TableCell>
              <TableCell sx={cellSx}>
                <StatusChip label={row.status} />
              </TableCell>
              <TableCell sx={cellSx}>{row.refundMode}</TableCell>
              <TableCell sx={{ ...cellSx, borderRight: "none" }}>
                <RowActions />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

/* ------------------------------------------------------------------ */
/* History Table                                                        */
/* ------------------------------------------------------------------ */
function HistoryTable({ rows }) {
  const [selected, setSelected] = React.useState([]);
  const { sort, sortedRows, handleSort } = useSortedRows(rows, HISTORY_COLUMNS);

  const allSelected = sortedRows.length > 0 && sortedRows.every((r) => selected.includes(r.id));
  const someSelected = sortedRows.some((r) => selected.includes(r.id)) && !allSelected;

  const handleSelectAll = (e) =>
    setSelected(e.target.checked ? sortedRows.map((r) => r.id) : []);

  const handleSelect = (id) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  return (
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
            <TableCell
              padding="checkbox"
              sx={{ ...headCellSx, borderRight: `1px solid ${T.border}` }}
            >
              <Checkbox
                size="small"
                checked={allSelected}
                indeterminate={someSelected}
                onChange={handleSelectAll}
                sx={checkboxSx}
              />
            </TableCell>
            {HISTORY_COLUMNS.map((col) => (
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
          {sortedRows.length === 0 && (
            <EmptyRow colSpan={HISTORY_COLUMNS.length + 1} />
          )}
          {sortedRows.map((row) => (
            <TableRow
              key={row.id}
              hover
              sx={{ bgcolor: "#fff", "&:hover": { bgcolor: "#FAFBFE" } }}
            >
              <TableCell padding="checkbox" sx={{ ...cellSx, pl: 1 }}>
                <Checkbox
                  size="small"
                  checked={selected.includes(row.id)}
                  onChange={() => handleSelect(row.id)}
                  sx={checkboxSx}
                />
              </TableCell>
              <TableCell sx={{ ...cellSx, fontWeight: 600 }}>
                {row.patientName}
              </TableCell>
              <TableCell sx={cellSx}>{row.patientId}</TableCell>
              <TableCell sx={cellSx}>{row.dob}</TableCell>
              <TableCell sx={cellSx}>{row.refundId}</TableCell>
              <TableCell sx={cellSx}>{row.phone}</TableCell>
              <TableCell sx={{ ...cellSx, color: "#8A5B12", fontWeight: 500 }}>
                {row.refundAmount}
              </TableCell>
              <TableCell sx={cellSx}>{row.lastUpdated}</TableCell>
              <TableCell sx={cellSx}>{row.description}</TableCell>
              <TableCell sx={cellSx}>
                <StatusChip label={row.status} />
              </TableCell>
              <TableCell sx={{ ...cellSx, borderRight: "none" }}>
                <RowActions />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

/* ------------------------------------------------------------------ */
/* Main Page                                                            */
/* ------------------------------------------------------------------ */
export default function RefundsNew() {
  const [activeTab, setActiveTab] = React.useState("new");
  const [query, setQuery] = React.useState("");
  const [showColumnSettings, setShowColumnSettings] = React.useState(false);

  const newRows = React.useMemo(() => filterRows(NEW_ROWS, query), [query]);
  const historyRows = React.useMemo(
    () => filterRows(HISTORY_ROWS, query),
    [query],
  );

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
      {/* ── PAGE HEADER ── */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
          mb: 2.5,
        }}
      >
        <Typography sx={{ fontSize: 22, fontWeight: 700, color: "#111827" }}>
          Refunds
        </Typography>

        <Stack direction="row" spacing={1.5}>
          <Button
            variant="outlined"
            sx={{
              textTransform: "none",
              fontSize: 13,
              fontWeight: 600,
              borderRadius: "8px",
              color: "#374151",
              borderColor: "#D1D5DB",
              bgcolor: "#fff",
              px: 2.5,
              "&:hover": { bgcolor: "#F9FAFB" },
            }}
          >
            Save as draft
          </Button>
          <Button
            variant="contained"
            disableElevation
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
            Generate statements
          </Button>
        </Stack>
      </Box>

      {/* ── TOOLBAR ── */}
      <Toolbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        counts={{ new: newRows.length, history: historyRows.length }}
        query={query}
        onQueryChange={setQuery}
        onOpenSettings={() => setShowColumnSettings(true)}
      />

      {/* ── TABLE — switches based on tab ── */}
      {activeTab === "new" ? (
        <NewTable rows={newRows} />
      ) : (
        <HistoryTable rows={historyRows} />
      )}

      {/* TODO: render your column-settings dialog here using
          showColumnSettings / setShowColumnSettings */}
    </Box>
  );
}