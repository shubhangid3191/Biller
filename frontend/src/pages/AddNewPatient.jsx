import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Dialog,
  FormControl,
  FormHelperText,
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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {
  OcrIcon,
  ExcelIcon,
  JsonIcon,
  Hl7Icon,
  CalendarIcon,
  DragFileIcon,
  UploadFileIcon,
} from "../assets/Assets";

// Required so dayjs can actually parse "DD-MM-YYYY" strings
dayjs.extend(customParseFormat);

const FONT = "'Inter', 'Segoe UI', sans-serif";
const DATE_FORMAT = "DD-MM-YYYY";

/* ------------------------------------------------------------------ */
/* Date helpers                                                         */
/* ------------------------------------------------------------------ */

// Auto-inserts dashes while typing: 25122024 -> 25-12-2024
const maskDate = (raw) => {
  const d = (raw || "").replace(/\D/g, "").slice(0, 8);
  let out = d.slice(0, 2);
  if (d.length > 2) out += "-" + d.slice(2, 4);
  if (d.length > 4) out += "-" + d.slice(4);
  return out;
};

// Strict parse: returns a valid dayjs object or null
const parseDate = (value) => {
  if (!value || value.length !== 10) return null;
  const parsed = dayjs(value, DATE_FORMAT, true);
  return parsed.isValid() ? parsed : null;
};

/* ------------------------------------------------------------------ */
/* Email validation                                                     */
/* ------------------------------------------------------------------ */
// name@domain.tld  (no spaces, one @, domain needs a dot, TLD >= 2 letters)
const EMAIL_REGEX =
  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;

// returns an error message, or "" when the email is valid
const getEmailError = (value) => {
  const v = (value || "").trim();
  if (!v) return "Email is required";
  if (v.length > 254) return "Email is too long";
  if (v.includes("..")) return "Enter a valid email address";
  if (!EMAIL_REGEX.test(v)) return "Enter a valid email address";
  return "";
};

/* ------------------------------------------------------------------ */
/* Required-field validation                                            */
/* field name -> text used in "<label> is required"                     */
/* ------------------------------------------------------------------ */
const REQUIRED_FIELDS = {
  provider: "Provider",
  specialty: "Specialty",
  location: "Location",
  admittingPhysician: "Admitting Physician",
  patientType: "Patient Type",
  mrn: "MRN",
  fin: "FIN",
  patientFirstName: "First name",
  patientMiddleName: "Middle name",
  patientLastName: "Last name",
  dateOfBirth: "Date of birth",
  email: "Email",
  admitDate: "Admit date",
  dateOfService: "Date of service",
  bed: "Bed",
};

const DATE_FIELDS = ["dateOfBirth", "admitDate", "dateOfService"];

// returns an error message, or "" when the field is fine
const validateField = (name, value) => {
  const v = String(value || "").trim();
  const label = REQUIRED_FIELDS[name];
  if (!label) return "";
  if (!v) return `${label} is required`;
  if (name === "email") return getEmailError(v);
  if (DATE_FIELDS.includes(name) && !parseDate(v))
    return "Enter a valid date (DD-MM-YYYY)";
  return "";
};

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
          fontFamily: FONT,
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
          "&.Mui-error fieldset": { borderColor: "#EF4444" },
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
    MuiMenuItem: { styleOverrides: { root: { fontSize: 13, fontFamily: FONT } } },
    MuiFormHelperText: { styleOverrides: { root: { fontFamily: FONT } } },
    MuiPickersDay: { styleOverrides: { root: { fontFamily: FONT } } },
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
          fontFamily: FONT,
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
          width: { xs: "calc(100vw - 24px)", sm: "560px" },
          maxWidth: { xs: "calc(100vw - 24px)", sm: "560px" },
          m: { xs: "12px", sm: "32px" },
          maxHeight: "calc(100% - 24px)",
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
          px: { xs: 2, sm: 2.5 },
          pt: { xs: 1.5, sm: 2 },
          pb: 1.5,
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: { xs: 16, sm: 18 },
            fontFamily: FONT,
            color: "#1D1B20",
          }}
        >
          {cfg.title}
        </Typography>
        <IconButton onClick={handleClose} sx={{ color: "#1D1B20", p: 0.5 }}>
          <CloseIcon sx={{ fontSize: 24 }} />
        </IconButton>
      </Box>

      {/* Content */}
      <Box sx={{ px: { xs: 2, sm: 2.5 }, pt: 1, pb: 0.5, overflowY: "auto" }}>
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
              fontSize: { xs: 13, sm: 14 },
              whiteSpace: "pre-line",
              wordBreak: "break-word",
            }}
          >
            {file ? file.name : cfg.hint}
          </Typography>
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
              fontSize: { xs: 13, sm: 14 },
            }}
          >
            Upload file from computer
          </Typography>
        </Box>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 1,
          p: { xs: 1.5, sm: 2 },
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
      fontFamily: FONT,
      fontSize: 12,
      lineHeight: "16px", // fixed height so labels stay aligned in every column
      fontWeight: 700,
      color: "#2F3036",
      mb: "6px",
    }}
  >
    {children}
    {required && (
      <Typography
        component="span"
        sx={{
          color: "#EF4444",
          ml: "2px",
          fontWeight: 700,
          fontSize: "inherit", // default span size (16px) was making the label taller
          lineHeight: "inherit",
          fontFamily: "inherit",
        }}
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
      fontFamily: FONT,
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
      fontFamily: FONT,
      fontWeight: 600,
      fontSize: { xs: 13, sm: 15 },
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

// Defined outside DropdownField so it isn't re-created on every render
const DropdownArrow = (props) => (
  <KeyboardArrowDownIcon {...props} sx={{ color: "#8F9098", fontSize: 20 }} />
);

const DropdownField = ({
  value,
  onChange,
  onClose,
  placeholder,
  error = false,
  helperText,
  children,
}) => (
  <FormControl fullWidth error={error}>
    <Select
      value={value}
      onChange={onChange}
      onClose={onClose}
      displayEmpty
      IconComponent={DropdownArrow}
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
        "&.Mui-error fieldset": { borderColor: "#EF4444" },
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
    {helperText && (
      <FormHelperText sx={{ mx: 0, mt: "3px", fontSize: 11, fontFamily: FONT }}>
        {helperText}
      </FormHelperText>
    )}
  </FormControl>
);

const TextInput = ({
  placeholder,
  value,
  onChange,
  onBlur,
  type = "text",
  error = false,
  helperText,
}) => (
  <TextField
    fullWidth
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    onBlur={onBlur}
    error={error}
    helperText={helperText}
    sx={{
      "& .MuiInputBase-root": { height: "42px" },
      "& .MuiFormHelperText-root": { mx: 0, fontSize: 11 },
    }}
  />
);

/* ------------------------------------------------------------------ */
/* DateInput — DD-MM-YYYY (typing is auto-masked, calendar popup too)  */
/* ------------------------------------------------------------------ */
const DateInput = ({
  value,
  onChange,
  onBlur,
  error = false,
  helperText,
  disableFuture = false,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const fieldRef = useRef(null);

  const open = Boolean(anchorEl);
  const parsedValue = parseDate(value);
  const isComplete = value.length === 10;
  const invalidFormat = isComplete && !parsedValue;
  const hasError = invalidFormat || error;
  const message = invalidFormat
    ? "Enter a valid date (DD-MM-YYYY)"
    : helperText;

  const emit = (v) => onChange({ target: { value: v } });

  const handleTyping = (e) => emit(maskDate(e.target.value));

  const handleDateChange = (newVal) => {
    if (newVal && newVal.isValid()) emit(newVal.format(DATE_FORMAT));
    setAnchorEl(null);
  };

  return (
    <>
      <TextField
        fullWidth
        ref={fieldRef}
        placeholder="DD-MM-YYYY"
        value={value}
        onChange={handleTyping}
        onBlur={onBlur}
        error={hasError}
        helperText={hasError ? message : undefined}
        inputProps={{ inputMode: "numeric", maxLength: 10 }}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end" sx={{ mr: "-4px" }}>
                <IconButton
                  onClick={() => setAnchorEl(fieldRef.current)}
                  sx={{ p: "4px", "&:hover": { background: "transparent" } }}
                  disableRipple
                  aria-label="Open calendar"
                >
                  <CalendarIcon width={14} height={16} color="#1E1E1E" />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
        sx={{
          "& .MuiInputBase-root": { height: "42px" },
          "& .MuiFormHelperText-root": { mx: 0, fontSize: 11 },
        }}
      />
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
            mt: 0.5,
            maxWidth: "calc(100vw - 16px)",
          },
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            value={parsedValue}
            onChange={handleDateChange}
            disableFuture={disableFuture}
            sx={{
              width: { xs: "280px", sm: "320px" },
              maxWidth: "100%",
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
  <Box
    sx={{ display: "flex", flexDirection: "column", width: "100%", minWidth: 0 }}
  >
    <FieldLabel required={required}>{label}</FieldLabel>
    {children}
  </Box>
);

/*
  Responsive grid:
    mobile  (<600px)   -> 1 column
    tablet  (600-900)  -> 2 columns
    desktop (>=900)    -> 3 columns
*/
const FieldRow = ({ children, mb = "16px" }) => (
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: {
        xs: "minmax(0, 1fr)",
        sm: "repeat(2, minmax(0, 1fr))",
        md: "repeat(3, minmax(0, 1fr))",
      },
      gap: "16px",
      mb,
    }}
  >
    {children}
  </Box>
);

/* ------------------------------------------------------------------ */
/* Main Component                                                       */
/* ------------------------------------------------------------------ */
const sectionSx = {
  borderRadius: "16px",
  p: { xs: "14px", sm: "20px" },
  mb: "16px",
  bgcolor: "#fff",
};

function AddNewPatient() {
  const navigate = useNavigate();

  // Load Inter from Google Fonts (only once)
  useEffect(() => {
    if (document.getElementById("inter-font")) return;
    const link = document.createElement("link");
    link.id = "inter-font";
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap";
    document.head.appendChild(link);
  }, []);
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

  // fields the user has visited (or tried to submit) -> their errors become visible
  const [touched, setTouched] = useState({});

  const set = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const touch = (name) =>
    setTouched((prev) => (prev[name] ? prev : { ...prev, [name]: true }));

  // error shows after the user leaves the field (or presses Add Patient),
  // then updates live while they fix it
  const errorOf = (name) =>
    touched[name] ? validateField(name, form[name]) : "";

  const errorProps = (name) => ({
    error: Boolean(errorOf(name)),
    helperText: errorOf(name) || undefined,
  });

  // props for text inputs and date inputs
  const tx = (name) => ({
    value: form[name],
    onChange: set(name),
    onBlur: () => touch(name),
    ...errorProps(name),
  });

  // props for dropdowns (error appears when the menu closes with nothing chosen)
  const dd = (name) => ({
    value: form[name],
    onChange: set(name),
    onClose: () => touch(name),
    ...errorProps(name),
  });

  const handleEmailBlur = () => {
    setForm((prev) => ({ ...prev, email: prev.email.trim() }));
    touch("email");
  };

  const handleAddPatient = () => {
    // show every error at once
    const allTouched = {};
    Object.keys(REQUIRED_FIELDS).forEach((name) => (allTouched[name] = true));
    setTouched(allTouched);

    const hasErrors = Object.keys(REQUIRED_FIELDS).some((name) =>
      validateField(name, form[name]),
    );
    if (hasErrors) {
      // bring the first error into view
      setTimeout(() => {
        document
          .querySelector(".Mui-error")
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 50);
      return;
    }
    // TODO: API call
    console.log("Patient data:", form);
  };

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
          p: { xs: 1.5, sm: 2.5 },
          boxSizing: "border-box",
          width: "100%",
          overflowX: "hidden",
        }}
      >
        {/* ---- Top Bar ---- */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            gap: 1.5,
            mb: "16px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <IconButton
              onClick={() => navigate(-1)}
              sx={{
                flexShrink: 0,
                color: "#5A6B7E",
                border: "1.5px solid #E4E9EF",
                borderRadius: "8px",
                width: 36,
                height: 36,
                "&:hover": {
                  bgcolor: "#F3F4F6",
                  borderColor: "#D1D5DB",
                },
              }}
            >
              <ArrowBackIcon sx={{ fontSize: 20 }} />
            </IconButton>
            <Box>
              <Typography
                sx={{
                  fontWeight: 700,
                  color: "#171923",
                  fontFamily: FONT,
                  fontSize: { xs: 18, sm: 20 },
                }}
              >
                Add New Patient
              </Typography>
              <Typography
                sx={{ color: "#1A1A1A", mt: 0.3, fontFamily: FONT, fontSize: { xs: 13, sm: 14 } }}
              >
                Complete all required fields to create a new patient
              </Typography>
            </Box>
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
        <Paper elevation={0} sx={sectionSx}>
          <SectionHeader title="ASSIGN" />
          <FieldRow>
            <FormField label="Provider" required>
              <DropdownField
                {...dd("provider")}
                placeholder="Select provider"
              >
                <MenuItem value="Dr. Smith">Dr. Smith</MenuItem>
                <MenuItem value="Dr. Jones">Dr. Jones</MenuItem>
              </DropdownField>
            </FormField>
            <FormField label="Specialty" required>
              <DropdownField
                {...dd("specialty")}
                placeholder="Select specialty"
              >
                <MenuItem value="Cardiology">Cardiology</MenuItem>
                <MenuItem value="Neurology">Neurology</MenuItem>
                <MenuItem value="Orthopedics">Orthopedics</MenuItem>
              </DropdownField>
            </FormField>
            <FormField label="Location" required>
              <DropdownField
                {...dd("location")}
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
                {...dd("admittingPhysician")}
                placeholder="Select provider"
              >
                <MenuItem value="Dr. Smith">Dr. Smith</MenuItem>
                <MenuItem value="Dr. Jones">Dr. Jones</MenuItem>
              </DropdownField>
            </FormField>
          </FieldRow>
        </Paper>

        {/* ---- BASIC INFORMATION ---- */}
        <Paper elevation={0} sx={sectionSx}>
          <SectionHeader title="BASIC INFORMATION" />
          <FieldRow>
            <FormField label="Patient Type" required>
              <DropdownField
                {...dd("patientType")}
                placeholder="Select patient type"
              >
                <MenuItem value="Outpatient">Outpatient</MenuItem>
                <MenuItem value="Inpatient">Inpatient</MenuItem>
              </DropdownField>
            </FormField>
            <FormField label="MRN" required>
              <TextInput
                placeholder="Medical record number"
                {...tx("mrn")}
              />
            </FormField>
            <FormField label="FIN" required>
              <DropdownField
                {...dd("fin")}
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
                {...tx("patientFirstName")}
              />
            </FormField>
            <FormField label="Patient Middle Name" >
              <TextInput
                placeholder="Middle name"
              />
            </FormField>
            <FormField label="Patient Last Name" required>
              <TextInput
                placeholder="Last name"
                {...tx("patientLastName")}
              />
            </FormField>
          </FieldRow>
          <FieldRow>
            <FormField label="Date of Birth" required>
              <DateInput
                {...tx("dateOfBirth")}
                disableFuture
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
          <FieldRow mb="0px">
            <FormField label="Email" >
              <TextInput
                placeholder="Enter email"
                type="email"
                onBlur={handleEmailBlur}
              />
            </FormField>
          </FieldRow>
        </Paper>

        {/* ---- VISIT DETAILS ---- */}
        <Paper elevation={0} sx={sectionSx}>
          <SectionHeader title="VISIT DETAILS" />
          <FieldRow>
            <FormField label="Admit Date" required>
              <DateInput {...tx("admitDate")} />
            </FormField>
            <FormField label="Date of Service" required>
              <DateInput
                {...tx("dateOfService")}
              />
            </FormField>
            <FormField label="Bed" required>
              <TextInput
                placeholder="Room 5 Bed 32"
                {...tx("bed")}
              />
            </FormField>
          </FieldRow>
          <FieldRow mb="0px">
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
          </FieldRow>
        </Paper>

        {/* ---- Footer Buttons ---- */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column-reverse", sm: "row" },
            justifyContent: "flex-end",
            gap: { xs: "10px", sm: "16px" },
            pt: 1,
            pb: 1,
          }}
        >
          <Button
            variant="outlined"
            onClick={() => navigate("/add-patient")}
            sx={{
              borderColor: "#2563EB",
              color: "#2563EB",
              px: 4,
              py: 1,
              fontSize: 14,
              fontWeight: 500,
              borderRadius: "8px",
              "&:hover": { borderColor: "#2563EB", background: "#EFF6FF" },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleAddPatient}
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