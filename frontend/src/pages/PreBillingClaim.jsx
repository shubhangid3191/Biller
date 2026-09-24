import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Button,
  TextField,
  IconButton,
  InputAdornment,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Menu,
  MenuItem,
  Tooltip,
  Select,
  FormControl,
  Switch,
} from "@mui/material";
import { ViewList, ViewModule, KeyboardArrowDown, Close, CalendarToday, Add,  
  ArrowBackIosNew,
  ArrowForwardIos,
} from "@mui/icons-material";
import {
  Search,
  FilterIcon1,
  SettingsIcon,
  DownloadIcon,
  EditIconClaim,
  Icon2,
  Icon3,
  Icon4,
  Icon5,
  Icon6,
  Star,
  RefreshIcon,
  ViewIconRemittance,
  DownloadIconRemittance,
} from "../assets/Assets";


function ClaimField({ label, value, calendar, disabled }) {
  return (
    <Box>
      <Typography sx={{ fontSize: 8, color: "#6B7280", mb: 0.5 }}>
        {label}
      </Typography>
      <TextField
        fullWidth
        size="small"
        value={value}
        disabled={disabled}
        sx={{
          "& .MuiInputBase-root": {
            height: 26,
            fontSize: 9,
            backgroundColor: disabled ? "#F3F4F6" : "#FFFFFF",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#E5E7EB",
          },
        }}
        InputProps={
          calendar
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <CalendarToday sx={{ fontSize: 12, color: "#9CA3AF" }} />
                  </InputAdornment>
                ),
              }
            : undefined
        }
      />
    </Box>
  );
}

function ClaimSelect({ label, value }) {
  return (
    <Box>
      <Typography sx={{ fontSize: 8, color: "#6B7280", mb: 0.5 }}>
        {label}
      </Typography>
      <FormControl fullWidth size="small">
        <Select
          value={value}
          IconComponent={KeyboardArrowDown}
          sx={{
            fontSize: 9,
            backgroundColor: "#FFFFFF",
            "& .MuiSelect-select": { py: 0.6, height: 14 },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#E5E7EB",
            },
          }}
        >
          <MenuItem value={value}>{value}</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

function PreBillingClaim() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentTab, setCurrentTab] = useState(location.state?.activeTab ?? 0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [viewMode, setViewMode] = useState("list");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Restore the requested tab whenever we land here with a target tab in
  // navigation state (e.g. Cancel from New Payment sending us back to
  // "Remittance ERA/EOB"), even if this page instance is already mounted.
  useEffect(() => {
    if (location.state?.activeTab !== undefined) {
      setCurrentTab(location.state.activeTab);
    }
  }, [location.state]);
  
  // Advanced filter states
  const [filterPractice, setFilterPractice] = useState("");
  const [filterServiceLocation, setFilterServiceLocation] = useState("");
  const [filterPatientName, setFilterPatientName] = useState("");
  const [filterFinId, setFilterFinId] = useState("");
  const [filterMrn, setFilterMrn] = useState("");
  const [filterBatchNumber, setFilterBatchNumber] = useState("");
  const [filterClaimNumber, setFilterClaimNumber] = useState("");
  const [filterDosFrom, setFilterDosFrom] = useState("");
  const [filterDosTill, setFilterDosTill] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterInsurance, setFilterInsurance] = useState("");
  const [filterSubmissionMethod, setFilterSubmissionMethod] = useState("");

  // Adjustment Details states
  const [adjType, setAdjType] = useState("");
  const [adjPostingDate, setAdjPostingDate] = useState("");
  const [adjAdjustment, setAdjAdjustment] = useState("");
  const [adjAdjustmentCode, setAdjAdjustmentCode] = useState("");
  const [adjReasonCode, setAdjReasonCode] = useState("");
  const [adjRelatedPayment, setAdjRelatedPayment] = useState("");
  const [adjChangeStatus, setAdjChangeStatus] = useState("");
  const [adjNotes, setAdjNotes] = useState("");

  // State for showing claim details in a separate view
  const [showClaimDetails, setShowClaimDetails] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState(null);

  // State for showing EOB/ERA details
  const [showEobDetails, setShowEobDetails] = useState(false);
  const [selectedEobClaim, setSelectedEobClaim] = useState(null);

  // State for Remittance filter
  const [remittanceFilter, setRemittanceFilter] = useState("all");

  const handleEditClick = (claim) => {
    setSelectedClaim(claim);
    setShowClaimDetails(true);
  };

  const handleBackToTable = () => {
    setShowClaimDetails(false);
    setSelectedClaim(null);
  };

  const handleShowEobDetails = (claim) => {
    setSelectedEobClaim(claim);
    setShowEobDetails(true);
  };

  const handleCloseEobDetails = () => {
    setShowEobDetails(false);
    setSelectedEobClaim(null);
  };

  const handleResetFilters = () => {
    setFilterPractice("");
    setFilterServiceLocation("");
    setFilterPatientName("");
    setFilterFinId("");
    setFilterMrn("");
    setFilterBatchNumber("");
    setFilterClaimNumber("");
    setFilterDosFrom("");
    setFilterDosTill("");
    setFilterStatus("");
    setFilterInsurance("");
    setFilterSubmissionMethod("");
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = filteredData.map((n) => n.id);
      setSelectedRows(newSelected);
      return;
    }
    setSelectedRows([]);
  };

  const handleRowSelect = (id) => {
    const selectedIndex = selectedRows.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedRows, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedRows.slice(1));
    } else if (selectedIndex === selectedRows.length - 1) {
      newSelected = newSelected.concat(selectedRows.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedRows.slice(0, selectedIndex),
        selectedRows.slice(selectedIndex + 1),
      );
    }

    setSelectedRows(newSelected);
  };

  const isSelected = (id) => selectedRows.indexOf(id) !== -1;

  // Function to get color for list view (groups of 3 records)
  const getListColor = (index) => {
    const groupIndex = Math.floor(index / 3) % 4;
    const colors = ["#F2F6FF", "#FFFBF6", "#F1FFFD", "#F2F6FF"];
    return colors[groupIndex];
  };

  // Function to get color for grid view (groups of 2 records)
  const getGridColor = (index) => {
    const groupIndex = Math.floor(index / 2) % 4;
    const colors = ["#F2F6FF", "#FFFBF6", "#F1FFFD", "#F2F6FF"];
    return colors[groupIndex];
  };

  // Sample data for Pre-billing
  const preBillingClaimsData = [
    {
      id: 1,
      encounterId: "1234567",
      claimId: "1234567",
      dos: "08/25/2026",
      dosShort: "11/20/25",
      patientName: "Lisha Cook",
      gender: "(F)",
      fin: "763454",
      mrn: "563526626",
      dob: "08/05/1981",
      pos: "The University RL",
      cpt: "Q11980; 00934",
      cpt2: "Q11980; 00934",
      modifier: "26, LT",
      modifier2: "26, LT",
      icd: "$11.011D Z20.4",
      icd2: "$11.011, D220.4, $11.011, D220.4, $11.011, D220.4",
      doa: "08/25/2026",
      referral: "NA",
      author: "NA",
      subscriber: "NA",
      placeOfService: "NA",
      primaryInsurance: "Aetna",
      plan: "Aetna 109375091",
      billed: "$1,240",
      billedAmount: "$1,240",
      patientCopay: "$75",
      patientPayment: "$40",
      status: "Unbilled",
      remarks: "Gender conflict — P13.1 removed...",
      referenceId: "1234567",
    },
    {
      id: 2,
      encounterId: "1234567",
      claimId: "1234888",
      dos: "08/25/2026",
      dosShort: "11/20/25",
      patientName: "Lisha Cook",
      gender: "(F)",
      fin: "763454",
      mrn: "563526626",
      dob: "08/05/1981",
      pos: "The University RL",
      cpt: "Q11980; 00934",
      cpt2: "Q11980; 00934",
      modifier: "26, LT",
      modifier2: "26, LT",
      icd: "$11.011D Z20.4",
      icd2: "$11.011, D220.4, $11.011, D220.4, $11.011, D220.4",
      doa: "08/25/2026",
      referral: "NA",
      author: "NA",
      subscriber: "NA",
      placeOfService: "NA",
      primaryInsurance: "Aetna",
      plan: "Aetna 109375091",
      billed: "$1,240",
      billedAmount: "$1,240",
      patientCopay: "$75",
      patientPayment: "$40",
      status: "Unbilled",
      remarks: "Gender conflict — P13.1 removed...",
      referenceId: "1234567",
      hasFlag: true,
    },
    {
      id: 3,
      encounterId: "1234567",
      claimId: "1234569",
      dos: "08/25/2026",
      dosShort: "11/20/25",
      patientName: "Lisha Cook",
      gender: "(F)",
      fin: "763454",
      mrn: "563526626",
      dob: "08/05/1981",
      pos: "The University RL",
      cpt: "Q11980; 00934",
      cpt2: "Q11980; 00934",
      modifier: "26, LT",
      modifier2: "26, LT",
      icd: "$11.011D Z20.4",
      icd2: "$11.011, D220.4, $11.011, D220.4, $11.011, D220.4",
      doa: "08/25/2026",
      referral: "NA",
      author: "NA",
      subscriber: "NA",
      placeOfService: "NA",
      primaryInsurance: "Aetna",
      plan: "Aetna 109375091",
      billed: "$1,240",
      billedAmount: "$1,240",
      patientCopay: "$75",
      patientPayment: "$40",
      status: "Unbilled",
      remarks: "Gender conflict — P13.1 removed...",
      referenceId: "1234567",
    },
    {
      id: 4,
      encounterId: "1234567",
      claimId: "1234567",
      dos: "08/25/2026",
      dosShort: "11/20/25",
      patientName: "Lisha Cook",
      gender: "(F)",
      fin: "763454",
      mrn: "563526626",
      dob: "08/05/1981",
      pos: "The University RL",
      cpt: "Q11980; 00934",
      cpt2: "Q11980; 00934",
      modifier: "26, LT",
      modifier2: "26, LT",
      icd: "$11.011D Z20.4",
      icd2: "$11.011, D220.4, $11.011, D220.4, $11.011, D220.4",
      doa: "08/25/2026",
      referral: "NA",
      author: "NA",
      subscriber: "NA",
      placeOfService: "NA",
      primaryInsurance: "Aetna",
      plan: "Aetna 109375091",
      billed: "$1,240",
      billedAmount: "$1,240",
      patientCopay: "$75",
      patientPayment: "$40",
      status: "Unbilled",
      remarks: "Gender conflict — P13.1 removed...",
      referenceId: "1234567",
    },
    {
      id: 5,
      encounterId: "1234567",
      claimId: "1234567",
      dos: "08/25/2026",
      dosShort: "11/20/25",
      patientName: "Lisha Cook",
      gender: "(F)",
      fin: "763454",
      mrn: "563526626",
      dob: "08/05/1981",
      pos: "The University RL",
      cpt: "Q11980; 00934",
      cpt2: "Q11980; 00934",
      modifier: "26, LT",
      modifier2: "26, LT",
      icd: "$11.011D Z20.4",
      icd2: "$11.011, D220.4, $11.011, D220.4, $11.011, D220.4",
      doa: "08/25/2026",
      referral: "NA",
      author: "NA",
      subscriber: "NA",
      placeOfService: "NA",
      primaryInsurance: "Aetna",
      plan: "Aetna 109375091",
      billed: "$1,240",
      billedAmount: "$1,240",
      patientCopay: "$75",
      patientPayment: "$40",
      status: "Unbilled",
      remarks: "Gender conflict — P13.1 removed...",
      referenceId: "1234567",
    },
    {
      id: 6,
      encounterId: "1234567",
      claimId: "1234567",
      dos: "08/25/2026",
      dosShort: "11/20/25",
      patientName: "Lisha Cook",
      gender: "(F)",
      fin: "763454",
      mrn: "563526626",
      dob: "08/05/1981",
      pos: "The University RL",
      cpt: "Q11980; 00934",
      cpt2: "Q11980; 00934",
      modifier: "26, LT",
      modifier2: "26, LT",
      icd: "$11.011D Z20.4",
      icd2: "$11.011, D220.4, $11.011, D220.4, $11.011, D220.4",
      doa: "08/25/2026",
      referral: "NA",
      author: "NA",
      subscriber: "NA",
      placeOfService: "NA",
      primaryInsurance: "Aetna",
      plan: "Aetna 109375091",
      billed: "$1,240",
      billedAmount: "$1,240",
      patientCopay: "$75",
      patientPayment: "$40",
      status: "Unbilled",
      remarks: "Gender conflict — P13.1 removed...",
      referenceId: "1234567",
    },
    {
      id: 7,
      encounterId: "1234567",
      claimId: "1234567",
      dos: "08/25/2026",
      dosShort: "11/20/25",
      patientName: "Lisha Cook",
      gender: "(F)",
      fin: "763454",
      mrn: "563526626",
      dob: "08/05/1981",
      pos: "The University RL",
      cpt: "Q11980; 00934",
      cpt2: "Q11980; 00934",
      modifier: "26, LT",
      modifier2: "26, LT",
      icd: "$11.011D Z20.4",
      icd2: "$11.011, D220.4, $11.011, D220.4, $11.011, D220.4",
      doa: "08/25/2026",
      referral: "NA",
      author: "NA",
      subscriber: "NA",
      placeOfService: "NA",
      primaryInsurance: "Aetna",
      plan: "Aetna 109375091",
      billed: "$1,240",
      billedAmount: "$1,240",
      patientCopay: "$75",
      patientPayment: "$40",
      status: "Unbilled",
      remarks: "Gender conflict — P13.1 removed...",
      referenceId: "1234567",
    },
    {
      id: 8,
      encounterId: "1234567",
      claimId: "1234567",
      dos: "08/25/2026",
      dosShort: "11/20/25",
      patientName: "Lisha Cook",
      gender: "(F)",
      fin: "763454",
      mrn: "563526626",
      dob: "08/05/1981",
      pos: "The University RL",
      cpt: "Q11980; 00934",
      cpt2: "Q11980; 00934",
      modifier: "26, LT",
      modifier2: "26, LT",
      icd: "$11.011D Z20.4",
      icd2: "$11.011, D220.4, $11.011, D220.4, $11.011, D220.4",
      doa: "08/25/2026",
      referral: "NA",
      author: "NA",
      subscriber: "NA",
      placeOfService: "NA",
      primaryInsurance: "Aetna",
      plan: "Aetna 109375091",
      billed: "$1,240",
      billedAmount: "$1,240",
      patientCopay: "$75",
      patientPayment: "$40",
      status: "Unbilled",
      remarks: "Gender conflict — P13.1 removed...",
      referenceId: "1234567",
    },
    {
      id: 9,
      encounterId: "1234567",
      claimId: "1234567",
      dos: "08/25/2026",
      dosShort: "11/20/25",
      patientName: "Lisha Cook",
      gender: "(F)",
      fin: "763454",
      mrn: "563526626",
      dob: "08/05/1981",
      pos: "The University RL",
      cpt: "Q11980; 00934",
      cpt2: "Q11980; 00934",
      modifier: "26, LT",
      modifier2: "26, LT",
      icd: "$11.011D Z20.4",
      icd2: "$11.011, D220.4, $11.011, D220.4, $11.011, D220.4",
      doa: "08/25/2026",
      referral: "NA",
      author: "NA",
      subscriber: "NA",
      placeOfService: "NA",
      primaryInsurance: "Aetna",
      plan: "Aetna 109375091",
      billed: "$1,240",
      billedAmount: "$1,240",
      patientCopay: "$75",
      patientPayment: "$40",
      status: "Unbilled",
      remarks: "Gender conflict — P13.1 removed...",
      referenceId: "1234567",
    },
    {
      id: 10,
      encounterId: "1234567",
      claimId: "1234567",
      dos: "08/25/2026",
      dosShort: "11/20/25",
      patientName: "Lisha Cook",
      gender: "(F)",
      fin: "763454",
      mrn: "563526626",
      dob: "08/05/1981",
      pos: "The University RL",
      cpt: "Q11980; 00934",
      cpt2: "Q11980; 00934",
      modifier: "26, LT",
      modifier2: "26, LT",
      icd: "$11.011D Z20.4",
      icd2: "$11.011, D220.4, $11.011, D220.4, $11.011, D220.4",
      doa: "08/25/2026",
      referral: "NA",
      author: "NA",
      subscriber: "NA",
      placeOfService: "NA",
      primaryInsurance: "Aetna",
      plan: "Aetna 109375091",
      billed: "$1,240",
      billedAmount: "$1,240",
      patientCopay: "$75",
      patientPayment: "$40",
      status: "Unbilled",
      remarks: "Gender conflict — P13.1 removed...",
      referenceId: "1234567",
    },
    {
      id: 11,
      encounterId: "1234567",
      claimId: "1234567",
      dos: "08/25/2026",
      dosShort: "11/20/25",
      patientName: "Lisha Cook",
      gender: "(F)",
      fin: "763454",
      mrn: "563526626",
      dob: "08/05/1981",
      pos: "The University RL",
      cpt: "Q11980; 00934",
      cpt2: "Q11980; 00934",
      modifier: "26, LT",
      modifier2: "26, LT",
      icd: "$11.011D Z20.4",
      icd2: "$11.011, D220.4, $11.011, D220.4, $11.011, D220.4",
      doa: "08/25/2026",
      referral: "NA",
      author: "NA",
      subscriber: "NA",
      placeOfService: "NA",
      primaryInsurance: "Aetna",
      plan: "Aetna 109375091",
      billed: "$1,240",
      billedAmount: "$1,240",
      patientCopay: "$75",
      patientPayment: "$40",
      status: "Unbilled",
      remarks: "Gender conflict — P13.1 removed...",
      referenceId: "1234567",
    },
  ];

  // Sample data for Post-billing
  const postBillingClaimsData = [
    {
      id: 1,
      dos: "11/20/25",
      patientName: "Lisha Cook",
      gender: "(F)",
      cpt: "11980 00934",
      modifier: "26, LT",
      icd: "$11.011D Z20.4",
      billedTo: "Aetna",
      billed: "$1,240",
      adjustment: "$75",
      insurancePayment: "$75",
      patientPayment: "$75",
      billedAs: "Primary",
      status: "Submitted",
      statusColor: "#E1BEE7",
      statusTextColor: "#6A1B9A",
      clearingHouse: "1234567",
      firstBilled: "$1,240",
      encounterId: "1234567",
      claimId: "1234567",
    },
    {
      id: 2,
      dos: "11/20/25",
      patientName: "Lisha Cook",
      gender: "(F)",
      cpt: "11980 00934",
      modifier: "26, LT",
      icd: "$11.011D Z20.4",
      billedTo: "Aetna",
      billed: "$1,240",
      adjustment: "$75",
      insurancePayment: "$75",
      patientPayment: "$75",
      billedAs: "Primary",
      status: "Ready for statement",
      statusColor: "#FFF3E0",
      statusTextColor: "#F57C00",
      clearingHouse: "1234567",
      firstBilled: "$1,240",
      encounterId: "1234567",
      claimId: "1234567",
    },
    {
      id: 3,
      dos: "11/20/25",
      patientName: "Lisha Cook",
      gender: "(F)",
      cpt: "11980 00934",
      modifier: "26, LT",
      icd: "$11.011D Z20.4",
      billedTo: "Aetna",
      billed: "$1,240",
      adjustment: "$75",
      insurancePayment: "$75",
      patientPayment: "$75",
      billedAs: "Primary",
      status: "Submitted",
      statusColor: "#E1BEE7",
      statusTextColor: "#6A1B9A",
      clearingHouse: "1234567",
      firstBilled: "$1,240",
      encounterId: "1234567",
      claimId: "1234567",
    },
    {
      id: 4,
      dos: "11/20/25",
      patientName: "Lisha Cook",
      gender: "(F)",
      cpt: "11980 00934",
      modifier: "26, LT",
      icd: "$11.011D Z20.4",
      billedTo: "Aetna",
      billed: "$1,240",
      adjustment: "$75",
      insurancePayment: "$75",
      patientPayment: "$75",
      billedAs: "Primary",
      status: "Settled",
      statusColor: "#B2DFDB",
      statusTextColor: "#00695C",
      clearingHouse: "1234567",
      firstBilled: "$1,240",
      encounterId: "1234567",
      claimId: "1234567",
    },
    {
      id: 5,
      dos: "11/20/25",
      patientName: "Lisha Cook",
      gender: "(F)",
      cpt: "11980 00934",
      modifier: "26, LT",
      icd: "$11.011D Z20.4",
      billedTo: "Aetna",
      billed: "$1,240",
      adjustment: "$75",
      insurancePayment: "$75",
      patientPayment: "$75",
      billedAs: "Primary",
      status: "Ready for statement",
      statusColor: "#FFF3E0",
      statusTextColor: "#F57C00",
      clearingHouse: "1234567",
      firstBilled: "$1,240",
      encounterId: "1234567",
      claimId: "1234567",
    },
    {
      id: 6,
      dos: "11/20/25",
      patientName: "Lisha Cook",
      gender: "(F)",
      cpt: "11980 00934",
      modifier: "26, LT",
      icd: "$11.011D Z20.4",
      billedTo: "Aetna",
      billed: "$1,240",
      adjustment: "$75",
      insurancePayment: "$75",
      patientPayment: "$75",
      billedAs: "Primary",
      status: "Submitted",
      statusColor: "#E1BEE7",
      statusTextColor: "#6A1B9A",
      clearingHouse: "1234567",
      firstBilled: "$1,240",
      encounterId: "1234567",
      claimId: "1234567",
    },
    {
      id: 7,
      dos: "11/20/25",
      patientName: "Lisha Cook",
      gender: "(F)",
      cpt: "11980 00934",
      modifier: "26, LT",
      icd: "$11.011D Z20.4",
      billedTo: "Aetna",
      billed: "$1,240",
      adjustment: "$75",
      insurancePayment: "$75",
      patientPayment: "$75",
      billedAs: "Primary",
      status: "Ready for statement",
      statusColor: "#FFF3E0",
      statusTextColor: "#F57C00",
      clearingHouse: "1234567",
      firstBilled: "$1,240",
      encounterId: "1234567",
      claimId: "1234567",
    },
    {
      id: 8,
      dos: "11/20/25",
      patientName: "Lisha Cook",
      gender: "(F)",
      cpt: "11980 00934",
      modifier: "26, LT",
      icd: "$11.011D Z20.4",
      billedTo: "Aetna",
      billed: "$1,240",
      adjustment: "$75",
      insurancePayment: "$75",
      patientPayment: "$75",
      billedAs: "Primary",
      status: "ERA Received",
      statusColor: "#BBDEFB",
      statusTextColor: "#0D47A1",
      clearingHouse: "1234567",
      firstBilled: "$1,240",
      encounterId: "1234567",
      claimId: "1234567",
    },
    {
      id: 9,
      dos: "11/20/25",
      patientName: "Lisha Cook",
      gender: "(F)",
      cpt: "11980 00934",
      modifier: "26, LT",
      icd: "$11.011D Z20.4",
      billedTo: "Aetna",
      billed: "$1,240",
      adjustment: "$75",
      insurancePayment: "$75",
      patientPayment: "$75",
      billedAs: "Primary",
      status: "Settled",
      statusColor: "#B2DFDB",
      statusTextColor: "#00695C",
      clearingHouse: "1234567",
      firstBilled: "$1,240",
      encounterId: "1234567",
      claimId: "1234567",
    },
    {
      id: 10,
      dos: "11/20/25",
      patientName: "Lisha Cook",
      gender: "(F)",
      cpt: "11980 00934",
      modifier: "26, LT",
      icd: "$11.011D Z20.4",
      billedTo: "Aetna",
      billed: "$1,240",
      adjustment: "$75",
      insurancePayment: "$75",
      patientPayment: "$75",
      billedAs: "Primary",
      status: "Posted",
      statusColor: "#C8E6C9",
      statusTextColor: "#2E7D32",
      clearingHouse: "1234567",
      firstBilled: "$1,240",
      encounterId: "1234567",
      claimId: "1234567",
    },
    {
      id: 11,
      dos: "11/20/25",
      patientName: "Lisha Cook",
      gender: "(F)",
      cpt: "11980 00934",
      modifier: "26, LT",
      icd: "$11.011D Z20.4",
      billedTo: "Aetna",
      billed: "$1,240",
      adjustment: "$75",
      insurancePayment: "$75",
      patientPayment: "$75",
      billedAs: "Primary",
      status: "ERA Received",
      statusColor: "#BBDEFB",
      statusTextColor: "#0D47A1",
      clearingHouse: "1234567",
      firstBilled: "$1,240",
      encounterId: "1234567",
      claimId: "1234567",
    },
  ];

  // Sample data for Remittance ERA/EOB - 11 unique records
  const remittanceData = [
    {
      id: 1,
      remittanceId: "1234567",
      location: "GCH-IH",
      provider: "Ramesh M. MD",
      payer: "Aetna",
      paymentMethod: "Cheque",
      chequeNumber: "14315316136",
      amount: "$455",
      checkDate: "11/20/2025",
      receivedDate: "11/21/2025",
      claimNumbers: 3,
      unpostedAmount: "$0",
      status: "Posted",
      statusColor: "#C8E6C9",
      statusTextColor: "#2E7D32",
    },
    {
      id: 2,
      remittanceId: "1234568",
      location: "GCH-OH",
      provider: "Sarah K. MD",
      payer: "BCBS",
      paymentMethod: "EFT",
      chequeNumber: "14315316137",
      amount: "$1,240",
      checkDate: "11/21/2025",
      receivedDate: "11/22/2025",
      claimNumbers: 5,
      unpostedAmount: "$240",
      status: "Partially posted",
      statusColor: "#FFF3E0",
      statusTextColor: "#F57C00",
    },
    {
      id: 3,
      remittanceId: "1234569",
      location: "GCH-IH",
      provider: "David L. MD",
      payer: "Cigna",
      paymentMethod: "Cheque",
      chequeNumber: "14315316138",
      amount: "$820",
      checkDate: "11/19/2025",
      receivedDate: "11/20/2025",
      claimNumbers: 2,
      unpostedAmount: "$820",
      status: "Not Posted",
      statusColor: "#FFEBEE",
      statusTextColor: "#C62828",
    },
    {
      id: 4,
      remittanceId: "1234570",
      location: "GCH-OH",
      provider: "Emily R. MD",
      payer: "UnitedHealth",
      paymentMethod: "EFT",
      chequeNumber: "14315316139",
      amount: "$2,100",
      checkDate: "11/22/2025",
      receivedDate: "11/23/2025",
      claimNumbers: 7,
      unpostedAmount: "$0",
      status: "Fully posted",
      statusColor: "#B2DFDB",
      statusTextColor: "#00695C",
    },
    {
      id: 5,
      remittanceId: "1234571",
      location: "GCH-IH",
      provider: "Michael T. MD",
      payer: "Aetna",
      paymentMethod: "Cheque",
      chequeNumber: "14315316140",
      amount: "$675",
      checkDate: "11/18/2025",
      receivedDate: "11/19/2025",
      claimNumbers: 4,
      unpostedAmount: "$675",
      status: "Not Posted",
      statusColor: "#FFEBEE",
      statusTextColor: "#C62828",
    },
    {
      id: 6,
      remittanceId: "1234572",
      location: "GCH-OH",
      provider: "Jennifer W. MD",
      payer: "Medicare",
      paymentMethod: "EFT",
      chequeNumber: "14315316141",
      amount: "$3,450",
      checkDate: "11/23/2025",
      receivedDate: "11/24/2025",
      claimNumbers: 12,
      unpostedAmount: "$450",
      status: "Partially posted",
      statusColor: "#FFF3E0",
      statusTextColor: "#F57C00",
    },
    {
      id: 7,
      remittanceId: "1234573",
      location: "GCH-IH",
      provider: "Robert H. MD",
      payer: "BCBS",
      paymentMethod: "Cheque",
      chequeNumber: "14315316142",
      amount: "$1,890",
      checkDate: "11/17/2025",
      receivedDate: "11/18/2025",
      claimNumbers: 6,
      unpostedAmount: "$0",
      status: "Posted",
      statusColor: "#C8E6C9",
      statusTextColor: "#2E7D32",
    },
    {
      id: 8,
      remittanceId: "1234574",
      location: "GCH-OH",
      provider: "Lisa M. MD",
      payer: "Cigna",
      paymentMethod: "EFT",
      chequeNumber: "14315316143",
      amount: "$920",
      checkDate: "11/24/2025",
      receivedDate: "11/25/2025",
      claimNumbers: 3,
      unpostedAmount: "$120",
      status: "Partially posted",
      statusColor: "#FFF3E0",
      statusTextColor: "#F57C00",
    },
    {
      id: 9,
      remittanceId: "1234575",
      location: "GCH-IH",
      provider: "James P. MD",
      payer: "UnitedHealth",
      paymentMethod: "Cheque",
      chequeNumber: "14315316144",
      amount: "$1,550",
      checkDate: "11/16/2025",
      receivedDate: "11/17/2025",
      claimNumbers: 5,
      unpostedAmount: "$1,550",
      status: "Not Posted",
      statusColor: "#FFEBEE",
      statusTextColor: "#C62828",
    },
    {
      id: 10,
      remittanceId: "1234576",
      location: "GCH-OH",
      provider: "Patricia D. MD",
      payer: "Aetna",
      paymentMethod: "EFT",
      chequeNumber: "14315316145",
      amount: "$2,340",
      checkDate: "11/25/2025",
      receivedDate: "11/26/2025",
      claimNumbers: 8,
      unpostedAmount: "$0",
      status: "Fully posted",
      statusColor: "#B2DFDB",
      statusTextColor: "#00695C",
    },
    {
      id: 11,
      remittanceId: "1234577",
      location: "GCH-IH",
      provider: "William S. MD",
      payer: "Medicare",
      paymentMethod: "Cheque",
      chequeNumber: "14315316146",
      amount: "$780",
      checkDate: "11/15/2025",
      receivedDate: "11/16/2025",
      claimNumbers: 2,
      unpostedAmount: "$780",
      status: "Mark as review",
      statusColor: "#E1BEE7",
      statusTextColor: "#6A1B9A",
    },
  ];

  const tabs = [
    { label: "Pre-billing Claims" },
    { label: "Post-billing Claims" },
    { label: "Remittance ERA/EOB" },
    { label: "Patient Statement" },
  ];

  const statusFilters = [
    { id: "all", label: "All 11", count: 11 },
    { id: "unbilled", label: "Unbilled 5", count: 5 },
    { id: "ready", label: "Ready To Bill 3", count: 3 },
    { id: "need", label: "Need Info 0", count: 0 },
    { id: "processed", label: "Processed 1", count: 1 },
    { id: "archived", label: "Archived 0", count: 0 },
  ];

  // Filter data based on selected status - only for pre-billing tab
  const filteredData =
    currentTab === 0
      ? preBillingClaimsData.filter((claim) => {
          if (statusFilter === "all") return true;
          if (statusFilter === "unbilled") return claim.status === "Unbilled";
          if (statusFilter === "ready") return claim.status === "Ready";
          if (statusFilter === "need") return claim.status === "Need Info";
          if (statusFilter === "processed") return claim.status === "Processed";
          if (statusFilter === "archived") return claim.status === "Archived";
          return true;
        })
      : postBillingClaimsData;

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: "#f5f7fa",
        overflow: "hidden",
         overflowY: "auto", 
      }}
    >
      {/* Main Tabs and Search Bar in Same Row */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #e0e0e0",
          backgroundColor: "white",
          px: 2,
          gap: 0.5,
          overflow: "hidden",
        }}
      >
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          variant="standard"
          sx={{
            minHeight: 48,
            flex: "0 0 auto",
            "& .MuiTabs-flexContainer": {
              gap: 0,
            },
            "& .MuiTab-root": {
              minHeight: 48,
              textTransform: "none",
              fontSize: 12,
              fontWeight: 500,
              color: "#000000",
              px: 1.2,
              minWidth: "auto",
              whiteSpace: "nowrap",
            },
            "& .Mui-selected": {
              color: "#0066ff",
              fontWeight: 600,
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "#0066ff",
              height: 3,
            },
            "& .MuiTabs-scroller": {
              overflow: "visible !important",
            },
          }}
        >
          {tabs.map((tab, index) => (
            <Tab key={index} label={tab.label} />
          ))}
        </Tabs>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            flex: "0 1 auto",
          }}
        >
          {/* Search */}
          <TextField
            placeholder="Search Patient, MRN, FIN, Rendering provider..."
            size="small"
            sx={{
              width: 290,

              "& .MuiOutlinedInput-root": {
                height: 32,
                borderRadius: "18px",
                backgroundColor: "#F5F7FA",
                fontSize: 12,
                color: "#4B5563",
                paddingLeft: "4px",

                "& fieldset": {
                  border: "none",
                },

                "&:hover fieldset": {
                  border: "none",
                },

                "&.Mui-focused fieldset": {
                  border: "1px solid #0066FF",
                },

                "& input": {
                  padding: "8px 8px 8px 4px",
                },

                "& input::placeholder": {
                  color: "#9CA3AF",
                  opacity: 1,
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Box sx={{ display: "flex", alignItems: "center", mt: 0.3 }}>
                    <Search />
                  </Box>
                </InputAdornment>
              ),
            }}
          />

          {/* Advanced Filters */}
          <Button
            variant="outlined"
            size="small"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            sx={{
              height: 32,
              borderRadius: "18px",
              textTransform: "none",
              color: showAdvancedFilters ? "#0066FF" : "#374151",
              borderColor: showAdvancedFilters ? "#0066FF" : "#E5E7EB",
              backgroundColor: showAdvancedFilters ? "#EFF6FF" : "#FFFFFF",
              fontWeight: 500,
              fontSize: 11.5,
              px: 1.5,
              whiteSpace: "nowrap",
              minWidth: "auto",

              "&:hover": {
                borderColor: showAdvancedFilters ? "#0052CC" : "#D1D5DB",
                backgroundColor: showAdvancedFilters ? "#DBEAFE" : "#F9FAFB",
              },
            }}
          >
            {showAdvancedFilters ? (
              <>
                <Close sx={{ fontSize: 16, mr: 0.5 }} />
                Advanced filters
              </>
            ) : (
              <>
                <Box sx={{ display: "flex", alignItems: "center", mr: 0.5 }}>
                  <FilterIcon1 />
                </Box>
                Advanced filters
              </>
            )}
          </Button>

          {/* List / Grid - Single Merged Toggle - Only for Pre-billing tab */}
          {currentTab === 0 && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                height: 32,
                border: "1px solid #E5E7EB",
                borderRadius: "8px",
                overflow: "hidden",
                backgroundColor: "#FFFFFF",
              }}
            >
              {/* List */}
              <IconButton
                size="small"
                onClick={() => setViewMode("list")}
                sx={{
                  width: 32,
                  height: 34,
                  borderRadius: 0,
                  backgroundColor: viewMode === "list" ? "#0066FF" : "#FFFFFF",
                  color: viewMode === "list" ? "#FFFFFF" : "#6B7280",

                  "&:hover": {
                    backgroundColor:
                      viewMode === "list" ? "#0052CC" : "#F3F4F6",
                  },
                }}
              >
                <ViewList sx={{ fontSize: 17 }} />
              </IconButton>

              {/* Grid */}
              <IconButton
                size="small"
                onClick={() => setViewMode("grid")}
                sx={{
                  width: 32,
                  height: 34,
                  borderRadius: 0,
                  backgroundColor: viewMode === "grid" ? "#0066FF" : "#FFFFFF",
                  color: viewMode === "grid" ? "#FFFFFF" : "#6B7280",

                  "&:hover": {
                    backgroundColor:
                      viewMode === "grid" ? "#0052CC" : "#F3F4F6",
                  },
                }}
              >
                <ViewModule sx={{ fontSize: 17 }} />
              </IconButton>
            </Box>
          )}
        </Box>
      </Box>

      {/* Advanced Filters Panel - For Post-billing tab */}
     {currentTab === 1 && showAdvancedFilters && (
  <Box
    sx={{
      backgroundColor: "#F5F7FA",
      px: 2,
      py: 2,
    }}
  >
    <Box
      sx={{
        backgroundColor: "#FFFFFF",
        borderRadius: "12px",
        border: "1px solid #E5E7EB",
        p: 3,
        position: "relative",
      }}
    >
      {/* First Row */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: 2,
          mb: 2,
        }}
      >
        {/* Select Practice */}
        <Box>
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 600,
              color: "#374151",
              mb: 0.8,
            }}
          >
            Select Practice
          </Typography>

          <FormControl fullWidth size="small">
            <Select
              displayEmpty
              value={filterPractice}
              onChange={(e) => setFilterPractice(e.target.value)}
              IconComponent={KeyboardArrowDown}
              sx={{
                fontSize: 13,
                borderRadius: "8px",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#E5E7EB",
                  borderRadius: "8px",
                },
                "& .MuiSelect-icon": {
                  color: "#6B7280",
                },
              }}
            >
              <MenuItem value="" disabled>
                Select
              </MenuItem>
              <MenuItem value="practice1">Practice 1</MenuItem>
              <MenuItem value="practice2">Practice 2</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Service Location */}
        <Box>
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 600,
              color: "#374151",
              mb: 0.8,
            }}
          >
            Service Location
          </Typography>

          <FormControl fullWidth size="small">
            <Select
              displayEmpty
              value={filterServiceLocation}
              onChange={(e) => setFilterServiceLocation(e.target.value)}
              IconComponent={KeyboardArrowDown}
              sx={{
                fontSize: 13,
                borderRadius: "8px",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#E5E7EB",
                  borderRadius: "8px",
                },
                "& .MuiSelect-icon": {
                  color: "#6B7280",
                },
              }}
            >
              <MenuItem value="" disabled>
                Select
              </MenuItem>
              <MenuItem value="location1">Location 1</MenuItem>
              <MenuItem value="location2">Location 2</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Patient Name */}
        <Box>
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 600,
              color: "#374151",
              mb: 0.8,
            }}
          >
            Patient Name
          </Typography>

          <TextField
            fullWidth
            size="small"
            placeholder="Type"
            value={filterPatientName}
            onChange={(e) => setFilterPatientName(e.target.value)}
            sx={{
              fontSize: 13,
              "& .MuiOutlinedInput-root": {
                fontSize: 13,
                borderRadius: "8px",
                "& fieldset": {
                  borderColor: "#E5E7EB",
                  borderRadius: "8px",
                },
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Search style={{ width: 16, height: 16 }} />
                  </Box>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* FIN ID */}
        <Box>
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 600,
              color: "#374151",
              mb: 0.8,
            }}
          >
            FIN ID
          </Typography>

          <TextField
            fullWidth
            size="small"
            placeholder="Type"
            value={filterFinId}
            onChange={(e) => setFilterFinId(e.target.value)}
            sx={{
              fontSize: 13,
              "& .MuiOutlinedInput-root": {
                fontSize: 13,
                borderRadius: "8px",
                "& fieldset": {
                  borderColor: "#E5E7EB",
                  borderRadius: "8px",
                },
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Search style={{ width: 16, height: 16 }} />
                  </Box>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* MRN */}
        <Box>
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 600,
              color: "#374151",
              mb: 0.8,
            }}
          >
            MRN
          </Typography>

          <TextField
            fullWidth
            size="small"
            placeholder="Type"
            value={filterMrn}
            onChange={(e) => setFilterMrn(e.target.value)}
            sx={{
              fontSize: 13,
              "& .MuiOutlinedInput-root": {
                fontSize: 13,
                borderRadius: "8px",
                "& fieldset": {
                  borderColor: "#E5E7EB",
                  borderRadius: "8px",
                },
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Search style={{ width: 16, height: 16 }} />
                  </Box>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Batch Number */}
        <Box>
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 600,
              color: "#374151",
              mb: 0.8,
            }}
          >
            Batch Number
          </Typography>

          <TextField
            fullWidth
            size="small"
            placeholder="Type"
            value={filterBatchNumber}
            onChange={(e) => setFilterBatchNumber(e.target.value)}
            sx={{
              fontSize: 13,
              "& .MuiOutlinedInput-root": {
                fontSize: 13,
                borderRadius: "8px",
                "& fieldset": {
                  borderColor: "#E5E7EB",
                  borderRadius: "8px",
                },
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Search style={{ width: 16, height: 16 }} />
                  </Box>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>

      {/* Second Row */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: 2,
          mb: 2.5,
        }}
      >
        {/* Claim number */}
        <Box>
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 600,
              color: "#374151",
              mb: 0.8,
            }}
          >
            Claim number
          </Typography>

          <TextField
            fullWidth
            size="small"
            placeholder="Type"
            value={filterClaimNumber}
            onChange={(e) => setFilterClaimNumber(e.target.value)}
            sx={{
              fontSize: 13,
              "& .MuiOutlinedInput-root": {
                fontSize: 13,
                borderRadius: "8px",
                "& fieldset": {
                  borderColor: "#E5E7EB",
                  borderRadius: "8px",
                },
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Search style={{ width: 16, height: 16 }} />
                  </Box>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* DOS From */}
        <Box>
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 600,
              color: "#374151",
              mb: 0.8,
            }}
          >
            DOS From
          </Typography>

          <TextField
            fullWidth
            size="small"
            type="date"
            value={filterDosFrom}
            onChange={(e) => setFilterDosFrom(e.target.value)}
            placeholder="Select provider"
            InputLabelProps={{ shrink: true }}
            sx={{
              fontSize: 13,
              "& .MuiOutlinedInput-root": {
                fontSize: 13,
                borderRadius: "8px",
                "& fieldset": {
                  borderColor: "#E5E7EB",
                  borderRadius: "8px",
                },
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <CalendarToday sx={{ fontSize: 18, color: "#9CA3AF" }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* DOS Till */}
        <Box>
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 600,
              color: "#374151",
              mb: 0.8,
            }}
          >
            DOS Till
          </Typography>

          <TextField
            fullWidth
            size="small"
            type="date"
            value={filterDosTill}
            onChange={(e) => setFilterDosTill(e.target.value)}
            placeholder="Select provider"
            InputLabelProps={{ shrink: true }}
            sx={{
              fontSize: 13,
              "& .MuiOutlinedInput-root": {
                fontSize: 13,
                borderRadius: "8px",
                "& fieldset": {
                  borderColor: "#E5E7EB",
                  borderRadius: "8px",
                },
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <CalendarToday sx={{ fontSize: 18, color: "#9CA3AF" }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Select Status */}
        <Box>
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 600,
              color: "#374151",
              mb: 0.8,
            }}
          >
            Select Status
          </Typography>

          <FormControl fullWidth size="small">
            <Select
              displayEmpty
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              IconComponent={KeyboardArrowDown}
              sx={{
                fontSize: 13,
                borderRadius: "8px",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#E5E7EB",
                  borderRadius: "8px",
                },
                "& .MuiSelect-icon": {
                  color: "#6B7280",
                },
              }}
            >
              <MenuItem value="" disabled>
                Select
              </MenuItem>
              <MenuItem value="submitted">Submitted</MenuItem>
              <MenuItem value="ready">Ready for statement</MenuItem>
              <MenuItem value="settled">Settled</MenuItem>
              <MenuItem value="era">ERA Received</MenuItem>
              <MenuItem value="posted">Posted</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Select Insurance */}
        <Box>
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 600,
              color: "#374151",
              mb: 0.8,
            }}
          >
            Select Insurance
          </Typography>

          <FormControl fullWidth size="small">
            <Select
              displayEmpty
              value={filterInsurance}
              onChange={(e) => setFilterInsurance(e.target.value)}
              IconComponent={KeyboardArrowDown}
              sx={{
                fontSize: 13,
                borderRadius: "8px",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#E5E7EB",
                  borderRadius: "8px",
                },
                "& .MuiSelect-icon": {
                  color: "#6B7280",
                },
              }}
            >
              <MenuItem value="" disabled>
                Select
              </MenuItem>
              <MenuItem value="aetna">Aetna</MenuItem>
              <MenuItem value="bcbs">BCBS</MenuItem>
              <MenuItem value="cigna">Cigna</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Select submission Method */}
        <Box>
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 600,
              color: "#374151",
              mb: 0.8,
                whiteSpace: "nowrap",
            }}
          >
            Select submission Method
          </Typography>

          <FormControl fullWidth size="small">
            <Select
              displayEmpty
              value={filterSubmissionMethod}
              onChange={(e) => setFilterSubmissionMethod(e.target.value)}
              IconComponent={KeyboardArrowDown}
              sx={{
                fontSize: 13,
                borderRadius: "8px",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#E5E7EB",
                  borderRadius: "8px",
                },
              }}
            >
              <MenuItem value="" disabled>
                Select location
              </MenuItem>
              <MenuItem value="electronic">Electronic</MenuItem>
              <MenuItem value="paper">Paper</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Action Buttons */}
      <Box
        sx={{
          display: "flex",
          gap: 1.5,
        }}
      >
        <Button
          variant="contained"
          sx={{
            textTransform: "none",
            backgroundColor: "#0066FF",
            color: "#FFFFFF",
            fontWeight: 600,
            fontSize: 13,
            px: 3,
            py: 0.8,
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "#0052CC",
              boxShadow: "none",
            },
          }}
        >
          Search
        </Button>

        <Button
          variant="outlined"
          onClick={handleResetFilters}
          sx={{
            textTransform: "none",
            color: "#374151",
            borderColor: "#E5E7EB",
            fontWeight: 600,
            fontSize: 13,
            px: 3,
            py: 0.8,
            "&:hover": {
              borderColor: "#D1D5DB",
              backgroundColor: "#F9FAFB",
            },
          }}
        >
          Reset
        </Button>
      </Box>
    </Box>
  </Box>
)}

      {/* Info Banner */}
      {currentTab === 0 && (
        <Box
          sx={{
            backgroundColor: "#EFF7FF",
            border: "1px solid #D5E3F2",
            p: "10px 12px",
            mx: 2,
            mt: 2,
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            minHeight: "52px",
            boxSizing: "border-box",
          }}
        >
          {/* Left Content */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              minWidth: 0,
              gap: "3px",
            }}
          >
            {/* Heading */}
            <Typography
              component="div"
              sx={{
                fontWeight: 700,
                color: "#0066FF",
                fontSize: "10px",
                lineHeight: 1.2,
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <Star />

              <span>CHARGE-CAPTURE ASSIST</span>
            </Typography>

            {/* Description */}
            <Typography
              component="div"
              sx={{
                color: "#374151",
                fontSize: "11px",
                lineHeight: 1.45,
                whiteSpace: "normal",
              }}
            >
              TiaStat auto-coded <strong>11 encounters</strong> from clinical
              notes. <strong>3 are clean and ready to bill</strong>; the rest
              have flagged edits (gender conflicts, missing etiology dx,
              cosmetic-vs-functional). Toggle Grid to see full problem/procedure
              detail without opening each record.
            </Typography>
          </Box>

          {/* View Details Button */}
          <Button
            variant="contained"
            size="small"
            sx={{
              textTransform: "none",
              backgroundColor: "#0066FF",
              color: "#fff",
              boxShadow: "none",
              fontSize: "11px",
              px: 2,
              py: 0,
              minWidth: "89px",
              height: "30px",
              fontWeight: 600,
              whiteSpace: "nowrap",
              flexShrink: 0,
              borderRadius: "6px",
              "&:hover": {
                backgroundColor: "#0066FF",
                boxShadow: "none",
              },
            }}
          >
            View details
          </Button>
        </Box>
      )}

      {/* Status Filter Chips and Actions in Same Row - Only for Pre-billing */}
      {currentTab === 0 && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
            py: 1.5,
          }}
        >
          <Box sx={{ display: "flex", gap: 1 }}>
            {statusFilters.map((filter) => (
              <Chip
                key={filter.id}
                label={filter.label}
                clickable
                onClick={() => setStatusFilter(filter.id)}
                sx={{
                  backgroundColor:
                    statusFilter === filter.id ? "#0066ff" : "white",
                  color:
                    statusFilter === filter.id ? "white" : "rgba(0, 0, 0, 0.7)",
                  fontWeight: statusFilter === filter.id ? 600 : 500,
                  fontSize: 11,
                  height: 28,
                  border:
                    statusFilter === filter.id ? "none" : "1px solid #e0e0e0",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor:
                      statusFilter === filter.id ? "#0052cc" : "#f5f5f5",
                  },
                }}
              />
            ))}
          </Box>

          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <IconButton
              size="small"
              sx={{
                width: 40,
                height: 30,
                border: "none",
                borderRadius: "8px",
                backgroundColor: "white",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                "&:hover": {
                  backgroundColor: "#f9fafb",
                },
              }}
            >
              <SettingsIcon />
            </IconButton>
            <IconButton
              size="small"
              sx={{
                width: 40,
                height: 30,
                border: "none",
                borderRadius: "8px",
                backgroundColor: "white",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                "&:hover": {
                  backgroundColor: "#f9fafb",
                },
              }}
            >
              <DownloadIcon />
            </IconButton>
            <Button
              variant="outlined"
              endIcon={<KeyboardArrowDown sx={{ fontSize: 20 }} />}
              sx={{
                textTransform: "none",
                color: "#1f2937",
                borderColor: "transparent",
                backgroundColor: "white",
                fontWeight: 500,
                fontSize: 13,
                height: 30,
                px: 2,
                minWidth: "auto",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                borderRadius: "8px",
                "&:hover": {
                  borderColor: "transparent",
                  backgroundColor: "#f9fafb",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                },
              }}
              onClick={(e) => setAnchorEl(e.currentTarget)}
            >
              Select Action
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem onClick={() => setAnchorEl(null)}>
                Submit Claims
              </MenuItem>
              <MenuItem onClick={() => setAnchorEl(null)}>
                Export Selected
              </MenuItem>
              <MenuItem onClick={() => setAnchorEl(null)}>
                Mark as Processed
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      )}

      {/* Pre-billing Tab Content */}
      {currentTab === 0 && (
        <Box>
          {/* Table or Grid View */}
          {viewMode === "list" ? (
            <Box
              sx={{
                pb: 2,
                px: 2,
              }}
            >
              <TableContainer
                component={Paper}
                sx={{
                  boxShadow: "none",
                  border: "1px solid #e0e0e0",
                  maxHeight: "calc(100vh - 280px)",
                  overflowY: "auto",
                  overflowX: "auto",
                  // Custom scrollbar styling - thin line style
                  "&::-webkit-scrollbar": {
                    width: "4px",
                    height: "4px",
                  },
                  "&::-webkit-scrollbar-track": {
                    backgroundColor: "transparent",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#d1d5db",
                    borderRadius: "2px",
                  },
                  "&::-webkit-scrollbar-thumb:hover": {
                    backgroundColor: "#9ca3af",
                  },
                }}
              >
                <Table size="small" sx={{ minWidth: 1400 }}>
                  <TableHead
                    sx={{
                      "& .MuiTableCell-root": {
                        fontWeight: 600,
                        fontSize: 11,
                        color: "#374151",
                        py: 2,
                        px: 0.35,
                        lineHeight: 1.05,
                        whiteSpace: "normal",
                        verticalAlign: "middle",
                      },
                    }}
                  >
                    <TableRow sx={{ backgroundColor: "#fafafa" }}>
                      <TableCell padding="checkbox" sx={{ width: 40, py: 0.8 }}>
                        <Checkbox
                          size="small"
                          indeterminate={
                            selectedRows.length > 0 &&
                            selectedRows.length < filteredData.length
                          }
                          checked={
                            filteredData.length > 0 &&
                            selectedRows.length === filteredData.length
                          }
                          onChange={handleSelectAllClick}
                        />
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 600,
                          fontSize: 11,
                          color: "rgba(0, 0, 0, 0.6)",
                          py: 0.8,
                        }}
                      >
                        DOS
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 600,
                          fontSize: 11,
                          color: "rgba(0, 0, 0, 0.6)",
                          py: 0.8,
                        }}
                      >
                        Patient Name (Gender)
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 600,
                          fontSize: 11,
                          color: "rgba(0, 0, 0, 0.6)",
                          py: 0.8,
                        }}
                      >
                        CPT
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 600,
                          fontSize: 11,
                          color: "rgba(0, 0, 0, 0.6)",
                          py: 0.8,
                        }}
                      >
                        Modifier
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 600,
                          fontSize: 11,
                          color: "rgba(0, 0, 0, 0.6)",
                          py: 0.8,
                        }}
                      >
                        ICD
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 600,
                          fontSize: 11,
                          color: "rgba(0, 0, 0, 0.6)",
                          py: 0.8,
                        }}
                      >
                        Primary Insurance
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 600,
                          fontSize: 11,
                          color: "rgba(0, 0, 0, 0.6)",
                          py: 0.8,
                        }}
                      >
                        Billed Amount
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 600,
                          fontSize: 11,
                          color: "rgba(0, 0, 0, 0.6)",
                          py: 0.8,
                        }}
                      >
                        Patient Copay
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 600,
                          fontSize: 11,
                          color: "rgba(0, 0, 0, 0.6)",
                          py: 0.8,
                        }}
                      >
                        Status
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 600,
                          fontSize: 11,
                          color: "rgba(0, 0, 0, 0.6)",
                          py: 0.8,
                        }}
                      >
                        Remarks
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 600,
                          fontSize: 11,
                          color: "rgba(0, 0, 0, 0.6)",
                          py: 0.8,
                        }}
                      >
                        Encounter ID #
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 600,
                          fontSize: 11,
                          color: "rgba(0, 0, 0, 0.6)",
                          py: 0.8,
                        }}
                      >
                        Claim ID
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 600,
                          fontSize: 11,
                          color: "rgba(0, 0, 0, 0.6)",
                          py: 0.8,
                        }}
                      >
                        Reference ID
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 600,
                          fontSize: 11,
                          py: 0.8,
                          color: "rgba(0, 0, 0, 0.6)",
                        }}
                      >
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredData.map((row, index) => {
                      const isItemSelected = isSelected(row.id);
                      const bgColor = getListColor(index);
                      return (
                        <TableRow
                          key={row.id}
                          selected={isItemSelected}
                          sx={{
                            backgroundColor: bgColor,
                            borderBottom: "none",
                          }}
                        >
                          <TableCell padding="checkbox" sx={{ py: 1.2 }}>
                            <Checkbox
                              size="small"
                              checked={isItemSelected}
                              onChange={() => handleRowSelect(row.id)}
                            />
                          </TableCell>
                          <TableCell
                            sx={{
                              fontSize: 12,
                              py: 1.2,
                              color: "rgba(0, 0, 0, 0.87)",
                            }}
                          >
                            {row.dosShort}
                          </TableCell>
                          <TableCell
                            sx={{
                              fontSize: 12,
                              py: 1.2,
                              color: "rgba(0, 0, 0, 0.87)",
                            }}
                          >
                            {row.patientName} {row.gender}
                          </TableCell>
                          <TableCell
                            sx={{
                              fontSize: 12,
                              py: 1.2,
                              color: "rgba(0, 0, 0, 0.87)",
                            }}
                          >
                            {row.cpt}
                          </TableCell>
                          <TableCell
                            sx={{
                              fontSize: 12,
                              py: 1.2,
                              color: "rgba(0, 0, 0, 0.87)",
                            }}
                          >
                            {row.modifier}
                          </TableCell>
                          <TableCell
                            sx={{
                              fontSize: 12,
                              py: 1.2,
                              color: "rgba(0, 0, 0, 0.87)",
                            }}
                          >
                            {row.icd}
                          </TableCell>
                          <TableCell
                            sx={{
                              fontSize: 12,
                              py: 1.2,
                              color: "rgba(0, 0, 0, 0.87)",
                            }}
                          >
                            {row.primaryInsurance}
                          </TableCell>
                          <TableCell
                            sx={{
                              fontSize: 12,
                              py: 1.2,
                              color: "rgba(0, 0, 0, 0.87)",
                            }}
                          >
                            {row.billed}
                          </TableCell>
                          <TableCell
                            sx={{
                              fontSize: 12,
                              py: 1.2,
                              color: "rgba(0, 0, 0, 0.87)",
                            }}
                          >
                            {row.patientCopay}
                          </TableCell>
                          <TableCell sx={{ py: 1.2 }}>
                            <Chip
                              label={row.status}
                              size="small"
                              sx={{
                                backgroundColor: "#FFF3E0",
                                color: "#F57C00",
                                fontWeight: 600,
                                fontSize: 10,
                                height: 20,
                              }}
                            />
                          </TableCell>
                          <TableCell
                            sx={{
                              maxWidth: 180,
                              fontSize: 11,
                              py: 1.2,
                              color: "rgba(0, 0, 0, 0.7)",
                            }}
                          >
                            {row.remarks}
                          </TableCell>
                          <TableCell
                            sx={{
                              fontSize: 12,
                              py: 1.2,
                              color: "rgba(0, 0, 0, 0.87)",
                            }}
                          >
                            {row.encounterId}
                          </TableCell>
                          <TableCell sx={{ py: 1.2 }}>
                            <Typography
                              sx={{
                                fontSize: 12,
                                color: "rgba(0, 0, 0, 0.87)",
                              }}
                            >
                              {row.claimId}
                            </Typography>
                          </TableCell>
                          <TableCell
                            sx={{
                              fontSize: 12,
                              py: 1.2,
                              color: "rgba(0, 0, 0, 0.87)",
                            }}
                          >
                            {row.referenceId}
                          </TableCell>
                          <TableCell sx={{ py: 1.2 }}>
                            <Box
                              sx={{
                                display: "flex",
                                gap: 0.5,
                                alignItems: "center",
                              }}
                            >
                              <Tooltip title="Edit" placement="top">
                                <IconButton
                                  size="small"
                                  sx={{ padding: "4px" }}
                                   onClick={() => navigate("/new-encounter")}
                                >
                                  <EditIconClaim />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="View list" placement="top">
                                <IconButton
                                  size="small"
                                  sx={{ padding: "4px" }}
                                >
                                  <Icon2 />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Clipboard" placement="top">
                                <IconButton
                                  size="small"
                                  sx={{ padding: "4px" }}
                                >
                                  <Icon3 />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Folder" placement="top">
                                <IconButton
                                  size="small"
                                  sx={{ padding: "4px" }}
                                >
                                  <Icon4 />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Document" placement="top">
                                <IconButton
                                  size="small"
                                  sx={{ padding: "4px" }}
                                >
                                  <Icon5 />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Check" placement="top">
                                <IconButton
                                  size="small"
                                  sx={{ padding: "4px" }}
                                >
                                  <Icon6 />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          ) : (
            <Box
              sx={{
                width: "100%",
                pb: 2,
                px: 2,
                maxHeight: "calc(100vh - 280px)",
                overflowY: "auto",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.5,
                }}
              >
                {filteredData.map((row, index) => {
                  const bgColor = getGridColor(index);
                  return (
                    <Box
                      key={row.id}
                      sx={{
                        backgroundColor: bgColor,
                        border: "1px solid #e0e0e0",
                        borderRadius: 1,
                        px: 2,
                        py: 1.5,
                        boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          gap: 4,
                          alignItems: "flex-start",
                          width: "100%",
                        }}
                      >
                        {/* Left Section - Encounter Details */}
                        <Box sx={{ flex: "0 0 105px" }}>
                          <Typography
                            variant="caption"
                            sx={{
                              color: "rgba(0, 0, 0, 0.4)",
                              fontSize: 9,
                              fontWeight: 600,
                              textTransform: "uppercase",
                              letterSpacing: "0.5px",
                            }}
                          >
                            ENCOUNTER DETAILS
                          </Typography>
                          <Box sx={{ mt: 0.8 }}>
                            <Typography
                              sx={{
                                fontSize: 11,
                                color: "rgba(0, 0, 0, 0.87)",
                                mb: 0.4,
                                lineHeight: 1.4,
                              }}
                            >
                              <strong style={{ fontWeight: 600 }}>
                                Encounter ID:
                              </strong>{" "}
                              {row.encounterId}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: 11,
                                color: "rgba(0, 0, 0, 0.87)",
                                mb: 0.4,
                                lineHeight: 1.4,
                              }}
                            >
                              <strong style={{ fontWeight: 600 }}>
                                Claim ID:
                              </strong>{" "}
                              {row.claimId}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: 11,
                                color: "rgba(0, 0, 0, 0.87)",
                                mb: 0.4,
                                lineHeight: 1.4,
                              }}
                            >
                              <strong style={{ fontWeight: 600 }}>DOS:</strong>{" "}
                              {row.dos}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: 11,
                                color: "rgba(0, 0, 0, 0.87)",
                                lineHeight: 1.4,
                              }}
                            >
                              <strong style={{ fontWeight: 600 }}>POS:</strong>{" "}
                              {row.pos}
                            </Typography>
                          </Box>
                        </Box>

                        {/* Patient Details */}
                        <Box sx={{ flex: "0 0 110px" }}>
                          <Typography
                            variant="caption"
                            sx={{
                              color: "rgba(0, 0, 0, 0.4)",
                              fontSize: 9,
                              fontWeight: 600,
                              textTransform: "uppercase",
                              letterSpacing: "0.5px",
                            }}
                          >
                            PATIENT DETAILS
                          </Typography>
                          <Box sx={{ mt: 0.8 }}>
                            <Typography
                              sx={{
                                fontSize: 11,
                                fontWeight: 600,
                                color: "rgba(0, 0, 0, 0.87)",
                                mb: 0.5,
                              }}
                            >
                              {row.patientName} {row.gender}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: 11,
                                color: "rgba(0, 0, 0, 0.87)",
                                mb: 0.4,
                                lineHeight: 1.4,
                              }}
                            >
                              <strong style={{ fontWeight: 600 }}>FIN:</strong>{" "}
                              {row.fin}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: 11,
                                color: "rgba(0, 0, 0, 0.87)",
                                mb: 0.4,
                                lineHeight: 1.4,
                              }}
                            >
                              <strong style={{ fontWeight: 600 }}>MRN:</strong>{" "}
                              {row.mrn}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: 11,
                                color: "rgba(0, 0, 0, 0.87)",
                                lineHeight: 1.4,
                              }}
                            >
                              <strong style={{ fontWeight: 600 }}>DOB:</strong>{" "}
                              {row.dob}
                            </Typography>
                          </Box>
                        </Box>

                        {/* Admit & Authorization */}
                        <Box sx={{ flex: "0 0 105px" }}>
                          <Typography
                            variant="caption"
                            sx={{
                              color: "rgba(0, 0, 0, 0.4)",
                              fontSize: 9,
                              fontWeight: 600,
                              textTransform: "uppercase",
                              letterSpacing: "0.5px",
                            }}
                          >
                            ADMIT & AUTHORIZATION
                          </Typography>
                          <Box sx={{ mt: 0.8 }}>
                            <Typography
                              sx={{
                                fontSize: 11,
                                color: "rgba(0, 0, 0, 0.87)",
                                mb: 0.4,
                                lineHeight: 1.4,
                              }}
                            >
                              <strong style={{ fontWeight: 600 }}>DOA:</strong>{" "}
                              {row.doa}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: 11,
                                color: "rgba(0, 0, 0, 0.87)",
                                mb: 0.4,
                                lineHeight: 1.4,
                              }}
                            >
                              <strong style={{ fontWeight: 600 }}>
                                Referral#:
                              </strong>{" "}
                              {row.referral}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: 11,
                                color: "rgba(0, 0, 0, 0.87)",
                                mb: 0.4,
                                lineHeight: 1.4,
                              }}
                            >
                              <strong style={{ fontWeight: 600 }}>
                                Author:
                              </strong>{" "}
                              {row.author}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: 11,
                                color: "rgba(0, 0, 0, 0.87)",
                                lineHeight: 1.4,
                              }}
                            >
                              <strong style={{ fontWeight: 600 }}>
                                Subscriber ID:
                              </strong>{" "}
                              {row.subscriber}
                            </Typography>
                          </Box>
                        </Box>

                        {/* Audit & Authorization (CPT/ICD) */}
                        <Box sx={{ flex: "0 0 120px" }}>
                          <Typography
                            variant="caption"
                            sx={{
                              color: "rgba(0, 0, 0, 0.4)",
                              fontSize: 9,
                              fontWeight: 600,
                              textTransform: "uppercase",
                              letterSpacing: "0.5px",
                            }}
                          >
                            AUDIT & AUTHORIZATION
                          </Typography>
                          <Box sx={{ mt: 0.8 }}>
                            <Typography
                              sx={{
                                fontSize: 11,
                                color: "rgba(0, 0, 0, 0.87)",
                                mb: 0.4,
                                lineHeight: 1.4,
                              }}
                            >
                              <strong style={{ fontWeight: 600 }}>CPT:</strong>{" "}
                              {row.cpt2}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: 11,
                                color: "rgba(0, 0, 0, 0.87)",
                                mb: 0.4,
                                lineHeight: 1.4,
                              }}
                            >
                              <strong style={{ fontWeight: 600 }}>
                                Modifier:
                              </strong>{" "}
                              {row.modifier2}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: 11,
                                color: "rgba(0, 0, 0, 0.87)",
                                mb: 0.4,
                                lineHeight: 1.4,
                              }}
                            >
                              <strong style={{ fontWeight: 600 }}>ICD:</strong>{" "}
                              {row.icd2}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: 11,
                                color: "rgba(0, 0, 0, 0.87)",
                                lineHeight: 1.4,
                              }}
                            >
                              <strong style={{ fontWeight: 600 }}>
                                Place of Service:
                              </strong>{" "}
                              {row.placeOfService}
                            </Typography>
                          </Box>
                        </Box>

                        {/* Insurance & Payment Details */}
                        <Box sx={{ flex: "0 0 120px" }}>
                          <Typography
                            variant="caption"
                            sx={{
                              color: "rgba(0, 0, 0, 0.4)",
                              fontSize: 9,
                              fontWeight: 600,
                              textTransform: "uppercase",
                              letterSpacing: "0.5px",
                            }}
                          >
                            INSURANCE & PAYMENT DETAILS
                          </Typography>
                          <Box sx={{ mt: 0.8 }}>
                            <Typography
                              sx={{
                                fontSize: 11,
                                color: "rgba(0, 0, 0, 0.87)",
                                mb: 0.4,
                                lineHeight: 1.4,
                              }}
                            >
                              <strong style={{ fontWeight: 600 }}>
                                Insurance:
                              </strong>{" "}
                              {row.primaryInsurance}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: 11,
                                color: "rgba(0, 0, 0, 0.87)",
                                mb: 0.4,
                                lineHeight: 1.4,
                              }}
                            >
                              <strong style={{ fontWeight: 600 }}>Plan:</strong>{" "}
                              {row.plan}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: 11,
                                color: "rgba(0, 0, 0, 0.87)",
                                mb: 0.4,
                                lineHeight: 1.4,
                              }}
                            >
                              <strong style={{ fontWeight: 600 }}>
                                Billed amount:
                              </strong>{" "}
                              {row.billedAmount}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: 11,
                                color: "rgba(0, 0, 0, 0.87)",
                                lineHeight: 1.4,
                              }}
                            >
                              <strong style={{ fontWeight: 600 }}>
                                Patient payment:
                              </strong>{" "}
                              {row.patientPayment}
                            </Typography>
                          </Box>
                        </Box>

                        {/* Status & Remarks */}
                        <Box
                          sx={{ flex: "1 1 auto", minWidth: 0, maxWidth: 155 }}
                        >
                          <Typography
                            variant="caption"
                            sx={{
                              color: "rgba(0, 0, 0, 0.4)",
                              fontSize: 9,
                              fontWeight: 600,
                              textTransform: "uppercase",
                              letterSpacing: "0.5px",
                            }}
                          >
                            STATUS & REMARKS
                          </Typography>
                          <Box sx={{ mt: 0.8 }}>
                            <Chip
                              label={row.status}
                              size="small"
                              sx={{
                                backgroundColor: "#FFF3E0",
                                color: "#F57C00",
                                fontWeight: 600,
                                fontSize: 10,
                                height: 22,
                                mb: 0.8,
                              }}
                            />
                            <Typography
                              sx={{
                                fontSize: 11,
                                color: "rgba(0, 0, 0, 0.87)",
                                mb: 0.5,
                                lineHeight: 1.4,
                              }}
                            >
                              <strong style={{ fontWeight: 600 }}>
                                Remarks
                              </strong>
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: 10.5,
                                color: "rgba(0, 0, 0, 0.7)",
                                lineHeight: 1.5,
                              }}
                            >
                              {row.remarks}
                            </Typography>
                          </Box>
                        </Box>

                        {/* Edit Icon */}
                        <Box
                          sx={{
                            flex: "0 0 36px",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <IconButton
                            size="small"
                            sx={{ color: "#0066ff", mt: 0.5 }}
                          >
                            <EditIconClaim />
                          </IconButton>
                        </Box>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          )}
        </Box>
      )}

      {/* Post-billing Tab Content */}
      {currentTab === 1 && (
        <Box
          sx={{
            height: "calc(100vh - 160px)",
            overflowY: "auto",
            // Custom scrollbar styling - thin line style
            "&::-webkit-scrollbar": {
              width: "4px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#d1d5db",
              borderRadius: "2px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#9ca3af",
            },
          }}
        >
          {/* Info Banner for Post-billing */}
           <Box
          sx={{
            backgroundColor: "#EFF7FF",
            border: "1px solid #D5E3F2",
            p: "10px 12px",
            mx: 2,
            mt: 2,
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            minHeight: "52px",
            boxSizing: "border-box",
          }}
        >
          {/* Left Content */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              minWidth: 0,
              gap: "3px",
            }}
          >
            {/* Heading */}
            <Typography
              component="div"
              sx={{
                fontWeight: 700,
                color: "#0066FF",
                fontSize: "10px",
                lineHeight: 1.2,
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <Star />

              <span>CHARGE-CAPTURE ASSIST</span>
            </Typography>

            {/* Description */}
            <Typography
              component="div"
              sx={{
                color: "#374151",
                fontSize: "11px",
                lineHeight: 1.45,
                whiteSpace: "normal",
              }}
            >
              TiaStat auto-coded <strong>11 encounters</strong> from clinical
              notes. <strong>3 are clean and ready to bill</strong>; the rest
              have flagged edits (gender conflicts, missing etiology dx,
              cosmetic-vs-functional). Toggle Grid to see full problem/procedure
              detail without opening each record.
            </Typography>
          </Box>

          {/* View Details Button */}
          <Button
            variant="contained"
            size="small"
            sx={{
              textTransform: "none",
              backgroundColor: "#0066FF",
              color: "#fff",
              boxShadow: "none",
              fontSize: "11px",
              px: 2,
              py: 0,
              minWidth: "89px",
              height: "30px",
              fontWeight: 600,
              whiteSpace: "nowrap",
              flexShrink: 0,
              borderRadius: "6px",
              "&:hover": {
                backgroundColor: "#0066FF",
                boxShadow: "none",
              },
            }}
          >
            View details
          </Button>
        </Box>

          {/* Action Buttons Row */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: 2,
              py: 1.5,
              gap: 2,
              backgroundColor: "#f5f7fa",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 1,
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              <IconButton
                size="small"
                sx={{
                  width: 40,
                  height: 30,
                  border: "none",
                  borderRadius: "8px",
                  backgroundColor: "white",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  "&:hover": {
                    backgroundColor: "#f9fafb",
                  },
                }}
              >
                <SettingsIcon />
              </IconButton>
              <IconButton
                size="small"
                sx={{
                  width: 40,
                  height: 30,
                  border: "none",
                  borderRadius: "8px",
                  backgroundColor: "white",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  "&:hover": {
                    backgroundColor: "#f9fafb",
                  },
                }}
              >
                <DownloadIcon />
              </IconButton>
              <Button
                variant="outlined"
                endIcon={<KeyboardArrowDown sx={{ fontSize: 20 }} />}
                sx={{
                  textTransform: "none",
                  color: "#1f2937",
                  borderColor: "transparent",
                  backgroundColor: "white",
                  fontWeight: 500,
                  fontSize: 13,
                  height: 30,
                  px: 2,
                  minWidth: "auto",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  borderRadius: "8px",
                  "&:hover": {
                    borderColor: "transparent",
                    backgroundColor: "#f9fafb",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  },
                }}
                onClick={(e) => setAnchorEl(e.currentTarget)}
              >
                Select Action
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                sx={{
                  "& .MuiPaper-root": {
                    width: "320px !important",
                    minWidth: "320px !important",
                    maxWidth: "320px !important",
                  },
                }}
                PaperProps={{
                  sx: {
                    width: "320px !important",
                    minWidth: "320px !important",
                    maxWidth: "320px !important",
                    borderRadius: "6px",
                    border: "1px solid #d9dfe7",
                    boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
                    overflow: "hidden",
                    backgroundColor: "#fff",
                  },
                }}
                MenuListProps={{
                  disablePadding: true,
                }}
              >
                {/* Header */}
                <Box
                  sx={{
                    height: 34,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    px: 1.2,
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#374151",
                    }}
                  >
                    Select Actions
                  </Typography>

                  <IconButton
                    size="small"
                    onClick={() => setAnchorEl(null)}
                    sx={{
                      p: 0.2,
                      color: "#006FFD",
                      "&:hover": {
                        backgroundColor: "transparent",
                      },
                    }}
                  >
                    <Box
                      component="span"
                      sx={{
                        fontSize: 17,
                        fontWeight: 400,
                        lineHeight: 1,
                      }}
                    >
                      ✕
                    </Box>
                  </IconButton>
                </Box>

                {/* Actions */}
                <Box
                  sx={{
                    p: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 0.8,
                    
                  }}
                >
                  {/* Print Claim */}
                  <Box
                    onClick={() => setAnchorEl(null)}
                    sx={{
                      minHeight: 28,
                      px: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      border: "1px solid #e5e7eb",
                      borderRadius: "5px",
                      backgroundColor: "#f8f9fa",
                      cursor: "pointer",
                      color: "#006FFD",
                      fontSize: 10,
                      fontWeight: 600,
                      "&:hover": {
                        backgroundColor: "#eaf3ff",
                        borderColor: "#dbeafe",
                      },
                    }}
                  >
                    <span>Print Claim</span>
                    <span style={{ color: "#9CA3AF", fontSize: 10,fontWeight:500 }}>
                      Ctrl+P
                    </span>
                  </Box>

                  {/* Rebill */}
                  <Box
                    onClick={() => setAnchorEl(null)}
                    sx={{
                      minHeight: 28,
                      px: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      border: "1px solid #e5e7eb",
                      borderRadius: "5px",
                      backgroundColor: "#f8f9fa",
                      cursor: "pointer",
                      color: "#006FFD",
                      fontSize: 10,
                      fontWeight: 600,

                      "&:hover": {
                        backgroundColor: "#eaf3ff",
                        borderColor: "#dbeafe",
                      },
                    }}
                  >
                    <span>Rebill</span>

                    <span
                      style={{
                        color: "#9CA3AF",
                        fontSize: 10,fontWeight:500
                      }}
                    >
                      Ctrl+R
                    </span>
                  </Box>

                  {/* Transfer balance */}
                  <Box
                    onClick={() => setAnchorEl(null)}
                    sx={{
                      minHeight: 28,
                      px: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      border: "1px solid #e5e7eb",
                      borderRadius: "5px",
                      backgroundColor: "#f8f9fa",
                      cursor: "pointer",
                      color: "#006FFD",
                      fontSize: 10,
                      fontWeight: 600,
                      "&:hover": {
                        backgroundColor: "#eaf3ff",
                        borderColor: "#dbeafe",
                      },
                    }}
                  >
                    <span>Transfer balance</span>
                    <span style={{ color: "#9CA3AF", fontSize: 10,fontWeight:500 }}>
                      Ctrl+T
                    </span>
                  </Box>

                  {/* Transfer patient balance */}
                  <Box
                    onClick={() => setAnchorEl(null)}
                    sx={{
                      minHeight: 32,
                      px: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      border: "1px solid #e5e7eb",
                      borderRadius: "5px",
                      backgroundColor: "#f8f9fa",
                      cursor: "pointer",
                      color: "#006FFD",
                      fontSize: 10,
                      lineHeight: 1.15,
                      fontWeight: 600,
                      "&:hover": {
                        backgroundColor: "#eaf3ff",
                        borderColor: "#dbeafe",
                      },
                    }}
                  >
                    <Box sx={{ flex: 1 }}>
                      Transfer patient balance to
                      <br />
                      patient responsibility
                    </Box>

                    <span
                      style={{
                        color: "#9CA3AF",
                       fontSize: 10,
                        whiteSpace: "nowrap",
                        marginLeft: 8,fontWeight:500
                      }}
                    >
                      Ctrl+Shift+T
                    </span>
                  </Box>

                  {/* Note */}
                  <Box
                    onClick={() => setAnchorEl(null)}
                    sx={{
                      minHeight: 28,
                      px: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      border: "1px solid #e5e7eb",
                      borderRadius: "5px",
                      backgroundColor: "#f8f9fa",
                      cursor: "pointer",
                      color: "#006FFD",
                      fontSize: 10,
                      fontWeight: 600,
                      "&:hover": {
                        backgroundColor: "#eaf3ff",
                        borderColor: "#dbeafe",
                      },
                    }}
                  >
                    <span>Note</span>
                    <span style={{ color: "#9CA3AF", fontSize: 10 ,fontWeight:500}}>
                      Ctrl+N
                    </span>
                  </Box>

                  {/* Settle */}
                  <Box
                    onClick={() => setAnchorEl(null)}
                    sx={{
                      minHeight: 28,
                      px: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      border: "1px solid #e5e7eb",
                      borderRadius: "5px",
                      backgroundColor: "#f8f9fa",
                      cursor: "pointer",
                      color: "#006FFD",
                      fontSize: 10,
                      fontWeight: 600,
                      "&:hover": {
                        backgroundColor: "#eaf3ff",
                        borderColor: "#dbeafe",
                      },
                    }}
                  >
                    <span>Settle</span>
                    <span style={{ color: "#9CA3AF", fontSize: 10,fontWeight:500 }}>
                      Ctrl+S
                    </span>
                  </Box>

                  {/* Re-open */}
                  <Box
                    onClick={() => setAnchorEl(null)}
                    sx={{
                      minHeight: 28,
                      px: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      border: "1px solid #e5e7eb",
                      borderRadius: "5px",
                      backgroundColor: "#f8f9fa",
                      cursor: "pointer",
                      color: "#006FFD",
                      fontSize: 10,
                      fontWeight: 600,
                      "&:hover": {
                        backgroundColor: "#eaf3ff",
                        borderColor: "#dbeafe",
                      },
                    }}
                  >
                    <span>Re-open</span>
                    <span style={{ color: "#9CA3AF", fontSize: 10,fontWeight:500 }}>
                      Ctrl+Shift+R
                    </span>
                  </Box>

                  {/* Void */}
                  <Box
                    onClick={() => setAnchorEl(null)}
                    sx={{
                      minHeight: 28,
                      px: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      border: "1px solid #e5e7eb",
                      borderRadius: "5px",
                      backgroundColor: "#f8f9fa",
                      cursor: "pointer",
                      color: "#006FFD",
                      fontSize: 10,
                      fontWeight: 600,
                      "&:hover": {
                        backgroundColor: "#eaf3ff",
                        borderColor: "#dbeafe",
                      },
                    }}
                  >
                    <span>Void</span>
                    <span style={{ color: "#9CA3AF", fontSize: 10,fontWeight:500 }}>
                      Ctrl+O
                    </span>
                  </Box>

                  {/* Apply Payment */}
                  <Box
                    onClick={() => setAnchorEl(null)}
                    sx={{
                      minHeight: 28,
                      px: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      border: "1px solid #e5e7eb",
                      borderRadius: "5px",
                      backgroundColor: "#f8f9fa",
                      cursor: "pointer",
                      color: "#006FFD",
                      fontSize: 10,
                      fontWeight: 600,
                      "&:hover": {
                        backgroundColor: "#f5f9ff",
                      },
                    }}
                  >
                    <span>Apply Payment</span>
                    <span style={{ color: "#9CA3AF", fontSize: 10,fontWeight:500 }}>
                      Ctrl+Shift+A
                    </span>
                  </Box>

                  {/* Adjustment */}
                  <Box
                    onClick={() => setAnchorEl(null)}
                    sx={{
                      minHeight: 28,
                      px: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      border: "1px solid #e5e7eb",
                      borderRadius: "5px",
                      backgroundColor: "#f8f9fa",
                      cursor: "pointer",
                      color: "#006FFD",
                      fontSize: 10,
                      fontWeight: 600,
                      "&:hover": {
                        backgroundColor: "#f5f9ff",
                      },
                    }}
                  >
                    <span>Adjustment</span>
                    <span style={{ color: "#9CA3AF", fontSize: 10,fontWeight:500 }}>
                      Ctrl+J
                    </span>
                  </Box>

                  {/* Apply payment & adjust */}
                  <Box
                    onClick={() => setAnchorEl(null)}
                    sx={{
                      minHeight: 28,
                      px: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      border: "1px solid #e5e7eb",
                      borderRadius: "5px",
                      backgroundColor: "#f8f9fa",
                      cursor: "pointer",
                      color: "#006FFD",
                      fontSize: 10,
                      fontWeight: 600,
                      "&:hover": {
                        backgroundColor: "#f5f9ff",
                      },
                    }}
                  >
                    <span>Apply payment &amp; adjust</span>
                    <span style={{ color: "#9CA3AF", fontSize: 10,fontWeight:500}}>
                      Ctrl+Shift+J
                    </span>
                  </Box>

                  {/* Set follow-up date */}
                  <Box
                    onClick={() => setAnchorEl(null)}
                    sx={{
                      minHeight: 28,
                      px: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      border: "1px solid #e5e7eb",
                      borderRadius: "5px",
                      backgroundColor: "#f8f9fa",
                      cursor: "pointer",
                      color: "#006FFD",
                      fontSize: 10,
                      fontWeight: 600,
                      "&:hover": {
                        backgroundColor: "#f5f9ff",
                      },
                    }}
                  >
                    <span>Set follow-up date</span>
                    <span style={{ color: "#9CA3AF", fontSize: 10,fontWeight:500 }}>
                      Ctrl+Shift+F
                    </span>
                  </Box>
                </Box>
              </Menu>
              <Button
                variant="outlined"
                sx={{
                  textTransform: "none",
                  color: "#1f2937",
                  borderColor: "transparent",
                  backgroundColor: "white",
                  fontWeight: 500,
                  fontSize: 13,
                  height: 30,
                  px: 2,
                  whiteSpace: "nowrap",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  borderRadius: "8px",
                  "&:hover": {
                    borderColor: "transparent",
                    backgroundColor: "#f9fafb",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  },
                }}
              >
                Submit E-claim
              </Button>
              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                  backgroundColor: "#0066ff",
                  color: "white",
                  fontWeight: 600,
                  fontSize: 13,
                  height: 30,
                  px: 2.5,
                  whiteSpace: "nowrap",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                  borderRadius: "8px",
                  "&:hover": {
                    backgroundColor: "#0052cc",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                  },
                }}
              >
                Send Statement
              </Button>
            </Box>
          </Box>

          {/* Post-billing Table View */}
          <Box
            sx={{
              pb: 2,
              px: 2,
            }}
          >
            <TableContainer
              component={Paper}
              sx={{
                boxShadow: "none",
                border: "1px solid #e0e0e0",
                maxHeight: "calc(100vh - 280px)",
                overflowY: "auto",
                overflowX: "auto",
                // Custom scrollbar styling - thin line style
                "&::-webkit-scrollbar": {
                  width: "4px",
                  height: "4px",
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: "transparent",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#d1d5db",
                  borderRadius: "2px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  backgroundColor: "#9ca3af",
                },
              }}
            >
              <Table size="small" sx={{ minWidth: 1750 }}>
                <TableHead
                  sx={{
                    "& .MuiTableCell-root": {
                      fontWeight: 600,
                      fontSize: 11,
                      color: "#374151",
                      py: 2,
                      px: 0.35,
                      lineHeight: 1.05,
                      whiteSpace: "normal",
                      verticalAlign: "middle",
                    },
                  }}
                >
                  <TableRow sx={{ backgroundColor: "#fafafa" }}>
                    {/* Checkbox */}
                    <TableCell
                      padding="checkbox"
                      sx={{
                        width: 35,
                        py: 0.4,
                        px: 0.3,
                      }}
                    >
                      <Checkbox
                        size="small"
                        indeterminate={
                          selectedRows.length > 0 &&
                          selectedRows.length < filteredData.length
                        }
                        checked={
                          filteredData.length > 0 &&
                          selectedRows.length === filteredData.length
                        }
                        onChange={handleSelectAllClick}
                      />
                    </TableCell>

                    <TableCell sx={{ width: 55 }}>DOS</TableCell>

                    <TableCell sx={{ width: 85 }}>
                      Patient Name
                      <br />
                      (Gender)
                    </TableCell>

                    <TableCell sx={{ width: 55 }}>CPT</TableCell>

                    <TableCell sx={{ width: 65 }}>Modifier</TableCell>

                    <TableCell sx={{ width: 55 }}>ICD</TableCell>

                    <TableCell sx={{ width: 70 }}>Billed to</TableCell>

                    <TableCell sx={{ width: 65 }}>Billed</TableCell>

                    <TableCell sx={{ width: 75 }}>Adjustment</TableCell>

                    <TableCell sx={{ width: 90 }}>
                      Insurance
                      <br />
                      payment
                    </TableCell>

                    <TableCell sx={{ width: 85 }}>
                      Patient
                      <br />
                      Payment
                    </TableCell>

                    <TableCell sx={{ width: 70 }}>Billed as</TableCell>

                    <TableCell sx={{ width: 65 }}>Status</TableCell>

                    <TableCell sx={{ width: 95 }}>Clearing house #</TableCell>

                    <TableCell sx={{ width: 70 }}>First Billed</TableCell>

                    <TableCell sx={{ width: 90 }}>Encounter ID</TableCell>

                    <TableCell sx={{ width: 80 }}>Claim ID</TableCell>

                    <TableCell sx={{ width: 60 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredData.map((row, index) => {
                    const isItemSelected = isSelected(row.id);
                    const bgColor = getListColor(index);
                    return (
                      <TableRow
                        key={row.id}
                        selected={isItemSelected}
                        sx={{
                          backgroundColor: bgColor,
                          borderBottom: "none",
                        }}
                      >
                        <TableCell padding="checkbox" sx={{ py: 1.2 }}>
                          <Checkbox
                            size="small"
                            checked={isItemSelected}
                            onChange={() => handleRowSelect(row.id)}
                          />
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: 12,
                            py: 1.2,
                            color: "rgba(0, 0, 0, 0.87)",
                          }}
                        >
                          {row.dos}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: 12,
                            py: 1.2,
                            color: "rgba(0, 0, 0, 0.87)",
                          }}
                        >
                          {row.patientName} {row.gender}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: 12,
                            py: 1.2,
                            color: "rgba(0, 0, 0, 0.87)",
                          }}
                        >
                          {row.cpt}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: 12,
                            py: 1.2,
                            color: "rgba(0, 0, 0, 0.87)",
                          }}
                        >
                          {row.modifier}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: 12,
                            py: 1.2,
                            color: "rgba(0, 0, 0, 0.87)",
                          }}
                        >
                          {row.icd}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: 12,
                            py: 1.2,
                            color: "rgba(0, 0, 0, 0.87)",
                          }}
                        >
                          {row.billedTo}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: 12,
                            py: 1.2,
                            color: "rgba(0, 0, 0, 0.87)",
                          }}
                        >
                          {row.billed}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: 12,
                            py: 1.2,
                            color: "rgba(0, 0, 0, 0.87)",
                          }}
                        >
                          {row.adjustment}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: 12,
                            py: 1.2,
                            color: "rgba(0, 0, 0, 0.87)",
                          }}
                        >
                          {row.insurancePayment}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: 12,
                            py: 1.2,
                            color: "rgba(0, 0, 0, 0.87)",
                          }}
                        >
                          {row.patientPayment}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: 12,
                            py: 1.2,
                            color: "rgba(0, 0, 0, 0.87)",
                          }}
                        >
                          {row.billedAs}
                        </TableCell>
                        <TableCell sx={{ py: 1.2 }}>
                          <Chip
                            label={row.status}
                            size="small"
                            sx={{
                              backgroundColor: row.statusColor,
                              color: row.statusTextColor,
                              fontWeight: 600,
                              fontSize: 10,
                              height: 20,
                            }}
                          />
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: 12,
                            py: 1.2,
                            color: "rgba(0, 0, 0, 0.87)",
                          }}
                        >
                          {row.clearingHouse}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: 12,
                            py: 1.2,
                            color: "rgba(0, 0, 0, 0.87)",
                          }}
                        >
                          {row.firstBilled}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: 12,
                            py: 1.2,
                            color: "rgba(0, 0, 0, 0.87)",
                          }}
                        >
                          {row.encounterId}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: 12,
                            py: 1.2,
                            color: "rgba(0, 0, 0, 0.87)",
                          }}
                        >
                          {row.claimId}
                        </TableCell>
                        <TableCell sx={{ py: 1.2 }}>
                          <Box
                            sx={{
                              display: "flex",
                              gap: 0.5,
                              alignItems: "center",
                            }}
                          >
                            <Tooltip title="Edit" placement="top">
                              <IconButton 
                                size="small" 
                                sx={{ padding: "4px" }}
                                onClick={() => handleEditClick(row)}
                              >
                                <EditIconClaim />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="View list" placement="top">
                              <IconButton size="small" sx={{ padding: "4px" }}>
                                <Icon2 />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Clipboard" placement="top">
                              <IconButton size="small" sx={{ padding: "4px" }}>
                                <Icon3 />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Folder" placement="top">
                              <IconButton size="small" sx={{ padding: "4px" }}>
                                <Icon4 />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Document" placement="top">
                              <IconButton size="small" sx={{ padding: "4px" }}>
                                <Icon5 />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Check" placement="top">
                              <IconButton size="small" sx={{ padding: "4px" }}>
                                <Icon6 />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          {/* Adjustment Details Section */}
        <Box
  sx={{
    px: 2,
    pb: 2,
  }}
>
  <Box
    sx={{
      backgroundColor: "#FFFFFF",
      borderRadius: "12px",
      border: "1px solid #E5E7EB",
      p: 3,
    }}
  >
    {/* Section Title */}
    <Typography
      sx={{
        fontSize: 14,
        fontWeight: 600,
        color: "#374151",
        mb: 2,
      }}
    >
      Adjustment Details
    </Typography>

    {/* Grey Form Area */}
    <Box
      sx={{
        backgroundColor: "#F5F6FA",
        borderRadius: "10px",
        p: 2,
      }}
    >
      {/* First Row */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 2,
          mb: 2,
        }}
      >
        {/* Type */}
        <Box>
          <Typography
            sx={{
              fontSize: 11,
              fontWeight: 600,
              color: "#374151",
              mb: 0.7,
              whiteSpace: "nowrap",
            }}
          >
            Type
          </Typography>

          <FormControl fullWidth size="small">
            <Select
              displayEmpty
              value={adjType}
              onChange={(e) => setAdjType(e.target.value)}
              IconComponent={KeyboardArrowDown}
              sx={{
                fontSize: 12,
                borderRadius: "10px",
                backgroundColor: "#FFFFFF",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#D9DEE7",
                  borderRadius: "10px",
                },
                "& .MuiSelect-icon": {
                  color: "#555555",
                  fontSize: 18,
                  right: 7,
                },
              }}
            >
              <MenuItem value="" disabled>
                Select
              </MenuItem>
              <MenuItem value="adjustment1">
                Adjustment Type 1
              </MenuItem>
              <MenuItem value="adjustment2">
                Adjustment Type 2
              </MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Posting Date */}
        <Box>
          <Typography
            sx={{
              fontSize: 15,
              fontWeight: 600,
              color: "#374151",
              mb: 0.7,
              whiteSpace: "nowrap",
            }}
          >
            Posting Date
          </Typography>

          <TextField
            fullWidth
            size="small"
            type="date"
            value={adjPostingDate}
            onChange={(e) => setAdjPostingDate(e.target.value)}
            sx={{
              fontSize: 12,
              "& .MuiOutlinedInput-root": {
                fontSize: 12,
                borderRadius: "10px",
                backgroundColor: "#FFFFFF",
                "& fieldset": {
                  borderColor: "#D9DEE7",
                  borderRadius: "10px",
                },
                "& input::-webkit-calendar-picker-indicator": {
                  opacity: 1,
                  cursor: "pointer",
                  width: 16,
                  height: 16,
                  filter: "brightness(0)",
                },
              },
            }}
          />
        </Box>

        {/* Adjustment */}
        <Box>
          <Typography
            sx={{
              fontSize: 11,
              fontWeight: 600,
              color: "#374151",
              mb: 0.7,
              whiteSpace: "nowrap",
            }}
          >
            Adjustment
          </Typography>

          <TextField
            fullWidth
            size="small"
            placeholder="Type here"
            value={adjAdjustment}
            onChange={(e) => setAdjAdjustment(e.target.value)}
            sx={{
              fontSize: 12,
              "& .MuiOutlinedInput-root": {
                fontSize: 12,
                borderRadius: "10px",
                backgroundColor: "#FFFFFF",
                "& fieldset": {
                  borderColor: "#D9DEE7",
                  borderRadius: "10px",
                },
              },
            }}
          />
        </Box>

        {/* Adjustment Code */}
        <Box>
          <Typography
            sx={{
              fontSize: 11,
              fontWeight: 600,
              color: "#374151",
              mb: 0.7,
              whiteSpace: "nowrap",
            }}
          >
            Adjustment Code
          </Typography>

          <TextField
            fullWidth
            size="small"
            placeholder="Type here.."
            value={adjAdjustmentCode}
            onChange={(e) => setAdjAdjustmentCode(e.target.value)}
            sx={{
              fontSize: 12,
              "& .MuiOutlinedInput-root": {
                fontSize: 12,
                borderRadius: "10px",
                backgroundColor: "#FFFFFF",
                "& fieldset": {
                  borderColor: "#D9DEE7",
                  borderRadius: "10px",
                },
              },
            }}
          />
        </Box>
      </Box>

      {/* Second Row */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 2,
          mb: 2,
        }}
      >
        {/* Reason Code */}
        <Box>
          <Typography
            sx={{
              fontSize: 11,
              fontWeight: 600,
              color: "#374151",
              mb: 0.7,
              whiteSpace: "nowrap",
            }}
          >
            Reason Code
          </Typography>

          <FormControl fullWidth size="small">
            <Select
              displayEmpty
              value={adjReasonCode}
              onChange={(e) => setAdjReasonCode(e.target.value)}
              IconComponent={KeyboardArrowDown}
              sx={{
                fontSize: 12,
                borderRadius: "10px",
                backgroundColor: "#FFFFFF",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#D9DEE7",
                  borderRadius: "10px",
                },
                "& .MuiSelect-icon": {
                  color: "#555555",
                  fontSize: 18,
                  right: 7,
                },
              }}
            >
              <MenuItem value="" disabled>
                Select
              </MenuItem>
              <MenuItem value="reason1">
                Reason Code 1
              </MenuItem>
              <MenuItem value="reason2">
                Reason Code 2
              </MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Related Payment */}
        <Box>
          <Typography
            sx={{
              fontSize: 11,
              fontWeight: 600,
              color: "#374151",
              mb: 0.7,
              whiteSpace: "nowrap",
            }}
          >
            Related payment
          </Typography>

          <TextField
            fullWidth
            size="small"
            placeholder="Search"
            value={adjRelatedPayment}
            onChange={(e) => setAdjRelatedPayment(e.target.value)}
            sx={{
              fontSize: 12,
              "& .MuiOutlinedInput-root": {
                fontSize: 12,
                borderRadius: "10px",
                backgroundColor: "#FFFFFF",
                "& fieldset": {
                  borderColor: "#D9DEE7",
                  borderRadius: "10px",
                },
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Search
                    sx={{
                      fontSize: 16,
                      color: "#111827",
                    }}
                  />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Change Status */}
        <Box>
          <Typography
            sx={{
              fontSize: 11,
              fontWeight: 600,
              color: "#374151",
              mb: 0.7,
              whiteSpace: "nowrap",
            }}
          >
            Change status
          </Typography>

          <FormControl fullWidth size="small">
            <Select
              displayEmpty
              value={adjChangeStatus}
              onChange={(e) => setAdjChangeStatus(e.target.value)}
              IconComponent={KeyboardArrowDown}
              sx={{
                fontSize: 12,
                borderRadius: "10px",
                backgroundColor: "#FFFFFF",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#D9DEE7",
                  borderRadius: "10px",
                },
                "& .MuiSelect-icon": {
                  color: "#555555",
                  fontSize: 18,
                  right: 7,
                },
              }}
            >
              <MenuItem value="" disabled>
                Select
              </MenuItem>
              <MenuItem value="submitted">Submitted</MenuItem>
              <MenuItem value="ready">
                Ready for statement
              </MenuItem>
              <MenuItem value="settled">Settled</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Notes */}
        <Box>
          <Typography
            sx={{
              fontSize: 11,
              fontWeight: 600,
              color: "#374151",
              mb: 0.7,
              whiteSpace: "nowrap",
            }}
          >
            Notes
          </Typography>

          <TextField
            fullWidth
            size="small"
            type="date"
            value={adjNotes}
            onChange={(e) => setAdjNotes(e.target.value)}
            sx={{
              fontSize: 12,
              "& .MuiOutlinedInput-root": {
                fontSize: 12,
                borderRadius: "10px",
                backgroundColor: "#FFFFFF",
                "& fieldset": {
                  borderColor: "#D9DEE7",
                  borderRadius: "10px",
                },
                "& input::-webkit-calendar-picker-indicator": {
                  opacity: 1,
                  cursor: "pointer",
                  width: 16,
                  height: 16,
                  filter: "brightness(0)",
                },
              },
            }}
          />
        </Box>
      </Box>

      {/* Action Buttons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 1,
          mt: 1,
        }}
      >
        {/* Apply - FIRST */}
        <Button
          variant="contained"
          sx={{
            textTransform: "none",
            backgroundColor: "#0066FF",
            color: "#FFFFFF",
            fontWeight: 600,
            fontSize: 12,
            px: 2.5,
            py: 0.65,
            minWidth: 70,
            borderRadius: "8px",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "#0052CC",
              boxShadow: "none",
            },
          }}
        >
          Apply
        </Button>

        {/* Cancel - SECOND */}
        <Button
          variant="outlined"
          sx={{
            textTransform: "none",
            color: "#0066FF",
            borderColor: "#0066FF",
            fontWeight: 600,
            fontSize: 12,
            px: 2.5,
            py: 0.65,
            minWidth: 70,
            borderRadius: "8px",
            backgroundColor: "#FFFFFF",
            "&:hover": {
              borderColor: "#0052CC",
              backgroundColor: "#F5F9FF",
            },
          }}
        >
          Cancel
        </Button>
      </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      )}

      {/* Remittance ERA/EOB Tab Content */}
      {currentTab === 2 && !showEobDetails && (
        <Box>
          {/* Info Banner */}
          <Box
            sx={{
              backgroundColor: "#EFF7FF",
              border: "1px solid #D5E3F2",
              p: "10px 12px",
              mx: 2,
              mt: 2,
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
              minHeight: "52px",
              boxSizing: "border-box",
            }}
          >
            {/* Left Content */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                minWidth: 0,
                gap: "3px",
              }}
            >
              {/* Heading */}
              <Typography
                component="div"
                sx={{
                  fontWeight: 700,
                  color: "#0066FF",
                  fontSize: "10px",
                  lineHeight: 1.2,
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <Star />
                <span>CHARGE-CAPTURE ASSIST</span>
              </Typography>

              {/* Description */}
              <Typography
                component="div"
                sx={{
                  color: "#374151",
                  fontSize: "11px",
                  lineHeight: 1.45,
                  whiteSpace: "normal",
                }}
              >
                TiaStat auto-coded <strong>11 encounters</strong> from clinical
                notes. <strong>3 are clean and ready to bill</strong>; the rest
                have flagged edits (gender conflicts, missing etiology dx,
                cosmetic-vs-functional). Toggle Grid to see full problem/procedure
                detail without opening each record.
              </Typography>
            </Box>

            {/* View Details Button */}
            <Button
              variant="contained"
              size="small"
              sx={{
                textTransform: "none",
                backgroundColor: "#0066FF",
                color: "#fff",
                boxShadow: "none",
                fontSize: "11px",
                px: 2,
                py: 0,
                minWidth: "89px",
                height: "30px",
                fontWeight: 600,
                whiteSpace: "nowrap",
                flexShrink: 0,
                borderRadius: "6px",
                "&:hover": {
                  backgroundColor: "#0066FF",
                  boxShadow: "none",
                },
              }}
            >
              View details
            </Button>
          </Box>

          {/* Filter Chips */}
          <Box sx={{ display: "flex", gap: 1, px: 2, py: 1.5, alignItems: "center" }}>
            <Chip
              label="All 11"
              clickable
              onClick={() => setRemittanceFilter("all")}
              sx={{
                backgroundColor: remittanceFilter === "all" ? "#0066ff" : "white",
                color: remittanceFilter === "all" ? "white" : "rgba(0, 0, 0, 0.7)",
                fontWeight: remittanceFilter === "all" ? 600 : 500,
                fontSize: 11,
                height: 28,
                border: remittanceFilter === "all" ? "none" : "1px solid #e0e0e0",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: remittanceFilter === "all" ? "#0052cc" : "#f5f5f5",
                },
              }}
            />
            <Chip
              label="Not Posted 5"
              clickable
              onClick={() => setRemittanceFilter("notPosted")}
              sx={{
                backgroundColor: remittanceFilter === "notPosted" ? "#0066ff" : "white",
                color: remittanceFilter === "notPosted" ? "white" : "rgba(0, 0, 0, 0.7)",
                fontWeight: remittanceFilter === "notPosted" ? 600 : 500,
                fontSize: 11,
                height: 28,
                border: remittanceFilter === "notPosted" ? "none" : "1px solid #e0e0e0",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: remittanceFilter === "notPosted" ? "#0052cc" : "#f5f5f5",
                },
              }}
            />
            <Chip
              label="Partially posted 3"
              clickable
              onClick={() => setRemittanceFilter("partiallyPosted")}
              sx={{
                backgroundColor: remittanceFilter === "partiallyPosted" ? "#0066ff" : "white",
                color: remittanceFilter === "partiallyPosted" ? "white" : "rgba(0, 0, 0, 0.7)",
                fontWeight: remittanceFilter === "partiallyPosted" ? 600 : 500,
                fontSize: 11,
                height: 28,
                border: remittanceFilter === "partiallyPosted" ? "none" : "1px solid #e0e0e0",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: remittanceFilter === "partiallyPosted" ? "#0052cc" : "#f5f5f5",
                },
              }}
            />
            <Chip
              label="Fully posted 2"
              clickable
              onClick={() => setRemittanceFilter("fullyPosted")}
              sx={{
                backgroundColor: remittanceFilter === "fullyPosted" ? "#0066ff" : "white",
                color: remittanceFilter === "fullyPosted" ? "white" : "rgba(0, 0, 0, 0.7)",
                fontWeight: remittanceFilter === "fullyPosted" ? 600 : 500,
                fontSize: 11,
                height: 28,
                border: remittanceFilter === "fullyPosted" ? "none" : "1px solid #e0e0e0",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: remittanceFilter === "fullyPosted" ? "#0052cc" : "#f5f5f5",
                },
              }}
            />
            <Chip
              label="Mark as review 1"
              clickable
              onClick={() => setRemittanceFilter("markReview")}
              sx={{
                backgroundColor: remittanceFilter === "markReview" ? "#0066ff" : "white",
                color: remittanceFilter === "markReview" ? "white" : "rgba(0, 0, 0, 0.7)",
                fontWeight: remittanceFilter === "markReview" ? 600 : 500,
                fontSize: 11,
                height: 28,
                border: remittanceFilter === "markReview" ? "none" : "1px solid #e0e0e0",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: remittanceFilter === "markReview" ? "#0052cc" : "#f5f5f5",
                },
              }}
            />

            <Box sx={{ flex: 1 }} />

            {/* Action Buttons */}
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <IconButton
                size="small"
                sx={{
                  width: 40,
                  height: 30,
                  border: "none",
                  borderRadius: "8px",
                  backgroundColor: "white",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  "&:hover": {
                    backgroundColor: "#f9fafb",
                  },
                }}
              >
                <SettingsIcon />
              </IconButton>
              <IconButton
                size="small"
                sx={{
                  width: 40,
                  height: 30,
                  border: "none",
                  borderRadius: "8px",
                  backgroundColor: "white",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  "&:hover": {
                    backgroundColor: "#f9fafb",
                  },
                }}
              >
                <DownloadIcon />
              </IconButton>
              <Button
                variant="outlined"
                endIcon={<KeyboardArrowDown sx={{ fontSize: 20 }} />}
                sx={{
                  textTransform: "none",
                  color: "#1f2937",
                  borderColor: "transparent",
                  backgroundColor: "white",
                  fontWeight: 500,
                  fontSize: 13,
                  height: 30,
                  px: 2,
                  minWidth: "auto",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  borderRadius: "8px",
                  "&:hover": {
                    borderColor: "transparent",
                    backgroundColor: "#f9fafb",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  },
                }}
              >
                Select Action
              </Button>
              <Button
                variant="contained"
                onClick={() => navigate('/new-payment')}
                sx={{
                  textTransform: "none",
                  backgroundColor: "#0066ff",
                  color: "white",
                  fontWeight: 500,
                  fontSize: 13,
                  height: 30,
                  px: 2,
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: "#0052cc",
                    boxShadow: "none",
                  },
                }}
              >
                New Payment
              </Button>
            </Box>
          </Box>

          {/* Remittance Table */}
          <Box sx={{ pb: 2, px: 2 }}>
            <TableContainer
              component={Paper}
              sx={{
                boxShadow: "none",
                border: "1px solid #e0e0e0",
                maxHeight: "calc(100vh - 280px)",
                overflowY: "auto",
                overflowX: "auto",
                // Custom scrollbar styling - thin line style
                "&::-webkit-scrollbar": {
                  width: "4px",
                  height: "4px",
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: "transparent",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#d1d5db",
                  borderRadius: "2px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  backgroundColor: "#9ca3af",
                },
              }}
            >
              <Table size="small" sx={{ minWidth: 1600 }}>
                <TableHead
                  sx={{
                    "& .MuiTableCell-root": {
                      fontWeight: 600,
                      fontSize: 11,
                      color: "#374151",
                      py: 2,
                      px: 1.5,
                      lineHeight: 1.2,
                      whiteSpace: "nowrap",
                      verticalAlign: "middle",
                    },
                  }}
                >
                  <TableRow sx={{ backgroundColor: "#fafafa" }}>
                    <TableCell padding="checkbox" sx={{ width: 40, py: 0.8 }}>
                      <Checkbox size="small" />
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: 11, color: "rgba(0, 0, 0, 0.6)", py: 0.8 }}>
                      ID
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: 11, color: "rgba(0, 0, 0, 0.6)", py: 0.8 }}>
                      Location
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: 11, color: "rgba(0, 0, 0, 0.6)", py: 0.8 }}>
                      Provider
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: 11, color: "rgba(0, 0, 0, 0.6)", py: 0.8 }}>
                      Payer
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: 11, color: "rgba(0, 0, 0, 0.6)", py: 0.8 }}>
                      Payment Method
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: 11, color: "rgba(0, 0, 0, 0.6)", py: 0.8 }}>
                      Cheque #
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: 11, color: "rgba(0, 0, 0, 0.6)", py: 0.8 }}>
                      Amount
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: 11, color: "rgba(0, 0, 0, 0.6)", py: 0.8 }}>
                      Check Date
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: 11, color: "rgba(0, 0, 0, 0.6)", py: 0.8 }}>
                      Received Date
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: 11, color: "rgba(0, 0, 0, 0.6)", py: 0.8 }}>
                      Claim Numbers
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: 11, color: "rgba(0, 0, 0, 0.6)", py: 0.8 }}>
                      Unposted Amount
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: 11, color: "rgba(0, 0, 0, 0.6)", py: 0.8 }}>
                      Status
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: 11, py: 0.8, color: "rgba(0, 0, 0, 0.6)" }}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {remittanceData
                    .filter((row) => {
                      if (remittanceFilter === "all") return true;
                      if (remittanceFilter === "notPosted")
                        return row.status === "Not Posted";
                      if (remittanceFilter === "partiallyPosted")
                        return row.status === "Partially posted";
                      if (remittanceFilter === "fullyPosted")
                        return row.status === "Fully posted";
                      if (remittanceFilter === "markReview")
                        return row.status === "Mark as review";
                      return true;
                    })
                    .map((row, index) => {
                      const bgColor = getListColor(index);
                      return (
                        <TableRow
                          key={row.id}
                          sx={{
                            backgroundColor: bgColor,
                            borderBottom: "none",
                          }}
                        >
                          <TableCell padding="checkbox" sx={{ py: 1.2 }}>
                            <Checkbox size="small" />
                          </TableCell>
                          <TableCell sx={{ fontSize: 12, py: 1.2, color: "rgba(0, 0, 0, 0.87)" }}>
                            {row.remittanceId}
                          </TableCell>
                          <TableCell sx={{ fontSize: 12, py: 1.2, color: "rgba(0, 0, 0, 0.87)" }}>
                            {row.location}
                          </TableCell>
                          <TableCell sx={{ fontSize: 12, py: 1.2, color: "rgba(0, 0, 0, 0.87)" }}>
                            {row.provider}
                          </TableCell>
                          <TableCell sx={{ fontSize: 12, py: 1.2, color: "rgba(0, 0, 0, 0.87)" }}>
                            {row.payer}
                          </TableCell>
                          <TableCell sx={{ fontSize: 12, py: 1.2, color: "rgba(0, 0, 0, 0.87)" }}>
                            {row.paymentMethod}
                          </TableCell>
                          <TableCell sx={{ fontSize: 12, py: 1.2, color: "rgba(0, 0, 0, 0.87)" }}>
                            {row.chequeNumber}
                          </TableCell>
                          <TableCell sx={{ fontSize: 12, py: 1.2, color: "rgba(0, 0, 0, 0.87)" }}>
                            {row.amount}
                          </TableCell>
                          <TableCell sx={{ fontSize: 12, py: 1.2, color: "rgba(0, 0, 0, 0.87)" }}>
                            {row.checkDate}
                          </TableCell>
                          <TableCell sx={{ fontSize: 12, py: 1.2, color: "rgba(0, 0, 0, 0.87)" }}>
                            {row.receivedDate}
                          </TableCell>
                          <TableCell sx={{ fontSize: 12, py: 1.2, color: "rgba(0, 0, 0, 0.87)" }}>
                            {row.claimNumbers}
                          </TableCell>
                          <TableCell sx={{ fontSize: 12, py: 1.2, color: "rgba(0, 0, 0, 0.87)" }}>
                            {row.unpostedAmount}
                          </TableCell>
                          <TableCell sx={{ py: 1.2 }}>
                            <Chip
                              label={row.status}
                              size="small"
                              sx={{
                                backgroundColor: row.statusColor,
                                color: row.statusTextColor,
                                fontWeight: 600,
                                fontSize: 10,
                                height: 20,
                              }}
                            />
                          </TableCell>
                          <TableCell sx={{ py: 1.2 }}>
                            <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
                              <Tooltip title="Refresh/Sync" placement="top">
                                <IconButton
                                  size="small"
                                  onClick={() => handleShowEobDetails(row)}
                                  sx={{ padding: "2px" }}
                                >
                                  <RefreshIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="View" placement="top">
                                <IconButton size="small" sx={{ padding: "4px" }}>
                                  <ViewIconRemittance />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Download" placement="top">
                                <IconButton size="small" sx={{ padding: "4px" }}>
                                  <DownloadIconRemittance />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      )}

      {/* EOB/ERA Details - Full Page View with Claim Details */}
  {showEobDetails && selectedEobClaim && currentTab === 2 && (
  <Box
    sx={{
      height: "calc(100vh - 82px)",
      backgroundColor: "#F5F7FA",
      overflowY: "auto",
      px: 1.5,
      py: 1.5,

      "&::-webkit-scrollbar": {
        width: "4px",
      },

      "&::-webkit-scrollbar-track": {
        backgroundColor: "transparent",
      },

      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#D1D5DB",
        borderRadius: "4px",
      },
    }}
  >
    {/* ===================================================== */}
    {/* HEADER */}
    {/* ===================================================== */}

    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mb: 1.5,
        minHeight: 48,
      }}
    >
      {/* Patient Information */}
      <Box>
        <Typography
          sx={{
            fontSize: 18,
            fontWeight: 700,
            color: "#1F2937",
            lineHeight: 1.2,
          }}
        >
          Marian, Kalki P (3664)
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            mt: 0.6,
          }}
        >
          <Typography
            sx={{
              fontSize: 11,
              color: "#6B7280",
            }}
          >
            Claim <b>6178</b>
          </Typography>

          <Typography
            sx={{
              fontSize: 11,
              color: "#6B7280",
            }}
          >
            Encounter <b>3501</b>
          </Typography>

          <Typography
            sx={{
              fontSize: 11,
              color: "#6B7280",
            }}
          >
            <b>Born</b> 15 Apr 1958
          </Typography>

          <Typography
            sx={{
              fontSize: 11,
              color: "#6B7280",
            }}
          >
            <b>Patient</b> 2885
          </Typography>
        </Box>
      </Box>

      {/* Header Buttons */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.75,
        }}
      >
        <Button
          variant="outlined"
          size="small"
          startIcon={
            <ArrowBackIosNew
              sx={{
                fontSize: "11px !important",
              }}
            />
          }
          sx={{
            height: 32,
            minWidth: 105,
            px: 1.5,
            textTransform: "none",
            borderColor: "#E5E7EB",
            color: "#374151",
            fontSize: 12,
            borderRadius: "7px",
            backgroundColor: "#FFFFFF",
            boxShadow: "none",
          }}
        >
          Previous claim
        </Button>

        <Button
          variant="outlined"
          size="small"
          endIcon={
            <ArrowForwardIos
              sx={{
                fontSize: "11px !important",
              }}
            />
          }
          sx={{
            height: 32,
            minWidth: 92,
            px: 1.5,
            textTransform: "none",
            borderColor: "#E5E7EB",
            color: "#374151",
            fontSize: 12,
            borderRadius: "7px",
            backgroundColor: "#FFFFFF",
            boxShadow: "none",
          }}
        >
          Next claim
        </Button>

        <Button
          variant="outlined"
          size="small"
          onClick={handleCloseEobDetails}
          sx={{
            height: 32,
            minWidth: 58,
            px: 1.5,
            textTransform: "none",
            borderColor: "#E5E7EB",
            color: "#374151",
            fontSize: 12,
            borderRadius: "7px",
            backgroundColor: "#FFFFFF",
          }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          size="small"
          sx={{
            height: 32,
            minWidth: 48,
            px: 1.5,
            textTransform: "none",
            backgroundColor: "#0066FF",
            fontSize: 12,
            fontWeight: 600,
            borderRadius: "7px",
            boxShadow: "none",

            "&:hover": {
              backgroundColor: "#0052CC",
              boxShadow: "none",
            },
          }}
        >
          Apply
        </Button>
      </Box>
    </Box>

    {/* ===================================================== */}
    {/* MAIN TWO COLUMN LAYOUT */}
    {/* ===================================================== */}

    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
        gap: 1.5,
        alignItems: "start",
      }}
    >
      {/* ===================================================== */}
      {/* LEFT COLUMN */}
      {/* ===================================================== */}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
        }}
      >
        {/* ================================================= */}
        {/* CARD 1 - CLAIM DETAILS */}
        {/* ================================================= */}

        <Box
          sx={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E5E7EB",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          {/* Card Header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 1.5,
              py: 1.25,
              borderBottom: "1px solid #E5E7EB",
            }}
          >
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 700,
                color: "#1F2937",
              }}
            >
              Claim Details
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.75,
              }}
            >
              <Switch
                size="small"
                sx={{
                  width: 32,
                  height: 20,
                  p: 0,

                  "& .MuiSwitch-switchBase": {
                    p: 0.3,
                  },

                  "& .MuiSwitch-thumb": {
                    width: 13,
                    height: 13,
                  },

                  "& .MuiSwitch-track": {
                    borderRadius: 10,
                    backgroundColor: "#D1D5DB",
                    opacity: 1,
                  },
                }}
              />

              <Typography
                sx={{
                  fontSize: 11,
                  color: "#6B7280",
                }}
              >
                Show applied
              </Typography>

              <Button
                size="small"
                startIcon={
                  <Add
                    sx={{
                      fontSize: "16px !important",
                    }}
                  />
                }
                sx={{
                  minWidth: "auto",
                  ml: 0.5,
                  p: 0,
                  textTransform: "none",
                  color: "#0066FF",
                  fontSize: 11,
                }}
              >
                Add New
              </Button>
            </Box>
          </Box>

          {/* Claim Details Table */}
          <TableContainer>
            <Table
              size="small"
              sx={{
                tableLayout: "fixed",
              }}
            >
              <TableHead>
                <TableRow
                  sx={{
                    backgroundColor: "#F9FAFB",
                  }}
                >
                  <TableCell
                    padding="checkbox"
                    sx={{
                      width: 30,
                      py: 0.7,
                      borderBottom: "1px solid #E5E7EB",
                    }}
                  />

                  {[
                    "DOS",
                    "Location",
                    "CPT",
                    "Claim#",
                    "ICN",
                    "Status",
                  ].map((header) => (
                    <TableCell
                      key={header}
                      sx={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: "#374151",
                        py: 1,
                        px: 0.8,
                        whiteSpace: "nowrap",
                        borderBottom: "1px solid #E5E7EB",
                        lineHeight: 1.1,
                      }}
                    >
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {[1, 2].map((row, index) => (
                  <TableRow
                    key={row}
                    sx={{
                      backgroundColor:
                        index === 1 ? "#EEF4FF" : "#FFFFFF",
                      borderBottom: "none",
                    }}
                  >
                    <TableCell
                      padding="checkbox"
                      sx={{
                        py: 1.2,
                      }}
                    >
                      <Checkbox
                        size="small"
                        defaultChecked={index === 1}
                        sx={{
                          p: 0.25,
                        }}
                      />
                    </TableCell>

                    <TableCell
                      sx={{
                        fontSize: 12,
                        py: 1.2,
                        px: 0.8,
                        color: "rgba(0, 0, 0, 0.87)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      08/21/26
                    </TableCell>

                    <TableCell
                      sx={{
                        fontSize: 12,
                        py: 1.2,
                        px: 0.8,
                        color: "rgba(0, 0, 0, 0.87)",
                      }}
                    >
                      TU-RL
                    </TableCell>

                    <TableCell
                      sx={{
                        fontSize: 12,
                        py: 1.2,
                        px: 0.8,
                        color: "rgba(0, 0, 0, 0.87)",
                      }}
                    >
                      11980
                    </TableCell>

                    <TableCell
                      sx={{
                        fontSize: 12,
                        py: 1.2,
                        px: 0.8,
                        color: "rgba(0, 0, 0, 0.87)",
                      }}
                    >
                      PRSH6002
                    </TableCell>

                    <TableCell
                      sx={{
                        fontSize: 12,
                        py: 1.2,
                        px: 0.8,
                        color: "rgba(0, 0, 0, 0.87)",
                        wordBreak: "break-all",
                      }}
                    >
                      202608211142023
                    </TableCell>

                    <TableCell
                      sx={{
                        py: 1.2,
                        px: 0.8,
                      }}
                    >
                      <Chip
                        label="Primary, Forwarded"
                        size="small"
                        sx={{
                          height: 22,
                          backgroundColor:
                            index === 1
                              ? "#0066FF"
                              : "#EFF6FF",
                          color:
                            index === 1
                              ? "#FFFFFF"
                              : "#0066FF",
                          fontSize: 10,
                          fontWeight: 600,
                          borderRadius: "4px",

                          "& .MuiChip-label": {
                            px: 0.8,
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

        {/* ================================================= */}
        {/* CARD 2 - POSTING DATA */}
        {/* ================================================= */}

      <Box
  sx={{
    backgroundColor: "#FFFFFF",
    border: "1px solid #E5E7EB",
    borderRadius: "10px",
    overflow: "hidden",
    width: "100%",
  }}
>
  {/* ================= POSTING DATA HEADER ================= */}
  <Box
    sx={{
      px: 1.2,
      py: 1,
      borderBottom: "1px solid #E5E7EB",
    }}
  >
    <Typography
      sx={{
        fontSize: 12,
        fontWeight: 600,
        color: "#1F2937",
        lineHeight: 1.2,
      }}
    >
      Posting Data
    </Typography>
  </Box>

  {/* ================= POSTING DATA BODY ================= */}
  <Box
    sx={{
      px: 1.2,
      py: 1.15,

      /* ================= INPUT / SELECT ================= */
      "& .MuiInputBase-root": {
        height: 29,
        minHeight: 29,
        fontSize: 12,
        borderRadius: "6px",
        backgroundColor: "#F1F3F7",
      },

      "& .MuiOutlinedInput-root": {
        height: 29,
        minHeight: 29,
        borderRadius: "6px",
        backgroundColor: "#F1F3F7",
      },

      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#E5E7EB",
      },

      "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "#D7DBE2",
      },

      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
        {
          borderColor: "#0066FF",
        },

      /* ================= INPUT TEXT ================= */
      "& .MuiOutlinedInput-input": {
        fontSize: 12,
        color: "#6B7280",
        padding: "5px 9px",
      },

      /* ================= SELECT TEXT ================= */
      "& .MuiSelect-select": {
        fontSize: 12,
        color: "#6B7280",
        padding: "5px 30px 5px 9px !important",
        minHeight: "unset !important",
        backgroundColor: "#F1F3F7",
        display: "flex",
        alignItems: "center",
      },

      /* ================= BLUE DROPDOWN ARROWS ================= */
      "& .MuiSelect-icon": {
        color: "#0066FF",
        fontSize: 18,
        right: 7,
      },

      "& .MuiSelect-iconOutlined": {
        color: "#0066FF",
      },

      /* ================= LABEL ================= */
      "& .MuiInputLabel-root": {
        fontSize: 11,
        color: "#6B7280",
      },

      /* ================= DISABLED FIELDS ================= */
      "& .MuiInputBase-root.Mui-disabled": {
        backgroundColor: "#E9EBF0",
      },

      "& .MuiInputBase-root.Mui-disabled input": {
        color: "#8A8F98",
        WebkitTextFillColor: "#8A8F98",
      },

      "& .MuiInputBase-root.Mui-disabled .MuiSelect-select": {
        color: "#8A8F98",
        WebkitTextFillColor: "#8A8F98",
      },

      /* ================= CALENDAR / OTHER ICON ================= */
      "& .MuiInputAdornment-root svg": {
        fontSize: 16,
      },

      /* ================= SELECT ARROW HOVER ================= */
      "& .MuiSelect-root:hover .MuiSelect-icon": {
        color: "#0052CC",
      },
    }}
  >
    {/* ===================================================== */}
    {/* ROW 1 */}
    {/* ===================================================== */}

    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        columnGap: 1.5,
        mb: 1.15,
      }}
    >
      <ClaimField
        label="Posting Date"
        value="09/13/2026"
        calendar
      />

      <ClaimSelect
        label="Payer sequence"
        value="Primary"
      />

      <ClaimSelect
        label="Payer"
        value="6734759 - ICI"
      />
    </Box>

    {/* ===================================================== */}
    {/* ROW 2 */}
    {/* ===================================================== */}

    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        columnGap: 1.5,
        mb: 1.15,
      }}
    >
      <ClaimField
        label="Allowed"
        value="$73.13"
      />

      <ClaimField
        label="Paid"
        value="$26.4"
      />

      <ClaimField
        label="Contract Adj."
        value="$43.22"
        disabled
      />
    </Box>

    {/* ===================================================== */}
    {/* ROW 3 */}
    {/* ===================================================== */}

    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        columnGap: 1.5,
        mb: 1.15,
      }}
    >
      <ClaimField
        label="Adj. Code"
        value="CO-45, CO-253, C..."
      />

      <ClaimField
        label="Second Adj."
        value="$113.52"
        disabled
      />

      <ClaimSelect
        label="Adj. Code"
        value="OA-9"
      />
    </Box>

    {/* ===================================================== */}
    {/* ROW 4 */}
    {/* ===================================================== */}

    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        columnGap: 1.5,
        mb: 1.15,
      }}
    >
      <ClaimField
        label="Coinsurance"
        value="$15.49"
        disabled
      />

      <ClaimField
        label="Copay"
        value="$21.37"
        disabled
      />

      <ClaimField
        label="Deductible"
        value="$0"
        disabled
      />
    </Box>

    {/* ===================================================== */}
    {/* ROW 5 */}
    {/* ===================================================== */}

    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        columnGap: 1.5,
        mb: 1.15,
      }}
    >
      <ClaimField
        label="Other PR Codes"
        value="-"
        disabled
      />

      <ClaimField
        label="Other PR Amount"
        value="$0"
        disabled
      />

      <ClaimSelect
        label="Payment Method"
        value="EFT"
      />
    </Box>

    {/* ===================================================== */}
    {/* ROW 6 */}
    {/* ===================================================== */}

    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        columnGap: 1.5,
        mb: 1.15,
      }}
    >
      <ClaimSelect
        label="Actions"
        value="Settle"
      />

      <ClaimField
        label="Remarks"
        value="Lorem ipsum dum..."
      />

      <ClaimField
        label="Prov. Adj."
        value="-"
      />
    </Box>

    {/* ===================================================== */}
    {/* ROW 7 */}
    {/* ===================================================== */}

    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        columnGap: 1.5,
      }}
    >
      <ClaimSelect
        label="Denial Category"
        value="NA"
      />

      <ClaimField
        label="Balance"
        value="$0"
      />

      <Box />
    </Box>
  </Box>
</Box>
      </Box>

      {/* ===================================================== */}
      {/* RIGHT COLUMN */}
      {/* ===================================================== */}

      {/* ===================================================== */}
{/* RIGHT COLUMN - EOB / ERA */}
{/* ===================================================== */}

<Box
  sx={{
    display: "flex",
    flexDirection: "column",
    gap: 1.5,
  }}
>
  {/* ================================================= */}
  {/* CARD 3 - EOB / ERA DETAILS */}
  {/* ================================================= */}

  <Box
    sx={{
      backgroundColor: "#FFFFFF",
      border: "1px solid #E5E7EB",
      borderRadius: "10px",
      overflow: "hidden",
      width: "100%",
    }}
  >
    <Box
      sx={{
        px: 1.5,
        py: 1.5,
      }}
    >
      {/* Title */}
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 600,
          color: "#1F2937",
          lineHeight: 1.2,
          mb: 1.2,
        }}
      >
        EOB/ERA Details
      </Typography>

      {/* Fields + View File in SAME ROW */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr auto",
          gap: 1.25,
          alignItems: "end",
          width: "100%",
        }}
      >
        {/* Note */}
        <Box>
          <Typography
            sx={{
              fontSize: 11,
              color: "#6B7280",
              mb: 0.55,
              lineHeight: 1.2,
            }}
          >
            Note
          </Typography>

          <TextField
            fullWidth
            size="small"
            placeholder="Type here"
            sx={{
              "& .MuiOutlinedInput-root": {
                height: 34,
                borderRadius: "6px",
                backgroundColor: "#FFFFFF",
              },

              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#E5E7EB",
              },

              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#D1D5DB",
              },

              "& .MuiInputBase-input": {
                fontSize: 12,
                color: "#374151",
                py: 0,
              },

              "& .MuiInputBase-input::placeholder": {
                fontSize: 12,
                color: "#9CA3AF",
                opacity: 1,
              },
            }}
          />
        </Box>

        {/* Reference Number */}
        <Box>
          <Typography
            sx={{
              fontSize: 11,
              color: "#6B7280",
              mb: 0.55,
              lineHeight: 1.2,
            }}
          >
            Reference number
          </Typography>

          <Box
            sx={{
              height: 34,
              display: "flex",
              alignItems: "center",
              px: 1.2,
              border: "1px solid #E5E7EB",
              borderRadius: "6px",
              backgroundColor: "#FFFFFF",
              fontSize: 12,
              fontWeight: 600,
              color: "#374151",
              boxSizing: "border-box",
            }}
          >
            150219802000
          </Box>
        </Box>

        {/* ERA Balance */}
        <Box>
          <Typography
            sx={{
              fontSize: 11,
              color: "#6B7280",
              mb: 0.55,
              lineHeight: 1.2,
            }}
          >
            ERA Balance
          </Typography>

          <Box
            sx={{
              height: 34,
              display: "flex",
              alignItems: "center",
              px: 1.2,
              border: "1px solid #E5E7EB",
              borderRadius: "6px",
              backgroundColor: "#FFFFFF",
              fontSize: 12,
              fontWeight: 600,
              color: "#374151",
              boxSizing: "border-box",
            }}
          >
            $0
          </Box>
        </Box>

        {/* View File */}
        <Button
          variant="contained"
          size="small"
          sx={{
            height: 34,
            minWidth: 68,
            px: 1.5,
            mb: 0,
            textTransform: "none",
            backgroundColor: "#0066FF",
            color: "#FFFFFF",
            fontSize: 11,
            fontWeight: 600,
            borderRadius: "7px",
            boxShadow: "none",
            whiteSpace: "nowrap",

            "&:hover": {
              backgroundColor: "#0052CC",
              boxShadow: "none",
            },
          }}
        >
          View File
        </Button>
      </Box>
    </Box>
  </Box>

  {/* ================================================= */}
  {/* CARD 4 - TRANSACTION TABLE */}
  {/* ================================================= */}

  <Box
    sx={{
      backgroundColor: "#FFFFFF",
      border: "1px solid #E5E7EB",
      borderRadius: "10px",
      overflow: "hidden",
      width: "100%",
    }}
  >
    <TableContainer
      sx={{
        width: "100%",
        maxHeight: "calc(100vh - 245px)",
        overflowY: "auto",
        overflowX: "hidden",

        "&::-webkit-scrollbar": {
          width: "4px",
        },

        "&::-webkit-scrollbar-track": {
          backgroundColor: "transparent",
        },

        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#D1D5DB",
          borderRadius: "4px",
        },

        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "#9CA3AF",
        },
      }}
    >
      <Table
        size="small"
        stickyHeader
        sx={{
          tableLayout: "fixed",
          width: "100%",
        }}
      >
        {/* ================= TABLE HEADER ================= */}
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                width: "14%",
                fontSize: 11,
                fontWeight: 600,
                color: "#374151",
                py: 1.15,
                px: 1,
                backgroundColor: "#F1F3FF",
                borderBottom: "1px solid #E5E7EB",
                whiteSpace: "nowrap",
              }}
            >
              Date
            </TableCell>

            <TableCell
              sx={{
                width: "39%",
                fontSize: 11,
                fontWeight: 600,
                color: "#374151",
                py: 1.15,
                px: 1,
                backgroundColor: "#F1F3FF",
                borderBottom: "1px solid #E5E7EB",
              }}
            >
              Transaction
            </TableCell>

            <TableCell
              sx={{
                width: "15%",
                fontSize: 11,
                fontWeight: 600,
                color: "#374151",
                py: 1.15,
                px: 1,
                textAlign: "right",
                backgroundColor: "#F1F3FF",
                borderBottom: "1px solid #E5E7EB",
                whiteSpace: "nowrap",
              }}
            >
              Amount
            </TableCell>

            <TableCell
              sx={{
                width: "15%",
                fontSize: 11,
                fontWeight: 600,
                color: "#374151",
                py: 1.15,
                px: 1,
                textAlign: "right",
                backgroundColor: "#F1F3FF",
                borderBottom: "1px solid #E5E7EB",
                whiteSpace: "nowrap",
              }}
            >
              Pat Resp.
            </TableCell>

            <TableCell
              sx={{
                width: "17%",
                fontSize: 11,
                fontWeight: 600,
                color: "#374151",
                py: 1.15,
                px: 1,
                textAlign: "right",
                backgroundColor: "#F1F3FF",
                borderBottom: "1px solid #E5E7EB",
                whiteSpace: "nowrap",
              }}
            >
              Total Balance
            </TableCell>
          </TableRow>
        </TableHead>

        {/* ================= TABLE BODY ================= */}
        <TableBody>
          {[
            {
              date: "26 Aug 26",
              type: "Claim created and added to Queue",
              amount: "$550.14",
              patResp: "$550.14",
              balance: "$550.14",
            },
            {
              date: "26 Aug 26",
              type: "Claim submitted to Payer - ICIC, $150",
              amount: "-",
              patResp: "$0.00",
              balance: "$550.14",
            },
            {
              date: "26 Aug 26",
              type: "Payer Settlement EFT/Check #: 150219802000/0906",
              amount: "$0.00",
              patResp: "$0.00",
              balance: "$550.14",
            },
            {
              date: "26 Aug 26",
              type: "Patient Responsibility - PR-1: $3.96, PR-2: $15.36, PR-3: $13.52.",
              amount: "$0.00",
              patResp: "$0.00",
              balance: "$550.14",
            },
            {
              date: "26 Aug 26",
              type: "Transferred to Insurance responsibility (Action: None, Status: E-submit to secondary)",
              amount: "$0.00",
              patResp: "$0.00",
              balance: "$550.14",
            },
            {
              date: "26 Aug 26",
              type: "Patient Responsibility - PR-1: $3.96, PR-2: $15.36, PR-3: $13.52.",
              amount: "$0.00",
              patResp: "$0.00",
              balance: "$550.14",
            },
            {
              date: "26 Aug 26",
              type: "Transferred to Insurance responsibility (Action: None, Status: E-submit to secondary)",
              amount: "$0.00",
              patResp: "$0.00",
              balance: "$550.14",
            },
            {
              date: "26 Aug 26",
              type: "Patient Responsibility - PR-1: $3.96, PR-2: $15.36, PR-3: $13.52.",
              amount: "$0.00",
              patResp: "$0.00",
              balance: "$550.14",
            },
          ].map((transaction, idx) => (
            <TableRow
              key={idx}
              sx={{
                backgroundColor:
                  idx % 2 === 0 ? "#FFFFFF" : "#F5F7FF",

                "&:last-child td": {
                  borderBottom: 0,
                },
              }}
            >
              {/* Date */}
              <TableCell
                sx={{
                  fontSize: 12,
                  py: 1.25,
                  px: 1,
                  color: "#374151",
                  verticalAlign: "top",
                  whiteSpace: "nowrap",
                  borderBottom: "1px solid #E5E7EB",
                }}
              >
                {transaction.date}
              </TableCell>

              {/* Transaction */}
              <TableCell
                sx={{
                  fontSize: 12,
                  py: 1.25,
                  px: 1,
                  color: "#4B5563",
                  verticalAlign: "top",
                  lineHeight: 1.4,
                  wordBreak: "break-word",
                  borderBottom: "1px solid #E5E7EB",
                }}
              >
                {transaction.type}
              </TableCell>

              {/* Amount */}
              <TableCell
                sx={{
                  fontSize: 12,
                  py: 1.25,
                  px: 1,
                  color: "#374151",
                  textAlign: "right",
                  verticalAlign: "top",
                  whiteSpace: "nowrap",
                  borderBottom: "1px solid #E5E7EB",
                }}
              >
                {transaction.amount}
              </TableCell>

              {/* Patient Responsibility */}
              <TableCell
                sx={{
                  fontSize: 12,
                  py: 1.25,
                  px: 1,
                  color: "#374151",
                  textAlign: "right",
                  verticalAlign: "top",
                  whiteSpace: "nowrap",
                  borderBottom: "1px solid #E5E7EB",
                }}
              >
                {transaction.patResp}
              </TableCell>

              {/* Total Balance */}
              <TableCell
                sx={{
                  fontSize: 12,
                  py: 1.25,
                  px: 1,
                  color: "#374151",
                  textAlign: "right",
                  verticalAlign: "top",
                  whiteSpace: "nowrap",
                  fontWeight: 600,
                  borderBottom: "1px solid #E5E7EB",
                }}
              >
                {transaction.balance}
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
)}

      {/* Patient Statement Tab Content */}
      {currentTab === 3 && (
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Patient Statement
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Patient statement content will be displayed here. This is tab 4.
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default PreBillingClaim;