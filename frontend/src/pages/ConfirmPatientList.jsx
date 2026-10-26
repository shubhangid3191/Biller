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
  InputBase,
  Tooltip,
  Select,
  MenuItem,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
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
  headSymbol: "#52525B",
  muted: "#64748B",
  border: "#BED3FC",
  rowLine: "#EEF1F7",
  bodyText: "#475569",
  physicianText: "#128584",
  physicianBg: "#E8F8F5",
  page: "#F5F7FA",
  rowSelected: "#F2F7FF",
  rowSelectedHover: "#E8F1FF",
  rowHover: "#EEF4FF",
};

/* Same thin scrollbar as Locations / PreBillingClaim */
const thinScroll = {
  "&::-webkit-scrollbar": { width: "4px", height: "4px" },
  "&::-webkit-scrollbar-track": { backgroundColor: "transparent" },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#d1d5db",
    borderRadius: "2px",
  },
  "&::-webkit-scrollbar-thumb:hover": { backgroundColor: "#9ca3af" },
};

/* ------------------------------------------------------------------ */
/* Pagination (same as Locations / ReferringProvider / PreBillingClaim) */
/* rows per page | range | < 1 2 3 … 50 > | Go To Page                  */
/* ------------------------------------------------------------------ */
const PAGE_SIZES = [25, 50, 100];

/* Which page buttons to show: 1 … 44 45 46 … 50 */
const getPageItems = (current, total) => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const items = [1];
  let start = Math.max(2, current - 1);
  let end = Math.min(total - 1, current + 1);
  if (current <= 3) end = 4;
  if (current >= total - 2) start = total - 3;
  if (start > 2) items.push("…");
  for (let i = start; i <= end; i++) items.push(i);
  if (end < total - 1) items.push("…");
  items.push(total);
  return items;
};

const pageBtnSx = (active) => ({
  minWidth: 26,
  height: 26,
  px: 0.75,
  borderRadius: "6px",
  fontSize: 11,
  fontWeight: active ? 700 : 500,
  textTransform: "none",
  color: active ? "#FFFFFF" : "#374151",
  backgroundColor: active ? "#0066FF" : "transparent",
  "&:hover": { backgroundColor: active ? "#0052CC" : "#F3F4F6" },
});

const arrowBtnSx = {
  width: 26,
  height: 26,
  borderRadius: "6px",
  color: "#374151",
  "&.Mui-disabled": { color: "#D1D5DB" },
};

function PaginationBar({
  count,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}) {
  const [goTo, setGoTo] = React.useState("");

  const totalPages = Math.max(Math.ceil(count / rowsPerPage), 1);
  const from = count === 0 ? 0 : page * rowsPerPage + 1;
  const to = Math.min(count, (page + 1) * rowsPerPage);
  const items = getPageItems(page + 1, totalPages);

  const handleGo = () => {
    const n = parseInt(goTo, 10);
    if (!n) return;
    onPageChange(Math.min(Math.max(n, 1), totalPages) - 1);
    setGoTo("");
  };

  return (
    <Box
      sx={{
        flexShrink: 0,
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1fr auto 1fr" },
        justifyItems: { xs: "center", md: "stretch" },
        alignItems: "center",
        rowGap: 1,
        columnGap: 2,
        px: 1.5,
        py: 0.75,
        minHeight: 44,
        borderTop: "1px solid #E5E7EB",
        backgroundColor: "#FFFFFF",
      }}
    >
      {/* RIGHT: rows per page + range */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.25,
          gridColumn: { md: 3 },
          gridRow: { md: 1 },
          justifySelf: { md: "end" },
        }}
      >
        <Typography sx={{ fontSize: 11, color: "#4B5563" }}>
          Rows per page
        </Typography>
        <Select
          size="small"
          value={rowsPerPage}
          onChange={onRowsPerPageChange}
          IconComponent={KeyboardArrowDownIcon}
          sx={{
            fontSize: 11,
            fontWeight: 600,
            height: 26,
            borderRadius: "6px",
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "#E5E7EB" },
            "& .MuiSelect-select": { py: 0, pl: 1, pr: "24px !important" },
            "& .MuiSelect-icon": { fontSize: 16 },
          }}
        >
          {PAGE_SIZES.map((n) => (
            <MenuItem key={n} value={n} sx={{ fontSize: 11 }}>
              {n}
            </MenuItem>
          ))}
        </Select>
        <Typography sx={{ fontSize: 11, color: "#4B5563" }}>
          {from}–{to} of {count}
        </Typography>
      </Box>

      {/* CENTRE: page numbers + Go To Page */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          gridColumn: { md: 2 },
          gridRow: { md: 1 },
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.25 }}>
          <IconButton
            size="small"
            disabled={page === 0}
            onClick={() => onPageChange(page - 1)}
            sx={arrowBtnSx}
            aria-label="Previous page"
          >
            <KeyboardArrowLeft sx={{ fontSize: 18 }} />
          </IconButton>

          {items.map((item, idx) =>
            item === "…" ? (
              <Typography
                key={`gap-${idx}`}
                sx={{ fontSize: 11, color: "#9CA3AF", px: 0.5 }}
              >
                …
              </Typography>
            ) : (
              <Button
                key={item}
                onClick={() => onPageChange(item - 1)}
                sx={pageBtnSx(item === page + 1)}
              >
                {item}
              </Button>
            ),
          )}

          <IconButton
            size="small"
            disabled={page >= totalPages - 1}
            onClick={() => onPageChange(page + 1)}
            sx={arrowBtnSx}
            aria-label="Next page"
          >
            <KeyboardArrowRight sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
          <InputBase
            value={goTo}
            onChange={(e) => setGoTo(e.target.value.replace(/\D/g, ""))}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleGo();
            }}
            placeholder={`1–${totalPages}`}
            inputProps={{ inputMode: "numeric", "aria-label": "Go to page" }}
            sx={{
              width: 64,
              height: 26,
              px: 1,
              fontSize: 11,
              border: "1px solid #D1D5DB",
              borderRadius: "6px",
              backgroundColor: "#FFFFFF",
              "&:focus-within": { borderColor: "#0066FF" },
              "& input": { p: 0, textAlign: "center" },
            }}
          />
          <Button
            variant="outlined"
            onClick={handleGo}
            disabled={!goTo}
            sx={{
              textTransform: "none",
              fontSize: 11,
              fontWeight: 600,
              height: 26,
              px: 1.25,
              borderRadius: "6px",
              color: "#0066FF",
              borderColor: "#0066FF",
              whiteSpace: "nowrap",
              "&:hover": { borderColor: "#0052CC", backgroundColor: "#F5F9FF" },
            }}
          >
            Go To Page
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* Table columns                                                       */
/* adornment: "alpha" = A-Z / Z-A sort, "date" = date sort             */
/* stickyLeft: column stays visible while scrolling sideways (mobile)  */
/* ------------------------------------------------------------------ */
const CHECK_W = 38; // width of the checkbox column

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
    asc: "Sorted oldest first",
    desc: "Sorted newest first",
    none: "Sort oldest first",
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
/* Cell styles (same as Locations / ReferringProvider / PreBillingClaim)*/
/*   head : fontSize 10, bold, py 0.4, px 0.4, minHeight 28             */
/*   body : fontSize 10.5, py 0.5, px 0.3, height 32                    */
/* ------------------------------------------------------------------ */
const listHeadSx = {
  fontWeight: 700,
  fontSize: 10,
  color: "#1e293b",
  py: 0.4,
  px: 0.4,
  height: "auto",
  minHeight: 28,
  lineHeight: 1.15,
  whiteSpace: "nowrap",
  textAlign: "center",
  bgcolor: T.headBg,
  borderBottom: `1px solid ${T.border}`,
  borderRight: `1px solid ${T.border}`,
};

const listCellSx = {
  fontSize: 10.5,
  color: "#2E2E2E",
  py: 0.5,
  px: 0.3,
  height: 32,
  textAlign: "center",
  borderBottom: `1px solid ${T.rowLine}`,
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
/* Checkbox (same look as Locations)                                   */
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
        p: 0,
        color: "#C8D0DC",
        "&.Mui-checked, &.MuiCheckbox-indeterminate": { color: T.blue },
        "& svg": { fontSize: 18 },
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
        py: 0.25,
        fontSize: 10.5,
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
        ...listHeadSx,
        borderRight: isLast ? "none" : `1px solid ${T.border}`,
        ...(column.width && { width: column.width, minWidth: column.width }),
        ...(isSticky && {
          ...stickyLeftSx(column.stickyLeft, 4),
          ...stickyEdgeSx,
        }),
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 0.15,
        }}
      >
        {/* pre-line keeps the two-line labels ("Name / Age (Gender)") */}
        <Box
          component="span"
          sx={{ lineHeight: 1.15, whiteSpace: "pre-line" }}
        >
          {column.label}
        </Box>

        {sortType && (
          <Tooltip title={titles[sortDir || "none"]} arrow>
            <IconButton
              size="small"
              aria-label={`Sort ${column.label.replace("\n", " ")}`}
              onClick={() => onSort(column.id)}
              sx={{
                p: 0.15,
                flexShrink: 0,
                borderRadius: "6px",
                color: active ? T.blue : T.headSymbol,
                bgcolor: active ? "#DCE7FD" : "transparent",
                "&:hover": { bgcolor: "#DCE7FD" },
              }}
            >
              {/* DOB shows the up/down icon until it is actually sorted */}
              {sortType === "date" && !active ? (
                <UnfoldMoreIcon sx={{ fontSize: 13 }} />
              ) : (
                <KeyboardArrowDownIcon
                  sx={{
                    fontSize: 13,
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
        height: 28,
        boxSizing: "border-box",
      }}
    >
      <Tooltip title="Previous Date" arrow>
        <IconButton
          size="small"
          onClick={onPrev}
          aria-label="Previous date"
          sx={{
            p: 0.25,
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
            fontSize: 11,
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
            p: 0.25,
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

  // pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(PAGE_SIZES[0]);

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

  /* 1) DOS filter  2) alphabetical / date sort */
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

  // go back to page 1 whenever the date changes the rows
  React.useEffect(() => {
    setPage(0);
  }, [visibleRows.length, dosDate]);

  // 3) slice for the current page
  const pagedRows = visibleRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  /* all sortable columns (alpha + DOB): asc <-> desc only */
  const handleSort = (columnId) =>
    setSort((prev) => {
      if (prev.columnId !== columnId || !prev.dir)
        return { columnId, dir: "asc" };
      return { columnId, dir: prev.dir === "asc" ? "desc" : "asc" };
    });

  /* ---- selection (select-all works on the rows of the current page) ---- */
  const selectedPageCount = pagedRows.filter((r) => selected.has(r.id)).length;
  const allPageSelected =
    pagedRows.length > 0 && selectedPageCount === pagedRows.length;
  const somePageSelected = selectedPageCount > 0 && !allPageSelected;

  const toggleRow = (id) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const toggleAllPage = () =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (allPageSelected) pagedRows.forEach((r) => next.delete(r.id));
      else pagedRows.forEach((r) => next.add(r.id));
      return next;
    });

  // Go to the Add New Patient page and pass the selected patients along
  const handleAddPatients = () => {
    const selectedPatients = rows.filter((r) => selected.has(r.id));
    navigate(ADD_NEW_PATIENT_ROUTE, { state: { patients: selectedPatients } });
  };

  return (
    <Box
      sx={{
        bgcolor: T.page,
        height: "100%",
        maxHeight: "100vh",
        "@supports (height: 100dvh)": { maxHeight: "100dvh" }, // mobile browser bars
        width: "100%",
        minWidth: 0, // stops the wide table from stretching the whole page
        maxWidth: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        py: 1,
        px: 2,
        boxSizing: "border-box",
      }}
    >
      {/* ---- HEADER (fixed, never scrolls) ---- */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          flexShrink: 0,
          columnGap: 2,
          rowGap: 1,
          mb: 1,
        }}
      >
        <Typography
          sx={{
            fontSize: 16,
            fontWeight: 700,
            color: "#111827",
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

      {/* TABLE BOX: border box that fills the remaining height.
          Rows scroll inside TableContainer, pagination stays pinned at the bottom. */}
      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          border: "1px solid #e0e0e0",
          backgroundColor: "#FFFFFF",
          mb: 1,
        }}
      >
        <TableContainer
          sx={{
            flex: 1,
            minHeight: 0,
            minWidth: 0,
            maxHeight: "100%",
            overflow: "auto",
            boxShadow: "none",
            WebkitOverflowScrolling: "touch",
            ...thinScroll,
          }}
        >
          <Table
            stickyHeader
            size="small"
            aria-label="Confirm patient list"
            sx={{
              minWidth: 900,
              tableLayout: "auto",
              borderCollapse: "separate",
              borderSpacing: 0,
              "& th, & td": { boxSizing: "border-box" },
              "& .MuiTableCell-stickyHeader": {
                backgroundColor: `${T.headBg} !important`,
              },
            }}
          >
            <TableHead>
              <TableRow>
                {/* Select-all checkbox */}
                <TableCell
                  sx={{
                    ...listHeadSx,
                    ...stickyLeftSx(0, 4),
                    width: CHECK_W,
                    minWidth: CHECK_W,
                    maxWidth: CHECK_W,
                    px: 0,
                  }}
                >
                  <RowCheckbox
                    checked={allPageSelected}
                    indeterminate={somePageSelected}
                    onChange={toggleAllPage}
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
              {pagedRows.map((row) => {
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
                        ...listCellSx,
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
                        ...listCellSx,
                        ...stickyLeftSx(CHECK_W, 1),
                        ...stickyEdgeSx,
                        whiteSpace: "nowrap",
                        bgcolor: rowBg,
                      }}
                    >
                      {row.roomBed}
                    </TableCell>

                    {/* Name + Age */}
                    <TableCell sx={{ ...listCellSx, bgcolor: rowBg }}>
                      <Box sx={{ fontWeight: 700, color: "#2E2E2E" }}>
                        {row.name}
                      </Box>
                      <Box sx={{ fontWeight: 700, color: "#2E2E2E" }}>
                        {row.age}
                      </Box>
                    </TableCell>

                    {/* MRN */}
                    <TableCell sx={{ ...listCellSx, bgcolor: rowBg }}>
                      <Box>{row.mrn}</Box>
                      <Box>{row.patientId}</Box>
                    </TableCell>

                    {/* DOB */}
                    <TableCell
                      sx={{
                        ...listCellSx,
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
                        ...listCellSx,
                        whiteSpace: "nowrap",
                        fontWeight: 700,
                        bgcolor: rowBg,
                      }}
                    >
                      {row.location}
                    </TableCell>

                    {/* Physician */}
                    <TableCell
                      sx={{
                        ...listCellSx,
                        width: 140,
                        minWidth: 140,
                        bgcolor: rowBg,
                      }}
                    >
                      <Chip label={row.physician} />
                    </TableCell>

                    {/* Residents */}
                    <TableCell
                      sx={{
                        ...listCellSx,
                        width: 140,
                        minWidth: 140,
                        bgcolor: rowBg,
                      }}
                    >
                      <Chip label={row.residents} />
                    </TableCell>
                  </TableRow>
                );
              })}

              {/* empty state */}
              {pagedRows.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={COLUMNS.length + 1}
                    align="center"
                    sx={{ py: 6, color: "#6B7280", borderBottom: "none" }}
                  >
                    No patients found for this date
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <PaginationBar
          count={visibleRows.length}
          page={page}
          onPageChange={setPage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(Number(e.target.value));
            setPage(0);
          }}
        />
      </Box>

      {/* ---- FOOTER BUTTONS (fixed at bottom) ---- */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column-reverse", sm: "row" },
          justifyContent: "flex-end",
          alignItems: { xs: "stretch", sm: "center" },
          flexShrink: 0,
          gap: { xs: 1, sm: 1.5 },
          "& .MuiButton-root": { whiteSpace: "nowrap", flexShrink: 0 },
        }}
      >
        <Button
          variant="outlined"
          onClick={() => navigate(-1)}
          sx={{
            height: 28,
            px: 3,
            textTransform: "none",
            fontSize: 11,
            fontWeight: 500,
            borderRadius: "8px",
            color: "#015DFF",
            border: "1.5px solid #015DFF",
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
            height: 28,
            px: 3,
            borderRadius: "8px",
            textTransform: "none",
            fontSize: 11,
            fontWeight: 600,
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