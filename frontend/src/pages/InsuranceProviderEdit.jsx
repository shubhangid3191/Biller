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

/* ------------------------------------------------------------------ */
/* Design tokens                                                        */
/* ------------------------------------------------------------------ */
const T = {
  blue: "#2563EB",
  page: "#F7F9FC",
  border: "#C5C6CC",
};

/* ------------------------------------------------------------------ */
/* Validation                                                           */
/* ------------------------------------------------------------------ */
const PHONE_REGEX = /^\d{10}$/;
const PHONE_ERROR = "Enter a valid 10-digit number";

const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;

const REQUIRED_TEXT = {
  payorName:    "Payor Name",
  payorCode:    "Payor Code",
  payorEmail:   "Payor E-mail",
  payorPhone:   "Payor Phone",
  payorFax:     "Payor Fax",
  payorAddress: "Payor Address",
  payorCity:    "Payor City",
  payorZip:     "Zip Code",
};

const REQUIRED_SELECT = {
  state:            "State",
  country:          "Country",
  submissionMethod: "Submission Method",
};

const validateField = (name, value) => {
  const v = String(value ?? "").trim();

  if (REQUIRED_TEXT[name]) {
    if (!v) return `${REQUIRED_TEXT[name]} is required`;
    if (name === "payorEmail") {
      if (!EMAIL_REGEX.test(v)) return "Enter a valid email address";
    }
    if ((name === "payorPhone" || name === "payorFax") && !PHONE_REGEX.test(v))
      return PHONE_ERROR;
    return "";
  }
  if (REQUIRED_SELECT[name]) {
    if (!v) return `${REQUIRED_SELECT[name]} is required`;
    return "";
  }
  return "";
};

const ALL_REQUIRED = {
  ...Object.fromEntries(Object.keys(REQUIRED_TEXT).map((k) => [k, ""])),
  ...Object.fromEntries(Object.keys(REQUIRED_SELECT).map((k) => [k, ""])),
};

/* ------------------------------------------------------------------ */
/* Input / Select styles — matches AddNewPatient                        */
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
  "& .MuiFormHelperText-root": { fontSize: 11, mx: 0, mt: 0.4, color: "#EF4444" },
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
        <Box component="span" sx={{ color: "#EF4444", ml: 0.3 }}>*</Box>
      )}
    </Typography>
  );
}

function InputField({
  label, placeholder = "Type here", required,
  endIcon, value, onChange, onBlur, error, inputMode, maxLength,
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
        helperText={error || ""}
        inputProps={{ inputMode, maxLength }}
        InputProps={
          endIcon
            ? { endAdornment: <InputAdornment position="end">{endIcon}</InputAdornment> }
            : undefined
        }
        sx={inputSx}
      />
    </Box>
  );
}

function SelectField({
  label, placeholder = "Select", options = [],
  required, value, onChange, onClose, error,
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
          <MenuItem value="" sx={{ fontSize: 13, color: "#8F9098" }}>{placeholder}</MenuItem>
          {options.map((o) => (
            <MenuItem key={o} value={o} sx={{ fontSize: 13 }}>{o}</MenuItem>
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

/* ------------------------------------------------------------------ */
/* Main Page                                                            */
/* ------------------------------------------------------------------ */
export default function InsuranceProviderEdit() {
  const navigate = useNavigate();
  const { state: routeState } = useLocation();
  const row = routeState?.row ?? null;
  const isEdit = row !== null;

  const [mandatoryCode, setMandatoryCode] = React.useState(true);

  const [form, setForm] = React.useState({
    payorName:        row?.payorName  ?? "",
    payorCode:        row?.payorCode  ?? "",
    payorEmail:       "",
    payorPhone:       "",
    payorFax:         row?.fax        ?? "",
    payorAddress:     row?.address    ?? "",
    payorStreet:      "",
    payorStreet2:     "",
    payorCity:        "",
    payorZip:         "",
    state:            "",
    country:          "",
    submissionMethod: "",
  });

  const [touched, setTouched] = React.useState({});

  const set = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const setPhone = (field) => (e) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
    setForm((prev) => ({ ...prev, [field]: digits }));
  };

  const touch = (name) =>
    setTouched((prev) => (prev[name] ? prev : { ...prev, [name]: true }));

  const errorOf = (name) =>
    touched[name] ? validateField(name, form[name]) : "";

  const tx = (name) => ({
    value: form[name],
    onChange: name === "payorPhone" || name === "payorFax"
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
    console.log("Insurance data:", form);
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
          <Typography
            sx={{ fontSize: { xs: 16, sm: 18, md: 20 }, fontWeight: 700, color: "#111827" }}
          >
            {isEdit ? "Edit Insurance" : "Add New Insurance"}
          </Typography>
        </Box>

        {/* ══ SINGLE BOX ══ */}
        <Box
          sx={{
            bgcolor: "#fff",
            borderRadius: "12px",
            border: "1px solid #E5E7EB",
            px: { xs: 2, sm: 3, md: 4 },
            py: { xs: 2, sm: 3 },
          }}
        >
          {/* Row 1 */}
          <FormGrid>
            <InputField label="Payor Name" required {...tx("payorName")} />
            <InputField label="Payor Code" required {...tx("payorCode")} />
            <InputField
              label="Payor E-mail"
              placeholder="email@example.com"
              required
              {...tx("payorEmail")}
            />
            <InputField
              label="Payor Phone"
              required
              inputMode="numeric"
              maxLength={10}
              placeholder="10-digit number"
              {...tx("payorPhone")}
            />
          </FormGrid>

          {/* Row 2 */}
          <FormGrid>
            <InputField
              label="Payor Fax"
              required
              inputMode="numeric"
              maxLength={10}
              placeholder="10-digit number"
              {...tx("payorFax")}
            />
            <InputField label="Payor Address" required {...tx("payorAddress")} />
            <InputField
              label="Payor Street"
              value={form.payorStreet}
              onChange={set("payorStreet")}
            />
            <InputField
              label="Payor Street 2"
              value={form.payorStreet2}
              onChange={set("payorStreet2")}
            />
          </FormGrid>

          {/* Row 3 — City → State → Country → Zip */}
          <FormGrid>
            <InputField label="Payor City" required {...tx("payorCity")} />
            <SelectField
              label="State"
              required
              options={["California", "Texas", "New York", "Florida"]}
              {...sel("state")}
            />
            <SelectField
              label="Country"
              required
              options={["USA", "Canada", "India", "United Kingdom"]}
              {...sel("country")}
            />
            <InputField label="Zip Code" required {...tx("payorZip")} />
          </FormGrid>

          {/* Row 4 — Submission Method + Mandatory code toggle */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(4, 1fr)" },
              gap: 2,
              mb: 1,
            }}
          >
            <SelectField
              label="Submission Method"
              required
              options={["Electronic", "Paper", "Fax"]}
              {...sel("submissionMethod")}
            />

            <Box
              sx={{
                minWidth: 0,
                gridColumn: { xs: "auto", sm: "auto", md: "span 2" },
              }}
            >
              <Label>&nbsp;</Label>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  border: "1px solid #C5C6CC",
                  borderRadius: "8px",
                  px: "12px",
                  height: 42,
                  width: "100%",
                  bgcolor: "#fff",
                  boxSizing: "border-box",
                  "&:hover": { borderColor: "#9CA3AF" },
                }}
              >
                <Typography
                  sx={{
                    fontSize: 13,
                    color: "#1E1E1E",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    mr: 1,
                  }}
                >
                  Set mandatory insurance type code
                </Typography>
                <Switch
                  size="small"
                  checked={mandatoryCode}
                  onChange={(e) => setMandatoryCode(e.target.checked)}
                  sx={{
                    mr: -0.5,
                    flexShrink: 0,
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
        </Box>

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
