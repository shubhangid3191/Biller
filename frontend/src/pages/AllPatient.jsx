import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Typography, Checkbox, Button, IconButton, InputBase, Tooltip,
} from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import ClearIcon from "@mui/icons-material/Clear";

import {
  EyeRedIcon, EyeBlueIcon, RecordsIcon, OrdersIcon, MicIcon, NoteEditIcon,
  NoteEditRedIcon, MailSendIcon, MoreIcon, FilterIcon, ExportIcon, SearchGlassIcon,
} from "../assets/Assets";

/* ------------------------------------------------------------------ */
/* Design tokens                                                       */
/* ------------------------------------------------------------------ */

const T = {
  blue: "#2563EB",
  red: "#FF6B6B",
  redSoft: "#FFE9E9",
  title: "#1E293B",
  headText: "#1e293b",
  headSymbol: "#64748b",
  bodyText: "#475569",
  muted: "#64748B",
  nameText: "#2E2E2E",
  locationText: "#282C36",
  mrnText: "#282C36",
  dobText: "#535862",
  physicianText: "#128584",
  physicianBg: "#E8F8F5",
  border: "#BED3FC",
  rowLine: "#EEF1F7",
  headBg: "#ffffff",
  chipBg: "#DFF4EC",
  chipBorder: "#CBEBDF",
  chipText: "#2E8B6F",
  fieldBorder: "#D5DCE8",
  page: "#F7F9FC",
};

/* ------------------------------------------------------------------ */
/* Table columns                                                       */
/* adornment: "alpha" = A-Z / Z-A sort, "date" = date sort (icon fixed)  */
/* ------------------------------------------------------------------ */

const COLUMNS = [
  { id: "name", label: "Name, Age (Gender)", width: "22%" },
  { id: "location", label: "Location", width: "15%", adornment: "alpha" },
  { id: "mrn", label: "MRN\n(Patient ID)", width: "15%" },
  { id: "dob", label: "DOB", width: "15%", adornment: "date" },
  { id: "physician", label: "Physician", width: "16%", adornment: "alpha" },
  { id: "actions", label: "Actions", width: "17%", noWrap: true },
];

const ROW_ACTIONS = [
  { id: "records", title: "Patient record", Icon: RecordsIcon },
  { id: "orders", title: "Orders", Icon: OrdersIcon },
  { id: "dictate", title: "Dictate note", Icon: MicIcon },
  { id: "note", title: "Edit note", Icon: NoteEditIcon },
  { id: "message", title: "Send message", Icon: MailSendIcon },
];

/* ------------------------------------------------------------------ */
/* Dummy rows (varied so search / filters / sort can be seen working)  */
/* ------------------------------------------------------------------ */

const SAMPLE = [
  ["Lisha Cook 45y (F)", "GCH–IH", "719471345", "ID: NA", "11/20/2025", "Julia R"],
  ["Rahul Sharma 52y (M)", "GCH–OP", "719471346", "ID: 4521", "03/14/1973", "Amit K"],
  ["Priya Patel 34y (F)", "GCH–ICU", "719471347", "ID: NA", "07/02/1991", "Julia R"],
  ["John Miller 61y (M)", "GCH–IH", "719471348", "ID: 8810", "01/29/1964", "Sara L"],
  ["Anita Desai 28y (F)", "GCH–ER", "719471349", "ID: NA", "09/18/1997", "Amit K"],
  ["Mark Wilson 47y (M)", "GCH–OP", "719471350", "ID: 3307", "05/06/1978", "Sara L"],
  ["Sneha Kulkarni 39y (F)", "GCH–ICU", "719471351", "ID: NA", "12/11/1986", "Julia R"],
  ["David Brown 70y (M)", "GCH–IH", "719471352", "ID: 9942", "08/23/1955", "Amit K"],
  ["Meera Nair 55y (F)", "GCH–ER", "719471353", "ID: NA", "02/17/1970", "Sara L"],
  ["Kevin Zhang 30y (M)", "GCH–OP", "719471354", "ID: 1180", "10/09/1995", "Julia R"],
  ["Fatima Khan 42y (F)", "GCH–IH", "719471355", "ID: NA", "04/25/1983", "Amit K"],
  ["Robert King 66y (M)", "GCH–ICU", "719471356", "ID: 7754", "06/30/1959", "Sara L"],
  ["Kobert King 66y (M)", "BCH–ICU", "719471356", "ID: 7754", "06/30/1959", "Sara L"],
  ["Kobert King 66y (M)", "GCH–ICU", "719471356", "ID: 7754", "06/30/1959", "Bara L"],
];

const createRows = () =>
  SAMPLE.map(([name, location, mrn, patientId, dob, physician], i) => ({
    id: i, name, location, mrn, patientId, dob, physician, alert: i === 0,
  }));

const toTime = (s) => {
  const t = new Date(s).getTime();
  return Number.isNaN(t) ? 0 : t;
};

/* ------------------------------------------------------------------ */
/* Search Field                                                        */
/* ------------------------------------------------------------------ */

function SearchField({ value, onChange }) {
  return (
    <Box
      sx={{
        display: "flex", alignItems: "center", gap: 1, height: 36, width: "100%",
        minWidth: 0, px: 1.5, bgcolor: "#fff", border: `1px solid ${T.fieldBorder}`,
        borderRadius: "8px", boxSizing: "border-box", transition: "border-color .15s ease",
        "&:focus-within": { borderColor: T.blue },
      }}
    >
      <SearchGlassIcon />
      <InputBase
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search patients by name or MRN..."
        inputProps={{ "aria-label": "Search patients by name or MRN" }}
        sx={{
          flex: 1, minWidth: 0, fontSize: 13.5, color: "#171923",
          "& input": { minWidth: 0 },
          "& input::placeholder": { color: "#171923", opacity: 1 },
        }}
      />
      {value && (
        <IconButton size="small" aria-label="Clear search" onClick={() => onChange("")} sx={{ p: 0.3 }}>
          <ClearIcon sx={{ fontSize: 16, color: T.muted }} />
        </IconButton>
      )}
    </Box>
  );
}

const outlinedActionSx = {
  height: 36, px: 1.5, gap: 0.6, borderRadius: "8px", textTransform: "none",
  fontSize: 13.5, fontWeight: 500, color: T.blue, border: "1.5px solid #015DFF",
  bgcolor: "#fff", whiteSpace: "nowrap", flexShrink: 0,
  "&:hover": { borderColor: "#015DFF", bgcolor: "#F4F8FF" },
  "& .MuiButton-startIcon": { mr: 0, ml: 0 },
};

/* ------------------------------------------------------------------ */
/* Toolbar                                                             */
/* ------------------------------------------------------------------ */

function Toolbar({ query, onQueryChange, onAddNewPatient }) {
  return (
    <Box
      sx={{
        width: "100%", display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "auto minmax(220px, 1fr)",
          md: "auto minmax(240px, 1fr) auto",
        },
        alignItems: "center",
        columnGap: { xs: 1.5, sm: 2, md: 4 },
        rowGap: 1.5, pb: 2, boxSizing: "border-box",
      }}
    >
      <Typography sx={{ fontSize: 20, fontWeight: 700, color: "#171923", letterSpacing: "-0.2px", whiteSpace: "nowrap", lineHeight: 1 }}>
        All Patients
      </Typography>

      <Box
        sx={{
          width: "100%", minWidth: 0,
          gridColumn: { xs: "1 / -1", sm: "2 / 3", md: "2 / 3" },
          gridRow: { xs: 2, sm: 1, md: 1 },
        }}
      >
        <SearchField value={query} onChange={onQueryChange} />
      </Box>

      <Stack
        direction="row" alignItems="center" spacing={1}
        sx={{
          minWidth: 0, flexShrink: 0,
          gridColumn: { xs: "1 / -1", sm: "1 / -1", md: "3 / 4" },
          gridRow: { xs: 3, sm: 2, md: 1 },
          justifyContent: { xs: "flex-start", sm: "flex-end", md: "flex-end" },
          flexWrap: { xs: "wrap", sm: "nowrap", md: "nowrap" },
          rowGap: 1,
        }}
      >
        <Button variant="outlined" startIcon={<FilterIcon />} sx={outlinedActionSx}>Filter</Button>
        <Button variant="outlined" startIcon={<ExportIcon />} sx={outlinedActionSx}>Export</Button>
        <Button
          variant="contained" disableElevation onClick={onAddNewPatient}
          sx={{
            height: 36, px: 2.25, borderRadius: "8px", textTransform: "none",
            fontSize: 14, fontWeight: 500, bgcolor: T.blue, whiteSpace: "nowrap",
            flexShrink: 0, "&:hover": { bgcolor: "#1D4ED8" },
          }}
        >
          Add New Patient
        </Button>
      </Stack>
    </Box>
  );
}

const cellSx = {
  borderBottom: `1px solid ${T.rowLine}`,
  py: 1.05, px: 1, fontSize: 12.5, color: T.bodyText, boxSizing: "border-box",
};

/* ------------------------------------------------------------------ */
/* Header Cell (arrow opens filter menu / toggles sort)                */
/* ------------------------------------------------------------------ */

function HeaderCell({ column, isLast, sortDir, onSort }) {
  const active = !!sortDir;

  const symbolBtnSx = {
    p: 0.2, ml: "auto", flexShrink: 0, borderRadius: "6px",
    color: active ? T.blue : T.headSymbol,
    bgcolor: active ? "#DCE7FD" : "transparent",
    "&:hover": { bgcolor: "#DCE7FD" },
  };

  return (
    <TableCell
      sx={{
        ...cellSx, width: column.width, py: 1.3, bgcolor: T.headBg,
        borderRight: isLast ? "none" : `1px solid ${T.border}`,
        borderBottom: "none", fontSize: 14, fontWeight: 700, color: T.headText,
        whiteSpace: column.noWrap ? "nowrap" : "pre-line", lineHeight: 1.25,
        boxSizing: "border-box", overflow: "hidden",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 0.8, minWidth: 0, width: "100%" }}>
        <Box component="span" sx={{ overflow: "hidden", textOverflow: "ellipsis", minWidth: 0, whiteSpace: column.noWrap ? "nowrap" : "pre-line" }}>
          {column.label}
        </Box>

        {/* Location / Physician: A-Z on first click, then toggles Z-A <-> A-Z */}
        {column.adornment === "alpha" && (
          <Tooltip title={sortDir === "asc" ? "Sorted A–Z" : sortDir === "desc" ? "Sorted Z–A" : "Sort A–Z"} arrow>
            <IconButton
              size="small"
              aria-label={`Sort ${column.label} alphabetically`}
              onClick={() => onSort(column.id)}
              sx={symbolBtnSx}
            >
              <KeyboardArrowDownIcon
                sx={{
                  fontSize: 18,
                  transform: sortDir === "desc" ? "rotate(180deg)" : "none",
                  transition: "transform .15s ease",
                }}
              />
            </IconButton>
          </Tooltip>
        )}

        {/* DOB: original arrow icon, never changes */}
        {column.adornment === "date" && (
          <IconButton
            size="small"
            aria-label="Sort by DOB"
            onClick={() => onSort(column.id)}
            sx={{ ...symbolBtnSx, color: T.headSymbol, bgcolor: "transparent" }}
          >
            <UnfoldMoreIcon sx={{ fontSize: 18 }} />
          </IconButton>
        )}
      </Box>
    </TableCell>
  );
}

function PhysicianChip({ label }) {
  return (
    <Box
      sx={{
        display: "block", width: "100%", bgcolor: T.physicianBg,
        border: `1px solid ${T.physicianBg}`, borderRadius: "4px", px: 0.8, py: 0.35,
        fontSize: 12, fontWeight: 700, color: T.physicianText, boxSizing: "border-box",
        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
      }}
    >
      {label}
    </Box>
  );
}

const iconButtonSx = {
  p: 0.35, width: 27, height: 27, minWidth: 27, flexShrink: 0, borderRadius: "50%",
  "&:hover": { bgcolor: "#EDF3FE" },
};

function ViewAction({ alert }) {
  return (
    <Tooltip title="View chart" arrow>
      <IconButton
        aria-label="View chart"
        sx={{
          ...iconButtonSx,
          width: alert ? 29 : 27, height: alert ? 29 : 27, minWidth: alert ? 29 : 27,
          bgcolor: alert ? T.redSoft : "transparent",
          "&:hover": { bgcolor: alert ? "#FFDCDC" : "#EDF3FE" },
        }}
      >
        {alert ? <EyeRedIcon /> : <EyeBlueIcon />}
      </IconButton>
    </Tooltip>
  );
}

function RowActions({ alert }) {
  return (
    <Stack
      direction="row" alignItems="center" justifyContent="flex-end" spacing={0.7}
      sx={{ width: "100%", minWidth: 0, whiteSpace: "nowrap", boxSizing: "border-box", overflow: "hidden" }}
    >
      <ViewAction alert={alert} />

      {ROW_ACTIONS.map(({ id, title, Icon }) => {
        const useRedNote = alert && id === "note";
        const ActiveIcon = useRedNote ? NoteEditRedIcon : Icon;
        return (
          <Tooltip key={id} title={title} arrow>
            <IconButton
              aria-label={title}
              sx={{
                ...iconButtonSx,
                ...(useRedNote && {
                  width: 29, height: 29, minWidth: 29, bgcolor: T.redSoft,
                  "&:hover": { bgcolor: "#FFDCDC" },
                }),
              }}
            >
              <ActiveIcon />
            </IconButton>
          </Tooltip>
        );
      })}

      <Tooltip title="More options" arrow>
        <IconButton aria-label="More options" sx={iconButtonSx}>
          <MoreIcon />
        </IconButton>
      </Tooltip>
    </Stack>
  );
}

const checkboxSx = {
  p: 0, color: "#C3CBD9",
  "&.Mui-checked": { color: T.blue },
  "& .MuiSvgIcon-root": { fontSize: 18 },
};

/* ------------------------------------------------------------------ */
/* Patient Row                                                         */
/* ------------------------------------------------------------------ */

function PatientRow({ row, selected, onToggle }) {
  return (
    <TableRow hover sx={{ "&:hover": { bgcolor: "#FAFBFE" } }}>
      <TableCell
        padding="checkbox"
        sx={{ ...cellSx, width: "4%", minWidth: 38, maxWidth: 42, pl: 0.4, pr: 0.2, textAlign: "center", boxSizing: "border-box" }}
      >
        <Checkbox
          checked={selected}
          onChange={() => onToggle(row.id)}
          inputProps={{ "aria-label": `Select ${row.name}` }}
          sx={checkboxSx}
        />
      </TableCell>

      <TableCell sx={{ ...cellSx, width: "22%", color: T.nameText, fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {row.name}
      </TableCell>

      <TableCell sx={{ ...cellSx, width: "10%", color: T.locationText, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {row.location}
      </TableCell>

      <TableCell sx={{ ...cellSx, width: "12%", color: T.mrnText, overflow: "hidden", whiteSpace: "nowrap" }}>
        <Box sx={{ lineHeight: 1.35, overflow: "hidden", textOverflow: "ellipsis" }}>{row.mrn}</Box>
        <Box sx={{ lineHeight: 1.35, color: T.mrnText, overflow: "hidden", textOverflow: "ellipsis" }}>{row.patientId}</Box>
      </TableCell>

      <TableCell sx={{ ...cellSx, width: "10%", color: T.dobText, whiteSpace: "nowrap" }}>
        {row.dob}
      </TableCell>

      <TableCell sx={{ ...cellSx, width: "12%", overflow: "hidden" }}>
        <PhysicianChip label={row.physician} />
      </TableCell>

      <TableCell
        sx={{ ...cellSx, width: "30%", whiteSpace: "nowrap", pl: 0.5, pr: 1, overflow: "hidden", borderRight: "none", boxSizing: "border-box" }}
      >
        <RowActions alert={row.alert} />
      </TableCell>
    </TableRow>
  );
}

/* ------------------------------------------------------------------ */
/* Patients Table                                                      */
/* ------------------------------------------------------------------ */

function PatientsTable({
  rows, selected, onToggleRow, onToggleAll, sort, onSort,
}) {
  const allSelected = rows.length > 0 && rows.every((r) => selected.includes(r.id));
  const someSelected = rows.some((r) => selected.includes(r.id)) && !allSelected;

  return (
    <>
      <TableContainer
        sx={{
          width: "100%", maxWidth: "100%", border: `1px solid ${T.border}`,
          borderRadius: "8px", bgcolor: "#fff", overflowX: "auto", overflowY: "hidden",
          boxSizing: "border-box",
        }}
      >
        <Table
          sx={{
            width: "100%", minWidth: 0, tableLayout: "auto", borderCollapse: "collapse",
            boxSizing: "border-box", "& th, & td": { boxSizing: "border-box" },
          }}
          size="small"
          aria-label="All patients"
        >
          <TableHead>
            <TableRow>
              <TableCell
                padding="checkbox"
                sx={{
                  ...cellSx, width: "4%", minWidth: 38, maxWidth: 42, pl: 0.4, pr: 0.2,
                  bgcolor: T.headBg, borderRight: `1px solid ${T.border}`, borderBottom: "none",
                  textAlign: "center", boxSizing: "border-box",
                }}
              >
                <Checkbox
                  checked={allSelected}
                  indeterminate={someSelected}
                  onChange={onToggleAll}
                  inputProps={{ "aria-label": "Select all patients" }}
                  sx={checkboxSx}
                />
              </TableCell>

              {COLUMNS.map((column, index) => (
                <HeaderCell
                  key={column.id}
                  column={column}
                  isLast={index === COLUMNS.length - 1}
                  sortDir={sort.columnId === column.id ? sort.dir : null}
                  onSort={onSort}
                />
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={COLUMNS.length + 1} sx={{ ...cellSx, textAlign: "center", py: 4, color: T.muted, fontSize: 14 }}>
                  No patients match your search or filters.
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <PatientRow
                  key={row.id}
                  row={row}
                  selected={selected.includes(row.id)}
                  onToggle={onToggleRow}
                />
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

    </>
  );
}

/* ------------------------------------------------------------------ */
/* Main Page                                                           */
/* ------------------------------------------------------------------ */

export default function AllPatients() {
  const navigate = useNavigate();

  const [query, setQuery] = React.useState("");
  const [selected, setSelected] = React.useState([]);
  const [sort, setSort] = React.useState({ columnId: null, dir: null });

  const rows = React.useMemo(() => createRows(), []);

  /* Search + alphabetical / date sort */
  const visibleRows = React.useMemo(() => {
    const q = query.trim().toLowerCase();

    let result = rows.filter(
      (r) => !q || r.name.toLowerCase().includes(q) || r.mrn.includes(q)
    );

    if (sort.columnId && sort.dir) {
      const factor = sort.dir === "asc" ? 1 : -1;
      const { columnId } = sort;
      result = [...result].sort((a, b) =>
        columnId === "dob"
          ? (toTime(a.dob) - toTime(b.dob)) * factor
          : a[columnId].localeCompare(b[columnId], undefined, { sensitivity: "base" }) * factor
      );
    }
    return result;
  }, [rows, query, sort]);

  /* all sortable columns (alpha + DOB): asc <-> desc only, no reset to original order */
  const handleSort = (columnId) =>
    setSort((prev) => {
      if (prev.columnId !== columnId || !prev.dir) return { columnId, dir: "asc" };
      return { columnId, dir: prev.dir === "asc" ? "desc" : "asc" };
    });

  const toggleRow = (id) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const toggleAll = (event) =>
    setSelected(event.target.checked ? visibleRows.map((r) => r.id) : []);

  const handleAddNewPatient = () => navigate("/add-new-patient");

  return (
    <Box
      sx={{
        bgcolor: T.page, minHeight: "100vh", width: "100%",
        py: { xs: 1.5, sm: 2, md: 2 },
        px: { xs: 1, sm: 1.5, md: 2, lg: 2.5, xl: 2.5 },
        overflowX: "hidden", boxSizing: "border-box",
      }}
    >
      <Paper elevation={0} sx={{ width: "100%", maxWidth: "none", mx: 0, bgcolor: "transparent" }}>
        <Box sx={{ width: "100%", maxWidth: "100%", boxSizing: "border-box" }}>
          <Toolbar query={query} onQueryChange={setQuery} onAddNewPatient={handleAddNewPatient} />

          <Box sx={{ width: "100%", maxWidth: "100%", pb: 3, boxSizing: "border-box" }}>
            <PatientsTable
              rows={visibleRows}
              selected={selected}
              onToggleRow={toggleRow}
              onToggleAll={toggleAll}
              sort={sort}
              onSort={handleSort}
            />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}