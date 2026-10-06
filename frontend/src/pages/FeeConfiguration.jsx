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
  InputBase,
  Popover,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import { CalendarIcon, StarIcon } from "../assets/Assets";

/* ------------------------------------------------------------------ */
/* Design tokens                                                        */
/* ------------------------------------------------------------------ */
const T = {
  blue: "#2563EB",
  page: "#F7F9FC",
  border: "#D5DCE8",
};

/* ------------------------------------------------------------------ */
/* Input styles                                                         */
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

/* Same but input has right padding to avoid text going under the icon */
const inputWithIconSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    fontSize: 12,
    bgcolor: "#fff",
    "& input": {
      py: "10px",
      pl: "14px",
      pr: "36px",
      fontSize: 12,
      color: "#1F2937",
    },
    "& input::placeholder": { color: "#8F9098", opacity: 1 },
    "& .MuiOutlinedInput-notchedOutline": { borderColor: T.border },
    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#9CA3AF" },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: T.blue,
      borderWidth: "1.5px",
    },
  },
  "& .MuiFormHelperText-root": { display: "none" },
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
/* Plain input field                                                    */
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

/* ------------------------------------------------------------------ */
/* Input field with icon absolutely positioned inside                  */
/* ------------------------------------------------------------------ */
function InputFieldWithIcon({
  label,
  placeholder = "Type here",
  required,
  icon,
}) {
  return (
    <Box>
      <Label required={required}>{label}</Label>
      <Box sx={{ position: "relative" }}>
        <TextField
          fullWidth
          size="small"
          placeholder={placeholder}
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

/* ------------------------------------------------------------------ */
/* Select field                                                         */
/* ------------------------------------------------------------------ */
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

/* ------------------------------------------------------------------ */
/* Date field with MUI calendar popover                               */
/* ------------------------------------------------------------------ */
function DateField({
  label,
  value,
  onChange,
  required,
  minDate,
  placeholder = "DD-MM-YYYY",
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClose = () => setAnchorEl(null);

  const handleDateChange = (newVal) => {
    if (newVal) onChange({ target: { value: newVal.format("DD-MM-YYYY") } });
    handleClose();
  };

  const parsed = value ? dayjs(value, "DD-MM-YYYY") : null;
  const parsedValue = parsed && parsed.isValid() ? parsed : null;

  return (
    <Box>
      <Label required={required}>{label}</Label>
      <TextField
        fullWidth
        size="small"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
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
                backgroundColor: "#015DFF",
              },
              "& .MuiPickersDay-root:hover": {
                backgroundColor: "#EEF4FF",
              },
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
    <Typography
      sx={{ fontSize: 18, fontWeight: 700, color: "#111827", mb: 2, mt: 1 }}
    >
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
    cpt:          row?.cpt           ?? "",
    description:  row?.description   ?? "",
    specialty:    row?.specialty      ?? "",
    typeOfService:row?.typeOfService  ?? "",
    modifiers:    row?.modifiers      ?? "",
    program:      row?.program        ?? "",
    charge:       row?.charge         ?? "",
    practice:     row?.practice       ?? "",
    effectiveDate:row?.effectiveDate?.split(" - ")[0] ?? "",
    expiryDate:   row?.effectiveDate?.split(" - ")[1] ?? "",
  });

  const [dates, setDates] = React.useState({
    effective: row?.effectiveDate?.split(" - ")[0] ?? "",
    expiry:    row?.effectiveDate?.split(" - ")[1] ?? "",
  });
  const setDate = (field) => (e) =>
    setDates((prev) => ({ ...prev, [field]: e.target.value }));

  /* expiry can't be before the effective date */
  const effParsed = dates.effective
    ? dayjs(dates.effective, "DD-MM-YYYY")
    : null;
  const expiryMin = effParsed && effParsed.isValid() ? effParsed : undefined;

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
        {/* Title + Ask Anything Search */}
        <Box>
          <Typography
            sx={{ fontSize: 28, fontWeight: 700, color: "#111827", mb: 2 }}
          >
            {isEdit ? "Fee Configuration" : "Add New Fee"}
          </Typography>

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
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                ml: 1.5,
                mr: 1,
              }}
            >
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
              <Typography
                sx={{
                  fontSize: 10,
                  color: "#6B7280",
                  fontWeight: 500,
                  lineHeight: 1,
                }}
              >
                ⌘K
              </Typography>
            </Box>
          </Box>
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
            <InputFieldWithIcon
              label="Procedure Code"
              icon={<SearchIcon sx={{ fontSize: 18, color: "#1E1E1E" }} />}
            />
            <InputField label="HCPCS Code" />
            <InputField label="Description" />
            <SelectField
              label="Type of service"
              options={["Whole Blood", "Medical Care", "Surgery"]}
            />
          </FormGrid>

          {/* Row 2 */}
          <FormGrid>
            <SelectField label="Select POS Code" />
            <DateField
              label="Effective date"
              value={dates.effective}
              onChange={setDate("effective")}
            />
            <DateField
              label="Expiry date"
              value={dates.expiry}
              onChange={setDate("expiry")}
              minDate={expiryMin}
            />
            <SelectField
              label="Select Practice"
              options={["Fresh Original", "Practice 2"]}
            />
          </FormGrid>

          {/* Row 3 — Modifiers */}
          <FormGrid>
            <InputField label="Modifier 1" />
            <InputField label="Modifier 2" />
            <InputField label="Modifier 3" />
            <InputField label="Modifier 4" />
          </FormGrid>

          {/* Row 4 */}
          <FormGrid>
            <SelectField label="Select Speciality" />
            <InputField label="Unit" />
            <InputField label="Unit Type" />
            <InputField label="Procedure Charge" />
          </FormGrid>

          {/* Row 5 — Program + Non covered toggle */}
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
            <SelectField label="Program" options={["PDCM", "Program 2"]} />

            {/* Non covered service toggle */}
            <Box sx={{ minWidth: 0 }}>
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
            <SelectField label="NDC Code" />
            <InputField label="NDC Label" />
            <InputField label="Unit/Basis for measurement" />
            <InputField label="NDC Default Unit Count" />
          </FormGrid>
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