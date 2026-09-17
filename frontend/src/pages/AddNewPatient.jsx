import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  OcrIcon,
  ExcelIcon,
  JsonIcon,
  Hl7Icon,
  CalendarIcon,
} from "../assets/Assets";

/* ------------------------------------------------------------------ */
/* Theme — single source of truth for all inputs                       */
/* ------------------------------------------------------------------ */
const theme = createTheme({
  palette: { primary: { main: "#015DFF" } },
  typography: { fontFamily: "'Inter', 'Segoe UI', sans-serif" },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          fontSize: 13,
          backgroundColor: "#fff",
          color: "#1E1E1E",
          "& fieldset": { borderColor: "#C5C6CC" },
          "&:hover fieldset": { borderColor: "#9CA3AF" },
          "&.Mui-focused fieldset": {
            borderColor: "#006FFD",
            borderWidth: 1.5,
          },
        },
        input: {
          padding: "8px 12px",
          fontSize: 13,
          "&::placeholder": { color: "#8F9098", opacity: 1 },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          padding: "8px 12px !important",
          fontSize: 13,
          minHeight: "unset !important",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: { root: { fontSize: 13 } },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          textTransform: "none",
          fontWeight: 600,
          boxShadow: "none",
          "&:hover": { boxShadow: "none" },
        },
      },
    },
  },
});

/* ------------------------------------------------------------------ */
/* Field label                                                          */
/* ------------------------------------------------------------------ */
const FieldLabel = ({ children, required }) => (
  <Typography
    component="label"
    sx={{
      display: "block",
      fontSize: 13,
      fontWeight: 700,
      color: "#2F3036",
      mb: "6px",
    }}
  >
    {children}
    {required && (
      <Typography
        component="span"
        sx={{ color: "#EF4444", ml: "2px", fontWeight: 700 }}
      >
        *
      </Typography>
    )}
  </Typography>
);

/* ------------------------------------------------------------------ */
/* Section header                                                       */
/* ------------------------------------------------------------------ */
const SectionHeader = ({ title }) => (
  <Typography
    sx={{
      fontWeight: 700,
      color: "#000",
      fontSize: 15,
      textTransform: "uppercase",
      mb: "16px",
    }}
  >
    {title}
  </Typography>
);

/* ------------------------------------------------------------------ */
/* Toolbar button                                                       */
/* ------------------------------------------------------------------ */
const ToolbarBtn = ({ icon, label }) => (
  <Button
    variant="outlined"
    startIcon={icon}
    sx={{
      borderColor: "#C5C6CC",
      color: "#015DFF",
      fontWeight: 500,
      fontSize: 12,
      borderRadius: "6px",
      height: "42px",
      px: 1.5,
      "& .MuiButton-startIcon": { mr: 0.5 },
      "&:hover": { borderColor: "#015DFF", background: "#EEF4FF" },
    }}
  >
    {label}
  </Button>
);

/* ------------------------------------------------------------------ */
/* Dropdown (Select)                                                    */
/* ------------------------------------------------------------------ */
const DropdownField = ({ value, onChange, placeholder, children }) => (
  <FormControl fullWidth>
    <Select
      value={value}
      onChange={onChange}
      displayEmpty
      IconComponent={(props) => (
        <KeyboardArrowDownIcon {...props} sx={{ color: "#8F9098", fontSize: 20 }} />
      )}
      renderValue={(val) =>
        val ? (
          <span style={{ fontSize: 13, color: "#1E1E1E" }}>{val}</span>
        ) : (
          <span style={{ fontSize: 13, color: "#8F9098" }}>{placeholder}</span>
        )
      }
      sx={{
        height: "42px",
        borderRadius: "8px",
        backgroundColor: "#fff",
        "& fieldset": { borderColor: "#C5C6CC" },
        "&:hover fieldset": { borderColor: "#9CA3AF" },
        "&.Mui-focused fieldset": { borderColor: "#006FFD", borderWidth: 1.5 },
        "& .MuiSelect-select": {
          py: "0 !important",
          px: "12px !important",
          fontSize: 13,
          display: "flex",
          alignItems: "center",
          height: "42px",
          boxSizing: "border-box",
        },
      }}
    >
      <MenuItem value="" disabled>
        <span style={{ fontSize: 13, color: "#8F9098" }}>{placeholder}</span>
      </MenuItem>
      {children}
    </Select>
  </FormControl>
);

/* ------------------------------------------------------------------ */
/* Text input                                                           */
/* ------------------------------------------------------------------ */
const TextInput = ({ placeholder, value, onChange, type = "text" }) => (
  <TextField
    fullWidth
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    sx={{ "& .MuiInputBase-root": { height: "42px" } }}
  />
);

/* ------------------------------------------------------------------ */
/* Date input                                                           */
/* ------------------------------------------------------------------ */
const DateInput = ({ value, onChange }) => (
  <TextField
    fullWidth
    placeholder="DD-MM-YYYY"
    value={value}
    onChange={onChange}
    InputProps={{
      endAdornment: (
        <InputAdornment position="end" sx={{ mr: "-4px" }}>
          <CalendarIcon width={10} height={10} color="#1E1E1E" />
        </InputAdornment>
      ),
    }}
    sx={{ "& .MuiInputBase-root": { height: "42px" } }}
  />
);

/* ------------------------------------------------------------------ */
/* Field wrapper                                                        */
/* ------------------------------------------------------------------ */
const FormField = ({ label, required, children }) => (
  <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
    <FieldLabel required={required}>{label}</FieldLabel>
    {children}
  </Box>
);

/* ------------------------------------------------------------------ */
/* 3-column row                                                         */
/* ------------------------------------------------------------------ */
const FieldRow = ({ children, mb = "16px" }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: { xs: "column", sm: "row" },
      gap: "16px",
      mb,
      "& > *": { flex: "1 1 0", minWidth: 0 },
    }}
  >
    {children}
  </Box>
);

/* ------------------------------------------------------------------ */
/* Main Component                                                       */
/* ------------------------------------------------------------------ */
function AddNewPatient() {
  const [form, setForm] = useState({
    provider: "",
    specialty: "",
    location: "",
    primaryCarePhysician: "",
    admittingPhysician: "",
    patientType: "",
    mrn: "",
    fin: "",
    patientFirstName: "",
    patientMiddleName: "",
    patientLastName: "",
    dateOfBirth: "",
    zipCode: "",
    address: "",
    email: "",
    admitDate: "",
    dateOfService: "",
    bed: "",
    status: "",
  });

  const set = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          bgcolor: "#F3F4F6",
          minHeight: "100vh",
          p: { xs: 2, sm: "20px" },
        }}
      >
        {/* ---- Top Bar ---- */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            gap: 1.5,
            mb: "16px",
          }}
        >
          <Box>
            <Typography sx={{ fontWeight: 700, color: "#111827", fontSize: 17 }}>
              Add New Patient
            </Typography>
            <Typography sx={{ color: "#6B7280", mt: 0.3, fontSize: 12 }}>
              Complete all required fields to create a new patient
            </Typography>
          </Box>
          <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }}>
            <ToolbarBtn icon={<OcrIcon />} label="OCR" />
            <ToolbarBtn icon={<ExcelIcon />} label="Excel" />
            <ToolbarBtn icon={<JsonIcon />} label="JSON" />
            <ToolbarBtn icon={<Hl7Icon />} label="HL7" />
          </Stack>
        </Box>

        {/* ---- ASSIGN ---- */}
        <Paper
          elevation={0}
          sx={{ borderRadius: "10px", p: "20px", mb: "16px", bgcolor: "#fff" }}
        >
          <SectionHeader title="ASSIGN" />

          <FieldRow>
            <FormField label="Provider">
              <DropdownField
                value={form.provider}
                onChange={set("provider")}
                placeholder="Select provider"
              >
                <MenuItem value="Dr. Smith">Dr. Smith</MenuItem>
                <MenuItem value="Dr. Jones">Dr. Jones</MenuItem>
              </DropdownField>
            </FormField>
            <FormField label="Specialty">
              <DropdownField
                value={form.specialty}
                onChange={set("specialty")}
                placeholder="Select specialty"
              >
                <MenuItem value="Cardiology">Cardiology</MenuItem>
                <MenuItem value="Neurology">Neurology</MenuItem>
                <MenuItem value="Orthopedics">Orthopedics</MenuItem>
              </DropdownField>
            </FormField>
            <FormField label="Location" required>
              <DropdownField
                value={form.location}
                onChange={set("location")}
                placeholder="Select location"
              >
                <MenuItem value="Ward A">Ward A</MenuItem>
                <MenuItem value="Ward B">Ward B</MenuItem>
                <MenuItem value="ICU">ICU</MenuItem>
              </DropdownField>
            </FormField>
          </FieldRow>

          <FieldRow mb="0px">
            <FormField label="Primary Care Physician">
              <DropdownField
                value={form.primaryCarePhysician}
                onChange={set("primaryCarePhysician")}
                placeholder="Select provider"
              >
                <MenuItem value="Dr. Smith">Dr. Smith</MenuItem>
                <MenuItem value="Dr. Jones">Dr. Jones</MenuItem>
              </DropdownField>
            </FormField>
            <FormField label="Admitting Physician" required>
              <DropdownField
                value={form.admittingPhysician}
                onChange={set("admittingPhysician")}
                placeholder="Select provider"
              >
                <MenuItem value="Dr. Smith">Dr. Smith</MenuItem>
                <MenuItem value="Dr. Jones">Dr. Jones</MenuItem>
              </DropdownField>
            </FormField>
            <Box />
          </FieldRow>
        </Paper>

        {/* ---- BASIC INFORMATION ---- */}
        <Paper
          elevation={0}
          sx={{ borderRadius: "10px", p: "20px", mb: "16px", bgcolor: "#fff" }}
        >
          <SectionHeader title="BASIC INFORMATION" />

          <FieldRow>
            <FormField label="Patient Type" required>
              <TextInput
                placeholder="Full name"
                value={form.patientType}
                onChange={set("patientType")}
              />
            </FormField>
            <FormField label="MRN">
              <TextInput
                placeholder="Medical record number"
                value={form.mrn}
                onChange={set("mrn")}
              />
            </FormField>
            <FormField label="FIN">
              <DropdownField
                value={form.fin}
                onChange={set("fin")}
                placeholder="Accession number"
              >
                <MenuItem value="ACC-001">ACC-001</MenuItem>
                <MenuItem value="ACC-002">ACC-002</MenuItem>
              </DropdownField>
            </FormField>
          </FieldRow>

          <FieldRow>
            <FormField label="Patient First Name" required>
              <TextInput
                placeholder="First name"
                value={form.patientFirstName}
                onChange={set("patientFirstName")}
              />
            </FormField>
            <FormField label="Patient Middle Name" required>
              <TextInput
                placeholder="Middle name"
                value={form.patientMiddleName}
                onChange={set("patientMiddleName")}
              />
            </FormField>
            <FormField label="Patient Last Name" required>
              <TextInput
                placeholder="Last name"
                value={form.patientLastName}
                onChange={set("patientLastName")}
              />
            </FormField>
          </FieldRow>

          <FieldRow>
            <FormField label="Date of Birth" required>
              <DateInput
                value={form.dateOfBirth}
                onChange={set("dateOfBirth")}
              />
            </FormField>
            <FormField label="ZIP Code">
              <TextInput
                placeholder="Enter zipcode"
                value={form.zipCode}
                onChange={set("zipCode")}
              />
            </FormField>
            <FormField label="Address">
              <TextInput
                placeholder="Enter address"
                value={form.address}
                onChange={set("address")}
              />
            </FormField>
          </FieldRow>

          <Box sx={{ display: "flex", gap: "16px" }}>
            <Box sx={{ flex: "1 1 0", minWidth: 0 }}>
              <FormField label="Email" required>
                <TextInput
                  placeholder="Enter email"
                  type="email"
                  value={form.email}
                  onChange={set("email")}
                />
              </FormField>
            </Box>
            <Box sx={{ flex: "2 1 0" }} />
          </Box>
        </Paper>

        {/* ---- VISIT DETAILS ---- */}
        <Paper
          elevation={0}
          sx={{ borderRadius: "10px", p: "20px", mb: "16px", bgcolor: "#fff" }}
        >
          <SectionHeader title="VISIT DETAILS" />

          <FieldRow>
            <FormField label="Admit Date" required>
              <TextInput
                placeholder="(555) 123-4567"
                value={form.admitDate}
                onChange={set("admitDate")}
              />
            </FormField>
            <FormField label="Date of Service" required>
              <DateInput
                value={form.dateOfService}
                onChange={set("dateOfService")}
              />
            </FormField>
            <FormField label="Bed" required>
              <TextInput
                placeholder="Room 5 Bed 32"
                value={form.bed}
                onChange={set("bed")}
              />
            </FormField>
          </FieldRow>

          <Box sx={{ display: "flex", gap: "16px" }}>
            <Box sx={{ flex: "1 1 0", minWidth: 0 }}>
              <FormField label="Status">
                <DropdownField
                  value={form.status}
                  onChange={set("status")}
                  placeholder="Not Seen"
                >
                  <MenuItem value="Not Seen">Not Seen</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                </DropdownField>
              </FormField>
            </Box>
            <Box sx={{ flex: "2 1 0" }} />
          </Box>
        </Paper>

        {/* ---- Footer Buttons ---- */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "16px",
            pt: 1,
            pb: 1,
          }}
        >
          <Button
            variant="outlined"
            sx={{
              borderColor: "#3182CE",
              color: "#3182CE",
              px: 4,
              py: 1,
              fontSize: 14,
              fontWeight: 600,
              borderRadius: "10px",
              "&:hover": { borderColor: "#2563EB", background: "#EFF6FF" },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#015DFF",
              color: "#fff",
              px: 4,
              py: 1,
              fontSize: 14,
              fontWeight: 600,
              borderRadius: "10px",
              "&:hover": { bgcolor: "#0049CC" },
            }}
          >
            Add Patient
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default AddNewPatient;
