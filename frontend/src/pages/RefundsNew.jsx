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
  Badge,
  Dialog,
  DialogContent,
  Select,
  MenuItem,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import CloseIcon from "@mui/icons-material/Close";
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
  page: "#F5F7FA",
  headText: "#1e293b",
  headSymbol: "#52525B",
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
/* Dummy rows                                                           */
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
  (
    [
      patientName,
      patientId,
      dob,
      refundId,
      phone,
      refundAmount,
      lastUpdated,
      description,
      status,
      refundMode,
    ],
    id,
  ) => ({
    id,
    patientName,
    patientId,
    dob,
    refundId,
    phone,
    refundAmount,
    lastUpdated,
    description,
    status,
    refundMode,
  }),
);

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
  (
    [
      patientName,
      patientId,
      dob,
      refundId,
      phone,
      refundAmount,
      lastUpdated,
      description,
      status,
    ],
    id,
  ) => ({
    id,
    patientName,
    patientId,
    dob,
    refundId,
    phone,
    refundAmount,
    lastUpdated,
    description,
    status,
  }),
);

/* ------------------------------------------------------------------ */
/* Table columns                                                        */
/* sort: "alpha" = A-Z, "number" = amount, "date" = DD/MM/YYYY          */
/* (remove `sort` to disable sorting on a column)                       */
/* ------------------------------------------------------------------ */
const NEW_COLUMNS = [
  { id: "patientName", label: "Patient Name" },
  { id: "patientId", label: "Patient ID" },
  { id: "dob", label: "DOB" },
  { id: "refundId", label: "Refund ID" },
  { id: "phone", label: "Phone Number" },
  { id: "refundAmount", label: "Refund Amt" },
  { id: "lastUpdated", label: "Last Updated" },
  { id: "description", label: "Description" },
  { id: "status", label: "Status" },
  { id: "refundMode", label: "Refund Mode" },
  { id: "actions", label: "Action", last: true },
];

const HISTORY_COLUMNS = [
  { id: "patientName", label: "Patient Name" },
  { id: "patientId", label: "Patient ID" },
  { id: "dob", label: "DOB" },
  { id: "refundId", label: "Refund ID" },
  { id: "phone", label: "Phone Number" },
  { id: "refundAmount", label: "Refund Amount" },
  { id: "lastUpdated", label: "Last Updated" },
  { id: "description", label: "Description" },
  { id: "status", label: "Status" },
  { id: "actions", label: "Action", last: true },
];

const STATUS_OPTIONS = [
  ...new Set([...NEW_ROWS, ...HISTORY_ROWS].map((r) => r.status)),
].sort((a, b) => a.localeCompare(b));

const REFUND_MODE_OPTIONS = [
  ...new Set(NEW_ROWS.map((r) => r.refundMode)),
].sort((a, b) => a.localeCompare(b));

/* ------------------------------------------------------------------ */
/* Search + filter helper                                               */
/* ------------------------------------------------------------------ */
const filterRows = (rows, query, status, refundMode) => {
  const q = query.trim().toLowerCase();
  return rows.filter((row) => {
    const matchesSearch =
      !q ||
      Object.entries(row).some(
        ([key, value]) =>
          key !== "id" && String(value).toLowerCase().includes(q),
      );
    const matchesStatus = !status || row.status === status;
    const matchesMode = !refundMode || row.refundMode === refundMode;
    return matchesSearch && matchesStatus && matchesMode;
  });
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
  alpha: (a, b) =>
    String(a).localeCompare(String(b), undefined, { sensitivity: "base" }),
  number: (a, b) => toAmount(a) - toAmount(b),
  date: (a, b) => parseDMY(a) - parseDMY(b),
};

const SORT_TITLES = {
  alpha: { asc: "Sorted A–Z", desc: "Sorted Z–A", none: "Sort A–Z" },
  number: {
    asc: "Sorted low to high",
    desc: "Sorted high to low",
    none: "Sort low to high",
  },
  date: {
    asc: "Sorted oldest first",
    desc: "Sorted newest first",
    none: "Sort oldest first",
  },
};

/* ------------------------------------------------------------------ */
/* CSV download helper                                                  */
/* ------------------------------------------------------------------ */
function exportToCSV(columns, rows, filename = "refunds.csv") {
  // exclude the "actions" column — nothing meaningful to export
  const exportCols = columns.filter((c) => c.id !== "actions");

  const escape = (val) => {
    const str = String(val ?? "");
    // wrap in quotes if the value contains comma, quote, or newline
    return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
  };

  const header = exportCols.map((c) => escape(c.label)).join(",");
  const body = rows
    .map((row) => exportCols.map((c) => escape(row[c.id])).join(","))
    .join("\n");

  const csv = `${header}\n${body}`;
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/* ------------------------------------------------------------------ */
/* Column options for the "Customise columns" dialog                    */
/* "actions" is always shown, not toggleable                            */
/* ------------------------------------------------------------------ */
const NEW_COLUMN_OPTIONS = [
  { key: "patientName", label: "Patient Name" },
  { key: "patientId", label: "Patient ID" },
  { key: "dob", label: "DOB" },
  { key: "refundId", label: "Refund ID" },
  { key: "phone", label: "Phone Number" },
  { key: "refundAmount", label: "Refund Amt" },
  { key: "lastUpdated", label: "Last Updated" },
  { key: "description", label: "Description" },
  { key: "status", label: "Status" },
  { key: "refundMode", label: "Refund Mode" },
];

const HISTORY_COLUMN_OPTIONS = [
  { key: "patientName", label: "Patient Name" },
  { key: "patientId", label: "Patient ID" },
  { key: "dob", label: "DOB" },
  { key: "refundId", label: "Refund ID" },
  { key: "phone", label: "Phone Number" },
  { key: "refundAmount", label: "Refund Amount" },
  { key: "lastUpdated", label: "Last Updated" },
  { key: "description", label: "Description" },
  { key: "status", label: "Status" },
];

const buildVisibility = (options, value = true) =>
  Object.fromEntries(options.map((c) => [c.key, value]));

/* ------------------------------------------------------------------ */
/* Customise Columns Dialog                                             */
/* ------------------------------------------------------------------ */
function ColumnSettingsDialog({ open, onClose, options, visible, setVisible }) {
  /* work on a draft so Cancel truly cancels */
  const [draft, setDraft] = React.useState(visible);

  React.useEffect(() => {
    if (open) setDraft({ ...visible });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const shownCount = Object.values(draft).filter(Boolean).length;

  const handleSave = () => {
    setVisible(draft);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: "100%",
          maxWidth: 420,
          borderRadius: "22px",
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
          m: 2,
        },
      }}
    >
      {/* ── Header ── */}
      <Box sx={{ px: 2.5, pt: 2.2, pb: 1.2 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            mb: 0.5,
          }}
        >
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 700,
              color: "#1F2937",
              lineHeight: 1.25,
            }}
          >
            Customise columns
          </Typography>
          <IconButton
            size="small"
            onClick={onClose}
            sx={{
              p: 0.3,
              color: "#111827",
              mt: -0.3,
              mr: -0.3,
              "&:hover": { bgcolor: "#F3F4F6" },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <Typography
          sx={{ fontSize: 11, color: "#171923", mb: 1.5, lineHeight: 1.4 }}
        >
          Choose which columns to show.
        </Typography>

        {/* Select all / Clear all + count */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            {[
              ["Select all", true],
              ["Clear All", false],
            ].map(([label, val]) => (
              <Typography
                key={label}
                onClick={() => setDraft(buildVisibility(options, val))}
                sx={{
                  fontSize: 10,
                  fontWeight: 600,
                  color: "#0066FF",
                  cursor: "pointer",
                }}
              >
                {label}
              </Typography>
            ))}
          </Box>
          <Typography sx={{ fontSize: 10, color: "#171923" }}>
            {shownCount} of {options.length} shown
          </Typography>
        </Box>
      </Box>

      {/* ── Column list ── */}
      <Box
        sx={{
          px: 2.5,
          pb: 1,
          maxHeight: 340,
          overflowY: "auto",
          scrollbarWidth: "thin",
          "&::-webkit-scrollbar": { width: 4 },
          "&::-webkit-scrollbar-thumb": { bgcolor: "#D1D5DB", borderRadius: 2 },
        }}
      >
        {options.map((col) => (
          <Box
            key={col.key}
            onClick={() =>
              setDraft((prev) => ({ ...prev, [col.key]: !prev[col.key] }))
            }
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              height: 34,
              px: 1,
              mb: 0.5,
              bgcolor: "#F5F5F5",
              borderRadius: "8px",
              cursor: "pointer",
              "&:hover": { bgcolor: "#EBEBEB" },
            }}
          >
            {/* 6-dot drag handle (decorative) */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "2px",
                mr: 0.4,
                flexShrink: 0,
                width: 10,
              }}
            >
              {[...Array(6)].map((_, i) => (
                <Box
                  key={i}
                  sx={{
                    width: 3,
                    height: 3,
                    borderRadius: "50%",
                    bgcolor: "#0066FF",
                  }}
                />
              ))}
            </Box>

            <Checkbox
              size="small"
              checked={draft[col.key] ?? true}
              onChange={(e) => {
                e.stopPropagation();
                setDraft((prev) => ({ ...prev, [col.key]: e.target.checked }));
              }}
              onClick={(e) => e.stopPropagation()}
              sx={{
                p: 0,
                color: "#C8CDD8",
                flexShrink: 0,
                "&.Mui-checked": { color: "#0066FF" },
                "& svg": { fontSize: 16 },
              }}
            />

            <Typography
              sx={{
                fontSize: 10,
                fontWeight: 500,
                color: "#374151",
                lineHeight: 1,
                whiteSpace: "nowrap",
              }}
            >
              {col.label}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* ── Footer ── */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2.5,
          py: 1.5,
          borderTop: "1px solid #F1F5F9",
          flexShrink: 0,
        }}
      >
        <Button
          variant="outlined"
          onClick={() => {
            setDraft(buildVisibility(options, true));
          }}
          sx={{
            textTransform: "none",
            fontSize: 11,
            fontWeight: 500,
            color: "#2B2842",
            bgcolor: "#fff",
            border: "1px solid #E5E7EB",
            borderRadius: "7px",
            height: 30,
            px: 1.5,
            "&:hover": { bgcolor: "#F9FAFB", borderColor: "#D1D5DB" },
          }}
        >
          Reset to default
        </Button>

        <Box sx={{ display: "flex", gap: 0.8 }}>
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              textTransform: "none",
              fontSize: 11,
              fontWeight: 500,
              color: "#2B2842",
              bgcolor: "#fff",
              border: "1px solid #E5E7EB",
              borderRadius: "7px",
              height: 30,
              px: 1.5,
              "&:hover": { bgcolor: "#F9FAFB", borderColor: "#D1D5DB" },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            disableElevation
            onClick={handleSave}
            sx={{
              textTransform: "none",
              fontSize: 11,
              fontWeight: 500,
              bgcolor: "#0066FF",
              color: "#fff",
              borderRadius: "7px",
              height: 30,
              px: 1.5,
              "&:hover": { bgcolor: "#0052CC" },
            }}
          >
            Save View
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}

/* asc <-> desc only. setSort is exposed so the dialog can control it too */
function useSortedRows(rows, columns) {
  const [sort, setSort] = React.useState({ columnId: null, dir: null });

  const sortedRows = React.useMemo(() => {
    if (!sort.columnId || !sort.dir) return rows;
    const column = columns.find((c) => c.id === sort.columnId);
    if (!column?.sort) return rows;
    const factor = sort.dir === "asc" ? 1 : -1;
    const compare = COMPARERS[column.sort];
    return [...rows].sort(
      (a, b) => compare(a[sort.columnId], b[sort.columnId]) * factor,
    );
  }, [rows, columns, sort]);

  const handleSort = (columnId) =>
    setSort((prev) => {
      if (prev.columnId !== columnId || !prev.dir)
        return { columnId, dir: "asc" };
      return { columnId, dir: prev.dir === "asc" ? "desc" : "asc" };
    });

  return { sort, setSort, sortedRows, handleSort };
}

/* ------------------------------------------------------------------ */
/* Cell styles (same as Locations / ReferringProvider / PreBillingClaim)*/
/*   head : fontSize 10, bold, py 0.4, px 0.4, minHeight 28             */
/*   body : fontSize 10.5, py 0.5, px 0.3, height 32                    */
/* ------------------------------------------------------------------ */
const listHeadSx = {
  fontWeight: 700,
  fontSize: 10,
  color: T.headText,
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

/* same checkbox look as Locations */
const checkboxSx = {
  p: 0,
  color: "#C8D0DC",
  "&.Mui-checked, &.MuiCheckbox-indeterminate": { color: T.blue },
  "& svg": { fontSize: 18 },
};

/* narrow checkbox column */
const checkCellSx = {
  width: 42,
  minWidth: 42,
  maxWidth: 42,
  px: 0,
};

/* toolbar icon buttons (Settings / Download) */
const iconBtnSx = {
  width: 40,
  height: 28,
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
        ...listHeadSx,
        borderRight: column.last ? "none" : `1px solid ${T.border}`,
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
        <Box component="span" sx={{ lineHeight: 1.15 }}>
          {column.label}
        </Box>
        {column.sort && (
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
              <KeyboardArrowDownIcon
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

/* ------------------------------------------------------------------ */
/* Row actions + status chip                                            */
/* ------------------------------------------------------------------ */
function RowActions() {
  return (
    <Stack
      direction="row"
      spacing={0.5}
      alignItems="center"
      justifyContent="center"
    >
      <Tooltip title="Info" arrow>
        <IconButton
          size="small"
          aria-label="Info"
          sx={{ p: "4px", color: T.blue, "&:hover": { bgcolor: "#EEF4FF" } }}
        >
          <InfoOutlinedIcon width={18} height={18} color={T.blue} />
        </IconButton>
      </Tooltip>

      <Tooltip title="Delete" arrow>
        <IconButton
          size="small"
          aria-label="Delete"
          sx={{ p: "4px", color: T.blue, "&:hover": { bgcolor: "#EEF4FF" } }}
        >
          <RPDeleteIcon width={18} height={18} color={T.blue} />
        </IconButton>
      </Tooltip>
    </Stack>
  );
}

function StatusChip({ label }) {
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        px: 1,
        py: 0.2,
        borderRadius: "6px",
        bgcolor: "#EEF4FF",
        color: T.blue,
        fontSize: 10.5,
        fontWeight: 600,
      }}
    >
      {label}
    </Box>
  );
}

/* renders one body cell by column id */
function renderCell(col, row) {
  switch (col.id) {
    case "patientName":
      return (
        <TableCell key={col.id} sx={{ ...listCellSx, fontWeight: 600 }}>
          {row.patientName}
        </TableCell>
      );
    case "refundAmount":
      return (
        <TableCell
          key={col.id}
          sx={{ ...listCellSx, color: "#8A5B12", fontWeight: 500 }}
        >
          {row.refundAmount}
        </TableCell>
      );
    case "status":
      return (
        <TableCell key={col.id} sx={listCellSx}>
          <StatusChip label={row.status} />
        </TableCell>
      );
    case "actions":
      return (
        <TableCell key={col.id} sx={listCellSx}>
          <RowActions />
        </TableCell>
      );
    default:
      return (
        <TableCell key={col.id} sx={listCellSx}>
          {row[col.id]}
        </TableCell>
      );
  }
}

/* ------------------------------------------------------------------ */
/* Data table (shared by New + History)                                 */
/* border box: rows scroll inside, header stays sticky,                 */
/* pagination stays pinned at the bottom                                */
/* ------------------------------------------------------------------ */
function DataTable({ columns, rows, sort, onSort }) {
  const [selected, setSelected] = React.useState([]);

  // pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(PAGE_SIZES[0]);

  // go back to page 1 whenever search / filter changes the number of rows
  React.useEffect(() => {
    setPage(0);
  }, [rows.length]);

  const pagedRows = rows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  // select-all works on the rows of the current page
  const allSelected =
    pagedRows.length > 0 && pagedRows.every((r) => selected.includes(r.id));
  const someSelected =
    pagedRows.some((r) => selected.includes(r.id)) && !allSelected;

  const handleSelectAll = (e) => {
    const pageIds = pagedRows.map((r) => r.id);
    setSelected((prev) =>
      e.target.checked
        ? [...new Set([...prev, ...pageIds])]
        : prev.filter((id) => !pageIds.includes(id)),
    );
  };

  const handleSelect = (id) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  return (
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
              <TableCell
                padding="checkbox"
                sx={{ ...listHeadSx, ...checkCellSx }}
              >
                <Checkbox
                  size="small"
                  checked={allSelected}
                  indeterminate={someSelected}
                  onChange={handleSelectAll}
                  inputProps={{ "aria-label": "Select all refunds" }}
                  sx={checkboxSx}
                />
              </TableCell>
              {columns.map((col) => (
                <HeaderCell
                  key={col.id}
                  column={col}
                  sortDir={sort.columnId === col.id ? sort.dir : null}
                  onSort={onSort}
                />
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {pagedRows.map((row) => (
              <TableRow
                key={row.id}
                hover
                sx={{
                  backgroundColor: "#FFFFFF",
                  "&:hover": { bgcolor: "#EEF4FF" },
                }}
              >
                <TableCell
                  padding="checkbox"
                  sx={{ ...listCellSx, ...checkCellSx }}
                >
                  <Checkbox
                    size="small"
                    checked={selected.includes(row.id)}
                    onChange={() => handleSelect(row.id)}
                    inputProps={{ "aria-label": `Select ${row.patientName}` }}
                    sx={checkboxSx}
                  />
                </TableCell>
                {columns.map((col) => renderCell(col, row))}
              </TableRow>
            ))}

            {/* empty state */}
            {pagedRows.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
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

      <PaginationBar
        count={rows.length}
        page={page}
        onPageChange={setPage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(Number(e.target.value));
          setPage(0);
        }}
      />
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* Filter dialog option row                                             */
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
/* Filter Dialog                                                        */
/* ------------------------------------------------------------------ */
const EMPTY_DRAFT = { status: "", refundMode: "" };

function FilterSortDialog({
  open,
  onClose,
  initial,
  onApply,
  onClear,
  showRefundMode,
}) {
  const [category, setCategory] = React.useState("status");
  const [draft, setDraft] = React.useState(EMPTY_DRAFT);

  // reset draft every time dialog opens
  React.useEffect(() => {
    if (open) {
      setDraft({ ...initial });
      setCategory("status");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const categories = [
    { key: "status", label: "Status", hasDraft: Boolean(draft.status) },
    ...(showRefundMode
      ? [
          {
            key: "refundMode",
            label: "Refund Mode",
            hasDraft: Boolean(draft.refundMode),
          },
        ]
      : []),
  ];

  const optionLists = {
    status: STATUS_OPTIONS,
    refundMode: REFUND_MODE_OPTIONS,
  };

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
            Filter
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
                  onClick={() => setCategory(cat.key)}
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
                      fontSize: 11,
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
            {/* STATUS / REFUND MODE */}
            {(category === "status" || category === "refundMode") && (
              <Box
                sx={{
                  flex: 1,
                  overflowY: "auto",
                  minHeight: 0,
                  ...hideScrollSx,
                }}
              >
                {optionLists[category].map((opt) => {
                  const isChecked = draft[category] === opt;
                  return (
                    <OptionRow
                      key={opt}
                      label={opt}
                      checked={isChecked}
                      onToggle={() =>
                        setDraft((p) => ({
                          ...p,
                          [category]: isChecked ? "" : opt,
                        }))
                      }
                    />
                  );
                })}
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
/* Toolbar                                                              */
/* ------------------------------------------------------------------ */
function Toolbar({
  activeTab,
  onTabChange,
  counts,
  query,
  onQueryChange,
  onOpenSettings,
  onOpenFilter,
  activeFilterCount,
  onDownload,
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
                height: 28,
                px: 1.5,
                boxSizing: "border-box",
                borderRadius: "20px",
                cursor: "pointer",
                bgcolor: isActive ? T.blue : "#fff",
                border: isActive ? "none" : "1.5px solid #D1D5DB",
                color: isActive ? "#fff" : "#6B7280",
                fontSize: 11,
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
      <Stack
        direction="row"
        spacing={1}
        flexWrap="wrap"
        alignItems="center"
        useFlexGap
      >
        <Tooltip title="Column Settings" arrow>
          <IconButton
            size="small"
            aria-label="Column settings"
            onClick={onOpenSettings}
            sx={iconBtnSx}
          >
            <SettingsIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Download CSV" arrow>
          <IconButton
            size="small"
            aria-label="Download CSV"
            onClick={onDownload}
            sx={iconBtnSx}
          >
            <DownloadIcon />
          </IconButton>
        </Tooltip>

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
          <SearchIcon width={14} height={14} color="#9CA3AF" />
          <InputBase
            placeholder="Search Patient, ID, Phone, Status..."
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            inputProps={{ "aria-label": "Search refunds" }}
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
              onClick={() => onQueryChange("")}
              sx={{ p: 0.25 }}
            >
              <CloseIcon sx={{ fontSize: 14 }} />
            </IconButton>
          )}
        </Box>

        {/* Advanced filters -> opens Filter dialog */}
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
            onClick={onOpenFilter}
            startIcon={<FilterIcon1 width={14} height={14} color={T.blue} />}
            sx={{
              textTransform: "none",
              fontSize: 11,
              fontWeight: 600,
              height: 28,
              borderRadius: "30px",
              bgcolor: activeFilterCount > 0 ? "#EFF6FF" : "#fff",
              color: "#000",
              borderColor: "#D1D5DB",
              px: 1.75,
              whiteSpace: "nowrap",
              "&:hover": { borderColor: T.blue, bgcolor: "#F4F8FF" },
            }}
          >
            Advanced Filters
          </Button>
        </Badge>
      </Stack>
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* Main Page                                                            */
/* ------------------------------------------------------------------ */
export default function RefundsNew() {
  const [activeTab, setActiveTab] = React.useState("new");
  const [query, setQuery] = React.useState("");
  const [showColumnSettings, setShowColumnSettings] = React.useState(false);

  // per-tab column visibility (keyed by column id, "actions" always shown)
  const [newVisible, setNewVisible] = React.useState(
    buildVisibility(NEW_COLUMN_OPTIONS, true),
  );
  const [historyVisible, setHistoryVisible] = React.useState(
    buildVisibility(HISTORY_COLUMN_OPTIONS, true),
  );

  // filters (status applies to both tabs, refund mode to New only)
  const [statusFilter, setStatusFilter] = React.useState("");
  const [modeFilter, setModeFilter] = React.useState("");
  const [filterOpen, setFilterOpen] = React.useState(false);

  const newFiltered = React.useMemo(
    () => filterRows(NEW_ROWS, query, statusFilter, modeFilter),
    [query, statusFilter, modeFilter],
  );
  const historyFiltered = React.useMemo(
    () => filterRows(HISTORY_ROWS, query, statusFilter, ""),
    [query, statusFilter],
  );

  // each tab keeps its own sort state
  const newSort = useSortedRows(newFiltered, NEW_COLUMNS);
  const historySort = useSortedRows(historyFiltered, HISTORY_COLUMNS);

  const isNew = activeTab === "new";
  const current = isNew ? newSort : historySort;
  const currentColumns = isNew ? NEW_COLUMNS : HISTORY_COLUMNS;
  const currentOptions = isNew ? NEW_COLUMN_OPTIONS : HISTORY_COLUMN_OPTIONS;
  const currentVisible = isNew ? newVisible : historyVisible;
  const setCurrentVisible = isNew ? setNewVisible : setHistoryVisible;

  // only pass columns the user has enabled (actions always shown)
  const visibleColumns = currentColumns.filter(
    (col) => col.id === "actions" || currentVisible[col.id] !== false,
  );

  // badge count = status + (refund mode on New tab)
  const activeFilterCount =
    (statusFilter ? 1 : 0) + (isNew && modeFilter ? 1 : 0);

  const handleDownload = () => {
    const filename = `refunds-${activeTab}-${new Date().toISOString().slice(0, 10)}.csv`;
    exportToCSV(visibleColumns, current.sortedRows, filename);
  };

  const handleFilterApply = (draft) => {
    setStatusFilter(draft.status);
    if (isNew) setModeFilter(draft.refundMode);
    setFilterOpen(false);
  };

  const handleFilterClear = () => {
    setStatusFilter("");
    setModeFilter("");
    setFilterOpen(false);
  };

  const dialogInitial = {
    status: statusFilter,
    refundMode: modeFilter,
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
      {/* ── PAGE HEADER (fixed, never scrolls) ── */}
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
        <Typography sx={{ fontSize: 16, fontWeight: 700, color: "#111827" }}>
          Refunds
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          flexWrap="wrap"
          alignItems="center"
          useFlexGap
        >
          <Button
            variant="outlined"
            sx={{
              textTransform: "none",
              fontSize: 11,
              fontWeight: 600,
              height: 28,
              borderRadius: "8px",
              color: "#374151",
              borderColor: "#D1D5DB",
              bgcolor: "#fff",
              px: 1.75,
              "&:hover": { bgcolor: "#F9FAFB" },
            }}
          >
            Save As Draft
          </Button>
          <Button
            variant="contained"
            disableElevation
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
            Generate Statements
          </Button>
        </Stack>
      </Box>

      {/* ── TOOLBAR (fixed) ── */}
      <Toolbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        counts={{ new: newFiltered.length, history: historyFiltered.length }}
        query={query}
        onQueryChange={setQuery}
        onOpenSettings={() => setShowColumnSettings(true)}
        onOpenFilter={() => setFilterOpen(true)}
        activeFilterCount={activeFilterCount}
        onDownload={handleDownload}
      />

      {/* ── TABLE BOX — switches based on tab ── */}
      <DataTable
        key={activeTab}
        columns={visibleColumns}
        rows={current.sortedRows}
        sort={current.sort}
        onSort={current.handleSort}
      />

      {/* FILTER DIALOG */}
      <FilterSortDialog
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        initial={dialogInitial}
        onApply={handleFilterApply}
        onClear={handleFilterClear}
        showRefundMode={isNew}
      />

      {/* COLUMN SETTINGS DIALOG */}
      <ColumnSettingsDialog
        open={showColumnSettings}
        onClose={() => setShowColumnSettings(false)}
        options={currentOptions}
        visible={currentVisible}
        setVisible={setCurrentVisible}
      />
    </Box>
  );
}