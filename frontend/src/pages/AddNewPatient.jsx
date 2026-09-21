import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Dialog,
  FormControl,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Popover,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import {
  OcrIcon,
  ExcelIcon,
  JsonIcon,
  Hl7Icon,
  CalendarIcon,
  DragFileIcon,
  UploadFileIcon,
} from "../assets/Assets";

const FONT = "'Inter', 'Segoe UI', sans-serif";

/* ------------------------------------------------------------------ */
/* Theme                                                                */
/* ------------------------------------------------------------------ */
const theme = createTheme({
  palette: { primary: { main: "#015DFF" } },
  typography: { fontFamily: FONT },
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
    MuiMenuItem: { styleOverrides: { root: { fontSize: 13 } } },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: "20px",
          overflow: "hidden",
        },
      },
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
/* Upload Dialog — reusable for all 4 types                            */
/* ------------------------------------------------------------------ */
const DIALOG_CONFIG = {
  OCR: {
    title: "Upload Image",
    accept: "image/*,.pdf",
    hint: "Drag and drop any media or text snippets\nfor adding patients",
    ext: "PNG, JPG, PDF",
  },
  Excel: {
    title: "Import Excel",
    accept: ".xlsx,.xls,.csv",
    hint: "Drag and drop Excel file here",
    ext: ".xlsx, .xls or .csv",
  },
  JSON: {
    title: "Import JSON",
    accept: ".json",
    hint: "Drag and drop JSON file here",
    ext: ".json",
  },
  HL7: {
    title: "Import HL7",
    accept: ".hl7,.txt",
    hint: "Drag and drop HL7 file here",
    ext: ".hl7 or .txt",
  },
};

const UploadDialog = ({ open, type, onClose, onOk }) => {
  const cfg = DIALOG_CONFIG[type] || {};
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [dropActive, setDropActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFile = (f) => {
    if (f) setFile(f);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setDropActive(false);
    const f = e.dataTransfer?.files?.[0];
    if (f) handleFile(f);
  };
  const handleClose = () => {
    setFile(null);
    setDropActive(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
    onClose();
  };
  const handleOk = async () => {
    if (!file) {
      handleClose();
      return;
    }
    setLoading(true);
    try {
      await onOk(file);
    } finally {
      setLoading(false);
      setFile(null);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "20px",
          p: 0,
          overflow: "hidden",
          width: { xs: "92vw", sm: "560px" },
          maxWidth: { xs: "92vw", sm: "560px" },
          mx: { xs: 1, sm: "auto" },
        },
      }}
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "20px !important",
          overflow: "hidden",
        },
        "& .MuiDialog-container": {
          alignItems: "center",
        },
      }}
    >
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={cfg.accept}
        style={{ display: "none" }}
        onChange={(e) => handleFile(e.target.files[0])}
      />

      {/* Title */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontWeight: 600,
          fontSize: "18px",
          fontFamily: FONT,
          borderBottom: "1px dashed #A7C7E7",
          px: { xs: 2, sm: 2.5 },
          pt: { xs: 1.5, sm: 2 },
          pb: 1.5,
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: 18,
            fontFamily: FONT,
            color: "#111827",
          }}
        >
          {cfg.title}
        </Typography>
        <IconButton onClick={handleClose} sx={{ color: "#015DFF", p: 0.5 }}>
          <CloseIcon sx={{ fontSize: 20 }} />
        </IconButton>
      </Box>

      {/* Content */}
      <Box sx={{ px: { xs: 2, sm: 2.5 }, pt: 1, pb: 0.5 }}>
        {/* Drag & Drop zone */}
        <Box
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={() => setDropActive(true)}
          onDragLeave={() => setDropActive(false)}
          sx={{
            border: "2px dashed #B4CFFC",
            borderRadius: "16px",
            background: dropActive ? "#F2F8FE" : "#EAF2FF",
            textAlign: "center",
            py: { xs: 2, sm: 2.5 },
            px: 2,
            cursor: "pointer",
            mb: 2,
            mt: 1,
            transition: "0.2s",
            "&:hover": { background: "#EDF5FF" },
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
            <DragFileIcon width={40} height={36} />
          </Box>
          <Typography
            sx={{
              fontWeight: 500,
              color: "#7B89B2",
              fontFamily: FONT,
              fontSize: 14,
            }}
          >
            {cfg.hint}
          </Typography>
          {cfg.ext && (
            <Typography
              variant="body2"
              sx={{ color: "#9CA3AF", mt: 0.3, fontSize: 12 }}
            >
              {cfg.ext}
            </Typography>
          )}
        </Box>

        {/* Upload from computer zone */}
        <Box
          onClick={() => fileInputRef.current?.click()}
          sx={{
            borderRadius: "16px",
            background: "#EAF2FF",
            textAlign: "center",
            py: 2,
            px: 2,
            cursor: "pointer",
            transition: "0.2s",
            "&:hover": { background: "#EDF5FF" },
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center", mb: 0.75 }}>
            <UploadFileIcon width={36} height={29} />
          </Box>
          <Typography
            sx={{
              fontWeight: 500,
              color: "#7B89B2",
              fontFamily: FONT,
              fontSize: 14,
            }}
          >
            Upload file from computer
          </Typography>
        </Box>

        {/* Selected file name */}
        {file && (
          <Typography
            sx={{
              mt: 2,
              textAlign: "center",
              color: "#2563EB",
              fontWeight: 500,
              fontSize: 13,
            }}
          >
            Selected: {file.name}
          </Typography>
        )}
      </Box>

      {/* Footer */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 1,
          p: { xs: 1.5, sm: 2 },
          borderTop: "1px solid #E5E7EB",
          bgcolor: "#F9FAFB",
        }}
      >
        <Button
          onClick={handleClose}
          sx={{
            color: "#6B7280",
            textTransform: "none",
            fontFamily: FONT,
            fontWeight: 500,
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleOk}
          disabled={!file || loading}
          sx={{
            background: "#015DFF",
            borderRadius: "8px",
            px: 3,
            textTransform: "none",
            fontFamily: FONT,
            fontWeight: 600,
            "&:hover": { background: "#0148CC" },
            "&.Mui-disabled": { background: "#B3C9FF", color: "#fff" },
          }}
        >
          {loading ? "Processing..." : "OK"}
        </Button>
      </Box>
    </Dialog>
  );
};

/* ------------------------------------------------------------------ */
/* Sub-components                                                       */
/* ------------------------------------------------------------------ */
const FieldLabel = ({ children, required }) => (
  <Typography
    component="label"
    sx={{
      display: "block",
      fontSize: 12,
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

const ToolbarBtn = ({ icon, label, onClick }) => (
  <Button
    variant="outlined"
    startIcon={icon}
    onClick={onClick}
    sx={{
      borderColor: "#E1E1E2",
      color: "#015DFF",
      fontWeight: 600,
      fontSize: 15,
      borderRadius: "8px",
      height: "36px",
      px: 1.5,
      minWidth: "unset",
      backgroundColor: "#fff",
      "& .MuiButton-startIcon": { mr: 0.5 },
      "&:hover": { borderColor: "#015DFF", background: "#F5F8FF" },
      boxShadow: "none",
    }}
  >
    {label}
  </Button>
);

const DropdownField = ({ value, onChange, placeholder, children }) => (
  <FormControl fullWidth>
    <Select
      value={value}
      onChange={onChange}
      displayEmpty
      IconComponent={(props) => (
        <KeyboardArrowDownIcon
          {...props}
          sx={{ color: "#8F9098", fontSize: 20 }}
        />
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

const DateInput = ({ value, onChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const iconRef = useRef(null);

  const handleIconClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDateChange = (newVal) => {
    if (newVal) {
      onChange({ target: { value: newVal.format("DD-MM-YYYY") } });
    }
    handleClose();
  };

  const parsedValue = value
    ? dayjs(value, "DD-MM-YYYY").isValid()
      ? dayjs(value, "DD-MM-YYYY")
      : null
    : null;

  const open = Boolean(anchorEl);

  return (
    <>
      <TextField
        fullWidth
        placeholder="DD-MM-YYYY"
        value={value}
        onChange={onChange}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end" sx={{ mr: "-4px" }}>
                <IconButton
                  ref={iconRef}
                  onClick={handleIconClick}
                  sx={{ p: "4px", "&:hover": { background: "transparent" } }}
                  disableRipple
                >
                  <CalendarIcon width={14} height={16} color="#1E1E1E" />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
        sx={{ "& .MuiInputBase-root": { height: "42px" } }}
      />
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
            mt: 0.5,
          },
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            value={parsedValue}
            onChange={handleDateChange}
            sx={{
              width: { xs: "280px", sm: "320px" },
              "& .MuiPickersDay-root.Mui-selected": {
                backgroundColor: "#015DFF",
              },
              "& .MuiPickersDay-root:hover": {
                backgroundColor: "#EEF4FF",
              },
            }}
          />
        </LocalizationProvider>
      </Popover>
    </>
  );
};

const FormField = ({ label, required, children }) => (
  <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
    <FieldLabel required={required}>{label}</FieldLabel>
    {children}
  </Box>
);

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
  const navigate = useNavigate();
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

  // Dialog state: null | "OCR" | "Excel" | "JSON" | "HL7"
  const [openDialog, setOpenDialog] = useState(null);

  const set = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleOk = (file) => {
    if (file) console.log(`[${openDialog}] file selected:`, file.name);
    setOpenDialog(null);
  };

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
            <Typography
              sx={{ fontWeight: 700, color: "#171923", fontSize: 20 }}
            >
              Add New Patient
            </Typography>
            <Typography sx={{ color: "#1A1A1A", mt: 0.3, fontSize: 14 }}>
              Complete all required fields to create a new patient
            </Typography>
          </Box>
          <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }}>
            <ToolbarBtn
              icon={<OcrIcon />}
              label="OCR"
              onClick={() => setOpenDialog("OCR")}
            />
            <ToolbarBtn
              icon={<ExcelIcon />}
              label="Excel"
              onClick={() => setOpenDialog("Excel")}
            />
            <ToolbarBtn
              icon={<JsonIcon />}
              label="JSON"
              onClick={() => setOpenDialog("JSON")}
            />
            <ToolbarBtn
              icon={<Hl7Icon />}
              label="HL7"
              onClick={() => setOpenDialog("HL7")}
            />
          </Stack>
        </Box>

        {/* ---- Upload Dialogs ---- */}
        {["OCR", "Excel", "JSON", "HL7"].map((type) => (
          <UploadDialog
            key={type}
            open={openDialog === type}
            type={type}
            onClose={() => setOpenDialog(null)}
            onOk={handleOk}
          />
        ))}

        {/* ---- ASSIGN ---- */}
        <Paper
          elevation={0}
          sx={{ borderRadius: "16px", p: "20px", mb: "16px", bgcolor: "#fff" }}
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
          sx={{ borderRadius: "16px", p: "20px", mb: "16px", bgcolor: "#fff" }}
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
          sx={{ borderRadius: "16px", p: "20px", mb: "16px", bgcolor: "#fff" }}
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
            onClick={() => navigate("/add-patient")}
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
