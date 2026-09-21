import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
} from "@mui/material";
import {
  ViewList,
  ViewModule,
  KeyboardArrowDown,
  FileDownload,
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
} from "../assets/Assets";

function PreBillingClaim() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Determine initial tab based on current route
  const getInitialTab = () => {
    if (location.pathname === '/post-billing-claim') return 1;
    return 0;
  };
  
  const [currentTab, setCurrentTab] = useState(getInitialTab());
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [viewMode, setViewMode] = useState("list");
  const [statusFilter, setStatusFilter] = useState("all");

  // Update tab when route changes
  useEffect(() => {
    setCurrentTab(getInitialTab());
  }, [location.pathname]);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
    // Navigate to corresponding route when tab changes
    if (newValue === 0) {
      navigate('/pre-billing-claim');
    } else if (newValue === 1) {
      navigate('/post-billing-claim');
    }
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

  // Sample data
  const claimsData = [
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

  // Filter data based on selected status
  const filteredData = claimsData.filter((claim) => {
    if (statusFilter === "all") return true;
    if (statusFilter === "unbilled") return claim.status === "Unbilled";
    if (statusFilter === "ready") return claim.status === "Ready";
    if (statusFilter === "need") return claim.status === "Need Info";
    if (statusFilter === "processed") return claim.status === "Processed";
    if (statusFilter === "archived") return claim.status === "Archived";
    return true;
  });

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: "#f5f7fa",
        overflow: "hidden",
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
            sx={{
              height: 32,
              borderRadius: "18px",
              textTransform: "none",
              color: "#374151",
              borderColor: "#E5E7EB",
              backgroundColor: "#FFFFFF",
              fontWeight: 500,
              fontSize: 11.5,
              px: 1.5,
              whiteSpace: "nowrap",
              minWidth: "auto",

              "&:hover": {
                borderColor: "#D1D5DB",
                backgroundColor: "#F9FAFB",
              },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mr: 0.5 }}>
              <FilterIcon1 />
            </Box>
            Advanced filters
          </Button>

          {/* List / Grid - Single Merged Toggle */}
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
                  backgroundColor: viewMode === "list" ? "#0052CC" : "#F3F4F6",
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
                  backgroundColor: viewMode === "grid" ? "#0052CC" : "#F3F4F6",
                },
              }}
            >
              <ViewModule sx={{ fontSize: 17 }} />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* Info Banner */}
      <Box
  sx={{
    backgroundColor: "#E8F4FD",
    borderLeft: "4px solid #0066ff",
    p: 1.5,
    mx: 2,
    mt: 2,
    borderRadius: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 2,
  }}
>
  {/* Left Content */}
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      flex: 1,
      minWidth: 0,
      gap: 0.3,
    }}
  >
    {/* Heading */}
    <Typography
      component="div"
      sx={{
        fontWeight: 700,
        color: "#0066ff",
        fontSize: 10,
        lineHeight: 1.2,
        display: "flex",
        alignItems: "center",
        gap: 0.5,
      }}
    >
      <span style={{ fontSize: 12 }}>✦</span>
      <span>CHARGE-CAPTURE ASSIST</span>
    </Typography>

    {/* Description */}
    <Typography
      component="div"
      sx={{
        color: "rgba(0, 0, 0, 0.75)",
        fontSize: 11,
        lineHeight: 1.45,
      }}
    >
      TiaStat auto-coded <strong>11 encounters</strong> from clinical notes.{" "}
      <strong>3 are clean and ready to bill</strong>; the rest have flagged
      edits (gender conflicts, missing etiology dx, cosmetic-vs-functional).
      Toggle Grid to see full problem/procedure detail without opening each
      record.
    </Typography>
  </Box>

  {/* View Details Button */}
  <Button
    variant="contained"
    size="small"
    sx={{
      textTransform: "none",
      backgroundColor: "#0066ff",
      color: "#fff",
      boxShadow: "none",
      fontSize: 11,
      px: 2,
      py: 0.7,
      minWidth: 84,
      height: 30,
      fontWeight: 600,
      whiteSpace: "nowrap",
      flexShrink: 0,
      borderRadius: "6px",
      "&:hover": {
        backgroundColor: "#0052cc",
        boxShadow: "none",
      },
    }}
  >
    View details
  </Button>
</Box>

      {/* Status Filter Chips and Actions in Same Row */}
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
              height: 40,
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
              height: 40,
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
            endIcon={<KeyboardArrowDown />}
            sx={{
              textTransform: "none",
              color: "rgba(0, 0, 0, 0.87)",
              borderColor: "rgba(0, 0, 0, 0.23)",
              fontWeight: 500,
              fontSize: 13,
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
            <MenuItem onClick={() => setAnchorEl(null)}>Submit Claims</MenuItem>
            <MenuItem onClick={() => setAnchorEl(null)}>
              Export Selected
            </MenuItem>
            <MenuItem onClick={() => setAnchorEl(null)}>
              Mark as Processed
            </MenuItem>
          </Menu>
        </Box>
      </Box>

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
              maxHeight: "calc(100vh - 320px)",
              overflowY: "auto",
              overflowX: "auto",
            }}
          >
            <Table size="small" sx={{ minWidth: 1400 }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#fafafa" }}>
                  <TableCell padding="checkbox" sx={{ width: 40, py: 1 }}>
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
                      py: 1,
                    }}
                  >
                    DOS
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 600,
                      fontSize: 11,
                      color: "rgba(0, 0, 0, 0.6)",
                      py: 1,
                    }}
                  >
                    Patient Name (Gender)
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 600,
                      fontSize: 11,
                      color: "rgba(0, 0, 0, 0.6)",
                      py: 1,
                    }}
                  >
                    CPT
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 600,
                      fontSize: 11,
                      color: "rgba(0, 0, 0, 0.6)",
                      py: 1,
                    }}
                  >
                    Modifier
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 600,
                      fontSize: 11,
                      color: "rgba(0, 0, 0, 0.6)",
                      py: 1,
                    }}
                  >
                    ICD
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 600,
                      fontSize: 11,
                      color: "rgba(0, 0, 0, 0.6)",
                      py: 1,
                    }}
                  >
                    Primary Insurance
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 600,
                      fontSize: 11,
                      color: "rgba(0, 0, 0, 0.6)",
                      py: 1,
                    }}
                  >
                    Billed Amount
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 600,
                      fontSize: 11,
                      color: "rgba(0, 0, 0, 0.6)",
                      py: 1,
                    }}
                  >
                    Patient Copay
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 600,
                      fontSize: 11,
                      color: "rgba(0, 0, 0, 0.6)",
                      py: 1,
                    }}
                  >
                    Status
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 600,
                      fontSize: 11,
                      color: "rgba(0, 0, 0, 0.6)",
                      py: 1,
                    }}
                  >
                    Remarks
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 600,
                      fontSize: 11,
                      color: "rgba(0, 0, 0, 0.6)",
                      py: 1,
                    }}
                  >
                    Encounter ID #
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 600,
                      fontSize: 11,
                      color: "rgba(0, 0, 0, 0.6)",
                      py: 1,
                    }}
                  >
                    Claim ID
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 600,
                      fontSize: 11,
                      color: "rgba(0, 0, 0, 0.6)",
                      py: 1,
                    }}
                  >
                    Reference ID
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 600,
                      fontSize: 11,
                      py: 1,
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
                          sx={{ fontSize: 12, color: "rgba(0, 0, 0, 0.87)" }}
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
                            <IconButton size="small" sx={{ padding: "4px" }}>
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
                          <strong style={{ fontWeight: 600 }}>Claim ID:</strong>{" "}
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
                          <strong style={{ fontWeight: 600 }}>Author:</strong>{" "}
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
                          <strong style={{ fontWeight: 600 }}>Modifier:</strong>{" "}
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
                    <Box sx={{ flex: "1 1 auto", minWidth: 0, maxWidth: 155 }}>
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
                          <strong style={{ fontWeight: 600 }}>Remarks</strong>
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
  );
}

export default PreBillingClaim;
