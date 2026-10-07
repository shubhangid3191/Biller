import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Select,
  FormControl,
  Stack,
  Switch,
  Tooltip,
  InputBase,
  Badge,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from "@mui/icons-material/Close";
import {
  FilterIcon,
  ExportIcon,
  RPEditIcon,
  RPAddIcon,
  RPDeleteIcon,
  SettingsIcon2,
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
  bodyText: "#475569",
  blue: "#2563EB",
  page: "#F7F9FC",
};

/* ------------------------------------------------------------------ */
/* Dummy rows                                                           */
/* ------------------------------------------------------------------ */
const SAMPLE = [
  [
    "Clare Jane",
    "8475875747",
    "WashingtonUSe, Aleutians East, Ala...",
    "8475875747",
    true,
  ],
  [
    "Aetna",
    "1123456780",
    "Hartford, Hartford County, Conn...",
    "1123456781",
    true,
  ],
  [
    "Blue Cross",
    "7345678123",
    "Chicago, Cook County, Illinois...",
    "7345678124",
    false,
  ],
  [
    "Cigna",
    "6456781234",
    "Bloomfield, Hartford County, C...",
    "6456781235",
    true,
  ],
  [
    "Humana",
    "9567812345",
    "Louisville, Jefferson County, K...",
    "9567812346",
    true,
  ],
  [
    "Kaiser",
    "5678123456",
    "Oakland, Alameda County, Cali...",
    "5678123457",
    true,
  ],
  [
    "Medicare",
    "8781234567",
    "Baltimore, Baltimore County, ...",
    "8781234568",
    false,
  ],
  [
    "Molina",
    "4892345678",
    "Long Beach, Los Angeles Coun...",
    "4892345679",
    true,
  ],
  [
    "Oscar Health",
    "9903456781",
    "New York, New York County, ...",
    "9903456782",
    true,
  ],
  [
    "Tricare",
    "3014567812",
    "Falls Church, Fairfax County, ...",
    "3014567813",
    true,
  ],
  [
    "United Health",
    "7125678123",
    "Minnetonka, Hennepin County...",
    "7125678124",
    true,
  ],
];

const ROWS = SAMPLE.map(([payorName, payorCode, address, fax, active], id) => ({
  id,
  payorName,
  payorCode,
  address,
  fax,
  active,
}));

/* ------------------------------------------------------------------ */
/* Table columns                                                        */
/* sort: "alpha" = A-Z / Z-A, "number" = low-high / high-low            */
/* ------------------------------------------------------------------ */
const COLUMNS = [
  { id: "payorName", label: "Payor Name", sort: "alpha" },
  { id: "payorCode", label: "Payor Code", sort: "number" },
  { id: "address", label: "Address", sort: "alpha" },
  { id: "fax", label: "Fax", sort: "number" },
  { id: "active", label: "Active", center: true },
  { id: "actions", label: "Action", center: true, last: true },
];

const SORTABLE_COLUMNS = COLUMNS.filter((c) => c.sort);

/* ------------------------------------------------------------------ */
/* Search helper (Payor Name and Payor Code only)                       */
/* ------------------------------------------------------------------ */
const SEARCH_FIELDS = ["payorName", "payorCode"];

function filterRows(rows, query) {
  const q = query.trim().toLowerCase();
  if (!q) return rows;
  return rows.filter((row) =>
    SEARCH_FIELDS.some((field) =>
      String(row[field] ?? "")
        .toLowerCase()
        .includes(q),
    ),
  );
}

/* ------------------------------------------------------------------ */
/* Sort helpers                                                         */
/* ------------------------------------------------------------------ */
const COMPARERS = {
  alpha: (a, b) =>
    String(a).localeCompare(String(b), undefined, {
      sensitivity: "base",
      numeric: true,
    }),
  number: (a, b) => (Number(a) || 0) - (Number(b) || 0),
};

const SORT_TITLES = {
  alpha: { asc: "Sorted A–Z", desc: "Sorted Z–A", none: "Sort A–Z" },
  number: {
    asc: "Sorted Low to High",
    desc: "Sorted High to Low",
    none: "Sort Low to High",
  },
};

const SORT_ORDER_LABELS = {
  alpha: { asc: "A to Z", desc: "Z to A" },
  number: { asc: "Low to High", desc: "High to Low" },
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
const HEAD_H = 44;

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
/* Input style helpers                                                  */
/* ------------------------------------------------------------------ */
const inputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    fontSize: 13,
    bgcolor: "#fff",
    "& input": { py: "8px", px: "12px", fontSize: 13 },
    "& .MuiOutlinedInput-notchedOutline": { borderColor: "#D5DCE8" },
    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#9CA3AF" },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: T.blue,
      borderWidth: "1.5px",
    },
  },
  "& .MuiFormHelperText-root": { display: "none" },
};

const selectSx = {
  borderRadius: "8px",
  fontSize: 13,
  bgcolor: "#fff",
  "& .MuiOutlinedInput-notchedOutline": { borderColor: "#D5DCE8" },
  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#9CA3AF" },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: T.blue,
    borderWidth: "1.5px",
  },
  "& .MuiSelect-select": { py: "8px", px: "12px", fontSize: 13 },
};

/* ------------------------------------------------------------------ */
/* Section heading                                                      */
/* ------------------------------------------------------------------ */
function SectionTitle({ children }) {
  return (
    <Typography
      sx={{
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.08em",
        color: "#374151",
        textTransform: "uppercase",
        mb: 1.5,
        mt: 1,
      }}
    >
      {children}
    </Typography>
  );
}

/* ------------------------------------------------------------------ */
/* Form field                                                           */
/* ------------------------------------------------------------------ */
function FField({ label, placeholder, select, options = [], required }) {
  const lbl = (
    <Typography
      sx={{ fontSize: 12, fontWeight: 500, color: "#6B7280", mb: 0.5 }}
    >
      {label}
      {required && (
        <Box component="span" sx={{ color: "red", ml: 0.3 }}>
          *
        </Box>
      )}
    </Typography>
  );

  if (select) {
    return (
      <Box>
        {lbl}
        <FormControl fullWidth size="small">
          <Select
            displayEmpty
            defaultValue=""
            sx={selectSx}
            IconComponent={KeyboardArrowDownIcon}
          >
            <MenuItem value="" sx={{ fontSize: 13, color: "#9CA3AF" }}>
              {placeholder || "Select"}
            </MenuItem>
            {options.map((o) => (
              <MenuItem key={o} value={o} sx={{ fontSize: 13 }}>
                {o}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    );
  }

  return (
    <Box>
      {lbl}
      <TextField
        fullWidth
        size="small"
        placeholder={placeholder || "Type here"}
        sx={inputSx}
      />
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* 4-col grid row                                                       */
/* ------------------------------------------------------------------ */
function FormRow({ fields }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(4, 1fr)" },
        gap: 2,
        mb: 2,
      }}
    >
      {fields.map((f, i) => (
        <FField key={i} {...f} />
      ))}
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* Edit Dialog                                                          */
/* ------------------------------------------------------------------ */
function EditDialog({ open, onClose }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{ sx: { borderRadius: "12px", p: 0 } }}
      sx={{ "& .MuiDialog-paper": { borderRadius: "12px" } }}
    >
      <DialogContent sx={{ px: { xs: 2, sm: 3 }, pt: 3, pb: 1 }}>
        <Typography
          sx={{ fontSize: 18, fontWeight: 700, color: "#111827", mb: 3 }}
        >
          Edit Insurance Provider
        </Typography>

        {/* BASIC DETAILS */}
        <SectionTitle>Basic Details</SectionTitle>

        <FormRow
          fields={[
            { label: "Payor Name", placeholder: "Type here" },
            { label: "Payor Code", placeholder: "Type here" },
            { label: "Address", placeholder: "Type here" },
            { label: "Fax", placeholder: "Type here" },
          ]}
        />

        <FormRow
          fields={[
            { label: "City", placeholder: "Type here" },
            { label: "State", placeholder: "Select", select: true },
            { label: "Zip Code", placeholder: "Type here" },
            { label: "Country", placeholder: "Select", select: true },
          ]}
        />

        <FormRow
          fields={[
            { label: "Phone", placeholder: "Type here" },
            { label: "Website", placeholder: "Type here" },
            { label: "NPI", placeholder: "Type here" },
            { label: "Tax ID", placeholder: "Type here" },
          ]}
        />

        {/* Active Toggle */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
          <Typography sx={{ fontSize: 13, fontWeight: 500, color: "#374151" }}>
            Active
          </Typography>
          <Switch
            defaultChecked
            sx={{
              "& .MuiSwitch-switchBase.Mui-checked": { color: "#fff" },
              "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                bgcolor: "#22C55E",
              },
              "& .MuiSwitch-track": { borderRadius: 20 },
            }}
          />
        </Box>

        {/* CONTACT */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 1.5,
          }}
        >
          <SectionTitle>Contact Information</SectionTitle>
          <IconButton size="small" sx={{ color: "#EF4444" }}>
            <RPDeleteIcon width={18} height={18} color="#EF4444" />
          </IconButton>
        </Box>

        <FormRow
          fields={[
            { label: "Contact Name", placeholder: "Type here" },
            { label: "Contact Phone", placeholder: "Type here" },
            { label: "Contact Email", placeholder: "Type here" },
            { label: "Contact Type", placeholder: "Select", select: true },
          ]}
        />

        {/* SETTINGS */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 1.5,
          }}
        >
          <SectionTitle>Settings</SectionTitle>
          <IconButton
            size="small"
            sx={{
              bgcolor: T.blue,
              color: "#fff",
              width: 24,
              height: 24,
              borderRadius: "50%",
              "&:hover": { bgcolor: "#1D4ED8" },
            }}
          >
            <RPAddIcon width={20} height={20} color="#fff" />
          </IconButton>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 2,
            alignItems: "end",
            mb: 1,
          }}
        >
          <FField label="Plan Type" placeholder="Select" select />
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box sx={{ flex: 1 }}>
              <FField label="Plan Name" placeholder="Type here" />
            </Box>
            <IconButton size="small" sx={{ color: "#EF4444", mt: 2.5 }}>
              <RPDeleteIcon width={18} height={18} color="#EF4444" />
            </IconButton>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2, borderTop: "1px solid #E5E7EB" }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            textTransform: "none",
            fontSize: 14,
            fontWeight: 600,
            borderRadius: "8px",
            color: "#015DFF",
            border: "2px solid #015DFF",
            px: 3,
            "&:hover": { borderColor: "#9CA3AF", bgcolor: "#F9FAFB" },
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          disableElevation
          sx={{
            textTransform: "none",
            fontSize: 14,
            fontWeight: 600,
            borderRadius: "8px",
            bgcolor: T.blue,
            px: 4,
            "&:hover": { bgcolor: "#1D4ED8" },
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
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
const EMPTY_DRAFT = { sortBy: "", sortDir: "asc" };

function FilterSortDialog({ open, onClose, initial, onApply, onClear }) {
  const [category, setCategory] = React.useState("sort");
  const [draft, setDraft] = React.useState(EMPTY_DRAFT);

  React.useEffect(() => {
    if (open) {
      setDraft({ ...initial });
      setCategory("sort");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const categories = [
    { key: "sort", label: "Sort", hasDraft: Boolean(draft.sortBy) },
  ];

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
          <Typography fontWeight={700} fontSize={12} color="#0f172a">
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
              color: "#015DFF",
              borderColor: "#015DFF",
              borderRadius: "100px",
              "@media (max-width: 400px)": { fontSize: 10, py: 0.8 },
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
              bgcolor: "rgba(1, 93, 255, 1)",
              boxShadow: "none",
              "&:hover": { bgcolor: "#0145CC", boxShadow: "none" },
              "@media (max-width: 400px)": { fontSize: 10, py: 0.8 },
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
export default function InsuranceProvider() {
  const navigate = useNavigate();
  const [data, setData] = React.useState(ROWS);

  // search
  const [query, setQuery] = React.useState("");

  // filter dialog
  const [filterOpen, setFilterOpen] = React.useState(false);

  // filter first, then sort
  const filteredRows = React.useMemo(
    () => filterRows(data, query),
    [data, query],
  );

  const { sort, setSort, sortedRows, handleSort } = useSortedRows(
    filteredRows,
    COLUMNS,
  );

  // badge count = active sort
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

  const dialogInitial = {
    sortBy: sort.columnId || "",
    sortDir: sort.dir || "asc",
  };

  const toggleActive = (id) => {
    setData((prev) =>
      prev.map((r) => (r.id === id ? { ...r, active: !r.active } : r)),
    );
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
        py: { xs: 2, md: 3 },
        px: { xs: 1.5, sm: 2, md: 2.5, lg: 2.5 },
        boxSizing: "border-box",
      }}
    >
      {/* HEADER */}
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
          Insurance Provider
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
              placeholder="Search by Payor Name or Payor Code..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              inputProps={{
                "aria-label": "Search by payor name or payor code",
              }}
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
              navigate("/insurance-provider/edit", { state: { row: null } })
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

      {/* TABLE (sticky header, only this scrolls) */}
      <TableContainer
        sx={{
          flex: "0 1 auto",
          minHeight: 0,
          overflow: "auto",
          border: `1px solid ${T.border}`,
          borderRadius: "10px",
          background: `linear-gradient(to bottom, ${T.headBg} ${HEAD_H}px, #fff ${HEAD_H}px)`,
          "&::-webkit-scrollbar": { height: 6, width: 6 },
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
                <TableCell sx={cellSx}>{row.payorName}</TableCell>
                <TableCell sx={cellSx}>{row.payorCode}</TableCell>
                <TableCell
                  sx={{
                    ...cellSx,
                    maxWidth: 260,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {row.address}
                </TableCell>
                <TableCell sx={cellSx}>{row.fax}</TableCell>
                <TableCell align="center" sx={cellSx}>
                  <Checkbox
                    checked={row.active}
                    onChange={() => toggleActive(row.id)}
                    size="small"
                    sx={{
                      color: T.blue,
                      "&.Mui-checked": { color: T.blue },
                      "& .MuiSvgIcon-root": { fontSize: 20 },
                    }}
                  />
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ ...cellSx, borderRight: "none" }}
                >
                  <Stack
                    direction="row"
                    spacing={0.5}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Tooltip title="Edit" arrow>
                      <IconButton
                        size="small"
                        onClick={() =>
                          navigate("/insurance-provider/edit", {
                            state: { row },
                          })
                        }
                        sx={{
                          color: T.blue,
                          "&:hover": { bgcolor: "#EEF4FF" },
                        }}
                      >
                        <RPEditIcon width={20} height={20} color={T.blue} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Settings" arrow>
                      <IconButton
                        size="small"
                        sx={{
                          color: T.blue,
                          "&:hover": { bgcolor: "#EEF4FF" },
                        }}
                      >
                        <SettingsIcon2 width={20} height={20} color={T.blue} />
                      </IconButton>
                    </Tooltip>
                  </Stack>
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
                  No matching insurance providers found
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
