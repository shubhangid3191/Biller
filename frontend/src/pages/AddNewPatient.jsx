import React, { useRef, useState } from "react";
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
  Popover,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
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

// Required so dayjs can actually parse "MM-DD-YYYY" strings
dayjs.extend(customParseFormat);

const DATE_FORMAT = "MM-DD-YYYY";

/* ------------------------------------------------------------------ */
/* Design tokens                                                       */
/* ------------------------------------------------------------------ */

const T = {
  blue: "#2563EB",
  page: "#F5F7FA", // same page bg as the other pages
  border: "#E5E7EB",
  fieldBg: "#F9FAFC",
  label: "#2F3036",
  error: "#EF4444",
};

/* Same thin scrollbar as the other pages */
const thinScroll = {
  "&::-webkit-scrollbar": { width: "4px", height: "4px" },
  "&::-webkit-scrollbar-track": { backgroundColor: "transparent" },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#d1d5db",
    borderRadius: "2px",
  },
  "&::-webkit-scrollbar-thumb:hover": { backgroundColor: "#9ca3af" },
};

/* ------------------------------------------------------------------ */
/* Date helpers                                                        */
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
/* Email validation                                                    */
/* ------------------------------------------------------------------ */
const EMAIL_REGEX =
  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;

const getEmailError = (value) => {
  const v = (value || "").trim();
  if (!v) return "Email is required";
  if (v.length > 254) return "Email is too long";
  if (v.includes("..")) return "Enter a valid email address";
  if (!EMAIL_REGEX.test(v)) return "Enter a valid email address";
  return "";
};

/* ------------------------------------------------------------------ */
/* Required-field validation                                           */
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
  patientLastName: "Last name",
  dateOfBirth: "Date of birth",
  email: "Email",
  admitDate: "Admit date",
  dateOfService: "Date of service",
  bed: "Bed",
};

const DATE_FIELDS = ["dateOfBirth", "admitDate", "dateOfService"];

const validateField = (name, value) => {
  const v = String(value || "").trim();
  const label = REQUIRED_FIELDS[name];
  if (!label) return "";
  if (!v) return `${label} is required`;
  if (name === "email") return getEmailError(v);
  if (DATE_FIELDS.includes(name) && !parseDate(v))
    return "Enter a valid date (MM-DD-YYYY)";
  return "";
};

/* ------------------------------------------------------------------ */
/* Input styles (height 34, fontSize 12, radius 6)                      */
/* ------------------------------------------------------------------ */

const inputSx = {
  width: "100%",
  "& .MuiOutlinedInput-root": {
    height: 34,
    minHeight: 34,
    boxSizing: "border-box",
    fontSize: 12,
    borderRadius: "6px",
    backgroundColor: T.fieldBg,
    color: "#1F2937",

    "& fieldset": { borderColor: T.border },
    "&:hover fieldset": { borderColor: "#D1D5DB" },
    "&.Mui-focused fieldset": { borderColor: "#0066FF", borderWidth: "1px" },
    "&.Mui-error fieldset": { borderColor: T.error },

    "& input": {
      height: "100%",
      boxSizing: "border-box",
      padding: "0 10px",
      fontSize: 12,
      color: "#1F2937",
    },
    "& input::placeholder": { color: "#9CA3AF", opacity: 1 },
    "& .MuiInputAdornment-root": { marginRight: 0 },
  },

  "& .MuiFormHelperText-root": {
    fontSize: 10.5,
    mx: 0,
    ml: 0,
    mt: 0.4,
    color: T.error,
  },
};

const selectSx = (error = false) => ({
  height: 34,
  borderRadius: "6px",
  fontSize: 12,
  backgroundColor: T.fieldBg,
  color: "#1F2937",

  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: error ? T.error : T.border,
    borderRadius: "6px",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: error ? T.error : "#D1D5DB",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: error ? T.error : "#0066FF",
    borderWidth: "1px",
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
});

/* footer / toolbar button look (same as the other pages) */
const outlineBtnSx = {
  textTransform: "none",
  fontSize: 12,
  fontWeight: 600,
  height: 34,
  px: 2.5,
  borderRadius: "8px",
  color: "#0066FF",
  borderColor: "#0066FF",
  backgroundColor: "#FFFFFF",
  whiteSpace: "nowrap",
  "&:hover": { borderColor: "#0052CC", backgroundColor: "#F5F9FF" },
};

const primaryBtnSx = {
  textTransform: "none",
  fontSize: 12,
  fontWeight: 600,
  height: 34,
  px: 3,
  borderRadius: "8px",
  bgcolor: "#0066FF",
  boxShadow: "none",
  whiteSpace: "nowrap",
  "&:hover": { bgcolor: "#0052CC", boxShadow: "none" },
};

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
          borderRadius: "12px",
          p: 0,
          overflow: "hidden",
          width: { xs: "calc(100vw - 24px)", sm: "560px" },
          maxWidth: { xs: "calc(100vw - 24px)", sm: "560px" },
          m: { xs: "12px", sm: "32px" },
          maxHeight: "calc(100% - 24px)",
        },
      }}
      sx={{ "& .MuiDialog-container": { alignItems: "center" } }}
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
        <Typography sx={{ fontWeight: 700, fontSize: 13, color: "#1F2937" }}>
          {cfg.title}
        </Typography>
        <IconButton
          onClick={handleClose}
          aria-label="Close"
          sx={{ color: "#1D1B20", p: 0.5 }}
        >
          <CloseIcon sx={{ fontSize: 20 }} />
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
            borderRadius: "12px",
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
              fontSize: 12,
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
            borderRadius: "12px",
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
          <Typography sx={{ fontWeight: 500, color: "#7B89B2", fontSize: 12 }}>
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
        <Button variant="outlined" onClick={handleClose} sx={outlineBtnSx}>
          Cancel
        </Button>
        <Button
          variant="contained"
          disableElevation
          onClick={handleOk}
          disabled={!file || loading}
          sx={{
            ...primaryBtnSx,
            "&.Mui-disabled": { bgcolor: "#B3C9FF", color: "#fff" },
          }}
        >
          {loading ? "Processing..." : "OK"}
        </Button>
      </Box>
    </Dialog>
  );
};

/* ------------------------------------------------------------------ */
/* Shared components                                                   */
/* ------------------------------------------------------------------ */
const Label = ({ children, required }) => (
  <Typography
    component="label"
    sx={{
      fontSize: 11,
      fontWeight: 500,
      color: T.label,
      mb: 0.5,
      lineHeight: 1.4,
      display: "block",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    }}
  >
    {children}
    {required && (
      <Box component="span" sx={{ color: T.error, ml: 0.3 }}>
        *
      </Box>
    )}
  </Typography>
);

/* Section title (same as Fee Configuration) */
const SectionHeader = ({ title }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      minHeight: 28,
      mb: 1.2,
    }}
  >
    <Typography sx={{ fontSize: 13, fontWeight: 700, color: "#1F2937" }}>
      {title}
    </Typography>
  </Box>
);

const ToolbarBtn = ({ icon, label, onClick }) => (
  <Button
    variant="outlined"
    startIcon={icon}
    onClick={onClick}
    sx={{
      ...outlineBtnSx,
      height: 32,
      px: 1.5,
      minWidth: "unset",
      "& .MuiButton-startIcon": { mr: 0.5 },
      "&:hover": { borderColor: "#0066FF", backgroundColor: "#F5F9FF" },
    }}
  >
    {label}
  </Button>
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
  <FormControl fullWidth size="small" error={error}>
    <Select
      value={value ?? ""}
      onChange={onChange}
      onClose={onClose}
      displayEmpty
      sx={selectSx(error)}
      IconComponent={KeyboardArrowDownIcon}
      renderValue={(val) =>
        val ? (
          <span style={{ fontSize: 12, color: "#1F2937" }}>{val}</span>
        ) : (
          <span style={{ fontSize: 12, color: "#9CA3AF" }}>{placeholder}</span>
        )
      }
    >
      <MenuItem value="" disabled sx={{ fontSize: 12, color: "#9CA3AF" }}>
        {placeholder}
      </MenuItem>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, {
              sx: { fontSize: 12, ...(child.props.sx || {}) },
            })
          : child,
      )}
    </Select>
    {helperText && (
      <FormHelperText sx={{ fontSize: 10.5, mx: 0, mt: 0.4, color: T.error }}>
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
    size="small"
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    onBlur={onBlur}
    error={error}
    helperText={helperText}
    sx={inputSx}
  />
);

/* ------------------------------------------------------------------ */
/* DateInput — MM-DD-YYYY (typing is auto-masked, calendar popup too)  */
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
    ? "Enter a valid date (MM-DD-YYYY)"
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
        size="small"
        ref={fieldRef}
        placeholder="MM-DD-YYYY"
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
                  <CalendarIcon width={14} height={16} color="#0066FF" />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
        sx={inputSx}
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
                backgroundColor: "#0066FF",
              },
              "& .MuiPickersDay-root:hover": { backgroundColor: "#EEF4FF" },
            }}
          />
        </LocalizationProvider>
      </Popover>
    </>
  );
};

const FormField = ({ label, required, children }) => (
  <Box sx={{ minWidth: 0 }}>
    <Label required={required}>{label}</Label>
    {children}
  </Box>
);

/*
  Responsive grid:
    mobile  (<600px)   -> 1 column
    tablet  (600-900)  -> 2 columns
    desktop (>=900)    -> 3 columns
*/
const FieldRow = ({ children, cols = 3, last = false }) => (
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: {
        xs: "minmax(0, 1fr)",
        sm: "repeat(2, minmax(0, 1fr))",
        md: `repeat(${cols}, minmax(0, 1fr))`,
      },
      gap: 1.5,
      mb: last ? 0 : 1.5,
    }}
  >
    {children}
  </Box>
);

/* Section card (p 2, border, radius 8) */
const SectionBox = ({ children }) => (
  <Box
    sx={{
      backgroundColor: "#FFFFFF",
      borderRadius: "8px",
      border: `1px solid ${T.border}`,
      p: 2,
      boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
    }}
  >
    {children}
  </Box>
);

/* ------------------------------------------------------------------ */
/* Main Component                                                      */
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
    <Box
      sx={{
        bgcolor: T.page,
        minHeight: "100vh",
        width: "100%",
        py: 1,
        px: 2,
        boxSizing: "border-box",
        overflowX: "hidden",
        overflowY: "auto",
        ...thinScroll,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        {/* =========================================================
            TOP BAR
        ========================================================= */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            gap: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              onClick={() => navigate(-1)}
              aria-label="Go back"
              sx={{
                flexShrink: 0,
                color: "#5A6B7E",
                border: "1px solid #E5E7EB",
                bgcolor: "#FFFFFF",
                borderRadius: "8px",
                width: 32,
                height: 32,
                "&:hover": { bgcolor: "#F3F4F6", borderColor: "#D1D5DB" },
              }}
            >
              <ArrowBackIcon sx={{ fontSize: 18 }} />
            </IconButton>
            <Box>
              <Typography
                sx={{ fontSize: 16, fontWeight: 700, color: "#111827" }}
              >
                Add New Patient
              </Typography>
              <Typography sx={{ color: "#6B7280", mt: 0.2, fontSize: 11 }}>
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

        {/* =========================================================
            ASSIGN
        ========================================================= */}
        <SectionBox>
          <SectionHeader title="Assign" />

          <FieldRow>
            <FormField label="Provider" required>
              <DropdownField {...dd("provider")} placeholder="Select provider">
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
              <DropdownField {...dd("location")} placeholder="Select location">
                <MenuItem value="Ward A">Ward A</MenuItem>
                <MenuItem value="Ward B">Ward B</MenuItem>
                <MenuItem value="ICU">ICU</MenuItem>
              </DropdownField>
            </FormField>
          </FieldRow>

          <FieldRow last>
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
        </SectionBox>

        {/* =========================================================
            BASIC INFORMATION
        ========================================================= */}
        <SectionBox>
          <SectionHeader title="Basic Information" />

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
              <TextInput placeholder="Medical record number" {...tx("mrn")} />
            </FormField>

            <FormField label="FIN" required>
              <DropdownField {...dd("fin")} placeholder="Accession number">
                <MenuItem value="ACC-001">ACC-001</MenuItem>
                <MenuItem value="ACC-002">ACC-002</MenuItem>
              </DropdownField>
            </FormField>
          </FieldRow>

          <FieldRow>
            <FormField label="Patient First Name" required>
              <TextInput placeholder="First name" {...tx("patientFirstName")} />
            </FormField>

            <FormField label="Patient Middle Name">
              <TextInput
                placeholder="Middle name"
                value={form.patientMiddleName}
                onChange={set("patientMiddleName")}
              />
            </FormField>

            <FormField label="Patient Last Name" required>
              <TextInput placeholder="Last name" {...tx("patientLastName")} />
            </FormField>
          </FieldRow>

          <FieldRow>
            <FormField label="Date of Birth" required>
              <DateInput {...tx("dateOfBirth")} disableFuture />
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

          <FieldRow last>
            <FormField label="Email" required>
              <TextInput
                placeholder="Enter email"
                type="email"
                {...tx("email")}
                onBlur={handleEmailBlur}
              />
            </FormField>
          </FieldRow>
        </SectionBox>

        {/* =========================================================
            VISIT DETAILS
        ========================================================= */}
        <SectionBox>
          <SectionHeader title="Visit Details" />

          <FieldRow>
            <FormField label="Admit Date" required>
              <DateInput {...tx("admitDate")} />
            </FormField>

            <FormField label="Date of Service" required>
              <DateInput {...tx("dateOfService")} />
            </FormField>

            <FormField label="Bed" required>
              <TextInput placeholder="Room 5 Bed 32" {...tx("bed")} />
            </FormField>
          </FieldRow>

          <FieldRow last>
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
        </SectionBox>

        {/* =========================================================
            FOOTER BUTTONS
        ========================================================= */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column-reverse", sm: "row" },
            justifyContent: { xs: "stretch", sm: "flex-end" },
            gap: 1,
            pb: 1.5,
          }}
        >
          <Button
            variant="outlined"
            onClick={() => navigate("/add-patient")}
            sx={outlineBtnSx}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            disableElevation
            onClick={handleAddPatient}
            sx={primaryBtnSx}
          >
            Add Patient
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default AddNewPatient;
