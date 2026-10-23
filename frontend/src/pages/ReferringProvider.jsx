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
  Checkbox,
  Badge,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import CloseIcon from "@mui/icons-material/Close";
import {
  RPEditIcon,
  RPAddIcon,
  RPDeleteIcon,
  FilterIcon,
  ExportIcon,
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
  page: "#F5F7FA", // same page bg as PreBillingClaim
};

/* Same thin scrollbar as PreBillingClaim */
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
/* Dummy rows                                                           */
/* ------------------------------------------------------------------ */
const SAMPLE = [
  [
    "Clare Jane",
    "Washington, Aleutians East Borough , AK 99571",
    "8475875747",
    "8475875747",
    "8475875747",
    "lipsum@gmail.com",
    "Hitex, Balance Report, Fresh",
  ],
  [
    "Adam Ross",
    "Boston, Suffolk County, MA 02108",
    "9123456780",
    "9123456781",
    "9123456782",
    "adam@gmail.com",
    "Fresh Original",
  ],
  [
    "Zoe Martin",
    "Denver, Denver County, CO 80202",
    "7345678123",
    "7345678124",
    "7345678125",
    "zoe@gmail.com",
    "Balance Report",
  ],
  [
    "Brian Cox",
    "Austin, Travis County, TX 78701",
    "6456781234",
    "6456781235",
    "6456781236",
    "brian@gmail.com",
    "Hitex",
  ],
  [
    "Maya Singh",
    "Chicago, Cook County, IL 60601",
    "9567812345",
    "9567812346",
    "9567812347",
    "maya@gmail.com",
    "Fresh Original",
  ],
  [
    "Liam Turner",
    "Seattle, King County, WA 98101",
    "5678123456",
    "5678123457",
    "5678123458",
    "liam@gmail.com",
    "Hitex, Fresh",
  ],
  [
    "Nora Blake",
    "Miami, Miami-Dade County, FL 33101",
    "8781234567",
    "8781234568",
    "8781234569",
    "nora@gmail.com",
    "Balance Report, Fresh",
  ],
  [
    "Ethan Hall",
    "Phoenix, Maricopa County, AZ 85001",
    "4892345678",
    "4892345679",
    "4892345670",
    "ethan@gmail.com",
    "Hitex",
  ],
  [
    "Ivy Morgan",
    "Portland, Multnomah County, OR 97201",
    "9903456781",
    "9903456782",
    "9903456783",
    "ivy@gmail.com",
    "Fresh Original",
  ],
  [
    "Owen Reed",
    "Dallas, Dallas County, TX 75201",
    "3014567812",
    "3014567813",
    "3014567814",
    "owen@gmail.com",
    "Balance Report",
  ],
  [
    "Ruby Fox",
    "Atlanta, Fulton County, GA 30301",
    "7125678123",
    "7125678124",
    "7125678125",
    "ruby@gmail.com",
    "Hitex, Balance Report",
  ],
  [
    "Caleb Young",
    "Houston, Harris County, TX 77001",
    "2236781234",
    "2236781235",
    "2236781236",
    "caleb@gmail.com",
    "Fresh",
  ],
  [
    "Clare Jane",
    "Washington, Aleutians East Borough, AK 99571",
    "8475875747",
    "8475875747",
    "8475875747",
    "lipsum@gmail.com",
    "Hitex, Balance Report, Fresh",
  ],
  [
    "Adam Ross",
    "Boston, Suffolk County, MA 02108",
    "9123456780",
    "9123456781",
    "9123456782",
    "adam@gmail.com",
    "Fresh Original",
  ],
  [
    "Zoe Martin",
    "Denver, Denver County, CO 80202",
    "7345678123",
    "7345678124",
    "7345678125",
    "zoe@gmail.com",
    "Balance Report",
  ],
  [
    "Brian Cox",
    "Austin, Travis County, TX 78701",
    "6456781234",
    "6456781235",
    "6456781236",
    "brian@gmail.com",
    "Hitex",
  ],
  [
    "Maya Singh",
    "Chicago, Cook County, IL 60601",
    "9567812345",
    "9567812346",
    "9567812347",
    "maya@gmail.com",
    "Fresh Original",
  ],
  [
    "Liam Turner",
    "Seattle, King County, WA 98101",
    "5678123456",
    "5678123457",
    "5678123458",
    "liam@gmail.com",
    "Hitex, Fresh",
  ],
  [
    "Nora Blake",
    "Miami, Miami-Dade County, FL 33101",
    "8781234567",
    "8781234568",
    "8781234569",
    "nora@gmail.com",
    "Balance Report, Fresh",
  ],
  [
    "Ethan Hall",
    "Phoenix, Maricopa County, AZ 85001",
    "4892345678",
    "4892345679",
    "4892345670",
    "ethan@gmail.com",
    "Hitex",
  ],
  [
    "Ivy Morgan",
    "Portland, Multnomah County, OR 97201",
    "9903456781",
    "9903456782",
    "9903456783",
    "ivy@gmail.com",
    "Fresh Original",
  ],
  [
    "Owen Reed",
    "Dallas, Dallas County, TX 75201",
    "3014567812",
    "3014567813",
    "3014567814",
    "owen@gmail.com",
    "Balance Report",
  ],
  [
    "Ruby Fox",
    "Atlanta, Fulton County, GA 30301",
    "7125678123",
    "7125678124",
    "7125678125",
    "ruby@gmail.com",
    "Hitex, Balance Report",
  ],
  [
    "Caleb Young",
    "Houston, Harris County, TX 77001",
    "2236781234",
    "2236781235",
    "2236781236",
    "caleb@gmail.com",
    "Fresh",
  ],
];

const ROWS = SAMPLE.map(
  ([providerName, address, npi, fax, mobile, email, practice], id) => ({
    id,
    providerName,
    address,
    npi,
    fax,
    mobile,
    email,
    practice,
  }),
);

/* ------------------------------------------------------------------ */
/* Table columns                                                        */
/* (remove `sort` to disable sorting on a column)                       */
/* ------------------------------------------------------------------ */
const COLUMNS = [
  { id: "providerName", label: "Provider Name", sort: "alpha" },
  { id: "address", label: "Address" },
  { id: "npi", label: "NPI", sort: "number" },
  { id: "fax", label: "Fax", sort: "number" },
  { id: "mobile", label: "Mobile" },
  { id: "email", label: "Email" },
  { id: "practice", label: "Practice", sort: "alpha" },
  { id: "actions", label: "Action", last: true },
];

const SORTABLE_COLUMNS = COLUMNS.filter((c) => c.sort);

/* Unique practice list (practice cell can hold "A, B, C") */
const splitPractices = (value) =>
  String(value ?? "")
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean);

const PRACTICE_OPTIONS = [
  ...new Set(ROWS.flatMap((r) => splitPractices(r.practice))),
].sort((a, b) => a.localeCompare(b));

/* ------------------------------------------------------------------ */
/* Search + filter helper                                               */
/* ------------------------------------------------------------------ */
const SEARCH_FIELDS = ["providerName", "npi", "practice"];

function filterRows(rows, query, practice) {
  const q = query.trim().toLowerCase();
  return rows.filter((row) => {
    const matchesSearch =
      !q ||
      SEARCH_FIELDS.some((field) =>
        String(row[field] ?? "")
          .toLowerCase()
          .includes(q),
      );
    const matchesPractice =
      !practice || splitPractices(row.practice).includes(practice);
    return matchesSearch && matchesPractice;
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
/* Shared cell sx  (values copied from PreBillingClaim)                 */
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
/* Header cell (arrow toggles sort) - same arrow size as PreBilling     */
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
/* Pagination  (copied from PreBillingClaim)                            */
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
      <DialogContent sx={{ px: { xs: 1, sm: 2 }, pt: 3, pb: 1 }}>
        <Typography
          sx={{ fontSize: 16, fontWeight: 700, color: "#111827", mb: 3 }}
        >
          Edit referring provider
        </Typography>

        {/* BASIC DETAILS */}
        <SectionTitle>Basic Details</SectionTitle>

        <FormRow
          fields={[
            { label: "First Name", placeholder: "Type here" },
            { label: "Last Name", placeholder: "Type here" },
            {
              label: "Date of Birth",
              placeholder: "Select location",
              select: true,
            },
            {
              label: "Sex",
              placeholder: "Select",
              select: true,
              options: ["Male", "Female", "Other"],
            },
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
            {
              label: "State Controlled Substance Number",
              placeholder: "Type here",
            },
            { label: "DEA Number", placeholder: "Type here" },
            {
              label: "Practice",
              placeholder: "Select",
              select: true,
              required: true,
            },
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
const EMPTY_DRAFT = { practice: "", sortBy: "", sortDir: "asc" };

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
export default function ReferringProvider() {
  const navigate = useNavigate();
  const [editOpen, setEditOpen] = React.useState(false);

  // search
  const [query, setQuery] = React.useState("");

  // filter (practice) + dialog open state
  const [practiceFilter, setPracticeFilter] = React.useState("");
  const [filterOpen, setFilterOpen] = React.useState(false);

  // pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(PAGE_SIZES[0]);

  // 1) filter (search + practice)  2) sort  3) slice for the current page
  const filteredRows = React.useMemo(
    () => filterRows(ROWS, query, practiceFilter),
    [query, practiceFilter],
  );

  const { sort, setSort, sortedRows, handleSort } = useSortedRows(
    filteredRows,
    COLUMNS,
  );

  // go back to page 1 whenever search / filter changes the number of rows
  React.useEffect(() => {
    setPage(0);
  }, [filteredRows.length]);

  const pagedRows = sortedRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  // badge count = active practice filter + active sort
  const activeFilterCount =
    (practiceFilter ? 1 : 0) + (sort.columnId && sort.dir ? 1 : 0);

  const handleFilterApply = (draft) => {
    setPracticeFilter(draft.practice);
    setSort(
      draft.sortBy
        ? { columnId: draft.sortBy, dir: draft.sortDir }
        : { columnId: null, dir: null },
    );
    setFilterOpen(false);
  };

  const handleFilterClear = () => {
    setPracticeFilter("");
    setSort({ columnId: null, dir: null });
    setFilterOpen(false);
  };

  // what the dialog should show when it opens
  const dialogInitial = {
    practice: practiceFilter,
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
        px: 2, // same side padding as PreBillingClaim table area
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
          gap: 1,
          mb: 1,
        }}
      >
        <Typography sx={{ fontSize: 16, fontWeight: 700, color: "#111827" }}>
          Referring Provider Management
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          flexWrap="wrap"
          alignItems="center"
          useFlexGap
        >
          {/* Search bar (same look as PreBillingClaim search) */}
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
              placeholder="Search by Name, NPI or Practice..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              inputProps={{ "aria-label": "Search referring providers" }}
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
            onClick={() =>
              navigate("/referring-provider/edit", { state: { row: null } })
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
                  <TableCell sx={listCellSx}>{row.providerName}</TableCell>
                  <TableCell sx={{ ...listCellSx, whiteSpace: "nowrap" }}>
                    {row.address}
                  </TableCell>
                  <TableCell sx={listCellSx}>{row.npi}</TableCell>
                  <TableCell sx={listCellSx}>{row.fax}</TableCell>
                  <TableCell sx={listCellSx}>{row.mobile}</TableCell>
                  <TableCell sx={{ ...listCellSx, whiteSpace: "nowrap" }}>
                    {row.email}
                  </TableCell>
                  <TableCell sx={listCellSx}>{row.practice}</TableCell>
                  <TableCell sx={listCellSx}>
                    <Tooltip title="Edit" arrow>
                      <IconButton
                        size="small"
                        onClick={() =>
                          navigate("/referring-provider/edit", {
                            state: { row },
                          })
                        }
                        sx={{
                          p: "4px",
                          color: T.blue,
                          "&:hover": { bgcolor: "#EEF4FF" },
                        }}
                      >
                        <RPEditIcon width={18} height={18} />
                      </IconButton>
                    </Tooltip>
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

      {/* FILTER & SORT DIALOG */}
      <FilterSortDialog
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        initial={dialogInitial}
        onApply={handleFilterApply}
        onClear={handleFilterClear}
      />

      {/* EDIT DIALOG */}
      <EditDialog open={editOpen} onClose={() => setEditOpen(false)} />
    </Box>
  );
}
