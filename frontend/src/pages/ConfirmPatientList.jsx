import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  DOSCalendarIcon,
} from "../assets/Assets";

/* ------------------------------------------------------------------ */
/* Design tokens                                                       */
/* ------------------------------------------------------------------ */
const T = {
  blue: "#006FFD",
  title: "#1E293B",
  headBg: "#EBF1FE",
  headText: "#373B4D",
  border: "#BED3FC",
  rowLine: "#EEF1F7",
  bodyText: "#475569",
  nameText: "#000",
  mrnText: "#282C36",
  dobText: "#535862",
  locationText: "#000",
  physicianText: "#128584",
  physicianBg: "#E8F8F5",
  page: "#F7F9FC",
};

/* ------------------------------------------------------------------ */
/* Dummy rows                                                          */
/* ------------------------------------------------------------------ */
const createRows = (count = 12) =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    roomBed: "302 - Bed A",
    name: "Lisha Cook",
    age: "45y (F)",
    mrn: "719471345",
    patientId: "ID: NA",
    dob: "11/20/2025",
    location: "GCH -IP",
    physician: "Alex Tobar",
    residents: "Julia R",
  }));

const ROWS = createRows(12);

/* ------------------------------------------------------------------ */
/* Shared cell style                                                   */
/* ------------------------------------------------------------------ */
const cellSx = {
  borderBottom: `1px solid ${T.rowLine}`,
  py: 1.1,
  px: 1.2,
  fontSize: 13,
  color: "#2E2E2E",
  boxSizing: "border-box",
};

/* ------------------------------------------------------------------ */
/* Physician / Residents chip                                          */
/* ------------------------------------------------------------------ */
function Chip({ label }) {
  return (
    <Box
      sx={{
        display: "block",
        width: "100%",
        bgcolor: T.physicianBg,
        borderRadius: "4px",
        px: 1,
        py: 0.55,
        fontSize: 13,
        fontWeight: 700,
        color: T.physicianText,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        boxSizing: "border-box",
      }}
    >
      {label}
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* Header cell                                                         */
/* ------------------------------------------------------------------ */
function HeaderCell({ label, withArrow, isLast }) {
  return (
    <TableCell
      sx={{
        ...cellSx,
        bgcolor: T.headBg,
        fontWeight: 700,
        fontSize: 14,
        color: T.headText,
        borderBottom: "none",
        borderRight: isLast ? "none" : `1px solid ${T.border}`,
        whiteSpace: "pre-line",
        lineHeight: 1.3,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        {label}
        {withArrow && (
          <KeyboardArrowDownIcon
            sx={{ fontSize: 18, color: "#52525B", ml: "auto", flexShrink: 0 }}
          />
        )}
      </Box>
    </TableCell>
  );
}

/* ------------------------------------------------------------------ */
/* DOS Date Navigator                                                  */
/* ------------------------------------------------------------------ */
function DOSNavigator({ date, onPrev, onNext }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 0.5,
        bgcolor: "#fff",
        border: "1.5px solid #E2E8F0",
        borderRadius: "8px",
        px: 1,
        py: 0.5,
        height: 32,
      }}
    >
      {/* Left arrow */}
      <IconButton
        size="small"
        onClick={onPrev}
        aria-label="Previous date"
        sx={{ p: 0.3, borderRadius: "4px", "&:hover": { bgcolor: "#EBF1FE" } }}
      >
        <ChevronLeftIcon />
      </IconButton>

      {/* Calendar icon + date */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.6, px: 0.4 }}>
        <DOSCalendarIcon />
        <Typography
          sx={{
            fontSize: 13,
            fontWeight: 500,
            color: "#8E8E93",
            whiteSpace: "nowrap",
          }}
        >
          DOS: {date}
        </Typography>
      </Box>

      {/* Right arrow */}
      <IconButton
        size="small"
        onClick={onNext}
        aria-label="Next date"
        sx={{ p: 0.3, borderRadius: "4px", "&:hover": { bgcolor: "#EBF1FE" } }}
      >
        <ChevronRightIcon />
      </IconButton>
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* Main Page                                                           */
/* ------------------------------------------------------------------ */
export default function ConfirmPatientList() {
  const navigate = useNavigate();

  /* DOS date state */
  const [dosDate, setDosDate] = React.useState(new Date(2025, 0, 26)); // Jan 26

  const formatDOS = (d) => {
    const month = d.toLocaleString("en-US", { month: "short" });
    return `${month} ${d.getDate()}`;
  };

  const handlePrevDay = () => {
    setDosDate((prev) => {
      const d = new Date(prev);
      d.setDate(d.getDate() - 1);
      return d;
    });
  };

  const handleNextDay = () => {
    setDosDate((prev) => {
      const d = new Date(prev);
      d.setDate(d.getDate() + 1);
      return d;
    });
  };

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
      {/* ---- HEADER ---- */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          mb: 2.5,
        }}
      >
        <Typography
          sx={{
            fontSize: 20,
            fontWeight: 700,
            color: T.title,
            letterSpacing: "-0.2px",
          }}
        >
          Confirm Patient List
        </Typography>

        <DOSNavigator
          date={formatDOS(dosDate)}
          onPrev={handlePrevDay}
          onNext={handleNextDay}
        />
      </Box>

      {/* ---- TABLE ---- */}
      <TableContainer
        sx={{
          width: "100%",
          border: `1px solid ${T.border}`,
          borderRadius: "8px",
          bgcolor: "#fff",
          overflowX: "auto",
        }}
      >
        <Table
          size="small"
          sx={{
            tableLayout: "auto",
            borderCollapse: "collapse",
            "& th, & td": { boxSizing: "border-box" },
          }}
          aria-label="Confirm patient list"
        >
          <TableHead>
            <TableRow>
              <HeaderCell label="Room/Bed" />
              <HeaderCell label={"Name\nAge (Gender)"} />
              <HeaderCell label={"MRN\n(Patient ID)"} />
              <HeaderCell label="DOB" />
              <HeaderCell label="Location" />
              <HeaderCell label="Physician" withArrow />
              <HeaderCell label="Residents" withArrow isLast />
            </TableRow>
          </TableHead>

          <TableBody>
            {ROWS.map((row) => (
              <TableRow
                key={row.id}
                hover
                sx={{ "&:hover": { bgcolor: "#FAFBFE" } }}
              >
                {/* Room/Bed */}
                <TableCell sx={{ ...cellSx, whiteSpace: "nowrap" }}>
                  {row.roomBed}
                </TableCell>

                {/* Name + Age */}
                <TableCell sx={{ ...cellSx }}>
                  <Box sx={{ fontWeight: 700 }}>{row.name}</Box>
                  <Box>{row.age}</Box>
                </TableCell>

                {/* MRN */}
                <TableCell sx={{ ...cellSx }}>
                  <Box>{row.mrn}</Box>
                  <Box>{row.patientId}</Box>
                </TableCell>

                {/* DOB */}
                <TableCell
                  sx={{ ...cellSx, whiteSpace: "nowrap", color: "#535862" }}
                >
                  {row.dob}
                </TableCell>

                {/* Location */}
                <TableCell
                  sx={{ ...cellSx, whiteSpace: "nowrap", fontWeight: 700 }}
                >
                  {row.location}
                </TableCell>

                {/* Physician */}
                <TableCell sx={{ ...cellSx }}>
                  <Chip label={row.physician} />
                </TableCell>

                {/* Residents */}
                <TableCell sx={{ ...cellSx, borderRight: "none" }}>
                  <Chip label={row.residents} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ---- FOOTER BUTTONS ---- */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 2,
          mt: 3,
        }}
      >
        <Button
          variant="outlined"
          //onClick={() => navigate(-1)}
          sx={{
            height: 40,
            px: 3.5,
            borderRadius: "8px",
            textTransform: "none",
            fontSize: 14,
            fontWeight: 600,
            color: "#3182CE",
            border: "1.5px solid #3182CE",
            bgcolor: "#fff",
            "&:hover": { borderColor: "#9CA3AF", bgcolor: "#F9FAFB" },
          }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          disableElevation
          sx={{
            height: 40,
            px: 3.5,
            borderRadius: "8px",
            textTransform: "none",
            fontSize: 14,
            fontWeight: 600,
            bgcolor: T.blue,
            "&:hover": { bgcolor: "#0055CC" },
          }}
        >
          Add Patients
        </Button>
      </Box>
    </Box>
  );
}
