import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
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
} from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
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
  headBg: "#EBF1FE",
  fieldBorder: "#D5DCE8",
  page: "#F7F9FC",
};

/* ------------------------------------------------------------------ */
/* Table columns                                                       */
/* ------------------------------------------------------------------ */

const COLUMNS = [
  { id: "name", label: "Name, Age (Gender)", width: "22%" },
  { id: "location", label: "Location", width: "15%", adornment: "alpha" },
  { id: "mrn", label: "MRN (Patient ID)", width: "15%" },
  { id: "dob", label: "DOB", width: "12%", adornment: "date" },
  { id: "physician", label: "Physician", width: "14%", adornment: "alpha" },
  { id: "actions", label: "Actions", width: "22%", noWrap: true },
];

/* Sortable columns for the dialog */
const SORTABLE_COLUMNS = [
  { id: "location", label: "Location", sort: "alpha" },
  { id: "dob", label: "DOB", sort: "date" },
  { id: "physician", label: "Physician", sort: "alpha" },
];

const SORT_ORDER_LABELS = {
  alpha: { asc: "A to Z", desc: "Z to A" },
  date: { asc: "Oldest First", desc: "Newest First" },
};

const SORT_TITLES = {
  alpha: { asc: "Sorted A–Z", desc: "Sorted Z–A", none: "Sort A–Z" },
  date: {
    asc: "Sorted Oldest First",
    desc: "Sorted Newest First",
    none: "Sort Oldest First",
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
  [
    "Lisha Cook",
    45,
    "F",
    "GCH–IH",
    "719471345",
    "ID: NA",
    "11/20/2025",
    "Julia R",
  ],
  [
    "Rahul Sharma",
    52,
    "M",
    "GCH–OP",
    "874382743",
    "ID: 4521",
    "03/14/1973",
    "Amit K",
  ],
  [
    "Priya Patel",
    34,
    "F",
    "GCH–ICU",
    "892891989",
    "ID: NA",
    "07/02/1991",
    "Julia R",
  ],
  [
    "John Miller",
    61,
    "M",
    "GCH–IH",
    "728374888",
    "ID: 8810",
    "01/29/1964",
    "Sara L",
  ],
  [
    "Anita Desai",
    28,
    "F",
    "GCH–ER",
    "909238484",
    "ID: NA",
    "09/18/1997",
    "Amit K",
  ],
  [
    "Mark Wilson",
    47,
    "M",
    "GCH–OP",
    "322736772",
    "ID: 3307",
    "05/06/1978",
    "Sara L",
  ],
  [
    "Sneha Kulkarni",
    39,
    "F",
    "GCH–ICU",
    "719471351",
    "ID: NA",
    "12/11/1986",
    "Julia R",
  ],
  [
    "David Brown",
    70,
    "M",
    "GCH–IH",
    "242657545",
    "ID: 9942",
    "08/23/1955",
    "Amit K",
  ],
  [
    "Meera Nair",
    55,
    "F",
    "GCH–ER",
    "232446577",
    "ID: NA",
    "02/17/1970",
    "Sara L",
  ],
  [
    "Kevin Zhang",
    30,
    "M",
    "GCH–OP",
    "456547677",
    "ID: 1180",
    "10/09/1995",
    "Julia R",
  ],
  [
    "Fatima Khan",
    42,
    "F",
    "GCH–IH",
    "565756545",
    "ID: NA",
    "04/25/1983",
    "Amit K",
  ],
  [
    "Robert King",
    66,
    "M",
    "GCH–ICU",
    "877876655",
    "ID: 7754",
    "06/30/1959",
    "Sara L",
  ],
  [
    "Kobert King",
    66,
    "M",
    "BCH–ICU",
    "333333333",
    "ID: 7754",
    "06/30/1959",
    "Sara L",
  ],
  [
    "Nora Blake",
    50,
    "F",
    "GCH–ICU",
    "557575665",
    "ID: 3310",
    "06/30/1975",
    "Bara L",
  ],
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
const PHYSICIAN_OPTIONS = [...new Set(ALL_ROWS.map((r) => r.physician))].sort(
  (a, b) => a.localeCompare(b),
);

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
        display: "flex",
        alignItems: "center",
        gap: 1,
        height: 36,
        width: "100%",
        minWidth: 0,
        px: 1.5,
        bgcolor: "#fff",
        border: `1px solid ${T.fieldBorder}`,
        borderRadius: "8px",
        boxSizing: "border-box",
        transition: "border-color .15s ease",
        "&:hover": { borderColor: "#015DFF" },
        "&:focus-within": { borderColor: "#015DFF" },
      }}
    >
      <SearchGlassIcon />
      <InputBase
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search patients by name or MRN..."
        inputProps={{ "aria-label": "Search patients by name or MRN" }}
        sx={{
          flex: 1,
          minWidth: 0,
          fontSize: 12,
          color: "#171923",
          "& input": { minWidth: 0 },
          "& input::placeholder": { color: "#171923", opacity: 1 },
        }}
      />
      {value && (
        <IconButton
          size="small"
          aria-label="Clear search"
          onClick={() => onChange("")}
          sx={{ p: 0.3 }}
        >
          <ClearIcon sx={{ fontSize: 12, color: T.muted }} />
        </IconButton>
      )}
    </Box>
  );
}

const outlinedActionSx = {
  height: 36,
  px: 1.5,
  gap: 0.6,
  borderRadius: "8px",
  textTransform: "none",
  fontSize: 12,
  fontWeight: 500,
  color: T.blue,
  border: "1.5px solid #015DFF",
  bgcolor: "#fff",
  whiteSpace: "nowrap",
  flexShrink: 0,
  "&:hover": { borderColor: "#015DFF", bgcolor: "#F4F8FF" },
  "& .MuiButton-startIcon": { mr: 0, ml: 0 },
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
        width: "100%",
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "auto minmax(220px, 1fr)",
          md: "auto minmax(240px, 1fr) auto",
        },
        alignItems: "center",
        columnGap: { xs: 1.5, sm: 2, md: 4 },
        rowGap: 1.5,
        pb: 2,
        boxSizing: "border-box",
      }}
    >
      <Typography
        sx={{
          fontSize: 20,
          fontWeight: 700,
          color: "#171923",
          letterSpacing: "-0.2px",
          whiteSpace: "nowrap",
          lineHeight: 1,
        }}
      >
        All Patients
      </Typography>

      <Box
        sx={{
          width: "100%",
          minWidth: 0,
          gridColumn: { xs: "1 / -1", sm: "2 / 3", md: "2 / 3" },
          gridRow: { xs: 2, sm: 1, md: 1 },
        }}
      >
        <SearchField value={query} onChange={onQueryChange} />
      </Box>

      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{
          minWidth: 0,
          flexShrink: 0,
          gridColumn: { xs: "1 / -1", sm: "1 / -1", md: "3 / 4" },
          gridRow: { xs: 3, sm: 2, md: 1 },
          justifyContent: { xs: "flex-start", sm: "flex-end", md: "flex-end" },
          flexWrap: { xs: "wrap", sm: "nowrap", md: "nowrap" },
          rowGap: 1,
        }}
      >
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
            startIcon={<FilterIcon />}
            onClick={onFilterOpen}
            sx={{
              ...outlinedActionSx,
              bgcolor: activeFilterCount > 0 ? "#EFF6FF" : "#fff",
            }}
          >
            Filter
          </Button>
        </Badge>

        <Button
          variant="outlined"
          startIcon={<ExportIcon />}
          sx={outlinedActionSx}
        >
          Export
        </Button>

        <Button
          variant="contained"
          disableElevation
          onClick={onAddNewPatient}
          sx={{
            height: 36,
            px: 2.25,
            borderRadius: "8px",
            textTransform: "none",
            fontSize: 12,
            fontWeight: 500,
            bgcolor: T.blue,
            whiteSpace: "nowrap",
            flexShrink: 0,
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

function FilterSortDialog({ open, onClose, initial, onApply, onClear }) {
  const [category, setCategory] = React.useState("physician");
  const [draft, setDraft] = React.useState(EMPTY_DRAFT);
  const [phSearch, setPhSearch] = React.useState("");

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

  const filteredPhysicians = PHYSICIAN_OPTIONS.filter((p) =>
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
          height: "420px !important",
          minHeight: "420px !important",
          maxHeight: "65vh !important",
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
            height: "55vh !important",
            minHeight: "55vh !important",
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
            Filter &amp; Sort
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
              Filter By
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
                      ? "3px solid rgba(1,93,255,1)"
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
                    placeholder="Search Physician..."
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
                      No Physicians Found
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
              "@media (max-width: 400px)": { fontSize: 12, py: 0.8 },
            }}
          >
            Clear All
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
              "@media (max-width: 400px)": { fontSize: 12, py: 0.8 },
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
/* Shared cell sx                                                      */
/* ------------------------------------------------------------------ */

const HEAD_H = 44;

const cellSx = {
  borderBottom: `1px solid ${T.rowLine}`,
  py: 1.2,
  px: 1,
  fontSize: 12,
  color: T.bodyText,
  boxSizing: "border-box",
  textAlign: "center",
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
        ...cellSx,
        width: column.width,
        height: HEAD_H,
        bgcolor: T.headBg,
        borderRight: isLast ? "none" : `1px solid ${T.border}`,
        borderBottom: `1px solid ${T.border}`,
        fontSize: 12,
        fontWeight: 700,
        color: T.headText,
        whiteSpace: "nowrap",
        lineHeight: 1.25,
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 0.5,
          minWidth: 0,
          width: "100%",
        }}
      >
        <Box
          component="span"
          sx={{
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
        px: 1.5,
        py: 0.5,
        fontSize: 12,
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

const checkboxSx = {
  p: 0,
  color: "#C3CBD9",
  "&.Mui-checked": { color: T.blue },
  "& .MuiSvgIcon-root": { fontSize: 18 },
};

/* ------------------------------------------------------------------ */
/* Patient Row                                                         */
/* ------------------------------------------------------------------ */

function PatientRow({ row, selected, onToggle }) {
  return (
    <TableRow hover sx={{ "&:hover": { bgcolor: "#FAFBFE" } }}>
      {/* Checkbox */}
      <TableCell
        padding="checkbox"
        sx={{
          ...cellSx,
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
          ...cellSx,
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
          ...cellSx,
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
          ...cellSx,
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
          ...cellSx,
          width: "12%",
          color: T.dobText,
          whiteSpace: "nowrap",
        }}
      >
        {row.dob}
      </TableCell>

      {/* Physician */}
      <TableCell sx={{ ...cellSx, width: "14%", overflow: "hidden" }}>
        <PhysicianChip label={row.physician} />
      </TableCell>

      {/* Actions */}
      <TableCell
        sx={{
          ...cellSx,
          width: "22%",
          whiteSpace: "nowrap",
          pl: 0.5,
          pr: 1,
          overflow: "hidden",
          borderRight: "none",
        }}
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
        flex: "0 1 auto",
        minHeight: 0,
        overflow: "auto",
        width: "100%",
        maxWidth: "100%",
        border: `1px solid ${T.border}`,
        borderRadius: "8px",
        background: `linear-gradient(to bottom, ${T.headBg} ${HEAD_H}px, #fff ${HEAD_H}px)`,
        boxSizing: "border-box",
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
        sx={{
          width: "100%",
          minWidth: 0,
          tableLayout: "auto",
          borderCollapse: "separate",
          borderSpacing: 0,
          boxSizing: "border-box",
          "& th, & td": { boxSizing: "border-box" },
          "& .MuiTableCell-stickyHeader": {
            backgroundColor: `${T.headBg} !important`,
          },
        }}
        size="small"
        aria-label="All patients"
      >
        <TableHead>
          <TableRow>
            {/* Select-all checkbox */}
            <TableCell
              padding="checkbox"
              sx={{
                ...cellSx,
                width: "4%",
                minWidth: 38,
                maxWidth: 42,
                pl: 0.4,
                pr: 0.2,
                height: HEAD_H,
                bgcolor: T.headBg,
                borderRight: `1px solid ${T.border}`,
                borderBottom: `1px solid ${T.border}`,
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
              <TableCell
                colSpan={COLUMNS.length + 1}
                sx={{
                  ...cellSx,
                  py: 4,
                  color: T.muted,
                  fontSize: 13,
                }}
              >
                No Patients Found
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

  const rows = React.useMemo(() => ALL_ROWS, []);

  /* Search + filter + sort */
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

  const toggleAll = (event) =>
    setSelected(event.target.checked ? visibleRows.map((r) => r.id) : []);

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
        py: { xs: 1.5, sm: 2, md: 2 },
        px: { xs: 1, sm: 1.5, md: 2, lg: 2.5, xl: 2.5 },
        boxSizing: "border-box",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: "none",
          mx: 0,
          bgcolor: "transparent",
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minHeight: 0,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "100%",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            flex: 1,
            minHeight: 0,
          }}
        >
          <Toolbar
            query={query}
            onQueryChange={setQuery}
            onAddNewPatient={handleAddNewPatient}
            onFilterOpen={() => setFilterOpen(true)}
            activeFilterCount={activeFilterCount}
          />

          <Box
            sx={{
              width: "100%",
              maxWidth: "100%",
              pb: 3,
              boxSizing: "border-box",
              flex: 1,
              minHeight: 0,
              display: "flex",
              flexDirection: "column",
            }}
          >
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
