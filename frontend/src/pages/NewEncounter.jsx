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
  Divider,
} from "@mui/material";

import BoltIcon from "@mui/icons-material/Bolt";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import CheckIcon from "@mui/icons-material/Check";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";

/* ------------------------------------------------------------------ */
/* Design tokens                                                       */
/* ------------------------------------------------------------------ */

const T = {
  page: "#F5F7FA",

  cardBorder: "#E4E9F1",

  textPrimary: "#111827",
  textSecondary: "#6B7280",
  textMuted: "#9AA3B2",

  blue: "#2563EB",
  blueHover: "#1D4ED8",
  blueSoft: "#EEF3FF",

  purple: "#6D5BD0",
  purpleSoft: "#F2EFFC",

  green: "#1E8F5F",
  greenSoft: "#E7F7EF",
  greenBorder: "#0E7A50",

  orange: "#D97432",
  orangeSoft: "#FDEFE3",

  amber: "#B4820F",
  amberSoft: "#FBF1DC",

  teal: "#128F8F",
  tealSoft: "#E1F5F5",

  fieldBorder: "#D9DFEA",
  rowLine: "#EEF1F7",

  successChipBg: "#E7F7EF",
  successChipBorder: "#CBEBDF",
  successChipText: "#1E8F5F",

  amberChipBg: "#FCF0CE",
  amberChipText: "#8A6412",

  highlight: "#FBF0D9",
  highlightGreen: "#F0FDF6",
};

const hideScrollbarSx = {
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  "&::-webkit-scrollbar": { display: "none" },
};

/* ------------------------------------------------------------------ */
/* Steps                                                               */
/* ------------------------------------------------------------------ */

const STEPS = [
  { id: "patient", label: "Patient" },
  { id: "case", label: "Case & Insurance" },
  { id: "conditions", label: "Conditions & Auth" },
  { id: "charges", label: "Charges & Review" },
  { id: "additional", label: "Additional Details" },
];

/* ------------------------------------------------------------------ */
/* Reusable Field                                                      */
/* ------------------------------------------------------------------ */

const fieldLabelSx = {
  fontSize: 12,
  fontWeight: 500,
  color: T.textSecondary,
  mb: 0.5,
};

function fieldInputSx(highlighted) {
  return {
    borderRadius: "20px",
    fontSize: 13.5,
    bgcolor: highlighted ? T.highlight : "#fff",

    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: highlighted ? "#E8D9AA" : T.fieldBorder,
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: T.blue,
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: T.blue,
      borderWidth: "1.5px",
    },
  };
}

function fieldInputSxGreen() {
  return {
    borderRadius: "20px",
    fontSize: 13.5,
    bgcolor: T.highlightGreen,
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#B6E8D0",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: T.green,
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: T.green,
      borderWidth: "1.5px",
    },
  };
}

function FormField({
  label,
  value,
  select,
  options = [],
  type = "text",
  placeholder,
  highlighted = false,
  highlightedGreen = false,
  icon,
  required,
}) {
  const inputSx = highlightedGreen
    ? fieldInputSxGreen()
    : fieldInputSx(highlighted);

  return (
    <Box sx={{ width: "100%", minWidth: 0 }}>
      <Typography sx={fieldLabelSx}>
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
        select={select}
        type={type}
        defaultValue={value}
        placeholder={placeholder}
        InputLabelProps={type === "date" ? { shrink: true } : undefined}
        SelectProps={select ? { IconComponent: ArrowDropDownIcon } : undefined}
        InputProps={{
          sx: inputSx,
          endAdornment: icon ? (
            <CalendarTodayOutlinedIcon
              sx={{ fontSize: 16, color: T.textMuted, flexShrink: 0 }}
            />
          ) : undefined,
        }}
      >
        {select &&
          options.map((opt) => (
            <MenuItem key={opt} value={opt} sx={{ fontSize: 13.5 }}>
              {opt}
            </MenuItem>
          ))}
      </TextField>
    </Box>
  );
}

function FieldRow({ fields }) {
  return (
    <Grid container spacing={2}>
      {fields.map((f, i) => (
        <Grid item xs={12} sm={6} md={f.md || 3} key={i}>
          <FormField {...f} />
        </Grid>
      ))}
    </Grid>
  );
}

/* ------------------------------------------------------------------ */
/* Section shell — left accent border style                           */
/* ------------------------------------------------------------------ */

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
        border: `1px solid ${T.cardBorder}`,
        borderRadius: "12px",
        overflow: "hidden",
        bgcolor: "#fff",
        scrollMarginTop: "150px",
      }}
    >
      {/* HEADER BANNER — left accent border + light tinted background */}
      <Box
        sx={{
          background: accentBg,
          borderLeft: `4px solid ${accentColor}`,
          px: { xs: 2, md: 3 },
          py: 1.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        <Typography
          sx={{
            fontSize: 12.5,
            fontWeight: 700,
            letterSpacing: "0.05em",
            color: accentColor,
            textTransform: "uppercase",
          }}
        >
          {number} · {title}
        </Typography>

        {rightSlot}
      </Box>

      {/* BODY */}
      <Box sx={{ px: { xs: 2, md: 3 }, py: 2.5 }}>
        <Stack spacing={2.5}>{children}</Stack>
      </Box>
    </Paper>
  );
}

/* ------------------------------------------------------------------ */
/* Top bar                                                             */
/* ------------------------------------------------------------------ */

function TopBar() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: { xs: "flex-start", sm: "center" },
        justifyContent: "space-between",
        flexDirection: { xs: "column", sm: "row" },
        gap: 1.5,
        pb: 1.5,
      }}
    >
      <Box>
        <Typography
          sx={{
            fontSize: 10.5,
            fontWeight: 700,
            letterSpacing: "0.09em",
            color: T.textMuted,
            textTransform: "uppercase",
            mb: 0.2,
          }}
        >
          Charge Capture
        </Typography>

        <Typography
          sx={{
            fontSize: 24,
            fontWeight: 800,
            color: T.textPrimary,
            letterSpacing: "-0.5px",
            lineHeight: 1.15,
          }}
        >
          New Encounter
        </Typography>
      </Box>

      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap alignItems="center">
        <Button
          variant="outlined"
          sx={{
            textTransform: "none",
            borderRadius: "8px",
            fontSize: 13.5,
            fontWeight: 500,
            color: T.textPrimary,
            borderColor: T.fieldBorder,
            px: 2,
            py: 0.65,
            "&:hover": { borderColor: "#BBC3D0", bgcolor: "#FAFAFA" },
          }}
        >
          Cancel
        </Button>

        <Button
          variant="outlined"
          startIcon={<InsertDriveFileOutlinedIcon sx={{ fontSize: 16 }} />}
          sx={{
            textTransform: "none",
            borderRadius: "8px",
            fontSize: 13.5,
            fontWeight: 500,
            color: T.textPrimary,
            borderColor: T.fieldBorder,
            px: 2,
            py: 0.65,
            "&:hover": { borderColor: "#BBC3D0", bgcolor: "#FAFAFA" },
          }}
        >
          Save draft
        </Button>

        <Button
          variant="contained"
          disableElevation
          sx={{
            textTransform: "none",
            borderRadius: "8px",
            fontSize: 13.5,
            fontWeight: 600,
            bgcolor: T.blue,
            px: 2,
            py: 0.75,
            "&:hover": { bgcolor: T.blueHover },
            "&::before": {
              content: '"+ "',
              fontWeight: 700,
              fontSize: 15,
              lineHeight: 1,
              mr: 0.2,
            },
          }}
        >
          Scrub &amp; approve
        </Button>
      </Stack>
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* Stepper nav — numbered circles connected by dashed lines           */
/* ------------------------------------------------------------------ */

function StepperNav({ activeId, onStepClick }) {
  const activeIndex = STEPS.findIndex((s) => s.id === activeId);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 1,
        pb: 1.5,
      }}
    >
      {/* Steps row */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          overflowX: "auto",
          pb: 0.5,
          flexGrow: 1,
          ...hideScrollbarSx,
        }}
      >
        {STEPS.map((step, index) => {
          const isActive = step.id === activeId;
          const isPast = index < activeIndex;

          return (
            <React.Fragment key={step.id}>
              {/* Step pill */}
              <Box
                onClick={() => onStepClick(step.id)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.8,
                  cursor: "pointer",
                  flexShrink: 0,
                  px: 1,
                  py: 0.5,
                  borderRadius: "20px",
                  bgcolor: isActive ? T.textPrimary : "transparent",
                  "&:hover": {
                    bgcolor: isActive ? T.textPrimary : "#EBEBEB",
                  },
                  transition: "background 0.15s",
                }}
              >
                {/* Number circle */}
                <Box
                  sx={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 11,
                    fontWeight: 700,
                    flexShrink: 0,
                    bgcolor: isActive
                      ? "#fff"
                      : isPast
                      ? T.textPrimary
                      : T.page,
                    color: isActive
                      ? T.textPrimary
                      : isPast
                      ? "#fff"
                      : T.textSecondary,
                    border: isActive
                      ? "none"
                      : isPast
                      ? "none"
                      : `1.5px solid ${T.fieldBorder}`,
                  }}
                >
                  {index + 1}
                </Box>

                {/* Label */}
                <Typography
                  sx={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: isActive ? "#fff" : T.textSecondary,
                    whiteSpace: "nowrap",
                  }}
                >
                  {step.label}
                </Typography>
              </Box>

              {/* Dashed connector line between steps */}
              {index < STEPS.length - 1 && (
                <Box
                  sx={{
                    flex: "1 1 20px",
                    minWidth: 16,
                    maxWidth: 60,
                    height: 0,
                    borderTop: `1.5px dashed ${T.fieldBorder}`,
                    mx: 0.5,
                    flexShrink: 0,
                  }}
                />
              )}
            </React.Fragment>
          );
        })}
      </Box>

      {/* Alerts & Tasks button */}
      <Button
        variant="outlined"
        startIcon={<NotificationsNoneOutlinedIcon sx={{ fontSize: 16 }} />}
        sx={{
          flexShrink: 0,
          textTransform: "none",
          borderRadius: "8px",
          fontSize: 13,
          fontWeight: 600,
          color: T.textPrimary,
          borderColor: T.fieldBorder,
          whiteSpace: "nowrap",
          "&:hover": { borderColor: T.textMuted, bgcolor: "#FAFAFA" },
        }}
      >
        Alerts &amp; Tasks
      </Button>
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* Encounter summary strip                                             */
/* ------------------------------------------------------------------ */

function EncounterSummary() {
  const item = (label, value) => (
    <Box>
      <Typography
        sx={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.07em",
          color: T.textMuted,
          textTransform: "uppercase",
        }}
      >
        {label}
      </Typography>
      <Typography sx={{ fontSize: 13.5, fontWeight: 600, color: T.textPrimary }}>
        {value}
      </Typography>
    </Box>
  );

  return (
    <Paper
      elevation={0}
      sx={{
        border: `1px solid ${T.cardBorder}`,
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
      <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 1.5, sm: 4 }}>
        {item("Encounter", "NEW · Draft")}
        {item("Patient", "Wayne, Jimmy")}
        {item("Details", "06/15/1978 · M · MRN 326362969")}
      </Stack>

      <Chip
        label="Unbilled"
        sx={{
          bgcolor: T.amberChipBg,
          color: T.amberChipText,
          fontWeight: 700,
          fontSize: 12,
          borderRadius: "6px",
          height: 26,
        }}
      />
    </Paper>
  );
}

/* ------------------------------------------------------------------ */
/* AI assist banner                                                    */
/* ------------------------------------------------------------------ */

function AssistBanner() {
  return (
    <Paper
      elevation={0}
      sx={{
        border: `1px solid #D8D2F8`,
        borderRadius: "12px",
        background: "linear-gradient(90deg, #EDE9FB 0%, #F0EFFE 50%, #EEF3FF 100%)",
        px: { xs: 2, md: 3 },
        py: 1.8,
        display: "flex",
        gap: 1.5,
        alignItems: "flex-start",
      }}
    >
      <BoltIcon sx={{ color: T.purple, fontSize: 18, mt: 0.25, flexShrink: 0 }} />

      <Box>
        <Typography
          sx={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.07em",
            color: T.purple,
            textTransform: "uppercase",
            mb: 0.4,
          }}
        >
          ✦ Encounter Assist
        </Typography>

        <Typography sx={{ fontSize: 13, color: T.textPrimary, lineHeight: 1.65 }}>
          Pre-filled from the 08/15 appointment and EHR note. I matched the patient, pulled the active{" "}
          <Box component="span" sx={{ fontWeight: 700 }}>
            Aetna POS
          </Box>{" "}
          case, and suggested CPT{" "}
          <Box component="span" sx={{ fontWeight: 700 }}>
            99213
          </Box>{" "}
          with dx{" "}
          <Box component="span" sx={{ fontWeight: 700 }}>
            A/B
          </Box>
          . Eligibility isn&apos;t verified yet — one click below runs it. Nothing here opens a new
          window.
        </Typography>
      </Box>
    </Paper>
  );
}

/* ------------------------------------------------------------------ */
/* Small action button                                                 */
/* ------------------------------------------------------------------ */

function ActionButton({ children, filled, icon, color, ...props }) {
  const blueColor = color || T.blue;
  return (
    <Button
      variant={filled ? "contained" : "outlined"}
      disableElevation
      startIcon={icon}
      sx={{
        textTransform: "none",
        borderRadius: "8px",
        fontSize: 13,
        fontWeight: 600,
        whiteSpace: "nowrap",
        ...(filled
          ? {
              bgcolor: blueColor,
              "&:hover": { bgcolor: T.blueHover },
            }
          : {
              color: T.textPrimary,
              borderColor: T.fieldBorder,
              bgcolor: "#fff",
              "&:hover": { borderColor: T.textMuted, bgcolor: "#FAFAFA" },
            }),
      }}
      {...props}
    >
      {children}
    </Button>
  );
}

/* ------------------------------------------------------------------ */
/* Status chip                                                         */
/* ------------------------------------------------------------------ */

function StatusChip({ label }) {
  return (
    <Chip
      label={label}
      size="small"
      sx={{
        bgcolor: T.successChipBg,
        border: `1px solid ${T.successChipBorder}`,
        color: T.successChipText,
        fontWeight: 700,
        fontSize: 12,
        borderRadius: "6px",
        height: 24,
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Generic responsive data table                                       */
/* ------------------------------------------------------------------ */

function DataTable({ columns, rows, headTint, withSortIcon }) {
  return (
    <TableContainer
      sx={{
        border: `1px solid ${T.cardBorder}`,
        borderRadius: "8px",
        overflowX: "auto",
        ...hideScrollbarSx,
      }}
    >
      <Table size="small" sx={{ minWidth: 720 }}>
        <TableHead>
          <TableRow>
            {columns.map((col, ci) => (
              <TableCell
                key={ci}
                sx={{
                  bgcolor: headTint,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  color: T.textSecondary,
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                  borderBottom: `1px solid ${T.rowLine}`,
                  py: 1.2,
                }}
              >
                {withSortIcon ? (
                  <Stack direction="row" alignItems="center" spacing={0.3}>
                    <span>{col}</span>
                    {col && (
                      <SyncAltIcon
                        sx={{
                          fontSize: 12,
                          color: T.textMuted,
                          transform: "rotate(90deg)",
                        }}
                      />
                    )}
                  </Stack>
                ) : (
                  col
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row, rIdx) => (
            <TableRow key={rIdx} sx={{ "&:last-child td": { borderBottom: 0 } }}>
              {row.map((cell, cIdx) => (
                <TableCell
                  key={cIdx}
                  sx={{
                    fontSize: 13,
                    color: T.textPrimary,
                    whiteSpace: "nowrap",
                    borderBottom: `1px solid ${T.rowLine}`,
                    py: 1.2,
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
  );
}

/* ------------------------------------------------------------------ */
/* 1 · Patient section                                                 */
/* ------------------------------------------------------------------ */

function PatientSection({ sectionRef }) {
  return (
    <SectionCard
      id="patient"
      sectionRef={sectionRef}
      number={1}
      title="Patient"
      accentColor={T.purple}
      accentBg="#F5F2FD"
      rightSlot={
        <Stack direction="row" spacing={1}>
          <ActionButton>Select existing</ActionButton>
          <Button
            variant="contained"
            disableElevation
            startIcon={<AddIcon sx={{ fontSize: 15 }} />}
            sx={{
              textTransform: "none",
              borderRadius: "8px",
              fontSize: 13,
              fontWeight: 600,
              bgcolor: T.blue,
              "&:hover": { bgcolor: T.blueHover },
            }}
          >
            New patient
          </Button>
        </Stack>
      }
    >
      <FieldRow
        fields={[
          { label: "Legal Name", value: "Wayne, Jimmy" },
          { label: "Date of Birth", value: "06/15/1978" },
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
          { label: "Default Rendering Provider", value: "Kumar V2, Jayram" },
          {
            label: "Default Service Location",
            value: "The University RL",
            highlightedGreen: true,
          },
        ]}
      />
    </SectionCard>
  );
}

/* ------------------------------------------------------------------ */
/* 2 · Case & Insurance section                                        */
/* ------------------------------------------------------------------ */

function CaseInsuranceSection({ sectionRef }) {
  const policyRows = [
    {
      active: true,
      type: "PRIMARY",
      insurance: "Aetna",
      plan: "Aetna-Plan name",
      policy: "298692786",
      group: "298692786",
      isActive: true,
    },
    {
      active: false,
      type: "SECONDARY",
      insurance: "Aetna",
      plan: "Aetna-Plan name",
      policy: "298692786",
      group: "298692786",
      isActive: true,
    },
  ];

  return (
    <SectionCard
      id="case"
      sectionRef={sectionRef}
      number={2}
      title="Case & Insurance"
      accentColor={T.teal}
      accentBg="#EBF8F8"
      rightSlot={
        <Stack direction="row" spacing={1}>
          <ActionButton>Select case</ActionButton>
          <Button
            variant="contained"
            disableElevation
            startIcon={<AddIcon sx={{ fontSize: 15 }} />}
            sx={{
              textTransform: "none",
              borderRadius: "8px",
              fontSize: 13,
              fontWeight: 600,
              bgcolor: T.blue,
              "&:hover": { bgcolor: T.blueHover },
            }}
          >
            New case
          </Button>
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

      {/* Checkboxes */}
      <Stack direction="row" spacing={0} flexWrap="wrap" rowGap={0.5}>
        {[
          { label: "Active", checked: true, color: T.blue },
          { label: "Send patient statement", checked: true, color: T.blue },
          { label: "Do not send claim electronically", checked: false, color: T.blue },
        ].map((c) => (
          <FormControlLabel
            key={c.label}
            sx={{ mr: 2 }}
            control={
              <Checkbox
                defaultChecked={c.checked}
                size="small"
                sx={{
                  color: T.fieldBorder,
                  "&.Mui-checked": { color: c.color },
                }}
              />
            }
            label={
              <Typography
                sx={{
                  fontSize: 13.5,
                  fontWeight: 500,
                  color: T.textPrimary,
                }}
              >
                {c.label}
              </Typography>
            }
          />
        ))}
      </Stack>

      {/* Insurance policies */}
      <Box>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 1 }}
        >
          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 700,
              color: T.textPrimary,
            }}
          >
            Insurance policies
          </Typography>

          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 600,
              color: T.blue,
              cursor: "pointer",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            + Add/Manage policy
          </Typography>
        </Stack>

        <TableContainer
          sx={{
            border: `1px solid ${T.cardBorder}`,
            borderRadius: "8px",
            overflowX: "auto",
            ...hideScrollbarSx,
          }}
        >
          <Table size="small" sx={{ minWidth: 700 }}>
            <TableHead>
              <TableRow>
                {["", "TYPE", "INSURANCE", "PLAN", "POLICY #", "GROUP #", "ACTIVE", "ACTIONS"].map(
                  (col, ci) => (
                    <TableCell
                      key={ci}
                      sx={{
                        bgcolor: T.tealSoft,
                        fontSize: 11,
                        fontWeight: 700,
                        color: T.textSecondary,
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                        whiteSpace: "nowrap",
                        borderBottom: `1px solid ${T.rowLine}`,
                        py: 1.2,
                      }}
                    >
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
                  sx={{ "&:last-child td": { borderBottom: 0 } }}
                >
                  <TableCell sx={{ borderBottom: `1px solid ${T.rowLine}`, py: 1 }}>
                    <Checkbox
                      size="small"
                      defaultChecked={row.active}
                      sx={{
                        color: T.fieldBorder,
                        "&.Mui-checked": { color: T.blue },
                        p: 0.5,
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ borderBottom: `1px solid ${T.rowLine}`, minWidth: 130, py: 1 }}>
                    <TextField
                      select
                      size="small"
                      defaultValue={row.type}
                      fullWidth
                      SelectProps={{ IconComponent: ArrowDropDownIcon }}
                      InputProps={{ sx: fieldInputSx(false) }}
                    >
                      <MenuItem value="PRIMARY">PRIMARY</MenuItem>
                      <MenuItem value="SECONDARY">SECONDARY</MenuItem>
                    </TextField>
                  </TableCell>
                  <TableCell sx={{ fontSize: 13, borderBottom: `1px solid ${T.rowLine}`, py: 1 }}>
                    <TextField
                      size="small"
                      defaultValue={row.insurance}
                      InputProps={{ sx: { ...fieldInputSx(false), minWidth: 80 } }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontSize: 13, borderBottom: `1px solid ${T.rowLine}`, py: 1 }}>
                    <TextField
                      size="small"
                      defaultValue={row.plan}
                      InputProps={{ sx: { ...fieldInputSx(false), minWidth: 120 } }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontSize: 13, borderBottom: `1px solid ${T.rowLine}`, py: 1 }}>
                    <TextField
                      size="small"
                      defaultValue={row.policy}
                      InputProps={{ sx: { ...fieldInputSx(false), minWidth: 100 } }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontSize: 13, borderBottom: `1px solid ${T.rowLine}`, py: 1 }}>
                    <TextField
                      size="small"
                      defaultValue={row.group}
                      InputProps={{ sx: { ...fieldInputSx(false), minWidth: 100 } }}
                    />
                  </TableCell>
                  <TableCell sx={{ borderBottom: `1px solid ${T.rowLine}`, py: 1, minWidth: 100 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        border: `1px solid ${T.successChipBorder}`,
                        borderRadius: "6px",
                        px: 1,
                        py: 0.4,
                        bgcolor: T.successChipBg,
                        width: "fit-content",
                      }}
                    >
                      {row.isActive && (
                        <>
                          <Checkbox
                            size="small"
                            defaultChecked
                            sx={{
                              p: 0,
                              color: T.green,
                              "&.Mui-checked": { color: T.green },
                            }}
                          />
                          <Typography
                            sx={{ fontSize: 12, fontWeight: 600, color: T.green }}
                          >
                            Active
                          </Typography>
                        </>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell sx={{ borderBottom: `1px solid ${T.rowLine}`, py: 1 }}>
                    <IconButton size="small">
                      <EditOutlinedIcon sx={{ fontSize: 16, color: T.blue }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Additional details */}
      <Box>
        <Typography
          sx={{
            fontSize: 13,
            fontWeight: 700,
            color: T.textPrimary,
            mb: 1.2,
          }}
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

      {/* Eligibility row */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems={{ xs: "flex-start", sm: "center" }}
        justifyContent="space-between"
        flexWrap="wrap"
        rowGap={1}
      >
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} alignItems={{ xs: "flex-start", sm: "center" }}>
          <Button
            variant="contained"
            disableElevation
            startIcon={<FactCheckOutlinedIcon sx={{ fontSize: 16 }} />}
            sx={{
              textTransform: "none",
              borderRadius: "8px",
              fontSize: 13,
              fontWeight: 600,
              bgcolor: T.blue,
              "&:hover": { bgcolor: T.blueHover },
            }}
          >
            Check eligibility (270/271)
          </Button>
          <Typography sx={{ fontSize: 12.5, color: T.textMuted }}>
            Runs inline — no separate window.
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={0.5}>
          <InsertDriveFileOutlinedIcon sx={{ fontSize: 15, color: T.blue }} />
          <Typography
            sx={{ fontSize: 13, fontWeight: 600, color: T.blue, cursor: "pointer" }}
          >
            View log
          </Typography>
        </Stack>
      </Stack>
    </SectionCard>
  );
}

/* ------------------------------------------------------------------ */
/* 3 · Conditions & Authorisation / Referrals section                  */
/* ------------------------------------------------------------------ */

function ConditionsSection({ sectionRef }) {
  const tableColumns = [
    "Authorization #",
    "# Visits",
    "# Used",
    "Start",
    "End",
    "Status ↓",
    "Name",
    "Contact",
    "Notes",
  ];

  const authRows = [
    [
      "AUTH-88210",
      "6",
      "0",
      "08/01/2026",
      "10/31/2026",
      <StatusChip key="a1" label="Active" />,
      "Lorem Ipsum",
      "XXXXXXXXXX",
      "Neuro follow-up",
    ],
    [
      "AUTH-88210",
      "6",
      "0",
      "08/01/2026",
      "10/31/2026",
      <StatusChip key="a2" label="Active" />,
      "Lorem Ipsum",
      "XXXXXXXXXX",
      "Neuro follow-up",
    ],
  ];

  const referralColumns = [
    "Referrer #",
    "# Visits",
    "# Used",
    "Start",
    "End",
    "Status ↓",
    "Name",
    "Contact",
    "Notes",
  ];

  const referralRows = [
    [
      "AUTH-88210",
      "6",
      "0",
      "08/01/2026",
      "10/31/2026",
      <StatusChip key="r1" label="Active" />,
      "Lorem Ipsum",
      "XXXXXXXXXX",
      "Neuro follow-up",
    ],
    [
      "AUTH-88210",
      "6",
      "0",
      "08/01/2026",
      "10/31/2026",
      <StatusChip key="r2" label="Active" />,
      "Lorem Ipsum",
      "XXXXXXXXXX",
      "Neuro follow-up",
    ],
  ];

  const conditions1 = ["Auto accident", "Employment", "Pregnancy", "Abuse", "Homebound"];
  const conditions2 = ["Other", "EPSDT", "Family planning", "Emergency"];

  return (
    <SectionCard
      id="conditions"
      sectionRef={sectionRef}
      number={3}
      title="Conditions & Authorisation / Referrals"
      accentColor={T.orange}
      accentBg="#FEF3EC"
    >
      {/* Condition checkboxes */}
      <Box>
        <Typography sx={{ ...fieldLabelSx, mb: 1 }}>Condition related to</Typography>

        <Stack spacing={0}>
          <Stack direction="row" flexWrap="wrap" rowGap={0}>
            {conditions1.map((c) => (
              <FormControlLabel
                key={c}
                sx={{ mr: 2 }}
                control={
                  <Checkbox
                    size="small"
                    sx={{
                      color: T.fieldBorder,
                      "&.Mui-checked": { color: T.orange },
                    }}
                  />
                }
                label={
                  <Typography sx={{ fontSize: 13.5, color: T.textPrimary }}>
                    {c}
                  </Typography>
                }
              />
            ))}
          </Stack>
          <Stack direction="row" flexWrap="wrap" rowGap={0}>
            {conditions2.map((c) => (
              <FormControlLabel
                key={c}
                sx={{ mr: 2 }}
                control={
                  <Checkbox
                    size="small"
                    sx={{
                      color: T.fieldBorder,
                      "&.Mui-checked": { color: T.orange },
                    }}
                  />
                }
                label={
                  <Typography sx={{ fontSize: 13.5, color: T.textPrimary }}>
                    {c}
                  </Typography>
                }
              />
            ))}
          </Stack>
        </Stack>
      </Box>

      {/* Condition date fields */}
      <FieldRow
        fields={[
          {
            label: "Condition Date Type",
            value: "None",
            select: true,
            options: ["None", "Initial", "Last seen", "Acute manifestation"],
            highlighted: true,
            md: 4,
          },
          { label: "Start Date", value: "NA", md: 4 },
          { label: "End Date", value: "NA", md: 4 },
        ]}
      />

      {/* Authorizations */}
      <Box>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 1 }}
        >
          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 700,
              color: T.orange,
              textTransform: "uppercase",
              letterSpacing: "0.03em",
            }}
          >
            Authorizations
          </Typography>
          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 600,
              color: T.orange,
              cursor: "pointer",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            + Add authorization
          </Typography>
        </Stack>

        <DataTable
          columns={tableColumns}
          rows={authRows}
          headTint={T.orangeSoft}
        />
      </Box>

      {/* Referrals */}
      <Box>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 1 }}
        >
          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 700,
              color: T.orange,
              textTransform: "uppercase",
              letterSpacing: "0.03em",
            }}
          >
            Referrals
          </Typography>
          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 600,
              color: T.orange,
              cursor: "pointer",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            + Add referrals
          </Typography>
        </Stack>

        <DataTable
          columns={referralColumns}
          rows={referralRows}
          headTint={T.orangeSoft}
        />
      </Box>
    </SectionCard>
  );
}

/* ------------------------------------------------------------------ */
/* 4 · Encounter details & charges section                             */
/* ------------------------------------------------------------------ */

function ChargesSection({ sectionRef }) {
  const procColumns = [
    "DOS FROM",
    "DOS TO",
    "PLACE OF SERVICE",
    "PROCEDURES",
    "MOD 1",
    "DX 1",
    "DX 2",
    "DX 3",
    "DX 4",
    "UNIT CHARGE",
    "DAYS/UNIT",
    "TOTAL",
    "APPLY COPAY",
  ];

  const procRows = [
    [
      "05/27/2026",
      "05/27/2026",
      "11-Office",
      "99214",
      "99214",
      "A",
      "A",
      "A",
      "A",
      "256.08",
      "1",
      "256.08",
      "0.00",
    ],
  ];

  return (
    <SectionCard
      id="charges"
      sectionRef={sectionRef}
      number={4}
      title="Encounter Details & Charges"
      accentColor={T.amber}
      accentBg="#FBF5E3"
    >
      <FieldRow
        fields={[
          { label: "From Date", value: "08/15/2026" },
          { label: "Through Date", value: "08/15/2026" },
          { label: "Post Date", value: "08/28/2026" },
          { label: "Batch #", value: "—" },
        ]}
      />

      <FieldRow
        fields={[
          { label: "Scheduling Provider", value: "Kumar V2, Jayram" },
          { label: "Rendering Provider", value: "Kumar V2, Jayram" },
          {
            label: "Location",
            value: "The University RL",
            highlightedGreen: true,
          },
          {
            label: "Place of Service",
            value: "11 - Office",
            highlighted: true,
          },
        ]}
      />

      {/* Payment Details */}
      <Box>
        <Typography
          sx={{
            fontSize: 13.5,
            fontWeight: 700,
            color: T.orange,
            mb: 1.5,
          }}
        >
          Payment Details
        </Typography>

        <Stack spacing={2}>
          <FieldRow
            fields={[
              {
                label: "Encounter Mode",
                value: "In Office",
                highlighted: true,
              },
              { label: "Copay Due", value: "0.00" },
              { label: "Payment Amount", value: "0.00" },
              {
                label: "Select payment method",
                value: "Select",
                select: true,
                options: ["Select", "Cash", "Card", "Check"],
              },
            ]}
          />

          <FieldRow
            fields={[
              { label: "Date of collection", value: "08/28/2026", md: 4 },
              { label: "Reference #", value: "1786597", md: 4 },
              {
                label: "Notes",
                value: "Lorem ipdum dolor sit amet",
                md: 4,
              },
            ]}
          />
        </Stack>
      </Box>

      {/* Diagnosis pointers */}
      <Box>
        <Typography
          sx={{
            fontSize: 13.5,
            fontWeight: 700,
            color: T.orange,
            mb: 1,
          }}
        >
          Diagnosis pointers
        </Typography>

        <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" rowGap={1}>
          <Chip
            label="A_ F73"
            onDelete={() => {}}
            deleteIcon={<CloseIcon sx={{ fontSize: 13 }} />}
            sx={{
              bgcolor: T.successChipBg,
              color: T.successChipText,
              fontWeight: 700,
              fontSize: 12.5,
              borderRadius: "6px",
              height: 28,
              "& .MuiChip-deleteIcon": { color: T.successChipText },
            }}
          />
          <Chip
            label="B_ C73"
            onDelete={() => {}}
            deleteIcon={<CloseIcon sx={{ fontSize: 13 }} />}
            sx={{
              bgcolor: "#FDE9EE",
              color: "#C2417A",
              fontWeight: 700,
              fontSize: 12.5,
              borderRadius: "6px",
              height: 28,
              "& .MuiChip-deleteIcon": { color: "#C2417A" },
            }}
          />
          <Chip
            icon={<AddIcon sx={{ fontSize: 14, color: T.purple }} />}
            label="Add"
            variant="outlined"
            sx={{
              borderColor: "#D8D2F5",
              color: T.purple,
              fontWeight: 700,
              fontSize: 12.5,
              borderRadius: "6px",
              height: 28,
              "& .MuiChip-icon": { ml: 0.8 },
            }}
          />
        </Stack>
      </Box>

      {/* Procedures */}
      <Box
        sx={{
          border: `1px solid ${T.cardBorder}`,
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
          <Typography sx={{ fontSize: 14, fontWeight: 700, color: T.textPrimary }}>
            Procedures
          </Typography>

          <Stack direction="row" spacing={1} flexWrap="wrap" rowGap={1}>
            <ActionButton>+ Add diagnosis code</ActionButton>
            <ActionButton>+ Add line</ActionButton>
            <ActionButton icon={<CheckIcon sx={{ fontSize: 14 }} />}>
              Check codes
            </ActionButton>
          </Stack>
        </Stack>

        <TableContainer
          sx={{
            border: `1px solid ${T.cardBorder}`,
            borderRadius: "8px",
            overflowX: "auto",
            ...hideScrollbarSx,
          }}
        >
          <Table size="small" sx={{ minWidth: 1000 }}>
            <TableHead>
              <TableRow>
                {procColumns.map((col) => (
                  <TableCell
                    key={col}
                    sx={{
                      bgcolor: T.amberSoft,
                      fontSize: 10.5,
                      fontWeight: 700,
                      color: T.amber,
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                      whiteSpace: "nowrap",
                      borderBottom: `1px solid ${T.rowLine}`,
                      py: 1.2,
                    }}
                  >
                    <Stack direction="row" alignItems="center" spacing={0.3}>
                      <span>{col}</span>
                      <SyncAltIcon
                        sx={{
                          fontSize: 11,
                          color: T.amber,
                          transform: "rotate(90deg)",
                        }}
                      />
                    </Stack>
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
                        whiteSpace: "nowrap",
                        borderBottom: `1px solid ${T.rowLine}`,
                        py: 1.2,
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

/* ------------------------------------------------------------------ */
/* 5 · Additional details section                                      */
/* ------------------------------------------------------------------ */

function AdditionalDetailsSection({ sectionRef }) {
  return (
    <SectionCard
      id="additional"
      sectionRef={sectionRef}
      number={5}
      title="Additional Details"
      accentColor={T.teal}
      accentBg="#EBF8F8"
    >
      <FieldRow
        fields={[
          {
            label: "Has other claim ID",
            value: "Yes",
            select: true,
            options: ["Yes", "No"],
          },
          { label: "Agency claim no.", value: "", placeholder: "Type here" },
          { label: "Unable to work from date", value: "08/28/2026" },
          { label: "Unable to work to date", value: "09/28/2026" },
        ]}
      />

      <FieldRow
        fields={[
          {
            label: "Initial visit date",
            value: "07/28/2026",
            icon: true,
          },
          {
            label: "Last related visit date",
            value: "07/28/2026",
            icon: true,
          },
          {
            label: "Claim code",
            value: "W3",
            select: true,
            options: ["W3", "W2", "W1"],
          },
          {
            label: "Other date",
            value: "09/28/2026",
            icon: true,
          },
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

/* ------------------------------------------------------------------ */
/* Footer action bar                                                   */
/* ------------------------------------------------------------------ */

function FooterBar() {
  return (
    <Paper
      elevation={2}
      sx={{
        position: "sticky",
        bottom: 0,
        border: `1px solid ${T.cardBorder}`,
        borderRadius: "12px",
        bgcolor: "#fff",
        px: { xs: 2, md: 3 },
        py: 1.8,
        display: "flex",
        alignItems: { xs: "flex-start", md: "center" },
        justifyContent: "space-between",
        flexDirection: { xs: "column", md: "row" },
        gap: 2,
        zIndex: 25,
      }}
    >
      {/* Left — total charges */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 3 }}
        alignItems={{ xs: "flex-start", sm: "center" }}
        flexWrap="wrap"
        rowGap={1}
      >
        <Box sx={{ minWidth: 120 }}>
          <Typography sx={fieldLabelSx}>
            Total Charges{" "}
            <Box component="span" sx={{ color: "red" }}>
              *
            </Box>
          </Typography>
          <TextField
            size="small"
            defaultValue="118.00"
            sx={{ width: 130 }}
            InputProps={{ sx: fieldInputSx(false) }}
          />
        </Box>

        <Typography sx={{ fontSize: 14, color: T.textSecondary, whiteSpace: "nowrap" }}>
          Grand total{" "}
          <Box
            component="span"
            sx={{ fontSize: 18, fontWeight: 800, color: T.textPrimary }}
          >
            $118.00
          </Box>
        </Typography>
      </Stack>

      {/* Right — actions */}
      <Stack direction="row" spacing={1} flexWrap="wrap" rowGap={1} alignItems="center">
        {/* Split "Select Action" button */}
        <Box
          sx={{
            display: "flex",
            border: `1px solid ${T.fieldBorder}`,
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <Button
            disableElevation
            sx={{
              textTransform: "none",
              fontSize: 13,
              fontWeight: 600,
              color: T.textPrimary,
              borderRadius: 0,
              px: 2,
              py: 0.7,
              bgcolor: "#fff",
              "&:hover": { bgcolor: "#F5F6F8" },
              borderRight: `1px solid ${T.fieldBorder}`,
            }}
          >
            Select Action
          </Button>
          <IconButton
            size="small"
            sx={{
              borderRadius: 0,
              px: 1,
              bgcolor: "#fff",
              "&:hover": { bgcolor: "#F5F6F8" },
            }}
          >
            <ArrowDropDownIcon sx={{ fontSize: 20, color: T.textSecondary }} />
          </IconButton>
        </Box>

        <Button
          variant="outlined"
          sx={{
            textTransform: "none",
            borderRadius: "8px",
            fontSize: 13,
            fontWeight: 600,
            color: T.textPrimary,
            borderColor: T.fieldBorder,
            px: 2,
            "&:hover": { borderColor: T.textMuted, bgcolor: "#FAFAFA" },
          }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          disableElevation
          startIcon={<CheckIcon sx={{ fontSize: 15 }} />}
          sx={{
            textTransform: "none",
            borderRadius: "8px",
            fontSize: 13,
            fontWeight: 600,
            bgcolor: T.blue,
            px: 2.5,
            "&:hover": { bgcolor: T.blueHover },
          }}
        >
          Save
        </Button>
      </Stack>
    </Paper>
  );
}

/* ------------------------------------------------------------------ */
/* Main page                                                           */
/* ------------------------------------------------------------------ */

export default function NewEncounter() {
  const sectionRefs = React.useRef({});
  const [activeId, setActiveId] = React.useState(STEPS[0].id);

  const setRef = (id) => (node) => {
    sectionRefs.current[id] = node;
  };

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-160px 0px -60% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    Object.values(sectionRefs.current).forEach((node) => {
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, []);

  const handleStepClick = (id) => {
    const node = sectionRefs.current[id];
    if (node) node.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Box
      sx={{
        bgcolor: T.page,
        minHeight: "100vh",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* STICKY HEADER ZONE */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 30,
          bgcolor: T.page,
          px: { xs: 1.5, sm: 3, md: 4, lg: 5 },
          pt: { xs: 1.5, md: 2 },
          pb: 0,
          borderBottom: `1px solid ${T.cardBorder}`,
        }}
      >
        <TopBar />
        <StepperNav activeId={activeId} onStepClick={handleStepClick} />
      </Box>

      {/* SCROLLABLE CONTENT */}
      <Box
        sx={{
          px: { xs: 1.5, sm: 3, md: 4, lg: 5 },
          pt: 2.5,
          pb: 6,
          boxSizing: "border-box",
        }}
      >
        <Stack spacing={2.5}>
          <EncounterSummary />
          <AssistBanner />

          <PatientSection sectionRef={setRef("patient")} />
          <CaseInsuranceSection sectionRef={setRef("case")} />
          <ConditionsSection sectionRef={setRef("conditions")} />
          <ChargesSection sectionRef={setRef("charges")} />
          <AdditionalDetailsSection sectionRef={setRef("additional")} />

          <FooterBar />
        </Stack>
      </Box>
    </Box>
  );
}
