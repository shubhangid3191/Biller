import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  MenuItem,
  Select,
  FormControl,
  FormHelperText,
  Switch,
  Popover,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import { RPAddIcon, RPDeleteIcon, CalendarIcon } from "../assets/Assets";
import { saveProvider } from "./ReferringProvider";

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
};

const ICON_SIZE = {
  delete: 18,
  add: 14,
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
/* Dropdown options                                                    */
/* ------------------------------------------------------------------ */

const OPTIONS = {
  sex: ["Male", "Female", "Other"],
  suffix: ["Jr.", "Sr.", "III"],
  prefix: ["Dr.", "Mr.", "Ms."],
  practice: ["Fresh Original", "Hitex", "Balance Report"],
  address2: ["Suite 100", "Apt 2B", "Floor 3"],
  country: ["United States", "Canada", "India"],
  state: ["California", "Texas", "New York"],
  fax: ["8475875747", "8475875748", "8475875749"],
  email: ["lipsum@gmail.com", "provider@gmail.com", "info@gmail.com"],
  specialty: ["Cardiology", "Neurology", "Orthopedics"],
};

/* ------------------------------------------------------------------ */
/* Validation                                                          */
/* ------------------------------------------------------------------ */

const PHONE_REGEX = /^\d{10}$/;
const PHONE_ERROR = "Enter a valid 10-digit number";

/* Required text/phone fields → label shown in error messages.
   (Specialty & Taxonomy are validated per row, see specialties state.) */
const REQUIRED_TEXT_FIELDS = {
  firstName: "First Name",
  lastName: "Last Name",
  dateOfBirth: "Date of Birth",
  npi: "National Provider Identifier",
  stateLicense: "State License Number",
  mobilePhone: "Mobile Phone",
  phone: "Phone",
};

/* Required select fields → label shown in error messages */
const REQUIRED_SELECT_FIELDS = {
  sex: "Sex",
  practice: "Practice",
  fax: "Fax",
  email: "E-mail",
};

const validateField = (name, value) => {
  const v = String(value ?? "").trim();
  if (REQUIRED_TEXT_FIELDS[name]) {
    if (!v) return `${REQUIRED_TEXT_FIELDS[name]} is required`;
    if ((name === "mobilePhone" || name === "phone") && !PHONE_REGEX.test(v))
      return PHONE_ERROR;
  }
  if (REQUIRED_SELECT_FIELDS[name]) {
    if (!v) return `${REQUIRED_SELECT_FIELDS[name]} is required`;
  }
  return "";
};

const ALL_REQUIRED = {
  ...Object.fromEntries(Object.keys(REQUIRED_TEXT_FIELDS).map((k) => [k, ""])),
  ...Object.fromEntries(
    Object.keys(REQUIRED_SELECT_FIELDS).map((k) => [k, ""]),
  ),
};

/* ------------------------------------------------------------------ */
/* Input styles (same as NewPayment: height 34, fontSize 12, radius 6)  */
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
  value,
  onChange,
  onBlur,
  error,
  inputMode,
  maxLength,
}) {
  return (
    <Box sx={{ minWidth: 0 }}>
      <Label required={required}>{label}</Label>

      <TextField
        fullWidth
        size="small"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        error={!!error}
        helperText={error || ""}
        inputProps={{
          inputMode,
          maxLength,
        }}
        sx={inputSx}
      />
    </Box>
  );
}

function SelectField({
  label,
  placeholder = "Select",
  options = [],
  required,
  value,
  onChange,
  onClose,
  error,
}) {
  /* keep the current value selectable even if it is not in `options`
     (e.g. a practice list like "Hitex, Fresh" coming from the table) */
  const opts =
    value && !options.includes(value) ? [value, ...options] : options;

  return (
    <Box sx={{ minWidth: 0 }}>
      <Label required={required}>{label}</Label>

      <FormControl fullWidth size="small" error={!!error}>
        <Select
          displayEmpty
          value={value}
          onChange={onChange}
          onClose={onClose}
          sx={selectSx(!!error)}
          IconComponent={KeyboardArrowDownIcon}
          renderValue={(val) =>
            val ? (
              <span style={{ fontSize: 12, color: "#1F2937" }}>{val}</span>
            ) : (
              <span style={{ fontSize: 12, color: "#9CA3AF" }}>
                {placeholder}
              </span>
            )
          }
        >
          <MenuItem value="" sx={{ fontSize: 12, color: "#9CA3AF" }}>
            {placeholder}
          </MenuItem>

          {opts.map((o) => (
            <MenuItem key={o} value={o} sx={{ fontSize: 12 }}>
              {o}
            </MenuItem>
          ))}
        </Select>

        {error && (
          <FormHelperText
            sx={{ fontSize: 10.5, mx: 0, mt: 0.4, color: T.error }}
          >
            {error}
          </FormHelperText>
        )}
      </FormControl>
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* Date field                                                          */
/* ------------------------------------------------------------------ */

function DateField({
  label,
  value,
  onChange,
  onBlur,
  required,
  error,
  placeholder = "MM-DD-YYYY",
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClose = () => {
    setAnchorEl(null);
    if (onBlur) onBlur();
  };

  const handleDateChange = (newVal) => {
    if (newVal) {
      onChange({
        target: {
          value: newVal.format("MM-DD-YYYY"),
        },
      });
    }

    handleClose();
  };

  const parsed = value ? dayjs(value, "MM-DD-YYYY") : null;
  const parsedValue = parsed && parsed.isValid() ? parsed : null;

  return (
    <Box sx={{ minWidth: 0 }}>
      <Label required={required}>{label}</Label>

      <TextField
        fullWidth
        size="small"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        error={!!error}
        helperText={error || ""}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end" sx={{ mr: "-4px" }}>
                <IconButton
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                  aria-label="Open calendar"
                  sx={{
                    p: "4px",
                    "&:hover": { background: "transparent" },
                  }}
                  disableRipple
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
        open={Boolean(anchorEl)}
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
            disableFuture
            sx={{
              width: { xs: "280px", sm: "320px" },
              "& .MuiPickersDay-root.Mui-selected": {
                backgroundColor: "#0066FF",
              },
              "& .MuiPickersDay-root:hover": { backgroundColor: "#EEF4FF" },
            }}
          />
        </LocalizationProvider>
      </Popover>
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
/* Section Title                                                       */
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
function SectionHeader({ title, action }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        minHeight: 28,
        mb: 1.2,
      }}
    >
      <SectionTitle>{title}</SectionTitle>
      {action}
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* Section Box (same card as NewPayment: p 2, border, radius 8)         */
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

/* Address text shown in the table: "Address 1, Address 2, City, State Zip" */
const buildAddress = (f) => {
  const stateZip = [f.state, f.zipCode]
    .map((s) => String(s ?? "").trim())
    .filter(Boolean)
    .join(" ");
  return [f.address1, f.address2, f.city, stateZip]
    .map((s) => String(s ?? "").trim())
    .filter(Boolean)
    .join(", ");
};

/* ------------------------------------------------------------------ */
/* Main Page                                                           */
/* ------------------------------------------------------------------ */

export default function ReferringProviderEdit() {
  const navigate = useNavigate();
  const { state: routeState } = useLocation();
  const row = routeState?.row ?? null;
  const isEdit = row !== null;

  /* full form saved earlier (so re-opening a saved row shows every field) */
  const saved = row?.details;

  const [pcp, setPcp] = React.useState(saved?.pcp ?? true);

  const [form, setForm] = React.useState(() => ({
    firstName: row?.providerName?.split(" ")[0] ?? "",
    lastName: row?.providerName?.split(" ").slice(1).join(" ") ?? "",
    dateOfBirth: "",
    sex: "",
    suffix: "",
    prefix: "",
    npi: row?.npi ?? "",
    groupNpi: "",
    stateLicense: "",
    controlledSubstance: "",
    dea: "",
    practice: row?.practice ?? "",
    addressType: "",
    address1: row?.address ?? "",
    address2: "",
    zipCode: "",
    city: "",
    country: "",
    state: "",
    mobilePhone: row?.mobile ?? "",
    workContact: "",
    phone: "",
    fax: row?.fax ?? "",
    email: row?.email ?? "",
    ...(saved?.form ?? {}),
  }));

  /* touched mirrors ALL_REQUIRED keys */
  const [touched, setTouched] = React.useState({});

  /* ---------- Specialty & Taxonomy rows ---------- */
  const [specialties, setSpecialties] = React.useState(() =>
    saved?.specialties?.length
      ? saved.specialties
      : [{ id: 1, specialty: "", taxonomy: "" }],
  );
  const [specTouched, setSpecTouched] = React.useState({});
  const nextSpecId = React.useRef(
    Math.max(0, ...specialties.map((r) => r.id)) + 1,
  );

  const addSpecialty = () =>
    setSpecialties((prev) => [
      ...prev,
      { id: nextSpecId.current++, specialty: "", taxonomy: "" },
    ]);

  /* delete a row; if it is the only row, just clear it (form never goes empty) */
  const removeSpecialty = (id) => {
    setSpecialties((prev) =>
      prev.length > 1
        ? prev.filter((r) => r.id !== id)
        : [{ id, specialty: "", taxonomy: "" }],
    );
    setSpecTouched((prev) => {
      const next = { ...prev };
      delete next[`${id}-specialty`];
      delete next[`${id}-taxonomy`];
      return next;
    });
  };

  const updateSpecialty = (id, field, value) =>
    setSpecialties((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)),
    );

  const touchSpec = (id, field) =>
    setSpecTouched((prev) => ({ ...prev, [`${id}-${field}`]: true }));

  const specError = (r, field) =>
    specTouched[`${r.id}-${field}`] && !String(r[field]).trim()
      ? `${field === "specialty" ? "Specialty" : "Taxonomy"} is required`
      : "";

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

  /* error shows only after the user has visited the field */
  const errorOf = (name) =>
    touched[name] ? validateField(name, form[name]) : "";

  /* props helpers */
  const tx = (name) => ({
    value: form[name],
    onChange:
      name === "mobilePhone" || name === "phone" || name === "workContact"
        ? setPhone(name)
        : set(name),
    onBlur: () => touch(name),
    error: errorOf(name),
  });

  const sel = (name) => ({
    value: form[name],
    onChange: set(name),
    onClose: () => touch(name),
    error: errorOf(name),
  });

  /* ---------- save ---------- */
  const handleSave = () => {
    /* mark every required field as touched */
    const allTouched = Object.fromEntries(
      Object.keys(ALL_REQUIRED).map((k) => [k, true]),
    );
    setTouched(allTouched);

    /* mark every specialty/taxonomy row as touched */
    const specAllTouched = {};
    specialties.forEach((r) => {
      specAllTouched[`${r.id}-specialty`] = true;
      specAllTouched[`${r.id}-taxonomy`] = true;
    });
    setSpecTouched(specAllTouched);

    const hasErrors = Object.keys(ALL_REQUIRED).some((name) =>
      validateField(name, form[name]),
    );
    const specHasErrors = specialties.some(
      (r) => !r.specialty.trim() || !r.taxonomy.trim(),
    );

    if (hasErrors || specHasErrors) {
      setTimeout(() => {
        document
          .querySelector(".Mui-error")
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 50);
      return;
    }

    /* valid -> save to the shared store (table updates), then go back */
    saveProvider({
      ...(isEdit ? { id: row.id } : {}),
      providerName: `${form.firstName.trim()} ${form.lastName.trim()}`.trim(),
      address: buildAddress(form),
      npi: form.npi.trim(),
      fax: form.fax,
      mobile: form.mobilePhone,
      email: form.email,
      practice: form.practice,
      details: { form, pcp, specialties },
    });
    navigate(-1);
  };

  /* footer / header button look (same as NewPayment buttons) */
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
              {isEdit ? "Edit Referring Provider" : "Add Referring Provider"}
            </Typography>
          </Box>
        </Box>

        {/* =========================================================
            BASIC DETAILS
        ========================================================= */}

        <SectionBox>
          <SectionHeader title="Basic Details" />

          <FormGrid>
            <InputField label="First Name" required {...tx("firstName")} />

            <InputField label="Last Name" required {...tx("lastName")} />

            <DateField label="Date of Birth" required {...tx("dateOfBirth")} />

            <SelectField
              label="Sex"
              required
              options={OPTIONS.sex}
              {...sel("sex")}
            />
          </FormGrid>

          <FormGrid>
            <SelectField
              label="Select suffix"
              options={OPTIONS.suffix}
              value={form.suffix}
              onChange={set("suffix")}
            />

            <SelectField
              label="Select prefix"
              options={OPTIONS.prefix}
              value={form.prefix}
              onChange={set("prefix")}
            />

            <InputField
              label="National Provider Identifier"
              required
              {...tx("npi")}
            />

            <InputField
              label="Group NPI"
              value={form.groupNpi}
              onChange={set("groupNpi")}
            />
          </FormGrid>

          <FormGrid>
            <InputField
              label="State License Number"
              required
              {...tx("stateLicense")}
            />

            <InputField
              label="State Controlled Substance Number"
              value={form.controlledSubstance}
              onChange={set("controlledSubstance")}
            />

            <InputField
              label="DEA Number"
              placeholder="Type here"
              value={form.dea}
              onChange={set("dea")}
            />

            <SelectField
              label="Practice"
              required
              options={OPTIONS.practice}
              {...sel("practice")}
            />
          </FormGrid>

          {/* PCP Toggle (same width as one grid column) */}
          <Box
            sx={{
              width: {
                xs: "100%",
                sm: "calc((100% - 12px) / 2)",
                md: "calc((100% - 36px) / 4)",
              },
            }}
          >
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
                "&:hover": { borderColor: "#D1D5DB" },
              }}
            >
              <Typography sx={{ fontSize: 12, color: "#1F2937" }}>
                PCP
              </Typography>

              <Switch
                size="small"
                checked={pcp}
                onChange={(e) => setPcp(e.target.checked)}
                sx={{
                  mr: -0.5,
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: "#fff",
                  },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                    bgcolor: "#22C55E",
                    opacity: 1,
                  },
                  "& .MuiSwitch-track": {
                    borderRadius: 20,
                  },
                }}
              />
            </Box>
          </Box>
        </SectionBox>

        {/* =========================================================
            ADDRESS
        ========================================================= */}

        <SectionBox>
          <SectionHeader
            title="Address"
            action={
              <IconButton
                size="small"
                aria-label="Delete address"
                sx={{
                  p: "4px",
                  "&:hover": { bgcolor: "#EEF4FF" },
                }}
              >
                <RPDeleteIcon
                  width={ICON_SIZE.delete}
                  height={ICON_SIZE.delete}
                  color={T.blue}
                />
              </IconButton>
            }
          />

          {/* Row 1 */}
          <FormGrid>
            <InputField
              label="Address Type"
              placeholder="Basic"
              value={form.addressType}
              onChange={set("addressType")}
            />

            <InputField
              label="Address 1"
              placeholder="Address 1"
              value={form.address1}
              onChange={set("address1")}
            />

            <SelectField
              label="Address 2"
              placeholder="Address 2"
              options={OPTIONS.address2}
              value={form.address2}
              onChange={set("address2")}
            />

            <InputField
              label="Zip Code"
              value={form.zipCode}
              onChange={set("zipCode")}
            />
          </FormGrid>

          {/* Row 2 */}
          <FormGrid>
            <InputField label="City" value={form.city} onChange={set("city")} />

            <SelectField
              label="State"
              options={OPTIONS.state}
              value={form.state}
              onChange={set("state")}
            />

            <SelectField
              label="Country"
              options={OPTIONS.country}
              value={form.country}
              onChange={set("country")}
            />

            <InputField
              label="Mobile Phone"
              required
              inputMode="numeric"
              maxLength={10}
              {...tx("mobilePhone")}
            />
          </FormGrid>

          {/* Row 3 */}
          <FormGrid last>
            <InputField
              label="Work Contact No."
              inputMode="numeric"
              maxLength={10}
              value={form.workContact}
              onChange={setPhone("workContact")}
              onBlur={() => {
                if (form.workContact && !PHONE_REGEX.test(form.workContact))
                  touch("workContact");
              }}
              error={
                form.workContact && !PHONE_REGEX.test(form.workContact)
                  ? PHONE_ERROR
                  : ""
              }
            />

            <InputField
              label="Phone"
              required
              inputMode="numeric"
              maxLength={10}
              {...tx("phone")}
            />

            <SelectField
              label="Fax"
              required
              options={OPTIONS.fax}
              {...sel("fax")}
            />

            <SelectField
              label="E-mail"
              required
              options={OPTIONS.email}
              {...sel("email")}
            />
          </FormGrid>
        </SectionBox>

        {/* =========================================================
            SPECIALTY & TAXONOMY  (+ adds a new row)
        ========================================================= */}

        <SectionBox>
          <SectionHeader
            title="Specialty & Taxonomy"
            action={
              <IconButton
                size="small"
                aria-label="Add specialty"
                onClick={addSpecialty}
                sx={{
                  p: "4px",
                  "&:hover": { bgcolor: "#EEF4FF" },
                }}
              >
                <RPAddIcon
                  width={ICON_SIZE.add}
                  height={ICON_SIZE.add}
                  color={T.blue}
                />
              </IconButton>
            }
          />

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            {specialties.map((r) => (
              <Box
                key={r.id}
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  gap: 1.5,
                  alignItems: "start",
                }}
              >
                <SelectField
                  label="Specialty"
                  required
                  options={OPTIONS.specialty}
                  value={r.specialty}
                  onChange={(e) =>
                    updateSpecialty(r.id, "specialty", e.target.value)
                  }
                  onClose={() => touchSpec(r.id, "specialty")}
                  error={specError(r, "specialty")}
                />

                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <InputField
                      label="Taxonomy"
                      required
                      placeholder="Type here"
                      value={r.taxonomy}
                      onChange={(e) =>
                        updateSpecialty(r.id, "taxonomy", e.target.value)
                      }
                      onBlur={() => touchSpec(r.id, "taxonomy")}
                      error={specError(r, "taxonomy")}
                    />
                  </Box>

                  {/* mt aligns the icon with the 34px input (label ≈ 20px) */}
                  <IconButton
                    size="small"
                    aria-label="Delete taxonomy"
                    onClick={() => removeSpecialty(r.id)}
                    sx={{
                      p: "4px",
                      mt: "21px",
                      "&:hover": { bgcolor: "#EEF4FF" },
                    }}
                  >
                    <RPDeleteIcon
                      width={ICON_SIZE.delete}
                      height={ICON_SIZE.delete}
                      color={T.blue}
                    />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </Box>
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
