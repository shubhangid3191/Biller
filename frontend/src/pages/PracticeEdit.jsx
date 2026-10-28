import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  IconButton,
  TextField,
  MenuItem,
  Select,
  FormControl,
  Switch,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { RPDeleteIcon, FileUploadOutlinedIcon } from "../assets/Assets";
import { savePractice } from "./Practice";

/* ------------------------------------------------------------------ */
/* Design tokens                                                       */
/* ------------------------------------------------------------------ */

const T = {
  blue: "#2563EB",
  page: "#F5F7FA", // same page bg as the other pages
  border: "#E5E7EB",
  fieldBg: "#fff",
  label: "#2F3036",
  error: "#EF4444",
  headBg: "#EBF1FE",
  headBorder: "#BED3FC",
  rowLine: "#EEF1F7",
};

const ICON_SIZE = { delete: 18, add: 16 };

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
/* Upload rules                                                        */
/* ------------------------------------------------------------------ */

const ACCEPTED_TYPES = [
  "image/svg+xml",
  "image/png",
  "image/jpeg",
  "image/gif",
];
const ACCEPT_ATTR =
  ".svg,.png,.jpg,.jpeg,.gif,image/svg+xml,image/png,image/jpeg,image/gif";
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB

const formatSize = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

/* ------------------------------------------------------------------ */
/* Validation                                                          */
/* ------------------------------------------------------------------ */

const PHONE_REGEX = /^\d{10}$/;
const PHONE_ERROR = "Enter a valid 10-digit number";

const REQUIRED_TEXT_FIELDS = {
  practiceName: "Practice Name",
  practiceCode: "Practice Short Code",
  npi: "NPI",
  ein: "EIN",
  sftpHost: "SFTP Host",
  sftpUsername: "SFTP Username",
  sftpPassword: "SFTP Password",
  sftpPort: "SFTP Port",
  practiceCodeField: "Practice Code",
  patientStatement: "Patient Statement Message",
  billingPhone: "Billing Question Phone",
  extension: "Extension",
};

const validateField = (name, value) => {
  const v = String(value ?? "").trim();
  if (!REQUIRED_TEXT_FIELDS[name]) return "";
  if (!v) return `${REQUIRED_TEXT_FIELDS[name]} is required`;
  if (name === "billingPhone" && !PHONE_REGEX.test(v)) return PHONE_ERROR;
  return "";
};

const ALL_REQUIRED = Object.fromEntries(
  Object.keys(REQUIRED_TEXT_FIELDS).map((k) => [k, ""]),
);

/* ------------------------------------------------------------------ */
/* Input styles (same as provider pages: height 34, fontSize 12, radius 6) */
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

/* Compact inputs used inside the address table */
const tblInputSx = {
  "& .MuiOutlinedInput-root": {
    height: 30,
    borderRadius: "6px",
    fontSize: 11,
    backgroundColor: T.fieldBg,
    "& fieldset": { borderColor: T.border },
    "&:hover fieldset": { borderColor: "#D1D5DB" },
    "&.Mui-focused fieldset": { borderColor: "#0066FF", borderWidth: "1px" },
    "& input": {
      height: "100%",
      boxSizing: "border-box",
      padding: "0 8px",
      fontSize: 11,
      color: "#1F2937",
    },
  },
  "& .MuiFormHelperText-root": { display: "none" },
};

const tblSelectSx = {
  height: 30,
  borderRadius: "6px",
  fontSize: 11,
  backgroundColor: T.fieldBg,
  color: "#1F2937",
  "& .MuiOutlinedInput-notchedOutline": { borderColor: T.border },
  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#D1D5DB" },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#0066FF",
    borderWidth: "1px",
  },
  "& .MuiSelect-select": {
    minHeight: "30px !important",
    height: "30px",
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    padding: "0 28px 0 8px !important",
    fontSize: 11,
  },
  "& .MuiSelect-icon": { color: "#6B7280", right: 4, fontSize: 16 },
};

/* ------------------------------------------------------------------ */
/* Shared components                                                   */
/* ------------------------------------------------------------------ */

function Label({ children, required }) {
  return (
    <Typography
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
}

function InputField({
  label,
  placeholder = "Type here",
  required,
  endIcon,
  value,
  onChange,
  onBlur,
  error,
  inputMode,
  maxLength,
  type,
}) {
  return (
    <Box sx={{ minWidth: 0 }}>
      <Label required={required}>{label}</Label>

      <TextField
        fullWidth
        size="small"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        error={!!error}
        helperText={error || ""}
        inputProps={{ inputMode, maxLength }}
        InputProps={
          endIcon
            ? {
                endAdornment: (
                  <InputAdornment position="end">{endIcon}</InputAdornment>
                ),
              }
            : undefined
        }
        sx={inputSx}
      />
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* Form Grid                                                           */
/* ------------------------------------------------------------------ */

function FormGrid({ children, cols = 4, last = false }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "1fr 1fr",
          md: `repeat(${cols}, minmax(0, 1fr))`,
        },
        gap: 1.5,
        mb: last ? 0 : 1.5,
      }}
    >
      {children}
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* Section Title / Header                                              */
/* ------------------------------------------------------------------ */

function SectionTitle({ children }) {
  return (
    <Typography
      sx={{
        fontSize: 13,
        fontWeight: 700,
        color: "#1F2937",
      }}
    >
      {children}
    </Typography>
  );
}

/* Title row (title on the left, optional action icon on the right) */
function SectionHeader({ title, action, mt = 0 }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        minHeight: 28,
        mb: 1.2,
        mt,
      }}
    >
      <SectionTitle>{title}</SectionTitle>
      {action}
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* Section Box (same card as provider pages: p 2, border, radius 8)     */
/* ------------------------------------------------------------------ */

function SectionBox({ children }) {
  return (
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
}

/* ------------------------------------------------------------------ */
/* Upload Box                                                          */
/*  - click (or Enter / Space) opens the device file browser            */
/*  - drag & drop also works                                            */
/*  - shows preview, file name and size, with a remove (X) button       */
/*  - allowed: SVG / PNG / JPG / GIF, max 2 MB                          */
/* ------------------------------------------------------------------ */

function UploadBox({ label, hint, file, onSelect, onRemove }) {
  const inputRef = React.useRef(null);
  const [dragOver, setDragOver] = React.useState(false);
  const [error, setError] = React.useState("");
  const [previewUrl, setPreviewUrl] = React.useState("");

  /* build / clean up the preview url whenever the file changes */
  React.useEffect(() => {
    if (!file) {
      setPreviewUrl("");
      return undefined;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const openBrowser = () => inputRef.current?.click();

  const handleFiles = (files) => {
    const f = files?.[0];
    if (!f) return;

    if (!ACCEPTED_TYPES.includes(f.type)) {
      setError("Only SVG, PNG, JPG or GIF files are allowed");
      return;
    }
    if (f.size > MAX_FILE_SIZE) {
      setError("File size must be 2 MB or less");
      return;
    }
    setError("");
    onSelect(f);
  };

  const handleInputChange = (e) => {
    handleFiles(e.target.files);
    /* reset so the same file can be picked again after removing it */
    e.target.value = "";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    setError("");
    onRemove();
  };

  return (
    <Box sx={{ minWidth: 0 }}>
      {/* hidden native file input */}
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT_ATTR}
        onChange={handleInputChange}
        style={{ display: "none" }}
        aria-label={label}
      />

      <Box
        role="button"
        tabIndex={0}
        aria-label={label}
        onClick={openBrowser}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openBrowser();
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        sx={{
          border: `1.5px dashed ${error ? T.error : dragOver ? "#0066FF" : "#BED3FC"}`,
          borderRadius: "8px",
          bgcolor: dragOver ? "#F4F8FF" : "#fff",
          px: 2,
          py: 1.5,
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          cursor: "pointer",
          outline: "none",
          transition: "background-color .15s, border-color .15s",
          "&:hover": { bgcolor: "#F4F8FF" },
          "&:focus-visible": { borderColor: "#0066FF" },
        }}
      >
        {/* icon  /  image preview */}
        {file && previewUrl ? (
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: "8px",
              border: `1px solid ${T.border}`,
              bgcolor: "#fff",
              overflow: "hidden",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              component="img"
              src={previewUrl}
              alt={`${label} preview`}
              sx={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </Box>
        ) : (
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              bgcolor: "#E6F1FE",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <FileUploadOutlinedIcon sx={{ color: T.blue, fontSize: 18 }} />
          </Box>
        )}

        {/* text */}
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography sx={{ fontSize: 12, fontWeight: 700, color: "#111827" }}>
            {label}
          </Typography>

          {file ? (
            <Typography
              noWrap
              title={file.name}
              sx={{ fontSize: 10.5, color: "#475569", lineHeight: 1.4 }}
            >
              {file.name} · {formatSize(file.size)}
            </Typography>
          ) : (
            <Typography
              sx={{ fontSize: 10.5, color: "#9CA3AF", lineHeight: 1.4 }}
            >
              {hint}
            </Typography>
          )}
        </Box>

        {/* remove */}
        {file && (
          <IconButton
            size="small"
            aria-label={`Remove ${label}`}
            onClick={handleRemove}
            sx={{
              p: "4px",
              flexShrink: 0,
              color: "#6B7280",
              "&:hover": { bgcolor: "#FEE2E2", color: T.error },
            }}
          >
            <CloseIcon sx={{ fontSize: 16 }} />
          </IconButton>
        )}
      </Box>

      {error && (
        <Typography sx={{ fontSize: 10.5, color: T.error, mt: 0.4 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* Address table                                                       */
/* ------------------------------------------------------------------ */

/* first row shown on the page (and used as a template when the list is empty) */
const DEFAULT_ADDRESS = {
  type: "Billing",
  addr1: "Prac1bill",
  addr2: "Prac2bill",
  zip: "15232-1545",
  city: "Washington",
  country: "USA",
  state: "Arizona",
  county: "Alpine",
  phone: "(599) 966-666",
  fax: "(120) 200-000",
  email: "billprac@ttest",
};

const INITIAL_ADDRESSES = [
  { ...DEFAULT_ADDRESS },
  { ...DEFAULT_ADDRESS, type: "Mailing" },
  { ...DEFAULT_ADDRESS },
];

const TYPE_OPTIONS = ["Billing", "Mailing"];
const STATE_OPTIONS = ["Arizona", "California", "Texas"];
const COUNTY_OPTIONS = ["Alpine", "Barry", "Clark"];

const addrCols = [
  "TYPE",
  "ADDRESS 1",
  "ADDRESS 2",
  "ZIP CODE",
  "CITY",
  "COUNTRY",
  "STATE",
  "COUNTY",
  "PHONE",
  "FAX",
  "E-MAIL",
  "ACTION",
];

const headCellSx = {
  bgcolor: T.headBg,
  fontSize: 11,
  fontWeight: 600,
  color: "#373B4D",
  borderBottom: "none",
  borderRight: `1px solid ${T.headBorder}`,
  py: 0.75,
  px: 1,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  letterSpacing: "0.04em",
};

const bodyCellSx = {
  borderBottom: `1px solid ${T.rowLine}`,
  p: "4px",
  fontSize: 11,
  color: "#2E2E2E",
  whiteSpace: "nowrap",
};

/* dropdown used inside the address table (controlled) */
function TblSelect({ value, options, onChange }) {
  return (
    <FormControl fullWidth size="small">
      <Select
        value={value}
        onChange={onChange}
        sx={tblSelectSx}
        IconComponent={KeyboardArrowDownIcon}
      >
        {options.map((o) => (
          <MenuItem key={o} value={o} sx={{ fontSize: 11 }}>
            {o}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

/* Address text shown in the table: "Address 1, Address 2, City, State Zip" */
const buildAddress = (a = {}) => {
  const stateZip = [a.state, a.zip]
    .map((s) => String(s ?? "").trim())
    .filter(Boolean)
    .join(" ");
  return [a.addr1, a.addr2, a.city, stateZip]
    .map((s) => String(s ?? "").trim())
    .filter(Boolean)
    .join(", ");
};

const onlyDigits = (s) => String(s ?? "").replace(/\D/g, "");

/* ------------------------------------------------------------------ */
/* Main Page                                                           */
/* ------------------------------------------------------------------ */

export default function PracticeEdit() {
  const navigate = useNavigate();
  const { state: routeState } = useLocation();
  const row = routeState?.row ?? null;
  const isEdit = row !== null;

  /* full form saved earlier (so re-opening a saved row shows every field) */
  const saved = row?.details;

  const [active, setActive] = React.useState(row?.active ?? true);

  /* uploaded files (File objects from the device) */
  const [logoFile, setLogoFile] = React.useState(null);
  const [qrFile, setQrFile] = React.useState(null);

  const [form, setForm] = React.useState(() => ({
    practiceName: row?.practice ?? "",
    practiceCode: "",
    npi: row?.npi ?? "",
    ein: "",
    sftpHost: "",
    sftpUsername: "",
    sftpPassword: "",
    sftpPort: "",
    practiceCodeField: "",
    patientStatement: "",
    billingPhone: row?.contact ?? "",
    extension: "",
    ...(saved?.form ?? {}),
  }));

  /* touched mirrors ALL_REQUIRED keys */
  const [touched, setTouched] = React.useState({});

  /* ---------- address rows (+ adds a row, delete icon removes it) ---------- */
  const [addresses, setAddresses] = React.useState(() => {
    /* saved earlier -> restore exactly */
    if (saved?.addresses) return saved.addresses;
    /* existing table row that was never edited here -> one line from the table values */
    if (isEdit)
      return [
        {
          id: 1,
          type: "Billing",
          addr1: row.address ?? "",
          addr2: "",
          zip: "",
          city: "",
          country: "",
          state: "",
          county: "",
          phone: row.workPhone ?? "",
          fax: row.fax ?? "",
          email: "",
        },
      ];
    /* new practice -> default template rows */
    return INITIAL_ADDRESSES.map((a, i) => ({ id: i + 1, ...a }));
  });
  const nextAddrId = React.useRef(
    Math.max(0, ...addresses.map((a) => a.id)) + 1,
  );

  /* adds the same line again (a copy of the last row) */
  const addAddress = () =>
    setAddresses((prev) => {
      const last = prev[prev.length - 1];
      const { id: _ignored, ...values } = last || DEFAULT_ADDRESS;
      return [...prev, { ...values, id: nextAddrId.current++ }];
    });

  const deleteAddress = (id) =>
    setAddresses((prev) => prev.filter((a) => a.id !== id));

  const updateAddress = (id, key) => (e) => {
    const val = e.target.value;
    setAddresses((prev) =>
      prev.map((a) => (a.id === id ? { ...a, [key]: val } : a)),
    );
  };

  /* ---------- helpers ---------- */
  const set = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  /* phone fields: digits only, max 10 */
  const setPhone = (field) => (e) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
    setForm((prev) => ({ ...prev, [field]: digits }));
  };

  const touch = (name) =>
    setTouched((prev) => (prev[name] ? prev : { ...prev, [name]: true }));

  /* error shows only after the user has visited the field (or pressed Save) */
  const errorOf = (name) =>
    touched[name] ? validateField(name, form[name]) : "";

  /* props helper */
  const tx = (name) => ({
    value: form[name],
    onChange: name === "billingPhone" ? setPhone(name) : set(name),
    onBlur: () => touch(name),
    error: errorOf(name),
  });

  /* ---------- save ---------- */
  const handleSave = () => {
    const allTouched = Object.fromEntries(
      Object.keys(ALL_REQUIRED).map((k) => [k, true]),
    );
    setTouched(allTouched);

    const hasErrors = Object.keys(ALL_REQUIRED).some((name) =>
      validateField(name, form[name]),
    );
    if (hasErrors) {
      setTimeout(() => {
        document
          .querySelector(".Mui-error")
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 50);
      return;
    }

    /* valid -> save to the shared store (table updates), then go back.
       Table columns come from the first address line:
       Address / Work Phone / Fax.  Logo & QR files are not stored
       (File objects can't be kept) - upload them with FormData to your API. */
    const first = addresses[0] ?? {};
    savePractice({
      ...(isEdit ? { id: row.id } : {}),
      practice: form.practiceName.trim(),
      address: buildAddress(first),
      contact: form.billingPhone,
      workPhone: onlyDigits(first.phone),
      fax: onlyDigits(first.fax),
      npi: form.npi.trim(),
      active,
      details: { form, addresses },
    });
    navigate(-1);
  };

  /* footer button look (same as provider pages) */
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
        }}
      >
        {/* =========================================================
            TITLE
        ========================================================= */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
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

            <Typography
              sx={{
                fontSize: 16,
                fontWeight: 700,
                color: "#111827",
              }}
            >
              {isEdit ? "Edit Practice" : "Add Practice"}
            </Typography>
          </Box>
        </Box>

        {/* =========================================================
            MAIN BOX
        ========================================================= */}

        <SectionBox>
          <SectionHeader title="Basic Details" />

          {/* Row 1 */}
          <FormGrid>
            <InputField
              label="Practice Name"
              required
              {...tx("practiceName")}
            />
            <InputField
              label="Practice Short Code"
              required
              {...tx("practiceCode")}
            />
            <InputField label="NPI" required {...tx("npi")} />
            <InputField label="EIN" required {...tx("ein")} />
          </FormGrid>

          {/* Row 2 — Active toggle + SFTP fields */}
          <FormGrid>
            {/* Active toggle (same look as the other inputs) */}
            <Box sx={{ minWidth: 0 }}>
              <Label>Active</Label>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  border: `1px solid ${T.border}`,
                  borderRadius: "6px",
                  px: "10px",
                  height: 34,
                  bgcolor: T.fieldBg,
                  boxSizing: "border-box",
                  transition: "border-color 0.15s",
                  "&:hover": { borderColor: "#D1D5DB" },
                  "&:focus-within": { borderColor: "#0066FF" },
                }}
              >
                <Typography
                  sx={{ fontSize: 12, color: active ? "#1F2937" : "#9CA3AF" }}
                >
                  {active ? "Yes" : "No"}
                </Typography>

                <Switch
                  size="small"
                  checked={active}
                  onChange={(e) => setActive(e.target.checked)}
                  inputProps={{ "aria-label": "Active" }}
                  sx={{
                    mr: -0.5,
                    "& .MuiSwitch-switchBase": { color: "#fff" },
                    "& .MuiSwitch-switchBase.Mui-checked": { color: "#fff" },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      bgcolor: "#22C55E",
                      opacity: 1,
                    },
                    "& .MuiSwitch-track": {
                      borderRadius: 20,
                      bgcolor: "#D1D5DB",
                      opacity: 1,
                    },
                  }}
                />
              </Box>
            </Box>

            <InputField label="SFTP Host" required {...tx("sftpHost")} />
            <InputField
              label="SFTP Username"
              required
              {...tx("sftpUsername")}
            />
            <InputField
              label="SFTP Password"
              required
              type="password"
              {...tx("sftpPassword")}
            />
          </FormGrid>

          {/* Row 3 */}
          <FormGrid>
            <InputField label="SFTP Port" required {...tx("sftpPort")} />
            <InputField
              label="Practice Code"
              required
              {...tx("practiceCodeField")}
            />
          </FormGrid>

          {/* ---------------- Patient Statement ---------------- */}
          <SectionHeader title="Patient Statement" mt={1.5} />

          <FormGrid>
            <InputField
              label="Patient Statement Message"
              required
              {...tx("patientStatement")}
            />

            <InputField
              label="Billing Question Phone"
              required
              inputMode="numeric"
              maxLength={10}
              {...tx("billingPhone")}
            />

            <InputField label="Extension" required {...tx("extension")} />
          </FormGrid>

          {/* ---------------- Uploads ---------------- */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: 1.5,
              alignItems: "start",
            }}
          >
            <UploadBox
              label="Upload Practice Logo"
              hint="SVG, PNG, JPG or GIF (max. 2 MB)"
              file={logoFile}
              onSelect={setLogoFile}
              onRemove={() => setLogoFile(null)}
            />

            <UploadBox
              label="Upload Practice QR"
              hint="SVG, PNG, JPG or GIF (max. 2 MB)"
              file={qrFile}
              onSelect={setQrFile}
              onRemove={() => setQrFile(null)}
            />
          </Box>

          {/* ---------------- Address Details ---------------- */}
          <SectionHeader
            title="Address Details"
            mt={2}
            action={
              <IconButton
                size="small"
                aria-label="Add address"
                onClick={addAddress}
                sx={{
                  bgcolor: "#EEF4FF",
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  "&:hover": { bgcolor: "#DCE8FD" },
                }}
              >
                <AddIcon sx={{ fontSize: ICON_SIZE.add, color: T.blue }} />
              </IconButton>
            }
          />

          {/* ADDRESS TABLE */}
          <TableContainer
            sx={{
              width: "100%",
              border: `1px solid ${T.headBorder}`,
              borderRadius: "8px",
              overflowX: "auto",
              ...thinScroll,
            }}
          >
            <Table
              size="small"
              sx={{
                width: "100%",
                minWidth: 1100,
                tableLayout: "fixed",
                borderCollapse: "collapse",
              }}
            >
              <TableHead>
                <TableRow>
                  {addrCols.map((col, i) => (
                    <TableCell
                      key={col}
                      sx={{
                        ...headCellSx,
                        borderRight:
                          i === addrCols.length - 1
                            ? "none"
                            : `1px solid ${T.headBorder}`,
                      }}
                    >
                      {col}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {addresses.map((addr) => (
                  <TableRow
                    key={addr.id}
                    hover
                    sx={{
                      "&:hover": { bgcolor: "#FAFBFE" },
                      "&:last-child td": { borderBottom: "none" },
                    }}
                  >
                    {/* TYPE */}
                    <TableCell sx={bodyCellSx}>
                      <TblSelect
                        value={addr.type}
                        options={TYPE_OPTIONS}
                        onChange={updateAddress(addr.id, "type")}
                      />
                    </TableCell>

                    {/* ADDRESS 1, ADDRESS 2, ZIP, CITY, COUNTRY */}
                    {["addr1", "addr2", "zip", "city", "country"].map((k) => (
                      <TableCell key={k} sx={bodyCellSx}>
                        <TextField
                          size="small"
                          fullWidth
                          value={addr[k]}
                          onChange={updateAddress(addr.id, k)}
                          sx={tblInputSx}
                        />
                      </TableCell>
                    ))}

                    {/* STATE */}
                    <TableCell sx={bodyCellSx}>
                      <TblSelect
                        value={addr.state}
                        options={STATE_OPTIONS}
                        onChange={updateAddress(addr.id, "state")}
                      />
                    </TableCell>

                    {/* COUNTY */}
                    <TableCell sx={bodyCellSx}>
                      <TblSelect
                        value={addr.county}
                        options={COUNTY_OPTIONS}
                        onChange={updateAddress(addr.id, "county")}
                      />
                    </TableCell>

                    {/* PHONE, FAX, E-MAIL */}
                    {["phone", "fax", "email"].map((k) => (
                      <TableCell key={k} sx={bodyCellSx}>
                        <TextField
                          size="small"
                          fullWidth
                          value={addr[k]}
                          onChange={updateAddress(addr.id, k)}
                          sx={tblInputSx}
                        />
                      </TableCell>
                    ))}

                    {/* ACTION */}
                    <TableCell
                      sx={{
                        ...bodyCellSx,
                        borderRight: "none",
                        textAlign: "center",
                      }}
                    >
                      <IconButton
                        size="small"
                        aria-label="Delete address"
                        onClick={() => deleteAddress(addr.id)}
                        sx={{ p: "4px", "&:hover": { bgcolor: "#EEF4FF" } }}
                      >
                        <RPDeleteIcon
                          width={ICON_SIZE.delete}
                          height={ICON_SIZE.delete}
                          color={T.blue}
                        />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}

                {/* empty state (all rows deleted) */}
                {addresses.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={addrCols.length}
                      align="center"
                      sx={{
                        py: 3,
                        fontSize: 12,
                        color: "#6B7280",
                        borderBottom: "none",
                      }}
                    >
                      No address added. Click + to add one.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
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
            onClick={() => navigate(-1)}
            sx={outlineBtnSx}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            disableElevation
            onClick={handleSave}
            sx={primaryBtnSx}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
