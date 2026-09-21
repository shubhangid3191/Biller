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
  Chip,
} from "@mui/material";
import {
  KeyboardArrowDown,
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

function PostBillingClaim() {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine initial tab based on current route
  const getInitialTab = () => {
    if (location.pathname === "/post-billing-claim") return 1;
    if (location.pathname === "/pre-billing-claim") return 0;
    return 0;
  };

  const [currentTab, setCurrentTab] = useState(getInitialTab());
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);

  // Update tab when route changes
  useEffect(() => {
    setCurrentTab(getInitialTab());
  }, [location.pathname]);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
    // Navigate to corresponding route when tab changes
    if (newValue === 0) {
      navigate("/pre-billing-claim");
    } else if (newValue === 1) {
      navigate("/post-billing-claim");
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
        selectedRows.slice(selectedIndex + 1)
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

  // Sample data for Post-billing
  const claimsData = [
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
    },
  ];

  const tabs = [
    { label: "Pre-billing Claims" },
    { label: "Post-billing Claims" },
    { label: "Remittance ERA/EOB" },
    { label: "Patient Statement" },
  ];

  const filteredData = claimsData;

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
        <Box sx={{ display: "flex", gap: 1, alignItems: "center", flexShrink: 0 }}>
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
            endIcon={<KeyboardArrowDown sx={{ fontSize: 20 }} />}
            sx={{
              textTransform: "none",
              color: "#1f2937",
              borderColor: "transparent",
              backgroundColor: "white",
              fontWeight: 500,
              fontSize: 13,
              height: 40,
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
            PaperProps={{
              sx: {
                mt: 1,
                boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                borderRadius: "12px",
                minWidth: 520,
                maxWidth: 520,
                border: "1px solid #e5e7eb",
              },
            }}
          >
            {/* Header with title and close button */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                px: 3,
                py: 2,
                borderBottom: "2px dashed #93C5FD",
              }}
            >
              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: "#1f2937",
                }}
              >
                Select Actions
              </Typography>
              <IconButton
                size="small"
                onClick={() => setAnchorEl(null)}
                sx={{
                  color: "#3B82F6",
                  "&:hover": { backgroundColor: "#EFF6FF" },
                }}
              >
                <Box
                  component="span"
                  sx={{
                    fontSize: 20,
                    fontWeight: 400,
                    lineHeight: 1,
                  }}
                >
                  ✕
                </Box>
              </IconButton>
            </Box>

            {/* Menu Items */}
            <Box sx={{ py: 1.5, px: 2 }}>
              <Box
                onClick={() => setAnchorEl(null)}
                sx={{
                  color: "#3B82F6",
                  fontSize: 14,
                  py: 1.5,
                  px: 2.5,
                  mb: 1,
                  borderRadius: "8px",
                  backgroundColor: "#F9FAFB",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  "&:hover": { backgroundColor: "#F3F4F6" },
                }}
              >
                <span>Print Claim</span>
                <span style={{ color: "#9CA3AF", fontSize: 13 }}>Ctrl+P</span>
              </Box>
              <Box
                onClick={() => setAnchorEl(null)}
                sx={{
                  color: "#3B82F6",
                  fontSize: 14,
                  py: 1.5,
                  px: 2.5,
                  mb: 1,
                  borderRadius: "8px",
                  backgroundColor: "#DBEAFE",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  "&:hover": { backgroundColor: "#BFDBFE" },
                }}
              >
                <span>Rebill</span>
                <span style={{ color: "#9CA3AF", fontSize: 13 }}>Ctrl+R</span>
              </Box>
              <Box
                onClick={() => setAnchorEl(null)}
                sx={{
                  color: "#3B82F6",
                  fontSize: 14,
                  py: 1.5,
                  px: 2.5,
                  mb: 1,
                  borderRadius: "8px",
                  backgroundColor: "#F9FAFB",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  "&:hover": { backgroundColor: "#F3F4F6" },
                }}
              >
                <span>Transfer balance</span>
                <span style={{ color: "#9CA3AF", fontSize: 13 }}>Ctrl+T</span>
              </Box>
              <Box
                onClick={() => setAnchorEl(null)}
                sx={{
                  color: "#3B82F6",
                  fontSize: 14,
                  py: 1.5,
                  px: 2.5,
                  mb: 1,
                  borderRadius: "8px",
                  backgroundColor: "#F9FAFB",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  "&:hover": { backgroundColor: "#F3F4F6" },
                }}
              >
                <Box sx={{ flex: 1 }}>Transfer patient balance to patient responsibility</Box>
                <span style={{ color: "#9CA3AF", fontSize: 13, whiteSpace: "nowrap", ml: 2 }}>
                  Ctrl+Shift+T
                </span>
              </Box>
              <Box
                onClick={() => setAnchorEl(null)}
                sx={{
                  color: "#3B82F6",
                  fontSize: 14,
                  py: 1.5,
                  px: 2.5,
                  mb: 1,
                  borderRadius: "8px",
                  backgroundColor: "#F9FAFB",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  "&:hover": { backgroundColor: "#F3F4F6" },
                }}
              >
                <span>Note</span>
                <span style={{ color: "#9CA3AF", fontSize: 13 }}>Ctrl+N</span>
              </Box>
              <Box
                onClick={() => setAnchorEl(null)}
                sx={{
                  color: "#3B82F6",
                  fontSize: 14,
                  py: 1.5,
                  px: 2.5,
                  mb: 1,
                  borderRadius: "8px",
                  backgroundColor: "#F9FAFB",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  "&:hover": { backgroundColor: "#F3F4F6" },
                }}
              >
                <span>Settle</span>
                <span style={{ color: "#9CA3AF", fontSize: 13 }}>Ctrl+S</span>
              </Box>
              <Box
                onClick={() => setAnchorEl(null)}
                sx={{
                  color: "#3B82F6",
                  fontSize: 14,
                  py: 1.5,
                  px: 2.5,
                  mb: 1,
                  borderRadius: "8px",
                  backgroundColor: "#F9FAFB",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  "&:hover": { backgroundColor: "#F3F4F6" },
                }}
              >
                <span>Re-open</span>
                <span style={{ color: "#9CA3AF", fontSize: 13 }}>
                  Ctrl+Shift+R
                </span>
              </Box>
              <Box
                onClick={() => setAnchorEl(null)}
                sx={{
                  color: "#3B82F6",
                  fontSize: 14,
                  py: 1.5,
                  px: 2.5,
                  mb: 1,
                  borderRadius: "8px",
                  backgroundColor: "#F9FAFB",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  "&:hover": { backgroundColor: "#F3F4F6" },
                }}
              >
                <span>Void</span>
                <span style={{ color: "#9CA3AF", fontSize: 13 }}>Ctrl+O</span>
              </Box>
              <Box
                onClick={() => setAnchorEl(null)}
                sx={{
                  color: "#3B82F6",
                  fontSize: 14,
                  py: 1.5,
                  px: 2.5,
                  mb: 1,
                  borderRadius: "8px",
                  backgroundColor: "#F9FAFB",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  "&:hover": { backgroundColor: "#F3F4F6" },
                }}
              >
                <span>Apply Payment</span>
                <span style={{ color: "#9CA3AF", fontSize: 13 }}>
                  Ctrl+Shift+A
                </span>
              </Box>
              <Box
                onClick={() => setAnchorEl(null)}
                sx={{
                  color: "#3B82F6",
                  fontSize: 14,
                  py: 1.5,
                  px: 2.5,
                  mb: 1,
                  borderRadius: "8px",
                  backgroundColor: "#F9FAFB",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  "&:hover": { backgroundColor: "#F3F4F6" },
                }}
              >
                <span>Adjustment</span>
                <span style={{ color: "#9CA3AF", fontSize: 13 }}>Ctrl+J</span>
              </Box>
              <Box
                onClick={() => setAnchorEl(null)}
                sx={{
                  color: "#3B82F6",
                  fontSize: 14,
                  py: 1.5,
                  px: 2.5,
                  mb: 1,
                  borderRadius: "8px",
                  backgroundColor: "#F9FAFB",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  "&:hover": { backgroundColor: "#F3F4F6" },
                }}
              >
                <span>Apply payment & adjust</span>
                <span style={{ color: "#9CA3AF", fontSize: 13 }}>
                  Ctrl+Shift+J
                </span>
              </Box>
              <Box
                onClick={() => setAnchorEl(null)}
                sx={{
                  color: "#3B82F6",
                  fontSize: 14,
                  py: 1.5,
                  px: 2.5,
                  mb: 0,
                  borderRadius: "8px",
                  backgroundColor: "#F9FAFB",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  "&:hover": { backgroundColor: "#F3F4F6" },
                }}
              >
                <span>Set follow-up date</span>
                <span style={{ color: "#9CA3AF", fontSize: 13 }}>
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
              height: 40,
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
              height: 40,
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

      {/* Table View */}
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
          <Table size="small" sx={{ minWidth: 1500 }}>
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
                  Billed to
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    fontSize: 11,
                    color: "rgba(0, 0, 0, 0.6)",
                    py: 1,
                  }}
                >
                  Billed
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    fontSize: 11,
                    color: "rgba(0, 0, 0, 0.6)",
                    py: 1,
                  }}
                >
                  Adjustment
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    fontSize: 11,
                    color: "rgba(0, 0, 0, 0.6)",
                    py: 1,
                  }}
                >
                  Insurance payment
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    fontSize: 11,
                    color: "rgba(0, 0, 0, 0.6)",
                    py: 1,
                  }}
                >
                  Patient Payment
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    fontSize: 11,
                    color: "rgba(0, 0, 0, 0.6)",
                    py: 1,
                  }}
                >
                  Billed as
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
                  Clearing house #
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
    </Box>
  );
}

export default PostBillingClaim;
