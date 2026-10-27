import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Select,
  FormControl,
  FormHelperText,
  Checkbox,
  FormControlLabel,
  Button,
  IconButton,
  InputAdornment,
  Popover,
  Dialog,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import {
  AlertBellIcon,
  SaveDraftFileIcon,
  PlusBlueIcon,
  TiaChatIcon2,
  encounterAssistCheck,
  CalendarBlueIcon,
  CalendarIcon,
  RPEditIcon,
  RPDeleteIcon,
} from "../assets/Assets.jsx";

import { validatePhone } from "../utils/phoneValidation.js";

// Needed so dayjs can strictly parse "MM-DD-YYYY"
dayjs.extend(customParseFormat);

const DATE_FORMAT = "MM-DD-YYYY";

/* ================================================================== */
/* DESIGN TOKENS (same as ReferringProviderEdit / NewClaim)            */
/* ================================================================== */
const T = {
  blue: "#0066FF",
  blueHover: "#0052CC",
  page: "#F5F7FA",
  border: "#E5E7EB",
  fieldBg: "#FFFFFF",
  label: "#2F3036",
  text: "#1F2937",
  muted: "#6B7280",
  placeholder: "#9CA3AF",
  error: "#EF4444",
};

/* Section accent colours (only used on the section header strip) */
const A = {
  purple: { main: "#5443C4", bg: "#F0EEF8" },
  green: { main: "#12795B", bg: "#EBF7F3" },
  orange: { main: "#B0552A", bg: "#FEF4ED" },
  amber: { main: "#8E641A", bg: "#FBF5E3" },
  teal: { main: "#1A808E", bg: "#EAF6F7" },
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

const hideScroll = {
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  "&::-webkit-scrollbar": { display: "none" },
};

/* ================================================================== */
/* RESPONSIVE HELPERS                                                  */
/* Container queries: the page reacts to the width of the area it is   */
/* rendered in (so it is correct even with a sidebar), with an         */
/* automatic viewport @media fallback for old browsers.                */
/* ================================================================== */
const BP = { sm: 560, md: 820, lg: 1040 };

const cqs = (map) => {
  const out = {};
  const fallback = {};
  Object.keys(map).forEach((bp) => {
    out[`@container (min-width: ${BP[bp]}px)`] = map[bp];
    fallback[`@media (min-width: ${BP[bp]}px)`] = map[bp];
  });
  out["@supports not (container-type: inline-size)"] = fallback;
  return out;
};
const cq = (bp, styles) => cqs({ [bp]: styles });

/* ================================================================== */
/* DATE HELPERS                                                        */
/* ================================================================== */
// Auto-inserts dashes while typing: 08252026 -> 08-25-2026
const maskDate = (raw) => {
  const d = (raw || "").replace(/\D/g, "").slice(0, 8);
  let out = d.slice(0, 2);
  if (d.length > 2) out += "-" + d.slice(2, 4);
  if (d.length > 4) out += "-" + d.slice(4);
  return out;
};

const parseDate = (value) => {
  if (!value || value.length !== 10) return null;
  const parsed = dayjs(value, DATE_FORMAT, true);
  return parsed.isValid() ? parsed : null;
};

// accepts "08/25/2026" or "08-25-2026" and returns "08-25-2026"
const normalizeDate = (s) => String(s || "").replace(/\//g, "-");

/* ================================================================== */
/* INPUT STYLES (height 34, fontSize 12, radius 6)                     */
/* ================================================================== */
const inputSx = {
  width: "100%",
  "& .MuiOutlinedInput-root": {
    height: 34,
    minHeight: 34,
    boxSizing: "border-box",
    fontSize: 12,
    borderRadius: "6px",
    backgroundColor: T.fieldBg,
    color: T.text,

    "& fieldset": { borderColor: T.border },
    "&:hover fieldset": { borderColor: "#D1D5DB" },
    "&.Mui-focused fieldset": { borderColor: T.blue, borderWidth: "1px" },
    "&.Mui-error fieldset": { borderColor: T.error },

    "& input": {
      height: "100%",
      boxSizing: "border-box",
      padding: "0 10px",
      fontSize: 12,
      color: T.text,
    },
    "& input::placeholder": { color: T.placeholder, opacity: 1 },
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

/* same look, but grows with its content (textarea) */
const multilineSx = {
  ...inputSx,
  "& .MuiOutlinedInput-root": {
    ...inputSx["& .MuiOutlinedInput-root"],
    height: "auto",
    padding: "7px 10px",
    "& textarea": {
      fontSize: 12,
      padding: 0,
      color: T.text,
      lineHeight: 1.5,
    },
    "& textarea::placeholder": { color: T.placeholder, opacity: 1 },
  },
};

const selectSx = (error = false) => ({
  height: 34,
  borderRadius: "6px",
  fontSize: 12,
  backgroundColor: T.fieldBg,
  color: T.text,

  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: error ? T.error : T.border,
    borderRadius: "6px",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: error ? T.error : "#D1D5DB",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: error ? T.error : T.blue,
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
    color: T.muted,
    right: 6,
    fontSize: 18,
  },
});

/* ================================================================== */
/* BUTTON STYLES                                                       */
/* ================================================================== */
const outlineBtnSx = {
  textTransform: "none",
  fontSize: 12,
  fontWeight: 600,
  height: 34,
  px: 2.5,
  borderRadius: "8px",
  color: T.blue,
  borderColor: T.blue,
  backgroundColor: "#FFFFFF",
  whiteSpace: "nowrap",
  flexShrink: 0,
  "&:hover": { borderColor: T.blueHover, backgroundColor: "#F5F9FF" },
};

const primaryBtnSx = {
  textTransform: "none",
  fontSize: 12,
  fontWeight: 600,
  height: 34,
  px: 3,
  borderRadius: "8px",
  bgcolor: T.blue,
  boxShadow: "none",
  whiteSpace: "nowrap",
  flexShrink: 0,
  "&:hover": { bgcolor: T.blueHover, boxShadow: "none" },
};

/* smaller variant used inside section headers */
const btnSm = { height: 30, px: 1.75, fontSize: 12 };

function OutlineBtn({ children, sx, ...rest }) {
  return (
    <Button
      variant="outlined"
      disableElevation
      {...rest}
      sx={{ ...outlineBtnSx, ...sx }}
    >
      {children}
    </Button>
  );
}

function PrimaryBtn({ children, sx, ...rest }) {
  return (
    <Button
      variant="contained"
      disableElevation
      {...rest}
      sx={{ ...primaryBtnSx, ...sx }}
    >
      {children}
    </Button>
  );
}

/* Action icon button inside tables: fixed box, icon always centered */
const actionBtnSx = {
  width: 28,
  height: 28,
  p: 0,
  borderRadius: "6px",
  color: T.blue,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "&:hover": { bgcolor: "#EEF4FF" },
  "& svg": { display: "block" },
};

/* ================================================================== */
/* FIELD COMPONENTS                                                    */
/* ================================================================== */

/* Works controlled (value + onChange) or uncontrolled (defaultValue) */
function useControllable(value, defaultValue, onChange) {
  const [inner, setInner] = React.useState(defaultValue ?? "");
  const isControlled = value !== undefined;
  const handle = (e) => {
    if (!isControlled) setInner(e.target.value);
    if (onChange) onChange(e);
  };
  return [isControlled ? value : inner, handle];
}

function Label({ children, required }) {
  return (
    <Typography
      component="label"
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
  value,
  defaultValue,
  onChange,
  onBlur,
  error,
  inputMode,
  maxLength,
  multiline = false,
  rows = 2,
}) {
  const [val, handle] = useControllable(value, defaultValue, onChange);
  return (
    <Box sx={{ minWidth: 0 }}>
      <Label required={required}>{label}</Label>
      <TextField
        fullWidth
        size="small"
        placeholder={placeholder}
        value={val}
        onChange={handle}
        onBlur={onBlur}
        error={!!error}
        helperText={error || ""}
        multiline={multiline}
        rows={multiline ? rows : undefined}
        inputProps={{ inputMode, maxLength }}
        sx={multiline ? multilineSx : inputSx}
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
  defaultValue,
  onChange,
  onClose,
  error,
}) {
  const [val, handle] = useControllable(value, defaultValue, onChange);
  return (
    <Box sx={{ minWidth: 0 }}>
      <Label required={required}>{label}</Label>
      <FormControl fullWidth size="small" error={!!error}>
        <Select
          displayEmpty
          value={val}
          onChange={handle}
          onClose={onClose}
          sx={selectSx(!!error)}
          IconComponent={KeyboardArrowDownIcon}
          renderValue={(v) =>
            v ? (
              <span style={{ fontSize: 12, color: T.text }}>{v}</span>
            ) : (
              <span style={{ fontSize: 12, color: T.placeholder }}>
                {placeholder}
              </span>
            )
          }
        >
          <MenuItem value="" sx={{ fontSize: 12, color: T.placeholder }}>
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

/* MM-DD-YYYY: typing is auto-masked, calendar popup too */
function DateField({
  label,
  required,
  value,
  defaultValue,
  onChange,
  onBlur,
  error,
  disableFuture = false,
  placeholder = "MM-DD-YYYY",
}) {
  const [val, handle] = useControllable(
    value,
    normalizeDate(defaultValue),
    onChange,
  );
  const [anchorEl, setAnchorEl] = React.useState(null);
  const fieldRef = React.useRef(null);

  const parsedValue = parseDate(val);
  const invalidFormat = val.length === 10 && !parsedValue;
  const message = invalidFormat ? "Enter a valid date (MM-DD-YYYY)" : error;

  const emit = (v) => handle({ target: { value: v } });

  const handleDateChange = (newVal) => {
    if (newVal && newVal.isValid()) emit(newVal.format(DATE_FORMAT));
    setAnchorEl(null);
  };

  return (
    <Box sx={{ minWidth: 0 }}>
      <Label required={required}>{label}</Label>
      <TextField
        fullWidth
        size="small"
        ref={fieldRef}
        placeholder={placeholder}
        value={val}
        onChange={(e) => emit(maskDate(e.target.value))}
        onBlur={onBlur}
        error={!!message}
        helperText={message || ""}
        inputProps={{ inputMode: "numeric", maxLength: 10 }}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end" sx={{ mr: "-4px" }}>
                <IconButton
                  onClick={() => setAnchorEl(fieldRef.current)}
                  aria-label="Open calendar"
                  disableRipple
                  sx={{ p: "4px", "&:hover": { background: "transparent" } }}
                >
                  <CalendarIcon width={14} height={16} color={T.blue} />
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
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          paper: {
            sx: {
              borderRadius: "12px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
              mt: 0.5,
              maxWidth: "calc(100vw - 16px)",
            },
          },
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            value={parsedValue}
            onChange={handleDateChange}
            disableFuture={disableFuture}
            sx={{
              width: { xs: "280px", sm: "320px" },
              maxWidth: "100%",
              "& .MuiPickersDay-root.Mui-selected": {
                backgroundColor: T.blue,
              },
              "& .MuiPickersDay-root:hover": { backgroundColor: "#EEF4FF" },
            }}
          />
        </LocalizationProvider>
      </Popover>
    </Box>
  );
}

function CheckboxGroupField({ label, options = [] }) {
  return (
    <Box sx={{ minWidth: 0 }}>
      <Label>{label}</Label>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          border: `1px solid ${T.border}`,
          borderRadius: "6px",
          bgcolor: T.fieldBg,
          px: "10px",
          height: 34,
          boxSizing: "border-box",
          overflow: "hidden",
          "&:hover": { borderColor: "#D1D5DB" },
        }}
      >
        {options.map((opt) => (
          <FormControlLabel
            key={opt}
            sx={{ m: 0 }}
            control={
              <Checkbox
                size="small"
                sx={{
                  p: 0.4,
                  color: "#C8CDD8",
                  "&.Mui-checked": { color: T.blue },
                  "& svg": { fontSize: 16 },
                }}
              />
            }
            label={
              <Typography sx={{ fontSize: 12, color: T.text }}>
                {opt}
              </Typography>
            }
          />
        ))}
      </Box>
    </Box>
  );
}

/* ================================================================== */
/* GRID                                                                */
/* 1 column -> 2 columns (>=560) -> N columns (>=820)                  */
/* ================================================================== */
function FormGrid({ children, cols = 4 }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr)",
        gap: 1.5,
        width: "100%",
        alignItems: "start",
        ...cqs({
          sm: { gridTemplateColumns: "repeat(2, minmax(0, 1fr))" },
          md: {
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          },
        }),
      }}
    >
      {children}
    </Box>
  );
}

/* grid item that can span several columns on wide screens */
function Cell({ span = 1, children }) {
  return (
    <Box
      sx={{
        minWidth: 0,
        ...cqs({
          sm: { gridColumn: span >= 2 ? "span 2" : "auto" },
          md: { gridColumn: `span ${span}` },
        }),
      }}
    >
      {children}
    </Box>
  );
}

function renderField({ type, span, ...props }) {
  if (type === "select") return <SelectField {...props} />;
  if (type === "date") return <DateField {...props} />;
  if (type === "checks") return <CheckboxGroupField {...props} />;
  return <InputField {...props} />;
}

/* config driven grid: fields = [{ label, type, defaultValue, span, ... }] */
function FieldGrid({ fields, cols = 4 }) {
  return (
    <FormGrid cols={cols}>
      {fields.map((f, i) => (
        <Cell key={i} span={f.span || 1}>
          {renderField(f)}
        </Cell>
      ))}
    </FormGrid>
  );
}

/* ================================================================== */
/* SECTION CARD (same card as ReferringProviderEdit + accent header)   */
/* ================================================================== */
function SectionCard({
  id,
  sectionRef,
  number,
  title,
  accent,
  rightSlot,
  children,
}) {
  return (
    <Paper
      id={id}
      ref={sectionRef}
      elevation={0}
      sx={{
        backgroundColor: "#FFFFFF",
        borderRadius: "8px",
        border: `1px solid ${T.border}`,
        boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
        overflow: "hidden",
        width: "100%",
        minWidth: 0,
      }}
    >
      <Box
        sx={{
          bgcolor: accent.bg,
          borderLeft: `4px solid ${accent.main}`,
          borderBottom: `1px solid ${T.border}`,
          px: 2,
          py: 1,
          minHeight: 44,
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        <Typography sx={{ fontSize: 13, fontWeight: 700, color: accent.main }}>
          {number}. {title}
        </Typography>
        {rightSlot && (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {rightSlot}
          </Box>
        )}
      </Box>

      <Box
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
          minWidth: 0,
        }}
      >
        {children}
      </Box>
    </Paper>
  );
}

/* small bold sub-heading inside a card */
function SubTitle({ children, color = T.text, right }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 1,
        mb: 0.75,
      }}
    >
      <Typography sx={{ fontSize: 12, fontWeight: 700, color }}>
        {children}
      </Typography>
      {right}
    </Box>
  );
}

/* ================================================================== */
/* TABLE HELPERS (inputs inside cells use the same input style)        */
/* ================================================================== */
const tableWrapSx = {
  border: `1px solid ${T.border}`,
  borderRadius: "8px",
  overflowX: "auto",
  maxWidth: "100%",
  ...thinScroll,
};

const tableHeadSx = (accent) => ({
  bgcolor: accent.bg,
  color: accent.main,
  fontSize: 11,
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.04em",
  whiteSpace: "nowrap",
  py: 1,
  px: 1.25,
  borderBottom: `1px solid ${T.border}`,
});

const tableCellSx = {
  py: 0.75,
  px: 1.25,
  borderBottom: `1px solid ${T.border}`,
  verticalAlign: "middle",
  whiteSpace: "nowrap",
  fontSize: 12,
  color: T.text,
};

function CellInput({ defaultValue, value, onChange, minWidth = 100 }) {
  return (
    <TextField
      size="small"
      {...(value !== undefined ? { value, onChange } : { defaultValue })}
      sx={{ ...inputSx, minWidth }}
    />
  );
}

function CellSelect({ defaultValue, options, minWidth = 130 }) {
  return (
    <FormControl size="small" sx={{ minWidth, width: "100%" }}>
      <Select
        defaultValue={defaultValue}
        sx={selectSx()}
        IconComponent={KeyboardArrowDownIcon}
      >
        {options.map((o) => (
          <MenuItem key={o} value={o} sx={{ fontSize: 12 }}>
            {o}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

function ActiveBadge() {
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#E8F8F0",
        border: "1px solid #A8DFCA",
        borderRadius: "6px",
        px: 1.2,
        height: 26,
        minWidth: 58,
      }}
    >
      <Typography sx={{ fontSize: 11, fontWeight: 700, color: "#1A9E6E" }}>
        Active
      </Typography>
    </Box>
  );
}

/* ================================================================== */
/* STEPS                                                               */
/* ================================================================== */
const STEPS = [
  { id: "patient", label: "Patient" },
  { id: "case", label: "Case & Insurance" },
  { id: "conditions", label: "Conditions & Auth" },
  { id: "charges", label: "Charges & Review" },
  { id: "additional", label: "Additional Details" },
];

/* ================================================================== */
/* TOP BAR                                                             */
/* ================================================================== */
function TopBar({ title = "New Charge Capture" }) {
  return (
    <Box sx={{ minWidth: 0 }}>
      <Typography
        sx={{
          fontSize: 10.5,
          fontWeight: 700,
          letterSpacing: "0.08em",
          color: T.muted,
          textTransform: "uppercase",
          lineHeight: 1.3,
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          fontSize: 16,
          fontWeight: 700,
          color: "#111827",
          lineHeight: 1.3,
        }}
      >
        Claim ID #29068396
      </Typography>
    </Box>
  );
}

/* ================================================================== */
/* STEPPER NAV                                                         */
/* ================================================================== */
function StepperNav({ activeId, onStepClick, onAlertsClick, onBack }) {
  const listRef = React.useRef(null);

  React.useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const pill = list.querySelector(`[data-step="${activeId}"]`);
    if (!pill) return;
    const l = list.getBoundingClientRect();
    const p = pill.getBoundingClientRect();
    list.scrollTo({
      left: list.scrollLeft + (p.left - l.left) - (l.width - p.width) / 2,
      behavior: "smooth",
    });
  }, [activeId]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        justifyContent: "space-between",
        gap: 1,
        ...cq("md", { flexDirection: "row", alignItems: "center" }),
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          flexGrow: 1,
          minWidth: 0,
        }}
      >
        {onBack && (
          <IconButton
            onClick={onBack}
            aria-label="Go back"
            sx={{
              flexShrink: 0,
              color: "#5A6B7E",
              border: `1px solid ${T.border}`,
              bgcolor: "#FFFFFF",
              borderRadius: "8px",
              width: 32,
              height: 32,
              "&:hover": { bgcolor: "#F3F4F6", borderColor: "#D1D5DB" },
            }}
          >
            <ArrowBackIcon sx={{ fontSize: 18 }} />
          </IconButton>
        )}

        <Box
          ref={listRef}
          sx={{
            display: "flex",
            alignItems: "center",
            overflowX: "auto",
            flexGrow: 1,
            minWidth: 0,
            ...hideScroll,
          }}
        >
          {STEPS.map((step, index) => {
            const isActive = step.id === activeId;
            return (
              <React.Fragment key={step.id}>
                <Box
                  data-step={step.id}
                  onClick={() => onStepClick(step.id)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.6,
                    cursor: "pointer",
                    flexShrink: 0,
                    px: 0.9,
                    height: 28,
                    boxSizing: "border-box",
                    borderRadius: "999px",
                    bgcolor: isActive ? "#1A1D23" : "#fff",
                    border: isActive
                      ? "1px solid #1A1D23"
                      : "1px solid #C8CDD8",
                    transition:
                      "background-color 0.3s ease, border-color 0.3s ease",
                    "&:hover": {
                      borderColor: isActive ? "#1A1D23" : "#9CA3AF",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 18,
                      height: 18,
                      borderRadius: "50%",
                      bgcolor: isActive ? T.blue : "transparent",
                      border: isActive
                        ? `1px solid ${T.blue}`
                        : "1px solid #C8CDD8",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 10,
                      fontWeight: isActive ? 800 : 600,
                      color: isActive ? "#fff" : "#5A6B7E",
                      flexShrink: 0,
                    }}
                  >
                    {index + 1}
                  </Box>
                  <Typography
                    sx={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: isActive ? "#fff" : "#5A6B7E",
                      whiteSpace: "nowrap",
                      display: isActive ? "block" : "none",
                      ...cq("sm", { display: "block" }),
                    }}
                  >
                    {step.label}
                  </Typography>
                </Box>

                {index < STEPS.length - 1 && (
                  <Box
                    aria-hidden="true"
                    sx={{
                      flexShrink: 0,
                      mx: 0.5,
                      width: 14,
                      height: "1px",
                      bgcolor: "#D1D5DB",
                    }}
                  />
                )}
              </React.Fragment>
            );
          })}
        </Box>
      </Box>

      <Box sx={{ display: "flex", gap: 1, flexShrink: 0 }}>
        <OutlineBtn
          startIcon={<AlertBellIcon />}
          onClick={onAlertsClick}
          sx={{ ...btnSm, color: "#5A6B7E", borderColor: T.border }}
        >
          Alerts
        </OutlineBtn>
        <OutlineBtn
          startIcon={<PlusBlueIcon />}
          sx={{ ...btnSm, color: "#5A6B7E", borderColor: T.border }}
        >
          Add task
        </OutlineBtn>
      </Box>
    </Box>
  );
}

/* ================================================================== */
/* ENCOUNTER SUMMARY + ASSIST BANNER (only for existing claims)        */
/* ================================================================== */
function SummaryItem({ label, value, valueColor }) {
  return (
    <Box sx={{ minWidth: 0 }}>
      <Typography
        sx={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.08em",
          color: T.muted,
          textTransform: "uppercase",
          mb: 0.25,
        }}
      >
        {label}
      </Typography>
      <Typography
        sx={{
          fontSize: 12,
          fontWeight: 500,
          color: valueColor || "#111827",
          lineHeight: 1.3,
          overflowWrap: "anywhere",
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}

function EncounterSummary({ claimData }) {
  const encounterText = claimData
    ? `${claimData.encounterId || "N/A"} - Draft`
    : "NEW - Draft";
  const patientText = claimData ? claimData.patientName : "Wayne, Jimmy";
  const detailsText = claimData
    ? `${claimData.dob || "N/A"} - ${claimData.gender?.replace(/[()]/g, "") || "N/A"} - MRN ${claimData.mrn || "N/A"}`
    : "06/15/1978 - M - MRN 326362969";

  return (
    <Paper
      elevation={0}
      sx={{
        border: `1px solid ${T.border}`,
        borderRadius: "8px",
        bgcolor: "#fff",
        p: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 1.5,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          minWidth: 0,
          ...cq("sm", { flexDirection: "row", gap: 4 }),
        }}
      >
        <SummaryItem label="Encounter" value={encounterText} />
        <SummaryItem label="Patient" value={patientText} />
        <SummaryItem label="Details" value={detailsText} valueColor={T.muted} />
      </Box>
      <Chip
        label="Unbilled"
        sx={{
          bgcolor: "#FBF1DC",
          color: "#946312",
          fontWeight: 700,
          fontSize: 11,
          borderRadius: "6px",
          height: 24,
          "& .MuiChip-label": { px: 1.2 },
        }}
      />
    </Paper>
  );
}

function AssistBanner() {
  const bold = { fontWeight: 700, color: "#2B2842" };
  return (
    <Paper
      elevation={0}
      sx={{
        border: `1px solid ${T.border}`,
        borderRadius: "8px",
        bgcolor: A.purple.bg,
        p: 2,
        display: "flex",
        gap: 1,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ minWidth: 0 }}>
        <Typography
          sx={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.06em",
            color: A.purple.main,
            textTransform: "uppercase",
            mb: 0.5,
          }}
        >
          Encounter Assist
        </Typography>
        <Typography
          sx={{ fontSize: 12, color: A.purple.main, lineHeight: 1.6 }}
        >
          Pre-filled from the 08/15 appointment and EHR note. I matched the
          patient, pulled the active{" "}
          <Box component="span" sx={bold}>
            Aetna POS
          </Box>{" "}
          case, and suggested CPT{" "}
          <Box component="span" sx={bold}>
            99213
          </Box>{" "}
          with dx{" "}
          <Box component="span" sx={bold}>
            A/B
          </Box>
          .{" "}
          <Box component="span" sx={bold}>
            Eligibility isn&apos;t verified yet
          </Box>{" "}
          - one click below runs it. Nothing here opens a new window.
        </Typography>
      </Box>

      <Box
        sx={{
          flexShrink: 0,
          width: 36,
          height: 36,
          borderRadius: "50%",
          bgcolor: "#CFE2FF",
          display: "none",
          alignItems: "center",
          justifyContent: "center",
          ml: 2,
          ...cq("sm", { display: "flex" }),
        }}
      >
        {encounterAssistCheck({})}
      </Box>
    </Paper>
  );
}

/* ================================================================== */
/* CARD 1 - PATIENT                                                    */
/* ================================================================== */
const EMPTY_PATIENT = {
  legalName: "",
  dob: "",
  gender: "",
  mrn: "",
  ssn: "",
  mobile: "",
  address: "",
  maritalStatus: "",
  emplStatus: "",
  referralSource: "",
  employer: "",
  pcp: "",
  referringPhysician: "",
};

const getInitialPatient = (claimData, isNewClaim) => {
  if (claimData) {
    // Edit mode - populate from claim data
    return {
      ...EMPTY_PATIENT,
      legalName: claimData.patientName || "",
      dob: normalizeDate(claimData.dob),
      gender: claimData.gender?.replace(/[()]/g, "") || "",
      mrn: claimData.mrn || "",
    };
  }
  // New claim - empty fields
  if (isNewClaim) return { ...EMPTY_PATIENT };
  // Default - pre-filled example data
  return {
    legalName: "Wayne Jimmy",
    dob: "08-25-1978",
    gender: "Male",
    mrn: "563526626",
    ssn: "563526626",
    mobile: "3134046928",
    address: "Capitol Way S, Washingtone, AR 12344",
    maritalStatus: "NA",
    emplStatus: "NA",
    referralSource: "NA",
    employer: "NA",
    pcp: "NA",
    referringPhysician: "NA",
  };
};

function PatientSection({
  sectionRef,
  isNewClaim = false,
  isEditMode = false,
  claimData = null,
}) {
  const navigate = useNavigate();
  const [patient, setPatient] = React.useState(() =>
    getInitialPatient(claimData, isNewClaim),
  );
  const [phoneErrors, setPhoneErrors] = React.useState({});

  const setField = (field) => (e) =>
    setPatient((prev) => ({ ...prev, [field]: e.target.value }));

  /* phone: digits only, max 10 */
  const handlePhoneChange = (field) => (e) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
    setPatient((prev) => ({ ...prev, [field]: digits }));
    setPhoneErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handlePhoneBlur = (field) => () => {
    const error = validatePhone(patient[field]);
    setPhoneErrors((prev) => ({ ...prev, [field]: error }));
  };

  return (
    <SectionCard
      id="patient"
      sectionRef={sectionRef}
      number={1}
      title="Patient"
      accent={A.purple}
      rightSlot={
        <>
          <OutlineBtn sx={btnSm}>Select existing</OutlineBtn>
          {!isEditMode && (
            <PrimaryBtn sx={btnSm} onClick={() => navigate("/add-new-patient")}>
              + New patient
            </PrimaryBtn>
          )}
        </>
      }
    >
      <FormGrid>
        <InputField
          label="Legal Name"
          placeholder="Enter legal name"
          value={patient.legalName}
          onChange={setField("legalName")}
        />
        <DateField
          label="DOB"
          disableFuture
          value={patient.dob}
          onChange={setField("dob")}
        />
        <SelectField
          label="Gender"
          options={["Male", "Female", "Other"]}
          value={patient.gender}
          onChange={setField("gender")}
        />
        <InputField
          label="MRN"
          placeholder="Enter MRN"
          value={patient.mrn}
          onChange={setField("mrn")}
        />
      </FormGrid>

      <FormGrid>
        <InputField
          label="SSN"
          placeholder="000-00-0000"
          value={patient.ssn}
          onChange={setField("ssn")}
        />
        <InputField
          label="Mobile No"
          placeholder="10-digit number"
          inputMode="numeric"
          maxLength={10}
          value={patient.mobile}
          onChange={handlePhoneChange("mobile")}
          onBlur={handlePhoneBlur("mobile")}
          error={phoneErrors.mobile}
        />
        <InputField
          label="Marital Status"
          placeholder="Enter status"
          value={patient.maritalStatus}
          onChange={setField("maritalStatus")}
        />
        <InputField
          label="Empl. Status"
          placeholder="Enter status"
          value={patient.emplStatus}
          onChange={setField("emplStatus")}
        />
      </FormGrid>

      <FormGrid>
        <InputField
          label="Address"
          placeholder="Enter full address"
          multiline
          rows={2}
          value={patient.address}
          onChange={setField("address")}
        />
        <InputField
          label="Referral Source"
          placeholder="Enter source"
          value={patient.referralSource}
          onChange={setField("referralSource")}
        />
        <InputField
          label="Employer"
          placeholder="Enter employer"
          value={patient.employer}
          onChange={setField("employer")}
        />
        <InputField
          label="PCP"
          placeholder="Enter PCP"
          value={patient.pcp}
          onChange={setField("pcp")}
        />
      </FormGrid>

      <FormGrid>
        <InputField
          label="Referring Physician"
          placeholder="Enter physician"
          value={patient.referringPhysician}
          onChange={setField("referringPhysician")}
        />
      </FormGrid>
    </SectionCard>
  );
}

/* ================================================================== */
/* CARD 2 - CASE & INSURANCE                                           */
/* ================================================================== */

/* Own component so each checkbox owns its state */
function CaseCheck({ label, initial }) {
  const [checked, setChecked] = React.useState(initial);
  return (
    <FormControlLabel
      sx={{ mr: 2.5, ml: 0 }}
      control={
        <Checkbox
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          size="small"
          sx={{
            p: 0.5,
            color: "#C8CDD8",
            "&.Mui-checked": { color: T.blue },
            "& svg": { fontSize: 18 },
          }}
        />
      }
      label={
        <Typography sx={{ fontSize: 12, fontWeight: 500, color: T.text }}>
          {label}
        </Typography>
      }
    />
  );
}

const POLICY_ROWS = [
  {
    checked: true,
    type: "PRIMARY",
    insurance: "Aetna",
    plan: "Aetna-Plan name",
    policy: "298692786",
    group: "298692786",
  },
  {
    checked: false,
    type: "SECONDARY",
    insurance: "Aetna",
    plan: "Aetna-Plan name",
    policy: "298692786",
    group: "298692786",
  },
];

const POLICY_COLS = [
  "",
  "Type",
  "Insurance",
  "Plan",
  "Policy #",
  "Group #",
  "Active",
  "Action",
];

function CaseInsuranceSection({ sectionRef }) {
  return (
    <SectionCard
      id="case"
      sectionRef={sectionRef}
      number={2}
      title="Case & Insurance"
      accent={A.green}
      rightSlot={
        <>
          <OutlineBtn sx={btnSm}>Select case</OutlineBtn>
          <PrimaryBtn sx={btnSm}>+ New case</PrimaryBtn>
        </>
      }
    >
      <FieldGrid
        cols={3}
        fields={[
          { label: "Case Name", defaultValue: "Aetna test" },
          { label: "Description", defaultValue: "Aetna test" },
          {
            label: "Payor Scenario",
            type: "select",
            // defaultValue: "select",
            options: [
              "Commercial",
              "Worker",
              "Medicaid",
              "Self-pay",
              "Individual",
            ],
          },
        ]}
      />

      <Box sx={{ display: "flex", flexWrap: "wrap", rowGap: 0.5 }}>
        <CaseCheck label="Active" initial />
        <CaseCheck label="Send patient statement" initial />
        <CaseCheck label="Do not send claim electronically" initial={false} />
      </Box>

      <Box sx={{ minWidth: 0 }}>
        <SubTitle
          color={A.green.main}
          right={
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 600,
                color: T.blue,
                cursor: "pointer",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              + Add/Manage policy
            </Typography>
          }
        >
          Insurance policies
        </SubTitle>

        <TableContainer sx={tableWrapSx}>
          <Table size="small" sx={{ minWidth: 900 }}>
            <TableHead>
              <TableRow>
                {POLICY_COLS.map((c, i) => (
                  <TableCell
                    key={i}
                    sx={{
                      ...tableHeadSx(A.green),
                      textAlign: c === "Action" ? "center" : "left",
                    }}
                  >
                    {c}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {POLICY_ROWS.map((row, i) => (
                <TableRow
                  key={i}
                  sx={{
                    bgcolor: "#fff",
                    "&:last-child td": { borderBottom: 0 },
                  }}
                >
                  <TableCell sx={{ ...tableCellSx, width: 44 }}>
                    <Checkbox
                      size="small"
                      defaultChecked={row.checked}
                      sx={{
                        p: 0.4,
                        color: "#C8D0DC",
                        "&.Mui-checked": { color: T.blue },
                      }}
                    />
                  </TableCell>
                  <TableCell sx={tableCellSx}>
                    <CellSelect
                      defaultValue={row.type}
                      options={["PRIMARY", "SECONDARY"]}
                      minWidth={130}
                    />
                  </TableCell>
                  <TableCell sx={tableCellSx}>
                    <CellInput defaultValue={row.insurance} minWidth={110} />
                  </TableCell>
                  <TableCell sx={tableCellSx}>
                    <CellInput defaultValue={row.plan} minWidth={150} />
                  </TableCell>
                  <TableCell sx={tableCellSx}>
                    <CellInput defaultValue={row.policy} minWidth={120} />
                  </TableCell>
                  <TableCell sx={tableCellSx}>
                    <CellInput defaultValue={row.group} minWidth={120} />
                  </TableCell>
                  <TableCell sx={tableCellSx}>
                    <Box
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 0.5,
                        bgcolor: "#E6F6F0",
                        border: "1px solid #B2DECE",
                        borderRadius: "6px",
                        px: 1,
                        height: 28,
                      }}
                    >
                      <Checkbox
                        size="small"
                        defaultChecked
                        sx={{
                          p: 0,
                          color: A.green.main,
                          "&.Mui-checked": { color: A.green.main },
                          "& svg": { fontSize: 16 },
                        }}
                      />
                      <Typography
                        sx={{
                          fontSize: 11,
                          fontWeight: 600,
                          color: A.green.main,
                        }}
                      >
                        Active
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell
                    sx={{ ...tableCellSx, width: 70, textAlign: "center" }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        width: "fit-content",
                        mx: "auto",
                      }}
                    >
                      <IconButton
                        size="small"
                        aria-label="Edit policy"
                        sx={actionBtnSx}
                      >
                        <RPEditIcon width={16} height={16} color={T.blue} />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box>
        <SubTitle color={A.green.main}>Additional details</SubTitle>
        <FieldGrid
          fields={[
            { label: "Copay", defaultValue: "0.00" },
            { label: "Deductible", defaultValue: "0.00" },
            {
              label: "Relationship to Insured",
              type: "select",
              //defaultValue: "Self",
              options: ["Self", "Spouse", "Child", "Other"],
            },
            {
              label: "Release of Info",
              type: "select",
              //defaultValue: "Y - Yes",
              options: ["Y - Yes", "N - No"],
            },
          ]}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          rowGap: 1,
          columnGap: 2,
        }}
      >
        <PrimaryBtn>Check eligibility (270/271)</PrimaryBtn>

        <Typography sx={{ fontSize: 11, color: T.muted }}>
          Runs inline - no separate window.
        </Typography>

        <Typography
          sx={{
            fontSize: 12,
            fontWeight: 600,
            color: T.blue,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            ml: "auto",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          <CalendarBlueIcon sx={{ fontSize: 12 }} /> View log
        </Typography>
      </Box>
    </SectionCard>
  );
}

/* ================================================================== */
/* CARD 3 - CONDITIONS & AUTHORISATION                                 */
/* ================================================================== */
const CONDITIONS = [
  "Auto accident",
  "Employment",
  "Pregnancy",
  "Abuse",
  "Homebound",
  "Other",
  "EPSDT",
  "Family planning",
  "Emergency",
  "Worker's Compensation",
];

const AUTH_COLS = [
  "Authorization #",
  "# Visits",
  "# Used",
  "Start",
  "End",
  "Status",
  "Provider Name",
  "Contact",
  "Notes",
];

const REF_COLS = [
  "Referrer #",
  "# Visits",
  "# Used",
  "Start",
  "End",
  "Status",
  "Name",
  "Contact",
  "Notes",
];

const makeAuthRows = () =>
  [1, 2].map(() => [
    "AUTH-88210",
    "6",
    "0",
    "08-01-2026",
    "10-31-2026",
    <ActiveBadge key="badge" />,
    "Lorem Ipsum",
    "XXXXXXXXXX",
    "Neuro follow-up",
  ]);

function DataTable({ cols, rows, accent, minWidth = 1000 }) {
  return (
    <TableContainer sx={tableWrapSx}>
      <Table size="small" sx={{ minWidth }}>
        <TableHead>
          <TableRow>
            {cols.map((c, i) => (
              <TableCell key={i} sx={tableHeadSx(accent)}>
                {c}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, ri) => (
            <TableRow
              key={ri}
              sx={{ bgcolor: "#fff", "&:last-child td": { borderBottom: 0 } }}
            >
              {row.map((cell, ci) => (
                <TableCell key={ci} sx={tableCellSx}>
                  {typeof cell === "string" ? (
                    <CellInput
                      defaultValue={cell}
                      minWidth={ci === 0 || ci === 6 || ci === 8 ? 130 : 90}
                    />
                  ) : (
                    cell
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function ConditionsSection({ sectionRef }) {
  return (
    <SectionCard
      id="conditions"
      sectionRef={sectionRef}
      number={3}
      title="Conditions & Authorisation / Referrals"
      accent={A.orange}
    >
      <Box>
        <Label>Condition related to</Label>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr)",
            rowGap: 0.5,
            columnGap: 1,
            ...cqs({
              sm: { gridTemplateColumns: "repeat(2, minmax(0, 1fr))" },
              md: { gridTemplateColumns: "repeat(3, minmax(0, 1fr))" },
              lg: { gridTemplateColumns: "repeat(5, minmax(0, 1fr))" },
            }),
          }}
        >
          {CONDITIONS.map((lbl) => (
            <FormControlLabel
              key={lbl}
              sx={{ m: 0 }}
              control={
                <Checkbox
                  size="small"
                  sx={{
                    p: 0.5,
                    color: "#C8CDD8",
                    "&.Mui-checked": { color: T.blue },
                    "& svg": { fontSize: 18 },
                  }}
                />
              }
              label={
                <Typography sx={{ fontSize: 12, color: T.text }}>
                  {lbl}
                </Typography>
              }
            />
          ))}
        </Box>
      </Box>

      <FieldGrid
        cols={3}
        fields={[
          {
            label: "Condition Date Type",
            type: "select",
            //defaultValue: "None",
            options: ["None", "Initial", "Last seen", "Acute manifestation"],
          },
          { label: "Start Date", type: "date" },
          { label: "End Date", type: "date" },
        ]}
      />

      <Box sx={{ minWidth: 0 }}>
        <SubTitle color={A.orange.main}>Authorizations</SubTitle>
        <DataTable cols={AUTH_COLS} rows={makeAuthRows()} accent={A.orange} />
      </Box>

      <Box sx={{ minWidth: 0 }}>
        <SubTitle color={A.orange.main}>Referrals</SubTitle>
        <DataTable cols={REF_COLS} rows={makeAuthRows()} accent={A.orange} />
      </Box>
    </SectionCard>
  );
}

/* ================================================================== */
/* CUSTOMISED COLUMNS POPUP                                            */
/* ================================================================== */
const OPTIONAL_COLUMNS = ["Emergency", "NDC", "MOD", "Unspecified Code"];

function SelectColumnsMenu({ selectedColumns, onChange }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const toggleColumn = (col) => {
    onChange(
      selectedColumns.includes(col)
        ? selectedColumns.filter((c) => c !== col)
        : [...selectedColumns, col],
    );
  };

  return (
    <>
      <OutlineBtn sx={btnSm} onClick={(e) => setAnchorEl(e.currentTarget)}>
        + Customised Columns
      </OutlineBtn>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              width: 220,
              maxWidth: "calc(100vw - 32px)",
              borderRadius: "12px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
              border: `1px solid ${T.border}`,
            },
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
            py: 1.5,
            borderBottom: `1px solid ${T.border}`,
          }}
        >
          <Typography sx={{ fontWeight: 700, fontSize: 13, color: "#111827" }}>
            Select Columns
          </Typography>
          <IconButton
            size="small"
            onClick={() => setAnchorEl(null)}
            sx={{ color: T.blue, p: 0.3 }}
          >
            <CloseIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Box>

        <Box sx={{ p: 1.5, display: "flex", flexDirection: "column", gap: 1 }}>
          {OPTIONAL_COLUMNS.map((col) => {
            const isSelected = selectedColumns.includes(col);
            return (
              <Box
                key={col}
                onClick={() => toggleColumn(col)}
                sx={{
                  cursor: "pointer",
                  borderRadius: "8px",
                  px: 1.5,
                  py: 1,
                  border: "1px solid",
                  borderColor: isSelected ? "#BFDBFE" : T.border,
                  bgcolor: isSelected ? "#EAF2FF" : "#fff",
                  "&:hover": { borderColor: "#93C5FD", bgcolor: "#F0F7FF" },
                }}
              >
                <Typography
                  sx={{ fontWeight: 600, color: T.blue, fontSize: 12 }}
                >
                  {col}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Popover>
    </>
  );
}

/* ================================================================== */
/* CARD 4 - ENCOUNTER DETAILS & CHARGES                                */
/* ================================================================== */
const PROC_COLUMNS = [
  "DOS FROM",
  "DOS TO",
  "POS",
  "PROCEDURES",
  "MOD 1",
  "MAP",
  "DAYS/UNIT",
  "UNIT CHARGE",
  "TOTAL",
  "COPAY",
  "UC",
  "UM",
  "MOD 3",
];

const PROC_ROWS = [
  [
    "05-27-2026",
    "05-27-2026",
    "GCH-IP",
    "36389.IH",
    "99214",
    "ABCDE",
    "1",
    "$100",
    "$100",
    "$10",
    "1",
    "5 ML",
    "0.00",
  ],
];

const DIAG_COLORS = [
  { bg: "#E2F6EE", color: "#1A7A54" },
  { bg: "#FDE8F0", color: "#B83070" },
  { bg: "#E6EEFF", color: "#2F5BC4" },
  { bg: "#FEF1DC", color: "#A66A12" },
];

function ChargesSection({ sectionRef }) {
  const [selectedColumns, setSelectedColumns] = React.useState(["NDC"]);

  const [procRows, setProcRows] = React.useState(() =>
    PROC_ROWS.map((cells, i) => ({ id: i + 1, cells })),
  );
  const nextRowId = React.useRef(PROC_ROWS.length + 1);

  const addLine = () =>
    setProcRows((prev) => {
      const last = prev[prev.length - 1];
      const cells = last ? [...last.cells] : [...PROC_ROWS[0]];
      return [...prev, { id: nextRowId.current++, cells }];
    });

  const updateCell = (rowId, colIdx, val) =>
    setProcRows((prev) =>
      prev.map((r) =>
        r.id === rowId
          ? { ...r, cells: r.cells.map((c, j) => (j === colIdx ? val : c)) }
          : r,
      ),
    );

  const deleteLine = (rowId) =>
    setProcRows((prev) => prev.filter((r) => r.id !== rowId));

  const [diagnoses, setDiagnoses] = React.useState([
    { id: 1, code: "F73" },
    { id: 2, code: "C73" },
  ]);
  const [adding, setAdding] = React.useState(false);
  const [newCode, setNewCode] = React.useState("");
  const nextId = React.useRef(3);

  const addDiagnosis = () => {
    const code = newCode.trim().toUpperCase();
    if (code) {
      setDiagnoses((prev) => [...prev, { id: nextId.current++, code }]);
    }
    setNewCode("");
    setAdding(false);
  };

  const removeDiagnosis = (id) =>
    setDiagnoses((prev) => prev.filter((d) => d.id !== id));

  return (
    <SectionCard
      id="charges"
      sectionRef={sectionRef}
      number={4}
      title="Encounter Details & Charges"
      accent={A.amber}
    >
      <FieldGrid
        fields={[
          { label: "From Date", type: "date", defaultValue: "08-15-2026" },
          { label: "Through Date", type: "date", defaultValue: "08-15-2026" },
          { label: "Post Date", type: "date", defaultValue: "08-28-2026" },
          { label: "Batch #", defaultValue: "--" },
        ]}
      />

      <FieldGrid
        fields={[
          { label: "Scheduling Provider", defaultValue: "Kumar V2, Jayram" },
          { label: "Rendering Provider", defaultValue: "Kumar V2, Jayram" },
          { label: "Supervising Provider", defaultValue: "NA" },
          { label: "Location", defaultValue: "The University RL" },
        ]}
      />

      <FieldGrid
        fields={[
          { label: "Referring Provider" },
          { label: "NPI" },
          { label: "Place of Service", defaultValue: "11 - Office" },
          { label: "Encounter Mode", defaultValue: "In Office" },
        ]}
      />

      <FieldGrid
        fields={[
          { label: "Copay Due", defaultValue: "0.00" },
          { label: "Payment Amount", defaultValue: "0.00" },
        ]}
      />

      <Box>
        <SubTitle color={A.amber.main}>Diagnosis pointers</SubTitle>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 1,
          }}
        >
          {diagnoses.map((d, i) => {
            const { bg, color } = DIAG_COLORS[i % DIAG_COLORS.length];
            return (
              <Chip
                key={d.id}
                label={`${String.fromCharCode(65 + i)}_${d.code}`}
                onDelete={() => removeDiagnosis(d.id)}
                deleteIcon={<CloseIcon sx={{ fontSize: 12 }} />}
                sx={{
                  bgcolor: bg,
                  color,
                  fontWeight: 600,
                  fontSize: 12,
                  borderRadius: "14px",
                  height: 26,
                  "& .MuiChip-deleteIcon": { color, fontSize: 12 },
                  "& .MuiChip-label": { px: 1.25 },
                }}
              />
            );
          })}

          {adding ? (
            <TextField
              autoFocus
              size="small"
              placeholder="Code e.g. F73"
              value={newCode}
              onChange={(e) => setNewCode(e.target.value)}
              onBlur={addDiagnosis}
              onKeyDown={(e) => {
                if (e.key === "Enter") addDiagnosis();
                if (e.key === "Escape") {
                  setNewCode("");
                  setAdding(false);
                }
              }}
              sx={{
                width: 130,
                "& .MuiOutlinedInput-root": {
                  height: 26,
                  fontSize: 12,
                  borderRadius: "14px",
                  bgcolor: T.fieldBg,
                  "& fieldset": { borderColor: T.border },
                  "&.Mui-focused fieldset": {
                    borderColor: T.blue,
                    borderWidth: "1px",
                  },
                  "& input": {
                    height: "100%",
                    boxSizing: "border-box",
                    padding: "0 10px",
                    fontSize: 12,
                  },
                },
              }}
            />
          ) : (
            <Chip
              label="+ Add"
              variant="outlined"
              onClick={() => setAdding(true)}
              disabled={diagnoses.length >= 12}
              sx={{
                borderColor: T.blue,
                color: T.blue,
                fontWeight: 600,
                fontSize: 12,
                borderRadius: "14px",
                height: 26,
                cursor: "pointer",
                "& .MuiChip-label": { px: 1.25 },
              }}
            />
          )}
        </Box>
      </Box>

      <Box
        sx={{
          border: `1px solid ${T.border}`,
          borderRadius: "8px",
          overflow: "hidden",
          minWidth: 0,
        }}
      >
        <Box
          sx={{
            bgcolor: A.amber.bg,
            px: 1.5,
            py: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 1,
            ...cq("sm", {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }),
          }}
        >
          <Typography
            sx={{ fontSize: 12, fontWeight: 700, color: A.amber.main }}
          >
            Procedures
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            <SelectColumnsMenu
              selectedColumns={selectedColumns}
              onChange={setSelectedColumns}
            />
            <OutlineBtn sx={btnSm} onClick={addLine}>
              + Add line
            </OutlineBtn>
          </Box>
        </Box>

        <TableContainer
          sx={{
            borderTop: `1px solid ${T.border}`,
            overflowX: "auto",
            maxWidth: "100%",
            ...thinScroll,
          }}
        >
          <Table size="small" sx={{ minWidth: 1200 }}>
            <TableHead>
              <TableRow>
                {PROC_COLUMNS.map((col) => (
                  <TableCell key={col} sx={tableHeadSx(A.amber)}>
                    {col}
                  </TableCell>
                ))}
                <TableCell
                  sx={{ ...tableHeadSx(A.amber), textAlign: "center" }}
                >
                  ACTION
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {procRows.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{
                    bgcolor: "#fff",
                    "&:last-child td": { borderBottom: 0 },
                  }}
                >
                  {row.cells.map((cell, j) => (
                    <TableCell key={j} sx={tableCellSx}>
                      <CellInput
                        value={cell}
                        onChange={(e) => updateCell(row.id, j, e.target.value)}
                        minWidth={j < 2 ? 110 : j === 3 ? 100 : 76}
                      />
                    </TableCell>
                  ))}

                  <TableCell
                    sx={{ ...tableCellSx, width: 70, textAlign: "center" }}
                  >
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <IconButton
                        size="small"
                        aria-label="Delete line"
                        onClick={() => deleteLine(row.id)}
                        disabled={procRows.length === 0}
                        sx={{
                          ...actionBtnSx,
                          color: T.error,
                          "&:hover": { bgcolor: "#FEF2F2" },
                          "&.Mui-disabled": { opacity: 0.4 },
                        }}
                      >
                        <RPDeleteIcon width={16} height={16} />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </SectionCard>
  );
}

/* ================================================================== */
/* CARD 5 - ADDITIONAL DETAILS                                         */
/* ================================================================== */
function AdditionalDetailsSection({ sectionRef }) {
  return (
    <SectionCard
      id="additional"
      sectionRef={sectionRef}
      number={5}
      title="Additional Details"
      accent={A.teal}
    >
      <FieldGrid
        fields={[
          { label: "Outside Lab", type: "checks", options: ["Yes", "No"] },
          { label: "Outside Lab Charges", defaultValue: "0" },
          { label: "Is LMP", type: "checks", options: ["Yes"] },
          {
            label: "Date of current illness",
            type: "date",
            defaultValue: "09-28-2026",
          },
        ]}
      />
      <FieldGrid
        fields={[
          {
            label: "Has other claim ID",
            type: "select",
            //defaultValue: "Yes",
            options: ["Yes", "No"],
          },
          { label: "Agency claim no." },
          {
            label: "Unable to work from date",
            type: "date",
            defaultValue: "08-28-2026",
          },
          {
            label: "Unable to work to date",
            type: "date",
            defaultValue: "09-28-2026",
          },
        ]}
      />
      <FieldGrid
        fields={[
          {
            label: "Initial visit date",
            type: "date",
            defaultValue: "07-28-2026",
          },
          {
            label: "Last related visit date",
            type: "date",
            defaultValue: "07-28-2026",
          },
          {
            label: "Claim code",
            type: "select",
            //defaultValue: "W3",
            options: ["W3", "W2", "W1"],
          },
          { label: "Other date", type: "date" },
        ]}
      />
      <FieldGrid
        fields={[
          {
            label: "Other date qualifier",
            type: "select",
            //defaultValue: "-",
            options: ["-"],
          },
          { label: "Resubmission code", defaultValue: "-" },
          { label: "Original reference no.", defaultValue: "-" },
          { label: "Additional Claim info", defaultValue: "-" },
        ]}
      />
    </SectionCard>
  );
}

/* ================================================================== */
/* FOOTER BAR                                                          */
/* ================================================================== */
const SELECT_ACTION_ITEMS = [
  { label: "E-submit to Primary", highlighted: false },
  { label: "Approve", highlighted: true },
  { label: "Print Paper Claim", highlighted: false },
  { label: "Reject", highlighted: false },
  { label: "Reviewed and Approved", highlighted: false },
  { label: "Reviewed and Rejected", highlighted: false },
  { label: "Sent for Review", highlighted: false },
  { label: "On Hold", highlighted: false },
  { label: "Need Info", highlighted: false },
];

function FooterBar({ onBack }) {
  const [anchor, setAnchor] = React.useState(null);
  const open = Boolean(anchor);

  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: "#FFFFFF",
        borderRadius: "8px",
        border: `1px solid ${T.border}`,
        boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
        p: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        justifyContent: "space-between",
        gap: 1.5,
        ...cq("md", { flexDirection: "row", alignItems: "center" }),
      }}
    >
      {/* Left: Total Charges */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          width: "100%",
          ...cq("md", { width: "auto" }),
        }}
      >
        <Typography
          sx={{
            fontSize: 12,
            fontWeight: 600,
            color: T.label,
            whiteSpace: "nowrap",
          }}
        >
          Total Charges
          <Box component="span" sx={{ color: T.error, ml: 0.3 }}>
            *
          </Box>
        </Typography>
        <Box sx={{ flex: 1, ...cq("md", { flex: "none", width: 160 }) }}>
          <TextField
            fullWidth
            size="small"
            defaultValue="118.00"
            sx={inputSx}
          />
        </Box>
      </Box>

      {/* Right: action buttons */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column-reverse",
          gap: 1,
          minWidth: 0,
          ...cq("sm", {
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "flex-end",
          }),
        }}
      >
        {/* Cancel */}
        <OutlineBtn
          onClick={onBack}
          sx={{
            color: "#000000",
            backgroundColor: "#FFFFFF",
            border: "1px solid #E5E7EB",
            "&:hover": {
              backgroundColor: "#F9FAFB",
              borderColor: "#D1D5DB",
            },
          }}
        >
          Cancel
        </OutlineBtn>

        {/* Save Draft */}
        <OutlineBtn
          startIcon={<SaveDraftFileIcon width={16} height={16} />}
          sx={{
            color: "#000000",
            backgroundColor: "#FFFFFF",
            border: "1px solid #E5E7EB",
            "&:hover": {
              backgroundColor: "#F9FAFB",
              borderColor: "#D1D5DB",
            },
          }}
        >
          Save draft
        </OutlineBtn>

        {/* Scrub */}
        <OutlineBtn
          startIcon={<TiaChatIcon2 sx={{ fontSize: 14, color: "#000000" }} />}
          sx={{
            color: "#000000",
            backgroundColor: "#FFFFFF",
            border: "1px solid #E5E7EB",
            "&:hover": {
              backgroundColor: "#F9FAFB",
              borderColor: "#D1D5DB",
            },
          }}
        >
          Scrub
        </OutlineBtn>

        {/* Save - Primary Button */}
        <PrimaryBtn
          startIcon={<CheckIcon sx={{ fontSize: 16 }} />}
          sx={{
            color: "#FFFFFF",
            backgroundColor: "#0066FF",
            border: "1px solid #0066FF",
            "&:hover": {
              backgroundColor: "#0052CC",
              borderColor: "#0052CC",
            },
          }}
        >
          Save
        </PrimaryBtn>

        {/* Select Action */}
        <OutlineBtn
          onClick={(e) => setAnchor(e.currentTarget)}
          endIcon={
            <KeyboardArrowDownIcon sx={{ fontSize: 18, color: "#000000" }} />
          }
          sx={{
            color: "#000000",
            backgroundColor: "#FFFFFF",
            border: "1px solid #E5E7EB",
            "&:hover": {
              backgroundColor: "#F9FAFB",
              borderColor: "#D1D5DB",
            },
          }}
        >
          Select Action
        </OutlineBtn>
      </Box>

      <Popover
        open={open}
        anchorEl={anchor}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "bottom", horizontal: "right" }}
        slotProps={{
          paper: {
            sx: {
              borderRadius: "12px",
              width: 220,
              maxWidth: "calc(100vw - 32px)",
              boxShadow: "0 8px 28px rgba(0,0,0,0.14)",
              mt: -0.5,
              overflow: "hidden",
              border: `1px solid ${T.border}`,
            },
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
            py: 1.25,
            borderBottom: `1px solid ${T.border}`,
          }}
        >
          <Typography sx={{ fontSize: 13, fontWeight: 700, color: "#111827" }}>
            Select Action
          </Typography>
          <IconButton
            size="small"
            onClick={() => setAnchor(null)}
            sx={{ p: 0.3, color: T.blue }}
          >
            <CloseIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Box>

        <Box
          sx={{ p: 1.5, display: "flex", flexDirection: "column", gap: 0.75 }}
        >
          {SELECT_ACTION_ITEMS.map((item) => (
            <Box
              key={item.label}
              onClick={() => setAnchor(null)}
              sx={{
                px: 1.5,
                py: 1,
                borderRadius: "8px",
                cursor: "pointer",
                border: `1px solid ${item.highlighted ? "#B8D0FF" : T.border}`,
                bgcolor: item.highlighted ? "#EEF4FF" : "#fff",
                transition: "background 0.15s, border-color 0.15s",
                "&:hover": {
                  bgcolor: item.highlighted ? "#DDE9FF" : "#F5F8FF",
                  borderColor: item.highlighted ? "#93BBFF" : "#C5CEDE",
                },
              }}
            >
              <Typography sx={{ fontSize: 12, fontWeight: 600, color: T.blue }}>
                {item.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Popover>
    </Paper>
  );
}

/* ================================================================== */
/* PATIENT ALERT DIALOG                                                */
/* ================================================================== */
const SHOW_WHEN_OPTIONS = [
  "Select all",
  "Claim form",
  "Front Desk Appointment",
  "Rounding list",
  "Coding Screens",
  "Billing Screens",
];
const SHOW_WHEN_ITEMS = SHOW_WHEN_OPTIONS.filter((o) => o !== "Select all");

function PatientAlertDialog({ open, onClose }) {
  const [patient, setPatient] = React.useState("");
  const [whenAnchor, setWhenAnchor] = React.useState(null);
  const [selectedWhen, setSelectedWhen] = React.useState([]);
  const [message, setMessage] = React.useState("");

  const whenOpen = Boolean(whenAnchor);
  const allSelected = selectedWhen.length === SHOW_WHEN_ITEMS.length;

  const toggleWhen = (opt) => {
    if (opt === "Select all") {
      setSelectedWhen(allSelected ? [] : SHOW_WHEN_ITEMS);
      return;
    }
    setSelectedWhen((prev) =>
      prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt],
    );
  };

  const whenDisplay =
    selectedWhen.length === 0
      ? "Select"
      : allSelected
        ? "Select all"
        : selectedWhen.join(", ");

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      fullWidth={false}
      slotProps={{
        paper: {
          sx: {
            width: "520px !important",
            minWidth: 0,
            maxWidth: "calc(100vw - 32px)",
            flex: "0 0 520px",
            boxSizing: "border-box",
            m: "16px",
            borderRadius: "12px",
            overflowY: "auto",
            boxShadow: "0 16px 48px rgba(0,0,0,0.18)",
          },
        },
      }}
    >
      <Box sx={{ p: { xs: 2, sm: 2.5 } }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 1.5,
          }}
        >
          <Typography sx={{ fontSize: 13, fontWeight: 700, color: "#1F2937" }}>
            Patient Alert
          </Typography>
          <IconButton
            size="small"
            onClick={onClose}
            aria-label="Close"
            sx={{ color: "#1D1B20", p: 0.5 }}
          >
            <CloseIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Box>

        {/* Two selects */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "minmax(0, 1fr)",
              sm: "repeat(2, minmax(0, 1fr))",
            },
            gap: 1.5,
            mb: 1.5,
          }}
        >
          <SelectField
            label="Select Patient"
            options={["Wayne, Jimmy", "Cook, Lisha"]}
            value={patient}
            onChange={(e) => setPatient(e.target.value)}
          />

          <Box sx={{ minWidth: 0 }}>
            <Label>Show Alert when</Label>
            <Box
              onClick={(e) => setWhenAnchor(e.currentTarget)}
              sx={{
                height: 34,
                boxSizing: "border-box",
                border: `1px solid ${whenOpen ? T.blue : T.border}`,
                borderRadius: "6px",
                bgcolor: T.fieldBg,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                px: "10px",
                cursor: "pointer",
                "&:hover": { borderColor: whenOpen ? T.blue : "#D1D5DB" },
              }}
            >
              <Typography
                sx={{
                  fontSize: 12,
                  color: selectedWhen.length === 0 ? T.placeholder : T.text,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  flex: 1,
                  mr: 1,
                }}
              >
                {whenDisplay}
              </Typography>
              <KeyboardArrowDownIcon
                sx={{ color: T.muted, fontSize: 18, flexShrink: 0 }}
              />
            </Box>

            <Popover
              open={whenOpen}
              anchorEl={whenAnchor}
              onClose={() => setWhenAnchor(null)}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              slotProps={{
                paper: {
                  sx: {
                    mt: 0.5,
                    borderRadius: "8px",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                    border: `1px solid ${T.border}`,
                    minWidth: 240,
                    maxWidth: "calc(100vw - 32px)",
                    py: 0.5,
                  },
                },
              }}
            >
              {SHOW_WHEN_OPTIONS.map((opt) => {
                const checked =
                  opt === "Select all"
                    ? allSelected
                    : selectedWhen.includes(opt);
                return (
                  <Box
                    key={opt}
                    onClick={() => toggleWhen(opt)}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      px: 2,
                      py: 0.9,
                      cursor: "pointer",
                      "&:hover": { bgcolor: "#F9FAFB" },
                    }}
                  >
                    <Checkbox
                      size="small"
                      checked={checked}
                      readOnly
                      sx={{
                        p: 0,
                        color: "#D1D5DB",
                        "&.Mui-checked": { color: T.blue },
                        "& svg": { fontSize: 18 },
                      }}
                    />
                    <Typography sx={{ fontSize: 12, color: T.text }}>
                      {opt}
                    </Typography>
                  </Box>
                );
              })}
            </Popover>
          </Box>
        </Box>

        {/* Message */}
        <Box sx={{ mb: 2 }}>
          <InputField
            label="Enter patient alert message"
            placeholder="Type here"
            multiline
            rows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Box>

        {/* Footer buttons */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column-reverse", sm: "row" },
            justifyContent: { xs: "stretch", sm: "flex-end" },
            gap: 1,
          }}
        >
          <OutlineBtn onClick={onClose}>Cancel</OutlineBtn>
          <PrimaryBtn onClick={onClose}>Save Alert</PrimaryBtn>
        </Box>
      </Box>
    </Dialog>
  );
}

/* ================================================================== */
/* MAIN PAGE                                                           */
/* ================================================================== */
export default function PreBillingEditPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [activeId, setActiveId] = React.useState(STEPS[0].id);

  // Claim data and active tab come from the router state
  const claimData = location.state?.claim;
  const activeTab = location.state?.activeTab ?? 0;

  // Creating a new claim (hides the encounter info boxes)
  const isNewClaim = location.pathname === "/new-claim";

  // Editing an existing claim (pre-billing or post-billing edit)
  const isEditMode =
    location.pathname.includes("/pre-billing-edit") ||
    location.pathname.includes("/post-billing-edit") ||
    (isNewClaim && Boolean(claimData));

  // Back navigation with tab preservation
  const handleBack = () => {
    navigate("/encounters", { state: { activeTab } });
  };

  const sectionRefs = React.useRef({});
  const headerRef = React.useRef(null);
  const mainRef = React.useRef(null);
  const scrollLockRef = React.useRef(false);
  const lockTimerRef = React.useRef(null);

  const setRef = (id) => (node) => {
    sectionRefs.current[id] = node;
  };

  /* Scroll-spy: the stepper highlights the section you are looking at.
     Based only on where sections are on screen vs. the bottom of the header. */
  React.useEffect(() => {
    let raf = 0;
    const ids = STEPS.map((x) => x.id);

    const computeActive = () => {
      raf = 0;
      if (scrollLockRef.current) return;

      const header = headerRef.current;
      const main = mainRef.current;
      if (!header || !main) return;

      const threshold = header.getBoundingClientRect().bottom + 24;

      let currentId = ids[0];
      for (const id of ids) {
        const node = sectionRefs.current[id];
        if (node && node.getBoundingClientRect().top <= threshold) {
          currentId = id;
        }
      }

      // at the very bottom -> last section is active
      if (
        main.scrollHeight > main.clientHeight + 10 &&
        main.scrollTop + main.clientHeight >= main.scrollHeight - 8
      ) {
        currentId = ids[ids.length - 1];
      }

      setActiveId((prev) => (prev === currentId ? prev : currentId));
    };

    const onScroll = () => {
      // while a click-scroll is animating, wait until scrolling goes idle
      if (scrollLockRef.current) {
        window.clearTimeout(lockTimerRef.current);
        lockTimerRef.current = window.setTimeout(() => {
          scrollLockRef.current = false;
          computeActive();
        }, 150);
        return;
      }
      if (!raf) raf = window.requestAnimationFrame(computeActive);
    };

    const scroller = mainRef.current;
    scroller?.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    computeActive();
    const firstCheck = window.setTimeout(computeActive, 300);

    return () => {
      scroller?.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.clearTimeout(firstCheck);
      window.clearTimeout(lockTimerRef.current);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  /* Scrolls so the section heading sits right under the fixed header. */
  const scrollToSection = (id) => {
    const node = sectionRefs.current[id];
    const scroller = mainRef.current;
    if (!node || !scroller) return;

    const header = headerRef.current;
    const headerH = header ? header.getBoundingClientRect().height : 0;
    const gap = 12;
    const nodeTop = node.getBoundingClientRect().top;
    const scrollerTop = scroller.getBoundingClientRect().top;

    const top = scroller.scrollTop + (nodeTop - scrollerTop) - headerH - gap;
    scroller.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  };

  const handleStepClick = (id) => {
    setActiveId(id);
    scrollLockRef.current = true;
    window.clearTimeout(lockTimerRef.current);

    scrollToSection(id);

    lockTimerRef.current = window.setTimeout(() => {
      scrollLockRef.current = false;
    }, 1000);
  };

  return (
    <>
      {/* Full-height flex column: header stays fixed, content scrolls */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          bgcolor: T.page,
          containerType: "inline-size",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* Fixed header: title + stepper */}
        <Box
          ref={headerRef}
          sx={{
            flexShrink: 0,
            bgcolor: T.page,
            borderBottom: `1px solid ${T.border}`,
            px: 2,
            py: 1,
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            gap: 1,
            zIndex: 10,
          }}
        >
          <TopBar
            title={isNewClaim ? "New Charge Capture" : "Pri Charge Capture"}
          />
          <StepperNav
            activeId={activeId}
            onStepClick={handleStepClick}
            onAlertsClick={() => setAlertOpen(true)}
            onBack={handleBack}
          />
        </Box>

        {/* Scrollable content */}
        <Box
          component="main"
          ref={mainRef}
          sx={{
            flexGrow: 1,
            minHeight: 0,
            overflowY: "auto",
            overflowX: "hidden",
            ...thinScroll,
          }}
        >
          <Box
            sx={{
              width: "100%",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
              px: 2,
              py: 1.5,
            }}
          >
            {!isNewClaim && <EncounterSummary claimData={claimData} />}
            {!isNewClaim && <AssistBanner />}

            <PatientSection
              sectionRef={setRef("patient")}
              isNewClaim={isNewClaim}
              isEditMode={isEditMode}
              claimData={claimData}
            />
            <CaseInsuranceSection sectionRef={setRef("case")} />
            <ConditionsSection sectionRef={setRef("conditions")} />
            <ChargesSection sectionRef={setRef("charges")} />
            <AdditionalDetailsSection sectionRef={setRef("additional")} />

            <FooterBar onBack={handleBack} />
          </Box>
        </Box>
      </Box>

      <PatientAlertDialog
        open={alertOpen}
        onClose={() => setAlertOpen(false)}
      />
    </>
  );
}
