import { useState, useMemo, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  MenuItem,
  Tooltip,
  Select,
  FormControl,
  TextField,
  InputAdornment,
  InputBase,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  KeyboardArrowDown,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@mui/icons-material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {
  FilterIcon1,
  SettingsIcon,
  DownloadIcon,
  RefreshIcon,
  ViewIconRemittance,
  DownloadIconRemittance,
  BlueCalendarIcon,
  Search,
} from "../assets/Assets";

dayjs.extend(customParseFormat);

/* ─── Design tokens ──────────────────────────────────────────────── */
const BLUE = "#0B63F6";
const SORT_BLUE = "#2563EB";
const SORT_ARROW = "#52525B";
const APPLIED_BORDER = "#0066FF";
const APPLIED_BG = "#EFF6FF";
const headBg = "#F1F5FC";

/* ─── Shared sx ──────────────────────────────────────────────────── */
const thinScroll = {
  "&::-webkit-scrollbar": { width: "6px", height: "6px" },
  "&::-webkit-scrollbar-track": { backgroundColor: "transparent" },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#d1d5db",
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-thumb:hover": { backgroundColor: "#9ca3af" },
};

const thSx = {
  fontWeight: 600,
  fontSize: 11,
  color: "#4B5563",
  backgroundColor: headBg,
  borderBottom: "1px solid #E5E7EB",
  whiteSpace: "pre-line",
  lineHeight: 1.2,
  padding: "8px 8px",
  textAlign: "center",
};

const tdSx = {
  fontSize: 11,
  color: "#1F2937",
  padding: "6px 8px",
  borderBottom: "1px solid #F0F1F4",
  textAlign: "center",
};

const checkboxSx = {
  p: 0,
  color: "#9CA3AF",
  "& .MuiSvgIcon-root": { fontSize: 16, borderRadius: "4px" },
  "&.Mui-checked, &.MuiCheckbox-indeterminate": { color: BLUE },
};

const toolbarIconBtnSx = {
  width: 34,
  height: 28,
  border: "none",
  borderRadius: "8px",
  backgroundColor: "white",
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  "&:hover": { backgroundColor: "#f9fafb" },
};

/* ─── Pagination helpers ─────────────────────────────────────────── */
const PAGE_SIZES = [25, 50, 100];

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
  const [goTo, setGoTo] = useState("");
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
      {/* Right: rows per page */}
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
          IconComponent={KeyboardArrowDown}
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

      {/* Centre: page numbers + go to page */}
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

/* ─── Status pill ────────────────────────────────────────────────── */
function StatusPill({ label, bg, fg }) {
  return (
    <Chip
      label={label}
      size="small"
      sx={{
        backgroundColor: bg,
        color: fg,
        fontWeight: 500,
        fontSize: 10.5,
        height: "auto",
        borderRadius: "4px",
        maxWidth: 80,
        "& .MuiChip-label": {
          px: 1,
          py: 0.4,
          whiteSpace: "normal",
          lineHeight: 1.25,
          textAlign: "center",
        },
      }}
    />
  );
}

/* ─── Sort comparers ─────────────────────────────────────────────── */
const toAmount = (s) =>
  parseFloat(String(s ?? "").replace(/[^0-9.-]/g, "")) || 0;
const parseMDY = (str) => {
  const m = String(str ?? "").match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/);
  if (!m) return null;
  const year = m[3].length === 2 ? 2000 + Number(m[3]) : Number(m[3]);
  return new Date(year, Number(m[1]) - 1, Number(m[2])).getTime();
};
const COMPARERS = {
  alpha: (a, b) =>
    String(a ?? "").localeCompare(String(b ?? ""), undefined, {
      sensitivity: "base",
      numeric: true,
    }),
  number: (a, b) => toAmount(a) - toAmount(b),
  date: (a, b) => (parseMDY(a) ?? 0) - (parseMDY(b) ?? 0),
};

function useSortedRows(rows, columns) {
  const [sort, setSort] = useState({ columnId: null, dir: null });

  const sortedRows = useMemo(() => {
    if (!sort.columnId || !sort.dir) return rows;
    const column = columns.find((c) => c.id === sort.columnId);
    if (!column?.sort) return rows;
    const factor = sort.dir === "asc" ? 1 : -1;
    const compare = COMPARERS[column.sort];
    const get = column.getValue || ((r) => r[column.id]);
    return [...rows].sort((a, b) => compare(get(a), get(b)) * factor);
  }, [rows, columns, sort]);

  const handleSort = (columnId) =>
    setSort((prev) => {
      if (prev.columnId !== columnId || !prev.dir)
        return { columnId, dir: "asc" };
      return { columnId, dir: prev.dir === "asc" ? "desc" : "asc" };
    });

  return { sort, sortedRows, handleSort };
}

/* ─── Sort header cell ───────────────────────────────────────────── */
function SortHeadCell({ column, sortDir, onSort, sx }) {
  const active = !!sortDir;
  return (
    <TableCell align="center" sx={sx}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 0.15,
        }}
      >
        <Box component="span" sx={{ lineHeight: 1.15 }}>
          {column.label}
        </Box>
        {column.sort && (
          <Tooltip
            title={
              active
                ? sortDir === "asc"
                  ? "Sorted A–Z"
                  : "Sorted Z–A"
                : "Sort"
            }
            arrow
          >
            <IconButton
              size="small"
              onClick={() => onSort(column.id)}
              sx={{
                p: 0.15,
                ml: "auto",
                flexShrink: 0,
                borderRadius: "6px",
                color: active ? SORT_BLUE : SORT_ARROW,
                bgcolor: active ? "#DCE7FD" : "transparent",
                "&:hover": { bgcolor: "#DCE7FD" },
              }}
            >
              <KeyboardArrowDown
                sx={{
                  fontSize: 13,
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

/* ─── Advanced filter field styles ──────────────────────────────── */
const HEAD_LABEL_SX = {
  fontSize: 10,
  fontWeight: 600,
  color: "#374151",
  mb: 0.3,
};
const appliedLabelSx = (applied) =>
  applied ? { ...HEAD_LABEL_SX, color: APPLIED_BORDER } : HEAD_LABEL_SX;

const filterSelectSx = {
  fontSize: 11,
  borderRadius: "6px",
  height: 32,
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#E5E7EB",
    borderRadius: "6px",
  },
  "& .MuiSelect-icon": { color: "#6B7280", fontSize: 18 },
  "& .MuiSelect-select": {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    py: 0,
    px: 0.8,
    height: 32,
    display: "flex",
    alignItems: "center",
  },
};

const filterFieldSx = {
  fontSize: 11,
  "& .MuiOutlinedInput-root": {
    fontSize: 11,
    borderRadius: "6px",
    height: 32,
    "& fieldset": { borderColor: "#E5E7EB", borderRadius: "6px" },
    "& input": { py: 0, px: 0.8, height: 32 },
  },
  "& .MuiInputAdornment-root": { ml: 0, mr: 0.3 },
};

function FilterSelect({
  label,
  value,
  onChange,
  options,
  placeholder = "Select",
  applied = false,
}) {
  return (
    <Box>
      <Typography sx={appliedLabelSx(applied)}>{label}</Typography>
      <FormControl fullWidth size="small">
        <Select
          displayEmpty
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          IconComponent={KeyboardArrowDown}
          renderValue={(v) =>
            v ? v : <span style={{ color: "#9CA3AF" }}>{placeholder}</span>
          }
          sx={[
            filterSelectSx,
            applied && {
              backgroundColor: APPLIED_BG,
              fontWeight: 600,
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: APPLIED_BORDER,
                borderWidth: "1px",
              },
              "& .MuiSelect-icon": { color: APPLIED_BORDER },
            },
          ]}
        >
          {options.map((s) => (
            <MenuItem key={s} value={s} sx={{ fontSize: 11 }}>
              {s}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

function FilterText({ label, value, onChange, applied = false }) {
  return (
    <Box>
      <Typography sx={appliedLabelSx(applied)}>{label}</Typography>
      <TextField
        fullWidth
        size="small"
        placeholder="Type"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        sx={[
          filterFieldSx,
          applied && {
            "& .MuiOutlinedInput-root": {
              backgroundColor: APPLIED_BG,
              fontWeight: 600,
              "& fieldset": { borderColor: APPLIED_BORDER, borderWidth: "1px" },
            },
          },
        ]}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" sx={{ m: 0 }}>
              <Search style={{ width: 13, height: 13 }} />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}

function FilterDate({ label, value, onChange, applied = false }) {
  const parsed =
    value && dayjs(value, "MM/DD/YYYY", true).isValid()
      ? dayjs(value, "MM/DD/YYYY", true)
      : null;
  return (
    <Box>
      <Typography sx={appliedLabelSx(applied)}>{label}</Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          value={parsed}
          onChange={(newValue) => {
            if (newValue && newValue.isValid())
              onChange(newValue.format("MM/DD/YYYY"));
            else onChange("");
          }}
          format="MM/DD/YYYY"
          slots={{
            openPickerIcon: () => <BlueCalendarIcon width={13} height={13} />,
          }}
          slotProps={{
            textField: {
              fullWidth: true,
              size: "small",
              sx: {
                "& .MuiPickersInputBase-root, & .MuiPickersOutlinedInput-root, & .MuiOutlinedInput-root":
                  {
                    height: 32,
                    minHeight: 32,
                    fontSize: 11,
                    borderRadius: "6px",
                    paddingRight: "8px",
                    backgroundColor: applied ? APPLIED_BG : "transparent",
                    fontWeight: applied ? 600 : 400,
                  },
                "& .MuiPickersOutlinedInput-notchedOutline, & .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: applied ? APPLIED_BORDER : "#E5E7EB",
                    borderRadius: "6px",
                  },
                "& .MuiPickersInputBase-sectionsContainer": {
                  padding: 0,
                  paddingLeft: "6px",
                  height: 32,
                  display: "flex",
                  alignItems: "center",
                  fontSize: 11,
                  lineHeight: 1,
                },
                "& .MuiPickersSectionList-root": { padding: 0, fontSize: 11 },
                "& .MuiInputBase-input": {
                  padding: "0 0 0 6px",
                  height: 32,
                  fontSize: 11,
                  boxSizing: "border-box",
                },
                "& .MuiInputAdornment-root": { ml: 0, mr: 0 },
              },
            },
            openPickerButton: { sx: { p: 0, mr: 0 } },
          }}
        />
      </LocalizationProvider>
    </Box>
  );
}

/* ─── Sample data ────────────────────────────────────────────────── */
const REPORT_STATUS_STYLES = {
  "Not posted": { bg: "#FDF1DC", fg: "#B45309" },
  Posted: { bg: "#DFF5EA", fg: "#1E7F55" },
  "Partially posted": { bg: "#FFF3E0", fg: "#F57C00" },
  "Fully posted": { bg: "#B2DFDB", fg: "#00695C" },
  "Mark as review": { bg: "#E1BEE7", fg: "#6A1B9A" },
};

const REPORT_SAMPLE = [
  [
    "1234567",
    "GCH-IH",
    "Aetna",
    "Cheque",
    "ERA",
    "14315316136",
    "$455",
    "11/20/2025",
    "11/20/2025",
    3,
    "$0",
    "Not posted",
  ],
];

/* 10 rows of the same Aetna row (as in the design) */
const reportData = Array.from({ length: 10 }, (_, idx) => {
  const [
    id,
    location,
    payer,
    paymentMethod,
    eraEob,
    chequeNo,
    amount,
    checkDate,
    receivedDate,
    claimNumbers,
    unpostedAmount,
    status,
  ] = REPORT_SAMPLE[0];
  return {
    id: idx + 1,
    reportId: id,
    location,
    payer,
    paymentMethod,
    eraEob,
    chequeNo,
    amount,
    checkDate,
    receivedDate,
    claimNumbers,
    unpostedAmount,
    status,
    // used by the filter panel (not shown as table columns)
    provider: "Ramesh M. MD",
    patientName: "Cook, Lisha",
  };
});

/* ─── Column definitions ─────────────────────────────────────────── */
const COLUMNS = [
  { id: "reportId", label: "ID", sort: "number" },
  { id: "location", label: "Location", sort: "alpha" },
  { id: "payer", label: "Payer", sort: "alpha" },
  { id: "paymentMethod", label: "Payment\nMethod", sort: "alpha" },
  { id: "eraEob", label: "ERA/\nEOB" },
  { id: "chequeNo", label: "Cheque #" },
  { id: "amount", label: "Amount", sort: "number" },
  { id: "checkDate", label: "Check\nDate", sort: "date" },
  { id: "receivedDate", label: "Received\nDate", sort: "date" },
  { id: "claimNumbers", label: "Claim\nNumbers", sort: "number" },
  { id: "unpostedAmount", label: "Unposted\nAmount", sort: "number" },
  {
    id: "status",
    label: "Status",
    render: (row) => {
      const s =
        REPORT_STATUS_STYLES[row.status] || REPORT_STATUS_STYLES["Not posted"];
      return <StatusPill label={row.status} bg={s.bg} fg={s.fg} />;
    },
  },
  {
    id: "action",
    label: "Action",
    render: (row, ctx) => (
      <Box
        sx={{
          display: "flex",
          gap: 0.5,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Tooltip title="Refresh" placement="top">
          <IconButton
            size="small"
            sx={{ padding: "2px" }}
            onClick={() => ctx?.onRefresh?.(row)}
          >
            <RefreshIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="View" placement="top">
          <IconButton size="small" sx={{ padding: "4px" }}>
            <ViewIconRemittance />
          </IconButton>
        </Tooltip>
        <Tooltip title="Download" placement="top">
          <IconButton size="small" sx={{ padding: "4px" }}>
            <DownloadIconRemittance />
          </IconButton>
        </Tooltip>
      </Box>
    ),
  },
];

/* ─── EMPTY_FILTERS ──────────────────────────────────────────────── */
const EMPTY_FILTERS = {
  provider: "",
  serviceLocation: "",
  patientName: "",
  claimEncounterId: "",
  dosFrom: "",
  dosTill: "",
};

const PROVIDER_OPTIONS = [
  "Ramesh M. MD",
  "Sarah K. MD",
  "David L. MD",
  "Emily R. MD",
];
const LOCATION_OPTIONS = ["GCH-IH", "GCH-OH", "Main Campus", "North Branch"];

/* ─── CSV export ─────────────────────────────────────────────────── */
const csvCell = (val) => {
  const str = String(val ?? "");
  return /[",\n\r]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
};

function exportToCsv(columns, rows, filename) {
  // the action column has nothing to export
  const exportCols = columns.filter(
    (c) => c.id !== "action" && c.id !== "actions",
  );
  const header = exportCols
    .map((c) => csvCell(String(c.label).replace(/\s*\n\s*/g, " ")))
    .join(",");
  const body = rows
    .map((row) => exportCols.map((c) => csvCell(row[c.id])).join(","))
    .join("\n");
  // "\uFEFF" lets Excel open UTF-8 text correctly
  const blob = new Blob(["\uFEFF" + header + "\n" + body], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

const today = () => new Date().toISOString().slice(0, 10);

/* rows kept in localStorage: a deleted / reviewed report stays that way after
   a page refresh. Replace with your API later.                              */
const usePersistedRows = (key, initial) => {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      const parsed = raw ? JSON.parse(raw) : null;
      if (Array.isArray(parsed)) return parsed;
    } catch {
      /* ignore */
    }
    return initial;
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage full / blocked -> keep working in memory */
    }
  }, [key, value]);
  return [value, setValue];
};

/* Snackbar colours: Add = green, Update = blue, Delete = red */
const NOTICE_STYLE = {
  add: { severity: "success", color: "#2E7D32" },
  update: { severity: "info", color: "#1976D2" },
  delete: { severity: "error", color: "#D32F2F" },
};

/* ─── Main component ─────────────────────────────────────────────── */
export default function Reports() {
  /* filter panel visibility */
  const [showFilters, setShowFilters] = useState(false);
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [activeFilterCount, setActiveFilterCount] = useState(0);

  /* filter form state */
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [pendingFilters, setPendingFilters] = useState(EMPTY_FILTERS);

  /* selection */
  const [selected, setSelected] = useState([]);

  /* pagination */
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(PAGE_SIZES[0]);

  /* select-action menu */
  const [actionAnchor, setActionAnchor] = useState(null);

  /* rows (kept in localStorage so delete / review survive a refresh) */
  const [rows, setRows] = usePersistedRows("reports:v2", reportData);

  /* Snackbar (bottom-right, 3 sec) */
  const [notice, setNotice] = useState({
    open: false,
    message: "",
    type: "add",
  });
  const showNotice = (message, type) =>
    setNotice({ open: true, message, type });
  const handleNoticeClose = (_, reason) => {
    if (reason === "clickaway") return;
    setNotice((prev) => ({ ...prev, open: false }));
  };

  /* sort */
  const { sort, sortedRows, handleSort } = useSortedRows(rows, COLUMNS);

  /* filter rows */
  const filteredRows = useMemo(() => {
    const nameWords = filters.patientName
      .toLowerCase()
      .replace(/,/g, " ")
      .split(/\s+/)
      .filter(Boolean);
    const from = parseMDY(filters.dosFrom);
    const till = parseMDY(filters.dosTill);

    return sortedRows.filter((row) => {
      if (filters.provider && row.provider !== filters.provider) return false;
      if (filters.serviceLocation && row.location !== filters.serviceLocation)
        return false;
      // "Lisha Cook" also finds "Cook, Lisha"
      if (nameWords.length) {
        const nameText = String(row.patientName ?? "")
          .toLowerCase()
          .replace(/,/g, " ");
        if (!nameWords.every((w) => nameText.includes(w))) return false;
      }
      if (
        filters.claimEncounterId &&
        !row.reportId.includes(filters.claimEncounterId)
      )
        return false;
      const d = parseMDY(row.checkDate);
      if (from !== null && (d === null || d < from)) return false;
      if (till !== null && (d === null || d > till)) return false;
      return true;
    });
  }, [sortedRows, filters]);

  /* paged rows */
  const pagedRows = filteredRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  useEffect(() => {
    setPage(0);
  }, [filteredRows.length]);

  /* selection helpers */
  const allSelected =
    filteredRows.length > 0 &&
    filteredRows.every((r) => selected.includes(r.id));
  const someSelected = selected.length > 0 && !allSelected;

  const toggleAll = (checked) =>
    setSelected(checked ? filteredRows.map((r) => r.id) : []);
  const toggleRow = (id) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  /* export: everything the table matches (filters + sort), not only this page */
  const handleExport = () =>
    exportToCsv(COLUMNS, filteredRows, `reports_${today()}.csv`);

  /* "Select Action" menu */
  const handleActionItem = (item) => {
    setActionAnchor(null);
    const count = selected.length;
    if (!count) return;

    if (item === "Export Selected") {
      exportToCsv(
        COLUMNS,
        rows.filter((r) => selected.includes(r.id)),
        `reports-selected_${today()}.csv`,
      );
    } else if (item === "Delete Selected") {
      setRows((prev) => prev.filter((r) => !selected.includes(r.id)));
      setSelected([]);
      showNotice(
        count === 1
          ? "Report deleted successfully"
          : "Reports deleted successfully",
        "delete",
      );
    } else if (item === "Mark as Reviewed") {
      setRows((prev) =>
        prev.map((r) =>
          selected.includes(r.id) ? { ...r, status: "Mark as review" } : r,
        ),
      );
      showNotice(
        count === 1
          ? "Report updated successfully"
          : "Reports updated successfully",
        "update",
      );
    }
  };

  /* filter helpers */
  const countActiveFilters = (f) => Object.values(f).filter(Boolean).length;

  const handleSearch = () => {
    setFilters(pendingFilters);
    const count = countActiveFilters(pendingFilters);
    setActiveFilterCount(count);
    setFiltersApplied(count > 0);
  };

  const handleReset = () => {
    setPendingFilters(EMPTY_FILTERS);
    setFilters(EMPTY_FILTERS);
    setFiltersApplied(false);
    setActiveFilterCount(0);
  };

  const setPendingField = (key) => (value) =>
    setPendingFilters((prev) => ({ ...prev, [key]: value }));

  /* ctx passed to column renderers */
  const ctx = { onRefresh: (row) => console.log("Refresh", row) };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        maxHeight: "100vh",
        backgroundColor: "#F8FAFC",
        overflow: "hidden",
      }}
    >
      {/* ── Top bar ─────────────────────────────────────────────── */}
      <Box
        sx={{
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2.5,
          py: 1.25,
          backgroundColor: "#FFFFFF",
          borderBottom: "1px solid #E5E7EB",
          gap: 1.5,
        }}
      >
        <Typography sx={{ fontWeight: 700, fontSize: 16, color: "#111827" }}>
          Report Name
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {/* Advanced filters toggle */}
          <Button
            variant="outlined"
            size="small"
            startIcon={showFilters ? null : <FilterIcon1 />}
            onClick={() => setShowFilters((v) => !v)}
            sx={{
              textTransform: "none",
              fontSize: 11,
              fontWeight: 600,
              height: 28,
              px: 1.5,
              borderRadius: "8px",
              color: showFilters ? "#1976d2" : "#1e293b",
              borderColor: showFilters ? "#1976d2" : "#e2e8f0",
              backgroundColor: "white",
              gap: 0.5,
              "&:hover": {
                borderColor: showFilters ? "#1976d2" : "#cbd5e1",
                backgroundColor: "#f8fafc",
              },
            }}
          >
            {showFilters ? "× " : ""}Advanced filters
            {activeFilterCount > 0 && (
              <Box
                component="span"
                sx={{
                  ml: 0.5,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  backgroundColor: BLUE,
                  color: "#fff",
                  fontSize: 9,
                  fontWeight: 700,
                }}
              >
                {activeFilterCount}
              </Box>
            )}
          </Button>

          {/* Settings */}
          <IconButton
            size="small"
            aria-label="Column settings"
            sx={toolbarIconBtnSx}
          >
            <SettingsIcon />
          </IconButton>

          {/* Select Action */}
          <Button
            variant="outlined"
            size="small"
            endIcon={<KeyboardArrowDown sx={{ fontSize: 14 }} />}
            onClick={(e) => setActionAnchor(e.currentTarget)}
            sx={{
              textTransform: "none",
              color: "#1e293b",
              borderColor: "#e2e8f0",
              backgroundColor: "white",
              fontWeight: 600,
              fontSize: 11,
              height: 28,
              px: 1.5,
              borderRadius: "8px",
              "&:hover": { borderColor: "#cbd5e1", backgroundColor: "#f8fafc" },
            }}
          >
            Select Action
          </Button>
          {/* Action menu */}
          {actionAnchor && (
            <Box
              component="ul"
              sx={{
                position: "fixed",
                zIndex: 1300,
                top: actionAnchor.getBoundingClientRect().bottom + 4,
                left: actionAnchor.getBoundingClientRect().left,
                m: 0,
                p: "4px 0",
                listStyle: "none",
                backgroundColor: "#fff",
                border: "1px solid #E5E7EB",
                borderRadius: "8px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                minWidth: 160,
              }}
              onMouseLeave={() => setActionAnchor(null)}
            >
              {["Export Selected", "Delete Selected", "Mark as Reviewed"].map(
                (item) => {
                  const disabled = selected.length === 0;
                  return (
                    <Box
                      component="li"
                      key={item}
                      onClick={() => !disabled && handleActionItem(item)}
                      sx={{
                        fontSize: 11,
                        px: 2,
                        py: 0.75,
                        cursor: disabled ? "not-allowed" : "pointer",
                        opacity: disabled ? 0.45 : 1,
                        "&:hover": {
                          backgroundColor: disabled ? "transparent" : "#F3F4F6",
                        },
                      }}
                    >
                      {item}
                    </Box>
                  );
                },
              )}
            </Box>
          )}

          {/* Submit E-claim */}
          <Button
            variant="outlined"
            size="small"
            sx={{
              textTransform: "none",
              color: "#1e293b",
              borderColor: "#e2e8f0",
              backgroundColor: "white",
              fontWeight: 600,
              fontSize: 11,
              height: 28,
              px: 1.5,
              borderRadius: "8px",
              "&:hover": { borderColor: "#cbd5e1", backgroundColor: "#f8fafc" },
            }}
          >
            Submit E-claim
          </Button>

          {/* Export */}
          <Button
            variant="contained"
            size="small"
            onClick={handleExport}
            sx={{
              textTransform: "none",
              backgroundColor: BLUE,
              color: "#fff",
              fontWeight: 600,
              fontSize: 11,
              height: 28,
              px: 1.75,
              borderRadius: "8px",
              boxShadow: "none",
              "&:hover": { backgroundColor: "#0052CC", boxShadow: "none" },
            }}
          >
            Export
          </Button>
        </Box>
      </Box>

      {/* ── Advanced Filters panel ───────────────────────────────── */}
      {showFilters && (
        <Box
          sx={{
            flexShrink: 0,
            mx: 2.5,
            mt: 1.5,
            p: 1.75,
            backgroundColor: "#FFFFFF",
            border: "1px solid #E5E7EB",
            borderRadius: "10px",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr 1fr",
                md: "1fr 1fr 1fr 1fr 1fr 1fr",
              },
              gap: 1.5,
              mb: 1.5,
            }}
          >
            <FilterSelect
              label="Select Provider"
              value={pendingFilters.provider}
              onChange={setPendingField("provider")}
              options={PROVIDER_OPTIONS}
              applied={filtersApplied && !!filters.provider}
            />
            <FilterSelect
              label="Service Location"
              value={pendingFilters.serviceLocation}
              onChange={setPendingField("serviceLocation")}
              options={LOCATION_OPTIONS}
              applied={filtersApplied && !!filters.serviceLocation}
            />
            <FilterText
              label="Patient Name"
              value={pendingFilters.patientName}
              onChange={setPendingField("patientName")}
              applied={filtersApplied && !!filters.patientName}
            />
            <FilterText
              label="Claim/Encounter ID"
              value={pendingFilters.claimEncounterId}
              onChange={setPendingField("claimEncounterId")}
              applied={filtersApplied && !!filters.claimEncounterId}
            />
            <FilterDate
              label="DOS From"
              value={pendingFilters.dosFrom}
              onChange={setPendingField("dosFrom")}
              applied={filtersApplied && !!filters.dosFrom}
            />
            <FilterDate
              label="DOS Till"
              value={pendingFilters.dosTill}
              onChange={setPendingField("dosTill")}
              applied={filtersApplied && !!filters.dosTill}
            />
          </Box>

          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="contained"
              size="small"
              onClick={handleSearch}
              sx={{
                textTransform: "none",
                backgroundColor: BLUE,
                color: "#fff",
                fontWeight: 600,
                fontSize: 11,
                height: 28,
                px: 2,
                borderRadius: "6px",
                boxShadow: "none",
                "&:hover": { backgroundColor: "#0052CC", boxShadow: "none" },
              }}
            >
              Search
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={handleReset}
              sx={{
                textTransform: "none",
                color: "#1F2937",
                borderColor: "#E5E7EB",
                backgroundColor: "#FFFFFF",
                fontWeight: 500,
                fontSize: 11,
                height: 28,
                px: 2,
                borderRadius: "6px",
                "&:hover": {
                  borderColor: "#D1D5DB",
                  backgroundColor: "#F9FAFB",
                },
              }}
            >
              Reset
            </Button>
          </Box>
        </Box>
      )}

      {/* ── Table ───────────────────────────────────────────────── */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          mx: 2.5,
          mt: 1.5,
          mb: 1.5,
          border: "1px solid #E5E7EB",
          borderRadius: "10px",
          backgroundColor: "#FFFFFF",
          overflow: "hidden",
        }}
      >
        <TableContainer
          component={Paper}
          sx={{
            flex: 1,
            minHeight: 0,
            overflow: "auto",
            boxShadow: "none",
            borderRadius: 0,
            ...thinScroll,
          }}
        >
          <Table size="small" stickyHeader sx={{ minWidth: 1200 }}>
            <TableHead>
              <TableRow>
                {/* Checkbox header */}
                <TableCell padding="checkbox" sx={{ ...thSx, width: 40 }}>
                  <Checkbox
                    size="small"
                    sx={checkboxSx}
                    indeterminate={someSelected}
                    checked={allSelected}
                    onChange={(e) => toggleAll(e.target.checked)}
                  />
                </TableCell>

                {COLUMNS.map((col) => (
                  <SortHeadCell
                    key={col.id}
                    column={col}
                    sortDir={sort.columnId === col.id ? sort.dir : null}
                    onSort={handleSort}
                    sx={thSx}
                  />
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {pagedRows.length === 0 && (
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

              {pagedRows.map((row) => {
                const isSel = selected.includes(row.id);
                return (
                  <TableRow
                    key={row.id}
                    selected={isSel}
                    sx={{
                      backgroundColor: isSel ? "#EEF3FE" : "transparent",
                      "&:hover": {
                        backgroundColor: isSel ? "#EEF3FE" : "#F9FAFB",
                      },
                    }}
                  >
                    <TableCell
                      padding="checkbox"
                      sx={tdSx}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Checkbox
                        size="small"
                        sx={checkboxSx}
                        checked={isSel}
                        onChange={() => toggleRow(row.id)}
                      />
                    </TableCell>

                    {COLUMNS.map((col) => (
                      <TableCell
                        key={col.id}
                        align="center"
                        sx={{
                          ...tdSx,
                          ...(typeof col.cellSx === "function"
                            ? col.cellSx(row)
                            : col.cellSx),
                        }}
                      >
                        {col.render ? col.render(row, ctx) : row[col.id]}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <PaginationBar
          count={filteredRows.length}
          page={page}
          onPageChange={setPage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(Number(e.target.value));
            setPage(0);
          }}
        />
      </Box>

      {/* SNACKBAR: Bottom-Right, 3 sec (Add = green, Update = blue, Delete = red) */}
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={notice.open}
        autoHideDuration={3000}
        onClose={handleNoticeClose}
      >
        <Alert
          onClose={handleNoticeClose}
          severity={NOTICE_STYLE[notice.type]?.severity ?? "success"}
          variant="filled"
          sx={{
            width: "100%",
            fontSize: 12,
            alignItems: "center",
            color: "#fff",
            backgroundColor: (NOTICE_STYLE[notice.type] ?? NOTICE_STYLE.add)
              .color,
            "& .MuiAlert-icon": { color: "#fff" },
          }}
        >
          {notice.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
