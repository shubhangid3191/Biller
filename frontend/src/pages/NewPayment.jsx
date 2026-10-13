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
  Dialog,
  Paper,
  Tooltip,
} from "@mui/material";
import {
  CalendarToday,
  Search as SearchIcon,
  Add,
  Close,
  KeyboardArrowDown,
  CloudUpload,
  CheckCircle,
} from "@mui/icons-material";
import { RPDeleteIcon, DownloadIcon2 } from "../assets/Assets";
import { useNavigate } from "react-router-dom";
import ErrorIcon from "@mui/icons-material/Error";
import dayjs from "dayjs";

/* ─────────────────────────────────────────────
   Shared style helpers
───────────────────────────────────────────── */
const money = (n) => {
  if (typeof n === "string") return n;
  return n ? n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "0.00";
};

const INSURERS = [
  "Cigna Health",
  "UnitedHealthcare",
  "Aetna",
  "Blue Cross Blue Shield",
  "Humana",
  "Kaiser Permanente",
];

const BILLED_LIST = [5573.52, 6600.72, 7800.14, 8250.00, 9100.50];

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
  const [globalPatientId, setGlobalPatientId] = useState("");
  const [patientDob, setPatientDob] = useState("");
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

  /* ── OCR state ── */
  const [showOCRDialog, setShowOCRDialog] = useState(false);
  const [ocrFiles, setOcrFiles] = useState([]);
  const [ocrProcessing, setOcrProcessing] = useState(false);
  const [ocrResults, setOcrResults] = useState([]);

  const toggleRow = (id) =>
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  /* ── OCR handlers ── */
  const handleOpenOCR = () => {
    setShowOCRDialog(true);
    setOcrFiles([]);
    setOcrResults([]);
  };

  const handleCloseOCR = () => {
    setShowOCRDialog(false);
    setOcrFiles([]);
    setOcrResults([]);
    setOcrProcessing(false);
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const newFiles = files.map((file) => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: (file.size / 1024).toFixed(2) + " KB",
      status: "pending",
    }));
    setOcrFiles((prev) => [...prev, ...newFiles]);
  };

  const handleRemoveFile = (fileId) => {
    setOcrFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  const handleProcessOCR = async () => {
    setOcrProcessing(true);
    
    // Only process files that are still "pending"
    const filesToProcess = ocrFiles.filter(f => f.status === "pending");
    
    if (filesToProcess.length === 0) {
      setOcrProcessing(false);
      return;
    }
    
    // Keep existing results and add new ones
    const newResults = [];
    let recordIndex = ocrResults.length; // Continue from existing count
    
    for (let i = 0; i < filesToProcess.length; i++) {
      const file = filesToProcess[i];
      
      // Update status to processing
      setOcrFiles((prev) =>
        prev.map((f) =>
          f.id === file.id ? { ...f, status: "processing" } : f
        )
      );
      
      // Simulate processing delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Simulate success/failure (90% success rate)
      const success = Math.random() > 0.1;
      
      setOcrFiles((prev) =>
        prev.map((f) =>
          f.id === file.id
            ? { ...f, status: success ? "success" : "error" }
            : f
        )
      );
      
      if (success) {
        // Simulate multiple records per PDF (1-3 records per file)
        const recordsInFile = Math.floor(Math.random() * 3) + 1; // 1 to 3 records
        
        for (let j = 0; j < recordsInFile; j++) {
          const claimAmount = BILLED_LIST[recordIndex % BILLED_LIST.length];
          const paidAmount = Math.round(claimAmount * 0.85);
          const adjustmentAmount = claimAmount - paidAmount;
          
          newResults.push({
            id: `${file.id}-${j}`,
            fileName: `${file.name}${recordsInFile > 1 ? ` (Record ${j + 1}/${recordsInFile})` : ''}`,
            claimNumber: `${12345670 + recordIndex}`,
            payerName: INSURERS[recordIndex % INSURERS.length],
            checkNumber: `${14315316146 + recordIndex}`,
            checkDate: dayjs().subtract(recordIndex, "day").format("MM/DD/YYYY"),
            claimedAmount: claimAmount,
            paidAmount: paidAmount,
            adjustmentAmount: adjustmentAmount,
            location: recordIndex % 2 === 0 ? "GCH-IH" : "GCH-OH",
            eraEobType: "EOB",
            paymentMethod: recordIndex % 2 === 0 ? "Cheque" : "EFT",
            status: "Posted",
          });
          
          recordIndex++;
        }
      }
    }
    
    // Append new results to existing ones
    setOcrResults((prev) => [...prev, ...newResults]);
    setOcrProcessing(false);
  };

  const handleSaveERA = () => {
    // In a real implementation, this would add ERA data to the payment
    alert(`${ocrResults.length} EOB records converted and ready to be added to payment!`);
    
    // Close dialog and reset
    handleCloseOCR();
  };

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
            <Typography sx={labelSx}>Batch </Typography>
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
               
              </Select>
            </FormControl>
          </Box>
        </Box>

        {/* Conditional Row: Patient Details - only when Type = "Patient" */}
        {type === "Patient" && (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr 1fr" },
              gap: 1.5,
              mb: 1.5,
            }}
          >
            <Box>
              <Typography sx={labelSx}>Select Patient *</Typography>
              <FormControl fullWidth size="small" sx={inputSx}>
                <Select
                  value={patient}
                  onChange={(e) => setPatient(e.target.value)}
                  IconComponent={KeyboardArrowDown}
                  displayEmpty
                >
                  <MenuItem value="" sx={{ fontSize: 12, color: "#9CA3AF" }}>
                    Select patient
                  </MenuItem>
                  <MenuItem value="Rivet, Stacie  ID 2522" sx={{ fontSize: 12 }}>
                    Rivet, Stacie  ID 2522
                  </MenuItem>
                  <MenuItem value="Johnson, Mark  ID 1234" sx={{ fontSize: 12 }}>
                    Johnson, Mark  ID 1234
                  </MenuItem>
                  <MenuItem value="Smith, Jane  ID 5678" sx={{ fontSize: 12 }}>
                    Smith, Jane  ID 5678
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box>
              <Typography sx={labelSx}>Global Patient Id *</Typography>
              <TextField
                fullWidth
                size="small"
                value={globalPatientId}
                onChange={(e) => setGlobalPatientId(e.target.value)}
                placeholder="Enter ID"
                sx={inputSx}
              />
            </Box>
            <Box>
              <Typography sx={labelSx}>Patient DOB *</Typography>
              <TextField
                fullWidth
                size="small"
                type="date"
                value={patientDob}
                onChange={(e) => setPatientDob(e.target.value)}
                sx={inputSx}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <CalendarToday sx={{ fontSize: 15, color: "#0066FF" }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Box>
        )}

        {/* Row 2: Patient (wider) | Appointment — 3:2 ratio - hidden when Type = "Patient" */}
        {type === "Insurance" && (
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
        )}

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
            <Typography sx={labelSx}>Reference </Typography>
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
                "&:hover": { background: "none", },
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
                  "REFERENCE ",
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
          {/* OCR Upload Button - shown on all screen sizes */}
          <Tooltip title="Upload EOB for ERA Conversion" arrow>
            <Button 
              variant="contained"
              onClick={handleOpenOCR}
              sx={{
                textTransform: "none",
                backgroundColor: "#0066FF",
                color: "white",
                fontSize: 12,
                fontWeight: 700,
                borderRadius: "8px",
                height: 34,
                px: 1.6,
                minWidth: 34,
                boxShadow: "none",
                "&:hover": { backgroundColor: "#0052CC", boxShadow: "none" },
              }}
            >
              <CloudUpload sx={{ fontSize: 18 }} />
            </Button>
          </Tooltip>

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

      {/* ── OCR Dialog ── */}
      <Dialog
        open={showOCRDialog}
        onClose={handleCloseOCR}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "16px",
            overflow: "hidden",
            maxHeight: "90vh",
          },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            px: 3,
            py: 2.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #E5E7EB",
          }}
        >
          <Box>
            <Typography
              sx={{ fontSize: 18, fontWeight: 700, color: "#1F2937", mb: 0.5 }}
            >
              EOB to ERA Converter
            </Typography>
            <Typography sx={{ fontSize: 13, color: "#6B7280" }}>
              Upload EOB documents to automatically extract and convert to ERA format
            </Typography>
          </Box>
          <IconButton
            size="small"
            onClick={handleCloseOCR}
            sx={{
              p: 0.5,
              color: "#6B7280",
              "&:hover": { backgroundColor: "#F3F4F6", color: "#111827" },
            }}
          >
            <Close sx={{ fontSize: 24 }} />
          </IconButton>
        </Box>

        {/* Content */}
        <Box sx={{ px: 3, py: 3, maxHeight: "60vh", overflow: "auto", ...thinScroll }}>
          {/* Upload Area */}
          <Box
            sx={{
              border: "2px dashed #D1D5DB",
              borderRadius: "12px",
              p: 4,
              textAlign: "center",
              backgroundColor: "#F9FAFB",
              mb: 3,
              cursor: "pointer",
              transition: "all 0.2s",
              "&:hover": {
                borderColor: "#0066FF",
                backgroundColor: "#EEF3FE",
              },
            }}
            onClick={() => document.getElementById("ocr-file-input").click()}
          >
            <CloudUpload
              sx={{ fontSize: 48, color: "#9CA3AF", mb: 2 }}
            />
            <Typography
              sx={{ fontSize: 14, fontWeight: 600, color: "#374151", mb: 1 }}
            >
              Click to upload EOB files
            </Typography>
            <Typography sx={{ fontSize: 12, color: "#6B7280" }}>
              Supports PDF, JPG, PNG formats • Maximum 10MB per file
            </Typography>
            <input
              id="ocr-file-input"
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileUpload}
              style={{ display: "none" }}
            />
          </Box>

          {/* File List */}
          {ocrFiles.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography
                sx={{ fontSize: 14, fontWeight: 600, color: "#374151", mb: 2 }}
              >
                Uploaded Files ({ocrFiles.length})
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                {ocrFiles.map((file) => (
                  <Box
                    key={file.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      p: 2,
                      border: "1px solid #E5E7EB",
                      borderRadius: "10px",
                      backgroundColor: "#FFFFFF",
                    }}
                  >
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: "8px",
                        backgroundColor:
                          file.status === "success"
                            ? "#DFF5EA"
                            : file.status === "error"
                            ? "#FCE4E4"
                            : file.status === "processing"
                            ? "#FDF1DC"
                            : "#E3EEFB",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {file.status === "success" ? (
                        <CheckCircle sx={{ fontSize: 24, color: "#1E7F55" }} />
                      ) : file.status === "error" ? (
                        <ErrorIcon sx={{ fontSize: 24, color: "#C0392B" }} />
                      ) : (
                        <CloudUpload
                          sx={{
                            fontSize: 24,
                            color:
                              file.status === "processing"
                                ? "#F59E0B"
                                : "#2F5FA8",
                          }}
                        />
                      )}
                    </Box>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography
                        sx={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: "#1F2937",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {file.name}
                      </Typography>
                      <Typography sx={{ fontSize: 11, color: "#6B7280" }}>
                        {file.size} •{" "}
                        {file.status === "success"
                          ? "Converted successfully"
                          : file.status === "error"
                          ? "Failed to process"
                          : file.status === "processing"
                          ? "Processing..."
                          : "Ready to process"}
                      </Typography>
                    </Box>
                    {file.status === "pending" && (
                      <IconButton
                        size="small"
                        onClick={() => handleRemoveFile(file.id)}
                        sx={{
                          p: 0.5,
                          color: "#6B7280",
                          "&:hover": { color: "#C0392B" },
                        }}
                      >
                        <Close sx={{ fontSize: 18 }} />
                      </IconButton>
                    )}
                  </Box>
                ))}
              </Box>
            </Box>
          )}

          {/* Results Table */}
          {ocrResults.length > 0 && (
            <Box>
              <Typography
                sx={{ fontSize: 14, fontWeight: 600, color: "#374151", mb: 2 }}
              >
                Converted ERA Data ({ocrResults.length})
              </Typography>
              <TableContainer
                component={Paper}
                sx={{
                  boxShadow: "none",
                  border: "1px solid #E5E7EB",
                  borderRadius: "10px",
                }}
              >
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      {[
                        "Claim #",
                        "Location",
                        "Payer",
                        "Payment Method",
                        "Check #",
                        "Check Date",
                        "Claimed",
                        "Paid",
                        "Adjustment",
                      ].map((h) => (
                        <TableCell
                          key={h}
                          sx={{
                            fontWeight: 600,
                            fontSize: 11,
                            color: "#4B5563",
                            backgroundColor: "#F9FAFB",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {h}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {ocrResults.map((result) => (
                      <TableRow key={result.id}>
                        <TableCell sx={{ fontSize: 11 }}>
                          {result.claimNumber}
                        </TableCell>
                        <TableCell sx={{ fontSize: 11 }}>
                          {result.location}
                        </TableCell>
                        <TableCell sx={{ fontSize: 11 }}>
                          {result.payerName}
                        </TableCell>
                        <TableCell sx={{ fontSize: 11 }}>
                          {result.paymentMethod}
                        </TableCell>
                        <TableCell sx={{ fontSize: 11 }}>
                          {result.checkNumber}
                        </TableCell>
                        <TableCell sx={{ fontSize: 11 }}>
                          {result.checkDate}
                        </TableCell>
                        <TableCell sx={{ fontSize: 11 }}>
                          ${money(result.claimedAmount)}
                        </TableCell>
                        <TableCell sx={{ fontSize: 11, color: "#1E7F55", fontWeight: 600 }}>
                          ${money(result.paidAmount)}
                        </TableCell>
                        <TableCell sx={{ fontSize: 11, color: "#C0392B" }}>
                          ${money(result.adjustmentAmount)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </Box>

        {/* Footer */}
        <Box
          sx={{
            px: 3,
            py: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #E5E7EB",
            backgroundColor: "#F9FAFB",
          }}
        >
          <Typography sx={{ fontSize: 12, color: "#6B7280" }}>
            {(() => {
              const processedCount = ocrFiles.filter(f => f.status === "success").length;
              const pendingCount = ocrFiles.filter(f => f.status === "pending").length;
              const totalRecords = ocrResults.length;
              
              if (totalRecords > 0 && pendingCount === 0) {
                return `${totalRecords} record(s) converted from ${processedCount} file(s)`;
              } else if (pendingCount > 0 && totalRecords > 0) {
                return `${totalRecords} record(s) converted, ${pendingCount} file(s) ready to process`;
              } else if (pendingCount > 0) {
                return `${pendingCount} file(s) ready to process`;
              } else if (ocrFiles.length > 0) {
                return `${processedCount} file(s) processed`;
              } else {
                return "No files uploaded";
              }
            })()}
          </Typography>
          <Box sx={{ display: "flex", gap: 1.5 }}>
            <Button
              variant="outlined"
              onClick={handleCloseOCR}
              disabled={ocrProcessing}
              sx={{
                textTransform: "none",
                fontSize: 13,
                fontWeight: 500,
                color: "#374151",
                borderColor: "#E5E7EB",
                px: 2.5,
                "&:hover": { borderColor: "#D1D5DB" },
              }}
            >
              Cancel
            </Button>
            {ocrResults.length > 0 ? (
              <>
                {ocrFiles.filter(f => f.status === "pending").length > 0 && (
                  <Button
                    variant="outlined"
                    onClick={handleProcessOCR}
                    disabled={ocrProcessing}
                    sx={{
                      textTransform: "none",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#0066FF",
                      borderColor: "#0066FF",
                      px: 2.5,
                      "&:hover": { 
                        borderColor: "#0052CC",
                        backgroundColor: "rgba(0, 102, 255, 0.04)"
                      },
                    }}
                  >
                    {ocrProcessing ? "Processing..." : "Process More Files"}
                  </Button>
                )}
                <Button
                  variant="contained"
                  onClick={handleSaveERA}
                  sx={{
                    textTransform: "none",
                    fontSize: 13,
                    fontWeight: 600,
                    backgroundColor: "#0066FF",
                    px: 2.5,
                    boxShadow: "none",
                    "&:hover": { backgroundColor: "#0052CC", boxShadow: "none" },
                  }}
                >
                  Save ERA Data
                </Button>
              </>
            ) : (
              <Button
                variant="contained"
                onClick={handleProcessOCR}
                disabled={ocrFiles.filter(f => f.status === "pending").length === 0 || ocrProcessing}
                sx={{
                  textTransform: "none",
                  fontSize: 13,
                  fontWeight: 600,
                  backgroundColor: "#0066FF",
                  px: 2.5,
                  boxShadow: "none",
                  "&:hover": { backgroundColor: "#0052CC", boxShadow: "none" },
                }}
              >
                {ocrProcessing ? "Processing..." : "Process Files"}
              </Button>
            )}
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
}
