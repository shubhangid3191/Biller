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
import { CalendarIcon } from "../assets/Assets";

dayjs.extend(customParseFormat);

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

const DATE_FORMAT = "MM-DD-YYYY";

const parseDate = (v) => {
  if (!v || v.length !== 10) return null;
  const d = dayjs(v, DATE_FORMAT, true);
  return d.isValid() ? d : null;
};

/* Required text / input fields */
const REQUIRED_TEXT = {
  cpt: "CPT / HCPCS Code",
  description: "Description",
  modifier1: "Modifier 1",
  charge: "Procedure Charge",
  effectiveDate: "Effective Date",
};

/* Required select fields */
const REQUIRED_SELECT = {
  practice: "Practice",
  specialty: "Specialty",
  typeOfService: "Type of Service",
  program: "Program",
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
/* Date field — MM-DD-YYYY                                             */
/* ------------------------------------------------------------------ */

function DateField({
  label,
  value,
  onChange,
  onBlur,
  required,
  error,
  minDate,
  placeholder = "MM-DD-YYYY",
}) {
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
            minDate={minDate}
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
/* Main Page                                                           */
/* ------------------------------------------------------------------ */

export default function FeeConfiguration() {
  const navigate = useNavigate();
  const { state: routeState } = useLocation();
  const row = routeState?.row ?? null;
  const isEdit = row !== null;

  const [nonCovered, setNonCovered] = React.useState(false);

  const [form, setForm] = React.useState({
    cpt: row?.cpt ?? "",
    description: row?.description ?? "",
    modifier1: row?.modifiers ?? "",
    modifier2: "",
    modifier3: "",
    modifier4: "",
    charge: row?.charge ?? "",
    unit: "",
    unitType: "",
    ndcLabel: "",
    ndcUnitBasis: "",
    ndcDefaultUnit: "",
    effectiveDate: row?.effectiveDate?.split(" - ")[0] ?? "",
    expiryDate: row?.effectiveDate?.split(" - ")[1] ?? "",
    /* selects */
    practice: row?.practice ?? "",
    specialty: row?.specialty ?? "",
    typeOfService: row?.typeOfService ?? "",
    program: row?.program ?? "",
    posCode: "",
    ndcCode: "",
  });

  /* touched mirrors ALL_REQUIRED keys */
  const [touched, setTouched] = React.useState({});

  /* ---------- helpers ---------- */
  const set = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const touch = (name) =>
    setTouched((prev) => (prev[name] ? prev : { ...prev, [name]: true }));

  /* error shows only after the user has visited the field (or pressed Save) */
  const errorOf = (name) =>
    touched[name] ? validateField(name, form[name]) : "";

  /* props helpers */
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
    console.log("Fee config data:", { ...form, nonCovered });
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
              {isEdit ? "Fee Configuration" : "Add Fee"}
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
              label="CPT / HCPCS Code"
              required
              endIcon={<SearchIcon sx={{ fontSize: 16, color: "#6B7280" }} />}
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
          </FormGrid>

          {/* Row 3 — Modifiers */}
          <FormGrid>
            <InputField label="Modifier 1" required {...tx("modifier1")} />

            <InputField
              label="Modifier 2"
              value={form.modifier2}
              onChange={set("modifier2")}
            />

            <InputField
              label="Modifier 3"
              value={form.modifier3}
              onChange={set("modifier3")}
            />

            <InputField
              label="Modifier 4"
              value={form.modifier4}
              onChange={set("modifier4")}
            />
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

            <InputField
              label="Unit Type"
              value={form.unitType}
              onChange={set("unitType")}
            />

            <InputField label="Procedure Charge" required {...tx("charge")} />
          </FormGrid>

          {/* Row 5 — Program + Non covered toggle */}
          <FormGrid last>
            <SelectField
              label="Program"
              required
              options={["PDCM", "Program 2"]}
              {...sel("program")}
            />

            {/* Non covered service toggle (same look as the other inputs) */}
            <Box sx={{ minWidth: 0 }}>
              <Label>Non covered service</Label>

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
                  sx={{
                    fontSize: 12,
                    color: nonCovered ? "#1F2937" : "#9CA3AF",
                  }}
                >
                  {nonCovered ? "Yes" : "No"}
                </Typography>

                <Switch
                  size="small"
                  checked={nonCovered}
                  onChange={(e) => setNonCovered(e.target.checked)}
                  inputProps={{ "aria-label": "Non covered service" }}
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

          {/* ---------------- NDC Configuration ---------------- */}
          <SectionHeader title="NDC Configuration" mt={2} />

          <FormGrid last>
            <SelectField
              label="NDC Code"
              options={["NDC-001", "NDC-002"]}
              value={form.ndcCode}
              onChange={set("ndcCode")}
            />

            <InputField
              label="NDC Label"
              value={form.ndcLabel}
              onChange={set("ndcLabel")}
            />

            <InputField
              label="Unit/Basis for measurement"
              value={form.ndcUnitBasis}
              onChange={set("ndcUnitBasis")}
            />

            <InputField
              label="NDC Default Unit Count"
              value={form.ndcDefaultUnit}
              onChange={set("ndcDefaultUnit")}
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
