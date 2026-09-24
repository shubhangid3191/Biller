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
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { RPAddIcon, RPDeleteIcon } from "../assets/Assets";

/* ------------------------------------------------------------------ */
/* Design tokens                                                        */
/* ------------------------------------------------------------------ */
const T = {
  blue: "#2563EB",
  page: "#F7F9FC",
  border: "#D5DCE8",
  labelColor: "#000",
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
/* Shared components                                                    */
/* ------------------------------------------------------------------ */
function Label({ children, required }) {
  return (
    <Typography
      sx={{ fontSize: 12, fontWeight: 600, color: T.labelColor, mb: 0.5 }}
    >
      {children}
      {required && (
        <Box component="span" sx={{ color: "red", ml: 0.3 }}>
          *
        </Box>
      )}
    </Typography>
  );
}

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

function FormGrid({ children, cols = 4 }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "1fr 1fr",
          md: `repeat(${cols}, 1fr)`,
        },
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
        letterSpacing: "0.09em",
        color: "#111827",
        textTransform: "uppercase",
        mb: 2,
      }}
    >
      {children}
    </Typography>
  );
}

/* ------------------------------------------------------------------ */
/* Section Box wrapper                                                  */
/* ------------------------------------------------------------------ */
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
export default function ReferringProviderEdit() {
  const navigate = useNavigate();
  const [pcp, setPcp] = React.useState(true);

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
          Edit referring provider
        </Typography>

        {/* ══ BASIC DETAILS BOX ══ */}
        <SectionBox>
          <SectionTitle>Basic Details</SectionTitle>

          <FormGrid>
            <InputField label="First Name" />
            <InputField label="Last Name" />
            <SelectField label="Date of Birth" placeholder="Select location" />
            <SelectField label="Sex" options={["Male", "Female", "Other"]} />
          </FormGrid>

          <FormGrid>
            <SelectField label="Select suffix" />
            <SelectField label="Select prefix" />
            <InputField label="National Provider Identifier" />
            <InputField label="Group NPI" />
          </FormGrid>

          <FormGrid>
            <InputField label="State License Number" />
            <InputField label="State Controlled Substance Number" />
            <InputField label="DEA Number" placeholder="Typer here" />
            <SelectField label="Practice" required />
          </FormGrid>

          {/* PCP Toggle */}
          {/* PCP Toggle */}
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "space-between",
              border: `1px solid ${T.border}`,
              borderRadius: "8px",
              px: 1.5,
              py: "5px",
              width: { xs: "100%", sm: "50%", md: "25%" },
              bgcolor: "#fff",
              boxSizing: "border-box",
            }}
          >
            <Typography
              sx={{ fontSize: 14, fontWeight: 500, color: "#374151" }}
            >
              PCP
            </Typography>
            <Switch
              checked={pcp}
              onChange={(e) => setPcp(e.target.checked)}
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
            <IconButton size="small">
              <RPDeleteIcon width={20} height={20} color="#2563EB" />
            </IconButton>
          </Box>

          <FormGrid>
            <InputField label="Address Type" placeholder="Basic" />
            <InputField label="Address 1" placeholder="Address 1" />
            <SelectField label="Address 2" placeholder="Address 2" />
            <InputField label="Zip Code" />
          </FormGrid>

          <FormGrid>
            <InputField label="City" />
            <SelectField label="Country" />
            <SelectField label="State" />
            <SelectField label="Country" />
          </FormGrid>

          <FormGrid>
            <InputField label="Mobile Phone" />
            <InputField label="Work Contact No." />
            <InputField label="Phone" />
            <SelectField label="Fax" />
          </FormGrid>

          {/* E-mail */}
          <Box sx={{ maxWidth: { xs: "100%", sm: "50%", md: "25%" } }}>
            <SelectField label="E-mail" />
          </Box>
        </SectionBox>

        {/* ══ SPECIALTY & TAXONOMY BOX ══ */}
        <SectionBox>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <SectionTitle>Specialty & Taxonomy</SectionTitle>
            <IconButton
              size="small"
              sx={{
                p: 0,
                "&:hover": { bgcolor: "transparent" },
              }}
            >
              <RPAddIcon width={20} height={20} color={T.blue} />
            </IconButton>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: 2,
              alignItems: "end",
            }}
          >
            <SelectField label="Specialty" />
            <Box sx={{ display: "flex", alignItems: "end", gap: 1 }}>
              <Box sx={{ flex: 1 }}>
                <InputField label="Taxonomy" placeholder="Address 1" />
              </Box>
              <IconButton size="small" sx={{ mb: 0.2 }}>
                <RPDeleteIcon width={24} height={24} color="#2563EB" />
              </IconButton>
            </Box>
          </Box>
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
              fontWeight: 600,
              borderRadius: "8px",
              color: "#0052E1",
              borderColor: "#0052E1",
              px: 3,
              "&:hover": { borderColor: "#0052E1", bgcolor: "#F9FAFB" },
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
