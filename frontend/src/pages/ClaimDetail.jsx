import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Button,
  TextField,
  IconButton,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Menu,
  MenuItem,
  Select,
  FormControl,
  Link,
} from "@mui/material";
import { KeyboardArrowDown, ArrowBackIosNew } from "@mui/icons-material";

// TODO: replace with a real fetch keyed on claimId once the claim-detail
// API endpoint exists. Shape mirrors what the table row passes today.
const SAMPLE_CLAIM = {
  patientName: "Curtis Douglas Cauley",
  claimId: "6178",
  encounterId: "3501",
  dob: "15 Apr 1958",
  patientId: "2885",
  statusLabel: "Waiting on United Healthcare",
  outstanding: "₹824.22",
  location: "Garden City Hospital",
  dos: "13/08/2025",
  case: "United Healthcare",
  typeOfService: "3-Consultation",
  provider: "Dr. Mohan YS, M.D",
  clearingTrk: "2508265438810",
  units: "1.00 unit",
  unitCharge: "$550",
  totalCharges: "$0.00",
  adjustments: "$0.00",
  adjustedCharges: "$0.00",
  patientPayments: "$0.00",
  totalPayments: "$824.22",
  patientBalance: "$0.0",
  insuranceBalance: "$550.14",
  totalBalance: "$550.14",
  modifier1: "None",
  modifier2: "None",
  diagnoses: [
    {
      id: 1,
      code: "S06.5X0A",
      description:
        "Traumatic subdural haemorrhage, loss of consciousness unspecified, initial encounter",
    },
    {
      id: 2,
      code: "Not coded",
      description: "Add a secondary diagnosis if the payer needs one",
    },
  ],
};

const SAMPLE_LOG = [
  {
    date: "26 Aug 26",
    type: "Created",
    description:
      "Service line built from encounter 3501 using ICD-10 coding",
    amount: "$550.14",
    patResp: "$550.14",
    totalBalance: "$550.14",
  },
  {
    date: "26 Aug 26",
    type: "Transfer",
    description:
      "$550.14 moved to primary insurance, UHC Community Plan. Patient responsibility set to $0.00",
    amount: "\u2013",
    patResp: "$0.00",
    totalBalance: "$550.14",
  },
  {
    date: "26 Aug 26",
    type: "Billed",
    description:
      "Electronic claim submitted to primary insurance, UHC Community Plan, with ICD-10 coding",
    amount: "$0.00",
    patResp: "$0.00",
    totalBalance: "$550.14",
  },
  {
    date: "26 Aug 26",
    type: "Claim processed",
    description:
      "Handed to GatewayEDI in batch 103709866",
    link: "Raw clearinghouse message",
    amount: "$0.00",
    patResp: "$0.00",
    totalBalance: "$550.14",
  },
  {
    date: "26 Aug 26",
    type: "Claim processed",
    description:
      "GatewayEDI confirmed the claim arrived intact and reported an acknowledged status.",
    link: "Raw clearinghouse message",
    amount: "$0.00",
    patResp: "$0.00",
    totalBalance: "$550.14",
  },
  {
    date: "26 Aug 26",
    type: "Claim processed",
    description:
      "No syntax or eligibility errors were flagged before the file went out to the payer.",
    link: "Raw clearinghouse message",
    amount: "$0.00",
    patResp: "$0.00",
    totalBalance: "$550.14",
  },
  {
    date: "26 Aug 26",
    type: "Created",
    description:
      "Service line built from encounter 3501 using ICD-10 coding",
    amount: "$550.14",
    patResp: "$550.14",
    totalBalance: "$550.14",
  },
  {
    date: "26 Aug 26",
    type: "Billed",
    description:
      "Electronic claim submitted to primary insurance, UHC Community Plan, with ICD-10 coding",
    amount: "$0.00",
    patResp: "$0.00",
    totalBalance: "$550.14",
  },
  {
    date: "26 Aug 26",
    type: "Claim processed",
    description:
      "GatewayEDI confirmed the claim arrived intact and reported an acknowledged status.",
    amount: "$0.00",
    patResp: "$0.00",
    totalBalance: "$550.14",
  },
];

const TYPE_DOT_COLOR = {
  Created: "#F59E0B",
  Transfer: "#3B82F6",
  Billed: "#10B981",
  "Claim processed": "#3B82F6",
};

function SectionLabel({ children }) {
  return (
    <Typography
      sx={{
        fontSize: 11,
        fontWeight: 600,
        color: "#9CA3AF",
        mb: 0.4,
      }}
    >
      {children}
    </Typography>
  );
}

function FieldRow({ label, value }) {
  return (
    <Box sx={{ mb: 1 }}>
      <SectionLabel>{label}</SectionLabel>
      <Typography sx={{ fontSize: 13, color: "#111827", fontWeight: 500 }}>
        {value}
      </Typography>
    </Box>
  );
}

function BalanceRow({ label, value, bold }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        py: 0.5,
      }}
    >
      <Typography
        sx={{
          fontSize: 12,
          color: bold ? "#111827" : "#6B7280",
          fontWeight: bold ? 700 : 500,
        }}
      >
        {label}
      </Typography>
      <Typography
        sx={{
          fontSize: 12,
          color: "#111827",
          fontWeight: bold ? 700 : 500,
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}

function ClaimDetail() {
  const navigate = useNavigate();
  const { claimId } = useParams();
  const [currentTab, setCurrentTab] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);

  // claimId is available for wiring up the real fetch; sample data stands in for now
  const claim = SAMPLE_CLAIM;

  const handleTabChange = (event, newValue) => setCurrentTab(newValue);
  const handleCancel = () => navigate(-1);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: "#f5f7fa",
        overflowY: "auto",
        p: 2,
      }}
    >
      {/* Header row */}
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
          <IconButton size="small" onClick={handleCancel} sx={{ mt: 0.3 }}>
            <ArrowBackIosNew sx={{ fontSize: 16 }} />
          </IconButton>
          <Box>
            <Typography sx={{ fontSize: 18, fontWeight: 700, color: "#111827" }}>
              {claim.patientName}
            </Typography>
            <Typography sx={{ fontSize: 12, color: "#6B7280", mt: 0.3 }}>
              Claim {claim.claimId} &nbsp;&nbsp; Encounter {claim.encounterId}{" "}
              &nbsp;&nbsp; Born {claim.dob} &nbsp;&nbsp; Patient{" "}
              {claim.patientId}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ textAlign: "right" }}>
          <Chip
            label={claim.statusLabel}
            size="small"
            sx={{
              backgroundColor: "#FEF3C7",
              color: "#B45309",
              fontWeight: 600,
              fontSize: 11,
              mb: 0.5,
            }}
          />
          <Typography sx={{ fontSize: 16, fontWeight: 700, color: "#111827" }}>
            {claim.outstanding}{" "}
            <Typography
              component="span"
              sx={{ fontSize: 11, fontWeight: 500, color: "#9CA3AF" }}
            >
              Outstanding
            </Typography>
          </Typography>
        </Box>
      </Box>

      {/* Action buttons row */}
      <Box sx={{ display: "flex", gap: 1, mb: 2, justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          sx={{
            textTransform: "none",
            backgroundColor: "#0066FF",
            fontWeight: 600,
            fontSize: 13,
            boxShadow: "none",
            "&:hover": { backgroundColor: "#0052CC", boxShadow: "none" },
          }}
        >
          Save changes
        </Button>
        <Button
          variant="outlined"
          onClick={handleCancel}
          sx={{
            textTransform: "none",
            color: "#374151",
            borderColor: "#E5E7EB",
            fontWeight: 600,
            fontSize: 13,
            "&:hover": { borderColor: "#D1D5DB", backgroundColor: "#F9FAFB" },
          }}
        >
          Cancel
        </Button>
        <Button
          variant="outlined"
          sx={{
            textTransform: "none",
            color: "#374151",
            borderColor: "#E5E7EB",
            fontWeight: 600,
            fontSize: 13,
            "&:hover": { borderColor: "#D1D5DB", backgroundColor: "#F9FAFB" },
          }}
        >
          Delete
        </Button>
        <Button
          variant="outlined"
          sx={{
            textTransform: "none",
            color: "#374151",
            borderColor: "#E5E7EB",
            fontWeight: 600,
            fontSize: 13,
            "&:hover": { borderColor: "#D1D5DB", backgroundColor: "#F9FAFB" },
          }}
        >
          Delete last transaction
        </Button>
        <Button
          variant="outlined"
          endIcon={<KeyboardArrowDown sx={{ fontSize: 18 }} />}
          onClick={(e) => setAnchorEl(e.currentTarget)}
          sx={{
            textTransform: "none",
            color: "#374151",
            borderColor: "#E5E7EB",
            fontWeight: 600,
            fontSize: 13,
            "&:hover": { borderColor: "#D1D5DB", backgroundColor: "#F9FAFB" },
          }}
        >
          Select Action
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem onClick={() => setAnchorEl(null)}>Print Claim</MenuItem>
          <MenuItem onClick={() => setAnchorEl(null)}>Rebill</MenuItem>
          <MenuItem onClick={() => setAnchorEl(null)}>
            Transfer balance
          </MenuItem>
          <MenuItem onClick={() => setAnchorEl(null)}>Settle</MenuItem>
          <MenuItem onClick={() => setAnchorEl(null)}>Void</MenuItem>
        </Menu>
      </Box>

      {/* Tabs */}
      <Tabs
        value={currentTab}
        onChange={handleTabChange}
        sx={{
          minHeight: 40,
          borderBottom: "1px solid #e0e0e0",
          mb: 2,
          "& .MuiTab-root": {
            minHeight: 40,
            textTransform: "none",
            fontSize: 13,
            fontWeight: 500,
            color: "#374151",
            px: 2,
          },
          "& .Mui-selected": {
            color: "#0066ff",
            fontWeight: 600,
          },
          "& .MuiTabs-indicator": {
            backgroundColor: "#0066ff",
            height: 2,
          },
        }}
      >
        <Tab label="General" />
        <Tab label="Details" />
        <Tab label="Log" />
      </Tabs>

      {currentTab === 0 && (
        <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
          {/* Left column */}
          <Box
            sx={{
              flex: "0 0 360px",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {/* Patient Details */}
            <Paper
              sx={{
                border: "1px solid #E5E7EB",
                borderRadius: "10px",
                boxShadow: "none",
                p: 2,
              }}
            >
              <Typography
                sx={{ fontSize: 13, fontWeight: 700, color: "#374151", mb: 1.5 }}
              >
                Patient Details
              </Typography>
              <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5 }}>
                <FieldRow label="Patient" value={claim.patientName} />
                <FieldRow label="Location" value={claim.location} />
                <FieldRow label="Encounter" value={claim.encounterId} />
                <FieldRow label="DOS" value={claim.dos} />
                <FieldRow label="Case" value={claim.case} />
                <FieldRow label="Type of Service" value={claim.typeOfService} />
                <FieldRow label="Provider" value={claim.provider} />
                <FieldRow label="Clearing trk#" value={claim.clearingTrk} />
              </Box>
            </Paper>

            {/* CPT & Modifiers */}
            <Paper
              sx={{
                border: "1px solid #E5E7EB",
                borderRadius: "10px",
                boxShadow: "none",
                p: 2,
              }}
            >
              <Typography
                sx={{ fontSize: 13, fontWeight: 700, color: "#374151", mb: 1.5 }}
              >
                CPT &amp; Modifiers
              </Typography>

              <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5, mb: 2 }}>
                <Box>
                  <SectionLabel>Modifier 1</SectionLabel>
                  <TextField
                    fullWidth
                    size="small"
                    value={claim.modifier1}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        fontSize: 12,
                        borderRadius: "8px",
                        "& fieldset": { borderColor: "#E5E7EB" },
                      },
                    }}
                  />
                </Box>
                <Box>
                  <SectionLabel>Modifier 2</SectionLabel>
                  <TextField
                    fullWidth
                    size="small"
                    value={claim.modifier2}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        fontSize: 12,
                        borderRadius: "8px",
                        "& fieldset": { borderColor: "#E5E7EB" },
                      },
                    }}
                  />
                </Box>
              </Box>

              {claim.diagnoses.map((dx) => (
                <Box
                  key={dx.id}
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 1,
                    mb: 1,
                  }}
                >
                  <Box
                    sx={{
                      width: 18,
                      height: 18,
                      borderRadius: "4px",
                      backgroundColor: "#EFF6FF",
                      color: "#0066FF",
                      fontSize: 11,
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      mt: 0.3,
                    }}
                  >
                    {dx.id}
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: 12, fontWeight: 700, color: "#111827" }}>
                      {dx.code}
                    </Typography>
                    <Typography sx={{ fontSize: 11.5, color: "#6B7280" }}>
                      {dx.description}
                    </Typography>
                  </Box>
                </Box>
              ))}

              <Button
                size="small"
                sx={{
                  textTransform: "none",
                  color: "#0066FF",
                  fontWeight: 600,
                  fontSize: 12,
                  px: 0,
                  "&:hover": { backgroundColor: "transparent" },
                }}
              >
                + Add diagnosis
              </Button>
            </Paper>

            {/* Charges and balance */}
            <Paper
              sx={{
                border: "1px solid #E5E7EB",
                borderRadius: "10px",
                boxShadow: "none",
                p: 2,
              }}
            >
              <Typography
                sx={{ fontSize: 13, fontWeight: 700, color: "#374151", mb: 1.5 }}
              >
                Charges and balance
              </Typography>

              <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1.5, mb: 2 }}>
                <Box>
                  <SectionLabel>Units</SectionLabel>
                  <TextField
                    fullWidth
                    size="small"
                    value={claim.units}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        fontSize: 12,
                        borderRadius: "8px",
                        "& fieldset": { borderColor: "#E5E7EB" },
                      },
                    }}
                  />
                </Box>
                <Box>
                  <SectionLabel>Unit Charge</SectionLabel>
                  <TextField
                    fullWidth
                    size="small"
                    value={claim.unitCharge}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        fontSize: 12,
                        borderRadius: "8px",
                        "& fieldset": { borderColor: "#E5E7EB" },
                      },
                    }}
                  />
                </Box>
              </Box>

              <BalanceRow label="Total Charges" value={claim.totalCharges} />
              <BalanceRow label="Adjustments" value={claim.adjustments} />
              <BalanceRow label="Adjusted charges" value={claim.adjustedCharges} />
              <BalanceRow label="Patient payments" value={claim.patientPayments} />
              <BalanceRow label="Total payments" value={claim.totalPayments} />
              <BalanceRow label="Patient Balance" value={claim.patientBalance} />
              <BalanceRow label="Insurance Balance" value={claim.insuranceBalance} />
              <BalanceRow label="Total Balance" value={claim.totalBalance} bold />
            </Paper>
          </Box>

          {/* Right column - transaction log */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <TableContainer
              component={Paper}
              sx={{
                border: "1px solid #E5E7EB",
                borderRadius: "10px",
                boxShadow: "none",
                maxHeight: "calc(100vh - 260px)",
                overflowY: "auto",
              }}
            >
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#fafafa" }}>
                    <TableCell sx={{ fontSize: 11, fontWeight: 600, color: "#6B7280" }}>
                      Date
                    </TableCell>
                    <TableCell sx={{ fontSize: 11, fontWeight: 600, color: "#6B7280" }}>
                      Transaction
                    </TableCell>
                    <TableCell sx={{ fontSize: 11, fontWeight: 600, color: "#6B7280" }}>
                      Amount
                    </TableCell>
                    <TableCell sx={{ fontSize: 11, fontWeight: 600, color: "#6B7280" }}>
                      Pat Resp.
                    </TableCell>
                    <TableCell sx={{ fontSize: 11, fontWeight: 600, color: "#6B7280" }}>
                      Total Balance
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {SAMPLE_LOG.map((entry, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{ fontSize: 11.5, color: "#6B7280", verticalAlign: "top", py: 1.2 }}>
                        {entry.date}
                      </TableCell>
                      <TableCell sx={{ py: 1.2 }}>
                        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 0.8 }}>
                          <Box
                            sx={{
                              width: 6,
                              height: 6,
                              borderRadius: "50%",
                              backgroundColor: TYPE_DOT_COLOR[entry.type] || "#9CA3AF",
                              mt: 0.6,
                              flexShrink: 0,
                            }}
                          />
                          <Box>
                            <Typography sx={{ fontSize: 12, fontWeight: 700, color: "#111827" }}>
                              {entry.type}
                            </Typography>
                            <Typography sx={{ fontSize: 11.5, color: "#6B7280", lineHeight: 1.4 }}>
                              {entry.description}
                            </Typography>
                            {entry.link && (
                              <Link
                                component="button"
                                sx={{ fontSize: 11, color: "#0066FF", fontWeight: 500 }}
                              >
                                {entry.link}
                              </Link>
                            )}
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontSize: 12, color: "#111827", verticalAlign: "top", py: 1.2 }}>
                        {entry.amount}
                      </TableCell>
                      <TableCell sx={{ fontSize: 12, color: "#111827", verticalAlign: "top", py: 1.2 }}>
                        {entry.patResp}
                      </TableCell>
                      <TableCell sx={{ fontSize: 12, color: "#111827", verticalAlign: "top", py: 1.2 }}>
                        {entry.totalBalance}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      )}

      {currentTab === 1 && (
        <Box sx={{ p: 2 }}>
          <Typography sx={{ fontSize: 13, color: "#6B7280" }}>
            Details content goes here.
          </Typography>
        </Box>
      )}

      {currentTab === 2 && (
        <Box sx={{ p: 2 }}>
          <Typography sx={{ fontSize: 13, color: "#6B7280" }}>
            Full activity log goes here.
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default ClaimDetail;