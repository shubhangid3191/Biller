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

const EMAIL_REGEX =
  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/;

const REQUIRED_TEXT = {
  payorName: "Payor Name",
  payorCode: "Payor Code",
  payorEmail: "Payor E-mail",
  payorPhone: "Payor Phone",
  payorFax: "Payor Fax",
  payorAddress: "Payor Address",
  payorCity: "Payor City",
  payorZip: "Zip Code",
};

const REQUIRED_SELECT = {
  state: "State",
  country: "Country",
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
        inputProps={{ inputMode, maxLength }}
        InputProps={
          endIcon
            ? {
                endAdornment: (
                  <InputAdornment position="end" sx={{ pr: "2px" }}>
                    {endIcon}
                  </InputAdornment>
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
/* Section Box (p 2, border, radius 8)                                  */
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

export default function InsuranceProviderEdit() {
  const navigate = useNavigate();
  const { state: routeState } = useLocation();
  const row = routeState?.row ?? null;
  const isEdit = row !== null;

  const [mandatoryCode, setMandatoryCode] = React.useState(true);

  const [form, setForm] = React.useState({
    payorName: row?.payorName ?? "",
    payorCode: row?.payorCode ?? "",
    payorEmail: row?.payorEmail ?? "",
    payorPhone: row?.payorPhone ?? "",
    payorFax: row?.payorFax ?? "",
    payorAddress: row?.payorAddress ?? "",
    payorStreet: row?.payorStreet ?? "",
    payorStreet2: row?.payorStreet2 ?? "",
    payorCity: row?.payorCity ?? "",
    payorZip: row?.payorZip ?? "",
    state: row?.state ?? "",
    country: row?.country ?? "",
    submissionMethod: row?.submissionMethod ?? "",
  });

  const [touched, setTouched] = React.useState({});

  /* ---------- helpers ---------- */
  const set = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const setPhone = (field) => (e) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
    setForm((prev) => ({ ...prev, [field]: digits }));
  };

  const touch = (name) =>
    setTouched((prev) => (prev[name] ? prev : { ...prev, [name]: true }));

  /* error shows only after the user has visited the field (or pressed Save) */
  const errorOf = (name) =>
    touched[name] ? validateField(name, form[name]) : "";

  const tx = (name) => ({
    value: form[name],
    onChange:
      name === "payorPhone" || name === "payorFax" ? setPhone(name) : set(name),
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

    if (isEdit) {
      navigate("/insurance-provider", {
        state: { result: { action: "edit", data: { id: row.id, ...form } } },
      });
    } else {
      navigate("/insurance-provider", {
        state: { result: { action: "add", data: form } },
      });
    }
  };

  /* footer button look (same as the other pages) */
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
              {isEdit ? "Edit Insurance" : "Add Insurance"}
            </Typography>
          </Box>
        </Box>

        {/* =========================================================
            MAIN BOX
        ========================================================= */}
        <SectionBox>
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

            <InputField
              label="Payor Address"
              required
              {...tx("payorAddress")}
            />

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
          <FormGrid last>
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
                  border: `1px solid ${T.border}`,
                  borderRadius: "6px",
                  px: "10px",
                  height: 34,
                  width: "100%",
                  bgcolor: T.fieldBg,
                  boxSizing: "border-box",
                  transition: "border-color 0.15s",
                  "&:hover": { borderColor: "#D1D5DB" },
                  "&:focus-within": { borderColor: "#0066FF" },
                }}
              >
                <Typography
                  sx={{
                    fontSize: 12,
                    color: "#1F2937",
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
                  inputProps={{
                    "aria-label": "Set mandatory insurance type code",
                  }}
                  sx={{
                    mr: -0.5,
                    flexShrink: 0,
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
