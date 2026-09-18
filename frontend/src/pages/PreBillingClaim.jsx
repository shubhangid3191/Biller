import { useState } from "react";
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
  Search,
  FilterList,
  ViewList,
  ViewModule,
  KeyboardArrowDown,
  FileDownload,
} from "@mui/icons-material";

// Inline SVG icon components from CLAIMS section
const EditIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2 16H3.425L13.2 6.225L11.775 4.8L2 14.575V16ZM0 18V13.75L13.2 0.575C13.4 0.391667 13.6208 0.25 13.8625 0.15C14.1042 0.05 14.3583 0 14.625 0C14.8917 0 15.15 0.05 15.4 0.15C15.65 0.25 15.8667 0.4 16.05 0.6L17.425 2C17.625 2.18333 17.7708 2.4 17.8625 2.65C17.9542 2.9 18 3.15 18 3.4C18 3.66667 17.9542 3.92083 17.8625 4.1625C17.7708 4.40417 17.625 4.625 17.425 4.825L4.25 18H0ZM12.475 5.525L11.775 4.8L13.2 6.225L12.475 5.525Z"
      fill="#0052E1"
    />
  </svg>
);

const Icon2 = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.7125 13.7125C5.90417 13.5208 6 13.2833 6 13C6 12.7167 5.90417 12.4792 5.7125 12.2875C5.52083 12.0958 5.28333 12 5 12C4.71667 12 4.47917 12.0958 4.2875 12.2875C4.09583 12.4792 4 12.7167 4 13C4 13.2833 4.09583 13.5208 4.2875 13.7125C4.47917 13.9042 4.71667 14 5 14C5.28333 14 5.52083 13.9042 5.7125 13.7125ZM5.7125 9.7125C5.90417 9.52083 6 9.28333 6 9C6 8.71667 5.90417 8.47917 5.7125 8.2875C5.52083 8.09583 5.28333 8 5 8C4.71667 8 4.47917 8.09583 4.2875 8.2875C4.09583 8.47917 4 8.71667 4 9C4 9.28333 4.09583 9.52083 4.2875 9.7125C4.47917 9.90417 4.71667 10 5 10C5.28333 10 5.52083 9.90417 5.7125 9.7125ZM5.7125 5.7125C5.90417 5.52083 6 5.28333 6 5C6 4.71667 5.90417 4.47917 5.7125 4.2875C5.52083 4.09583 5.28333 4 5 4C4.71667 4 4.47917 4.09583 4.2875 4.2875C4.09583 4.47917 4 4.71667 4 5C4 5.28333 4.09583 5.52083 4.2875 5.7125C4.47917 5.90417 4.71667 6 5 6C5.28333 6 5.52083 5.90417 5.7125 5.7125ZM8 14H14V12H8V14ZM8 10H14V8H8V10ZM8 6H14V4H8V6ZM2 18C1.45 18 0.979167 17.8042 0.5875 17.4125C0.195833 17.0208 0 16.55 0 16V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H16C16.55 0 17.0208 0.195833 17.4125 0.5875C17.8042 0.979167 18 1.45 18 2V16C18 16.55 17.8042 17.0208 17.4125 17.4125C17.0208 17.8042 16.55 18 16 18H2ZM2 16H16V2H2V16Z"
      fill="#0052E1"
    />
  </svg>
);

const Icon3 = () => (
  <svg
    width="15"
    height="18"
    viewBox="0 0 18 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2 20C1.45 20 0.979167 19.8042 0.5875 19.4125C0.195833 19.0208 0 18.55 0 18V4C0 3.45 0.195833 2.97917 0.5875 2.5875C0.979167 2.19583 1.45 2 2 2H6.175C6.35833 1.41667 6.71667 0.9375 7.25 0.5625C7.78333 0.1875 8.36667 0 9 0C9.66667 0 10.2625 0.1875 10.7875 0.5625C11.3125 0.9375 11.6667 1.41667 11.85 2H16C16.55 2 17.0208 2.19583 17.4125 2.5875C17.8042 2.97917 18 3.45 18 4V18C18 18.55 17.8042 19.0208 17.4125 19.4125C17.0208 19.8042 16.55 20 16 20H2ZM2 18H16V4H14V7H4V4H2V18ZM9.7125 3.7125C9.90417 3.52083 10 3.28333 10 3C10 2.71667 9.90417 2.47917 9.7125 2.2875C9.52083 2.09583 9.28333 2 9 2C8.71667 2 8.47917 2.09583 8.2875 2.2875C8.09583 2.47917 8 2.71667 8 3C8 3.28333 8.09583 3.52083 8.2875 3.7125C8.47917 3.90417 8.71667 4 9 4C9.28333 4 9.52083 3.90417 9.7125 3.7125Z"
      fill="#0052E1"
    />
  </svg>
);

const Icon4 = () => (
  <svg
    width="18"
    height="15"
    viewBox="0 0 20 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2 16C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H8L10 2H18C18.55 2 19.0208 2.19583 19.4125 2.5875C19.8042 2.97917 20 3.45 20 4V14C20 14.55 19.8042 15.0208 19.4125 15.4125C19.0208 15.8042 18.55 16 18 16H2ZM2 14H18V4H9.175L7.175 2H2V14Z"
      fill="#0052E1"
    />
  </svg>
);

const Icon5 = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13 18H2C1.45 18 0.979167 17.8042 0.5875 17.4125C0.195833 17.0208 0 16.55 0 16V2C0 1.45 0.195833 0.979167 0.5875 0.5875C0.979167 0.195833 1.45 0 2 0H16C16.55 0 17.0208 0.195833 17.4125 0.5875C17.8042 0.979167 18 1.45 18 2V13L13 18ZM12 16V14C12 13.45 12.1958 12.9792 12.5875 12.5875C12.9792 12.1958 13.45 12 14 12H16V2H2V16H12ZM8 13H10V7H13V5H5V7H8V13Z"
      fill="#0052E1"
    />
  </svg>
);

const Icon6 = () => (
  <svg
    width="19"
    height="16"
    viewBox="0 0 22 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.0833 0 12.1083 0.158333 13.075 0.475C14.0417 0.791667 14.9333 1.23333 15.75 1.8L14.3 3.275C13.6667 2.875 12.9917 2.5625 12.275 2.3375C11.5583 2.1125 10.8 2 10 2C7.78333 2 5.89583 2.77917 4.3375 4.3375C2.77917 5.89583 2 7.78333 2 10C2 12.2167 2.77917 14.1042 4.3375 15.6625C5.89583 17.2208 7.78333 18 10 18C10.5333 18 11.05 17.95 11.55 17.85C12.05 17.75 12.5333 17.6083 13 17.425L14.5 18.95C13.8167 19.2833 13.1 19.5417 12.35 19.725C11.6 19.9083 10.8167 20 10 20ZM17 18V15H14V13H17V10H19V13H22V15H19V18H17ZM8.6 14.6L4.35 10.35L5.75 8.95L8.6 11.8L18.6 1.775L20 3.175L8.6 14.6Z"
      fill="#0052E1"
    />
  </svg>
);

function PreBillingClaim() {
  const [currentTab, setCurrentTab] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [viewMode, setViewMode] = useState("list");
  const [statusFilter, setStatusFilter] = useState("all");

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
                  <Search
                    sx={{
                      color: "#0066FF",
                      fontSize: 18,
                    }}
                  />
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
            <FilterList
              sx={{
                fontSize: 16,
                mr: 0.5,
                color: "#111827",
              }}
            />
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
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: 1,
            flex: 1,
            minWidth: 0,
          }}
        >
          <Typography
            variant="body2"
            component="span"
            sx={{
              fontWeight: 700,
              color: "#0066ff",
              fontSize: 11,
              mt: 0.1,
              display: "inline-flex",
              alignItems: "center",
              gap: 0.5,
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ fontSize: 13 }}>⚡</span>
            <span>CHANGE CAPTURE ASSIST</span>
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "rgba(0, 0, 0, 0.8)", fontSize: 12, lineHeight: 1.5 }}
          >
            TiaStat auto-coded <strong>11 encounters</strong> from clinical
            notes. <strong>3 are clean and ready to bill</strong>; the rest have
            flagged edits (gender conflicts, missing etiology dx,
            cosmetic-vs-functional). Toggle Grid to see full problem/procedure
            detail without opening each record.
          </Typography>
        </Box>
        <Button
          variant="contained"
          size="small"
          sx={{
            textTransform: "none",
            backgroundColor: "#0066ff",
            boxShadow: "none",
            fontSize: 11,
            px: 2,
            py: 0.7,
            fontWeight: 600,
            whiteSpace: "nowrap",
            flexShrink: 0,
            "&:hover": { backgroundColor: "#0052cc", boxShadow: "none" },
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

        <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
          <IconButton
            size="small"
            sx={{
              border: "1px solid rgba(0, 0, 0, 0.23)",
              borderRadius: 1,
            }}
          >
            <FileDownload fontSize="small" />
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
            maxHeight: "calc(100vh - 280px)",
            overflowY: "auto",
            overflowX: "auto",
          }}
        >
          <TableContainer
            component={Paper}
            sx={{
              boxShadow: "none",
              border: "1px solid #e0e0e0",
              minWidth: 1400,
            }}
          >
            <Table size="small">
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
                              <EditIcon />
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
                        <EditIcon />
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
