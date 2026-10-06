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
} from "@mui/material";
import {
  RPEditIcon,
  RPAddIcon,
  RPDeleteIcon,
  FilterIcon,
  ExportIcon,
  SearchIcon,
} from "../assets/Assets";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

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
  ["Clare Jane", "WashingtonUSe, Aleutians...", "8475875747", "8475875747", "8475875747", "lipsum@gmail...", "Hitex, Balance Report, Fresh"],
  ["Adam Ross", "Boston, Suffolk County...", "9123456780", "9123456781", "9123456782", "adam@gmail...", "Fresh Original"],
  ["Zoe Martin", "Denver, Denver County...", "7345678123", "7345678124", "7345678125", "zoe@gmail...", "Balance Report"],
  ["Brian Cox", "Austin, Travis County...", "6456781234", "6456781235", "6456781236", "brian@gmail...", "Hitex"],
  ["Maya Singh", "Chicago, Cook County...", "9567812345", "9567812346", "9567812347", "maya@gmail...", "Fresh Original"],
  ["Liam Turner", "Seattle, King County...", "5678123456", "5678123457", "5678123458", "liam@gmail...", "Hitex, Fresh"],
  ["Nora Blake", "Miami, Miami-Dade...", "8781234567", "8781234568", "8781234569", "nora@gmail...", "Balance Report, Fresh"],
  ["Ethan Hall", "Phoenix, Maricopa County...", "4892345678", "4892345679", "4892345670", "ethan@gmail...", "Hitex"],
  ["Ivy Morgan", "Portland, Multnomah...", "9903456781", "9903456782", "9903456783", "ivy@gmail...", "Fresh Original"],
  ["Owen Reed", "Dallas, Dallas County...", "3014567812", "3014567813", "3014567814", "owen@gmail...", "Balance Report"],
  ["Ruby Fox", "Atlanta, Fulton County...", "7125678123", "7125678124", "7125678125", "ruby@gmail...", "Hitex, Balance Report"],
  ["Caleb Young", "Houston, Harris County...", "2236781234", "2236781235", "2236781236", "caleb@gmail...", "Fresh"],
];

const ROWS = SAMPLE.map(
  ([providerName, address, npi, fax, mobile, email, practice], id) => ({
    id, providerName, address, npi, fax, mobile, email, practice,
  })
);

/* ------------------------------------------------------------------ */
/* Table columns                                                        */
/* ------------------------------------------------------------------ */
const COLUMNS = [
  { id: "providerName", label: "Provider Name", sort: "alpha" },
  { id: "address", label: "Address",},
  { id: "npi", label: "NPI", sort: "number" },
  { id: "fax", label: "Fax", sort: "number" },
  { id: "mobile", label: "Mobile",  },
  { id: "email", label: "Email",  },
  { id: "practice", label: "Practice", sort: "alpha" },
  { id: "actions", label: "Action", last: true },
];

/* ------------------------------------------------------------------ */
/* ✅ NEW: Search helper (Name, NPI, Practice only)                     */
/* ------------------------------------------------------------------ */
const SEARCH_FIELDS = ["providerName", "npi", "practice"];

function filterRows(rows, query) {
  const q = query.trim().toLowerCase();
  if (!q) return rows;
  return rows.filter((row) =>
    SEARCH_FIELDS.some((field) =>
      String(row[field] ?? "").toLowerCase().includes(q)
    )
  );
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

/* asc <-> desc only, no reset to original order */
function useSortedRows(rows, columns) {
  const [sort, setSort] = React.useState({ columnId: null, dir: null });

  const sortedRows = React.useMemo(() => {
    if (!sort.columnId || !sort.dir) return rows;
    const column = columns.find((c) => c.id === sort.columnId);
    if (!column?.sort) return rows;
    const factor = sort.dir === "asc" ? 1 : -1;
    const compare = COMPARERS[column.sort];
    return [...rows].sort(
      (a, b) => compare(a[sort.columnId], b[sort.columnId]) * factor
    );
  }, [rows, columns, sort]);

  const handleSort = (columnId) =>
    setSort((prev) => {
      if (prev.columnId !== columnId || !prev.dir)
        return { columnId, dir: "asc" };
      return { columnId, dir: prev.dir === "asc" ? "desc" : "asc" };
    });

  return { sort, sortedRows, handleSort };
}

/* ------------------------------------------------------------------ */
/* Shared cell sx                                                       */
/* ------------------------------------------------------------------ */
const cellSx = {
  borderBottom: `1px solid ${T.rowLine}`,
  py: 1.2,
  px: 1.5,
  fontSize: 12,
  color: "#2E2E2E",
};

const headCellSx = {
  ...cellSx,
  bgcolor: T.headBg,
  fontWeight: 700,
  fontSize: 13,
  color: "#373B4D",
  borderBottom: "none",
  borderRight: `1px solid ${T.border}`,
  whiteSpace: "nowrap",
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
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        {column.label}
        {column.sort && (
          <Tooltip title={titles[sortDir || "none"]} arrow>
            <IconButton
              size="small"
              aria-label={`Sort ${column.label}`}
              onClick={() => onSort(column.id)}
              sx={{
                p: 0.2,
                ml: "auto",
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
        gridTemplateColumns: {
          xs: "1fr",
          sm: "1fr 1fr",
          md: "repeat(4, 1fr)",
        },
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
  const [pcp, setPcp] = React.useState(true);

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
          Edit referring provider
        </Typography>

        {/* BASIC DETAILS */}
        <SectionTitle>Basic Details</SectionTitle>

        <FormRow
          fields={[
            { label: "First Name", placeholder: "Type here" },
            { label: "Last Name", placeholder: "Type here" },
            { label: "Date of Birth", placeholder: "Select location", select: true },
            { label: "Sex", placeholder: "Select", select: true, options: ["Male", "Female", "Other"] },
          ]}
        />

        <FormRow
          fields={[
            { label: "Select suffix", placeholder: "Select", select: true },
            { label: "Select prefix", placeholder: "Select", select: true },
            { label: "National Provider Identifier", placeholder: "Type here" },
            { label: "Group NPI", placeholder: "Type here" },
          ]}
        />

        <FormRow
          fields={[
            { label: "State License Number", placeholder: "Type here" },
            { label: "State Controlled Substance Number", placeholder: "Type here" },
            { label: "DEA Number", placeholder: "Type here" },
            { label: "Practice", placeholder: "Select", select: true, required: true },
          ]}
        />

        {/* PCP Toggle */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
          <Typography sx={{ fontSize: 13, fontWeight: 500, color: "#374151" }}>
            PCP
          </Typography>
          <Switch
            checked={pcp}
            onChange={(e) => setPcp(e.target.checked)}
            sx={{
              "& .MuiSwitch-switchBase.Mui-checked": { color: "#fff" },
              "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                bgcolor: "#22C55E",
              },
              "& .MuiSwitch-track": { borderRadius: 20 },
            }}
          />
        </Box>

        {/* ADDRESS */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 1.5,
          }}
        >
          <SectionTitle>Address</SectionTitle>
          <IconButton size="small" sx={{ color: "#EF4444" }}>
            <RPDeleteIcon width={18} height={18} color="#EF4444" />
          </IconButton>
        </Box>

        <FormRow
          fields={[
            { label: "Address Type", placeholder: "Basic" },
            { label: "Address 1", placeholder: "Address 1" },
            { label: "Address 2", placeholder: "Address 2", select: true },
            { label: "Zip Code", placeholder: "Type here" },
          ]}
        />

        <FormRow
          fields={[
            { label: "City", placeholder: "Type here" },
            { label: "Country", placeholder: "Select", select: true },
            { label: "State", placeholder: "Select", select: true },
            { label: "Country", placeholder: "Select", select: true },
          ]}
        />

        <FormRow
          fields={[
            { label: "Mobile Phone", placeholder: "Type here" },
            { label: "Work Contact No.", placeholder: "Type here" },
            { label: "Phone", placeholder: "Type here" },
            { label: "Fax", placeholder: "Select", select: true },
          ]}
        />

        <Box sx={{ mb: 3, maxWidth: { md: "25%" } }}>
          <FField label="E-mail" placeholder="Select" select />
        </Box>

        {/* SPECIALTY & TAXONOMY */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 1.5,
          }}
        >
          <SectionTitle>Specialty & Taxonomy</SectionTitle>
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
          <FField label="Specialty" placeholder="Select" select />
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box sx={{ flex: 1 }}>
              <FField label="Taxonomy" placeholder="Address 1" />
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
/* Main Page                                                            */
/* ------------------------------------------------------------------ */
export default function ReferringProvider() {
  const navigate = useNavigate();
  const [editOpen, setEditOpen] = React.useState(false);

  // ✅ NEW: search state
  const [query, setQuery] = React.useState("");

  // ✅ NEW: filter first, then sort the filtered result
  const filteredRows = React.useMemo(() => filterRows(ROWS, query), [query]);

  // ✅ CHANGED: sorting now runs on filteredRows instead of ROWS
  const { sort, sortedRows, handleSort } = useSortedRows(filteredRows, COLUMNS);

  return (
    <Box
      sx={{
        bgcolor: T.page,
        minHeight: "100vh",
        width: "100%",
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
          gap: 2,
          mb: 3,
        }}
      >
        <Typography sx={{ fontSize: 28, fontWeight: 700, color: "#111827" }}>
          Referring Provider Management
        </Typography>

        

        <Stack direction="row" spacing={1.5} flexWrap="wrap">

          {/* ✅ CHANGED: Search bar wired to local state */}
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
            "&:focus-within": { borderColor: "#DBE3EF" },
          }}
        >
          <SearchIcon width={14} height={14} color="#9CA3AF" />
          <InputBase
            placeholder="Search by Name, NPI or Practice..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            inputProps={{ "aria-label": "Search referring providers" }}
            sx={{
              fontSize: 12.5,
              flex: 1,
              "& input::placeholder": { color: "#9CA3AF", opacity: 1 },
            }}
          />
        </Box>
          <Button
            variant="outlined"
            startIcon={<FilterIcon color="#2563EB" />}
            sx={{
              textTransform: "none",
              fontSize: 13,
              fontWeight: 500,
              borderRadius: "8px",
              color: T.blue,
              border: "1.5px solid #015DFF",
              px: 2,
              "&:hover": { borderColor: T.blue, bgcolor: "#F4F8FF" },
            }}
          >
            Filter
          </Button>

          <Button
            variant="outlined"
            startIcon={<ExportIcon color="#2563EB" />}
            sx={{
              textTransform: "none",
              fontSize: 13,
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
            onClick={() => navigate("/referring-provider/edit", { state: { row: null } })}
            sx={{
              textTransform: "none",
              fontSize: 13,
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

      {/* TABLE */}
      <TableContainer
        sx={{
          border: `1px solid ${T.border}`,
          borderRadius: "10px",
          bgcolor: "#fff",
          overflowX: "auto",
        }}
      >
        <Table
          size="small"
          sx={{ tableLayout: "auto", borderCollapse: "collapse" }}
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
                <TableCell sx={cellSx}>{row.providerName}</TableCell>
                <TableCell sx={cellSx}>{row.address}</TableCell>
                <TableCell sx={cellSx}>{row.npi}</TableCell>
                <TableCell sx={cellSx}>{row.fax}</TableCell>
                <TableCell sx={cellSx}>{row.mobile}</TableCell>
                <TableCell sx={cellSx}>{row.email}</TableCell>
                <TableCell sx={cellSx}>{row.practice}</TableCell>
                <TableCell sx={{ ...cellSx, borderRight: "none" }}>
                  <Tooltip title="Edit" arrow>
                    <IconButton
                      size="small"
                      onClick={() => navigate("/referring-provider/edit", { state: { row } })}
                      sx={{
                        color: T.blue,
                        "&:hover": { bgcolor: "#EEF4FF" },
                      }}
                    >
                      <RPEditIcon width={20} height={20} />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}

            {/* ✅ NEW: empty state when search has no matches */}
            {sortedRows.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={COLUMNS.length}
                  align="center"
                  sx={{ ...cellSx, py: 4, color: "#9CA3AF", fontSize: 13 }}
                >
                  No matching providers found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* EDIT DIALOG */}
      <EditDialog open={editOpen} onClose={() => setEditOpen(false)} />
    </Box>
  );
}