import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Checkbox,
  Button,
  IconButton,
  InputBase,
  Tooltip,
  Dialog,
  DialogContent,
  Badge,
  Select,
  MenuItem,
} from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import ClearIcon from "@mui/icons-material/Clear";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";

import {
  EyeRedIcon,
  EyeBlueIcon,
  RecordsIcon,
  OrdersIcon,
  MicIcon,
  NoteEditIcon,
  NoteEditRedIcon,
  MailSendIcon,
  MoreIcon,
  FilterIcon,
  ExportIcon,
  SearchGlassIcon,
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
  headSymbol: "#52525B",
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
  headBg: "#EBF1FE",
  fieldBorder: "#D5DCE8",
  page: "#F5F7FA",
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
/* ------------------------------------------------------------------ */

const COLUMNS = [
  { id: "name", label: "Name, Age (Gender)", width: "22%" },
  { id: "location", label: "Location", width: "15%", adornment: "alpha" },
  { id: "mrn", label: "MRN (Patient ID)", width: "15%" },
  { id: "dob", label: "DOB", width: "14%", adornment: "date" },
  { id: "physician", label: "Physician", width: "18%", adornment: "alpha" },
  { id: "actions", label: "Actions", width: "16%", noWrap: true },
];

/* Sortable columns for the dialog */
const SORTABLE_COLUMNS = [
  { id: "location", label: "Location", sort: "alpha" },
  { id: "dob", label: "DOB", sort: "date" },
  { id: "physician", label: "Physician", sort: "alpha" },
];

const SORT_ORDER_LABELS = {
  alpha: { asc: "A to Z", desc: "Z to A" },
  date: { asc: "Oldest first", desc: "Newest first" },
};

const SORT_TITLES = {
  alpha: { asc: "Sorted A–Z", desc: "Sorted Z–A", none: "Sort A–Z" },
  date: {
    asc: "Sorted oldest first",
    desc: "Sorted newest first",
    none: "Sort oldest first",
  },
};

const GENDER_OPTIONS = ["Male", "Female", "Other"];

const ROW_ACTIONS = [
  { id: "records", title: "Patient Record", Icon: RecordsIcon },
  { id: "orders", title: "Orders", Icon: OrdersIcon },
  { id: "dictate", title: "Dictate Note", Icon: MicIcon },
  { id: "note", title: "Edit Note", Icon: NoteEditIcon },
  { id: "message", title: "Send Message", Icon: MailSendIcon },
];

/* ------------------------------------------------------------------ */
/* Dummy rows                                                          */
/* name format: "First Last Age (M|F)"                                 */
/* ------------------------------------------------------------------ */

const SAMPLE = [
  ["Lisha Cook", 45, "F", "GCH–IH", "719471345", "ID: NA", "11/20/2025", "Julia R"],
  ["Rahul Sharma", 52, "M", "GCH–OP", "874382743", "ID: 4521", "03/14/1973", "Amit K"],
  ["Priya Patel", 34, "F", "GCH–ICU", "892891989", "ID: NA", "07/02/1991", "Julia R"],
  ["John Miller", 61, "M", "GCH–IH", "728374888", "ID: 8810", "01/29/1964", "Sara L"],
  ["Anita Desai", 28, "F", "GCH–ER", "909238484", "ID: NA", "09/18/1997", "Amit K"],
  ["Mark Wilson", 47, "M", "GCH–OP", "322736772", "ID: 3307", "05/06/1978", "Sara L"],
  ["Sneha Kulkarni", 39, "F", "GCH–ICU", "719471351", "ID: NA", "12/11/1986", "Julia R"],
  ["David Brown", 70, "M", "GCH–IH", "242657545", "ID: 9942", "08/23/1955", "Amit K"],
  ["Meera Nair", 55, "F", "GCH–ER", "232446577", "ID: NA", "02/17/1970", "Sara L"],
  ["Kevin Zhang", 30, "M", "GCH–OP", "456547677", "ID: 1180", "10/09/1995", "Julia R"],
  ["Fatima Khan", 42, "F", "GCH–IH", "565756545", "ID: NA", "04/25/1983", "Amit K"],
  ["Robert King", 66, "M", "GCH–ICU", "877876655", "ID: 7754", "06/30/1959", "Sara L"],
  ["Kobert King", 66, "M", "BCH–ICU", "333333333", "ID: 7754", "06/30/1959", "Sara L"],
  ["Nora Blake", 50, "F", "GCH–ICU", "557575665", "ID: 3310", "06/30/1975", "Bara L"],
  ["David Brown", 70, "M", "GCH–IH", "242657545", "ID: 9942", "08/23/1955", "Amit K"],
  ["Meera Nair", 55, "F", "GCH–ER", "232446577", "ID: NA", "02/17/1970", "Sara L"],
  ["Kevin Zhang", 30, "M", "GCH–OP", "456547677", "ID: 1180", "10/09/1995", "Julia R"],
  ["Fatima Khan", 42, "F", "GCH–IH", "565756545", "ID: NA", "04/25/1983", "Amit K"],
  ["Robert King", 66, "M", "GCH–ICU", "877876655", "ID: 7754", "06/30/1959", "Sara L"],
];

/* Map single-letter code → display label */
const GENDER_LABEL = { M: "Male", F: "Female", O: "Other" };

const createRows = () =>
  SAMPLE.map(
    ([name, age, genderCode, location, mrn, patientId, dob, physician], i) => ({
      id: i,
      name,
      age,
      gender: GENDER_LABEL[genderCode] ?? genderCode,
      location,
      mrn,
      patientId,
      dob,
      physician,
      alert: i === 0,
    }),
  );

/* Unique physician list derived from rows */
const ALL_ROWS = createRows();

/* ------------------------------------------------------------------ */
/* Shared store (used by this page + AddNewPatient)                     */
/* AddNewPatient calls savePatient() -> this table updates automatically.*/
/* Saved rows are kept in localStorage so they survive a refresh.       */
/* Replace with your API calls later.                                   */
/* ------------------------------------------------------------------ */
const STORAGE_KEY = "allPatients:v1";

const loadPatients = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
};
const persistPatients = (rows) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rows));
  } catch {
    /* storage full / blocked -> keep working in memory */
  }
};

let storePatients = loadPatients() ?? ALL_ROWS;
let nextPatientId = storePatients.reduce((m, p) => Math.max(m, p.id), -1) + 1;
const listenersPatients = new Set();

const subscribePatients = (l) => {
  listenersPatients.add(l);
  return () => listenersPatients.delete(l);
};
const getPatients = () => storePatients;

export const usePatients = () =>
  React.useSyncExternalStore(subscribePatients, getPatients, getPatients);

/* row.id present -> update (merge) that row, otherwise add a new row on top */
export const savePatient = (row) => {
  if (row.id !== undefined && row.id !== null) {
    storePatients = storePatients.map((p) =>
      p.id === row.id ? { ...p, ...row } : p,
    );
  } else {
    storePatients = [{ ...row, id: nextPatientId++ }, ...storePatients];
  }
  persistPatients(storePatients);
  listenersPatients.forEach((l) => l());
};

const getPhysicianOptions = (rows) =>
  [...new Set(rows.map((r) => r.physician).filter(Boolean))].sort((a, b) =>
    a.localeCompare(b),
  );

const toTime = (s) => {
  const t = new Date(s).getTime();
  return Number.isNaN(t) ? 0 : t;
};

/* ------------------------------------------------------------------ */
/* Toolbar                                                             */
/* ------------------------------------------------------------------ */

function Toolbar({
  query,
  onQueryChange,
  onAddNewPatient,
  onFilterOpen,
  activeFilterCount,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        flexShrink: 0,
        gap: 1,
        mb: 1,
      }}
    >
      <Typography
        sx={{
          fontSize: 16,
          fontWeight: 700,
          color: "#111827",
          whiteSpace: "nowrap",
        }}
      >
        All Patients
      </Typography>

      <Stack
        direction="row"
        spacing={1}
        flexWrap="wrap"
        alignItems="center"
        useFlexGap
      >
        {/* Search bar (same look as Locations / PreBillingClaim search) */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.6,
            height: 28,
            px: 1,
            borderRadius: "14px",
            backgroundColor: "#F5F7FA",
            border: "1px solid #E5E7EB",
            width: { xs: "100%", sm: 260 },
            transition: "border-color 0.2s ease",
            "&:hover": { borderColor: "#0066FF" },
            "&:focus-within": { borderColor: "#0066FF" },
          }}
        >
          <SearchGlassIcon />
          <InputBase
            placeholder="Search patients by name or MRN..."
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            inputProps={{ "aria-label": "Search patients by name or MRN" }}
            sx={{
              flex: 1,
              minWidth: 0,
              fontSize: 11,
              color: "#4B5563",
              "& input::placeholder": { color: "#9CA3AF", opacity: 1 },
            }}
          />
          {query && (
            <IconButton
              size="small"
              aria-label="Clear search"
              onClick={() => onQueryChange("")}
              sx={{ p: 0.25 }}
            >
              <ClearIcon sx={{ fontSize: 14, color: T.muted }} />
            </IconButton>
          )}
        </Box>

        <Badge
          badgeContent={activeFilterCount}
          color="primary"
          sx={{
            "& .MuiBadge-badge": {
              bgcolor: "#015DFF",
              color: "#fff",
              fontSize: "0.65rem",
              minWidth: 16,
              height: 16,
            },
          }}
        >
          <Button
            variant="outlined"
            onClick={onFilterOpen}
            startIcon={<FilterIcon color="#2563EB" />}
            sx={{
              textTransform: "none",
              fontSize: 11,
              fontWeight: 500,
              height: 28,
              borderRadius: "8px",
              color: T.blue,
              border: "1.5px solid #015DFF",
              bgcolor: activeFilterCount > 0 ? "#EFF6FF" : "transparent",
              px: 1.75,
              "&:hover": { borderColor: T.blue, bgcolor: "#F4F8FF" },
            }}
          >
            Filter
          </Button>
        </Badge>

        <Button
          variant="outlined"
          startIcon={<ExportIcon color="#2563EB" />}
          sx={{
            textTransform: "none",
            fontSize: 11,
            fontWeight: 500,
            height: 28,
            borderRadius: "8px",
            color: T.blue,
            border: "1.5px solid #015DFF",
            px: 1.75,
            "&:hover": { borderColor: T.blue, bgcolor: "#F4F8FF" },
          }}
        >
          Export
        </Button>

        <Button
          variant="contained"
          disableElevation
          onClick={onAddNewPatient}
          sx={{
            textTransform: "none",
            fontSize: 11,
            fontWeight: 600,
            height: 28,
            borderRadius: "8px",
            bgcolor: T.blue,
            px: 1.75,
            "&:hover": { bgcolor: "#1D4ED8" },
          }}
        >
          Add New Patient
        </Button>
      </Stack>
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* Filter & Sort option row                                            */
/* ------------------------------------------------------------------ */

function OptionRow({ label, checked, onToggle, minHeight = 50 }) {
  return (
    <Box
      onClick={onToggle}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 2,
        py: 1.2,
        minHeight,
        borderRadius: "8px",
        cursor: "pointer",
        bgcolor: checked ? "#EBF1FE" : "transparent",
        "&:hover": { bgcolor: checked ? "#EBF1FE" : "#f8fafc" },
      }}
    >
      <Typography
        sx={{ fontSize: 12, fontWeight: checked ? 600 : 500, color: "#0f172a" }}
      >
        {label}
      </Typography>
      <Checkbox
        checked={checked}
        size="small"
        onClick={(e) => e.stopPropagation()}
        onChange={onToggle}
        sx={{
          color: "#cbd5e1",
          "&.Mui-checked": { color: "rgba(1,93,255,1)" },
        }}
      />
    </Box>
  );
}

const hideScrollSx = {
  scrollbarWidth: "none",
  "&::-webkit-scrollbar": { display: "none" },
};

/* ------------------------------------------------------------------ */
/* Filter & Sort Dialog                                                */
/* ------------------------------------------------------------------ */

const EMPTY_DRAFT = { physician: "", gender: "", sortBy: "", sortDir: "asc" };

function FilterSortDialog({
  open,
  onClose,
  initial,
  onApply,
  onClear,
  physicianOptions,
}) {
  const [category, setCategory] = React.useState("physician");
  const [draft, setDraft] = React.useState(EMPTY_DRAFT);
  const [phSearch, setPhSearch] = React.useState("");

  // reset draft every time dialog opens
  React.useEffect(() => {
    if (open) {
      setDraft({ ...initial });
      setCategory("physician");
      setPhSearch("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const categories = [
    {
      key: "physician",
      label: "Physician",
      hasDraft: Boolean(draft.physician),
    },
    { key: "gender", label: "Gender", hasDraft: Boolean(draft.gender) },
    { key: "sort", label: "Sort", hasDraft: Boolean(draft.sortBy) },
  ];

  const selectedSortCol = SORTABLE_COLUMNS.find((c) => c.id === draft.sortBy);
  const orderLabels = selectedSortCol
    ? SORT_ORDER_LABELS[selectedSortCol.sort]
    : SORT_ORDER_LABELS.alpha;

  const filteredPhysicians = physicianOptions.filter((p) =>
    p.toLowerCase().includes(phSearch.toLowerCase()),
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      sx={{
        "& .MuiDialog-paper": {
          width: "400px !important",
          minWidth: "400px !important",
          maxWidth: "400px !important",
          height: "400px !important",
          minHeight: "400px !important",
          maxHeight: "60vh !important",
          flexShrink: "0 !important",
          display: "flex !important",
          flexDirection: "column",
          overflow: "hidden !important",
          borderRadius: "16px !important",
          boxShadow: "0px 8px 32px rgba(0,0,0,0.14)",
          margin: 0,
        },
        "@media (max-width: 480px)": {
          "& .MuiDialog-paper": {
            width: "92vw !important",
            minWidth: "92vw !important",
            maxWidth: "92vw !important",
            height: "50vh !important",
            minHeight: "50vh !important",
            borderRadius: "12px !important",
          },
        },
      }}
    >
      <DialogContent
        sx={{
          p: 0,
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minHeight: 0,
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2.5,
            pt: 2,
            pb: 1,
            flexShrink: 0,
          }}
        >
          <Typography sx={{ fontSize: 12, fontWeight: 700, color: "#0f172a" }}>
            Filter &amp; sort
          </Typography>
          <IconButton size="small" onClick={onClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Two-column layout */}
        <Box sx={{ display: "flex", flex: 1, minHeight: 0 }}>
          {/* Left sidebar */}
          <Box
            sx={{
              width: 130,
              bgcolor: "#F9FAFA",
              borderRight: "1px solid #e2e8f0",
              py: 1,
              flexShrink: 0,
              overflowY: "auto",
              ...hideScrollSx,
              "@media (max-width: 400px)": { width: 100 },
            }}
          >
            <Typography
              sx={{
                px: 2,
                py: 0.75,
                fontSize: 12,
                fontWeight: 600,
                color: "#94a3b8",
              }}
            >
              Filter by
            </Typography>

            {categories.map((cat) => {
              const isActive = category === cat.key;
              return (
                <Box
                  key={cat.key}
                  onClick={() => {
                    setCategory(cat.key);
                    setPhSearch("");
                  }}
                  sx={{
                    px: 2,
                    py: 0.9,
                    borderLeft: isActive
                      ? "3px solid rgba(1, 93, 255, 1)"
                      : "3px solid transparent",
                    bgcolor: isActive ? "#fff" : "transparent",
                    cursor: "pointer",
                    "&:hover": { bgcolor: isActive ? "#fff" : "#f1f5f9" },
                    "@media (max-width: 400px)": { px: 1.5, py: 0.7 },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 12,
                      fontWeight: isActive ? 600 : 500,
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                    }}
                  >
                    {cat.label}
                    {cat.hasDraft && (
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          bgcolor: "rgba(1,93,255,1)",
                          flexShrink: 0,
                        }}
                      />
                    )}
                  </Typography>
                </Box>
              );
            })}
          </Box>

          {/* Right panel */}
          <Box
            sx={{
              flex: 1,
              minWidth: 0,
              py: 1,
              px: 1.5,
              display: "flex",
              flexDirection: "column",
              minHeight: 0,
              overflow: "hidden",
            }}
          >
            {/* PHYSICIAN */}
            {category === "physician" && (
              <>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    px: 1.2,
                    py: 0.5,
                    mb: 1,
                    bgcolor: "#F9FAFB",
                    flexShrink: 0,
                    gap: 0.8,
                  }}
                >
                  <SearchIcon sx={{ fontSize: 14, color: "#94a3b8" }} />
                  <input
                    value={phSearch}
                    onChange={(e) => setPhSearch(e.target.value)}
                    placeholder="Search physician..."
                    style={{
                      border: "none",
                      outline: "none",
                      background: "transparent",
                      fontSize: "12px",
                      color: "#0f172a",
                      width: "100%",
                      fontFamily: "inherit",
                    }}
                    autoFocus
                  />
                  {phSearch && (
                    <IconButton
                      size="small"
                      sx={{ p: 0.2 }}
                      onClick={() => setPhSearch("")}
                    >
                      <CloseIcon sx={{ fontSize: 12, color: "#94a3b8" }} />
                    </IconButton>
                  )}
                </Box>

                <Box
                  sx={{
                    flex: 1,
                    overflowY: "auto",
                    minHeight: 0,
                    ...hideScrollSx,
                  }}
                >
                  {filteredPhysicians.map((opt) => {
                    const isChecked = draft.physician === opt;
                    return (
                      <OptionRow
                        key={opt}
                        label={opt}
                        checked={isChecked}
                        onToggle={() =>
                          setDraft((p) => ({
                            ...p,
                            physician: isChecked ? "" : opt,
                          }))
                        }
                      />
                    );
                  })}
                  {filteredPhysicians.length === 0 && (
                    <Typography
                      sx={{
                        fontSize: 12,
                        color: "#94a3b8",
                        textAlign: "center",
                        py: 3,
                      }}
                    >
                      No physicians found
                    </Typography>
                  )}
                </Box>
              </>
            )}

            {/* GENDER */}
            {category === "gender" && (
              <Box
                sx={{
                  flex: 1,
                  overflowY: "auto",
                  minHeight: 0,
                  ...hideScrollSx,
                }}
              >
                {GENDER_OPTIONS.map((opt) => {
                  const isChecked = draft.gender === opt;
                  return (
                    <OptionRow
                      key={opt}
                      label={opt}
                      checked={isChecked}
                      onToggle={() =>
                        setDraft((p) => ({
                          ...p,
                          gender: isChecked ? "" : opt,
                        }))
                      }
                    />
                  );
                })}
              </Box>
            )}

            {/* SORT */}
            {category === "sort" && (
              <Box
                sx={{
                  flex: 1,
                  overflowY: "auto",
                  minHeight: 0,
                  ...hideScrollSx,
                }}
              >
                {SORTABLE_COLUMNS.map((col) => {
                  const isChecked = draft.sortBy === col.id;
                  return (
                    <OptionRow
                      key={col.id}
                      label={col.label}
                      checked={isChecked}
                      onToggle={() =>
                        setDraft((p) => ({
                          ...p,
                          sortBy: isChecked ? "" : col.id,
                          sortDir: "asc",
                        }))
                      }
                    />
                  );
                })}

                {/* Order (only when a column is picked) */}
                {draft.sortBy && (
                  <>
                    <Typography
                      sx={{
                        px: 2,
                        pt: 1.5,
                        pb: 0.5,
                        fontSize: 12,
                        fontWeight: 600,
                        color: "#94a3b8",
                      }}
                    >
                      Order
                    </Typography>
                    {["asc", "desc"].map((dir) => (
                      <OptionRow
                        key={dir}
                        label={orderLabels[dir]}
                        checked={draft.sortDir === dir}
                        onToggle={() =>
                          setDraft((p) => ({ ...p, sortDir: dir }))
                        }
                        minHeight={44}
                      />
                    ))}
                  </>
                )}
              </Box>
            )}
          </Box>
        </Box>

        {/* Footer */}
        <Box
          sx={{
            display: "flex",
            gap: 1.5,
            px: 2.5,
            py: 2,
            borderTop: "1px solid #f1f5f9",
            flexShrink: 0,
            backgroundColor: "#fff",
            "@media (max-width: 400px)": { flexDirection: "column", gap: 1 },
          }}
        >
          <Button
            fullWidth
            variant="outlined"
            onClick={onClear}
            sx={{
              textTransform: "none",
              fontSize: 12,
              color: "#015DFF",
              borderColor: "#015DFF",
              borderRadius: "100px",
              "@media (max-width: 400px)": { py: 0.8 },
            }}
          >
            Clear all
          </Button>
          <Button
            fullWidth
            variant="contained"
            onClick={() => onApply(draft)}
            sx={{
              borderRadius: "100px",
              textTransform: "none",
              fontSize: 12,
              bgcolor: "rgba(1, 93, 255, 1)",
              boxShadow: "none",
              "&:hover": { bgcolor: "#0145CC", boxShadow: "none" },
              "@media (max-width: 400px)": { py: 0.8 },
            }}
          >
            Apply
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

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
  color: "#1e293b",
  py: 0.5,
  px: 0.3,
  height: 32,
  textAlign: "center",
  borderBottom: `1px solid ${T.rowLine}`,
};

/* ------------------------------------------------------------------ */
/* Header Cell                                                         */
/* ------------------------------------------------------------------ */

function HeaderCell({ column, isLast, sortDir, onSort }) {
  const active = !!sortDir;
  const sortType = column.adornment; // "alpha" | "date" | undefined
  const titles = sortType ? SORT_TITLES[sortType] : null;

  return (
    <TableCell
      sx={{
        ...listHeadSx,
        width: column.width,
        overflow: "hidden",
        borderRight: isLast ? "none" : `1px solid ${T.border}`,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 0.15,
          minWidth: 0,
          width: "100%",
        }}
      >
        <Box
          component="span"
          sx={{
            lineHeight: 1.15,
            overflow: "hidden",
            textOverflow: "ellipsis",
            minWidth: 0,
            whiteSpace: "nowrap",
          }}
        >
          {column.label}
        </Box>

        {sortType && (
          <Tooltip title={titles[sortDir || "none"]} arrow>
            <IconButton
              size="small"
              aria-label={`Sort ${column.label}`}
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
/* Chips + actions                                                     */
/* ------------------------------------------------------------------ */

function PhysicianChip({ label }) {
  return (
    <Box
      sx={{
        display: "block",
        width: "100%",
        textAlign: "center",
        bgcolor: T.physicianBg,
        border: `1px solid ${T.physicianBg}`,
        borderRadius: "4px",
        px: 1,
        py: 0.25,
        fontSize: 10.5,
        fontWeight: 700,
        color: T.physicianText,
        boxSizing: "border-box",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </Box>
  );
}

const iconButtonSx = {
  p: 0.35,
  width: 27,
  height: 27,
  minWidth: 27,
  flexShrink: 0,
  borderRadius: "50%",
  "&:hover": { bgcolor: "#EDF3FE" },
};

function ViewAction({ alert }) {
  return (
    <Tooltip title="View Chart" arrow>
      <IconButton
        aria-label="View chart"
        sx={{
          ...iconButtonSx,
          width: alert ? 29 : 27,
          height: alert ? 29 : 27,
          minWidth: alert ? 29 : 27,
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
      direction="row"
      alignItems="center"
      justifyContent="center"
      spacing={0.7}
      sx={{
        width: "100%",
        minWidth: 0,
        whiteSpace: "nowrap",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
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
                  width: 29,
                  height: 29,
                  minWidth: 29,
                  bgcolor: T.redSoft,
                  "&:hover": { bgcolor: "#FFDCDC" },
                }),
              }}
            >
              <ActiveIcon />
            </IconButton>
          </Tooltip>
        );
      })}

      <Tooltip title="More Options" arrow>
        <IconButton aria-label="More options" sx={iconButtonSx}>
          <MoreIcon />
        </IconButton>
      </Tooltip>
    </Stack>
  );
}

/* same checkbox look as Locations */
const checkboxSx = {
  p: 0,
  color: "#C8D0DC",
  "&.Mui-checked": { color: T.blue },
  "&.MuiCheckbox-indeterminate": { color: T.blue },
  "& svg": { fontSize: 18 },
};

/* ------------------------------------------------------------------ */
/* Patient Row                                                         */
/* ------------------------------------------------------------------ */

function PatientRow({ row, selected, onToggle }) {
  return (
    <TableRow
      hover
      sx={{ backgroundColor: "#FFFFFF", "&:hover": { bgcolor: "#EEF4FF" } }}
    >
      {/* Checkbox */}
      <TableCell
        padding="checkbox"
        sx={{
          ...listCellSx,
          width: "4%",
          minWidth: 38,
          maxWidth: 42,
          pl: 0.4,
          pr: 0.2,
        }}
      >
        <Checkbox
          checked={selected}
          onChange={() => onToggle(row.id)}
          inputProps={{ "aria-label": `Select ${row.name}` }}
          sx={checkboxSx}
        />
      </TableCell>

      {/* Name + age + gender (single line) */}
      <TableCell
        sx={{
          ...listCellSx,
          width: "22%",
          color: T.nameText,
          fontWeight: 500,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {row.name} {row.age}y (
        {row.gender === "Male" ? "M" : row.gender === "Female" ? "F" : "O"})
      </TableCell>

      {/* Location */}
      <TableCell
        sx={{
          ...listCellSx,
          width: "15%",
          color: T.locationText,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {row.location}
      </TableCell>

      {/* MRN */}
      <TableCell
        sx={{
          ...listCellSx,
          width: "15%",
          color: T.mrnText,
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        <Box
          sx={{
            lineHeight: 1.35,
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {row.mrn}
        </Box>
        <Box
          sx={{
            lineHeight: 1.35,
            color: T.mrnText,
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {row.patientId}
        </Box>
      </TableCell>

      {/* DOB */}
      <TableCell
        sx={{
          ...listCellSx,
          width: "12%",
          color: T.dobText,
          whiteSpace: "nowrap",
        }}
      >
        {row.dob}
      </TableCell>

      {/* Physician */}
      <TableCell sx={{ ...listCellSx, width: "14%", overflow: "hidden" }}>
        <PhysicianChip label={row.physician} />
      </TableCell>

      {/* Actions */}
      <TableCell
        sx={{
          ...listCellSx,
          width: "22%",
          whiteSpace: "nowrap",
          px: 0.5,
          overflow: "hidden",
        }}
      >
        <RowActions alert={row.alert} />
      </TableCell>
    </TableRow>
  );
}

/* ------------------------------------------------------------------ */
/* Patients Table (rows scroll inside, header stays sticky)            */
/* ------------------------------------------------------------------ */

function PatientsTable({
  rows,
  selected,
  onToggleRow,
  onToggleAll,
  sort,
  onSort,
}) {
  const allSelected =
    rows.length > 0 && rows.every((r) => selected.includes(r.id));
  const someSelected =
    rows.some((r) => selected.includes(r.id)) && !allSelected;

  return (
    <TableContainer
      sx={{
        flex: 1,
        minHeight: 0,
        maxHeight: "100%",
        overflow: "auto",
        boxShadow: "none",
        ...thinScroll,
      }}
    >
      <Table
        stickyHeader
        size="small"
        aria-label="All patients"
        sx={{
          minWidth: 900,
          tableLayout: "auto",
          borderCollapse: "separate",
          borderSpacing: 0,
          "& .MuiTableCell-stickyHeader": {
            backgroundColor: `${T.headBg} !important`,
          },
        }}
      >
        <TableHead>
          <TableRow>
            {/* Select-all checkbox */}
            <TableCell
              padding="checkbox"
              sx={{
                ...listHeadSx,
                width: "4%",
                minWidth: 38,
                maxWidth: 42,
                pl: 0.4,
                pr: 0.2,
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
          {rows.map((row) => (
            <PatientRow
              key={row.id}
              row={row}
              selected={selected.includes(row.id)}
              onToggle={onToggleRow}
            />
          ))}

          {/* empty state */}
          {rows.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={COLUMNS.length + 1}
                align="center"
                sx={{ py: 6, color: "#6B7280", borderBottom: "none" }}
              >
                No records found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
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

  // active filters
  const [physicianFilter, setPhysicianFilter] = React.useState("");
  const [genderFilter, setGenderFilter] = React.useState("");

  // dialog
  const [filterOpen, setFilterOpen] = React.useState(false);

  // pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(PAGE_SIZES[0]);

  // rows come from the shared store (AddNewPatient saves into it)
  const rows = usePatients();
  const physicianOptions = React.useMemo(() => getPhysicianOptions(rows), [rows]);

  /* 1) search + filter  2) sort */
  const visibleRows = React.useMemo(() => {
    const q = query.trim().toLowerCase();

    let result = rows.filter((r) => {
      const matchSearch =
        !q || r.name.toLowerCase().includes(q) || r.mrn.includes(q);
      const matchPhysician =
        !physicianFilter || r.physician === physicianFilter;
      const matchGender = !genderFilter || r.gender === genderFilter;
      return matchSearch && matchPhysician && matchGender;
    });

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
  }, [rows, query, physicianFilter, genderFilter, sort]);

  // go back to page 1 whenever search / filter changes the number of rows
  React.useEffect(() => {
    setPage(0);
  }, [visibleRows.length]);

  // 3) slice for the current page
  const pagedRows = visibleRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  const handleSort = (columnId) =>
    setSort((prev) => {
      if (prev.columnId !== columnId || !prev.dir)
        return { columnId, dir: "asc" };
      return { columnId, dir: prev.dir === "asc" ? "desc" : "asc" };
    });

  const toggleRow = (id) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  // select-all works on the rows of the current page
  const toggleAll = (event) => {
    const pageIds = pagedRows.map((r) => r.id);
    setSelected((prev) =>
      event.target.checked
        ? [...new Set([...prev, ...pageIds])]
        : prev.filter((id) => !pageIds.includes(id)),
    );
  };

  const handleAddNewPatient = () => navigate("/add-new-patient");

  // badge = number of active filters + active sort
  const activeFilterCount =
    (physicianFilter ? 1 : 0) +
    (genderFilter ? 1 : 0) +
    (sort.columnId && sort.dir ? 1 : 0);

  const handleFilterApply = (draft) => {
    setPhysicianFilter(draft.physician);
    setGenderFilter(draft.gender);
    setSort(
      draft.sortBy
        ? { columnId: draft.sortBy, dir: draft.sortDir }
        : { columnId: null, dir: null },
    );
    setFilterOpen(false);
  };

  const handleFilterClear = () => {
    setPhysicianFilter("");
    setGenderFilter("");
    setSort({ columnId: null, dir: null });
    setFilterOpen(false);
  };

  // what the dialog should show when it opens
  const dialogInitial = {
    physician: physicianFilter,
    gender: genderFilter,
    sortBy: sort.columnId || "",
    sortDir: sort.dir || "asc",
  };

  return (
    <Box
      sx={{
        bgcolor: T.page,
        height: "100%",
        maxHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        py: 1,
        px: 2,
        boxSizing: "border-box",
      }}
    >
      {/* HEADER (fixed, never scrolls) */}
      <Toolbar
        query={query}
        onQueryChange={setQuery}
        onAddNewPatient={handleAddNewPatient}
        onFilterOpen={() => setFilterOpen(true)}
        activeFilterCount={activeFilterCount}
      />

      {/* TABLE BOX: border box that fills the remaining height.
          Rows scroll inside TableContainer, pagination stays pinned at the bottom. */}
      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          border: "1px solid #e0e0e0",
          backgroundColor: "#FFFFFF",
          mb: 1,
        }}
      >
        <PatientsTable
          rows={pagedRows}
          selected={selected}
          onToggleRow={toggleRow}
          onToggleAll={toggleAll}
          sort={sort}
          onSort={handleSort}
        />

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

      {/* FILTER & SORT DIALOG */}
      <FilterSortDialog
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        initial={dialogInitial}
        physicianOptions={physicianOptions}
        onApply={handleFilterApply}
        onClear={handleFilterClear}
      />
    </Box>
  );
}