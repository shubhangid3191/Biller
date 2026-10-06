import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  Switch,
  InputAdornment,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

/* ------------------------------------------------------------------ */
/* Design tokens                                                        */
/* ------------------------------------------------------------------ */
const T = {
  blue: "#2563EB",
  page: "#F7F9FC",
  border: "#D5DCE8",
};

/* ------------------------------------------------------------------ */
/* Validation                                                           */
/* ------------------------------------------------------------------ */
const PHONE_FIELDS = ["payorPhone", "payorFax"];
const PHONE_ERROR = "Enter a valid 10-digit number";
const validatePhone = (value) =>
  !value || /^\d{10}$/.test(value) ? "" : PHONE_ERROR;

/* ------------------------------------------------------------------ */
/* Input / Select styles                                                */
/* ------------------------------------------------------------------ */
const inputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    fontSize: 12,
    bgcolor: "#fff",
    "& input": { py: "10px", px: "14px", fontSize: 12, color: "#1F2937" },
    "& input::placeholder": { color: "#8F9098", opacity: 1 },
    "& .MuiOutlinedInput-notchedOutline": { borderColor: T.border },
    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#9CA3AF" },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: T.blue,
      borderWidth: "1.5px",
    },
    "&.Mui-error .MuiOutlinedInput-notchedOutline": { borderColor: "#EF4444" },
  },
  "& .MuiFormHelperText-root": {
    fontSize: 11,
    mx: 0,
    mt: 0.4,
    color: "#EF4444",
  },
};

const selectSx = {
  borderRadius: "8px",
  fontSize: 12,
  bgcolor: "#fff",
  "& .MuiOutlinedInput-notchedOutline": { borderColor: T.border },
  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#9CA3AF" },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: T.blue,
    borderWidth: "1.5px",
  },
  "& .MuiSelect-select": {
    py: "10px",
    px: "14px",
    fontSize: 12,
    color: "#8F9098",
  },
  "& .MuiSvgIcon-root": { color: "#8F9098" },
};

/* ------------------------------------------------------------------ */
/* Label                                                                */
/* ------------------------------------------------------------------ */
function Label({ children, required }) {
  return (
    <Typography sx={{ fontSize: 12, fontWeight: 700, color: "#000", mb: 0.6 }}>
      {children}
      {required && (
        <Box component="span" sx={{ color: "red", ml: 0.3 }}>
          *
        </Box>
      )}
    </Typography>
  );
}

/* ------------------------------------------------------------------ */
/* Field components                                                     */
/* ------------------------------------------------------------------ */
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
    <Box>
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
}) {
  return (
    <Box>
      <Label required={required}>{label}</Label>
      <FormControl fullWidth size="small">
        <Select
          displayEmpty
          defaultValue=""
          sx={selectSx}
          IconComponent={KeyboardArrowDownIcon}
        >
          <MenuItem value="" sx={{ fontSize: 12, color: "#8F9098" }}>
            {placeholder}
          </MenuItem>
          {options.map((o) => (
            <MenuItem key={o} value={o} sx={{ fontSize: 12 }}>
              {o}
            </MenuItem>
          ))}
        </Select>
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
    payorName:    row?.payorName  ?? "",
    payorCode:    row?.payorCode  ?? "",
    payorEmail:   "",
    payorAddress: row?.address    ?? "",
    payorStreet:  "",
    payorStreet2: "",
    payorCity:    "",
    payorZip:     "",
    payorPhone:   "",
    payorFax:     row?.fax        ?? "",
  });
  const [errors, setErrors] = React.useState({});

  /* phone fields: digits only, max 10, error cleared while typing */
  const setPhone = (field) => (e) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
    setForm((prev) => ({ ...prev, [field]: digits }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const blurPhone = (field) => () =>
    setErrors((prev) => ({ ...prev, [field]: validatePhone(form[field]) }));

  const handleSave = () => {
    const nextErrors = {};
    PHONE_FIELDS.forEach((f) => {
      nextErrors[f] = validatePhone(form[f]);
    });
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;
    // valid — submit `form` to the API here
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
        <Typography sx={{ fontSize: 28, fontWeight: 700, color: "#111827" }}>
          {isEdit ? "Edit Insurance" : "Add New Insurance"}
        </Typography>

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
            <InputField label="Payor Name" required />
            <InputField label="Payor Code" required />
            <InputField
              label="Payor E-mail"
              placeholder="Select location"
              required
            />
            <InputField
              label="Payor Phone"
              required
              value={form.payorPhone}
              onChange={setPhone("payorPhone")}
              onBlur={blurPhone("payorPhone")}
              error={errors.payorPhone}
              inputMode="numeric"
              maxLength={10}
            />
          </FormGrid>

          {/* Row 2 */}
          <FormGrid>
            <InputField
              label="Payor Fax"
              required
              value={form.payorFax}
              onChange={setPhone("payorFax")}
              onBlur={blurPhone("payorFax")}
              error={errors.payorFax}
              inputMode="numeric"
              maxLength={10}
            />
            <InputField label="Payor Address" required />
            <InputField label="Payor Street" required />
            <InputField label="Payor Street 2" required />
          </FormGrid>

          {/* Row 3 — City → State → Country → Zip */}
          <FormGrid>
            <InputField label="Payor City" required />
            <SelectField
              label="State"
              required
              options={["California", "Texas", "New York"]}
            />
            <SelectField
              label="Country"
              required
              options={["USA", "Canada", "India"]}
            />
            <InputField label="Zip Code" required />
          </FormGrid>

          {/* Row 4 — Submission Method + Mandatory code toggle */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "repeat(4, 1fr)",
              },
              gap: 2,
              mb: 1,
            }}
          >
            <SelectField
              label="Submission Method"
              required
              options={["Electronic", "Paper", "Fax"]}
            />

            {/* Spans 2 columns on md+ = Country + State width */}
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
                  borderRadius: "8px",
                  px: "14px",
                  height: 38,
                  width: "100%",
                  bgcolor: "#fff",
                  boxSizing: "border-box",
                  "&:hover": { borderColor: "#9CA3AF" },
                }}
              >
                <Typography
                  sx={{
                    fontSize: 12,
                    color: "#8F9098",
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
          sx={{ display: "flex", justifyContent: "flex-end", gap: 1.5, pb: 3 }}
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