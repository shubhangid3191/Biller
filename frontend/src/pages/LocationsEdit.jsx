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
  FormHelperText,
  Switch,
  InputAdornment,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { RPDeleteIcon } from "../assets/Assets";

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

const ICON_SIZE = {
  delete: 18,
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
/* Validation                                                          */
/* ------------------------------------------------------------------ */

const PHONE_REGEX = /^\d{10}$/;
const PHONE_ERROR = "Enter a valid 10-digit number";

/* All required text/phone fields → label shown in error messages */
const REQUIRED_TEXT_FIELDS = {
  locationName: "Service Location Name",
  npi: "Organisation NPI",
  cliaNumber: "CLIA Number",
  address1: "Address 1",
  zipCode: "Zip Code",
  city: "City",
  mobile: "Mobile no.",
};

/* Required select fields → label shown in error messages */
const REQUIRED_SELECT_FIELDS = {
  otherId: "Other ID",
  licenseType: "License Type",
  posCode: "POS Code",
  addressType: "Address Type",
  state: "State",
  country: "Country",
  county: "County",
  fax: "Fax",
  email: "E-mail",
};

const validateField = (name, value) => {
  const v = String(value ?? "").trim();
  if (REQUIRED_TEXT_FIELDS[name]) {
    if (!v) return `${REQUIRED_TEXT_FIELDS[name]} is required`;
    if (name === "mobile" && !PHONE_REGEX.test(v)) return PHONE_ERROR;
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
  endIcon,
  value,
  onChange,
  onBlur,
  error,
  helperText,
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
        helperText={helperText || error || ""}
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
  return (
    <Box sx={{ minWidth: 0 }}>
      <Label required={required}>{label}</Label>

      <FormControl fullWidth size="small" error={!!error}>
        <Select
          displayEmpty
          value={value ?? ""}
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

          {options.map((o) => (
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
/* Main Page                                                           */
/* ------------------------------------------------------------------ */

export default function LocationsEdit() {
  const navigate = useNavigate();
  const { state: routeState } = useLocation();
  const row = routeState?.row ?? null;
  const isEdit = row !== null;

  const [active, setActive] = React.useState(row?.active ?? true);

  const [form, setForm] = React.useState({
    locationName: row?.location ?? "",
    npi: row?.npi ?? "",
    cliaNumber: row?.contact ?? "",
    address1: row?.address ?? "",
    zipCode: "",
    city: row?.practice ?? "",
    mobile: row?.contact ?? "",
    workContact: "",
    /* selects */
    otherId: "",
    licenseType: "",
    posCode: "",
    addressType: "",
    addressLine2: "",
    state: "",
    country: "",
    county: "",
    fax: "",
    email: "",
  });

  /* touched mirrors the shape of ALL_REQUIRED */
  const [touched, setTouched] = React.useState({});

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

  /* error shows only after the user has visited the field (or pressed Save),
     then updates live while they fix it */
  const errorOf = (name) =>
    touched[name] ? validateField(name, form[name]) : "";

  /* props helpers */
  const tx = (name) => ({
    value: form[name],
    onChange:
      name === "mobile" || name === "workContact" ? setPhone(name) : set(name),
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
    /* valid — submit form to API here */
    console.log("Location data:", { ...form, active });
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
              {isEdit ? "Edit Service Location" : "Add New Service Location"}
            </Typography>
          </Box>
        </Box>

        {/* =========================================================
            BASIC DETAILS
        ========================================================= */}

        <SectionBox>
          <SectionHeader title="Basic Details" />

          {/* Row 1 */}
          <FormGrid>
            <InputField
              label="Service Location Name"
              required
              {...tx("locationName")}
            />
            <InputField label="Organisation NPI" required {...tx("npi")} />
            <SelectField
              label="Other ID"
              placeholder="Select location"
              required
              options={["ID-001", "ID-002", "ID-003"]}
              {...sel("otherId")}
            />
            <SelectField
              label="Select License Type"
              required
              options={["Type A", "Type B", "Type C"]}
              {...sel("licenseType")}
            />
          </FormGrid>

          {/* Row 2 — 2 fields + Active toggle */}
          <FormGrid last>
            <SelectField
              label="Select POS Code"
              required
              options={[
                "11 – Office",
                "21 – Inpatient Hospital",
                "22 – Outpatient Hospital",
              ]}
              {...sel("posCode")}
            />

            <InputField label="CLIA Number" required {...tx("cliaNumber")} />

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
          </FormGrid>
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
            <SelectField
              label="Address Type"
              placeholder="Basic"
              required
              options={["Home", "Work", "Billing"]}
              {...sel("addressType")}
            />
            <InputField
              label="Address 1"
              placeholder="Address 1"
              required
              {...tx("address1")}
            />
            <SelectField
              label="Address 2"
              placeholder="Address 2"
              options={["Suite", "Apt", "Floor"]}
              value={form.addressLine2}
              onChange={set("addressLine2")}
            />
            <InputField label="Zip Code" required {...tx("zipCode")} />
          </FormGrid>

          {/* Row 2 */}
          <FormGrid>
            <InputField label="City" required {...tx("city")} />
            <SelectField
              label="State"
              required
              options={["California", "Texas", "New York", "Florida"]}
              {...sel("state")}
            />
            <SelectField
              label="Country"
              required
              options={["United States", "Canada", "United Kingdom"]}
              {...sel("country")}
            />
            <SelectField
              label="County"
              required
              options={["Los Angeles", "Harris", "Miami-Dade"]}
              {...sel("county")}
            />
          </FormGrid>

          {/* Row 3 */}
          <FormGrid last>
            <InputField
              label="Mobile no."
              required
              placeholder="10-digit number"
              inputMode="numeric"
              maxLength={10}
              {...tx("mobile")}
            />
            <InputField
              label="Work Contact no."
              placeholder="10-digit number"
              inputMode="numeric"
              maxLength={10}
              value={form.workContact}
              onChange={setPhone("workContact")}
              onBlur={() => {
                if (form.workContact && !PHONE_REGEX.test(form.workContact)) {
                  touch("workContact");
                }
              }}
              error={
                form.workContact && !PHONE_REGEX.test(form.workContact)
                  ? PHONE_ERROR
                  : ""
              }
            />
            <SelectField
              label="Fax"
              required
              options={["Fax 1", "Fax 2"]}
              {...sel("fax")}
            />
            <SelectField
              label="E-mail"
              required
              options={["email@example.com"]}
              {...sel("email")}
            />
          </FormGrid>
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
