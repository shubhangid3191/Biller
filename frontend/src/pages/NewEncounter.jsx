import * as React from "react";
import {
  Box,
  Paper,
  Stack,
  Grid,
  Typography,
  TextField,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Button,
  IconButton,
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

import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import {
  AlertBellIcon,
  SaveDraftFileIcon,
  PlusBlueIcon,
  BlueCalendarIcon,
  TiaChatIcon,
  StarIcon,
} from "../assets/Assets.jsx";

/* =========================================================
   DESIGN TOKENS
   ========================================================= */
const C = {
  pageBg: "#ECEEF4",
  textDark:   "#0D1B2A",
  textLabel:  "#5C5878",
  textMuted:  "#8294A6",
  textBody:   "#443F63",
  textBold:   "#2B2842",
  blue:       "#006FFD",
  blueHover:  "#0056D6",
  purple:     "#5443C4",
  purpleBg:   "#F0EFFE",
  tealCard:   "#12795B",
  tealCardBg: "#EBF7F3",
  orange:     "#B0552A",
  orangeBg:   "#FEF4ED",
  amber:      "#8E641A",
  amberBg:    "#FBF5E3",
  teal5:      "#1A808E",
  teal5Bg:    "#EAF6F7",
  border:     "#E0E4EE",
  borderLight:"#EAECF4",
  inputBg:    "#FFFFFF",
  inputGreenBg: "#EEF2FF",
  inputGreenBorder: "#C7D2FE",
  inputHighlight: "#FEF3E8",
  inputHighlightBorder: "#F0C998",
  greenChipBg:     "#E8F8F0",
  greenChipBorder: "#A8DFCA",
  greenChipText:   "#1A9E6E",
  amberChipBg:   "#FEF3C7",
  amberChipText: "#92400E",
  amberChipBorder: "#FDE68A",
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
  { id: "patient",    label: "Patient" },
  { id: "case",       label: "Case & Insurance" },
  { id: "conditions", label: "Conditions & Auth" },
  { id: "charges",    label: "Charges & Review" },
  { id: "additional", label: "Additional Details" },
];

/* =========================================================
   SHARED INPUT STYLES
   ========================================================= */
const inputBase = (bgColor = C.inputBg, borderColor = C.border, focusColor = "#6366F1") => ({
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
  "& .MuiSelect-select": { py: "7px", px: "12px", fontSize: 13.5, color: C.textDark },
});

const inputNormal  = () => inputBase();
const inputGreen   = () => inputBase(C.inputGreenBg, C.inputGreenBorder, "#6366F1");
const inputOrange  = () => inputBase(C.inputHighlight, C.inputHighlightBorder, C.orange);

/* =========================================================
   FORM FIELD
   ========================================================= */
const labelSx = {
  fontSize: 12,
  fontWeight: 600,
  color: C.textLabel,
  mb: 0.4,
  lineHeight: 1.4,
  display: "block",
};

function FormField({ label, value, select, options = [], placeholder, highlightedGreen, highlighted, icon, required, md }) {
  const sx = highlightedGreen ? inputGreen() : highlighted ? inputOrange() : inputNormal();

  /* ── Date picker variant (icon: true) ── */
  if (icon) {
    const parsed = value && dayjs(value, "MM/DD/YYYY").isValid()
      ? dayjs(value, "MM/DD/YYYY")
      : null;

    return (
      <Box sx={{ width: "100%", minWidth: 0 }}>
        <Typography component="label" sx={labelSx}>{label}</Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            defaultValue={parsed}
            format="MM/DD/YYYY"
            slots={{ openPickerIcon: () => <BlueCalendarIcon width={16} height={17} /> }}
            slotProps={{
              textField: {
                fullWidth: true,
                size: "small",
                sx: {
                  "& .MuiOutlinedInput-root": sx,
                },
              },
              openPickerButton: {
                sx: { p: 0.5, mr: 0.2 },
              },
            }}
          />
        </LocalizationProvider>
      </Box>
    );
  }

  /* ── Regular field ── */
  return (
    <Box sx={{ width: "100%", minWidth: 0 }}>
      <Typography component="label" sx={labelSx}>
        {label}{required && <Box component="span" sx={{ color: "red", ml: 0.3 }}>*</Box>}
      </Typography>
      <TextField
        fullWidth
        size="small"
        select={!!select}
        defaultValue={value}
        placeholder={placeholder}
        SelectProps={select ? { IconComponent: ArrowDropDownIcon } : undefined}
        slotProps={{ input: { sx } }}
      >
        {select && options.map((o) => (
          <MenuItem key={o} value={o} sx={{ fontSize: 13.5 }}>{o}</MenuItem>
        ))}
      </TextField>
    </Box>
  );
}

function FieldRow({ fields }) {
  return (
    <Grid container spacing={{ xs: 1.5, md: 2 }}>
      {fields.map((f, i) => (
        <Grid item xs={12} sm={6} md={f.md || 3} key={i}>
          <FormField {...f} />
        </Grid>
      ))}
    </Grid>
  );
}

/* =========================================================
   SECTION CARD SHELL
   ========================================================= */
function SectionCard({ id, sectionRef, number, title, accentColor, accentBg, rightSlot, children }) {
  return (
    <Paper
      id={id} ref={sectionRef} elevation={0}
      sx={{
        border: `1px solid ${C.borderLight}`,
        borderRadius: "12px",
        overflow: "hidden",
        bgcolor: "#fff",
        scrollMarginTop: "160px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
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
        <Typography sx={{
          fontSize: 11.5,
          fontWeight: 700,
          letterSpacing: "0.06em",
          color: accentColor,
          textTransform: "uppercase",
          lineHeight: 1,
        }}>
          {number} - {title}
        </Typography>
        {rightSlot}
      </Box>

      <Box sx={{ px: { xs: 2, md: 3 }, py: { xs: 2, md: 2.5 } }}>
        <Stack spacing={2}>{children}</Stack>
      </Box>
    </Paper>
  );
}

/* =========================================================
   OUTLINED BUTTON (shared style)
   ========================================================= */
function OutlineBtn({ children, startIcon, onClick, sx: sxExtra = {} }) {
  return (
    <Button
      variant="outlined" disableElevation onClick={onClick}
      startIcon={startIcon}
      sx={{
        textTransform: "none",
        borderRadius: "8px",
        fontSize: 13,
        fontWeight: 500,
        color: C.textDark,
        borderColor: C.border,
        bgcolor: "#fff",
        px: 2, py: 0.55,
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

/* =========================================================
   TOP BAR
   ========================================================= */
function TopBar() {
  return (
    <Box sx={{
      display: "flex",
      alignItems: { xs: "flex-start", sm: "center" },
      justifyContent: "space-between",
      flexDirection: { xs: "column", sm: "row" },
      gap: 1.5, pb: 1.5,
    }}>
      <Box>
        <Typography sx={{
          fontSize: 10, fontWeight: 700, letterSpacing: "0.1em",
          color: C.textMuted, textTransform: "uppercase", mb: 0.25,
        }}>
          Charge Capture
        </Typography>
        <Typography sx={{
          fontSize: { xs: 22, sm: 26 }, fontWeight: 800,
          color: C.textDark, letterSpacing: "-0.5px", lineHeight: 1.1,
        }}>
          Claim ID #29068396
        </Typography>
      </Box>

      <Stack direction="row" spacing={0.8} flexWrap="wrap" useFlexGap alignItems="center">
        <OutlineBtn>Cancel</OutlineBtn>
        <OutlineBtn startIcon={<SaveDraftFileIcon />}>
          Save draft
        </OutlineBtn>
        <Button
          variant="contained" disableElevation
          sx={{
            textTransform: "none", borderRadius: "8px",
            fontSize: 13.5, fontWeight: 600,
            bgcolor: C.blue, px: 2, py: 0.65,
            gap: 0.7, whiteSpace: "nowrap",
            "&:hover": { bgcolor: C.blueHover },
          }}
        >
          <TiaChatIcon color="#fff" width={25} height={25} />
          Scrub &amp; approve
        </Button>
      </Stack>
    </Box>
  );
}

/* =========================================================
   STEPPER NAV
   - Active chip highlight now transitions smoothly (color /
     background-color / border-color) as the active step
     changes on scroll up or down, instead of snapping.
   - Separator between chips is now a literal two-dash glyph
     ("--") instead of a dashed border line.
   ========================================================= */
function StepperNav({ activeId, onStepClick }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1, pb: 1.5 }}>
      <Box sx={{ display: "flex", alignItems: "center", overflowX: "auto", flexGrow: 1, minWidth: 0, ...scrollHide }}>
        {STEPS.map((step, index) => {
          const isActive = step.id === activeId;
          return (
            <React.Fragment key={step.id}>
              <Box
                onClick={() => onStepClick(step.id)}
                sx={{
                  display: "flex", alignItems: "center", gap: 0.75,
                  cursor: "pointer", flexShrink: 0,
                  px: isActive ? 1.3 : 0.5, py: 0.55,
                  borderRadius: "999px",
                  bgcolor: isActive ? "#1A1D23" : "transparent",
                  transition: "background-color 0.35s ease, padding 0.35s ease",
                  "&:hover": { bgcolor: isActive ? "#1A1D23" : "rgba(0,0,0,0.04)" },
                }}
              >
                <Box sx={{
                  width: 22, height: 22, borderRadius: "50%",
                  bgcolor: isActive ? "#006FFD" : "transparent",
                  border: isActive ? "1.5px solid #006FFD" : "1.5px solid #C8CDD8",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, fontWeight: isActive ? 800 : 600,
                  color: isActive ? "#fff" : C.textMuted,
                  flexShrink: 0,
                  transition: "background-color 0.35s ease, border-color 0.35s ease, color 0.35s ease",
                }}>
                  {index + 1}
                </Box>
                <Typography sx={{
                  fontSize: 13.5, fontWeight: isActive ? 700 : 500,
                  color: isActive ? "#fff" : "#6B7280",
                  whiteSpace: "nowrap",
                  display: { xs: isActive ? "block" : "none", sm: "block" },
                  transition: "color 0.35s ease",
                }}>
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
        <OutlineBtn startIcon={<AlertBellIcon />}>
          Alerts
        </OutlineBtn>
        <OutlineBtn startIcon={<PlusBlueIcon />}>
          Add task
        </OutlineBtn>
      </Stack>
    </Box>
  );
}

/* =========================================================
   ENCOUNTER SUMMARY STRIP
   ========================================================= */
function EncounterSummary() {
  const Item = ({ label, value }) => (
    <Box>
      <Typography sx={{ fontSize: 9.5, fontWeight: 700, letterSpacing: "0.1em", color: C.textMuted, textTransform: "uppercase", mb: 0.25 }}>
        {label}
      </Typography>
      <Typography sx={{ fontSize: 13.5, fontWeight: 500, color: C.textDark, lineHeight: 1.3 }}>
        {value}
      </Typography>
    </Box>
  );

  return (
    <Paper elevation={0} sx={{
      border: `1px solid ${C.borderLight}`, borderRadius: "12px", bgcolor: "#fff",
      px: { xs: 2, md: 3 }, py: 1.5,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      flexWrap: "wrap", gap: 2,
    }}>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 1.5, sm: 4 }}>
        <Item label="Encounter" value="NEW - Draft" />
        <Item label="Patient"   value="Wayne, Jimmy" />
        <Item label="Details"   value="06/15/1978 - M - MRN 326362969" />
      </Stack>
      <Chip label="Unbilled" sx={{
        bgcolor: C.amberChipBg, color: C.amberChipText,
        fontWeight: 600, fontSize: 12, borderRadius: "6px", height: 24,
        border: `1px solid ${C.amberChipBorder}`,
        "& .MuiChip-label": { px: 1.2 },
      }} />
    </Paper>
  );
}

/* =========================================================
   ENCOUNTER ASSIST BANNER
   ========================================================= */
function AssistBanner() {
  return (
    <Paper elevation={0} sx={{
      border: "1px solid #D8D4F5", borderRadius: "10px", bgcolor: "#EDECFB",
      px: { xs: 2, md: 2.5 }, py: 1.5,
      display: "flex", gap: 0.8, alignItems: "flex-start",
    }}>
      <Box>
        <Typography sx={{
          fontSize: 11, fontWeight: 700, letterSpacing: "0.08em",
          color: C.purple, textTransform: "uppercase", mb: 0.4,
          fontFamily: "Figtree, sans-serif",
        }}>
          Encounter Assist
        </Typography>
        <Typography sx={{ fontSize: 14, color: C.textBody, lineHeight: 1.65, fontFamily: "Figtree, sans-serif" }}>
          Pre-filled from the 08/15 appointment and EHR note. I matched the patient, pulled the active{" "}
          <Box component="span" sx={{ fontWeight: 700, color: C.textBold }}>Aetna POS</Box>{" "}
          case, and suggested CPT{" "}
          <Box component="span" sx={{ fontWeight: 700, color: C.textBold }}>99213</Box>{" "}
          with dx{" "}
          <Box component="span" sx={{ fontWeight: 700, color: C.textBold }}>A/B</Box>.{" "}
          <Box component="span" sx={{ fontWeight: 700, color: C.textBold }}>
            Eligibility isn&apos;t verified yet
          </Box>{" "}
          - one click below runs it. Nothing here opens a new window.
        </Typography>
      </Box>
    </Paper>
  );
}

/* =========================================================
   CARD 1 - PATIENT
   ========================================================= */
function PatientSection({ sectionRef }) {
  return (
    <SectionCard
      id="patient" sectionRef={sectionRef}
      number={1} title="Patient"
      accentColor={C.purple} accentBg={C.purpleBg}
      rightSlot={
        <Stack direction="row" spacing={1}>
          <OutlineBtn>Select existing</OutlineBtn>
          <Button variant="contained" disableElevation sx={{
            textTransform: "none", borderRadius: "8px",
            fontSize: 13, fontWeight: 600, bgcolor: C.blue,
            px: 2, py: 0.55, "&:hover": { bgcolor: C.blueHover },
          }}>
            + New patient
          </Button>
        </Stack>
      }
    >
      <FieldRow fields={[
        { label: "Legal Name",    value: "Wayne, Jimmy" },
        { label: "Date of Birth", value: "06/15/1978" },
        { label: "Gender",        value: "Male" },
        { label: "MRN",           value: "326362969" },
      ]} />

      <FieldRow fields={[
        { label: "SSN",          value: "000-00-5433",                          md: 3 },
        { label: "Mobile Phone", value: "(313) 404-6928",                       md: 3 },
        { label: "Address",      value: "Capitol Way S, Washingtone, AR 12344", md: 6 },
      ]} />

      <FieldRow fields={[
        { label: "Marital Status",     value: "NA" },
        { label: "Employment Status",  value: "NA" },
        { label: "Referral Source",    value: "Not Specified" },
        { label: "Employer",           value: "NA" },
      ]} />

      <FieldRow fields={[
        { label: "Primary Care Physician",   value: "NA" },
        { label: "Referring Physician",      value: "NA" },
        { label: "Default Rendering Provider", value: "Kumar V2, Jayram" },
        { label: "Default Service Location", value: "The University RL", highlightedGreen: true },
      ]} />
    </SectionCard>
  );
}

/* =========================================================
   CARD 2 - CASE & INSURANCE
   ========================================================= */
function CaseInsuranceSection({ sectionRef }) {
  const policyRows = [
    { checked: true,  type: "PRIMARY",   insurance: "Aetna", plan: "Aetna-Plan name", policy: "298692786", group: "298692786" },
    { checked: false, type: "SECONDARY", insurance: "Aetna", plan: "Aetna-Plan name", policy: "298692786", group: "298692786" },
  ];

  const cellSx = {
    borderBottom: "1px solid #E8F3EF",
    py: 1,
    px: 1.5,
    verticalAlign: "middle",
  };

  const headCellSx = {
    ...cellSx,
    bgcolor: "#EBF7F3",
    fontSize: 10.5,
    fontWeight: 700,
    color: "#12795B",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    whiteSpace: "nowrap",
    py: 1.1,
  };

  const tblInputSx = {
    borderRadius: "8px",
    fontSize: 13,
    bgcolor: "#fff",
    color: "#2B2842",
    "& .MuiOutlinedInput-notchedOutline": { borderColor: "#DDE3EE" },
    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#B0BACA" },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#12795B",
      borderWidth: "1.5px",
    },
    "& input": { py: "5.5px", px: "10px", fontSize: 13, color: "#2B2842" },
    "& .MuiSelect-select": { py: "5.5px", px: "10px", fontSize: 13, color: "#2B2842" },
  };

  const checkboxItems = [
    { label: "Active",                          checked: true  },
    { label: "Send patient statement",           checked: true  },
    { label: "Do not send claim electronically", checked: false },
  ];

  return (
    <SectionCard
      id="case"
      sectionRef={sectionRef}
      number={2}
      title="Case & Insurance"
      accentColor="#12795B"
      accentBg="#EBF7F3"
      rightSlot={
        <Stack direction="row" spacing={1}>
          <OutlineBtn>Select case</OutlineBtn>
          <Button
            variant="contained"
            disableElevation
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
            }}
          >
            + New case
          </Button>
        </Stack>
      }
    >
      <FieldRow
        fields={[
          { label: "Case Name",      value: "Aetna test", md: 4 },
          { label: "Description",    value: "Aetna test", md: 4 },
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
        {checkboxItems.map((c) => {
          const [checked, setChecked] = React.useState(c.checked);
          return (
            <FormControlLabel
              key={c.label}
              sx={{ mr: 2.5, ml: 0 }}
              control={
                <Checkbox
                  checked={checked}
                  onChange={(e) => setChecked(e.target.checked)}
                  size="small"
                  sx={{
                    p: 0.5,
                    color: "#5C5878",
                    "&.Mui-checked": { color: "#6C5AE0" },
                  }}
                />
              }
              label={
                <Typography
                  sx={{
                    fontSize: 13.5,
                    fontWeight: 500,
                    color: checked ? "#5443C4" : "#5C5878",
                  }}
                >
                  {c.label}
                </Typography>
              }
            />
          );
        })}
      </Stack>

      <Box>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 1 }}
        >
          <Typography
            sx={{ fontSize: 12.5, fontWeight: 700, color: "#12795B" }}
          >
            Insurance policies
          </Typography>
          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 600,
              color: C.blue,
              cursor: "pointer",
              "&:hover": { textDecoration: "underline" },
            }}
          >
          </Typography>
        </Stack>

        <TableContainer
          sx={{
            border: "1px solid #D6EDE6",
            borderRadius: "10px",
            overflowX: "auto",
            ...scrollHide,
          }}
        >
          <Table size="small" sx={{ minWidth: 680 }}>
            <TableHead>
              <TableRow>
                {["", "TYPE", "INSURANCE", "PLAN", "POLICY #", "GROUP #", "ACTIVE", "ACTIONS"].map(
                  (col, ci) => (
                    <TableCell key={ci} sx={headCellSx}>
                      {col}
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>

            <TableBody>
              {policyRows.map((row, i) => (
                <TableRow
                  key={i}
                  sx={{ bgcolor: "#fff", "&:last-child td": { borderBottom: 0 } }}
                >
                  <TableCell sx={{ ...cellSx, width: 44 }}>
                    <Checkbox
                      size="small"
                      defaultChecked={row.checked}
                      sx={{
                        p: 0.4,
                        color: "#C8D0DC",
                        "&.Mui-checked": { color: "#12795B" },
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
                      InputProps={{ sx: tblInputSx }}
                    >
                      <MenuItem value="PRIMARY"   sx={{ fontSize: 13 }}>PRIMARY</MenuItem>
                      <MenuItem value="SECONDARY" sx={{ fontSize: 13 }}>SECONDARY</MenuItem>
                    </TextField>
                  </TableCell>

                  <TableCell sx={{ ...cellSx, minWidth: 88 }}>
                    <TextField
                      size="small"
                      defaultValue={row.insurance}
                      InputProps={{ sx: tblInputSx }}
                    />
                  </TableCell>

                  <TableCell sx={{ ...cellSx, minWidth: 130 }}>
                    <TextField
                      size="small"
                      defaultValue={row.plan}
                      InputProps={{ sx: tblInputSx }}
                    />
                  </TableCell>

                  <TableCell sx={{ ...cellSx, minWidth: 108 }}>
                    <TextField
                      size="small"
                      defaultValue={row.policy}
                      InputProps={{ sx: tblInputSx }}
                    />
                  </TableCell>

                  <TableCell sx={{ ...cellSx, minWidth: 108 }}>
                    <TextField
                      size="small"
                      defaultValue={row.group}
                      InputProps={{ sx: tblInputSx }}
                    />
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
                          color: "#12795B",
                          "&.Mui-checked": { color: "#12795B" },
                          "& svg": { fontSize: 15 },
                        }}
                      />
                      <Typography
                        sx={{ fontSize: 12.5, fontWeight: 600, color: "#12795B" }}
                      >
                        Active
                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell sx={{ ...cellSx, width: 48 }}>
                    <IconButton size="small">
                      <EditOutlinedIcon sx={{ fontSize: 16, color: C.blue }} />
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
          sx={{ fontSize: 12.5, fontWeight: 700, color: "#12795B", mb: 1.2 }}
        >
          Additional details
        </Typography>
        <FieldRow
          fields={[
            { label: "Copay",                   value: "0.00" },
            { label: "Deductible",              value: "0.00" },
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
        direction={{ xs: "column", sm: "row" }}
        alignItems={{ xs: "flex-start", sm: "center" }}
        justifyContent="space-between"
        flexWrap="wrap"
        rowGap={1}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1.5}
          alignItems={{ xs: "flex-start", sm: "center" }}
        >
          <Button
            variant="contained"
            disableElevation
            sx={{
              textTransform: "none",
              borderRadius: "8px",
              fontSize: 12.5,
              fontWeight: 600,
              color: "#fff",
              bgcolor: "#006FFD",
              px: 2.5,
              py: 0.75,
              whiteSpace: "nowrap",
              "&:hover": { bgcolor: "#0056D6" },
            }}
          >
            Check eligibility (270/271)
          </Button>
          <Typography sx={{ fontSize: 13, color: "#8B87A3" }}>
            Runs inline - no separate window.
          </Typography>
        </Stack>
      </Stack>
    </SectionCard>
  );
}

/* =========================================================
   CARD 3 - CONDITIONS & AUTHORISATION
   ========================================================= */
function ConditionsSection({ sectionRef }) {
  const cellSx = {
    borderBottom: "1px solid #F0EDE8", py: 1.1, px: 1.5,
    verticalAlign: "middle", fontSize: 13, color: C.textDark, whiteSpace: "nowrap",
  };
  const headCellSx = {
    ...cellSx,
    bgcolor: "#FEF4ED", fontSize: 11, fontWeight: 700,
    color: "#C2662A", textTransform: "uppercase", letterSpacing: "0.05em",
  };
  const tblInputSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "7px", fontSize: 13, bgcolor: "#fff",
      "& fieldset": { borderColor: "#E0E4EE" },
      "&:hover fieldset": { borderColor: "#B8BFCF" },
      "&.Mui-focused fieldset": { borderColor: C.orange, borderWidth: "1.5px" },
      "& input": { py: "5.5px", px: "10px", fontSize: 13 },
    },
  };

  const ActiveBadge = ({ k }) => (
    <Box key={k} sx={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      bgcolor: C.greenChipBg, border: `1px solid ${C.greenChipBorder}`,
      borderRadius: "6px", px: 1.2, py: 0.25, minWidth: 58,
    }}>
      <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: C.greenChipText }}>Active</Typography>
    </Box>
  );

  const buildTable = (cols, rows) => (
    <TableContainer sx={{ border: "1px solid #EDE8E2", borderRadius: "10px", overflowX: "auto", ...scrollHide }}>
      <Table size="small" sx={{ minWidth: 700 }}>
        <TableHead>
          <TableRow>
            {cols.map((c, ci) => <TableCell key={ci} sx={headCellSx}>{c}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, ri) => (
            <TableRow key={ri} sx={{ bgcolor: "#fff", "&:last-child td": { borderBottom: 0 } }}>
              {row.map((cell, ci) => (
                <TableCell key={ci} sx={cellSx}>
                  {typeof cell === "string"
                    ? <TextField size="small" defaultValue={cell} sx={tblInputSx} />
                    : cell
                  }
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const authCols = ["Authorization #", "# Visits", "# Used", "Start", "End", "Status +", "Provider Name", "Contact", "Notes"];
  const authRows = [
    ["AUTH-88210", "6", "0", "08/01/2026", "10/31/2026", <ActiveBadge key="a1" />, "Lorem Ipsum", "XXXXXXXXXX", "Neuro follow-up"],
    ["AUTH-88210", "6", "0", "08/01/2026", "10/31/2026", <ActiveBadge key="a2" />, "Lorem Ipsum", "XXXXXXXXXX", "Neuro follow-up"],
  ];
  const refCols = ["Referrer #", "# Visits", "# Used", "Start", "End", "Status +", "Name", "Contact", "Notes"];
  const refRows = [
    ["AUTH-88210", "6", "0", "08/01/2026", "10/31/2026", <ActiveBadge key="r1" />, "Lorem Ipsum", "XXXXXXXXXX", "Neuro follow-up"],
    ["AUTH-88210", "6", "0", "08/01/2026", "10/31/2026", <ActiveBadge key="r2" />, "Lorem Ipsum", "XXXXXXXXXX", "Neuro follow-up"],
  ];

  const cRow1 = ["Auto accident", "Employment", "Pregnancy", "Abuse", "Homebound"];
  const cRow2 = ["Other", "EPSDT", "Family planning", "Emergency", "Worker's Compensation"];

  const condChk = (lbl) => (
    <FormControlLabel key={lbl} sx={{ mr: 3, ml: 0, mb: 0 }}
      control={<Checkbox size="small" sx={{ p: 0.5, color: "#D0D5E0", "&.Mui-checked": { color: C.orange }, "& svg": { fontSize: 17 } }} />}
      label={<Typography sx={{ fontSize: 13.5, color: C.textDark }}>{lbl}</Typography>}
    />
  );

  return (
    <SectionCard
      id="conditions" sectionRef={sectionRef}
      number={3} title="Conditions & Authorisation / Referrals"
      accentColor={C.orange} accentBg={C.orangeBg}
    >
      <Box>
        <Typography sx={{ fontSize: 12, fontWeight: 600, color: C.textLabel, mb: 1 }}>
          Condition related to
        </Typography>
        <Stack direction="row" flexWrap="wrap" rowGap={0.25}>{cRow1.map(condChk)}</Stack>
        <Stack direction="row" flexWrap="wrap" rowGap={0.25} sx={{ mt: 0.3 }}>{cRow2.map(condChk)}</Stack>
      </Box>

      <Grid container spacing={{ xs: 1.5, md: 2 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Typography component="label" sx={labelSx}>Condition Date Type</Typography>
          <TextField fullWidth size="small" select defaultValue="None"
            SelectProps={{ IconComponent: ArrowDropDownIcon }}
            InputProps={{ sx: { ...inputOrange(), borderRadius: "8px" } }}
          >
            {["None", "Initial", "Last seen", "Acute manifestation"].map((o) => (
              <MenuItem key={o} value={o} sx={{ fontSize: 13.5 }}>{o}</MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={3} md={4}>
          <Typography component="label" sx={labelSx}>Start Date</Typography>
          <TextField fullWidth size="small" defaultValue="NA" InputProps={{ sx: inputNormal() }} />
        </Grid>
        <Grid item xs={12} sm={3} md={4}>
          <Typography component="label" sx={labelSx}>End Date</Typography>
          <TextField fullWidth size="small" defaultValue="NA" InputProps={{ sx: inputNormal() }} />
        </Grid>
      </Grid>

      <Box>
        <Typography sx={{ fontSize: 13.5, fontWeight: 700, color: C.orange, mb: 1 }}>Authorizations</Typography>
        {buildTable(authCols, authRows)}
      </Box>

      <Box>
        <Typography sx={{ fontSize: 13.5, fontWeight: 700, color: C.orange, mb: 1 }}>Referrals</Typography>
        {buildTable(refCols, refRows)}
      </Box>
    </SectionCard>
  );
}

/* =========================================================
   CARD 4 - ENCOUNTER DETAILS & CHARGES
   ========================================================= */
function ChargesSection({ sectionRef }) {
  const procColumns = [
    "DOS FROM", "DOS TO", "POS", "PROCEDURES",
    "MOD 1", "MAP", "DAYS/UNIT", "UNIT CHARGE",
    "TOTAL", "COPAY", "UC", "UM", "MOD 3",
  ];

  const procRows = [[
    "05/27/2026", "05/27/2026", "GCH-IP", "36389.IH",
    "99214", "ABCDE", "1", "$100", "$100", "$10", "1", "5 ML", "0.00",
  ]];

  return (
    <SectionCard
      id="charges"
      sectionRef={sectionRef}
      number={4}
      title="Encounter Details & Charges"
      accentColor={C.amber}
      accentBg={C.amberBg}
    >
      <FieldRow fields={[
        { label: "From Date",    value: "08/15/2026" },
        { label: "Through Date", value: "08/15/2026" },
        { label: "Post Date",    value: "08/28/2026" },
        { label: "Batch #",      value: "--" },
      ]} />

      <FieldRow fields={[
        { label: "Scheduling Provider",  value: "Kumar V2, Jayram" },
        { label: "Rendering Provider",   value: "Kumar V2, Jayram" },
        { label: "Supervising Provider", value: "NA" },
        { label: "Location",             value: "The University RL", highlightedGreen: true },
      ]} />

      <Grid container spacing={{ xs: 1.5, md: 2 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Typography component="label" sx={labelSx}>Place of Service</Typography>
          <TextField fullWidth size="small" defaultValue="11 - Office"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                backgroundColor: "#FBF5E3",
                fontSize: 13.5,
                "& input": { py: "7px", px: "12px", fontSize: 13.5, color: "#2B2842" },
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "#FBE6B4" },
                "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#E8C96A" },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#FBE6B4", borderWidth: "1.5px" },
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography component="label" sx={labelSx}>Encounter Mode</Typography>
          <TextField fullWidth size="small" defaultValue="In Office"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                backgroundColor: "#FBF5E3",
                fontSize: 13.5,
                "& input": { py: "7px", px: "12px", fontSize: 13.5, color: "#2B2842" },
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "#FBE6B4" },
                "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#E8C96A" },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#FBE6B4", borderWidth: "1.5px" },
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography component="label" sx={labelSx}>Copay Due</Typography>
          <TextField fullWidth size="small" defaultValue="0.00"
            InputProps={{ sx: inputNormal() }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography component="label" sx={labelSx}>Payment Amount</Typography>
          <TextField fullWidth size="small" defaultValue="0.00"
            InputProps={{ sx: inputNormal() }}
          />
        </Grid>
      </Grid>

      <Box>
        <Typography sx={{ fontSize: 13, fontWeight: 700, color: C.amber, mb: 1 }}>
          Diagnosis pointers
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" rowGap={1}>
          <Chip
            label="A_F73"
            onDelete={() => {}}
            deleteIcon={<CloseIcon sx={{ fontSize: 12 }} />}
            sx={{
              bgcolor: "#E2F6EE",
              color: "#1A7A54",
              fontWeight: 600,
              fontSize: 13,
              borderRadius: "20px",
              height: 30,
              px: 0.5,
              "& .MuiChip-deleteIcon": { color: "#1A7A54", fontSize: 14 },
            }}
          />
          <Chip
            label="B_C73"
            onDelete={() => {}}
            deleteIcon={<CloseIcon sx={{ fontSize: 12 }} />}
            sx={{
              bgcolor: "#FDE8F0",
              color: "#B83070",
              fontWeight: 600,
              fontSize: 13,
              borderRadius: "20px",
              height: 30,
              px: 0.5,
              "& .MuiChip-deleteIcon": { color: "#B83070", fontSize: 14 },
            }}
          />
          <Chip
            label="+ Add"
            variant="outlined"
            sx={{
              borderColor: "#C8C3EE",
              color: "#5443C4",
              fontWeight: 600,
              fontSize: 13,
              borderRadius: "20px",
              height: 30,
              px: 0.5,
              cursor: "pointer",
            }}
          />
        </Stack>
      </Box>

      <Box
        sx={{
          border: `1px solid ${C.borderLight}`,
          borderRadius: "10px",
          p: { xs: 1.5, md: 2 },
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems={{ xs: "flex-start", sm: "center" }}
          justifyContent="space-between"
          flexWrap="wrap"
          rowGap={1}
          sx={{ mb: 1.5 }}
        >
          <Typography sx={{ fontSize: 14, fontWeight: 700, color: C.textDark }}>
            Procedures
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" rowGap={1}>
            <OutlineBtn>+ Customised Columns</OutlineBtn>
            <OutlineBtn>+ Add line</OutlineBtn>
            <OutlineBtn startIcon={<CheckIcon sx={{ fontSize: 14 }} />}>
              Check codes
            </OutlineBtn>
          </Stack>
        </Stack>

        <TableContainer
          sx={{
            border: `1px solid ${C.borderLight}`,
            borderRadius: "8px",
            overflowX: "auto",
            ...scrollHide,
          }}
        >
          <Table size="small" sx={{ minWidth: 960 }}>
            <TableHead>
              <TableRow>
                {procColumns.map((col) => (
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
              {procRows.map((row, i) => (
                <TableRow key={i} sx={{ "&:last-child td": { borderBottom: 0 } }}>
                  {row.map((cell, j) => (
                    <TableCell
                      key={j}
                      sx={{
                        fontSize: 13,
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
      id="additional" sectionRef={sectionRef}
      number={5} title="Additional Details"
      accentColor={C.teal5} accentBg={C.teal5Bg}
    >
      <FieldRow fields={[
        { label: "Has other claim ID",         value: "Yes", select: true, options: ["Yes", "No"] },
        { label: "Agency claim no.",            value: "",    placeholder: "Type here" },
        { label: "Unable to work from date",    value: "08/28/2026" },
        { label: "Unable to work to date",      value: "09/28/2026" },
      ]} />

      <FieldRow fields={[
        { label: "Initial visit date",       value: "07/28/2026", icon: true },
        { label: "Last related visit date",  value: "07/28/2026", icon: true },
        { label: "Claim code",               value: "W3", select: true, options: ["W3", "W2", "W1"] },
        { label: "Other date",               value: "09/28/2026", icon: true },
      ]} />

      <FieldRow fields={[
        { label: "Other date qualifier",    value: "-", select: true, options: ["-"] },
        { label: "Resubmission code",       value: "-" },
        { label: "Original reference no.", value: "-" },
        { label: "Additional Claim info",   value: "-" },
      ]} />
    </SectionCard>
  );
}

/* =========================================================
   FOOTER BAR
   ========================================================= */
function FooterBar() {
  return (
    <Paper elevation={3} sx={{
      position: "sticky", bottom: 0, zIndex: 25,
      border: `1px solid ${C.borderLight}`, borderRadius: "12px",
      bgcolor: "#fff", px: { xs: 2, md: 3 }, py: 1.8,
      display: "flex", alignItems: { xs: "flex-start", md: "center" },
      justifyContent: "space-between",
      flexDirection: { xs: "column", md: "row" }, gap: 2,
    }}>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 1, sm: 3 }}
        alignItems={{ xs: "flex-start", sm: "center" }} flexWrap="wrap" rowGap={1}
      >
        <Box sx={{ minWidth: 120 }}>
          <Typography sx={{ ...labelSx, mb: 0.5 }}>
            Total Charges <Box component="span" sx={{ color: "red" }}>*</Box>
          </Typography>
          <TextField size="small" defaultValue="118.00" sx={{ width: 130 }}
            InputProps={{ sx: inputNormal() }}
          />
        </Box>
        <Typography sx={{ fontSize: 14, color: "#6B7280", whiteSpace: "nowrap" }}>
          Grand total{" "}
          <Box component="span" sx={{ fontSize: 18, fontWeight: 800, color: C.textDark }}>
            $118.00
          </Box>
        </Typography>
      </Stack>

      <Stack direction="row" spacing={1} flexWrap="wrap" rowGap={1} alignItems="center">
        <Box sx={{ display: "flex", border: `1px solid ${C.border}`, borderRadius: "8px", overflow: "hidden" }}>
          <Button disableElevation sx={{
            textTransform: "none", fontSize: 13, fontWeight: 600,
            color: C.textDark, borderRadius: 0, px: 2, py: 0.7,
            bgcolor: "#fff", borderRight: `1px solid ${C.border}`,
            "&:hover": { bgcolor: "#F5F6F8" },
          }}>
            Select Action
          </Button>
          <IconButton size="small" sx={{ borderRadius: 0, px: 1, bgcolor: "#fff", "&:hover": { bgcolor: "#F5F6F8" } }}>
            <ArrowDropDownIcon sx={{ fontSize: 20, color: "#6B7280" }} />
          </IconButton>
        </Box>

        <Button variant="outlined" sx={{
          textTransform: "none", borderRadius: "8px", fontSize: 13,
          fontWeight: 600, color: C.textDark, borderColor: C.border, px: 2,
          "&:hover": { borderColor: "#B0B8C8", bgcolor: "#FAFBFD" },
        }}>
          Cancel
        </Button>

        <Button variant="contained" disableElevation startIcon={<CheckIcon sx={{ fontSize: 15 }} />}
          sx={{
            textTransform: "none", borderRadius: "8px", fontSize: 13,
            fontWeight: 600, bgcolor: C.blue, px: 2.5,
            "&:hover": { bgcolor: C.blueHover },
          }}
        >
          Save
        </Button>
      </Stack>
    </Paper>
  );
}

/* =========================================================
   MAIN PAGE
   ========================================================= */
export default function NewEncounter() {
  const sectionRefs = React.useRef({});
  const rootRef = React.useRef(null);
  const headerRef = React.useRef(null);
  const [activeId, setActiveId] = React.useState(STEPS[0].id);

  const setRef = (id) => (node) => { sectionRefs.current[id] = node; };

  React.useEffect(() => {
    /* Scroll-based detection — finds the last card whose top edge has
       passed under the sticky header, so chip N lights up exactly when
       card N reaches the top of the viewport (or its actual scroll
       container — this page may not always scroll the window itself,
       e.g. when embedded inside a layout shell with its own
       overflow:auto wrapper). The header's real height is measured
       live instead of hard-coded, and requestAnimationFrame throttling
       keeps recalculation cheap so the highlight change stays smooth. */
    let ticking = false;

    const computeActive = () => {
      const headerHeight = headerRef.current
        ? headerRef.current.getBoundingClientRect().height
        : 130;
      const threshold = headerHeight + 20;

      const ids = STEPS.map((s) => s.id);
      let currentId = ids[0];

      for (const id of ids) {
        const node = sectionRefs.current[id];
        if (!node) continue;
        const top = node.getBoundingClientRect().top;
        if (top <= threshold) {
          currentId = id;
        }
      }
      setActiveId((prev) => (prev === currentId ? prev : currentId));
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(computeActive);
        ticking = true;
      }
    };

    /* Walk up from the page root and collect every ancestor that can
       actually scroll (overflowY auto/scroll), plus window itself,
       and listen on all of them — whichever one really scrolls will
       fire and keep the active chip in sync. */
    const getScrollParents = (el) => {
      const parents = [window];
      let node = el;
      while (node && node !== document.body && node.parentElement) {
        node = node.parentElement;
        const style = window.getComputedStyle(node);
        if (/(auto|scroll)/.test(style.overflowY)) parents.push(node);
      }
      return parents;
    };

    const scrollParents = getScrollParents(rootRef.current);
    scrollParents.forEach((el) => el.addEventListener("scroll", onScroll, { passive: true }));
    window.addEventListener("resize", onScroll, { passive: true });
    computeActive(); /* run once on mount */

    return () => {
      scrollParents.forEach((el) => el.removeEventListener("scroll", onScroll));
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const handleStepClick = (id) => {
    const node = sectionRefs.current[id];
    if (node) node.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Box ref={rootRef} sx={{ bgcolor: C.pageBg, minHeight: "100vh", width: "100%", boxSizing: "border-box" }}>
      <Box ref={headerRef} sx={{
        position: "sticky", top: 0, zIndex: 30,
        bgcolor: C.pageBg,
        px: { xs: 1.5, sm: 3, md: 4, lg: 5 },
        pt: { xs: 1.5, md: 2 }, pb: 0,
        borderBottom: `1px solid ${C.borderLight}`,
      }}>
        <TopBar />
        <StepperNav activeId={activeId} onStepClick={handleStepClick} />
      </Box>

      <Box sx={{ px: { xs: 1.5, sm: 3, md: 4, lg: 5 }, pt: 2.5, pb: 6, boxSizing: "border-box" }}>
        <Stack spacing={2.5}>
          <EncounterSummary />
          <AssistBanner />

          <PatientSection           sectionRef={setRef("patient")} />
          <CaseInsuranceSection     sectionRef={setRef("case")} />
          <ConditionsSection        sectionRef={setRef("conditions")} />
          <ChargesSection           sectionRef={setRef("charges")} />
          <AdditionalDetailsSection sectionRef={setRef("additional")} />

          <FooterBar />
        </Stack>
      </Box>
    </Box>
  );
}