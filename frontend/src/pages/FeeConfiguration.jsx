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
  InputBase,
  Popover,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { CalendarIcon, StarIcon } from "../assets/Assets";

dayjs.extend(customParseFormat);

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
const DATE_FORMAT = "MM-DD-YYYY";

const parseDate = (v) => {
  if (!v || v.length !== 10) return null;
  const d = dayjs(v, DATE_FORMAT, true);
  return d.isValid() ? d : null;
};

/* Required text / input fields */
const REQUIRED_TEXT = {
  cpt:           "CPT / HCPCS Code",
  description:   "Description",
  modifier1:     "Modifier 1",
  charge:        "Procedure Charge",
  effectiveDate: "Effective Date",
};

/* Required select fields */
const REQUIRED_SELECT = {
  practice:      "Practice",
  specialty:     "Specialty",
  typeOfService: "Type of Service",
  program:       "Program",
};

const validateField = (name, value) => {
  const v = String(value ?? "").trim();
  if (REQUIRED_TEXT[name]) {
    if (!v) return `${REQUIRED_TEXT[name]} is required`;
    if (name === "effectiveDate" && !parseDate(v))
      return `Enter a valid date (${DATE_FORMAT})`;
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

const inputWithIconSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    fontSize: 13,
    bgcolor: "#fff",
    "& input": { padding: "8px 12px", paddingRight: "36px", fontSize: 13, color: "#1E1E1E" },
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

function InputFieldWithIcon({
  label, placeholder = "Type here", required,
  icon, value, onChange, onBlur, error,
}) {
  return (
    <Box>
      <Label required={required}>{label}</Label>
      <Box sx={{ position: "relative" }}>
        <TextField
          fullWidth
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          error={!!error}
          helperText={error || ""}
          sx={inputWithIconSx}
        />
        <Box
          sx={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            alignItems: "center",
            pointerEvents: "none",
          }}
        >
          {icon}
        </Box>
      </Box>
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

/* ------------------------------------------------------------------ */
/* Date field — MM-DD-YYYY                                             */
/* ------------------------------------------------------------------ */
function DateField({ label, value, onChange, onBlur, required, error, minDate, placeholder = "MM-DD-YYYY" }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClose = () => {
    setAnchorEl(null);
    if (onBlur) onBlur();
  };

  const handleDateChange = (newVal) => {
    if (newVal) onChange({ target: { value: newVal.format(DATE_FORMAT) } });
    handleClose();
  };

  const parsed = value ? dayjs(value, DATE_FORMAT, true) : null;
  const parsedValue = parsed && parsed.isValid() ? parsed : null;

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
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end" sx={{ mr: "-4px" }}>
                <IconButton
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                  aria-label="Open calendar"
                  sx={{ p: "4px", "&:hover": { background: "transparent" } }}
                  disableRipple
                >
                  <CalendarIcon width={14} height={16} color="#1E1E1E" />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
        sx={{
          ...inputSx,
          "& .MuiFormHelperText-root": { fontSize: 11, mx: 0, mt: 0.4, color: "#EF4444" },
        }}
      />
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: { borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.12)", mt: 0.5 },
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            value={parsedValue}
            onChange={handleDateChange}
            minDate={minDate}
            sx={{
              width: { xs: "280px", sm: "320px" },
              "& .MuiPickersDay-root.Mui-selected": { backgroundColor: "#015DFF" },
              "& .MuiPickersDay-root:hover": { backgroundColor: "#EEF4FF" },
            }}
          />
        </LocalizationProvider>
      </Popover>
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
    <Typography sx={{ fontSize: 18, fontWeight: 700, color: "#111827", mb: 2, mt: 1 }}>
      {children}
    </Typography>
  );
}

/* ------------------------------------------------------------------ */
/* Main Page                                                            */
/* ------------------------------------------------------------------ */
export default function FeeConfiguration() {
  const navigate = useNavigate();
  const { state: routeState } = useLocation();
  const row = routeState?.row ?? null;
  const isEdit = row !== null;

  const [nonCovered, setNonCovered] = React.useState(false);

  const [form, setForm] = React.useState({
    cpt:           row?.cpt                              ?? "",
    description:   row?.description                      ?? "",
    modifier1:     row?.modifiers                        ?? "",
    modifier2:     "",
    modifier3:     "",
    modifier4:     "",
    charge:        row?.charge                           ?? "",
    unit:          "",
    unitType:      "",
    ndcLabel:      "",
    ndcUnitBasis:  "",
    ndcDefaultUnit:"",
    effectiveDate: row?.effectiveDate?.split(" - ")[0]   ?? "",
    expiryDate:    row?.effectiveDate?.split(" - ")[1]   ?? "",
    /* selects */
    practice:      row?.practice                         ?? "",
    specialty:     row?.specialty                        ?? "",
    typeOfService: row?.typeOfService                    ?? "",
    program:       row?.program                          ?? "",
    posCode:       "",
    ndcCode:       "",
  });

  const [touched, setTouched] = React.useState({});

  const set = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const touch = (name) =>
    setTouched((prev) => (prev[name] ? prev : { ...prev, [name]: true }));

  const errorOf = (name) =>
    touched[name] ? validateField(name, form[name]) : "";

  const tx = (name) => ({
    value: form[name],
    onChange: set(name),
    onBlur: () => touch(name),
    error: errorOf(name),
  });

  const sel = (name) => ({
    value: form[name],
    onChange: set(name),
    onClose: () => touch(name),
    error: errorOf(name),
  });

  /* expiry can't be before the effective date */
  const effParsed = form.effectiveDate
    ? dayjs(form.effectiveDate, DATE_FORMAT, true)
    : null;
  const expiryMin = effParsed && effParsed.isValid() ? effParsed : undefined;

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
    console.log("Fee config data:", form);
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
        {/* ── Title + Ask Anything ── */}
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
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
              sx={{ fontSize: { xs: 16, sm: 18, md: 20}, fontWeight: 700, color: "#111827" }}
            >
              {isEdit ? "Fee Configuration" : "Add New Fee"}
            </Typography>
          </Box>

          <Box
            sx={{
              position: "relative",
              width: "100%",
              maxWidth: 600,
              height: 42,
              borderRadius: "8px",
              backgroundColor: "#F1F3F6",
              border: "1px solid #E5E7EB",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", ml: 1.5, mr: 1 }}>
              <StarIcon width={16} height={16} color="#6B7280" />
            </Box>
            <InputBase
              placeholder='Ask anything — "show denied claims over $500 from BCBSM"'
              sx={{
                flex: 1,
                fontSize: 12,
                color: "#374151",
                "& input": { padding: 0 },
                "& input::placeholder": { color: "#7B8494", opacity: 1 },
              }}
            />
            <Box
              sx={{
                mr: 1,
                px: 0.8,
                py: 0.25,
                borderRadius: "4px",
                backgroundColor: "#E5E7EB",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography sx={{ fontSize: 10, color: "#6B7280", fontWeight: 500, lineHeight: 1 }}>
                ⌘K
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* ── SINGLE BOX ── */}
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
            <InputFieldWithIcon
              label="CPT / HCPCS Code"
              required
              icon={<SearchIcon sx={{ fontSize: 18, color: "#1E1E1E" }} />}
              {...tx("cpt")}
            />
            <InputField label="Description" required {...tx("description")} />
            <SelectField
              label="Type of Service"
              required
              options={["Whole Blood", "Medical Care", "Surgery"]}
              {...sel("typeOfService")}
            />
            <SelectField
              label="Select POS Code"
              options={["11 – Office", "21 – Inpatient Hospital"]}
              value={form.posCode}
              onChange={set("posCode")}
            />
          </FormGrid>

          {/* Row 2 */}
          <FormGrid>
            <DateField
              label="Effective Date"
              required
              {...tx("effectiveDate")}
            />
            <DateField
              label="Expiry Date"
              value={form.expiryDate}
              onChange={set("expiryDate")}
              minDate={expiryMin}
            />
            <SelectField
              label="Select Practice"
              required
              options={["Fresh Original", "Practice 2"]}
              {...sel("practice")}
            />
            <Box />
          </FormGrid>

          {/* Row 3 — Modifiers */}
          <FormGrid>
            <InputField label="Modifier 1" required {...tx("modifier1")} />
            <InputField label="Modifier 2" value={form.modifier2} onChange={set("modifier2")} />
            <InputField label="Modifier 3" value={form.modifier3} onChange={set("modifier3")} />
            <InputField label="Modifier 4" value={form.modifier4} onChange={set("modifier4")} />
          </FormGrid>

          {/* Row 4 */}
          <FormGrid>
            <SelectField
              label="Select Specialty"
              required
              options={["Cardiology", "Neurology", "Orthopedics"]}
              {...sel("specialty")}
            />
            <InputField label="Unit" value={form.unit} onChange={set("unit")} />
            <InputField label="Unit Type" value={form.unitType} onChange={set("unitType")} />
            <InputField label="Procedure Charge" required {...tx("charge")} />
          </FormGrid>

          {/* Row 5 — Program + Non covered toggle */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(4, 1fr)" },
              gap: 2,
              mb: 2.5,
            }}
          >
            <SelectField
              label="Program"
              required
              options={["PDCM", "Program 2"]}
              {...sel("program")}
            />

            {/* Non covered service toggle */}
            <Box sx={{ minWidth: 0 }}>
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
                  sx={{ fontSize: 13, color: "#1E1E1E", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", mr: 1 }}
                >
                  Non covered service
                </Typography>
                <Switch
                  size="small"
                  checked={nonCovered}
                  onChange={(e) => setNonCovered(e.target.checked)}
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
            <Box />
            <Box />
          </Box>

          {/* NDC Configuration */}
          <SectionTitle>NDC Configuration</SectionTitle>
          <FormGrid>
            <SelectField
              label="NDC Code"
              options={["NDC-001", "NDC-002"]}
              value={form.ndcCode}
              onChange={set("ndcCode")}
            />
            <InputField label="NDC Label" value={form.ndcLabel} onChange={set("ndcLabel")} />
            <InputField label="Unit/Basis for measurement" value={form.ndcUnitBasis} onChange={set("ndcUnitBasis")} />
            <InputField label="NDC Default Unit Count" value={form.ndcDefaultUnit} onChange={set("ndcDefaultUnit")} />
          </FormGrid>
        </Box>

        {/* ── FOOTER BUTTONS ── */}
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
