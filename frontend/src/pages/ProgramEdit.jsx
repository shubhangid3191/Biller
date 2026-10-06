import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";

/* ------------------------------------------------------------------ */
/* Theme tokens                                                          */
/* ------------------------------------------------------------------ */
const T = {
  blue: "#2563EB",
  page: "#F7F9FC",
};

/* ------------------------------------------------------------------ */
/* Shared helpers                                                        */
/* ------------------------------------------------------------------ */
const labelSx = {
  fontSize: 13,
  fontWeight: 500,
  color: "#374151",
  mb: 0.6,
  display: "block",
};

const inputSx = {
  "& .MuiOutlinedInput-root": {
    fontSize: 13,
    borderRadius: "8px",
    backgroundColor: "#F9FAFC",
    "& fieldset": { borderColor: "#E5E7EB" },
    "&:hover fieldset": { borderColor: "#D1D5DB" },
    "&.Mui-focused fieldset": { borderColor: T.blue },
  },
};

function InputField({ label, value, onChange, placeholder, required, multiline, rows }) {
  return (
    <Box>
      <Typography sx={labelSx}>
        {label}
        {required && <Box component="span" sx={{ color: "#EF4444", ml: 0.3 }}>*</Box>}
      </Typography>
      <TextField
        fullWidth
        size="small"
        value={value}
        onChange={onChange}
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
    programName:  row?.programName  ?? "",
    description:  row?.description  ?? "",
    cpt:          row?.cpt          ?? "",
  });

  const set = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSave = () => {
    if (!form.programName.trim()) return;
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
        <Typography sx={{ fontSize: 28, fontWeight: 700, color: "#111827" }}>
          {isEdit ? "Edit Program" : "Add New Program"}
        </Typography>

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
            value={form.programName}
            onChange={set("programName")}
          />
          <InputField
            label="Description"
            required
            multiline
            rows={3}
            value={form.description}
            onChange={set("description")}
          />
          <InputField
            label="CPT"
            value={form.cpt}
            onChange={set("cpt")}
            placeholder="e.g. 11980; 00934"
          />
        </Box>

        {/* Action buttons */}
        <Stack direction="row" spacing={1.5}>
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
