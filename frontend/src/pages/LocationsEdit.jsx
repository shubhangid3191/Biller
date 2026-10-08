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
/* Design tokens                                                        */
/* ------------------------------------------------------------------ */
const T = {
  blue: "#2563EB",
  page: "#F7F9FC",
  border: "#D5DCE8",
  labelColor: "#000",
};

const ICON_SIZE = { delete: 20, add: 16 };

/* ------------------------------------------------------------------ */
/* Validation                                                           */
/* ------------------------------------------------------------------ */
const PHONE_REGEX = /^\d{10}$/;
const PHONE_ERROR = "Enter a valid 10-digit number";

/* All required text/phone fields → label shown in error messages */
const REQUIRED_TEXT_FIELDS = {
  locationName: "Service Location Name",
  npi:          "Organisation NPI",
  cliaNumber:   "CLIA Number",
  address1:     "Address 1",
  zipCode:      "Zip Code",
  city:         "City",
  mobile:       "Mobile no.",
};

/* Required select fields → label shown in error messages */
const REQUIRED_SELECT_FIELDS = {
  otherId:       "Other ID",
  licenseType:   "License Type",
  posCode:       "POS Code",
  addressType:   "Address Type",
  state:         "State",
  country:       "Country",
  county:        "County",
  fax:           "Fax",
  email:         "E-mail",
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
  ...Object.fromEntries(Object.keys(REQUIRED_SELECT_FIELDS).map((k) => [k, ""])),
};

/* ------------------------------------------------------------------ */
/* Input / Select styles                                                */
/* ------------------------------------------------------------------ */
const inputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    fontSize: 13,
    bgcolor: "#fff",
    "& input": { padding: "8px 12px", fontSize: 13, color: "#1E1E1E" },
    "& input::placeholder": { color: "#8F9098", opacity: 1 },
    "& .MuiOutlinedInput-notchedOutline": { borderColor: "#C5C6CC" },
    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#9CA3AF" },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#006FFD",
      borderWidth: "1.5px",
    },
    "&.Mui-error .MuiOutlinedInput-notchedOutline": { borderColor: "#EF4444" },
  },
  "& .MuiInputBase-root": { height: "42px" },
  "& .MuiFormHelperText-root": {
    fontSize: 11,
    mx: 0,
    mt: 0.4,
    color: "#EF4444",
  },
};

const selectSx = (error = false) => ({
  height: "42px",
  borderRadius: "8px",
  fontSize: 13,
  bgcolor: "#fff",
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: error ? "#EF4444" : "#C5C6CC",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: error ? "#EF4444" : "#9CA3AF",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: error ? "#EF4444" : "#006FFD",
    borderWidth: "1.5px",
  },
  "&.Mui-error .MuiOutlinedInput-notchedOutline": { borderColor: "#EF4444" },
  "& .MuiSelect-select": {
    padding: "0 !important",
    px: "12px !important",
    fontSize: 13,
    display: "flex",
    alignItems: "center",
    height: "42px",
    boxSizing: "border-box",
  },
  "& .MuiSvgIcon-root": { color: "#8F9098" },
});

/* ------------------------------------------------------------------ */
/* Shared components                                                    */
/* ------------------------------------------------------------------ */
function Label({ children, required }) {
  return (
    <Typography sx={{ fontSize: 12, fontWeight: 700, color: "#000", mb: 0.6 }}>
      {children}
      {required && (
        <Box component="span" sx={{ color: "#EF4444", ml: 0.3 }}>
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
    <Box>
      <Label required={required}>{label}</Label>
      <TextField
        fullWidth
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
    <Box>
      <Label required={required}>{label}</Label>
      <FormControl fullWidth error={!!error}>
        <Select
          displayEmpty
          value={value ?? ""}
          onChange={onChange}
          onClose={onClose}
          sx={selectSx(!!error)}
          IconComponent={KeyboardArrowDownIcon}
          renderValue={(val) =>
            val ? (
              <span style={{ fontSize: 13, color: "#1E1E1E" }}>{val}</span>
            ) : (
              <span style={{ fontSize: 13, color: "#8F9098" }}>{placeholder}</span>
            )
          }
        >
          <MenuItem value="" sx={{ fontSize: 13, color: "#8F9098" }}>
            {placeholder}
          </MenuItem>
          {options.map((o) => (
            <MenuItem key={o} value={o} sx={{ fontSize: 13 }}>
              {o}
            </MenuItem>
          ))}
        </Select>
        {error && (
          <FormHelperText sx={{ fontSize: 11, mx: 0, mt: 0.4, color: "#EF4444" }}>
            {error}
          </FormHelperText>
        )}
      </FormControl>
    </Box>
  );
}

function FormGrid({ children }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(4, 1fr)" },
        gap: 2,
        mb: 2.5,
      }}
    >
      {children}
    </Box>
  );
}

function SectionTitle({ children }) {
  return (
    <Typography
      sx={{
        fontSize: 15,
        fontWeight: 700,
        letterSpacing: "0.06em",
        color: "#111827",
        textTransform: "uppercase",
        mb: 2,
      }}
    >
      {children}
    </Typography>
  );
}

function SectionBox({ children }) {
  return (
    <Box
      sx={{
        bgcolor: "#fff",
        borderRadius: "12px",
        border: "1px solid #E5E7EB",
        px: { xs: 2, sm: 3, md: 4 },
        py: { xs: 2, sm: 3 },
      }}
    >
      {children}
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* Main Page                                                            */
/* ------------------------------------------------------------------ */
export default function LocationsEdit() {
  const navigate = useNavigate();
  const { state: routeState } = useLocation();
  const row = routeState?.row ?? null;
  const isEdit = row !== null;

  const [active, setActive] = React.useState(row?.active ?? true);

  const [form, setForm] = React.useState({
    locationName: row?.location   ?? "",
    npi:          row?.npi        ?? "",
    cliaNumber:   row?.contact    ?? "",
    address1:     row?.address    ?? "",
    zipCode:      "",
    city:         row?.practice   ?? "",
    mobile:       row?.contact    ?? "",
    workContact:  "",
    /* selects */
    otherId:      "",
    licenseType:  "",
    posCode:      "",
    addressType:  "",
    addressLine2: "",
    state:        "",
    country:      "",
    county:       "",
    fax:          "",
    email:        "",
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

  /* error shows after the user leaves the field (or presses Save),
     then updates live while they fix it */
  const errorOf = (name) =>
    touched[name] ? validateField(name, form[name]) : "";

  /* props helpers */
  const tx = (name) => ({
    value: form[name],
    onChange: name === "mobile" || name === "workContact"
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
    console.log("Location data:", form);
  };

  return (
    <Box
      sx={{
        bgcolor: T.page,
        minHeight: "100vh",
        width: "100%",
        py: { xs: 2, md: 3 },
        px: { xs: 1.5, sm: 2, md: 2.5, lg: 2.5 },
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          maxWidth: 1400,
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        {/* Title */}
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
              "&:hover": { bgcolor: "#F3F4F6", borderColor: "#D1D5DB" },
            }}
          >
            <ArrowBackIcon sx={{ fontSize: 20 }} />
          </IconButton>
          <Typography sx={{ fontSize: 20, fontWeight: 700, color: "#111827" }}>
            {isEdit ? "Edit Service Location" : "Add New Service Location"}
          </Typography>
        </Box>

        {/* ══ BASIC DETAILS BOX ══ */}
        <SectionBox>
          {/* Row 1 */}
          <FormGrid>
            <InputField
              label="Service Location Name"
              required
              {...tx("locationName")}
            />
            <InputField
              label="Organisation NPI"
              required
              {...tx("npi")}
            />
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
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "repeat(4, 1fr)",
              },
              gap: 2,
              mb: 2.5,
            }}
          >
            <SelectField
              label="Select POS Code"
              required
              options={["11 – Office", "21 – Inpatient Hospital", "22 – Outpatient Hospital"]}
              {...sel("posCode")}
            />
            <InputField
              label="CLIA Number"
              required
              {...tx("cliaNumber")}
            />

            {/* Active toggle */}
            <Box>
              <Typography
                aria-hidden="true"
                sx={{
                  fontSize: 12,
                  fontWeight: 700,
                  mb: 0.6,
                  visibility: "hidden",
                }}
              >
                &nbsp;
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  border: "1px solid #C5C6CC",
                  borderRadius: "8px",
                  px: "12px",
                  height: 42,
                  bgcolor: "#fff",
                  boxSizing: "border-box",
                  "&:hover": { borderColor: "#9CA3AF" },
                }}
              >
                <Typography sx={{ fontSize: 13, color: "#1E1E1E" }}>
                  Active
                </Typography>
                <Switch
                  size="small"
                  checked={active}
                  onChange={(e) => setActive(e.target.checked)}
                  sx={{
                    mr: -0.5,
                    "& .MuiSwitch-switchBase.Mui-checked": { color: "#fff" },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      bgcolor: "#22C55E",
                      opacity: 1,
                    },
                    "& .MuiSwitch-track": { borderRadius: 20 },
                  }}
                />
              </Box>
            </Box>
          </Box>
        </SectionBox>

        {/* ══ ADDRESS BOX ══ */}
        <SectionBox>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <SectionTitle>Address</SectionTitle>
            <IconButton size="small" sx={{ p: 0.5 }}>
              <RPDeleteIcon
                width={ICON_SIZE.delete}
                height={ICON_SIZE.delete}
                color="#2563EB"
              />
            </IconButton>
          </Box>

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
            <InputField
              label="Zip Code"
              required
              {...tx("zipCode")}
            />
          </FormGrid>

          {/* Row 2 */}
          <FormGrid>
            <InputField
              label="City"
              required
              {...tx("city")}
            />
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
          <FormGrid>
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

        {/* ══ FOOTER BUTTONS ══ */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column-reverse", sm: "row" },
            justifyContent: { xs: "stretch", sm: "flex-end" },
            gap: 1.5,
            pb: 3,
          }}
        >
          <Button
            variant="outlined"
            onClick={() => navigate(-1)}
            sx={{
              textTransform: "none",
              fontSize: 14,
              fontWeight: 500,
              borderRadius: "8px",
              color: "#015DFF",
              border: "1.5px solid #015DFF",
              px: 3,
              "&:hover": { borderColor: "#9CA3AF", bgcolor: "#F9FAFB" },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            disableElevation
            onClick={handleSave}
            sx={{
              textTransform: "none",
              fontSize: 14,
              fontWeight: 500,
              borderRadius: "8px",
              bgcolor: T.blue,
              px: 4,
              "&:hover": { bgcolor: "#1D4ED8" },
            }}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Box>
  );
}