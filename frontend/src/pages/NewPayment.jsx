
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
} from "@mui/material";
import { CalendarToday, Add, Download, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

// Shared field styling so every input matches the design reference exactly
const fieldLabelSx = {
  fontSize: 12,
  fontWeight: 500,
  color: "#6B7280",
  mb: 0.75,
};

const requiredMarkSx = {
  color: "#EF4444",
  ml: 0.25,
};

const inputRootSx = {
  "& .MuiOutlinedInput-root": {
    fontSize: 13,
    borderRadius: "8px",
    backgroundColor: "#F9FAFC",
    "& fieldset": {
      borderColor: "#E5E7EB",
    },
    "&:hover fieldset": {
      borderColor: "#D1D5DB",
    },
  },
  "& .MuiSelect-icon": {
    color: "#0066FF",
  },
};

function FieldLabel({ children, required }) {
  return (
    <Typography sx={fieldLabelSx}>
      {children}
      {required && <Box component="span" sx={requiredMarkSx}>*</Box>}
    </Typography>
  );
}

function NewPayment() {
  const navigate = useNavigate();
  const [payerType, setPayerType] = useState("Rivet, Stacie");
  const [practice, setPractice] = useState("Fresch original");
  const [patient, setPatient] = useState("Rivet, Stacie");
  const [patientId, setPatientId] = useState("2522");
  const [patientDob, setPatientDob] = useState("MM/DD/YYYY");
  const [applyCharges, setApplyCharges] = useState("Selected");
  const [paymentAmount, setPaymentAmount] = useState("$200");
  const [collectionDate, setCollectionDate] = useState("Select");
  const [paymentMethod, setPaymentMethod] = useState("Select");
  const [paymentType, setPaymentType] = useState("Select");
  const [bilStatementId, setBilStatementId] = useState("$26.4");
  const [bilStatementDate, setBilStatementDate] = useState("Select");
  const [bilStatementBalance, setBilStatementBalance] = useState("$20");
  const [referenceNumber, setReferenceNumber] = useState("185109368-1367");
  const [batch, setBatch] = useState("1863026");
  const [notes, setNotes] = useState("NA");

  // Matches the reference screenshot: one clean row per open charge
  const charges = [
    {
      id: 1,
      svcDate: "04/14/2025",
      description: "22551 - Fusion of upper spine bone",
      mod: "62",
      charges: "$5,573.52",
      balance: "$660.72",
      patResp: "$660.72",
      thisPayment: "$0.00",
      selected: false,
    },
    {
      id: 2,
      svcDate: "04/14/2025",
      description: "22551 - Fusion of upper spine bone",
      mod: "62",
      charges: "$5,573.52",
      balance: "$660.72",
      patResp: "$660.72",
      thisPayment: "$0.00",
      selected: false,
    },
    {
      id: 3,
      svcDate: "04/14/2025",
      description: "22551 - Fusion of upper spine bone",
      mod: "62",
      charges: "$5,573.52",
      balance: "$660.72",
      patResp: "$660.72",
      thisPayment: "$0.00",
      selected: false,
    },
    {
      id: 4,
      svcDate: "04/14/2025",
      description: "22551 - Fusion of upper spine bone",
      mod: "62",
      charges: "$5,573.52",
      balance: "$660.72",
      patResp: "$660.72",
      thisPayment: "$0.00",
      selected: false,
    },
  ];

  const attachments = [
    {
      id: 1,
      fileName: "EOB_150219802000.pdf",
      tag: "EOB",
      referenceNumber: "150219802000",
      comments: "Primary payer EOB — BCBS of Michigan",
      uploadedOn: "09/13/2026",
    },
  ];

  const eobTransactions = [
    {
      date: "26 Aug 26",
      transaction: "Claim created and added to Queue",
      amount: "$550.14",
      patResp: "$550.14",
      totalBalance: "$550.14",
    },
    {
      date: "26 Aug 26",
      transaction: "Claim submitted to Payer - ICIC, $150",
      amount: "-",
      patResp: "$0.00",
      totalBalance: "$550.14",
    },
    {
      date: "26 Aug 26",
      transaction: "Payer Settlement EFT/Check #: 150219802000/0906",
      amount: "$0.00",
      patResp: "$0.00",
      totalBalance: "$550.14",
    },
    {
      date: "26 Aug 26",
      transaction: "Patient Responsibility - PR-1: $3.96, PR-2: $15.36, PR-3: $13.52.",
      amount: "$0.00",
      patResp: "$0.00",
      totalBalance: "$550.14",
    },
    {
      date: "26 Aug 26",
      transaction: "Transferred to Insurance responsibility (Action: None, Status: E-submit to secondary)",
      amount: "$0.00",
      patResp: "$0.00",
      totalBalance: "$550.14",
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#F5F7FA",
        p: 2,
        boxSizing: "border-box",
        overflowX: "hidden",
        overflowY: "auto",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography sx={{ fontSize: 21, fontWeight: 700, color: "#1F2937" }}>
          New Payment
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="outlined"
            onClick={() => navigate('/pre-billing-claim', { state: { activeTab: 2 } })}
            sx={{
              textTransform: "none",
              borderColor: "#E5E7EB",
              color: "#374151",
              fontSize: 12.5,
              borderRadius: "8px",
              backgroundColor: "#FFFFFF",
            }}
          >
            Cancel
          </Button>
          <Button
            variant="outlined"
            sx={{
              textTransform: "none",
              borderColor: "#E5E7EB",
              color: "#374151",
              fontSize: 12.5,
              borderRadius: "8px",
              backgroundColor: "#FFFFFF",
            }}
          >
            Save & New
          </Button>
          <Button
            variant="outlined"
            sx={{
              textTransform: "none",
              borderColor: "#E5E7EB",
              color: "#374151",
              fontSize: 12.5,
              borderRadius: "8px",
              backgroundColor: "#FFFFFF",
            }}
          >
            Save
          </Button>
          <Button
            variant="contained"
            sx={{
              textTransform: "none",
              backgroundColor: "#0066FF",
              fontSize: 12.5,
              borderRadius: "8px",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#0052CC",
              },
            }}
          >
            Save & Print Receipt
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
        {/* Left Section */}
        <Box sx={{ flex: "1 1 50%", minWidth: 0 }}>
          {/* Payer Details */}
          <Box
            sx={{
              backgroundColor: "#FFFFFF",
              borderRadius: "12px",
              border: "1px solid #E5E7EB",
              p: 1.75,
              mb: 1.5,
            }}
          >
            <Typography sx={{ fontSize: 13.5, fontWeight: 600, mb: 1.5, color: "#1F2937" }}>
              Payer details
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Box sx={{ flex: 1 }}>
                <FieldLabel>Select Payor Type</FieldLabel>
                <FormControl fullWidth size="small" sx={inputRootSx}>
                  <Select
                    value={payerType}
                    onChange={(e) => setPayerType(e.target.value)}
                  >
                    <MenuItem value="Rivet, Stacie">Rivet, Stacie</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ flex: 1 }}>
                <FieldLabel>Select Practice</FieldLabel>
                <TextField
                  fullWidth
                  size="small"
                  value={practice}
                  onChange={(e) => setPractice(e.target.value)}
                  sx={inputRootSx}
                />
              </Box>
            </Box>
          </Box>

          {/* Patient Details */}
          <Box
            sx={{
              backgroundColor: "#FFFFFF",
              borderRadius: "12px",
              border: "1px solid #E5E7EB",
              p: 1.75,
              mb: 1.5,
            }}
          >
            <Typography sx={{ fontSize: 13.5, fontWeight: 600, mb: 1.5, color: "#1F2937" }}>
              Patient details
            </Typography>
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 2 }}>
              <Box>
                <FieldLabel required>Select Patient</FieldLabel>
                <FormControl fullWidth size="small" sx={inputRootSx}>
                  <Select
                    value={patient}
                    onChange={(e) => setPatient(e.target.value)}
                  >
                    <MenuItem value="Rivet, Stacie">Rivet, Stacie</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box>
                <FieldLabel required>Global Patient Id</FieldLabel>
                <TextField
                  fullWidth
                  size="small"
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
                  sx={inputRootSx}
                />
              </Box>
              <Box>
                <FieldLabel required>Patient DOB</FieldLabel>
                <TextField
                  fullWidth
                  size="small"
                  value={patientDob}
                  onChange={(e) => setPatientDob(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <CalendarToday sx={{ fontSize: 18, color: "#0066FF" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={inputRootSx}
                />
              </Box>
            </Box>
          </Box>

          {/* Apply to Charges */}
          <Box
            sx={{
              backgroundColor: "#FFFFFF",
              borderRadius: "12px",
              border: "1px solid #E5E7EB",
              p: 1.75,
              mb: 1.5,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                mb: 0.25,
              }}
            >
              <Typography sx={{ fontSize: 13.5, fontWeight: 600, color: "#1F2937" }}>
                Apply to charges
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography sx={{ fontSize: 11.5, color: "#6B7280" }}>
                  Show Only
                </Typography>
                <FormControl size="small" sx={{ minWidth: 110, ...inputRootSx }}>
                  <Select
                    value={applyCharges}
                    onChange={(e) => setApplyCharges(e.target.value)}
                    sx={{
                      "& .MuiOutlinedInput-root": { height: 30 },
                    }}
                  >
                    <MenuItem value="Show Only">Show Only</MenuItem>
                    <MenuItem value="Selected">Selected</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <Typography sx={{ fontSize: 11.5, color: "#9CA3AF", mb: 1 }}>
              {charges.length} open charges found for {patient}
            </Typography>

            <TableContainer sx={{ overflowX: "hidden" }}>
              <Table size="small" sx={{ tableLayout: "fixed", width: "100%" }}>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox" sx={{ width: "6%", px: 0.5 }}>
                      <Checkbox size="small" />
                    </TableCell>
                    <TableCell sx={{ fontSize: 10.5, fontWeight: 600, color: "#6B7280", width: "13%", px: 0.5 }}>
                      SVC Date
                    </TableCell>
                    <TableCell sx={{ fontSize: 10.5, fontWeight: 600, color: "#6B7280", width: "22%", px: 0.5 }}>
                      Description
                    </TableCell>
                    <TableCell sx={{ fontSize: 10.5, fontWeight: 600, color: "#6B7280", width: "8%", px: 0.5 }}>
                      Mod
                    </TableCell>
                    <TableCell sx={{ fontSize: 10.5, fontWeight: 600, color: "#6B7280", width: "13%", px: 0.5 }}>
                      Charges
                    </TableCell>
                    <TableCell sx={{ fontSize: 10.5, fontWeight: 600, color: "#6B7280", width: "13%", px: 0.5 }}>
                      Balance
                    </TableCell>
                    <TableCell sx={{ fontSize: 10.5, fontWeight: 600, color: "#6B7280", width: "12%", px: 0.5 }}>
                      Pat Resp.
                    </TableCell>
                    <TableCell sx={{ fontSize: 10.5, fontWeight: 600, color: "#6B7280", width: "13%", px: 0.5 }}>
                      This Payment
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {charges.map((charge, idx) => (
                    <TableRow
                      key={charge.id}
                      sx={{ backgroundColor: idx % 2 === 0 ? "#F5F5FF" : "#FFFFFF" }}
                    >
                      <TableCell padding="checkbox" sx={{ px: 0.5 }}>
                        <Checkbox size="small" checked={charge.selected} />
                      </TableCell>
                      <TableCell sx={{ fontSize: 11.5, color: "#374151", py: 1, px: 0.5 }}>
                        {charge.svcDate}
                      </TableCell>
                      <TableCell sx={{ fontSize: 11.5, color: "#374151", py: 1, px: 0.5, wordBreak: "break-word" }}>
                        {charge.description}
                      </TableCell>
                      <TableCell sx={{ fontSize: 11.5, color: "#374151", py: 1, px: 0.5 }}>
                        {charge.mod}
                      </TableCell>
                      <TableCell sx={{ fontSize: 11.5, color: "#374151", py: 1, px: 0.5, wordBreak: "break-word" }}>
                        {charge.charges}
                      </TableCell>
                      <TableCell sx={{ fontSize: 11.5, color: "#374151", py: 1, px: 0.5, wordBreak: "break-word" }}>
                        {charge.balance}
                      </TableCell>
                      <TableCell sx={{ fontSize: 11.5, color: "#374151", py: 1, px: 0.5, wordBreak: "break-word" }}>
                        {charge.patResp}
                      </TableCell>
                      <TableCell sx={{ py: 1, px: 0.5 }}>
                        <TextField
                          size="small"
                          value={charge.thisPayment}
                          sx={{
                            width: "100%",
                            "& .MuiOutlinedInput-root": {
                              fontSize: 11.5,
                              fontWeight: 600,
                              height: 30,
                              borderRadius: "8px",
                              backgroundColor: "#FFFFFF",
                              "& input": { textAlign: "center", px: 0.5 },
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

          {/* Payment Details */}
          <Box
            sx={{
              backgroundColor: "#FFFFFF",
              borderRadius: "12px",
              border: "1px solid #E5E7EB",
              p: 1.75,
            }}
          >
            <Typography sx={{ fontSize: 13.5, fontWeight: 600, mb: 1.5, color: "#1F2937" }}>
              Payment Details
            </Typography>
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 2, mb: 2 }}>
              <Box>
                <FieldLabel>Payment amount</FieldLabel>
                <TextField
                  fullWidth
                  size="small"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  sx={inputRootSx}
                />
              </Box>
              <Box>
                <FieldLabel>Date of collection</FieldLabel>
                <TextField
                  fullWidth
                  size="small"
                  value={collectionDate}
                  onChange={(e) => setCollectionDate(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <CalendarToday sx={{ fontSize: 18, color: "#0066FF" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={inputRootSx}
                />
              </Box>
              <Box>
                <FieldLabel>Select Payment Method</FieldLabel>
                <FormControl fullWidth size="small" sx={inputRootSx}>
                  <Select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <MenuItem value="Select">Select</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 2, mb: 2 }}>
              <Box>
                <FieldLabel>Select Payment Type</FieldLabel>
                <FormControl fullWidth size="small" sx={inputRootSx}>
                  <Select
                    value={paymentType}
                    onChange={(e) => setPaymentType(e.target.value)}
                  >
                    <MenuItem value="Select">Select</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box>
                <FieldLabel>Bill/Statement ID</FieldLabel>
                <TextField
                  fullWidth
                  size="small"
                  value={bilStatementId}
                  onChange={(e) => setBilStatementId(e.target.value)}
                  sx={inputRootSx}
                />
              </Box>
              <Box>
                <FieldLabel>Bill/Statement Date</FieldLabel>
                <TextField
                  fullWidth
                  size="small"
                  value={bilStatementDate}
                  onChange={(e) => setBilStatementDate(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <CalendarToday sx={{ fontSize: 18, color: "#0066FF" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={inputRootSx}
                />
              </Box>
            </Box>
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 2, mb: 2 }}>
              <Box>
                <FieldLabel>Bill/Statement Balance</FieldLabel>
                <TextField
                  fullWidth
                  size="small"
                  value={bilStatementBalance}
                  onChange={(e) => setBilStatementBalance(e.target.value)}
                  sx={inputRootSx}
                />
              </Box>
              <Box>
                <FieldLabel>Reference #</FieldLabel>
                <TextField
                  fullWidth
                  size="small"
                  value={referenceNumber}
                  onChange={(e) => setReferenceNumber(e.target.value)}
                  sx={inputRootSx}
                />
              </Box>
              <Box>
                <FieldLabel>Batch#</FieldLabel>
                <TextField
                  fullWidth
                  size="small"
                  value={batch}
                  onChange={(e) => setBatch(e.target.value)}
                  sx={inputRootSx}
                />
              </Box>
            </Box>
            <Box>
              <FieldLabel>Notes (Optional)</FieldLabel>
              <TextField
                fullWidth
                size="small"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                multiline
                rows={2}
                sx={inputRootSx}
              />
            </Box>
          </Box>
        </Box>

        {/* Right Section */}
        <Box sx={{ flex: "1 1 50%", minWidth: 0 }}>
          {/* Payment Summary */}
          <Box
            sx={{
              backgroundColor: "#FFFFFF",
              borderRadius: "12px",
              border: "1px solid #E5E7EB",
              p: 1.75,
              mb: 1.5,
            }}
          >
            <Typography sx={{ fontSize: 13.5, fontWeight: 600, mb: 1.5, color: "#1F2937" }}>
              Payment summary
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 1 }}>
              <Box>
                <Typography sx={{ fontSize: 10.5, color: "#6B7280", mb: 0.5, letterSpacing: "0.3px", textTransform: "uppercase" }}>
                  Amount
                </Typography>
                <Typography sx={{ fontSize: 19, fontWeight: 700, color: "#1F2937" }}>
                  $50.00
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ fontSize: 10.5, color: "#6B7280", mb: 0.5, letterSpacing: "0.3px", textTransform: "uppercase" }}>
                  Applied
                </Typography>
                <Typography sx={{ fontSize: 19, fontWeight: 700, color: "#10B981" }}>
                  $0.00
                </Typography>
              </Box>
              <Chip
                label="Unapplied balance"
                sx={{
                  backgroundColor: "#FDF3E7",
                  color: "#B45309",
                  fontWeight: 600,
                  fontSize: 10.5,
                  height: 26,
                  borderRadius: "6px",
                }}
              />
            </Box>
          </Box>

          {/* EOB/ERA Details */}
          <Box
            sx={{
              backgroundColor: "#FFFFFF",
              borderRadius: "12px",
              border: "1px solid #E5E7EB",
              p: 1.75,
              mb: 1.5,
            }}
          >
            <Typography sx={{ fontSize: 13.5, fontWeight: 600, mb: 1.5, color: "#1F2937" }}>
              EOB/ERA Details
            </Typography>
            <Box sx={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr auto", gap: 1.25, alignItems: "flex-end" }}>
              <Box>
                <FieldLabel>Note</FieldLabel>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Type here"
                  sx={inputRootSx}
                />
              </Box>
              <Box>
                <FieldLabel>Reference number</FieldLabel>
                <Typography sx={{ fontSize: 12.5, fontWeight: 600, color: "#1F2937", whiteSpace: "nowrap" }}>
                  150219802000
                </Typography>
              </Box>
              <Box>
                <FieldLabel>ERA Balance</FieldLabel>
                <Typography sx={{ fontSize: 12.5, fontWeight: 600, color: "#1F2937" }}>
                  $0
                </Typography>
              </Box>
              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                  backgroundColor: "#0066FF",
                  fontSize: 12.5,
                  borderRadius: "8px",
                  boxShadow: "none",
                  height: 36,
                  px: 2,
                  whiteSpace: "nowrap",
                  "&:hover": { backgroundColor: "#0052CC" },
                }}
              >
                View File
              </Button>
            </Box>
          </Box>

          {/* Attachments */}
          <Box
            sx={{
              backgroundColor: "#FFFFFF",
              borderRadius: "12px",
              border: "1px solid #E5E7EB",
              p: 1.75,
              mb: 1.5,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 0.5,
              }}
            >
              <Typography sx={{ fontSize: 13.5, fontWeight: 600, color: "#1F2937" }}>
                Attachments
              </Typography>
              <IconButton
                size="small"
                sx={{
                  color: "#FFFFFF",
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
            <Typography sx={{ fontSize: 10.5, color: "#9CA3AF", mb: 1.5 }}>
              (EOBs, ERAs and supporting documents for this payment)
            </Typography>

            <TableContainer sx={{ overflowX: "hidden" }}>
              <Table size="small" sx={{ tableLayout: "fixed", width: "100%" }}>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#F5F5FA" }}>
                    <TableCell sx={{ fontSize: 9.5, fontWeight: 600, color: "#9CA3AF", py: 0.75, px: 0.5, width: "26%" }}>
                      FILE NAME
                    </TableCell>
                    <TableCell sx={{ fontSize: 9.5, fontWeight: 600, color: "#9CA3AF", py: 0.75, px: 0.5, width: "12%" }}>
                      TAG
                    </TableCell>
                    <TableCell sx={{ fontSize: 9.5, fontWeight: 600, color: "#9CA3AF", py: 0.75, px: 0.5, width: "18%" }}>
                      REFERENCE #
                    </TableCell>
                    <TableCell sx={{ fontSize: 9.5, fontWeight: 600, color: "#9CA3AF", py: 0.75, px: 0.5, width: "24%" }}>
                      COMMENTS
                    </TableCell>
                    <TableCell sx={{ fontSize: 9.5, fontWeight: 600, color: "#9CA3AF", py: 0.75, px: 0.5, width: "12%" }}>
                      UPLOADED ON
                    </TableCell>
                    <TableCell sx={{ fontSize: 9.5, fontWeight: 600, color: "#9CA3AF", py: 0.75, px: 0.5, width: "8%" }}>
                      ACTION
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {attachments.map((file) => (
                    <TableRow key={file.id}>
                      <TableCell
                        sx={{
                          fontSize: 11,
                          fontWeight: 600,
                          color: "#1F2937",
                          py: 1,
                          px: 0.5,
                          wordBreak: "break-word",
                          whiteSpace: "normal",
                        }}
                      >
                        {file.fileName}
                      </TableCell>
                      <TableCell sx={{ py: 1, px: 0.5 }}>
                        <Chip
                          label={file.tag}
                          size="small"
                          sx={{
                            backgroundColor: "#EFF6FF",
                            color: "#0066FF",
                            fontWeight: 600,
                            fontSize: 9.5,
                            height: 18,
                            borderRadius: "5px",
                          }}
                        />
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: 11,
                          color: "#374151",
                          py: 1,
                          px: 0.5,
                          wordBreak: "break-word",
                          whiteSpace: "normal",
                        }}
                      >
                        {file.referenceNumber}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: 10.5,
                          color: "#6B7280",
                          py: 1,
                          px: 0.5,
                          wordBreak: "break-word",
                          whiteSpace: "normal",
                        }}
                      >
                        {file.comments}
                      </TableCell>
                      <TableCell sx={{ fontSize: 10.5, color: "#6B7280", py: 1, px: 0.5, whiteSpace: "nowrap" }}>
                        {file.uploadedOn}
                      </TableCell>
                      <TableCell sx={{ py: 1, px: 0.5 }}>
                        <Box sx={{ display: "flex", gap: 0.25 }}>
                          <IconButton size="small" sx={{ p: 0.4 }}>
                            <Download sx={{ fontSize: 15, color: "#374151" }} />
                          </IconButton>
                          <IconButton size="small" sx={{ p: 0.4 }}>
                            <Delete sx={{ fontSize: 15, color: "#DC2626" }} />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          {/* EOB Transactions */}
          <Box
            sx={{
              backgroundColor: "#FFFFFF",
              borderRadius: "12px",
              border: "1px solid #E5E7EB",
              p: 1.75,
            }}
          >
            <TableContainer sx={{ overflowX: "hidden" }}>
              <Table size="small" sx={{ tableLayout: "fixed", width: "100%" }}>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#F1F0FD" }}>
                    <TableCell sx={{ fontSize: 10.5, fontWeight: 600, color: "#1F2937", py: 0.85, width: "16%" }}>
                      Date
                    </TableCell>
                    <TableCell sx={{ fontSize: 10.5, fontWeight: 600, color: "#1F2937", py: 0.85, width: "40%" }}>
                      Transaction
                    </TableCell>
                    <TableCell sx={{ fontSize: 10.5, fontWeight: 600, color: "#1F2937", py: 0.85, width: "15%" }}>
                      Amount
                    </TableCell>
                    <TableCell sx={{ fontSize: 10.5, fontWeight: 600, color: "#1F2937", py: 0.85, width: "15%" }}>
                      Pat Resp.
                    </TableCell>
                    <TableCell sx={{ fontSize: 10.5, fontWeight: 600, color: "#1F2937", py: 0.85, width: "14%" }}>
                      Total Balance
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {eobTransactions.map((transaction, idx) => (
                    <TableRow
                      key={idx}
                      sx={{
                        backgroundColor: idx % 2 === 0 ? "#FFFFFF" : "#F8F7FE",
                      }}
                    >
                      <TableCell sx={{ fontSize: 10.5, color: "#374151", py: 1, whiteSpace: "nowrap" }}>
                        {transaction.date}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: 10.5,
                          color: "#374151",
                          py: 1,
                          whiteSpace: "normal",
                          wordBreak: "break-word",
                          minWidth: 0,
                        }}
                      >
                        {transaction.transaction}
                      </TableCell>
                      <TableCell sx={{ fontSize: 10.5, color: "#374151", py: 1, whiteSpace: "nowrap" }}>
                        {transaction.amount}
                      </TableCell>
                      <TableCell sx={{ fontSize: 10.5, color: "#374151", py: 1, whiteSpace: "nowrap" }}>
                        {transaction.patResp}
                      </TableCell>
                      <TableCell sx={{ fontSize: 10.5, color: "#1F2937", py: 1, fontWeight: 600, whiteSpace: "nowrap" }}>
                        {transaction.totalBalance}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default NewPayment;