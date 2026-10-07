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
  Checkbox,
  Stack,
  Tooltip,
  InputBase,
  Badge,
  Dialog,
  DialogContent,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from "@mui/icons-material/Close";
import {
  FilterIcon,
  ExportIcon,
  RPEditIcon,
  SearchIcon,
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
/* Dummy rows                                                           */
/* ------------------------------------------------------------------ */
const SAMPLE = [
  [
    "Location 1",
    "WashingtonUSe, Aleuti...",
    "8475875747",
    "8475875747",
    "8475875747",
    "Fresh Original",
    true,
  ],
  [
    "Location 2",
    "Boston, Suffolk Coun...",
    "9123456780",
    "9123456781",
    "9123456782",
    "Hitex",
    true,
  ],
  [
    "Location 3",
    "Denver, Denver Coun...",
    "7345678123",
    "7345678124",
    "7345678125",
    "Balance Report",
    false,
  ],
  [
    "Annex Clinic",
    "Austin, Travis Count...",
    "6456781234",
    "6456781235",
    "6456781236",
    "Fresh Original",
    true,
  ],
  [
    "Central Hospital",
    "Chicago, Cook County...",
    "9567812345",
    "9567812346",
    "9567812347",
    "Hitex",
    true,
  ],
  [
    "East Wing",
    "Seattle, King County...",
    "5678123456",
    "5678123457",
    "5678123458",
    "Balance Report",
    true,
  ],
  [
    "Lakeside Center",
    "Miami, Miami-Dade...",
    "8781234567",
    "8781234568",
    "8781234569",
    "Fresh",
    false,
  ],
  [
    "Northgate Care",
    "Phoenix, Maricopa...",
    "4892345678",
    "4892345679",
    "4892345670",
    "Hitex",
    true,
  ],
  [
    "Riverside Unit",
    "Portland, Multnomah...",
    "9903456781",
    "9903456782",
    "9903456783",
    "Fresh Original",
    true,
  ],
  [
    "South Campus",
    "Dallas, Dallas County...",
    "3014567812",
    "3014567813",
    "3014567814",
    "Balance Report",
    true,
  ],
  [
    "West Point",
    "Atlanta, Fulton Coun...",
    "7125678123",
    "7125678124",
    "7125678125",
    "Fresh",
    true,
  ],
];

const INITIAL_ROWS = SAMPLE.map(
  ([location, address, contact, fax, npi, practice, active], id) => ({
    id,
    location,
    address,
    contact,
    fax,
    npi,
    practice,
    active,
  }),
);

/* ------------------------------------------------------------------ */
/* Table columns                                                        */
/* sort: "alpha" = A-Z / Z-A, "number" = low-high / high-low            */
/* (remove `sort` to disable sorting on a column)                       */
/* ------------------------------------------------------------------ */
const COLUMNS = [
  { id: "location", label: "Service Location", sort: "alpha" },
  { id: "address", label: "Address" },
  { id: "contact", label: "Contact number" },
  { id: "fax", label: "Fax", sort: "number" },
  { id: "npi", label: "NPI", sort: "number" },
  { id: "practice", label: "Practice", sort: "alpha" },
  { id: "active", label: "Active", center: true },
  { id: "actions", label: "Action", last: true },
];

const SORTABLE_COLUMNS = COLUMNS.filter((c) => c.sort);

const PRACTICE_OPTIONS = [
  ...new Set(INITIAL_ROWS.map((r) => r.practice).filter(Boolean)),
].sort((a, b) => a.localeCompare(b));

const STATUS_OPTIONS = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

/* ------------------------------------------------------------------ */
/* Search + filter helper                                               */
/* ------------------------------------------------------------------ */
const SEARCH_FIELDS = ["location", "npi", "practice"];

function filterRows(rows, query, practice, status) {
  const q = query.trim().toLowerCase();
  return rows.filter((row) => {
    const matchesSearch =
      !q ||
      SEARCH_FIELDS.some((field) =>
        String(row[field] ?? "")
          .toLowerCase()
          .includes(q),
      );
    const matchesPractice = !practice || row.practice === practice;
    const matchesStatus =
      !status ||
      (status === "active" ? row.active === true : row.active === false);
    return matchesSearch && matchesPractice && matchesStatus;
  });
}

/* ------------------------------------------------------------------ */
/* Sort helpers                                                         */
/* ------------------------------------------------------------------ */
const COMPARERS = {
  alpha: (a, b) =>
    String(a).localeCompare(String(b), undefined, { sensitivity: "base" }),
  number: (a, b) => (Number(a) || 0) - (Number(b) || 0),
};

const SORT_TITLES = {
  alpha: { asc: "Sorted A–Z", desc: "Sorted Z–A", none: "Sort A–Z" },
  number: {
    asc: "Sorted low to high",
    desc: "Sorted high to low",
    none: "Sort low to high",
  },
};

const SORT_ORDER_LABELS = {
  alpha: { asc: "A to Z", desc: "Z to A" },
  number: { asc: "Low to high", desc: "High to low" },
};

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
/* Cell styles                                                          */
/* ------------------------------------------------------------------ */
const HEAD_H = 44; // header row height (px)

const cellSx = {
  borderBottom: `1px solid ${T.rowLine}`,
  py: 1.2,
  px: 1.5,
  fontSize: 12,
  color: "#2E2E2E",
  textAlign: "center",
};

const headCellSx = {
  ...cellSx,
  height: HEAD_H,
  boxSizing: "border-box",
  bgcolor: T.headBg,
  fontWeight: 700,
  fontSize: 13,
  color: "#1e293b",
  borderBottom: `1px solid ${T.border}`,
  borderRight: `1px solid ${T.border}`,
  whiteSpace: "nowrap",
  textAlign: "center",
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
        textAlign: column.center ? "center" : "left",
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
/* Filter & Sort option row                                             */
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
/* Filter & Sort Dialog                                                 */
/* ------------------------------------------------------------------ */
const EMPTY_DRAFT = { practice: "", status: "", sortBy: "", sortDir: "asc" };

function FilterSortDialog({ open, onClose, initial, onApply, onClear }) {
  const [category, setCategory] = React.useState("practice");
  const [search, setSearch] = React.useState("");
  const [draft, setDraft] = React.useState(EMPTY_DRAFT);

  // reset draft every time dialog opens
  React.useEffect(() => {
    if (open) {
      setDraft({ ...initial });
      setCategory("practice");
      setSearch("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const categories = [
    { key: "practice", label: "Practice", hasDraft: Boolean(draft.practice) },
    { key: "status", label: "Status", hasDraft: Boolean(draft.status) },
    { key: "sort", label: "Sort", hasDraft: Boolean(draft.sortBy) },
  ];

  const selectedSortCol = SORTABLE_COLUMNS.find((c) => c.id === draft.sortBy);
  const orderLabels = selectedSortCol
    ? SORT_ORDER_LABELS[selectedSortCol.sort]
    : SORT_ORDER_LABELS.alpha;

  const practiceList = PRACTICE_OPTIONS.filter((opt) =>
    opt.toLowerCase().includes(search.toLowerCase()),
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
                    setSearch("");
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
              py: 1,
              px: 1.5,
              display: "flex",
              flexDirection: "column",
              minHeight: 0,
              overflow: "hidden",
            }}
          >
            {/* PRACTICE FILTER */}
            {category === "practice" && (
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
                  <SearchIcon width={14} height={14} color="#94a3b8" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search practice..."
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
                  {search && (
                    <IconButton
                      size="small"
                      sx={{ p: 0.2 }}
                      onClick={() => setSearch("")}
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
                  {practiceList.map((opt) => {
                    const isChecked = draft.practice === opt;
                    return (
                      <OptionRow
                        key={opt}
                        label={opt}
                        checked={isChecked}
                        onToggle={() =>
                          setDraft((p) => ({
                            ...p,
                            practice: isChecked ? "" : opt,
                          }))
                        }
                      />
                    );
                  })}

                  {practiceList.length === 0 && (
                    <Typography
                      sx={{
                        fontSize: 12,
                        color: "#94a3b8",
                        textAlign: "center",
                        py: 3,
                      }}
                    >
                      No practices found
                    </Typography>
                  )}
                </Box>
              </>
            )}

            {/* STATUS FILTER */}
            {category === "status" && (
              <Box
                sx={{
                  flex: 1,
                  overflowY: "auto",
                  minHeight: 0,
                  ...hideScrollSx,
                }}
              >
                {STATUS_OPTIONS.map((opt) => {
                  const isChecked = draft.status === opt.value;
                  return (
                    <OptionRow
                      key={opt.value}
                      label={opt.label}
                      checked={isChecked}
                      onToggle={() =>
                        setDraft((p) => ({
                          ...p,
                          status: isChecked ? "" : opt.value,
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
/* Main Page                                                            */
/* ------------------------------------------------------------------ */
export default function Locations() {
  const navigate = useNavigate();

  // rows in state so the Active checkbox toggles work with the Status filter
  const [rows, setRows] = React.useState(INITIAL_ROWS);
  const toggleActive = (id) =>
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, active: !r.active } : r)),
    );

  // search
  const [query, setQuery] = React.useState("");

  // filters + dialog open state
  const [practiceFilter, setPracticeFilter] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("");
  const [filterOpen, setFilterOpen] = React.useState(false);

  // 1) filter (search + practice + status)  2) then sort
  const filteredRows = React.useMemo(
    () => filterRows(rows, query, practiceFilter, statusFilter),
    [rows, query, practiceFilter, statusFilter],
  );

  const { sort, setSort, sortedRows, handleSort } = useSortedRows(
    filteredRows,
    COLUMNS,
  );

  // badge count = practice + status + sort
  const activeFilterCount =
    (practiceFilter ? 1 : 0) +
    (statusFilter ? 1 : 0) +
    (sort.columnId && sort.dir ? 1 : 0);

  const handleFilterApply = (draft) => {
    setPracticeFilter(draft.practice);
    setStatusFilter(draft.status);
    setSort(
      draft.sortBy
        ? { columnId: draft.sortBy, dir: draft.sortDir }
        : { columnId: null, dir: null },
    );
    setFilterOpen(false);
  };

  const handleFilterClear = () => {
    setPracticeFilter("");
    setStatusFilter("");
    setSort({ columnId: null, dir: null });
    setFilterOpen(false);
  };

  // what the dialog should show when it opens
  const dialogInitial = {
    practice: practiceFilter,
    status: statusFilter,
    sortBy: sort.columnId || "",
    sortDir: sort.dir || "asc",
  };

  return (
    <Box
      sx={{
        bgcolor: T.page,
        // page scrollbar removed: fixed height, only the table scrolls
        // (if your layout has a top bar, use e.g. "calc(100vh - 64px)")
        height: "100%",
        maxHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        py: { xs: 2, md: 3 },
        px: { xs: 1.5, sm: 2, md: 2.5, lg: 2.5 },
        boxSizing: "border-box",
      }}
    >
      {/* HEADER (fixed, never scrolls) */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          flexShrink: 0,
          gap: 2,
          mb: 3,
        }}
      >
        <Typography sx={{ fontSize: 20, fontWeight: 700, color: "#111827" }}>
          Service Location Management
        </Typography>

        <Stack direction="row" spacing={1.5} flexWrap="wrap">
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
              transition: "border-color 0.15s ease",
              "&:hover": { borderColor: "#015DFF" },
              "&:focus-within": { borderColor: "#015DFF" },
            }}
          >
            <SearchIcon width={14} height={14} color="#9CA3AF" />
            <InputBase
              placeholder="Search by Location, NPI or Practice..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              inputProps={{ "aria-label": "Search service locations" }}
              sx={{
                fontSize: 12,
                flex: 1,
                "& input::placeholder": { color: "#9CA3AF", opacity: 1 },
              }}
            />
          </Box>

          {/* Filter button -> opens Filter & sort dialog */}
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
                fontSize: 12,
                fontWeight: 500,
                borderRadius: "8px",
                color: T.blue,
                border: "1.5px solid #015DFF",
                bgcolor: activeFilterCount > 0 ? "#EFF6FF" : "transparent",
                px: 2,
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
              fontSize: 12,
              fontWeight: 500,
              borderRadius: "8px",
              color: T.blue,
              border: "1.5px solid #015DFF",
              px: 2,
              "&:hover": { borderColor: T.blue, bgcolor: "#F4F8FF" },
            }}
          >
            Export
          </Button>

          <Button
            variant="contained"
            disableElevation
            onClick={() =>
              navigate("/locations/edit", { state: { row: null } })
            }
            sx={{
              textTransform: "none",
              fontSize: 12,
              fontWeight: 500,
              borderRadius: "8px",
              bgcolor: T.blue,
              px: 2.5,
              "&:hover": { bgcolor: "#1D4ED8" },
            }}
          >
            Add New
          </Button>
        </Stack>
      </Box>

      {/* ── TABLE (only this area scrolls, header row stays sticky) ── */}
      <TableContainer
        sx={{
          flex: "0 1 auto",
          minHeight: 0,
          overflow: "auto",
          border: `1px solid ${T.border}`,
          borderRadius: "10px",
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
            // "separate" keeps borders visible on the sticky header while scrolling
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
            {sortedRows.map((row) => (
              <TableRow
                key={row.id}
                hover
                sx={{ "&:hover": { bgcolor: "#FAFBFE" } }}
              >
                <TableCell sx={cellSx}>{row.location}</TableCell>
                <TableCell sx={cellSx}>{row.address}</TableCell>
                <TableCell sx={cellSx}>{row.contact}</TableCell>
                <TableCell sx={cellSx}>{row.fax}</TableCell>
                <TableCell sx={cellSx}>{row.npi}</TableCell>
                <TableCell sx={cellSx}>{row.practice}</TableCell>
                <TableCell sx={{ ...cellSx, textAlign: "center" }}>
                  <Checkbox
                    checked={row.active}
                    onChange={() => toggleActive(row.id)}
                    size="small"
                    sx={{
                      p: 0,
                      color: "#C8D0DC",
                      "&.Mui-checked": { color: T.blue },
                      "& svg": { fontSize: 18 },
                    }}
                  />
                </TableCell>
                <TableCell sx={{ ...cellSx, borderRight: "none" }}>
                  <Tooltip title="Edit" arrow>
                    <IconButton
                      size="small"
                      onClick={() =>
                        navigate("/locations/edit", { state: { row } })
                      }
                      sx={{ color: T.blue, "&:hover": { bgcolor: "#EEF4FF" } }}
                    >
                      <RPEditIcon width={20} height={20} color={T.blue} />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}

            {/* empty state */}
            {sortedRows.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={COLUMNS.length}
                  align="center"
                  sx={{ ...cellSx, py: 4, color: "#9CA3AF", fontSize: 13 }}
                >
                  No matching locations found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* FILTER & SORT DIALOG */}
      <FilterSortDialog
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        initial={dialogInitial}
        onApply={handleFilterApply}
        onClear={handleFilterClear}
      />
    </Box>
  );
}
