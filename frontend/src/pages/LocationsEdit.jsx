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
} from "@mui/material";
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
const PHONE_FIELDS = ["mobile", "workContact"];
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
/* Shared components                                                    */
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
    locationName: row?.location    ?? "",
    npi:          row?.npi         ?? "",
    contact:      row?.contact     ?? "",
    fax:          row?.fax         ?? "",
    practice:     row?.practice    ?? "",
    address:      row?.address     ?? "",
    mobile:       row?.contact     ?? "",
    workContact:  "",
  });
  const [errors, setErrors] = React.useState({});

  const set = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

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
          maxWidth: 1100,
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        {/* Title */}
        <Typography sx={{ fontSize: 26, fontWeight: 700, color: "#111827" }}>
          {isEdit ? "Edit Service Location" : "Add New Service Location"}
        </Typography>

        {/* ══ BASIC DETAILS BOX ══ */}
        <SectionBox>
          {/* Row 1 */}
          <FormGrid>
            <InputField label="Service Location Name" required value={form.locationName} onChange={set("locationName")} />
            <InputField label="Organisation NPI" required value={form.npi} onChange={set("npi")} />
            <SelectField
              label="Other ID"
              placeholder="Select location"
              required
            />
            <SelectField label="Select License Type" required />
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
            <SelectField label="Select POS Code" required />
            <InputField label="CLIA Number" required value={form.contact} onChange={set("contact")} />

            {/* Active toggle — same row alignment as other inputs */}
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
                  border: `1px solid ${T.border}`,
                  borderRadius: "8px",
                  px: "14px",
                  height: 38,
                  bgcolor: "#fff",
                  boxSizing: "border-box",
                  "&:hover": { borderColor: "#9CA3AF" },
                }}
              >
                <Typography sx={{ fontSize: 12, color: "#8F9098" }}>
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
            <InputField label="Address Type" placeholder="Basic" required />
            <InputField label="Address 1" placeholder="Address 1" required value={form.address} onChange={set("address")} />
            <SelectField label="Address 2" placeholder="Address 2" required />
            <InputField label="Zip Code" required />
          </FormGrid>

          {/* Row 2 — City → State → Country → County */}
          <FormGrid>
            <InputField label="City" required value={form.practice} onChange={set("practice")} />
            <SelectField label="State" required />
            <SelectField label="Country" required />
            <SelectField label="County" required />
          </FormGrid>

          {/* Row 3 */}
          <FormGrid>
            <InputField
              label="Mobile no."
              required
              value={form.mobile}
              onChange={setPhone("mobile")}
              onBlur={blurPhone("mobile")}
              error={errors.mobile}
              inputMode="numeric"
              maxLength={10}
            />
            <InputField
              label="Work Contact no."
              value={form.workContact}
              onChange={setPhone("workContact")}
              onBlur={blurPhone("workContact")}
              error={errors.workContact}
              inputMode="numeric"
              maxLength={10}
            />
            <SelectField label="Fax" required />
            <SelectField label="E-mail" required />
          </FormGrid>
        </SectionBox>

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