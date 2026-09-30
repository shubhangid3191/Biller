import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  Switch,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

/* ------------------------------------------------------------------ */
/* Design tokens                                                        */
/* ------------------------------------------------------------------ */
const T = {
  blue: "#2563EB",
  page: "#F7F9FC",
  border: "#D5DCE8",
};

/* ------------------------------------------------------------------ */
/* Base input style (no adornment padding override)                    */
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
  },
  "& .MuiFormHelperText-root": { display: "none" },
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
      pr: "36px" /* reserve space for icon */,
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
function InputField({ label, placeholder = "Type here", required }) {
  return (
    <Box>
      <Label required={required}>{label}</Label>
      <TextField
        fullWidth
        size="small"
        placeholder={placeholder}
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
/* Date field: click on the icon (or the input) opens the calendar     */
/* ------------------------------------------------------------------ */
function DateField({ label, placeholder = "Select", required }) {
  return (
    <Box sx={{ minWidth: 0, width: "100%" }}>
      <Label required={required}>{label}</Label>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          format="MM/DD/YYYY"
          sx={{ width: "100%" }}
          slots={{
            openPickerIcon: () => (
              <CalendarTodayIcon sx={{ fontSize: 16, color: "#1E1E1E" }} />
            ),
          }}
          slotProps={{
            textField: {
              fullWidth: true,
              size: "small",
              placeholder,
              sx: {
                "& .MuiPickersOutlinedInput-root, & .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  bgcolor: "#fff",
                  fontSize: 12,
                  height: 38,
                  pr: "8px",
                },
                /* text area inside the picker */
                "& .MuiPickersInputBase-sectionsContainer": {
                  py: "10px",
                  pl: "14px",
                  pr: 0,
                  fontSize: 12,
                  color: "#1F2937",
                },
                "& .MuiPickersSectionList-root": {
                  py: "10px",
                  pl: "14px",
                  fontSize: 12,
                  color: "#1F2937",
                },
                /* older versions use a real <input> */
                "& input": {
                  py: "10px",
                  pl: "14px",
                  pr: 0,
                  fontSize: 12,
                  color: "#1F2937",
                },
                "& input::placeholder": { color: "#8F9098", opacity: 1 },
                "& .MuiPickersOutlinedInput-notchedOutline, & .MuiOutlinedInput-notchedOutline":
                  { borderColor: T.border },
                "&:hover .MuiPickersOutlinedInput-notchedOutline, &:hover .MuiOutlinedInput-notchedOutline":
                  { borderColor: "#9CA3AF" },
                "& .Mui-focused .MuiPickersOutlinedInput-notchedOutline, & .Mui-focused .MuiOutlinedInput-notchedOutline":
                  { borderColor: T.blue, borderWidth: "1.5px" },
                "& .MuiFormHelperText-root": { display: "none" },
              },
            },
            openPickerButton: { sx: { p: 0.5, mr: 0 } },
          }}
        />
      </LocalizationProvider>
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
/* Form grid                                                            */
/* ------------------------------------------------------------------ */
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
  const [nonCovered, setNonCovered] = React.useState(true);

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
          Fee Configuration
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
            {/* Procedure Code — with search icon */}
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
          {/* Row 2 */}
          <FormGrid>
            <SelectField label="Select POS Code" />
            <DateField label="Effective date" />
            <DateField label="Expiry date" />
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

          {/* Divider */}
          <Box sx={{ borderTop: "1px solid #E5E7EB", my: 3 }} />

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
