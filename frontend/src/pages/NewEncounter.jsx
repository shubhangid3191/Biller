import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Stack as MuiStack,
  Typography,
  TextField,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Button,
  IconButton,
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

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import {
  AlertBellIcon,
  SaveDraftFileIcon,
  PlusBlueIcon,
  BlueCalendarIcon,
  TiaChatIcon,
  TiaChatIcon2,
  encounterAssistCheck,
  CalendarBlueIcon,
  RPEditIcon
} from "../assets/Assets.jsx";

// Needed so dayjs("08/15/2026", "MM/DD/YYYY") really parses with that format
dayjs.extend(customParseFormat);

/* Your MUI version no longer turns Stack props (alignItems, flexWrap,
   justifyContent, rowGap...) into CSS, so nothing wrapped. This wrapper moves
   them into `sx`, so every <Stack> in the file works again. */
const Stack = React.forwardRef(function Stack(
  {
    alignItems,
    justifyContent,
    flexWrap,
    rowGap,
    columnGap,
    flexShrink,
    sx,
    ...rest
  },
  ref,
) {
  return (
    <MuiStack
      ref={ref}
      useFlexGap
      {...rest}
      sx={{
        alignItems,
        justifyContent,
        flexWrap,
        rowGap,
        columnGap,
        flexShrink,
        ...sx,
      }}
    />
  );
});

/* =========================================================
   DESIGN TOKENS
   ========================================================= */
const C = {
  pageBg: "#ECEEF4",
  textDark: "#2B2842",
  textLabel: "#5C5878",
  textMuted: "#8294A6",
  textBody: "#5443C4",
  textBold: "#2B2842",
  blue: "#006FFD",
  blueHover: "#0056D6",
  purple: "#5443C4",
  purpleBg: "#F0EEF8",
  green: "#12795B",
  greenBg: "#EBF7F3",
  orange: "#B0552A",
  orangeBg: "#FEF4ED",
  amber: "#8E641A",
  amberBg: "#FBF5E3",
  teal5: "#1A808E",
  teal5Bg: "#EAF6F7",
  border: "#E0E4EE",
  borderLight: "#EAECF4",
  inputBg: "#FFFFFF",
  inputGreenBg: "#EEF2FF",
  inputGreenBorder: "#C7D2FE",
  inputHighlight: "#FEF3E8",
  inputHighlightBorder: "#F0C998",
  greenChipBg: "#E8F8F0",
  greenChipBorder: "#A8DFCA",
  greenChipText: "#1A9E6E",
  amberChipBg: "#FBF1DC",
  amberChipText: "#946312",
};

/* Figma "Main" frame: padding 24px 28px 60px, gap 12px, content width 1272px.
   Made fluid: width 100% up to a max of 1272px content (+ 2 x 28px padding). */
const CONTENT_MAX = 1272;

/* CONTAINER QUERIES (not viewport media queries): the page reacts to the width
   of the area it is rendered in, so it stays correct even when your app has a
   sidebar / drawer that makes the content narrower than the screen. */
const BP = { sm: 560, md: 820, lg: 1040 };
/* cqs({ sm: {...}, md: {...} }) -> container queries, plus an automatic
   viewport @media fallback for old browsers without container-query support.
   (Use ONE cqs() per sx object, cq() is the single-breakpoint shortcut.) */
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

const CONTAINER = {
  width: "100%",
  maxWidth: CONTENT_MAX + 56,
  mx: "auto",
  boxSizing: "border-box",
  px: "12px",
  ...cqs({ sm: { px: "16px" }, md: { px: "28px" } }),
};

const scrollHide = {
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  "&::-webkit-scrollbar": { display: "none" },
};

/* =========================================================
   STEPS
   ========================================================= */
const STEPS = [
  { id: "patient", label: "Patient" },
  { id: "case", label: "Case & Insurance" },
  { id: "conditions", label: "Conditions & Auth" },
  { id: "charges", label: "Charges & Review" },
  { id: "additional", label: "Additional Details" },
];

/* =========================================================
   SHARED INPUT STYLES
   ========================================================= */
const inputBase = (
  bgColor = C.inputBg,
  borderColor = C.border,
  focusColor = "#6366F1",
) => ({
  borderRadius: "8px",
  fontSize: 13.5,
  color: C.textDark,
  bgcolor: bgColor,
  "& .MuiOutlinedInput-notchedOutline": { borderColor },
  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#B8BFCF" },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: focusColor,
    borderWidth: "1.5px",
  },
  "& input": { py: "7px", px: "12px", fontSize: 13.5, color: C.textDark },
  "& .MuiSelect-select": {
    py: "7px",
    px: "12px",
    fontSize: 13.5,
    color: C.textDark,
  },
});

const inputNormal = () => inputBase();
const inputGreen = () =>
  inputBase(C.inputGreenBg, C.inputGreenBorder, "#6366F1");
const inputOrange = () =>
  inputBase(C.inputHighlight, C.inputHighlightBorder, C.orange);
const inputAmber = () => inputBase(C.amberBg, "#FBE6B4", "#E8C96A");
const inputBlue = () => ({
  ...inputBase("#EEF4FF", "#006FFD", "#006FFD"),
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#006FFD",
    borderStyle: "dashed",
    borderWidth: "1.5px",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#006FFD",
    borderStyle: "dashed",
  },
});

const hideHelper = { "& .MuiFormHelperText-root": { display: "none" } };

/* =========================================================
   SMALL SHARED PIECES
   ========================================================= */
const labelSx = {
  fontSize: 12,
  fontWeight: 600,
  color: C.textLabel,
  mb: 0.4,
  lineHeight: 1.4,
  display: "block",
};

function PrimaryBtn({ children, sx: sxExtra = {}, ...rest }) {
  return (
    <Button
      variant="contained"
      disableElevation
      {...rest}
      sx={{
        textTransform: "none",
        borderRadius: "8px",
        fontSize: 13,
        fontWeight: 600,
        bgcolor: C.blue,
        px: 2,
        py: 0.55,
        whiteSpace: "nowrap",
        "&:hover": { bgcolor: C.blueHover },
        ...sxExtra,
      }}
    >
      {children}
    </Button>
  );
}

function OutlineBtn({ children, startIcon, onClick, sx: sxExtra = {} }) {
  return (
    <Button
      variant="outlined"
      disableElevation
      onClick={onClick}
      startIcon={startIcon}
      sx={{
        textTransform: "none",
        borderRadius: "8px",
        fontSize: 13,
        fontWeight: 500,
        color: C.textDark,
        borderColor: C.border,
        bgcolor: "#fff",
        px: 2,
        py: 0.55,
        whiteSpace: "nowrap",
        boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
        "&:hover": { borderColor: "#B0B8C8", bgcolor: "#FAFBFD" },
        ...sxExtra,
      }}
    >
      {children}
    </Button>
  );
}

/* Simple labelled text input / select used outside of <FieldRow /> */
function LabeledInput({ label, sx, select, options = [], ...rest }) {
  return (
    <Box sx={{ minWidth: 0 }}>
      <Typography component="label" sx={labelSx}>
        {label}
      </Typography>
      <TextField
        fullWidth
        size="small"
        select={!!select}
        SelectProps={select ? { IconComponent: ArrowDropDownIcon } : undefined}
        slotProps={{ input: { sx: sx || inputNormal() } }}
        sx={hideHelper}
        {...rest}
      >
        {select &&
          options.map((o) => (
            <MenuItem key={o} value={o} sx={{ fontSize: 13.5 }}>
              {o}
            </MenuItem>
          ))}
      </TextField>
    </Box>
  );
}

/* Responsive card-grid helper: 1 col -> 2 cols (sm) -> N cols (bp) */
const gridCols = (n, bp = "lg") => ({
  display: "grid",
  gridTemplateColumns: "minmax(0,1fr)",
  gap: 1.5,
  width: "100%",
  ...cqs({
    sm: { gridTemplateColumns: "repeat(2, minmax(0,1fr))" },
    [bp]: { gridTemplateColumns: `repeat(${n}, minmax(0,1fr))` },
  }),
});

/* =========================================================
   FORM FIELD
   ========================================================= */
function FormField({
  label,
  value,
  select,
  options = [],
  placeholder,
  highlightedGreen,
  highlightedBlue,
  highlighted,
  icon,
  required,
  type,
}) {
  const sx = highlightedGreen
    ? inputGreen()
    : highlightedBlue
      ? inputBlue()
      : highlighted
        ? inputOrange()
        : inputNormal();

  /* Checkbox group variant */
  if (type === "checkboxGroup") {
    return (
      <Box sx={{ width: "100%", minWidth: 0 }}>
        <Typography component="label" sx={labelSx}>
          {label}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 1.5,
            border: `1px solid ${C.border}`,
            borderRadius: "8px",
            bgcolor: "#fff",
            px: 1.5,
            py: "6px",
            minHeight: 36,
            boxSizing: "border-box",
          }}
        >
          {options.map((opt) => (
            <FormControlLabel
              key={opt}
              sx={{ mr: 0, ml: 0 }}
              control={
                <Checkbox
                  size="small"
                  sx={{
                    p: 0.4,
                    color: "#C8CDD8",
                    "&.Mui-checked": { color: C.blue },
                    "& svg": { fontSize: 16 },
                  }}
                />
              }
              label={
                <Typography sx={{ fontSize: 13, color: C.textDark }}>
                  {opt}
                </Typography>
              }
            />
          ))}
        </Box>
      </Box>
    );
  }

  /* Date picker variant (icon: true) */
  if (icon) {
    const parsed =
      value && dayjs(value, "MM/DD/YYYY", true).isValid()
        ? dayjs(value, "MM/DD/YYYY", true)
        : null;

    return (
      <Box sx={{ width: "100%", minWidth: 0 }}>
        <Typography component="label" sx={labelSx}>
          {label}
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            defaultValue={parsed}
            format="MM/DD/YYYY"
            slots={{
              openPickerIcon: () => <BlueCalendarIcon width={16} height={17} />,
            }}
            slotProps={{
              textField: {
                fullWidth: true,
                size: "small",
                sx: { "& .MuiOutlinedInput-root": sx },
              },
              openPickerButton: { sx: { p: 0.5, mr: 0.2 } },
            }}
          />
        </LocalizationProvider>
      </Box>
    );
  }

  /* Regular field */
  return (
    <Box sx={{ width: "100%", minWidth: 0 }}>
      <Typography component="label" sx={labelSx}>
        {label}
        {required && (
          <Box component="span" sx={{ color: "red", ml: 0.3 }}>
            *
          </Box>
        )}
      </Typography>
      <TextField
        fullWidth
        size="small"
        select={!!select}
        defaultValue={value}
        placeholder={placeholder}
        SelectProps={select ? { IconComponent: ArrowDropDownIcon } : undefined}
        slotProps={{ input: { sx } }}
        sx={hideHelper}
      >
        {select &&
          options.map((o) => (
            <MenuItem key={o} value={o} sx={{ fontSize: 13.5 }}>
              {o}
            </MenuItem>
          ))}
      </TextField>
    </Box>
  );
}

/* RESPONSIVE: 1 col -> 2 cols (sm) -> 4 cols (lg).
   Rows that use a 3-col layout (md: 4 fields) switch to 3 cols at md. */
function FieldRow({ fields }) {
  const hasThird = fields.some((f) => f.md === 4);
  const cols = hasThird ? 3 : 4;
  const bp = hasThird ? "md" : "lg";

  return (
    <Box sx={gridCols(cols, bp)}>
      {fields.map((f, i) => {
        let span = 1;
        if (f.md === 6) span = 2;
        if (f.md === 8 || f.md === 9) span = 3;
        return (
          <Box
            key={i}
            sx={{
              minWidth: 0,
              ...cqs({
                sm: { gridColumn: `span ${Math.min(span, 2)}` },
                [bp]: { gridColumn: `span ${Math.min(span, cols)}` },
              }),
            }}
          >
            <FormField {...f} />
          </Box>
        );
      })}
    </Box>
  );
}

/* =========================================================
   SECTION CARD SHELL
   scroll-margin uses --header-h, set at runtime from the real
   sticky header height, so anchors never hide under the header.
   ========================================================= */
function SectionCard({
  id,
  sectionRef,
  number,
  title,
  accentColor,
  accentBg,
  rightSlot,
  children,
}) {
  return (
    <Paper
      id={id}
      ref={sectionRef}
      elevation={0}
      sx={{
        border: `1px solid ${C.borderLight}`,
        borderRadius: "12px",
        overflow: "hidden",
        bgcolor: "#fff",
        scrollMarginTop: "calc(var(--header-h, 0px) + 12px)",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        width: "100%",
        minWidth: 0,
      }}
    >
      <Box
        sx={{
          background: accentBg,
          borderLeft: `4px solid ${accentColor}`,
          borderBottom: `1px solid ${C.borderLight}`,
          px: { xs: 2, md: 3 },
          py: 1.35,
          minHeight: 46,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        <Typography
          sx={{
            fontSize: 11.5,
            fontWeight: 700,
            letterSpacing: "0.06em",
            color: accentColor,
            textTransform: "uppercase",
            lineHeight: 1.4,
          }}
        >
          {number} - {title}
        </Typography>
        {rightSlot}
      </Box>

      <Box sx={{ px: { xs: 2, md: 2.5 }, py: { xs: 1.5, md: 2 } }}>
        <Stack spacing={2}>{children}</Stack>
      </Box>
    </Paper>
  );
}

/* =========================================================
   TOP BAR
   ========================================================= */
function TopBar() {
  const topBtn = {
    fontSize: 13.5,
    fontWeight: 600,
    px: 2,
    py: 0.65,
    gap: 0.7,
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        flexDirection: "column",
        gap: 1.5,
        pb: 1.5,
        ...cq("sm", { alignItems: "center", flexDirection: "row" }),
      }}
    >
      <Box sx={{ minWidth: 0 }}>
        <Typography
          sx={{
            fontSize: 11.5,
            fontWeight: 700,
            letterSpacing: "0.1em",
            color: C.textMuted,
            textTransform: "uppercase",
            mb: 0.25,
          }}
        >
          Charge Capture
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: 22, sm: 25 },
            fontWeight: 800,
            color: "#0D1B2A",
            letterSpacing: "-0.5px",
            lineHeight: 1.1,
          }}
        >
          Claim ID #29068396
        </Typography>
      </Box>

      <Stack
        direction="row"
        spacing={0.8}
        flexWrap="wrap"
        useFlexGap
        alignItems="center"
      >
        <OutlineBtn sx={topBtn}>Cancel</OutlineBtn>
        <OutlineBtn
          sx={topBtn}
          startIcon={
            <SaveDraftFileIcon color={C.textDark} width={20} height={20} />
          }
        >
          Save draft
        </OutlineBtn>
        <PrimaryBtn
          sx={topBtn}
          startIcon={<TiaChatIcon color="#fff" width={22} height={22} />}
        >
          Scrub &amp; approve
        </PrimaryBtn>
      </Stack>
    </Box>
  );
}

/* =========================================================
   STEPPER NAV
   ========================================================= */
function StepperNav({ activeId, onStepClick, onAlertsClick }) {
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
        pb: 1.5,
        ...cq("md", { flexDirection: "row", alignItems: "center" }),
      }}
    >
      <Box
        ref={listRef}
        sx={{
          display: "flex",
          alignItems: "center",
          overflowX: "auto",
          flexGrow: 0,
          width: "100%",
          minWidth: 0,
          ...cq("md", { flexGrow: 1, width: "auto" }),
          ...scrollHide,
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
                  gap: 0.75,
                  cursor: "pointer",
                  flexShrink: 0,
                  px: 1.3,
                  py: 0.55,
                  borderRadius: "999px",
                  bgcolor: isActive ? "#1A1D23" : "#fff",
                  border: isActive
                    ? "1.5px solid #1A1D23"
                    : "1.5px solid #C8CDD8",
                  transition:
                    "background-color 0.35s ease, padding 0.35s ease, border-color 0.35s ease",
                  "&:hover": {
                    bgcolor: isActive ? "#1A1D23" : "#fff",
                    borderColor: isActive ? "#1A1D23" : "#9CA3AF",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    bgcolor: isActive ? C.blue : "transparent",
                    border: isActive
                      ? `1.5px solid ${C.blue}`
                      : "1.5px solid #C8CDD8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 11,
                    fontWeight: isActive ? 800 : 600,
                    color: isActive ? "#fff" : "#5A6B7E",
                    flexShrink: 0,
                    transition:
                      "background-color 0.35s ease, border-color 0.35s ease, color 0.35s ease",
                  }}
                >
                  {index + 1}
                </Box>
                <Typography
                  sx={{
                    fontSize: 13.5,
                    fontWeight: 700,
                    color: isActive ? "#fff" : "#5A6B7E",
                    whiteSpace: "nowrap",
                    display: isActive ? "block" : "none",
                    ...cq("sm", { display: "block" }),
                    transition: "color 0.35s ease",
                  }}
                >
                  {step.label}
                </Typography>
              </Box>
              {index < STEPS.length - 1 && (
                <Typography
                  aria-hidden="true"
                  sx={{
                    flexShrink: 0,
                    mx: 0.5,
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#C8CDD8",
                    userSelect: "none",
                    lineHeight: 1,
                  }}
                >
                  --
                </Typography>
              )}
            </React.Fragment>
          );
        })}
      </Box>

      <Stack direction="row" spacing={0.8} flexShrink={0}>
        <OutlineBtn
          startIcon={<AlertBellIcon />}
          onClick={onAlertsClick}
          sx={{ color: "#5A6B7E", borderColor: "#E4E9EF", fontWeight: 700 }}
        >
          Alerts
        </OutlineBtn>
        <OutlineBtn
          startIcon={<PlusBlueIcon />}
          sx={{ color: "#5A6B7E", borderColor: "#E4E9EF", fontWeight: 700 }}
        >
          Add task
        </OutlineBtn>
      </Stack>
    </Box>
  );
}

/* =========================================================
   ENCOUNTER SUMMARY STRIP
   ========================================================= */
function SummaryItem({ label, value, valueColor }) {
  return (
    <Box sx={{ minWidth: 0 }}>
      <Typography
        sx={{
          fontSize: 9.5,
          fontWeight: 700,
          letterSpacing: "0.1em",
          color: C.textMuted,
          textTransform: "uppercase",
          mb: 0.25,
        }}
      >
        {label}
      </Typography>
      <Typography
        sx={{
          fontSize: 13.5,
          fontWeight: 500,
          color: valueColor || "#0D1B2A",
          lineHeight: 1.3,
          overflowWrap: "anywhere",
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}

function EncounterSummary() {
  return (
    <Paper
      elevation={0}
      sx={{
        border: `1px solid ${C.borderLight}`,
        borderRadius: "12px",
        bgcolor: "#fff",
        px: { xs: 2, md: 3 },
        py: 1.5,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
          minWidth: 0,
          ...cq("sm", { flexDirection: "row", gap: 4 }),
        }}
      >
        <SummaryItem label="Encounter" value="NEW - Draft" />
        <SummaryItem label="Patient" value="Wayne, Jimmy" />
        <SummaryItem
          label="Details"
          value="06/15/1978 - M - MRN 326362969"
          valueColor={C.textMuted}
        />
      </Box>
      <Chip
        label="Unbilled"
        sx={{
          bgcolor: C.amberChipBg,
          color: C.amberChipText,
          fontWeight: 800,
          fontSize: 12,
          borderRadius: "10px",
          height: 24,
          "& .MuiChip-label": { px: 1.2 },
        }}
      />
    </Paper>
  );
}

/* =========================================================
   ENCOUNTER ASSIST BANNER
   ========================================================= */
function AssistBanner() {
  const bold = { fontWeight: 700, color: C.textBold };
  return (
    <Paper
      elevation={0}
      sx={{
        border: "1px solid #E2E8F0",
        borderRadius: "10px",
        bgcolor: C.purpleBg,
        px: { xs: 2, md: 2.5 },
        py: 1.5,
        display: "flex",
        gap: 0.8,
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      }}
    >
      <Box sx={{ minWidth: 0 }}>
        <Typography
          sx={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.08em",
            color: C.purple,
            textTransform: "uppercase",
            mb: 0.4,
            fontFamily: "Figtree, sans-serif",
          }}
        >
          ✦ Encounter Assist
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: 13, sm: 14 },
            color: C.textBody,
            lineHeight: 1.65,
            fontFamily: "Figtree, sans-serif",
          }}
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
          — one click below runs it. Nothing here opens a new window.
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

/* =========================================================
   CARD 1 - PATIENT
   ========================================================= */
function DetailColumn({ items }) {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", gap: 0.5, minWidth: 0 }}
    >
      {items.map(({ label, value, pre }) => (
        <Typography
          key={label}
          sx={{ fontSize: 13, color: C.textBody, overflowWrap: "anywhere" }}
        >
          {label}{" "}
          <Box
            component="span"
            sx={{
              fontWeight: 700,
              color: C.textDark,
              whiteSpace: pre ? "pre-line" : "normal",
            }}
          >
            {value}
          </Box>
        </Typography>
      ))}
    </Box>
  );
}

function PatientSection({ sectionRef }) {
  const [showDetails, setShowDetails] = React.useState(false);

  const patient = {
    legalName: "Wayne Jimmy",
    dob: "08/25/1978",
    gender: "Male",
    mrn: "563526626",
    ssn: "563526626",
    mobile: "(313) 404-6928",
    address: "Capitol Way S,\nWashingtone, AR 12344",
    maritalStatus: "NA",
    emplStatus: "NA",
    referralSource: "NA",
    employer: "NA",
    pcp: "NA",
    referringPhysician: "NA",
  };

  return (
    <SectionCard
      id="patient"
      sectionRef={sectionRef}
      number={1}
      title="Patient"
      accentColor={C.purple}
      accentBg={C.purpleBg}
      rightSlot={
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          <OutlineBtn>
            Select existing
          </OutlineBtn>
          <PrimaryBtn>+ New patient</PrimaryBtn>
        </Stack>
      }
    >
      {showDetails && (
        <Box
          sx={{
            borderRadius: "10px",
            px: { xs: 0, md: 1 },
            py: 1,
            bgcolor: "#fff",
            position: "relative",
          }}
        >
          <IconButton
            size="small"
            sx={{ position: "absolute", top: 4, right: 4, color: C.blue }}
          >
            <RPEditIcon sx={{ fontSize: 14 }} />
          </IconButton>

          <Typography
            sx={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.1em",
              color: C.textMuted,
              textTransform: "uppercase",
              mb: 1.2,
            }}
          >
            Patient Details
          </Typography>

          <Box sx={gridCols(4, "lg")}>
            <DetailColumn
              items={[
                { label: "Legal Name", value: patient.legalName },
                { label: "DOB", value: patient.dob },
                { label: "Gender", value: patient.gender },
                { label: "MRN", value: patient.mrn },
              ]}
            />
            <DetailColumn
              items={[
                { label: "SSN", value: patient.ssn },
                { label: "Mobile", value: patient.mobile },
                { label: "Marital Status", value: patient.maritalStatus },
                { label: "Empl. Status", value: patient.emplStatus },
              ]}
            />
            <DetailColumn
              items={[{ label: "Address:", value: patient.address, pre: true }]}
            />
            <DetailColumn
              items={[
                { label: "Referral Source", value: patient.referralSource },
                { label: "Employer", value: patient.employer },
                { label: "PCP", value: patient.pcp },
                {
                  label: "Referring Physician",
                  value: patient.referringPhysician,
                },
              ]}
            />
          </Box>
        </Box>
      )}

      {/* {!showDetails && (
        <>
          <FieldRow
            fields={[
              { label: "Legal Name", value: "Wayne, Jimmy" },
              { label: "Date of Birth", value: "06/15/1978", icon: true },
              { label: "Gender", value: "Male" },
              { label: "MRN", value: "326362969" },
            ]}
          />
          <FieldRow
            fields={[
              { label: "SSN", value: "000-00-5433", md: 3 },
              { label: "Mobile Phone", value: "(313) 404-6928", md: 3 },
              {
                label: "Address",
                value: "Capitol Way S, Washingtone, AR 12344",
                md: 6,
              },
            ]}
          />
          <FieldRow
            fields={[
              { label: "Marital Status", value: "NA" },
              { label: "Employment Status", value: "NA" },
              { label: "Referral Source", value: "Not Specified" },
              { label: "Employer", value: "NA" },
            ]}
          />
          <FieldRow
            fields={[
              { label: "Primary Care Physician", value: "NA" },
              { label: "Referring Physician", value: "NA" },
              {
                label: "Default Rendering Provider",
                value: "Kumar V2, Jayram",
              },
              {
                label: "Default Service Location",
                value: "The University RL",
                highlightedGreen: true,
              },
            ]}
          />
        </>
      )} */}
    </SectionCard>
  );
}

/* =========================================================
   CARD 2 - CASE & INSURANCE
   ========================================================= */

/* Own component so each checkbox owns its state (hooks must never be
   called inside .map() like in the old version). */
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
            color: C.textLabel,
            "&.Mui-checked": { color: "#6C5AE0" },
          }}
        />
      }
      label={
        <Typography
          sx={{
            fontSize: 13.5,
            fontWeight: 500,
            color: checked ? C.purple : C.textLabel,
          }}
        >
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

function CaseInsuranceSection({ sectionRef }) {
  const cellSx = {
    borderBottom: "1px solid #E8F3EF",
    py: 1,
    px: 1.5,
    verticalAlign: "middle",
  };

  const headCellSx = {
    ...cellSx,
    bgcolor: C.greenBg,
    fontSize: 12,
    fontWeight: 700,
    color: C.green,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    whiteSpace: "nowrap",
    py: 1.1,
  };

  const tblInputSx = {
    borderRadius: "8px",
    fontSize: 11,
    bgcolor: "#fff",
    color: C.textDark,
    "& .MuiOutlinedInput-notchedOutline": { borderColor: "#DDE3EE" },
    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#B0BACA" },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: C.green,
      borderWidth: "1.5px",
    },
    "& input": { py: "5.5px", px: "10px", fontSize: 11, color: C.textDark },
    "& .MuiSelect-select": {
      py: "5.5px",
      px: "10px",
      fontSize: 11,
      color: C.textDark,
    },
  };

  const cols = [
    { label: "" },
    { label: "TYPE" },
    { label: "INSURANCE" },
    { label: "PLAN" },
    { label: "POLICY #" },
    { label: "GROUP #" },
    { label: "ACTIVE", arrow: true },
    { label: "ACTIONS" },
  ];

  const cellInput = (defaultValue) => (
    <TextField
      size="small"
      defaultValue={defaultValue}
      slotProps={{ input: { sx: tblInputSx } }}
      sx={hideHelper}
    />
  );

  return (
    <SectionCard
      id="case"
      sectionRef={sectionRef}
      number={2}
      title="Case & Insurance"
      accentColor={C.green}
      accentBg={C.greenBg}
      rightSlot={
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          <OutlineBtn>Select case</OutlineBtn>
          <PrimaryBtn>+ New case</PrimaryBtn>
        </Stack>
      }
    >
      <FieldRow
        fields={[
          { label: "Case Name", value: "Aetna test", md: 4 },
          { label: "Description", value: "Aetna test", md: 4 },
          {
            label: "Payer Scenario",
            value: "Commercial",
            select: true,
            options: ["Commercial", "Medicare", "Medicaid", "Self-pay"],
            md: 4,
          },
        ]}
      />

      <Stack direction="row" flexWrap="wrap" rowGap={0.5} alignItems="center">
        <CaseCheck label="Active" initial />
        <CaseCheck label="Send patient statement" initial />
        <CaseCheck label="Do not send claim electronically" initial={false} />
      </Stack>

      <Box sx={{ width: "100%", minWidth: 0 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 1, width: "100%" }}
        >
          <Typography sx={{ fontSize: 13, fontWeight: 700, color: C.green }}>
            Insurance policies
          </Typography>
          <Typography
            sx={{
              fontSize: 12.5,
              fontWeight: 600,
              color: "#015DFF",
              cursor: "pointer",
              ml: "auto",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            + Add/Manage policy
          </Typography>
        </Stack>

        <TableContainer
          sx={{
            border: "1px solid #D6EDE6",
            borderRadius: "10px",
            overflowX: "auto",
            maxWidth: "100%",
            ...scrollHide,
          }}
        >
          <Table size="small" sx={{ minWidth: 820 }}>
            <TableHead>
              <TableRow>
                {cols.map((col, ci) => (
                  <TableCell key={ci} sx={headCellSx}>
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.3 }}
                    >
                      {col.label}
                      {col.arrow && (
                        <KeyboardArrowDownIcon
                          sx={{ fontSize: 14, color: C.green }}
                        />
                      )}
                    </Box>
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
                  <TableCell sx={{ ...cellSx, width: 44 }}>
                    <Checkbox
                      size="small"
                      defaultChecked={row.checked}
                      sx={{
                        p: 0.4,
                        color: "#C8D0DC",
                        "&.Mui-checked": { color: C.green },
                      }}
                    />
                  </TableCell>

                  <TableCell sx={{ ...cellSx, minWidth: 138 }}>
                    <TextField
                      select
                      size="small"
                      fullWidth
                      defaultValue={row.type}
                      SelectProps={{ IconComponent: ArrowDropDownIcon }}
                      slotProps={{ input: { sx: tblInputSx } }}
                      sx={hideHelper}
                    >
                      <MenuItem value="PRIMARY" sx={{ fontSize: 11 }}>
                        PRIMARY
                      </MenuItem>
                      <MenuItem value="SECONDARY" sx={{ fontSize: 11 }}>
                        SECONDARY
                      </MenuItem>
                    </TextField>
                  </TableCell>

                  <TableCell sx={{ ...cellSx, minWidth: 100 }}>
                    {cellInput(row.insurance)}
                  </TableCell>
                  <TableCell sx={{ ...cellSx, minWidth: 140 }}>
                    {cellInput(row.plan)}
                  </TableCell>
                  <TableCell sx={{ ...cellSx, minWidth: 116 }}>
                    {cellInput(row.policy)}
                  </TableCell>
                  <TableCell sx={{ ...cellSx, minWidth: 116 }}>
                    {cellInput(row.group)}
                  </TableCell>

                  <TableCell sx={{ ...cellSx, minWidth: 110 }}>
                    <Box
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 0.4,
                        bgcolor: "#E6F6F0",
                        border: "1px solid #B2DECE",
                        borderRadius: "8px",
                        px: 1,
                        py: 0.3,
                      }}
                    >
                      <Checkbox
                        size="small"
                        defaultChecked
                        sx={{
                          p: 0,
                          color: C.green,
                          "&.Mui-checked": { color: C.green },
                          "& svg": { fontSize: 15 },
                        }}
                      />
                      <Typography
                        sx={{ fontSize: 11, fontWeight: 600, color: C.green }}
                      >
                        Active
                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell sx={{ ...cellSx, width: 48 }}>
                    <IconButton size="small">
                      <RPEditIcon sx={{ fontSize: 10, color: C.blue }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box>
        <Typography
          sx={{ fontSize: 12.5, fontWeight: 700, color: C.green, mb: 1.2 }}
        >
          Additional details
        </Typography>
        <FieldRow
          fields={[
            { label: "Copay", value: "0.00" },
            { label: "Deductible", value: "0.00" },
            {
              label: "Relationship to Insured",
              value: "Self",
              select: true,
              options: ["Self", "Spouse", "Child", "Other"],
            },
            {
              label: "Release of Info",
              value: "Y - Yes",
              select: true,
              options: ["Y - Yes", "N - No"],
            },
          ]}
        />
      </Box>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
        rowGap={1}
        columnGap={2}
      >
        <PrimaryBtn sx={{ fontSize: 12.5, px: 2.5, py: 0.75 }}>
          Check eligibility (270/271)
        </PrimaryBtn>

        <Typography
          sx={{
            fontSize: 13,
            color: "#8B87A3",
          }}
        >
          Runs inline — no separate window.
        </Typography>

        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 600,
            color: "#015DFF",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 0.4,
            ml: "auto",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          <CalendarBlueIcon sx={{ fontSize: 13, fontWeight: 600 }} /> View log
        </Typography>
      </Stack>
    </SectionCard>
  );
}

/* =========================================================
   CARD 3 - CONDITIONS & AUTHORISATION
   ========================================================= */
const COND_ROW_1 = [
  "Auto accident",
  "Employment",
  "Pregnancy",
  "Abuse",
  "Homebound",
];
const COND_ROW_2 = [
  "Other",
  "EPSDT",
  "Family planning",
  "Emergency",
  "Worker's Compensation",
];

function ActiveBadge() {
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: C.greenChipBg,
        border: `1px solid ${C.greenChipBorder}`,
        borderRadius: "6px",
        px: 1.2,
        py: 0.25,
        minWidth: 58,
      }}
    >
      <Typography
        sx={{ fontSize: 12.5, fontWeight: 700, color: C.greenChipText }}
      >
        Active
      </Typography>
    </Box>
  );
}

function ConditionsSection({ sectionRef }) {
  const cellSx = {
    borderBottom: "1px solid #F0EDE8",
    py: 1.1,
    px: 1.5,
    verticalAlign: "middle",
    fontSize: 13,
    color: C.textDark,
    whiteSpace: "nowrap",
  };
  const headCellSx = {
    ...cellSx,
    bgcolor: C.orangeBg,
    fontSize: 11,
    fontWeight: 700,
    color: "#C2662A",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  };
  const tblInputSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "7px",
      fontSize: 13,
      bgcolor: "#fff",
      "& fieldset": { borderColor: C.border },
      "&:hover fieldset": { borderColor: "#B8BFCF" },
      "&.Mui-focused fieldset": { borderColor: C.orange, borderWidth: "1.5px" },
      "& input": { py: "5.5px", px: "10px", fontSize: 13 },
    },
    ...hideHelper,
  };

  const buildTable = (cols, rows) => (
    <TableContainer
      sx={{
        border: "1px solid #EDE8E2",
        borderRadius: "10px",
        overflowX: "auto",
        maxWidth: "100%",
        ...scrollHide,
      }}
    >
      <Table size="small" sx={{ minWidth: 980 }}>
        <TableHead>
          <TableRow>
            {cols.map((c, ci) => (
              <TableCell key={ci} sx={headCellSx}>
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
                <TableCell key={ci} sx={cellSx}>
                  {typeof cell === "string" ? (
                    <TextField
                      size="small"
                      defaultValue={cell}
                      sx={{ ...tblInputSx, minWidth: ci === 0 ? 130 : 84 }}
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

  const makeRows = (prefix) =>
    [1, 2].map((n) => [
      "AUTH-88210",
      "6",
      "0",
      "08/01/2026",
      "10/31/2026",
      <ActiveBadge key={`${prefix}${n}`} />,
      "Lorem Ipsum",
      "XXXXXXXXXX",
      "Neuro follow-up",
    ]);

  const authCols = [
    "Authorization #",
    "# Visits",
    "# Used",
    "Start",
    "End",
    "Status +",
    "Provider Name",
    "Contact",
    "Notes",
  ];
  const refCols = [
    "Referrer #",
    "# Visits",
    "# Used",
    "Start",
    "End",
    "Status +",
    "Name",
    "Contact",
    "Notes",
  ];

  const condChk = (lbl) => (
    <FormControlLabel
      key={lbl}
      sx={{ mr: 0, ml: 0, mb: 0 }}
      control={
        <Checkbox
          size="small"
          sx={{
            p: 0.5,
            color: "#D0D5E0",
            "&.Mui-checked": { color: C.orange },
            "& svg": { fontSize: 17 },
          }}
        />
      }
      label={
        <Typography sx={{ fontSize: 13.5, color: C.textDark }}>
          {lbl}
        </Typography>
      }
    />
  );

  return (
    <SectionCard
      id="conditions"
      sectionRef={sectionRef}
      number={3}
      title="Conditions & Authorisation / Referrals"
      accentColor={C.orange}
      accentBg={C.orangeBg}
    >
      <Box>
        <Typography
          sx={{ fontSize: 12, fontWeight: 600, color: C.textLabel, mb: 1 }}
        >
          Condition related to
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(1, minmax(0,1fr))",
            rowGap: 0.5,
            columnGap: 1,
            ...cqs({
              sm: { gridTemplateColumns: "repeat(2, minmax(0,1fr))" },
              md: { gridTemplateColumns: "repeat(3, minmax(0,1fr))" },
              lg: { gridTemplateColumns: "repeat(5, minmax(0,1fr))" },
            }),
          }}
        >
          {[...COND_ROW_1, ...COND_ROW_2].map(condChk)}
        </Box>
      </Box>

      <Box sx={gridCols(3, "md")}>
        <LabeledInput
          label="Condition Date Type"
          select
          defaultValue="None"
          options={["None", "Initial", "Last seen", "Acute manifestation"]}
          sx={inputOrange()}
        />
        <LabeledInput label="Start Date" defaultValue="NA" />
        <LabeledInput label="End Date" defaultValue="NA" />
      </Box>

      <Box sx={{ minWidth: 0 }}>
        <Typography
          sx={{ fontSize: 13.5, fontWeight: 700, color: C.orange, mb: 1 }}
        >
          Authorizations
        </Typography>
        {buildTable(authCols, makeRows("a"))}
      </Box>

      <Box sx={{ minWidth: 0 }}>
        <Typography
          sx={{ fontSize: 13.5, fontWeight: 700, color: C.orange, mb: 1 }}
        >
          Referrals
        </Typography>
        {buildTable(refCols, makeRows("r"))}
      </Box>
    </SectionCard>
  );
}

/* =========================================================
   CUSTOMISED COLUMNS POPUP
   ========================================================= */
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
      <OutlineBtn onClick={(e) => setAnchorEl(e.currentTarget)}>
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
              borderRadius: 3,
              p: 0,
              boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
              border: "1px solid #E2E8F0",
            },
          },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 1.5, px: 2.5, pt: 2.5, gap: 4 }}
        >
          <Typography sx={{ fontWeight: 600, fontSize: 14 }}>
            Select Columns
          </Typography>
          <IconButton
            size="small"
            onClick={() => setAnchorEl(null)}
            sx={{ color: "#1976d2" }}
          >
            <CloseIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Stack>

        <Box sx={{ borderBottom: "1px solid #eee", mb: 1.5 }} />

        <Stack spacing={2} sx={{ px: 2, pb: 2.5 }}>
          {OPTIONAL_COLUMNS.map((col) => {
            const isSelected = selectedColumns.includes(col);
            return (
              <Box
                key={col}
                onClick={() => toggleColumn(col)}
                sx={{
                  cursor: "pointer",
                  borderRadius: "12px",
                  px: 1,
                  py: 1,
                  border: "1px solid",
                  borderColor: isSelected ? "#bfdbfe" : "#e5e7eb",
                  bgcolor: isSelected ? "#EAF2FF" : "#fff",
                  "&:hover": { borderColor: "#93c5fd", bgcolor: "#f0f7ff" },
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: isSelected ? "#1976d2" : "#1976d2",
                    fontSize: 14,
                  }}
                >
                  {col}
                </Typography>
              </Box>
            );
          })}
        </Stack>
      </Popover>
    </>
  );
}

/* =========================================================
   CARD 4 - ENCOUNTER DETAILS & CHARGES
   ========================================================= */
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
    "05/27/2026",
    "05/27/2026",
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

  const diagChip = (key, label, bg, color, onDelete) => (
    <Chip
      key={key}
      label={label}
      onDelete={onDelete}
      deleteIcon={<CloseIcon sx={{ fontSize: 12 }} />}
      sx={{
        bgcolor: bg,
        color,
        fontWeight: 600,
        fontSize: 13,
        borderRadius: "20px",
        height: 30,
        px: 0.5,
        "& .MuiChip-deleteIcon": { color, fontSize: 14 },
      }}
    />
  );

  return (
    <SectionCard
      id="charges"
      sectionRef={sectionRef}
      number={4}
      title="Encounter Details & Charges"
      accentColor={C.amber}
      accentBg={C.amberBg}
    >
      <FieldRow
        fields={[
          { label: "From Date", value: "08/15/2026", icon: true },
          { label: "Through Date", value: "08/15/2026", icon: true },
          { label: "Post Date", value: "08/28/2026", icon: true },
          { label: "Batch #", value: "--" },
        ]}
      />

      <FieldRow
        fields={[
          { label: "Scheduling Provider", value: "Kumar V2, Jayram" },
          { label: "Rendering Provider", value: "Kumar V2, Jayram" },
          { label: "Supervising Provider", value: "NA" },
          {
            label: "Location",
            value: "The University RL",
            highlightedGreen: true,
          },
        ]}
      />

      <Box sx={gridCols(4, "lg")}>
        <LabeledInput
          label="Place of Service"
          defaultValue="11 - Office"
          sx={inputAmber()}
        />
        <LabeledInput
          label="Encounter Mode"
          defaultValue="In Office"
          sx={inputAmber()}
        />
        <LabeledInput label="Copay Due" defaultValue="0.00" />
        <LabeledInput label="Payment Amount" defaultValue="0.00" />
      </Box>

      <Box>
        <Typography
          sx={{ fontSize: 13, fontWeight: 700, color: C.amber, mb: 1 }}
        >
          Diagnosis pointers
        </Typography>
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          flexWrap="wrap"
          useFlexGap
        >
          {diagnoses.map((d, i) => {
            const { bg, color } = DIAG_COLORS[i % DIAG_COLORS.length];
            const label = `${String.fromCharCode(65 + i)}_${d.code}`;
            return diagChip(d.id, label, bg, color, () =>
              removeDiagnosis(d.id),
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
              slotProps={{
                input: {
                  sx: { ...inputNormal(), height: 30, borderRadius: "20px" },
                },
              }}
              sx={{ width: 130, ...hideHelper }}
            />
          ) : (
            <Chip
              label="+ Add"
              variant="outlined"
              onClick={() => setAdding(true)}
              disabled={diagnoses.length >= 12}
              sx={{
                borderColor: "#DCD6F8",
                color: C.purple,
                fontWeight: 600,
                fontSize: 13,
                borderRadius: "20px",
                height: 30,
                px: 0.5,
                cursor: "pointer",
              }}
            />
          )}
        </Stack>
      </Box>

      <Box
        sx={{
          border: `1px solid ${C.borderLight}`,
          borderRadius: "10px",
          overflow: "hidden",
          minWidth: 0,
        }}
      >
        <Stack
          direction="column"
          alignItems="flex-start"
          justifyContent="space-between"
          rowGap={1}
          sx={{
            bgcolor: C.amberBg,
            px: 1.5,
            py: 1,
            ...cq("sm", { flexDirection: "row", alignItems: "center" }),
          }}
        >
          <Typography sx={{ fontSize: 14, fontWeight: 700, color: C.textDark }}>
            Procedures
          </Typography>
          <Stack
            direction="row"
            spacing={1}
            flexWrap="wrap"
            useFlexGap
            sx={{ ...cq("sm", { marginLeft: "auto" }) }}
          >
            <SelectColumnsMenu
              selectedColumns={selectedColumns}
              onChange={setSelectedColumns}
            />
            <OutlineBtn>+ Add line</OutlineBtn>
          </Stack>
        </Stack>

        <TableContainer
          sx={{
            borderTop: `1px solid ${C.borderLight}`,
            borderRadius: 0,
            overflowX: "auto",
            maxWidth: "100%",
            ...scrollHide,
          }}
        >
          <Table size="small" sx={{ minWidth: 960 }}>
            <TableHead>
              <TableRow>
                {PROC_COLUMNS.map((col) => (
                  <TableCell
                    key={col}
                    sx={{
                      bgcolor: C.amberBg,
                      fontSize: 10.5,
                      fontWeight: 700,
                      color: C.amber,
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                      whiteSpace: "nowrap",
                      borderBottom: "1px solid #EEF1F7",
                      py: 1.1,
                      px: 1.5,
                    }}
                  >
                    {col}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {PROC_ROWS.map((row, i) => (
                <TableRow
                  key={i}
                  sx={{ "&:last-child td": { borderBottom: 0 } }}
                >
                  {row.map((cell, j) => (
                    <TableCell
                      key={j}
                      sx={{
                        fontSize: 12,
                        color: C.textDark,
                        whiteSpace: "nowrap",
                        borderBottom: "1px solid #EEF1F7",
                        py: 1.1,
                        px: 1.5,
                      }}
                    >
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </SectionCard>
  );
}
/* =========================================================
   CARD 5 - ADDITIONAL DETAILS
   ========================================================= */
function AdditionalDetailsSection({ sectionRef }) {
  return (
    <SectionCard
      id="additional"
      sectionRef={sectionRef}
      number={5}
      title="Additional Details"
      accentColor={C.teal5}
      accentBg={C.teal5Bg}
    >
      <FieldRow
        fields={[
          {
            label: "Outside Lab",
            type: "checkboxGroup",
            options: ["Yes", "No"],
          },
          { label: "Outside Lab Charges", value: "0" },
          { label: "Is LMP", type: "checkboxGroup", options: ["Yes"] },
          { label: "Date of current illness", value: "09/28/2026", icon: true },
        ]}
      />
      <FieldRow
        fields={[
          {
            label: "Has other claim ID",
            value: "Yes",
            select: true,
            options: ["Yes", "No"],
          },
          { label: "Agency claim no.", value: "", placeholder: "Type here" },
          {
            label: "Unable to work from date",
            value: "08/28/2026",
            icon: true,
          },
          { label: "Unable to work to date", value: "09/28/2026", icon: true },
        ]}
      />
      <FieldRow
        fields={[
          { label: "Initial visit date", value: "07/28/2026", icon: true },
          { label: "Last related visit date", value: "07/28/2026", icon: true },
          {
            label: "Claim code",
            value: "W3",
            select: true,
            options: ["W3", "W2", "W1"],
          },
          { label: "Other date", value: "09/28/2026", icon: true },
        ]}
      />
      <FieldRow
        fields={[
          {
            label: "Other date qualifier",
            value: "-",
            select: true,
            options: ["-"],
          },
          { label: "Resubmission code", value: "-" },
          { label: "Original reference no.", value: "-" },
          { label: "Additional Claim info", value: "-" },
        ]}
      />
    </SectionCard>
  );
}

/* =========================================================
   FOOTER BAR (sticky at the bottom of the viewport)
   ========================================================= */
const SELECT_ACTION_ITEMS = [
  { label: "E-submit to Primary", highlighted: false },
  { label: "Approve", highlighted: true },
  { label: "Print Paper Claim", highlighted: false },
  { label: "Reject", highlighted: false },
];

function FooterBar({ navigate }) {
  const [anchor, setAnchor] = React.useState(null);
  const open = Boolean(anchor);

  const footBtn = {
    fontSize: 13,
    fontWeight: 700,
    color: C.textDark,
    borderColor: C.border,
    px: 2,
    py: 0.65,
    whiteSpace: "nowrap", // never wrap "Save draft" onto 2 lines
    flexShrink: 0,
    minWidth: "auto",
    "&:hover": { borderColor: "#B0B8C8", bgcolor: "#FAFBFD" },
  };

  return (
    <Paper
      elevation={3}
      sx={{
        position: "static",
        bottom: { xs: 8, md: 12 },
        "@media (max-height: 600px)": { position: "static" },
        zIndex: 25,
        border: `1px solid ${C.borderLight}`,
        borderRadius: "12px",
        bgcolor: "#fff",
        px: { xs: 2, md: 3 },
        py: 1.5,
        display: "flex",
        alignItems: "stretch",
        justifyContent: "space-between",
        flexDirection: "column",
        gap: 1.5,
        ...cq("lg", {
          alignItems: "center",
          flexDirection: "row",
          gap: 2,
        }),
      }}
    >
      {/* Left: Total Charges */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          width: "100%",
          ...cq("lg", { width: "auto" }),
        }}
      >
        <Typography
          sx={{
            fontSize: 13,
            fontWeight: 600,
            color: "#5A6B7E",
            whiteSpace: "nowrap",
          }}
        >
          Total Charges{" "}
          <Box
            component="span"
            sx={{ color: "#5A6B7E", fontWeight: 700, fontSize: 17 }}
          >
            *
          </Box>
        </Typography>
        <TextField
          size="small"
          defaultValue="118.00"
          slotProps={{ input: { sx: inputNormal() } }}
          sx={{
            flex: 1,
            ...cq("lg", { flex: "none", width: 160 }),
          }}
        />
      </Box>

      {/* Right: Action buttons */}
      <Stack
        direction="row"
        spacing={1}
        flexWrap="wrap"
        useFlexGap
        alignItems="center"
        sx={{
          justifyContent: "flex-start",
          minWidth: 0,
          ...cq("lg", { justifyContent: "flex-end" }),
        }}
      >
        <Button
          variant="outlined"
          onClick={() => navigate(-1)}
          sx={{ textTransform: "none", borderRadius: "8px", ...footBtn }}
        >
          Cancel
        </Button>

        <Button
          variant="outlined"
          startIcon={<SaveDraftFileIcon width={16} height={16} />}
          sx={{ textTransform: "none", borderRadius: "8px", ...footBtn }}
        >
          Save draft
        </Button>

        <Button
          variant="outlined"
          startIcon={
            <TiaChatIcon2
              sx={{ fontSize: 15, fontWeight: 700, color: C.textBold }}
            />
          }
          sx={{
            textTransform: "none",
            borderRadius: "8px",
            ...footBtn,
            fontWeight: 600,
          }}
        >
          Scrub
        </Button>

        {/* Save + Select Action buttons */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            flexShrink: 0,
          }}
        >
          {/* Save Button */}
          <Button
            variant="contained"
            disableElevation
            startIcon={<CheckIcon sx={{ fontSize: 15 }} />}
            sx={{
              textTransform: "none",
              borderRadius: "8px",
              fontSize: 13,
              fontWeight: 700,
              bgcolor: C.blue,
              px: 2,
              py: 0.68,
              whiteSpace: "nowrap",
              "&:hover": {
                bgcolor: C.blueHover,
              },
            }}
          >
            Save
          </Button>

          {/* Select Action Button */}
          <Button
            disableElevation
            onClick={(e) => setAnchor(e.currentTarget)}
            endIcon={
              <ArrowDropDownIcon
                sx={{
                  fontSize: 18,
                  color: "#6B7280",
                }}
              />
            }
            sx={{
              textTransform: "none",
              fontSize: 13,
              fontWeight: 700,
              color: C.textDark,
              border: `1px solid ${C.border}`,
              borderRadius: "8px",
              px: 1.5,
              py: 0.68,
              bgcolor: "#fff",
              whiteSpace: "nowrap",
              "&:hover": {
                bgcolor: "#F5F6F8",
              },
            }}
          >
            Select Action
          </Button>
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
                borderRadius: "14px",
                width: 200,
                maxWidth: "calc(100vw - 32px)",
                boxShadow: "0 8px 28px rgba(0,0,0,0.14)",
                mt: -0.5,
                overflow: "hidden",
                border: "1px solid #E2E8F0",
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
              py: 1.2,
              borderBottom: `1px solid ${C.borderLight}`,
            }}
          >
            <Typography
              sx={{ fontSize: 14, fontWeight: 700, color: C.textDark }}
            >
              Select Action
            </Typography>
            <IconButton
              size="small"
              onClick={() => setAnchor(null)}
              sx={{ p: 0.3, color: C.blue }}
            >
              <CloseIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Box>

          <Box
            sx={{
              py: 1.2,
              px: 1.5,
              display: "flex",
              flexDirection: "column",
              gap: 0.8,
            }}
          >
            {SELECT_ACTION_ITEMS.map((item) => (
              <Box
                key={item.label}
                onClick={() => setAnchor(null)}
                sx={{
                  px: 2,
                  py: 1.1,
                  borderRadius: "10px",
                  cursor: "pointer",
                  border: `1px solid ${item.highlighted ? "#B8D0FF" : C.borderLight}`,
                  bgcolor: item.highlighted ? "#EEF4FF" : "#fff",
                  transition: "background 0.15s, border-color 0.15s",
                  "&:hover": {
                    bgcolor: item.highlighted ? "#DDE9FF" : "#F5F8FF",
                    borderColor: item.highlighted ? "#93BBFF" : "#C5CEDE",
                  },
                }}
              >
                <Typography
                  sx={{ fontSize: 13.5, fontWeight: 700, color: C.blue }}
                >
                  {item.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Popover>
      </Stack>
    </Paper>
  );
}

/* =========================================================
   PATIENT ALERT DIALOG
   ========================================================= */
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
  const [showWhenAnchor, setShowWhenAnchor] = React.useState(null);
  const [selectedWhen, setSelectedWhen] = React.useState([]);
  const [message, setMessage] = React.useState("");

  const showWhenOpen = Boolean(showWhenAnchor);
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

  const showWhenDisplay =
    selectedWhen.length === 0
      ? "Select"
      : allSelected
        ? "Select all"
        : selectedWhen.join(", ");

  const fieldLabelSx = {
    fontSize: 12,
    fontWeight: 500,
    color: C.textLabel,
    mb: "6px",
    lineHeight: 1.3,
    display: "block",
  };

  const selectSx = {
    width: "100%",
    "& .MuiOutlinedInput-root": {
      height: 38,
      borderRadius: "8px",
      backgroundColor: "#FFFFFF",
      "& .MuiOutlinedInput-notchedOutline": { borderColor: "#DFE4ED" },
      "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#B8C0CE" },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: C.blue,
        borderWidth: "1.5px",
      },
    },
    "& .MuiSelect-select": {
      fontSize: 13.5,
      fontWeight: 400,
      color: "#6F7887",
      padding: "8px 32px 8px 12px !important",
      minHeight: "auto !important",
      display: "flex",
      alignItems: "center",
    },
    "& .MuiSelect-icon": {
      color: C.blue,
      fontSize: 22,
      right: 6,
      top: "calc(50% - 11px)",
    },
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      sx={{
        "& .MuiDialog-paper": {
          width: 520,
          maxWidth: "calc(100vw - 24px)",
          maxHeight: "calc(100dvh - 24px)",
          borderRadius: "16px",
          overflowY: "auto",
          boxShadow: "0 16px 48px rgba(0,0,0,0.18)",
          m: 1.5,
        },
        "& .MuiBackdrop-root": { backgroundColor: "rgba(0,0,0,0.45)" },
      }}
    >
      <Box sx={{ px: { xs: 2, sm: 3 }, pt: 2.5, pb: 3 }}>
        {/* HEADER */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2.5,
          }}
        >
          <Typography sx={{ fontSize: 18, fontWeight: 700, color: "#111827" }}>
            Patient Alert
          </Typography>
          <IconButton
            size="small"
            onClick={onClose}
            sx={{ color: "#374151", "&:hover": { bgcolor: "#F3F4F6" } }}
          >
            <CloseIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Box>

        {/* TWO SELECTS */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "minmax(0,1fr)",
              sm: "repeat(2, minmax(0,1fr))",
            },
            gap: 2,
            mb: 2,
          }}
        >
          <Box sx={{ minWidth: 0 }}>
            <Typography sx={fieldLabelSx}>Select Patient</Typography>
            <TextField
              fullWidth
              size="small"
              select
              value={patient}
              onChange={(e) => setPatient(e.target.value)}
              SelectProps={{
                displayEmpty: true,
                IconComponent: ArrowDropDownIcon,
              }}
              sx={selectSx}
            >
              <MenuItem value="" sx={{ fontSize: 13.5 }}>
                Select
              </MenuItem>
              <MenuItem value="wayne" sx={{ fontSize: 13.5 }}>
                Wayne, Jimmy
              </MenuItem>
              <MenuItem value="cook" sx={{ fontSize: 13.5 }}>
                Cook, Lisha
              </MenuItem>
            </TextField>
          </Box>

          <Box sx={{ minWidth: 0 }}>
            <Typography sx={fieldLabelSx}>Show Alert when</Typography>
            <Box
              onClick={(e) => setShowWhenAnchor(e.currentTarget)}
              sx={{
                height: 38,
                boxSizing: "border-box",
                border: `${showWhenOpen ? "1.5px" : "1px"} solid ${
                  showWhenOpen ? C.blue : "#DFE4ED"
                }`,
                borderRadius: "8px",
                bgcolor: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                px: 1.5,
                cursor: "pointer",
                "&:hover": { borderColor: "#B8C0CE" },
              }}
            >
              <Typography
                sx={{
                  fontSize: 13.5,
                  color: selectedWhen.length === 0 ? "#6F7887" : C.textDark,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  flex: 1,
                  mr: 1,
                }}
              >
                {showWhenDisplay}
              </Typography>
              <ArrowDropDownIcon
                sx={{ color: C.blue, fontSize: 22, flexShrink: 0 }}
              />
            </Box>

            <Popover
              open={showWhenOpen}
              anchorEl={showWhenAnchor}
              onClose={() => setShowWhenAnchor(null)}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              slotProps={{
                paper: {
                  sx: {
                    mt: 0.5,
                    borderRadius: "10px",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                    border: "1px solid #E5E7EB",
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
                        "&.Mui-checked": { color: C.blue },
                        "& svg": { fontSize: 18 },
                      }}
                    />
                    <Typography sx={{ fontSize: 13.5, color: "#1F2937" }}>
                      {opt}
                    </Typography>
                  </Box>
                );
              })}
            </Popover>
          </Box>
        </Box>

        {/* MESSAGE BOX */}
        <Box
          sx={{
            borderRadius: "10px",
            border: `1px solid ${C.border}`,
            backgroundColor: "#F8F9FB",
            px: 2,
            pt: 1.5,
            pb: 1,
            mb: 3,
            minHeight: { xs: 150, sm: 190 },
          }}
        >
          <Typography
            sx={{ fontSize: 13, fontWeight: 600, color: "#374151", mb: 1 }}
          >
            Enter patient alert message
          </Typography>
          <TextField
            fullWidth
            multiline
            minRows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            variant="standard"
            slotProps={{ input: { disableUnderline: true } }}
            sx={{
              "& .MuiInputBase-root": {
                p: 0,
                fontSize: 13.5,
                color: "#273142",
                alignItems: "flex-start",
              },
              "& textarea": {
                p: 0,
                fontSize: 13.5,
                color: "#273142",
                lineHeight: 1.55,
              },
            }}
          />
        </Box>

        {/* FOOTER BUTTONS */}
        <Stack direction="row" justifyContent="flex-end" spacing={1.2}>
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              textTransform: "none",
              borderRadius: "8px",
              fontSize: 14,
              fontWeight: 500,
              color: "#374151",
              borderColor: "#D1D5DB",
              px: 2.5,
              py: 0.75,
              "&:hover": { borderColor: "#9CA3AF", bgcolor: "#F9FAFB" },
            }}
          >
            Cancel
          </Button>
          <PrimaryBtn
            onClick={onClose}
            sx={{ fontSize: 14, px: 2.5, py: 0.75 }}
          >
            Save Alert
          </PrimaryBtn>
        </Stack>
      </Box>
    </Dialog>
  );
}

/* =========================================================
   MAIN PAGE
   ========================================================= */
/* Finds the element that really scrolls (window, or a parent with overflow). */
const getScrollParent = (el) => {
  let node = el && el.parentElement;
  while (node && node !== document.body && node !== document.documentElement) {
    if (/(auto|scroll|overlay)/.test(window.getComputedStyle(node).overflowY)) {
      return node;
    }
    node = node.parentElement;
  }
  return window;
};

export default function NewEncounter() {
  const navigate = useNavigate();
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [activeId, setActiveId] = React.useState(STEPS[0].id);

  const sectionRefs = React.useRef({});
  const rootRef = React.useRef(null);
  const headerRef = React.useRef(null);
  const mainRef = React.useRef(null);
  const scrollLockRef = React.useRef(false);
  const lockTimerRef = React.useRef(null);

  const setRef = (id) => (node) => {
    sectionRefs.current[id] = node;
  };

  /* Publish the real sticky-header height as --header-h (0 when not sticky) so
     SectionCard's scroll-margin-top is always correct at every breakpoint. */
  React.useEffect(() => {
    const header = headerRef.current;
    const root = rootRef.current;
    if (!header || !root) return undefined;

    const update = () => {
      const sticky = window.getComputedStyle(header).position === "sticky";
      root.style.setProperty(
        "--header-h",
        sticky ? `${header.getBoundingClientRect().height}px` : "0px",
      );
    };
    update();

    const ro =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(update) : null;
    if (ro) ro.observe(header);
    window.addEventListener("resize", update);
    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  /* Scroll-spy: the stepper always highlights the section you are looking at.
     It is based ONLY on where the sections are on screen right now (their
     getBoundingClientRect vs. the bottom edge of the sticky header), so it does
     not matter what actually scrolls (window, body, or a parent container). */
  React.useEffect(() => {
    let raf = 0;
    const ids = STEPS.map((x) => x.id);

    const computeActive = () => {
      raf = 0;
      if (scrollLockRef.current) return; // a step-click scroll is running

      const root = rootRef.current;
      const header = headerRef.current;
      const main = mainRef.current;
      if (!root || !header || !main) return;

      const scroller = getScrollParent(root);
      const isWindow = scroller === window;
      const sRect = isWindow ? null : scroller.getBoundingClientRect();

      // Reference line = bottom edge of the (stuck) header.
      const sticky = window.getComputedStyle(header).position === "sticky";
      const refLine = sticky
        ? header.getBoundingClientRect().bottom
        : isWindow
          ? 0
          : sRect.top;
      const threshold = refLine + 24;

      // Active = the last section whose top has reached the reference line.
      let currentId = ids[0];
      for (const id of ids) {
        const node = sectionRefs.current[id];
        if (node && node.getBoundingClientRect().top <= threshold) {
          currentId = id;
        }
      }

      // The last sections are short, so their top can never reach the line.
      // When the end of the page is on screen (and we did scroll), pick the last.
      const first = sectionRefs.current[ids[0]];
      const firstTop = first ? first.getBoundingClientRect().top : Infinity;
      const viewBottom = isWindow
        ? window.innerHeight
        : Math.min(window.innerHeight, sRect.bottom);
      const mainBottom = main.getBoundingClientRect().bottom;
      if (firstTop < refLine && mainBottom <= viewBottom + 4) {
        currentId = ids[ids.length - 1];
      }

      setActiveId((prev) => (prev === currentId ? prev : currentId));
    };

    const onScroll = () => {
      // While a click-scroll is animating, wait until scrolling goes idle.
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

    // capture:true => catches scroll of window AND of any scrolling parent
    window.addEventListener("scroll", onScroll, {
      passive: true,
      capture: true,
    });
    window.addEventListener("wheel", onScroll, { passive: true });
    window.addEventListener("touchmove", onScroll, { passive: true });
    window.addEventListener("keydown", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    computeActive();
    const first300 = window.setTimeout(computeActive, 300); // after first layout
    // Safety net: even if some scroll event is never delivered, stay in sync.
    const poll = window.setInterval(() => {
      if (!scrollLockRef.current) computeActive();
    }, 250);

    return () => {
      window.removeEventListener("scroll", onScroll, { capture: true });
      window.removeEventListener("wheel", onScroll);
      window.removeEventListener("touchmove", onScroll);
      window.removeEventListener("keydown", onScroll);
      window.removeEventListener("resize", onScroll);
      window.clearTimeout(first300);
      window.clearInterval(poll);
      window.clearTimeout(lockTimerRef.current);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  /* Scrolls so the section HEADING sits right under the sticky header
     (same result for steps 1-5, works for window or a scrolling parent). */
  const scrollToSection = (id) => {
    const node = sectionRefs.current[id];
    if (!node) return;
    const header = headerRef.current;
    const sticky =
      header && window.getComputedStyle(header).position === "sticky";
    const headerH = sticky ? header.getBoundingClientRect().height : 0;
    const gap = 12;

    const scroller = getScrollParent(node);
    const nodeTop = node.getBoundingClientRect().top;

    if (scroller === window) {
      window.scrollTo({
        top: Math.max(0, nodeTop + window.scrollY - headerH - gap),
        behavior: "smooth",
      });
    } else {
      const top =
        nodeTop -
        scroller.getBoundingClientRect().top +
        scroller.scrollTop -
        headerH -
        gap;
      scroller.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    }
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
    <Box
      ref={rootRef}
      sx={{
        bgcolor: C.pageBg,
        minHeight: "100dvh",
        width: "100%",
        boxSizing: "border-box",
        containerType: "inline-size",
        overflowX: "clip",
        /* NOTE: no overflow / fixed height here - the page itself scrolls so
           the sticky header and footer keep working. */
      }}
    >
      {/* Sticky header (static on phones) */}
      <Box
        ref={headerRef}
        sx={{
          position: "static",
          ...cq("sm", { position: "sticky" }),
          "@media (max-height: 600px)": { position: "static" },
          top: 0,
          zIndex: 30,
          bgcolor: C.pageBg,
          borderBottom: `1px solid ${C.borderLight}`,
        }}
      >
        <Box sx={{ ...CONTAINER, pt: { xs: 1.5, md: 2 }, pb: 0 }}>
          <TopBar />
          <StepperNav
            activeId={activeId}
            onStepClick={handleStepClick}
            onAlertsClick={() => setAlertOpen(true)}
          />
        </Box>
      </Box>

      {/* Main (Figma): flex column, padding 24px 28px 60px, gap 12px */}
      <Box
        component="main"
        ref={mainRef}
        sx={{
          ...CONTAINER,
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          gap: "12px",
          pt: "24px",
          pb: "60px",
        }}
      >
        <EncounterSummary />
        <AssistBanner />

        <PatientSection sectionRef={setRef("patient")} />
        <CaseInsuranceSection sectionRef={setRef("case")} />
        <ConditionsSection sectionRef={setRef("conditions")} />
        <ChargesSection sectionRef={setRef("charges")} />
        <AdditionalDetailsSection sectionRef={setRef("additional")} />

        <FooterBar navigate={navigate} />
      </Box>

      <PatientAlertDialog
        open={alertOpen}
        onClose={() => setAlertOpen(false)}
      />
    </Box>
  );
}
