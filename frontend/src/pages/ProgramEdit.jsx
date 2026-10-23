import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Typography, TextField, Button, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

/* ------------------------------------------------------------------ */
/* Design tokens                                                       */
/* ------------------------------------------------------------------ */

const T = {
  blue: "#2563EB",
  page: "#F5F7FA", // same page bg as the other pages
  border: "#E5E7EB",
  fieldBg: "#F9FAFC",
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
/* Input styles (height 34, fontSize 12, radius 6)                      */
/* ------------------------------------------------------------------ */

const inputSx = {
  width: "100%",
  "& .MuiOutlinedInput-root": {
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
      height: 34,
      boxSizing: "border-box",
      padding: "0 10px",
      fontSize: 12,
      color: "#1F2937",
    },

    /* multiline description box */
    "&.MuiInputBase-multiline": {
      padding: "8px 10px",
    },
    "& textarea": {
      fontSize: 12,
      color: "#1F2937",
      padding: 0,
    },

    "& input::placeholder, & textarea::placeholder": {
      color: "#9CA3AF",
      opacity: 1,
    },
  },

  "& .MuiFormHelperText-root": {
    fontSize: 10.5,
    mx: 0,
    ml: 0,
    mt: 0.4,
    color: T.error,
  },
};

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
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  required,
  multiline,
  rows,
}) {
  return (
    <Box sx={{ minWidth: 0 }}>
      <Label required={required}>{label}</Label>

      <TextField
        fullWidth
        size="small"
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
/* Section Box (p 2, border, radius 8)                                  */
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
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
      }}
    >
      {children}
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* Main Page                                                           */
/* ------------------------------------------------------------------ */

export default function ProgramEdit() {
  const navigate = useNavigate();
  const { state: routeState } = useLocation();
  const row = routeState?.row ?? null;
  const isEdit = row !== null;

  const [form, setForm] = React.useState({
    programName: row?.programName ?? "",
    description: row?.description ?? "",
    cpt: row?.cpt ?? "",
  });

  const [touched, setTouched] = React.useState({});

  /* ---------- helpers ---------- */
  const set = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const touch = (name) =>
    setTouched((prev) => (prev[name] ? prev : { ...prev, [name]: true }));

  /* error shows only after the user has visited the field (or pressed Save) */
  const errorOf = (name) =>
    touched[name] ? validateField(name, form[name]) : "";

  const tx = (name) => ({
    value: form[name],
    onChange: set(name),
    onBlur: () => touch(name),
    error: errorOf(name),
  });

  /* ---------- save ---------- */
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

    if (isEdit) {
      // pass updated row back to Program list
      navigate("/program", {
        state: {
          result: {
            action: "edit",
            data: { id: row.id, ...form },
          },
        },
      });
    } else {
      // pass new row back to Program list
      navigate("/program", {
        state: {
          result: {
            action: "add",
            data: form,
          },
        },
      });
    }
  };

  /* footer button look (same as the other pages) */
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
          maxWidth: 900,
          mx: "auto",
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
              {isEdit ? "Edit Program" : "Add New Program"}
            </Typography>
          </Box>
        </Box>

        {/* =========================================================
            FORM CARD
        ========================================================= */}
        <SectionBox>
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
            onClick={() => navigate("/program")}
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
            {isEdit ? "Save Changes" : "Add Program"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
