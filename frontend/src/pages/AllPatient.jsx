import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Checkbox,
  Button,
  IconButton,
  InputBase,
  Tooltip,
} from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";

import {
  EyeRedIcon,
  EyeBlueIcon,
  RecordsIcon,
  OrdersIcon,
  MicIcon,
  NoteEditIcon,
  NoteEditRedIcon,
  MailSendIcon,
  MoreIcon,
  FilterIcon,
  ExportIcon,
  SearchGlassIcon,
} from "../assets/Assets";

/* ------------------------------------------------------------------ */
/* Design tokens                                                       */
/* ------------------------------------------------------------------ */

const T = {
  blue: "#2563EB",
  red: "#FF6B6B",
  redSoft: "#FFE9E9",

  title: "#1E293B",

  /* Table header */
  headText: "#373B4D",
  headSymbol: "#52525B",

  bodyText: "#475569",
  muted: "#64748B",

  /* Table column data */
  nameText: "#2E2E2E",
  locationText: "#282C36",
  mrnText: "#282C36",
  dobText: "#535862",

  /* Physician */
  physicianText: "#128584",
  physicianBg: "#E8F8F5",

  border: "#BED3FC",
  rowLine: "#EEF1F7",

  headBg: "#EBF1FE",

  chipBg: "#DFF4EC",
  chipBorder: "#CBEBDF",
  chipText: "#2E8B6F",

  fieldBorder: "#D5DCE8",

  page: "#F7F9FC",
};

/* ------------------------------------------------------------------ */
/* Table columns                                                       */
/* ------------------------------------------------------------------ */

const COLUMNS = [
  {
    id: "name",
    label: "Name, Age (Gender)",
    width: "22%",
  },
  {
    id: "location",
    label: "Location",
    width: "15%",
    adornment: "menu",
  },
  {
    id: "mrn",
    label: "MRN\n(Patient ID)",
    width: "15%",
  },
  {
    id: "dob",
    label: "DOB",
    width: "15%",
    adornment: "sort",
  },
  {
    id: "physician",
    label: "Physician",
    width: "16%",
    adornment: "menu",
  },
  {
    id: "actions",
    label: "Actions",
    width: "17%",
    noWrap: true,
  },
];

/* ------------------------------------------------------------------ */
/* Row actions                                                         */
/* ------------------------------------------------------------------ */

const ROW_ACTIONS = [
  {
    id: "records",
    title: "Patient record",
    Icon: RecordsIcon,
  },
  {
    id: "orders",
    title: "Orders",
    Icon: OrdersIcon,
  },
  {
    id: "dictate",
    title: "Dictate note",
    Icon: MicIcon,
  },
  {
    id: "note",
    title: "Edit note",
    Icon: NoteEditIcon,
  },
  {
    id: "message",
    title: "Send message",
    Icon: MailSendIcon,
  },
];

/* ------------------------------------------------------------------ */
/* Dummy rows                                                          */
/* ------------------------------------------------------------------ */

const createRows = (count = 12) =>
  Array.from({ length: count }, (_, i) => ({
    id: i,

    name: "Lisha Cook 45y (F)",

    location: "GCH–IH",

    mrn: "719471345",

    patientId: "ID: NA",

    dob: "11/20/2025",

    physician: "Julia R",

    alert: i === 0,
  }));

/* ------------------------------------------------------------------ */
/* Search Field                                                        */
/* ------------------------------------------------------------------ */

function SearchField({ value, onChange }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        height: 36,
        width: "100%",
        minWidth: 0,
        px: 1.5,
        bgcolor: "#fff",
        border: `1px solid ${T.fieldBorder}`,
        borderRadius: "8px",
        boxSizing: "border-box",
        transition: "border-color .15s ease",

        "&:focus-within": {
          borderColor: T.blue,
        },
      }}
    >
      <SearchGlassIcon />

      <InputBase
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search patients by name or MRN..."
        inputProps={{
          "aria-label": "Search patients by name or MRN",
        }}
        sx={{
          flex: 1,
          minWidth: 0,
          fontSize: 13.5,
          color: "#171923",

          "& input": {
            minWidth: 0,
          },

          "& input::placeholder": {
            color: "#171923",
            opacity: 1,
          },
        }}
      />
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* Button styles                                                       */
/* ------------------------------------------------------------------ */

const outlinedActionSx = {
  height: 36,
  px: 1.5,
  gap: 0.6,
  borderRadius: "8px",
  textTransform: "none",
  fontSize: 13.5,
  fontWeight: 500,
  color: T.blue,
  border: "1.25px solid #BFD3F7",
  bgcolor: "#fff",
  whiteSpace: "nowrap",
  flexShrink: 0,

  "&:hover": {
    borderColor: T.blue,
    bgcolor: "#F4F8FF",
  },

  "& .MuiButton-startIcon": {
    mr: 0,
    ml: 0,
  },
};

/* ------------------------------------------------------------------ */
/* Toolbar                                                             */
/* ------------------------------------------------------------------ */

function Toolbar({ query, onQueryChange, onAddNewPatient }) {
  return (
    <Box
      sx={{
        width: "100%",
        display: "grid",

        gridTemplateColumns: {
          xs: "1fr",
          sm: "auto minmax(220px, 1fr)",
          md: "auto minmax(240px, 1fr) auto",
        },

        alignItems: "center",

        columnGap: {
          xs: 1.5,
          sm: 2,
          md: 4,
        },

        rowGap: 1.5,

        pb: 2,

        boxSizing: "border-box",
      }}
    >
      {/* ALL PATIENTS */}

      <Typography
        sx={{
          fontSize: 20,
          fontWeight: 700,
          color: "#171923",
          letterSpacing: "-0.2px",
          whiteSpace: "nowrap",
          lineHeight: 1,
        }}
      >
        All Patients
      </Typography>

      {/* SEARCH */}

      <Box
        sx={{
          width: "100%",
          minWidth: 0,

          gridColumn: {
            xs: "1 / -1",
            sm: "2 / 3",
            md: "2 / 3",
          },

          gridRow: {
            xs: 2,
            sm: 1,
            md: 1,
          },
        }}
      >
        <SearchField
          value={query}
          onChange={onQueryChange}
        />
      </Box>

      {/* BUTTONS */}

      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{
          minWidth: 0,
          flexShrink: 0,

          gridColumn: {
            xs: "1 / -1",
            sm: "1 / -1",
            md: "3 / 4",
          },

          gridRow: {
            xs: 3,
            sm: 2,
            md: 1,
          },

          justifyContent: {
            xs: "flex-start",
            sm: "flex-end",
            md: "flex-end",
          },

          flexWrap: {
            xs: "wrap",
            sm: "nowrap",
            md: "nowrap",
          },

          rowGap: 1,
        }}
      >
        {/* FILTER */}

        <Button
          variant="outlined"
          startIcon={<FilterIcon />}
          sx={outlinedActionSx}
        >
          Filter
        </Button>

        {/* EXPORT */}

        <Button
          variant="outlined"
          startIcon={<ExportIcon />}
          sx={{
            ...outlinedActionSx,

            border: "1.25px dashed #BFD3F7",

            "&:hover": {
              borderColor: T.blue,
              bgcolor: "#F4F8FF",
            },
          }}
        >
          Export
        </Button>

        {/* ADD NEW PATIENT */}

        <Button
          variant="contained"
          disableElevation
          onClick={onAddNewPatient}
          sx={{
            height: 36,
            px: 2.25,
            borderRadius: "8px",
            textTransform: "none",
            fontSize: 14,
            fontWeight: 600,
            bgcolor: T.blue,
            whiteSpace: "nowrap",
            flexShrink: 0,

            "&:hover": {
              bgcolor: "#1D4ED8",
            },
          }}
        >
          Add New Patient
        </Button>
      </Stack>
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* Common table cell style                                             */
/* ------------------------------------------------------------------ */

const cellSx = {
  borderBottom: `1px solid ${T.rowLine}`,

  py: 1.05,
  px: 1,

  fontSize: 12.5,
  color: T.bodyText,

  boxSizing: "border-box",
};

/* ------------------------------------------------------------------ */
/* Header Cell                                                         */
/* ------------------------------------------------------------------ */

function HeaderCell({ column, isLast }) {
  return (
    <TableCell
      sx={{
        ...cellSx,

        width: column.width,

        py: 1.3,

        bgcolor: T.headBg,

        borderRight: isLast
          ? "none"
          : `1px solid ${T.border}`,

        /* No bottom stroke in header */
        borderBottom: "none",

        fontSize: 15,
        fontWeight: 700,
        color: T.headText,

        whiteSpace: column.noWrap
          ? "nowrap"
          : "pre-line",

        lineHeight: 1.25,

        boxSizing: "border-box",

        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 0.8,
          minWidth: 0,
          width: "100%",
        }}
      >
        <Box
          component="span"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            minWidth: 0,

            whiteSpace: column.noWrap
              ? "nowrap"
              : "pre-line",
          }}
        >
          {column.label}
        </Box>

        {/* HEADER SYMBOLS */}

        {column.adornment === "menu" && (
          <KeyboardArrowDownIcon
            sx={{
              fontSize: 18,
              color: T.headSymbol,
              flexShrink: 0,
              ml: "auto",
            }}
          />
        )}

        {column.adornment === "sort" && (
          <UnfoldMoreIcon
            sx={{
              fontSize: 18,
              color: T.headSymbol,
              flexShrink: 0,
              ml: "auto",
            }}
          />
        )}
      </Box>
    </TableCell>
  );
}

/* ------------------------------------------------------------------ */
/* Physician Chip                                                      */
/* ------------------------------------------------------------------ */

function PhysicianChip({ label }) {
  return (
    <Box
      sx={{
        display: "block",
        width: "100%",

        bgcolor: T.physicianBg,

        border: `1px solid ${T.physicianBg}`,

        borderRadius: "4px",

        px: 0.8,
        py: 0.35,

        fontSize: 12.5,
        color: T.physicianText,

        boxSizing: "border-box",

        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* Icon button                                                         */
/* ------------------------------------------------------------------ */

const iconButtonSx = {
  p: 0.35,

  width: 27,
  height: 27,
  minWidth: 27,

  flexShrink: 0,

  borderRadius: "50%",

  "&:hover": {
    bgcolor: "#EDF3FE",
  },
};

/* ------------------------------------------------------------------ */
/* View Action                                                         */
/* ------------------------------------------------------------------ */

function ViewAction({ alert }) {
  return (
    <Tooltip title="View chart" arrow>
      <IconButton
        aria-label="View chart"
        sx={{
          ...iconButtonSx,

          width: alert ? 29 : 27,
          height: alert ? 29 : 27,
          minWidth: alert ? 29 : 27,

          bgcolor: alert
            ? T.redSoft
            : "transparent",

          "&:hover": {
            bgcolor: alert
              ? "#FFDCDC"
              : "#EDF3FE",
          },
        }}
      >
        {alert ? (
          <EyeRedIcon />
        ) : (
          <EyeBlueIcon />
        )}
      </IconButton>
    </Tooltip>
  );
}

/* ------------------------------------------------------------------ */
/* Row Actions                                                         */
/* ------------------------------------------------------------------ */

function RowActions({ alert }) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="flex-end"
      spacing={0.7}
      sx={{
        width: "100%",
        minWidth: 0,
        whiteSpace: "nowrap",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <ViewAction alert={alert} />

      {ROW_ACTIONS.map(
        ({ id, title, Icon }) => {
          const useRedNote =
            alert && id === "note";

          const ActiveIcon = useRedNote
            ? NoteEditRedIcon
            : Icon;

          return (
            <Tooltip
              key={id}
              title={title}
              arrow
            >
              <IconButton
                aria-label={title}
                sx={{
                  ...iconButtonSx,

                  ...(useRedNote && {
                    width: 29,
                    height: 29,
                    minWidth: 29,

                    bgcolor: T.redSoft,

                    "&:hover": {
                      bgcolor: "#FFDCDC",
                    },
                  }),
                }}
              >
                <ActiveIcon />
              </IconButton>
            </Tooltip>
          );
        }
      )}

      <Tooltip
        title="More options"
        arrow
      >
        <IconButton
          aria-label="More options"
          sx={iconButtonSx}
        >
          <MoreIcon />
        </IconButton>
      </Tooltip>
    </Stack>
  );
}

/* ------------------------------------------------------------------ */
/* Checkbox                                                            */
/* ------------------------------------------------------------------ */

const checkboxSx = {
  p: 0,

  color: "#C3CBD9",

  "&.Mui-checked": {
    color: T.blue,
  },

  "& .MuiSvgIcon-root": {
    fontSize: 18,
  },
};

/* ------------------------------------------------------------------ */
/* Patient Row                                                         */
/* ------------------------------------------------------------------ */

function PatientRow({
  row,
  selected,
  onToggle,
}) {
  return (
    <TableRow
      hover
      sx={{
        "&:hover": {
          bgcolor: "#FAFBFE",
        },
      }}
    >
      {/* CHECKBOX */}

      <TableCell
        padding="checkbox"
        sx={{
          ...cellSx,

          width: "4%",
          minWidth: 38,
          maxWidth: 42,

          pl: 0.4,
          pr: 0.2,

          textAlign: "center",

          boxSizing: "border-box",
        }}
      >
        <Checkbox
          checked={selected}
          onChange={() =>
            onToggle(row.id)
          }
          inputProps={{
            "aria-label": `Select ${row.name}`,
          }}
          sx={checkboxSx}
        />
      </TableCell>

      {/* NAME */}

      <TableCell
        sx={{
          ...cellSx,

          width: "22%",

          color: T.nameText,

          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {row.name}
      </TableCell>

      {/* LOCATION */}

      <TableCell
        sx={{
          ...cellSx,

          width: "10%",

          color: T.locationText,

          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {row.location}
      </TableCell>

      {/* MRN */}

      <TableCell
        sx={{
          ...cellSx,

          width: "12%",

          color: T.mrnText,

          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        <Box
          sx={{
            lineHeight: 1.35,

            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {row.mrn}
        </Box>

        <Box
          sx={{
            lineHeight: 1.35,

            color: T.mrnText,

            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {row.patientId}
        </Box>
      </TableCell>

      {/* DOB */}

      <TableCell
        sx={{
          ...cellSx,

          width: "10%",

          color: T.dobText,

          whiteSpace: "nowrap",
        }}
      >
        {row.dob}
      </TableCell>

      {/* PHYSICIAN */}

      <TableCell
        sx={{
          ...cellSx,

          width: "12%",

          overflow: "hidden",
        }}
      >
        <PhysicianChip
          label={row.physician}
        />
      </TableCell>

      {/* ACTIONS */}

      <TableCell
        sx={{
          ...cellSx,

          width: "30%",

          whiteSpace: "nowrap",

          pl: 0.5,
          pr: 1,

          overflow: "hidden",

          borderRight: "none",

          boxSizing: "border-box",
        }}
      >
        <RowActions
          alert={row.alert}
        />
      </TableCell>
    </TableRow>
  );
}

/* ------------------------------------------------------------------ */
/* Patients Table                                                      */
/* ------------------------------------------------------------------ */

function PatientsTable({
  rows,
  selected,
  onToggleRow,
  onToggleAll,
}) {
  const allSelected =
    rows.length > 0 &&
    selected.length === rows.length;

  const someSelected =
    selected.length > 0 &&
    !allSelected;

  return (
    <TableContainer
      sx={{
        width: "100%",
        maxWidth: "100%",

        border: `1px solid ${T.border}`,

        borderRadius: "8px",

        bgcolor: "#fff",

        overflowX: "auto",
        overflowY: "hidden",

        boxSizing: "border-box",
      }}
    >
      <Table
        sx={{
          width: "100%",
          minWidth: 0,

          tableLayout: "auto",

          borderCollapse: "collapse",

          boxSizing: "border-box",

          "& th, & td": {
            boxSizing: "border-box",
          },
        }}
        size="small"
        aria-label="All patients"
      >
        <TableHead>
          <TableRow>
            {/* HEADER CHECKBOX */}

            <TableCell
              padding="checkbox"
              sx={{
                ...cellSx,

                width: "4%",
                minWidth: 38,
                maxWidth: 42,

                pl: 0.4,
                pr: 0.2,

                bgcolor: T.headBg,

                borderRight: `1px solid ${T.border}`,

                borderBottom: "none",

                textAlign: "center",

                boxSizing: "border-box",
              }}
            >
              <Checkbox
                checked={allSelected}
                indeterminate={someSelected}
                onChange={onToggleAll}
                inputProps={{
                  "aria-label":
                    "Select all patients",
                }}
                sx={checkboxSx}
              />
            </TableCell>

            {/* OTHER HEADERS */}

            {COLUMNS.map(
              (column, index) => (
                <HeaderCell
                  key={column.id}
                  column={column}
                  isLast={
                    index ===
                    COLUMNS.length - 1
                  }
                />
              )
            )}
          </TableRow>
        </TableHead>

        {/* BODY */}

        <TableBody>
          {rows.map((row) => (
            <PatientRow
              key={row.id}
              row={row}
              selected={selected.includes(
                row.id
              )}
              onToggle={onToggleRow}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

/* ------------------------------------------------------------------ */
/* Main Page                                                           */
/* ------------------------------------------------------------------ */

export default function AllPatients() {
  const navigate = useNavigate();

  const [query, setQuery] =
    React.useState("");

  const [selected, setSelected] =
    React.useState([]);

  const rows = React.useMemo(
    () => createRows(12),
    []
  );

  /* ---------------------------------------------------------------- */
  /* Search                                                            */
  /* ---------------------------------------------------------------- */

  const visibleRows =
    React.useMemo(() => {
      const q = query
        .trim()
        .toLowerCase();

      if (!q) {
        return rows;
      }

      return rows.filter(
        (r) =>
          r.name
            .toLowerCase()
            .includes(q) ||
          r.mrn.includes(q)
      );
    }, [rows, query]);

  /* ---------------------------------------------------------------- */
  /* Toggle row                                                        */
  /* ---------------------------------------------------------------- */

  const toggleRow = (id) =>
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter(
            (x) => x !== id
          )
        : [...prev, id]
    );

  /* ---------------------------------------------------------------- */
  /* Toggle all                                                        */
  /* ---------------------------------------------------------------- */

  const toggleAll = (event) =>
    setSelected(
      event.target.checked
        ? visibleRows.map(
            (r) => r.id
          )
        : []
    );

  /* ---------------------------------------------------------------- */
  /* Navigation                                                        */
  /* ---------------------------------------------------------------- */

  const handleAddNewPatient = () => {
    navigate("/add-new-patient");
  };

  /* ---------------------------------------------------------------- */
  /* Page                                                              */
  /* ---------------------------------------------------------------- */

  return (
    <Box
      sx={{
        bgcolor: T.page,

        minHeight: "100vh",

        width: "100%",

        py: {
          xs: 1.5,
          sm: 2,
          md: 2,
        },

        px: {
          xs: 1.5,
          sm: 3,
          md: 5,
          lg: 7,
          xl: 8,
        },

        overflowX: "hidden",

        boxSizing: "border-box",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: "none",
          mx: 0,
          bgcolor: "transparent",
        }}
      >
        {/* COMMON CONTENT CONTAINER */}

        <Box
          sx={{
            width: "100%",
            maxWidth: "100%",
            boxSizing: "border-box",
          }}
        >
          {/* TOOLBAR */}

          <Toolbar
            query={query}
            onQueryChange={setQuery}
            onAddNewPatient={handleAddNewPatient}
          />

          {/* TABLE */}

          <Box
            sx={{
              width: "100%",
              maxWidth: "100%",
              pb: 3,
              boxSizing: "border-box",
            }}
          >
            <PatientsTable
              rows={visibleRows}
              selected={selected}
              onToggleRow={toggleRow}
              onToggleAll={toggleAll}
            />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}