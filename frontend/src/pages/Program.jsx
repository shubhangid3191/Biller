import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  Dialog,
  DialogContent,
  Stack,
  Tooltip,
  InputBase,
  Checkbox,
  Badge,
  Select,
  MenuItem,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import CloseIcon from "@mui/icons-material/Close";
import {
  FilterIcon,
  ExportIcon,
  RPEditIcon,
  RPDeleteIcon,
  SearchIcon,
} from "../assets/Assets";

/* ------------------------------------------------------------------ */
/* Design tokens                                                        */
/* ------------------------------------------------------------------ */
const T = {
  headBg: "#EBF1FE",
  headText: "#373B4D",
  headSymbol: "#52525B",
  border: "#BED3FC",
  rowLine: "#EEF1F7",
  blue: "#2563EB",
  page: "#F5F7FA",
};

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
/* Pagination (same as ReferringProvider / PreBillingClaim)             */
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
/* Initial seed data                                                    */
/* ------------------------------------------------------------------ */
const SEED = [
  {
    id: 1,
    programName: "Clare Jane",
    description: "Provider-Delivered Care Management.",
    cpt: "11980; 00934",
  },
  {
    id: 2,
    programName: "Adam Ross",
    description: "Chronic Care Management.",
    cpt: "99490; 99439",
  },
  {
    id: 3,
    programName: "Zoe Martin",
    description: "Remote Patient Monitoring.",
    cpt: "99453; 99454",
  },
  {
    id: 4,
    programName: "Brian Cox",
    description: "Principal Care Management.",
    cpt: "99424; 99425",
  },
  {
    id: 5,
    programName: "Maya Singh",
    description: "Transitional Care Management.",
    cpt: "99495; 99496",
  },
  {
    id: 6,
    programName: "Liam Turner",
    description: "Behavioral Health Integration.",
    cpt: "99484; 99492",
  },
  {
    id: 7,
    programName: "Nora Blake",
    description: "Annual Wellness Visit.",
    cpt: "G0438; G0439",
  },
  {
    id: 8,
    programName: "Ethan Hall",
    description: "Advance Care Planning.",
    cpt: "99497; 99498",
  },
  {
    id: 9,
    programName: "Ivy Morgan",
    description: "Home Health Certification.",
    cpt: "G0180; G0179",
  },
  {
    id: 10,
    programName: "Owen Reed",
    description: "Telehealth Consultation.",
    cpt: "99441; 99442",
  },
  {
    id: 11,
    programName: "Ruby Fox",
    description: "Preventive Medicine Counseling.",
    cpt: "99401; 99402",
  },
];

/* ------------------------------------------------------------------ */
/* Table columns                                                        */
/* ------------------------------------------------------------------ */
const COLUMNS = [
  { id: "programName", label: "Program Name", sort: "alpha" },
  { id: "description", label: "Description", sort: "alpha" },
  { id: "cpt", label: "CPT", sort: "alpha" },
  { id: "actions", label: "Action", last: true, width: 140 },
];

const SORTABLE_COLUMNS = COLUMNS.filter((c) => c.sort);

/* ------------------------------------------------------------------ */
/* Helpers                                                              */
/* ------------------------------------------------------------------ */
function filterRows(rows, query) {
  const q = query.trim().toLowerCase();
  if (!q) return rows;
  return rows.filter((r) =>
    ["programName", "cpt"].some((f) =>
      String(r[f] ?? "")
        .toLowerCase()
        .includes(q),
    ),
  );
}

const COMPARERS = {
  alpha: (a, b) =>
    String(a).localeCompare(String(b), undefined, {
      sensitivity: "base",
      numeric: true,
    }),
};

const SORT_TITLES = {
  alpha: { asc: "Sorted A–Z", desc: "Sorted Z–A", none: "Sort A–Z" },
};
const SORT_ORDER_LABELS = { alpha: { asc: "A to Z", desc: "Z to A" } };

function useSortedRows(rows, columns) {
  const [sort, setSort] = React.useState({ columnId: null, dir: null });

  const sortedRows = React.useMemo(() => {
    if (!sort.columnId || !sort.dir) return rows;
    const col = columns.find((c) => c.id === sort.columnId);
    if (!col?.sort) return rows;
    const factor = sort.dir === "asc" ? 1 : -1;
    const cmp = COMPARERS[col.sort];
    return [...rows].sort(
      (a, b) => cmp(a[sort.columnId], b[sort.columnId]) * factor,
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
/* Cell styles (same as ReferringProvider / PreBillingClaim)            */
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
/* Header cell                                                          */
/* ------------------------------------------------------------------ */
function HeaderCell({ column, sortDir, onSort }) {
  const active = !!sortDir;
  const titles = column.sort ? SORT_TITLES[column.sort] : null;

  return (
    <TableCell
      sx={{
        ...listHeadSx,
        borderRight: column.last ? "none" : `1px solid ${T.border}`,
        ...(column.width && { width: column.width, minWidth: column.width }),
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
/* Delete Confirm Dialog                                                */
/* ------------------------------------------------------------------ */
function DeleteDialog({ open, programName, onCancel, onConfirm }) {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      PaperProps={{
        sx: { borderRadius: "12px", minWidth: 340, p: 0, overflow: "hidden" },
      }}
    >
      <Box sx={{ px: 3, pt: 2.5, pb: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography sx={{ fontWeight: 700, fontSize: 15, color: "#111827" }}>
            Delete Program
          </Typography>
          <IconButton size="small" onClick={onCancel}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        <Typography sx={{ fontSize: 13, color: "#374151" }}>
          Are you sure you want to delete{" "}
          <Box component="span" sx={{ fontWeight: 700 }}>
            {programName}
          </Box>
          ? This action cannot be undone.
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 1,
          px: 3,
          py: 2,
        }}
      >
        <Button
          variant="outlined"
          onClick={onCancel}
          sx={{
            textTransform: "none",
            fontSize: 13,
            borderRadius: "8px",
            borderColor: "#D1D5DB",
            color: "#374151",
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          disableElevation
          onClick={onConfirm}
          sx={{
            textTransform: "none",
            fontSize: 13,
            borderRadius: "8px",
            bgcolor: "#EF4444",
            "&:hover": { bgcolor: "#DC2626" },
          }}
        >
          Delete
        </Button>
      </Box>
    </Dialog>
  );
}

/* ------------------------------------------------------------------ */
/* Filter & Sort Dialog                                                 */
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

const EMPTY_DRAFT = { sortBy: "", sortDir: "asc" };

function FilterSortDialog({ open, onClose, initial, onApply, onClear }) {
  const [draft, setDraft] = React.useState(EMPTY_DRAFT);

  React.useEffect(() => {
    if (open) setDraft({ ...initial });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const selectedSortCol = SORTABLE_COLUMNS.find((c) => c.id === draft.sortBy);
  const orderLabels = selectedSortCol
    ? SORT_ORDER_LABELS[selectedSortCol.sort]
    : SORT_ORDER_LABELS.alpha;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      sx={{
        "& .MuiDialog-paper": {
          width: "400px !important",
          maxWidth: "400px !important",
          borderRadius: "16px !important",
          overflow: "hidden !important",
          boxShadow: "0px 8px 32px rgba(0,0,0,0.14)",
        },
        "@media (max-width: 480px)": {
          "& .MuiDialog-paper": {
            width: "92vw !important",
            maxWidth: "92vw !important",
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
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2.5,
            pt: 2,
            pb: 1,
          }}
        >
          <Typography fontWeight={700} fontSize={12} color="#0f172a">
            Filter &amp; Sort
          </Typography>
          <IconButton size="small" onClick={onClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <Box sx={{ px: 2.5, pb: 1 }}>
          <Typography
            sx={{
              px: 0,
              py: 0.75,
              fontSize: 12,
              fontWeight: 600,
              color: "#94a3b8",
            }}
          >
            Sort By
          </Typography>
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

          {draft.sortBy && (
            <>
              <Typography
                sx={{
                  px: 0,
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
                  onToggle={() => setDraft((p) => ({ ...p, sortDir: dir }))}
                  minHeight={44}
                />
              ))}
            </>
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 1.5,
            px: 2.5,
            py: 2,
            borderTop: "1px solid #f1f5f9",
          }}
        >
          <Button
            fullWidth
            variant="outlined"
            onClick={onClear}
            sx={{
              textTransform: "none",
              color: "#015DFF",
              borderColor: "#015DFF",
              borderRadius: "100px",
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
              bgcolor: "rgba(1,93,255,1)",
              boxShadow: "none",
              "&:hover": { bgcolor: "#0145CC", boxShadow: "none" },
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
/* Main Page                                                            */
/* ------------------------------------------------------------------ */
export default function Program() {
  const navigate = useNavigate();
  const location = useLocation();

  /* ── rows state — persisted in localStorage ── */
  const [rows, setRows] = React.useState(() => {
    try {
      const saved = localStorage.getItem("programRows");
      return saved ? JSON.parse(saved) : SEED;
    } catch {
      return SEED;
    }
  });
  const nextId = React.useRef(
    rows.length > 0 ? Math.max(...rows.map((r) => r.id)) + 1 : SEED.length + 1,
  );

  /* keep localStorage in sync whenever rows change */
  React.useEffect(() => {
    localStorage.setItem("programRows", JSON.stringify(rows));
  }, [rows]);

  /* ── handle result coming back from ProgramEdit ── */
  const processedResult = React.useRef(null);

  React.useEffect(() => {
    const result = location.state?.result;
    if (!result) return;

    // prevent double-apply (React StrictMode fires effects twice in dev)
    const key = JSON.stringify(result);
    if (processedResult.current === key) return;
    processedResult.current = key;

    if (result.action === "add") {
      setRows((prev) => [...prev, { id: nextId.current++, ...result.data }]);
    } else if (result.action === "edit") {
      setRows((prev) =>
        prev.map((r) =>
          r.id === result.data.id ? { ...r, ...result.data } : r,
        ),
      );
    }
    /* clear the state so re-visits don't re-apply */
    navigate("/program", { replace: true, state: {} });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state?.result]);

  /* ── delete ── */
  const [deleteTarget, setDeleteTarget] = React.useState(null);

  const handleDeleteConfirm = () => {
    setRows((prev) => prev.filter((r) => r.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  /* ── search / filter / sort / pagination ── */
  const [query, setQuery] = React.useState("");
  const [filterOpen, setFilterOpen] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(PAGE_SIZES[0]);

  const filteredRows = React.useMemo(
    () => filterRows(rows, query),
    [rows, query],
  );
  const { sort, setSort, sortedRows, handleSort } = useSortedRows(
    filteredRows,
    COLUMNS,
  );

  // go back to page 1 whenever search / delete changes the number of rows
  React.useEffect(() => {
    setPage(0);
  }, [filteredRows.length]);

  const pagedRows = sortedRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  const activeFilterCount = sort.columnId && sort.dir ? 1 : 0;

  const handleFilterApply = (draft) => {
    setSort(
      draft.sortBy
        ? { columnId: draft.sortBy, dir: draft.sortDir }
        : { columnId: null, dir: null },
    );
    setFilterOpen(false);
  };

  const handleFilterClear = () => {
    setSort({ columnId: null, dir: null });
    setFilterOpen(false);
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
      {/* ── HEADER (fixed, never scrolls) ── */}
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
          Program Management
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          flexWrap="wrap"
          alignItems="center"
          useFlexGap
        >
          {/* Search bar */}
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
              placeholder="Search by Program Name or CPT..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              inputProps={{ "aria-label": "Search programs" }}
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
                onClick={() => setQuery("")}
                sx={{ p: 0.25 }}
              >
                <CloseIcon sx={{ fontSize: 14 }} />
              </IconButton>
            )}
          </Box>

          {/* Filter */}
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
              onClick={() => setFilterOpen(true)}
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

          {/* Export */}
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

          {/* Add New */}
          <Button
            variant="contained"
            disableElevation
            onClick={() =>
              navigate("/program/configuration", { state: { row: null } })
            }
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
            Add New
          </Button>
        </Stack>
      </Box>

      {/* ── TABLE BOX: fills remaining height.
            Rows scroll inside TableContainer, pagination stays pinned at the bottom. ── */}
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
              minWidth: 700,
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
              {pagedRows.map((row) => (
                <TableRow
                  key={row.id}
                  hover
                  sx={{
                    backgroundColor: "#FFFFFF",
                    "&:hover": { bgcolor: "#EEF4FF" },
                  }}
                >
                  <TableCell sx={listCellSx}>{row.programName}</TableCell>
                  <TableCell sx={{ ...listCellSx }}>
                    {row.description}
                  </TableCell>
                  <TableCell sx={listCellSx}>{row.cpt}</TableCell>
                  <TableCell
                    sx={{
                      ...listCellSx,
                      width: 140,
                      minWidth: 140,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 1,
                      }}
                    >
                      <Tooltip title="Edit" arrow>
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate("/program/configuration", {
                              state: { row },
                            });
                          }}
                          sx={{
                            p: "4px",
                            color: T.blue,
                            "&:hover": { bgcolor: "#EEF4FF" },
                          }}
                        >
                          <RPEditIcon width={18} height={18} color={T.blue} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete" arrow>
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteTarget(row);
                          }}
                          sx={{
                            p: "4px",
                            color: T.blue,
                            "&:hover": { bgcolor: "#FEE2E2" },
                          }}
                        >
                          <RPDeleteIcon width={18} height={18} color={T.blue} />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}

              {/* empty state */}
              {pagedRows.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={COLUMNS.length}
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
          count={sortedRows.length}
          page={page}
          onPageChange={setPage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(Number(e.target.value));
            setPage(0);
          }}
        />
      </Box>

      {/* ── DIALOGS ── */}
      <FilterSortDialog
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        initial={{ sortBy: sort.columnId || "", sortDir: sort.dir || "asc" }}
        onApply={handleFilterApply}
        onClear={handleFilterClear}
      />

      <DeleteDialog
        open={Boolean(deleteTarget)}
        programName={deleteTarget?.programName}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
      />
    </Box>
  );
}
