import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  DOSCalendarIcon,
} from "../assets/Assets";

/* ------------------------------------------------------------------ */
/* Design tokens                                                       */
/* ------------------------------------------------------------------ */
const T = {
  blue: "#006FFD",
  title: "#1E293B",
  headBg: "#EBF1FE",
  headText: "#1e293b",
  headSymbol: "#64748b",
  muted: "#64748B",
  border: "#BED3FC",
  rowLine: "#EEF1F7",
  bodyText: "#475569",
  physicianText: "#128584",
  physicianBg: "#E8F8F5",
  page: "#F7F9FC",
  rowSelected: "#F2F7FF",
  rowSelectedHover: "#E8F1FF",
  rowHover: "#FAFBFE",
};

/* ------------------------------------------------------------------ */
/* Table columns                                                       */
/* adornment: "alpha" = A-Z / Z-A sort, "date" = date sort             */
/* stickyLeft: column stays visible while scrolling sideways (mobile)  */
/* ------------------------------------------------------------------ */
const CHECK_W = 48; // width of the checkbox column

const COLUMNS = [
  { id: "roomBed", label: "Room/Bed", stickyLeft: CHECK_W },
  { id: "name", label: "Name\nAge (Gender)" },
  { id: "mrn", label: "MRN\n(Patient ID)" },
  { id: "dob", label: "DOB", adornment: "date" },
  { id: "location", label: "Location" },
  { id: "physician", label: "Physician", adornment: "alpha", width: 140 },
  { id: "residents", label: "Residents", adornment: "alpha", width: 140 },
];

const SORT_TITLES = {
  alpha: { asc: "Sorted A–Z", desc: "Sorted Z–A", none: "Sort A–Z" },
  date: {
    asc: "Sorted Oldest First",
    desc: "Sorted Newest First",
    none: "Sort Oldest First",
  },
};

/* ------------------------------------------------------------------ */
/* Dummy rows                                                          */
/* dosOffset: days relative to Jan 26 (-1 = Jan 25, 0 = Jan 26, 1 = Jan 27) */
/* ------------------------------------------------------------------ */
const SAMPLE = [
  ["302 - Bed A", "Lisha Cook", "45y (F)", "719471345", "ID: NA", "11/20/2025", "GCH -IP", "Alex Tobar", "Julia R", 0],
  ["302 - Bed B", "Rahul Sharma", "52y (M)", "719471346", "ID: 4521", "03/14/1973", "GCH -IP", "Neha Rao", "Amit K", 0],
  ["303 - Bed A", "Priya Patel", "34y (F)", "719471347", "ID: NA", "07/02/1991", "GCH -ICU", "Alex Tobar", "Sara L", 0],
  ["303 - Bed B", "John Miller", "61y (M)", "719471348", "ID: 8810", "01/29/1964", "GCH -ER", "David Chen", "Julia R", 0],
  ["304 - Bed A", "Anita Desai", "28y (F)", "719471349", "ID: NA", "09/18/1997", "GCH -IP", "Neha Rao", "Amit K", 0],
  ["304 - Bed B", "Mark Wilson", "47y (M)", "719471350", "ID: 3307", "05/06/1978", "GCH -OP", "Carla Mendes", "Sara L", 0],
  ["305 - Bed A", "Sneha Kulkarni", "39y (F)", "719471351", "ID: NA", "12/11/1986", "GCH -ICU", "David Chen", "Julia R", 0],
  ["305 - Bed B", "David Brown", "70y (M)", "719471352", "ID: 9942", "08/23/1955", "GCH -IP", "Alex Tobar", "Amit K", 0],
  ["306 - Bed A", "Meera Nair", "55y (F)", "719471353", "ID: NA", "02/17/1970", "GCH -ER", "Carla Mendes", "Sara L", 0],
  ["306 - Bed B", "Kevin Zhang", "30y (M)", "719471354", "ID: 1180", "10/09/1995", "GCH -OP", "Neha Rao", "Julia R", 0],
  ["307 - Bed A", "Fatima Khan", "42y (F)", "719471355", "ID: NA", "04/25/1983", "GCH -IP", "David Chen", "Amit K", 0],
  ["307 - Bed B", "Robert King", "66y (M)", "719471356", "ID: 7754", "06/30/1959", "GCH -ICU", "Carla Mendes", "Sara L", 0],
  ["201 - Bed A", "Nisha Verma", "36y (F)", "719471357", "ID: 2201", "02/09/1989", "GCH -IP", "Alex Tobar", "Julia R", -1],
  ["201 - Bed B", "Omar Ali", "58y (M)", "719471358", "ID: NA", "10/30/1967", "GCH -ER", "Neha Rao", "Sara L", -1],
  ["202 - Bed A", "Grace Lee", "49y (F)", "719471359", "ID: 6612", "08/14/1976", "GCH -ICU", "David Chen", "Amit K", -1],
  ["401 - Bed A", "Vikram Joshi", "63y (M)", "719471360", "ID: NA", "05/21/1962", "GCH -IP", "Carla Mendes", "Julia R", 1],
  ["401 - Bed B", "Emma Clark", "27y (F)", "719471361", "ID: 9034", "01/05/1998", "GCH -OP", "Alex Tobar", "Sara L", 1],
];

const BASE_DATE = new Date(2025, 0, 26); // Jan 26

// Route of the "Add New Patient" page — change this to match your router
const ADD_NEW_PATIENT_ROUTE = "/add-new-patient";

const createRows = () =>
  SAMPLE.map(
    (
      [roomBed, name, age, mrn, patientId, dob, location, physician, residents, dosOffset],
      i,
    ) => ({
      id: i,
      roomBed,
      name,
      age,
      mrn,
      patientId,
      dob,
      location,
      physician,
      residents,
      dos: new Date(2025, 0, 26 + dosOffset),
    }),
  );

const toTime = (s) => {
  const t = new Date(s).getTime();
  return Number.isNaN(t) ? 0 : t;
};

const isSameDay = (a, b) => a.toDateString() === b.toDateString();

/* ------------------------------------------------------------------ */
/* Shared cell style                                                   */
/* ------------------------------------------------------------------ */
// two-line headers ("Name / Age (Gender)") need a taller header row
const HEAD_H = 56;

const cellSx = {
  borderBottom: `1px solid ${T.rowLine}`,
  py: 1.1,
  px: 1.2,
  fontSize: 12,
  color: "#2E2E2E",
  boxSizing: "border-box",
  textAlign: "center",
};

// Sticky-left helper (used by checkbox + Room/Bed columns)
const stickyLeftSx = (left, zIndex) => ({
  position: "sticky",
  left,
  zIndex,
});

// soft edge on the last sticky column, only visible on small screens
const stickyEdgeSx = {
  boxShadow: { xs: "2px 0 4px -2px rgba(15, 23, 42, 0.18)", md: "none" },
};

/* ------------------------------------------------------------------ */
/* Checkbox                                                            */
/* ------------------------------------------------------------------ */
function RowCheckbox({ checked, indeterminate = false, onChange, label }) {
  return (
    <Checkbox
      size="small"
      checked={checked}
      indeterminate={indeterminate}
      onChange={onChange}
      inputProps={{ "aria-label": label }}
      sx={{
        p: 0.5,
        color: "#9AA5B8",
        "&.Mui-checked, &.MuiCheckbox-indeterminate": { color: T.blue },
        "& .MuiSvgIcon-root": { fontSize: 20 },
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Physician / Residents chip                                          */
/* ------------------------------------------------------------------ */
function Chip({ label }) {
  return (
    <Box
      sx={{
        display: "block",
        width: "100%",
        bgcolor: T.physicianBg,
        borderRadius: "4px",
        px: 1,
        py: 0.45,
        fontSize: 12,
        fontWeight: 700,
        color: T.physicianText,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        boxSizing: "border-box",
        textAlign: "center",
      }}
    >
      {label}
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* Header cell (arrow toggles sort)                                    */
/* ------------------------------------------------------------------ */
function HeaderCell({ column, isLast, sortDir, onSort }) {
  const active = !!sortDir;
  const sortType = column.adornment; // "alpha" | "date" | undefined
  const titles = sortType ? SORT_TITLES[sortType] : null;
  const isSticky = column.stickyLeft !== undefined;

  return (
    <TableCell
      sx={{
        ...cellSx,
        height: HEAD_H,
        bgcolor: T.headBg,
        fontWeight: 700,
        fontSize: 13,
        color: T.headText,
        borderBottom: `1px solid ${T.border}`,
        borderRight: isLast ? "none" : `1px solid ${T.border}`,
        whiteSpace: "pre-line",
        lineHeight: 1.3,
        textAlign: "center",
        ...(column.width && { width: column.width, minWidth: column.width }),
        ...(isSticky && { ...stickyLeftSx(column.stickyLeft, 4), ...stickyEdgeSx }),
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 0.5,
        }}
      >
        <Box component="span" sx={{ whiteSpace: "pre-line" }}>
          {column.label}
        </Box>

        {sortType && (
          <Tooltip title={titles[sortDir || "none"]} arrow>
            <IconButton
              size="small"
              aria-label={`Sort ${column.label.replace("\n", " ")}`}
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
              {/* DOB shows the up/down icon until it is actually sorted */}
              {sortType === "date" && !active ? (
                <UnfoldMoreIcon sx={{ fontSize: 18 }} />
              ) : (
                <KeyboardArrowDownIcon
                  sx={{
                    fontSize: 18,
                    transform: sortDir === "desc" ? "rotate(180deg)" : "none",
                    transition: "transform .15s ease",
                  }}
                />
              )}
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </TableCell>
  );
}

/* ------------------------------------------------------------------ */
/* DOS Date Navigator                                                  */
/* ------------------------------------------------------------------ */
function DOSNavigator({ date, onPrev, onNext }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 0.5,
        bgcolor: "#fff",
        borderRadius: "8px",
        px: 1,
        py: 0.5,
        height: 38,
        boxSizing: "border-box",
      }}
    >
      <Tooltip title="Previous Date" arrow>
        <IconButton
          size="small"
          onClick={onPrev}
          aria-label="Previous date"
          sx={{
            p: 0.3,
            borderRadius: "4px",
            "&:hover": { bgcolor: "#EBF1FE" },
          }}
        >
          <ChevronLeftIcon />
        </IconButton>
      </Tooltip>

      <Box sx={{ display: "flex", alignItems: "center", gap: 0.6, px: 0.4 }}>
        <DOSCalendarIcon />
        <Typography
          sx={{
            fontSize: 12,
            fontWeight: 500,
            color: "#8E8E93",
            whiteSpace: "nowrap",
          }}
        >
          DOS: {date}
        </Typography>
      </Box>

      <Tooltip title="Next Date" arrow>
        <IconButton
          size="small"
          onClick={onNext}
          aria-label="Next date"
          sx={{
            p: 0.3,
            borderRadius: "4px",
            "&:hover": { bgcolor: "#EBF1FE" },
          }}
        >
          <ChevronRightIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* Main Page                                                           */
/* ------------------------------------------------------------------ */
export default function ConfirmPatientList() {
  const navigate = useNavigate();

  /* DOS date state */
  const [dosDate, setDosDate] = React.useState(BASE_DATE); // Jan 26
  const [sort, setSort] = React.useState({ columnId: null, dir: null });
  const [selected, setSelected] = React.useState(() => new Set()); // selected row ids

  const rows = React.useMemo(() => createRows(), []);

  const formatDOS = (d) => {
    const month = d.toLocaleString("en-US", { month: "short" });
    return `${month} ${d.getDate()}`;
  };

  const handlePrevDay = () => {
    setDosDate((prev) => {
      const d = new Date(prev);
      d.setDate(d.getDate() - 1);
      return d;
    });
  };

  const handleNextDay = () => {
    setDosDate((prev) => {
      const d = new Date(prev);
      d.setDate(d.getDate() + 1);
      return d;
    });
  };

  /* DOS filter + alphabetical / date sort */
  const visibleRows = React.useMemo(() => {
    let result = rows.filter((r) => isSameDay(r.dos, dosDate));

    if (sort.columnId && sort.dir) {
      const factor = sort.dir === "asc" ? 1 : -1;
      const { columnId } = sort;
      result = [...result].sort((a, b) =>
        columnId === "dob"
          ? (toTime(a.dob) - toTime(b.dob)) * factor
          : a[columnId].localeCompare(b[columnId], undefined, {
              sensitivity: "base",
            }) * factor,
      );
    }
    return result;
  }, [rows, dosDate, sort]);

  /* all sortable columns (alpha + DOB): asc <-> desc only */
  const handleSort = (columnId) =>
    setSort((prev) => {
      if (prev.columnId !== columnId || !prev.dir)
        return { columnId, dir: "asc" };
      return { columnId, dir: prev.dir === "asc" ? "desc" : "asc" };
    });

  /* ---- selection ---- */
  const selectedVisibleCount = visibleRows.filter((r) =>
    selected.has(r.id),
  ).length;
  const allVisibleSelected =
    visibleRows.length > 0 && selectedVisibleCount === visibleRows.length;
  const someVisibleSelected =
    selectedVisibleCount > 0 && !allVisibleSelected;

  const toggleRow = (id) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  // select-all only touches the rows of the date currently shown
  const toggleAllVisible = () =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (allVisibleSelected) visibleRows.forEach((r) => next.delete(r.id));
      else visibleRows.forEach((r) => next.add(r.id));
      return next;
    });

  // Go to the Add New Patient page and pass the selected patients along
  const handleAddPatients = () => {
    const selectedPatients = rows.filter((r) => selected.has(r.id));
    navigate("/add-new-patient", { state: { patients: selectedPatients } });
  };

  return (
    <Box
      sx={{
        bgcolor: T.page,
        // page scrollbar removed: fixed height, only the table scrolls
        // (if your layout has a top bar, use e.g. "calc(100vh - 64px)")
        height: "100%",
        maxHeight: "100vh",
        "@supports (height: 100dvh)": { maxHeight: "100dvh" }, // mobile browser bars
        width: "100%",
        minWidth: 0, // stops the 880px table from stretching the whole page
        maxWidth: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        py: { xs: 2, md: 3 },
        px: { xs: 1.5, sm: 2, md: 2.5, lg: 2.5 },
        boxSizing: "border-box",
      }}
    >
      {/* ---- HEADER (fixed) ---- */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          flexShrink: 0,
          columnGap: 2,
          rowGap: 1.25,
          mb: { xs: 2, md: 2.5 },
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: 18, sm: 20 },
            fontWeight: 700,
            color: T.title,
            letterSpacing: "-0.2px",
          }}
        >
          Confirm Patient List
        </Typography>

        <DOSNavigator
          date={formatDOS(dosDate)}
          onPrev={handlePrevDay}
          onNext={handleNextDay}
        />
      </Box>

      {/* ---- TABLE (only this area scrolls, header row stays sticky) ---- */}
      <TableContainer
        sx={{
          flex: "0 1 auto",
          minHeight: 0,
          minWidth: 0,
          maxWidth: "100%",
          overflow: "auto",
          width: "100%",
          border: `1px solid ${T.border}`,
          borderRadius: "8px",
          WebkitOverflowScrolling: "touch",
          // top HEAD_H px header color, below it white,
          // so the scrollbar gap beside the header isn't blank white
          background: `linear-gradient(to bottom, ${T.headBg} ${HEAD_H}px, #fff ${HEAD_H}px)`,
          "&::-webkit-scrollbar": { height: 6, width: 6 },
          // vertical scrollbar starts below the header
          "&::-webkit-scrollbar-track:vertical": {
            background: "#F1F1F1",
            borderRadius: "10px",
            marginTop: `${HEAD_H}px`,
          },
          "&::-webkit-scrollbar-track:horizontal": {
            background: "#F1F1F1",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#C1C7CD",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb:hover": { background: "#A0AAB4" },
        }}
      >
        <Table
          stickyHeader
          size="small"
          sx={{
            tableLayout: "auto",
            // on small screens the table keeps this width and scrolls sideways
            minWidth: 880,
            // "separate" keeps borders visible on the sticky header while scrolling
            borderCollapse: "separate",
            borderSpacing: 0,
            "& th, & td": { boxSizing: "border-box" },
            "& .MuiTableCell-stickyHeader": {
              backgroundColor: `${T.headBg} !important`,
            },
          }}
          aria-label="Confirm patient list"
        >
          <TableHead>
            <TableRow>
              {/* Select-all checkbox */}
              <TableCell
                sx={{
                  ...cellSx,
                  ...stickyLeftSx(0, 4),
                  height: HEAD_H,
                  width: CHECK_W,
                  minWidth: CHECK_W,
                  maxWidth: CHECK_W,
                  px: 0,
                  bgcolor: T.headBg,
                  borderBottom: `1px solid ${T.border}`,
                  borderRight: `1px solid ${T.border}`,
                }}
              >
                <RowCheckbox
                  checked={allVisibleSelected}
                  indeterminate={someVisibleSelected}
                  onChange={toggleAllVisible}
                  label="Select all patients"
                />
              </TableCell>

              {COLUMNS.map((column, index) => (
                <HeaderCell
                  key={column.id}
                  column={column}
                  isLast={index === COLUMNS.length - 1}
                  sortDir={sort.columnId === column.id ? sort.dir : null}
                  onSort={handleSort}
                />
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {visibleRows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={COLUMNS.length + 1}
                  sx={{ ...cellSx, py: 4, color: T.muted, fontSize: 13 }}
                >
                  No Patients Found For This Date
                </TableCell>
              </TableRow>
            ) : (
              visibleRows.map((row) => {
                const isSelected = selected.has(row.id);
                const rowBg = isSelected ? T.rowSelected : "#fff";

                return (
                  <TableRow
                    key={row.id}
                    selected={isSelected}
                    sx={{
                      // MUI's own selected/hover tint is replaced by ours so the
                      // sticky cells (which need a solid color) match the row
                      "&.Mui-selected, &.Mui-selected:hover": {
                        bgcolor: "transparent",
                      },
                      "&:hover > .MuiTableCell-root": {
                        bgcolor: isSelected ? T.rowSelectedHover : T.rowHover,
                      },
                    }}
                  >
                    {/* Checkbox */}
                    <TableCell
                      sx={{
                        ...cellSx,
                        ...stickyLeftSx(0, 1),
                        width: CHECK_W,
                        minWidth: CHECK_W,
                        maxWidth: CHECK_W,
                        px: 0,
                        bgcolor: rowBg,
                      }}
                    >
                      <RowCheckbox
                        checked={isSelected}
                        onChange={() => toggleRow(row.id)}
                        label={`Select ${row.name}`}
                      />
                    </TableCell>

                    {/* Room/Bed (sticky on small screens) */}
                    <TableCell
                      sx={{
                        ...cellSx,
                        ...stickyLeftSx(CHECK_W, 1),
                        ...stickyEdgeSx,
                        whiteSpace: "nowrap",
                        bgcolor: rowBg,
                      }}
                    >
                      {row.roomBed}
                    </TableCell>

                    {/* Name + Age */}
                    <TableCell sx={{ ...cellSx, bgcolor: rowBg }}>
                      <Box sx={{ fontWeight: 700, color: "#2E2E2E" }}>
                        {row.name}
                      </Box>
                      <Box sx={{ fontWeight: 700, color: "#2E2E2E" }}>
                        {row.age}
                      </Box>
                    </TableCell>

                    {/* MRN */}
                    <TableCell sx={{ ...cellSx, bgcolor: rowBg }}>
                      <Box>{row.mrn}</Box>
                      <Box>{row.patientId}</Box>
                    </TableCell>

                    {/* DOB */}
                    <TableCell
                      sx={{
                        ...cellSx,
                        whiteSpace: "nowrap",
                        color: "#535862",
                        bgcolor: rowBg,
                      }}
                    >
                      {row.dob}
                    </TableCell>

                    {/* Location */}
                    <TableCell
                      sx={{
                        ...cellSx,
                        whiteSpace: "nowrap",
                        fontWeight: 700,
                        bgcolor: rowBg,
                      }}
                    >
                      {row.location}
                    </TableCell>

                    {/* Physician */}
                    <TableCell sx={{ ...cellSx, width: 140, minWidth: 140, bgcolor: rowBg }}>
                      <Chip label={row.physician} />
                    </TableCell>

                    {/* Residents */}
                    <TableCell
                      sx={{ ...cellSx, width: 140, minWidth: 140, borderRight: "none", bgcolor: rowBg }}
                    >
                      <Chip label={row.residents} />
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ---- FOOTER BUTTONS (fixed at bottom) ---- */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column-reverse", sm: "row" },
          justifyContent: "flex-end",
          alignItems: { xs: "stretch", sm: "center" },
          flexShrink: 0,
          gap: { xs: 1.25, sm: 2 },
          mt: { xs: 2, sm: 3 },
          "& .MuiButton-root": { whiteSpace: "nowrap", flexShrink: 0 },
        }}
      >
        <Button
          variant="outlined"
          onClick={() => navigate(-1)}
          sx={{
            height: 40,
            px: 3.5,
            textTransform: "none",
            fontSize: 14,
            fontWeight: 500,
            borderRadius: "8px",
            color: "#015DFF",
            border: "1.5px solid #015DFF",
            px: 3,
            "&:hover": { border: "1.5px solid #015DFF", bgcolor: "#F4F8FF" },
          }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          disableElevation
          onClick={handleAddPatients}
          sx={{
            height: 40,
            px: 3.5,
            borderRadius: "8px",
            textTransform: "none",
            fontSize: 14,
            fontWeight: 500,
            bgcolor: "#015DFF",
            color: "#fff",
            "&:hover": { bgcolor: "#0145CC" },
            "&.Mui-disabled": { bgcolor: "#015DFF", color: "#fff", opacity: 0.5 },
          }}
        >
          {selected.size > 0
            ? `Add Patients (${selected.size})`
            : "Add Patients"}
        </Button>
      </Box>
    </Box>
  );
}