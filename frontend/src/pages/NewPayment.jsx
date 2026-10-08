import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  InputAdornment,
  Chip,
  Tab,
  Tabs,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  CalendarToday,
  Search as SearchIcon,
  Add,
  Close,
  KeyboardArrowDown,
} from "@mui/icons-material";
import { RPDeleteIcon, DownloadIcon2 } from "../assets/Assets";
import { useNavigate } from "react-router-dom";

/* ─────────────────────────────────────────────
   Shared style helpers
───────────────────────────────────────────── */
const thinScroll = {
  "&::-webkit-scrollbar": { width: 4, height: 4 },
  "&::-webkit-scrollbar-track": { background: "transparent" },
  "&::-webkit-scrollbar-thumb": { background: "#D1D5DB", borderRadius: 2 },
};

const labelSx = {
  fontSize: 11,
  fontWeight: 500,
  color: "#6B7280",
  mb: 0.5,
  display: "block",
};

const inputSx = {
  width: "100%",
  "& .MuiOutlinedInput-root": {
    width: "100%",
    height: 34,
    minHeight: 34,
    boxSizing: "border-box",
    fontSize: 12,
    borderRadius: "6px",
    backgroundColor: "#F9FAFC",
    color: "#1F2937",
    "& fieldset": {
      borderColor: "#E5E7EB",
    },
    "&:hover fieldset": {
      borderColor: "#D1D5DB",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#0066FF",
    },
    "& input": {
      height: "100%",
      boxSizing: "border-box",
      padding: "0 10px",
      fontSize: 12,
    },
    "& .MuiInputAdornment-root": {
      marginRight: 6,
    },
  },
  "& .MuiSelect-select": {
    minHeight: "34px !important",
    height: "34px",
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    padding: "0 32px 0 10px !important",
    fontSize: 12,
  },
  "& .MuiSelect-icon": {
    color: "#6B7280",
    right: 6,
    fontSize: 18,
  },
};

const cardSx = {
  backgroundColor: "#FFFFFF",
  borderRadius: "8px",
  border: "1px solid #E5E7EB",
  p: 2,
  boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
};

const cardTitleSx = {
  fontSize: 13,
  fontWeight: 700,
  color: "#1F2937",
  mb: 1.2,
};

/* ─────────────────────────────────────────────
   Small helpers
───────────────────────────────────────────── */
function FL({ children, required }) {
  return (
    <Typography sx={labelSx}>
      {children}
      {required && (
        <Box component="span" sx={{ color: "#EF4444", ml: 0.3 }}>
          *
        </Box>
      )}
    </Typography>
  );
}

function FInput({
  label,
  value,
  onChange,
  placeholder,
  calendar,
  required,
  endIcon,
}) {
  return (
    <Box>
      <FL required={required}>{label}</FL>
      <TextField
        fullWidth
        size="small"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        sx={inputSx}
        InputProps={{
          endAdornment: calendar ? (
            <InputAdornment position="end">
              <CalendarToday sx={{ fontSize: 15, color: "#0066FF" }} />
            </InputAdornment>
          ) : endIcon ? (
            <InputAdornment position="end">{endIcon}</InputAdornment>
          ) : undefined,
        }}
      />
    </Box>
  );
}

function FSelect({ label, value, onChange, options, required }) {
  return (
    <Box>
      <FL required={required}>{label}</FL>
      <FormControl fullWidth size="small" sx={inputSx}>
        <Select
          value={value}
          onChange={onChange}
          IconComponent={KeyboardArrowDown}
        >
          {options.map((o) => (
            <MenuItem
              key={o.value ?? o}
              value={o.value ?? o}
              sx={{ fontSize: 12 }}
            >
              {o.label ?? o}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

/* ─────────────────────────────────────────────
   Static data
───────────────────────────────────────────── */
const CHARGES = Array.from({ length: 4 }, (_, i) => ({
  id: i + 1,
  svcDate: "04/14/2025",
  description: "22551 - Fusion of upper spine bone",
  mod: "62",
  charges: "$5,573.52",
  balance: "$660.72",
  patResp: "$660.72",
  thisPayment: "$0.00",
}));

const ATTACHMENTS = [
  {
    id: 1,
    fileName: "EOB_150219802000.pdf",
    tag: "EOB",
    referenceNumber: "150219802000",
    comments: "Primary Payor EOB — BCBS of Michigan",
    uploadedOn: "09/13/2026",
  },
];

const EOB_TRANSACTIONS = [
  {
    date: "26 Aug 26",
    transaction: "Claim created and added to Queue",
    amount: "$550.14",
    patResp: "$550.14",
    balance: "$550.14",
  },
  {
    date: "26 Aug 26",
    transaction: "Claim submitted to Payor - ICIC, $150",
    amount: "–",
    patResp: "$0.00",
    balance: "$550.14",
  },
  {
    date: "26 Aug 26",
    transaction: "Payor Settlement EFT/Check: 150219802000/0906",
    amount: "$0.00",
    patResp: "$0.00",
    balance: "$550.14",
  },
  {
    date: "26 Aug 26",
    transaction:
      "Patient Responsibility - PR-1: $3.96, PR-2: $15.36, PR-3: $13.52.",
    amount: "$0.00",
    patResp: "$0.00",
    balance: "$550.14",
  },
  {
    date: "26 Aug 26",
    transaction:
      "Transferred to Insurance responsibility (Action: None, Status: E-submit to secondary)",
    amount: "$0.00",
    patResp: "$0.00",
    balance: "$550.14",
  },
];

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */
export default function NewPayment() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // < 600
  const isTablet = useMediaQuery(theme.breakpoints.down("lg")); // < 1200

  /* ── form state ── */
  const [batch, setBatch] = useState("");
  const [postDate, setPostDate] = useState("09/26/2026");
  const [type, setType] = useState("Patient");
  const [patient, setPatient] = useState("Rivet, Stacie  ID 2522");
  const [appointment, setAppointment] = useState("");
  const [category, setCategory] = useState("None");
  const [method, setMethod] = useState("3 - Credit Card");
  const [reference, setReference] = useState("");
  const [amount, setAmount] = useState("$50.00");
  const [notes, setNotes] = useState("");

  /* ── line posting state ── */
  const [copayDue, setCopayDue] = useState("$0.00");
  const [paid, setPaid] = useState("$0.00");
  const [status, setStatus] = useState("Default");
  const [statusReason, setStatusReason] = useState("0 - None");
  const [lineNote, setLineNote] = useState("");

  /* ── other state ── */
  const [showOnly, setShowOnly] = useState("Selected");
  const [lineTab, setLineTab] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);

  const toggleRow = (id) =>
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  /* ─────────────────────────────────────────────
     SUMMARY block values (derived)
  ───────────────────────────────────────────── */
  const summaryItems = [
    { label: "Total Amount", value: "$50.00", color: "#1F2937", bg: "#F3F4F6" },
    { label: "Applied to Charges", value: "$0.00", color: "#1F2937", bg: "#F3F4F6" },
    {
      label: "Applied to Capitated",
      value: "$0.00",
      color: "#1F2937",
      bg: "#F3F4F6",
    },
    { label: "Adjustments", value: "$0.00", color: "#1F2937", bg: "#F3F4F6" },
    { label: "Refunds", value: "$0.00", color: "#1F2937", bg: "#F3F4F6" },
    { label: "Unapplied", value: "$50.00", color: "#7A4300", bg: "#FFF1DC" },
  ];

  /* ─────────────────────────────────────────────
     HEADER buttons
  ───────────────────────────────────────────── */
  const headerBtnSx = {
    textTransform: "none",
    borderColor: "#E5E7EB",
    color: "#374151",
    fontSize: 12,
    borderRadius: "8px",
    backgroundColor: "#FFFFFF",
    fontWeight: 700,
    height: 34,
    px: 1.6,
    whiteSpace: "nowrap",
    "&:hover": { borderColor: "#D1D5DB", backgroundColor: "#F9FAFB" },
  };

  /* ─────────────────────────────────────────────
     LEFT PANEL
  ───────────────────────────────────────────── */
  const leftPanel = (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
      {/* ── Payment Details card ── */}
      <Box sx={cardSx}>
        <Typography sx={cardTitleSx}>Payment Details</Typography>

        {/* Row 1: Batch #  |  Post Date  |  Type  — 3 equal cols */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr 1fr" },
            gap: 1.5,
            mb: 1.5,
          }}
        >
          <Box>
            <Typography sx={labelSx}>Batch #</Typography>
            <TextField
              fullWidth
              size="small"
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
              placeholder="Enter batch"
              sx={inputSx}
            />
          </Box>
          <Box>
            <Typography sx={labelSx}>Post Date</Typography>
            <TextField
              fullWidth
              size="small"
              value={postDate}
              onChange={(e) => setPostDate(e.target.value)}
              sx={inputSx}
            />
          </Box>
          <Box>
            <Typography sx={labelSx}>Type</Typography>
            <FormControl fullWidth size="small" sx={inputSx}>
              <Select
                value={type}
                onChange={(e) => setType(e.target.value)}
                IconComponent={KeyboardArrowDown}
              >
                <MenuItem value="Patient" sx={{ fontSize: 12 }}>
                  Patient
                </MenuItem>
                <MenuItem value="Insurance" sx={{ fontSize: 12 }}>
                  Insurance
                </MenuItem>
                <MenuItem value="Employer" sx={{ fontSize: 12 }}>
                  Employer
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        {/* Row 2: Patient (wider) | Appointment — 3:2 ratio */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "3fr 2fr" },
            gap: 1.5,
            mb: 1.5,
          }}
        >
          <Box>
            <Typography sx={labelSx}>Patient</Typography>
            <TextField
              fullWidth
              size="small"
              value={patient}
              onChange={(e) => setPatient(e.target.value)}
              sx={inputSx}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    sx={{ mr: 0.5, cursor: "pointer" }}
                  >
                    <SearchIcon sx={{ fontSize: 18, color: "#6B7280" }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box>
            <Typography sx={labelSx}>Appointment</Typography>
            <TextField
              fullWidth
              size="small"
              value={appointment}
              onChange={(e) => setAppointment(e.target.value)}
              placeholder="Select"
              sx={inputSx}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" sx={{ mr: 0.5 }}>
                    <Close
                      sx={{ fontSize: 16, color: "#9CA3AF", cursor: "pointer" }}
                    />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>

        {/* Row 3: Category | Method | Reference # — 3 equal cols */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr 1fr" },
            gap: 1.5,
            mb: 1.5,
          }}
        >
          <Box>
            <Typography sx={labelSx}>Category</Typography>
            <FormControl fullWidth size="small" sx={inputSx}>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                IconComponent={KeyboardArrowDown}
              >
                {["None", "Copay", "Deductible", "Coinsurance"].map((o) => (
                  <MenuItem key={o} value={o} sx={{ fontSize: 12 }}>
                    {o}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box>
            <Typography sx={labelSx}>Method</Typography>
            <FormControl fullWidth size="small" sx={inputSx}>
              <Select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                IconComponent={KeyboardArrowDown}
              >
                {["3 - Credit Card", "1 - Cash", "2 - Check", "4 - EFT"].map(
                  (o) => (
                    <MenuItem key={o} value={o} sx={{ fontSize: 12 }}>
                      {o}
                    </MenuItem>
                  ),
                )}
              </Select>
            </FormControl>
          </Box>
          <Box>
            <Typography sx={labelSx}>Reference #</Typography>
            <TextField
              fullWidth
              size="small"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              placeholder="Type here"
              sx={inputSx}
            />
          </Box>
        </Box>

        {/* Row 4: Amount (narrower) | Notes (wider, multiline) */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "2fr 3fr" },
            gap: 1.5,
          }}
        >
          <Box>
            <Typography sx={labelSx}>Amount</Typography>
            <TextField
              fullWidth
              size="small"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              sx={{
                ...inputSx,
                "& .MuiOutlinedInput-root": {
                  ...inputSx["& .MuiOutlinedInput-root"],
                  "& input": { fontWeight: 700, color: "#1F2937" },
                },
              }}
            />
          </Box>
          <Box>
            <Typography sx={labelSx}>Notes</Typography>
            <TextField
              fullWidth
              size="small"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add a note (1000 characters max)"
              sx={inputSx}
            />
          </Box>
        </Box>
      </Box>

      {/* ── Summary card ── */}
      <Box sx={cardSx}>
        <Typography sx={cardTitleSx}>Summary</Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(3, 1fr)" },
            gap: 1,
          }}
        >
          {summaryItems.map((item) => (
            <Box
              key={item.label}
              sx={{
                border: "1px solid #E5E7EB",
                borderRadius: "6px",
                p: 1,
                backgroundColor: item.bg,
              }}
            >
              <Typography sx={{ fontSize: 10, color: "#6B7280", mb: 0.3 }}>
                {item.label}
              </Typography>
              <Typography
                sx={{ fontSize: 13, fontWeight: 700, color: item.color }}
              >
                {item.value}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* ── Line Posting / More Details tabs ── */}
      <Box sx={cardSx}>
        <Tabs
          value={lineTab}
          onChange={(_, v) => setLineTab(v)}
          sx={{
            minHeight: 32,
            mb: 2,
            borderBottom: "2px solid #E5E7EB",
            "& .MuiTab-root": {
              textTransform: "none",
              fontSize: 12,
              fontWeight: 600,
              minHeight: 32,
              color: "#1F2937",
              px: 1.5,
              py: 0,
            },
            "& .Mui-selected": { color: "#0066FF" },
            "& .MuiTabs-indicator": { backgroundColor: "#0066FF", height: 2 },
          }}
        >
          <Tab label="Line Posting" />
          <Tab label="More Details" />
        </Tabs>

        {lineTab === 0 && (
          <Box>
            {/* Row 1: Copay Due, Paid, Status */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr 1fr" },
                gap: 2,
                mb: 2,
              }}
            >
              <Box>
                <FL>Copay Due</FL>
                <TextField
                  fullWidth
                  size="small"
                  value={copayDue}
                  onChange={(e) => setCopayDue(e.target.value)}
                  sx={{
                    ...inputSx,
                    "& .MuiOutlinedInput-root": {
                      ...inputSx["& .MuiOutlinedInput-root"],
                      backgroundColor: "#F3F4F6",
                    },
                  }}
                />
              </Box>
              <FInput
                label="Paid"
                value={paid}
                onChange={(e) => setPaid(e.target.value)}
              />
              <FSelect
                label="Status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                options={["Default", "Posted", "Pending", "Rejected"]}
              />
            </Box>
            {/* Row 2: Status Reason, Line Note */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 2,
                mb: 3,
              }}
            >
              <FSelect
                label="Status Reason"
                value={statusReason}
                onChange={(e) => setStatusReason(e.target.value)}
                options={["0 - None", "1 - Write-off", "2 - Contractual"]}
              />
              <FInput
                label="Line Note"
                value={lineNote}
                onChange={(e) => setLineNote(e.target.value)}
                placeholder="Type here"
              />
            </Box>
          </Box>
        )}

        {lineTab === 1 && (
          <Typography sx={{ fontSize: 12, color: "#9CA3AF" }}>
            More details content goes here.
          </Typography>
        )}

        {/* Footer action buttons */}
        <Box sx={{ display: "flex", gap: 1, mt: 10, flexWrap: "wrap" }}>
          <Button variant="outlined" sx={{ ...headerBtnSx, fontWeight: 600, height: 32, fontSize: 11 }}>
            Next Line
          </Button>
          <Button variant="outlined" sx={{ ...headerBtnSx, fontWeight: 600, height: 32, fontSize: 11 }}>
            + Add Encounter
          </Button>
          <Button variant="outlined" sx={{ ...headerBtnSx, fontWeight: 600, height: 32, fontSize: 11 }}>
            + Add Patient
          </Button>
        </Box>
      </Box>
    </Box>
  );

  /* ─────────────────────────────────────────────
     RIGHT PANEL
  ───────────────────────────────────────────── */
  const rightPanel = (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
      {/* ── Apply to charges ── */}
      <Box sx={cardSx}>
        {/* Header row */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 0.4,
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <Typography sx={cardTitleSx}>Apply to charges</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography
              sx={{ fontSize: 11.5, color: "#6B7280", whiteSpace: "nowrap" }}
            >
              Show Only
            </Typography>
            <FormControl size="small" sx={{ minWidth: 110, ...inputSx }}>
              <Select
                value={showOnly}
                onChange={(e) => setShowOnly(e.target.value)}
                IconComponent={KeyboardArrowDown}
                sx={{ fontSize: 12 }}
              >
                <MenuItem value="All" sx={{ fontSize: 12 }}>
                  All
                </MenuItem>
                <MenuItem value="Selected" sx={{ fontSize: 12 }}>
                  Selected
                </MenuItem>
              </Select>
            </FormControl>
            <Button
              size="small"
              sx={{
                textTransform: "none",
                color: "#0066FF",
                fontSize: 12,
                fontWeight: 600,
                p: 0,
                minWidth: "auto",
                whiteSpace: "nowrap",
                "&:hover": { background: "none", textDecoration: "underline" },
              }}
            >
              + Add Patient
            </Button>
          </Box>
        </Box>
        <Typography sx={{ fontSize: 11.5, color: "#9CA3AF", mb: 1.2 }}>
          {CHARGES.length} open charges found for River, Stacie
        </Typography>

        <TableContainer sx={{ overflowX: "auto", ...thinScroll }}>
          <Table
            size="small"
            sx={{ minWidth: 480, tableLayout: "auto", width: "100%" }}
          >
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox" sx={{ px: 0.8, py: 1 }}>
                  <Checkbox
                    size="small"
                    indeterminate={
                      selectedRows.length > 0 &&
                      selectedRows.length < CHARGES.length
                    }
                    checked={selectedRows.length === CHARGES.length}
                    onChange={(e) =>
                      setSelectedRows(
                        e.target.checked ? CHARGES.map((c) => c.id) : [],
                      )
                    }
                    sx={{ p: 0, "& svg": { fontSize: 15 } }}
                  />
                </TableCell>
                {[
                  "SVC Date",
                  "Description",
                  "Mod",
                  "Charges",
                  "Balance",
                  "Pat Resp",
                  "This Payment",
                ].map((h) => (
                  <TableCell
                    key={h}
                    sx={{
                      fontSize: 10,
                      fontWeight: 600,
                      color: "#6B7280",
                      px: 0.8,
                      py: 1,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {CHARGES.map((c, idx) => (
                <TableRow
                  key={c.id}
                  sx={{
                    backgroundColor: idx % 2 === 0 ? "#F5F5FF" : "#FFFFFF",
                  }}
                >
                  <TableCell padding="checkbox" sx={{ px: 0.8 }}>
                    <Checkbox
                      size="small"
                      checked={selectedRows.includes(c.id)}
                      onChange={() => toggleRow(c.id)}
                      sx={{ p: 0, "& svg": { fontSize: 15 } }}
                    />
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: 11,
                      color: "#374151",
                      py: 1.5,
                      px: 0.8,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {c.svcDate}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: 11,
                      color: "#374151",
                      py: 1.5,
                      px: 0.8,
                      wordBreak: "break-word",
                    }}
                  >
                    {c.description}
                  </TableCell>
                  <TableCell
                    sx={{ fontSize: 11, color: "#374151", py: 1.5, px: 0.8 }}
                  >
                    {c.mod}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: 11,
                      color: "#374151",
                      py: 1.5,
                      px: 0.8,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {c.charges}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: 11,
                      color: "#374151",
                      py: 1.5,
                      px: 0.8,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {c.balance}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: 11,
                      color: "#374151",
                      py: 1.5,
                      px: 0.8,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {c.patResp}
                  </TableCell>
                  <TableCell sx={{ py: 1.5, px: 0.8 }}>
                    <TextField
                      size="small"
                      defaultValue={c.thisPayment}
                      sx={{
                        width: "100%",
                        minWidth: 70,
                        "& .MuiOutlinedInput-root": {
                          fontSize: 11,
                          fontWeight: 600,
                          height: 28,
                          minHeight: 28,
                          borderRadius: "6px",
                          backgroundColor: "#FFF",
                          "& input": { textAlign: "center", px: 0.4 },
                          "& fieldset": { borderColor: "#D1D5DB" },
                        },
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* ── Attachments ── */}
      <Box sx={cardSx}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 0.4,
          }}
        >
          <Typography sx={cardTitleSx}>Attachments</Typography>
          <IconButton
            size="small"
            sx={{
              color: "#FFF",
              backgroundColor: "#0066FF",
              borderRadius: "6px",
              width: 22,
              height: 22,
              "&:hover": { backgroundColor: "#0052CC" },
            }}
          >
            <Add sx={{ fontSize: 16 }} />
          </IconButton>
        </Box>
        <Typography sx={{ fontSize: 10, color: "#9CA3AF", mb: 1 }}>
          EOBs, ERAs and supporting documents for this payment
        </Typography>

        <TableContainer sx={{ overflowX: "auto", ...thinScroll }}>
          <Table
            size="small"
            sx={{ tableLayout: "auto", width: "100%", minWidth: 420 }}
          >
            <TableHead>
              <TableRow>
                {[
                  "FILE NAME",
                  "TAG",
                  "REFERENCE #",
                  "COMMENTS",
                  "UPLOADED ON",
                  "ACTION",
                ].map((h) => (
                  <TableCell
                    key={h}
                    sx={{
                      fontSize: 9,
                      fontWeight: 600,
                      color: "#9CA3AF",
                      py: 0.6,
                      px: 0.4,
                    }}
                  >
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {ATTACHMENTS.map((f) => (
                <TableRow key={f.id}>
                  <TableCell
                    sx={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#1F2937",
                      py: 0.8,
                      px: 0.4,
                      wordBreak: "break-word",
                    }}
                  >
                    {f.fileName}
                  </TableCell>
                  <TableCell sx={{ py: 0.8, px: 0.4 }}>
                    <Chip
                      label={f.tag}
                      size="small"
                      sx={{
                        backgroundColor: "#EFF6FF",
                        color: "#0066FF",
                        fontWeight: 600,
                        fontSize: 9,
                        height: 16,
                        borderRadius: "4px",
                      }}
                    />
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: 11,
                      color: "#374151",
                      py: 0.8,
                      px: 0.4,
                      wordBreak: "break-word",
                    }}
                  >
                    {f.referenceNumber}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: 11,
                      color: "#6B7280",
                      py: 0.8,
                      px: 0.4,
                      wordBreak: "break-word",
                    }}
                  >
                    {f.comments}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: 11,
                      color: "#6B7280",
                      py: 0.8,
                      px: 0.4,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {f.uploadedOn}
                  </TableCell>
                  <TableCell sx={{ py: 0.8, px: 0.4 }}>
                    <Box sx={{ display: "flex", gap: 0.2 }}>
                      <IconButton size="small" sx={{ p: 0.3 }}>
                        <DownloadIcon2
                          sx={{ fontSize: 14, color: "#374151" }}
                        />
                      </IconButton>
                      <IconButton size="small" sx={{ p: 0.3 }}>
                        <RPDeleteIcon sx={{ fontSize: 14, color: "#DC2626" }} />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* ── EOB Transactions table ── */}
      <Box sx={cardSx}>
        <TableContainer sx={{ overflowX: "auto", ...thinScroll }}>
          <Table
            size="small"
            sx={{ tableLayout: "auto", width: "100%", minWidth: 380 }}
          >
            <TableHead>
              <TableRow sx={{ backgroundColor: "#F1F0FD" }}>
                {[
                  "Date",
                  "Transaction",
                  "Amount",
                  "Pat Resp.",
                  "Total Balance",
                ].map((h) => (
                  <TableCell
                    key={h}
                    sx={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#1F2937",
                      py: 1.2,
                      px: 1.5,
                    }}
                  >
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {EOB_TRANSACTIONS.map((t, idx) => (
                <TableRow
                  key={idx}
                  sx={{
                    backgroundColor: idx % 2 === 0 ? "#FFFFFF" : "#F8F7FE",
                  }}
                >
                  <TableCell
                    sx={{
                      fontSize: 11,
                      color: "#374151",
                      py: 1.5,
                      px: 1.5,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {t.date}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: 11,
                      color: "#374151",
                      py: 1.5,
                      px: 1.5,
                      wordBreak: "break-word",
                      fontWeight: 500,
                    }}
                  >
                    {t.transaction}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: 11,
                      color: "#374151",
                      py: 1.5,
                      px: 1.5,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {t.amount}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: 11,
                      color: "#374151",
                      py: 1.5,
                      px: 1.5,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {t.patResp}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: 11,
                      color: "#1F2937",
                      py: 1.5,
                      px: 1.5,
                      fontWeight: 700,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {t.balance}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );

  /* ─────────────────────────────────────────────
     RENDER
  ───────────────────────────────────────────── */
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#F5F7FA",
        p: { xs: 1.5, sm: 2 },
        boxSizing: "border-box",
        overflowX: "hidden",
        overflowY: "auto",
        ...thinScroll,
      }}
    >
      {/* ── Page header ── */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 1,
          mb: 2,
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: 18, sm: 20 },
            fontWeight: 700,
            color: "#1F2937",
          }}
        >
          New Payment
        </Typography>

        <Box sx={{ display: "flex", gap: 0.8, flexWrap: "wrap" }}>
          {/* Process Virtual Card — shown on larger screens */}
          {!isMobile && (
            <Button variant="outlined" sx={headerBtnSx}>
              Process Virtual Card
            </Button>
          )}
          <Button
            variant="outlined"
            onClick={() => navigate("/encounters", { state: { activeTab: 2 } })}
            sx={headerBtnSx}
          >
            Cancel
          </Button>
          <Button variant="outlined" sx={headerBtnSx}>
            Save & New
          </Button>
          <Button variant="outlined" sx={headerBtnSx}>
            Save
          </Button>
          <Button
            variant="contained"
            sx={{
              textTransform: "none",
              backgroundColor: "#0066FF",
              fontSize: 12,
              fontWeight: 600,
              borderRadius: "8px",
              boxShadow: "none",
              height: 34,
              px: 1.6,
              whiteSpace: "nowrap",
              "&:hover": { backgroundColor: "#0052CC", boxShadow: "none" },
            }}
          >
            Save & Print Receipt
          </Button>
        </Box>
      </Box>

      {/* ── Split layout ── */}
      <Box
        sx={{
          display: "flex",
          flexDirection: isTablet ? "column" : "row",
          gap: 2,
          alignItems: "flex-start",
        }}
      >
        {/* Left */}
        <Box
          sx={{
            flex: "0 0 42%",
            width: isTablet ? "100%" : "auto",
            minWidth: isTablet ? 0 : 320,
          }}
        >
          {leftPanel}
        </Box>

        {/* Right */}
        <Box sx={{ flex: 1, minWidth: 0, width: isTablet ? "100%" : "auto" }}>
          {rightPanel}
        </Box>
      </Box>
    </Box>
  );
}
