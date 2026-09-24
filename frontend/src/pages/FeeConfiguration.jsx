import * as React from "react";
import { useNavigate } from "react-router-dom";
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
import { CalendarIcon, SearchIcon2 } from "../assets/Assets";

/* ------------------------------------------------------------------ */
/* Design tokens                                                        */
/* ------------------------------------------------------------------ */
const T = {
  blue: "#2563EB",
  page: "#F7F9FC",
  border: "#D5DCE8",
};

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
/* Field components                                                     */
/* ------------------------------------------------------------------ */
function InputField({ label, placeholder = "Type here", required, endIcon }) {
  return (
    <Box>
      <Label required={required}>{label}</Label>
      <TextField
        fullWidth
        size="small"
        placeholder={placeholder}
        sx={inputSx}
        InputProps={
          endIcon
            ? {
                endAdornment: (
                  <InputAdornment position="end">{endIcon}</InputAdornment>
                ),
              }
            : undefined
        }
      />
    </Box>
  );
}

function SelectField({
  label,
  placeholder = "Select",
  options = [],
  required,
  endIcon,
}) {
  return (
    <Box>
      <Label required={required}>{label}</Label>
      <FormControl fullWidth size="small">
        <Select
          displayEmpty
          defaultValue=""
          sx={selectSx}
          IconComponent={endIcon ? () => endIcon : KeyboardArrowDownIcon}
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
        px: { xs: 2, sm: 3, md: 5, lg: 7 },
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
            <InputField
              label="Procedure Code"
              endIcon={<SearchIcon2 sx={{ fontSize: 16, color: "#8F9098" }} />}
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
            <Box>
              <Label>Effective date</Label>
              <TextField
                fullWidth
                size="small"
                placeholder="Select"
                sx={inputSx}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <CalendarIcon sx={{ fontSize: 14, color: "#1E1E1E" }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box>
              <Label>Expiry date</Label>
              <TextField
                fullWidth
                size="small"
                placeholder="Select"
                sx={inputSx}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <CalendarIcon sx={{ fontSize: 14, color: "#1E1E1E" }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
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
            <Box>
              <Label>&nbsp;</Label>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  border: `1px solid ${T.border}`,
                  borderRadius: "8px",
                  px: 1.5,
                  py: "5px",
                  bgcolor: "#fff",
                  height: "42px",
                  boxSizing: "border-box",
                }}
              >
                <Typography sx={{ fontSize: 12, color: "#8F9098" }}>
                  Non covered service
                </Typography>
                <Switch
                  checked={nonCovered}
                  onChange={(e) => setNonCovered(e.target.checked)}
                  sx={{
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
              fontWeight: 600,
              borderRadius: "8px",
              color: "#374151",
              borderColor: "#D1D5DB",
              px: 3,
              "&:hover": { borderColor: "#9CA3AF", bgcolor: "#F9FAFB" },
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
              fontWeight: 600,
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
