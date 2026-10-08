import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

/* ------------------------------------------------------------------ */
/* Theme tokens                                                          */
/* ------------------------------------------------------------------ */
const T = {
  blue: "#2563EB",
  page: "#F7F9FC",
};

/* ------------------------------------------------------------------ */
/* Validation                                                            */
/* ------------------------------------------------------------------ */
const REQUIRED_FIELDS = {
  programName: "Program Name",
  description: "Description",
};

const validateField = (name, value) => {
  const v = String(value ?? "").trim();
  if (!REQUIRED_FIELDS[name]) return "";
  if (!v) return `${REQUIRED_FIELDS[name]} is required`;
  return "";
};

const ALL_REQUIRED = Object.fromEntries(
  Object.keys(REQUIRED_FIELDS).map((k) => [k, ""]),
);

/* ------------------------------------------------------------------ */
/* Input styles — matches AddNewPatient                                  */
/* ------------------------------------------------------------------ */
const inputSx = {
  "& .MuiOutlinedInput-root": {
    fontSize: 13,
    borderRadius: "8px",
    bgcolor: "#fff",
    "& input, & textarea": { fontSize: 13, color: "#1E1E1E", padding: "8px 12px" },
    "& input::placeholder, & textarea::placeholder": { color: "#8F9098", opacity: 1 },
    "& .MuiOutlinedInput-notchedOutline": { borderColor: "#C5C6CC" },
    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#9CA3AF" },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#006FFD",
      borderWidth: "1.5px",
    },
    "&.Mui-error .MuiOutlinedInput-notchedOutline": { borderColor: "#EF4444" },
  },
  "& .MuiInputBase-root:not(.MuiInputBase-multiline)": { height: "42px" },
  "& .MuiFormHelperText-root": { fontSize: 11, mx: 0, mt: 0.4, color: "#EF4444" },
};

/* ------------------------------------------------------------------ */
/* InputField component                                                  */
/* ------------------------------------------------------------------ */
function InputField({ label, value, onChange, onBlur, error, placeholder, required, multiline, rows }) {
  return (
    <Box>
      <Typography sx={{ fontSize: 12, fontWeight: 700, color: "#000", mb: 0.6, display: "block" }}>
        {label}
        {required && <Box component="span" sx={{ color: "#EF4444", ml: 0.3 }}>*</Box>}
      </Typography>
      <TextField
        fullWidth
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        error={!!error}
        helperText={error || ""}
        placeholder={placeholder ?? "Type here"}
        multiline={multiline}
        rows={multiline ? (rows ?? 3) : undefined}
        sx={inputSx}
      />
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                  */
/* ------------------------------------------------------------------ */
export default function ProgramEdit() {
  const navigate = useNavigate();
  const { state: routeState } = useLocation();
  const row    = routeState?.row ?? null;
  const isEdit = row !== null;

  const [form, setForm] = React.useState({
    programName: row?.programName ?? "",
    description: row?.description ?? "",
    cpt:         row?.cpt         ?? "",
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
    navigate("/program");
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
          maxWidth: 900,
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
          sx={{ fontSize: { xs: 18, sm: 20, md: 22 }, fontWeight: 700, color: "#111827" }}
        >
          {isEdit ? "Edit Program" : "Add New Program"}
        </Typography>
        </Box>

        {/* Form card */}
        <Box
          sx={{
            bgcolor: "#fff",
            borderRadius: "12px",
            border: "1px solid #E5E7EB",
            px: { xs: 2, sm: 3, md: 4 },
            py: { xs: 2, sm: 3 },
            display: "flex",
            flexDirection: "column",
            gap: 2.5,
          }}
        >
          <InputField
            label="Program Name"
            required
            placeholder="Enter program name"
            {...tx("programName")}
          />
          <InputField
            label="Description"
            required
            multiline
            rows={3}
            placeholder="Enter description"
            {...tx("description")}
          />
          <InputField
            label="CPT"
            value={form.cpt}
            onChange={set("cpt")}
            placeholder="e.g. 11980; 00934"
          />
        </Box>

        {/* Action buttons */}
        <Stack
          direction={{ xs: "column-reverse", sm: "row" }}
          spacing={1.5}
        >
          <Button
            variant="contained"
            disableElevation
            onClick={handleSave}
            sx={{
              textTransform: "none",
              fontSize: 13,
              fontWeight: 600,
              borderRadius: "8px",
              bgcolor: T.blue,
              px: 3,
              "&:hover": { bgcolor: "#1D4ED8" },
            }}
          >
            {isEdit ? "Save Changes" : "Add Program"}
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate("/program")}
            sx={{
              textTransform: "none",
              fontSize: 13,
              fontWeight: 500,
              borderRadius: "8px",
              color: "#374151",
              borderColor: "#E5E7EB",
              px: 3,
              "&:hover": { borderColor: "#D1D5DB", bgcolor: "#F9FAFB" },
            }}
          >
            Cancel
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
