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
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
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
  page: "#F7F9FC",
  headText: "#373B4D",
};

/* ------------------------------------------------------------------ */
/* Dummy rows — New tab                                                 */
/* ------------------------------------------------------------------ */
const NEW_ROWS = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  patientName: "Aamir Pathan",
  patientId: "863",
  dob: "05/13/1984",
  patientContact: "93709379028",
  totalUnapplied: "$0",
  totalCollected: "$20",
  totalRefund: "$0",
  lastRefundDate: "13/05/2026",
}));

/* ------------------------------------------------------------------ */
/* Dummy rows — History tab                                             */
/* ------------------------------------------------------------------ */
const HISTORY_ROWS = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  patientName: "Lisha Cook",
  patientId: "863",
  dob: "24/08/1965",
  refundId: "864",
  phone: "9759402598",
  refundAmount: "$200",
  lastUpdated: "12/05/2026",
  description: "-",
  status: "Draft",
}));

/* ------------------------------------------------------------------ */
/* Cell styles                                                          */
/* ------------------------------------------------------------------ */
const cellSx = {
  borderBottom: `1px solid ${T.rowLine}`,
  py: 1.1,
  px: 1.5,
  fontSize: 13,
  color: "#2E2E2E",
};

const headCellSx = {
  ...cellSx,
  bgcolor: T.headBg,
  fontWeight: 700,
  fontSize: 13,
  color: T.headText,
  borderBottom: "none",
  borderRight: `1px solid ${T.border}`,
  whiteSpace: "nowrap",
};

/* ------------------------------------------------------------------ */
/* Toolbar (shared)                                                     */
/* ------------------------------------------------------------------ */
function Toolbar({ activeTab, onTabChange }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 1.5,
        mb: 1.5,
      }}
    >
      {/* Left — tabs */}
      <Stack direction="row" spacing={1}>
        {["new", "history"].map((tab) => (
          <Box
            key={tab}
            onClick={() => onTabChange(tab)}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.6,
              px: 1.5,
              py: 0.5,
              borderRadius: "20px",
              cursor: "pointer",
              bgcolor: activeTab === tab ? T.blue : "#fff",
              border: activeTab === tab ? "none" : "1.5px solid #D1D5DB",
              color: activeTab === tab ? "#fff" : "#6B7280",
              fontSize: 13,
              fontWeight: 600,
              userSelect: "none",
              transition: "all 0.2s",
              "&:hover": activeTab !== tab ? { bgcolor: "#fff" } : {},
            }}
          >
            {tab === "new" ? "New" : "History"}
            <Box component="span" sx={{ fontWeight: 700 }}>
              15
            </Box>
          </Box>
        ))}
      </Stack>

      {/* Right — icons + search + filter */}
      <Stack direction="row" alignItems="center" spacing={1}>
        {/* Settings */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 58,
            height: 38,
            border: "1.5px solid #E5E7EB",
            borderRadius: "10px",
            bgcolor: "#fff",
            cursor: "pointer",
            boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
            "&:hover": { bgcolor: "#F9FAFB" },
          }}
        >
          <SettingsIcon />
        </Box>

        {/* Download */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 58,
            height: 38,
            border: "1.5px solid #E5E7EB",
            borderRadius: "10px",
            bgcolor: "#fff",
            cursor: "pointer",
            boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
            "&:hover": { bgcolor: "#F9FAFB" },
          }}
        >
          <DownloadIcon />
        </Box>

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
            "&:focus-within": { borderColor: "#DBE3EF" },
          }}
        >
          <SearchIcon width={14} height={14} color="#9CA3AF" />
          <InputBase
            placeholder="Search Patient, MRN, FIN, Rendering provider..."
            sx={{
              fontSize: 12.5,
              flex: 1,
              "& input::placeholder": { color: "#9CA3AF", opacity: 1 },
            }}
          />
        </Box>

        {/* Advanced filters */}
        <Button
          variant="outlined"
          startIcon={<FilterIcon1 width={14} height={14} color={T.blue} />}
          sx={{
            textTransform: "none",
            fontSize: 13,
            fontWeight: 600,
            borderRadius: "30px",
            bgcolor: "#fff",
            color: "#000",
            borderColor: "#D1D5DB",
            px: 1.5,
            whiteSpace: "nowrap",
            "&:hover": { borderColor: T.blue, bgcolor: "#F4F8FF" },
          }}
        >
          Advanced filters
        </Button>
      </Stack>
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* New Table                                                            */
/* ------------------------------------------------------------------ */
function NewTable() {
  const [selectAll, setSelectAll] = React.useState(false);
  const [selected, setSelected] = React.useState([]);

  const handleSelectAll = (e) => {
    setSelectAll(e.target.checked);
    setSelected(e.target.checked ? NEW_ROWS.map((r) => r.id) : []);
  };

  const handleSelect = (id) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  return (
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
            <TableCell
              padding="checkbox"
              sx={{ ...headCellSx, borderRight: `1px solid ${T.border}` }}
            >
              <Checkbox
                size="small"
                checked={selectAll}
                onChange={handleSelectAll}
                sx={{
                  p: 0,
                  color: "#C3CBD9",
                  "&.Mui-checked": { color: T.blue },
                }}
              />
            </TableCell>
            {[
              { label: "Patient name", arrow: true },
              { label: "ID", arrow: true },
              { label: "DOB", arrow: true },
              { label: "Patient Contact", arrow: true },
              { label: "Total Unapplied", arrow: true },
              { label: "Total Collected", arrow: true },
              { label: "Total Refund", arrow: true },
              { label: "Last Refund Issued Date", last: true },
            ].map((col) => (
              <TableCell
                key={col.label}
                sx={{
                  ...headCellSx,
                  borderRight: col.last ? "none" : `1px solid ${T.border}`,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  {col.label}
                  {col.arrow && (
                    <KeyboardArrowDownIcon
                      sx={{
                        fontSize: 16,
                        color: "#52525B",
                        ml: "auto",
                        flexShrink: 0,
                      }}
                    />
                  )}
                </Box>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {NEW_ROWS.map((row) => (
            <TableRow
              key={row.id}
              hover
              sx={{ bgcolor: "#fff", "&:hover": { bgcolor: "#FAFBFE" } }}
            >
              <TableCell padding="checkbox" sx={{ ...cellSx, pl: 1 }}>
                <Checkbox
                  size="small"
                  checked={selected.includes(row.id)}
                  onChange={() => handleSelect(row.id)}
                  sx={{
                    p: 0,
                    color: "#C3CBD9",
                    "&.Mui-checked": { color: T.blue },
                  }}
                />
              </TableCell>
              <TableCell sx={cellSx}>{row.patientName}</TableCell>
              <TableCell sx={cellSx}>{row.patientId}</TableCell>
              <TableCell sx={cellSx}>{row.dob}</TableCell>
              <TableCell sx={cellSx}>{row.patientContact}</TableCell>
              <TableCell sx={cellSx}>{row.totalUnapplied}</TableCell>
              <TableCell sx={cellSx}>{row.totalCollected}</TableCell>
              <TableCell sx={cellSx}>{row.totalRefund}</TableCell>
              <TableCell sx={{ ...cellSx, borderRight: "none" }}>
                {row.lastRefundDate}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

/* ------------------------------------------------------------------ */
/* History Table                                                        */
/* ------------------------------------------------------------------ */
function HistoryTable() {
  const [selectAll, setSelectAll] = React.useState(false);
  const [selected, setSelected] = React.useState([]);

  const handleSelectAll = (e) => {
    setSelectAll(e.target.checked);
    setSelected(e.target.checked ? HISTORY_ROWS.map((r) => r.id) : []);
  };

  const handleSelect = (id) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  return (
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
            <TableCell
              padding="checkbox"
              sx={{ ...headCellSx, borderRight: `1px solid ${T.border}` }}
            >
              <Checkbox
                size="small"
                checked={selectAll}
                onChange={handleSelectAll}
                sx={{
                  p: 0,
                  color: "#C3CBD9",
                  "&.Mui-checked": { color: T.blue },
                }}
              />
            </TableCell>
            {[
              { label: "Patient name", arrow: true },
              { label: "Patient ID", arrow: true },
              { label: "DOB", arrow: true },
              { label: "Refund ID", arrow: true },
              { label: "Phone number", arrow: true },
              { label: "Refund Amount", arrow: true },
              { label: "Last updated", arrow: true },
              { label: "Description" },
              { label: "Status", arrow: true },
              { label: "Action", last: true },
            ].map((col) => (
              <TableCell
                key={col.label}
                sx={{
                  ...headCellSx,
                  borderRight: col.last ? "none" : `1px solid ${T.border}`,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  {col.label}
                  {col.arrow && (
                    <KeyboardArrowDownIcon
                      sx={{
                        fontSize: 16,
                        color: "#52525B",
                        ml: "auto",
                        flexShrink: 0,
                      }}
                    />
                  )}
                </Box>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {HISTORY_ROWS.map((row) => (
            <TableRow
              key={row.id}
              hover
              sx={{ bgcolor: "#fff", "&:hover": { bgcolor: "#FAFBFE" } }}
            >
              <TableCell padding="checkbox" sx={{ ...cellSx, pl: 1 }}>
                <Checkbox
                  size="small"
                  checked={selected.includes(row.id)}
                  onChange={() => handleSelect(row.id)}
                  sx={{
                    p: 0,
                    color: "#C3CBD9",
                    "&.Mui-checked": { color: T.blue },
                  }}
                />
              </TableCell>
              <TableCell sx={{ cellSx, fontWeight: 600 }}>
                {row.patientName}
              </TableCell>
              <TableCell sx={cellSx}>{row.patientId}</TableCell>
              <TableCell sx={cellSx}>{row.dob}</TableCell>
              <TableCell sx={cellSx}>{row.refundId}</TableCell>
              <TableCell sx={cellSx}>{row.phone}</TableCell>
              <TableCell sx={{ ...cellSx, color: "#8A5B12", fontWeight: 500 }}>
                {row.refundAmount}
              </TableCell>
              <TableCell sx={cellSx}>{row.lastUpdated}</TableCell>
              <TableCell sx={cellSx}>{row.description}</TableCell>
              <TableCell sx={cellSx}>
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    px: 1.5,
                    py: 0.3,
                    borderRadius: "6px",
                    bgcolor: "#EEF4FF",
                    color: T.blue,
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  {row.status}
                </Box>
              </TableCell>
              <TableCell sx={{ ...cellSx, borderRight: "none" }}>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  <IconButton
                    size="small"
                    sx={{ color: T.blue, "&:hover": { bgcolor: "#EEF4FF" } }}
                  >
                    <InfoOutlinedIcon width={18} height={18} color={T.blue} />
                  </IconButton>
                  <IconButton
                    size="small"
                    sx={{ color: T.blue, "&:hover": { bgcolor: "#EEF4FF" } }}
                  >
                    <RPDeleteIcon width={24} height={24} color={T.blue} />
                  </IconButton>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

/* ------------------------------------------------------------------ */
/* Main Page                                                            */
/* ------------------------------------------------------------------ */
export default function RefundsNew() {
  const [activeTab, setActiveTab] = React.useState("new");

  return (
    <Box
      sx={{
        bgcolor: T.page,
        minHeight: "100vh",
        width: "100%",
        py: { xs: 2, md: 3 },
        px: { xs: 2, sm: 3, md: 5, lg: 7 },
        boxSizing: "border-box",
      }}
    >
      {/* ── PAGE HEADER ── */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
          mb: 2.5,
        }}
      >
        <Typography sx={{ fontSize: 22, fontWeight: 700, color: "#111827" }}>
          Refunds
        </Typography>

        <Stack direction="row" spacing={1.5}>
          <Button
            variant="outlined"
            sx={{
              textTransform: "none",
              fontSize: 13,
              fontWeight: 600,
              borderRadius: "8px",
              color: "#374151",
              borderColor: "#D1D5DB",
              bgcolor: "#fff",
              px: 2.5,
              "&:hover": { bgcolor: "#F9FAFB" },
            }}
          >
            Save as draft
          </Button>
          <Button
            variant="contained"
            disableElevation
            sx={{
              textTransform: "none",
              fontSize: 13,
              fontWeight: 600,
              borderRadius: "8px",
              bgcolor: T.blue,
              px: 2.5,
              "&:hover": { bgcolor: "#1D4ED8" },
            }}
          >
            Generate statements
          </Button>
        </Stack>
      </Box>

      {/* ── TOOLBAR ── */}
      <Toolbar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* ── TABLE — switches based on tab ── */}
      {activeTab === "new" ? <NewTable /> : <HistoryTable />}
    </Box>
  );
}
