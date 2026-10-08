import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  IconButton,
  TextField,
  MenuItem,
  Select,
  FormControl,
  FormHelperText,
  Switch,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AddIcon from "@mui/icons-material/Add";
import {
  RPDeleteIcon,
  FileUploadOutlinedIcon,
} from "../assets/Assets";

/* ------------------------------------------------------------------ */
/* Design tokens                                                       */
/* ------------------------------------------------------------------ */

const T = {
  blue: "#2563EB",
  page: "#F7F9FC",
  border: "#C5C6CC",
  headBg: "#EBF1FE",
  headBorder: "#BED3FC",
  rowLine: "#EEF1F7",
};

const ICON_SIZE = { delete: 20, add: 16 };

/* ------------------------------------------------------------------ */
/* Validation                                                          */
/* ------------------------------------------------------------------ */

const PHONE_REGEX = /^\d{10}$/;
const PHONE_ERROR = "Enter a valid 10-digit number";

const REQUIRED_TEXT_FIELDS = {
  practiceName:    "Practice Name",
  practiceCode:    "Practice Short Code",
  npi:             "NPI",
  ein:             "EIN",
  sftpHost:        "SFTP Host",
  sftpUsername:    "SFTP Username",
  sftpPassword:    "SFTP Password",
  sftpPort:        "SFTP Port",
  practiceCodeField: "Practice Code",
  patientStatement: "Patient Statement Message",
  billingPhone:    "Billing Question Phone",
  extension:       "Extension",
};

const validateField = (name, value) => {
  const v = String(value ?? "").trim();
  if (!REQUIRED_TEXT_FIELDS[name]) return "";
  if (!v) return `${REQUIRED_TEXT_FIELDS[name]} is required`;
  if (name === "billingPhone" && !PHONE_REGEX.test(v)) return PHONE_ERROR;
  return "";
};

const ALL_REQUIRED = Object.fromEntries(
  Object.keys(REQUIRED_TEXT_FIELDS).map((k) => [k, ""]),
);

/* ------------------------------------------------------------------ */
/* Input / Select styles — matches AddNewPatient                       */
/* ------------------------------------------------------------------ */

const inputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    fontSize: 13,
    bgcolor: "#fff",
    "& input": { padding: "8px 12px", fontSize: 13, color: "#1E1E1E" },
    "& input::placeholder": { color: "#8F9098", opacity: 1 },
    "& .MuiOutlinedInput-notchedOutline": { borderColor: "#C5C6CC" },
    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#9CA3AF" },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#006FFD",
      borderWidth: "1.5px",
    },
    "&.Mui-error .MuiOutlinedInput-notchedOutline": { borderColor: "#EF4444" },
  },
  "& .MuiInputBase-root": { height: "42px" },
  "& .MuiFormHelperText-root": { fontSize: 11, mx: 0, mt: 0.4, color: "#EF4444" },
};

const selectSx = (error = false) => ({
  height: "42px",
  borderRadius: "8px",
  fontSize: 13,
  bgcolor: "#fff",
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: error ? "#EF4444" : "#C5C6CC",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: error ? "#EF4444" : "#9CA3AF",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: error ? "#EF4444" : "#006FFD",
    borderWidth: "1.5px",
  },
  "&.Mui-error .MuiOutlinedInput-notchedOutline": { borderColor: "#EF4444" },
  "& .MuiSelect-select": {
    padding: "0 !important",
    px: "12px !important",
    fontSize: 13,
    display: "flex",
    alignItems: "center",
    height: "42px",
    boxSizing: "border-box",
  },
  "& .MuiSvgIcon-root": { color: "#8F9098" },
});

const tblInputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "6px",
    fontSize: 12,
    bgcolor: "#fff",

    "& input": {
      py: "5px",
      px: "8px",
      fontSize: 12,
      color: "#1F2937",
    },

    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: T.border,
    },

    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#9CA3AF",
    },

    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#006FFD",
      borderWidth: "1.5px",
    },
  },

  "& .MuiFormHelperText-root": {
    display: "none",
  },
};

const tblSelectSx = {
  borderRadius: "6px",
  fontSize: 12,
  bgcolor: "#fff",

  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: T.border,
  },

  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#9CA3AF",
  },

  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#006FFD",
    borderWidth: "1.5px",
  },

  "& .MuiSelect-select": {
    py: "5px",
    px: "8px",
    fontSize: 12,
    color: "#1F2937",
  },

  "& .MuiSvgIcon-root": {
    color: "#8F9098",
    fontSize: 16,
  },
};

/* ------------------------------------------------------------------ */
/* Shared components                                                   */
/* ------------------------------------------------------------------ */

function Label({ children, required }) {
  return (
    <Typography sx={{ fontSize: 12, fontWeight: 700, color: "#000", mb: 0.6 }}>
      {children}
      {required && (
        <Box component="span" sx={{ color: "#EF4444", ml: 0.3 }}>*</Box>
      )}
    </Typography>
  );
}

function InputField({
  label, placeholder = "Type here", required,
  endIcon, value, onChange, onBlur, error, inputMode, maxLength,
}) {
  return (
    <Box>
      <Label required={required}>{label}</Label>
      <TextField
        fullWidth
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        error={!!error}
        helperText={error || ""}
        inputProps={{ inputMode, maxLength }}
        InputProps={
          endIcon
            ? { endAdornment: <InputAdornment position="end">{endIcon}</InputAdornment> }
            : undefined
        }
        sx={inputSx}
      />
    </Box>
  );
}

function SelectField({
  label, placeholder = "Select", options = [],
  required, value, onChange, onClose, error,
}) {
  return (
    <Box>
      <Label required={required}>{label}</Label>
      <FormControl fullWidth error={!!error}>
        <Select
          displayEmpty
          value={value ?? ""}
          onChange={onChange}
          onClose={onClose}
          sx={selectSx(!!error)}
          IconComponent={KeyboardArrowDownIcon}
          renderValue={(val) =>
            val ? (
              <span style={{ fontSize: 13, color: "#1E1E1E" }}>{val}</span>
            ) : (
              <span style={{ fontSize: 13, color: "#8F9098" }}>{placeholder}</span>
            )
          }
        >
          <MenuItem value="" sx={{ fontSize: 13, color: "#8F9098" }}>{placeholder}</MenuItem>
          {options.map((o) => (
            <MenuItem key={o} value={o} sx={{ fontSize: 13 }}>{o}</MenuItem>
          ))}
        </Select>
        {error && (
          <FormHelperText sx={{ fontSize: 11, mx: 0, mt: 0.4, color: "#EF4444" }}>
            {error}
          </FormHelperText>
        )}
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

function SectionBox({ children }) {
  return (
    <Box
      sx={{
        bgcolor: "#fff",
        borderRadius: "12px",
        border: "1px solid #E5E7EB",
        px: {
          xs: 2,
          sm: 3,
          md: 4,
        },
        py: {
          xs: 2,
          sm: 3,
        },
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
        fontSize: 18,
        fontWeight: 700,
        color: "#111827",
        mb: 2,
      }}
    >
      {children}
    </Typography>
  );
}

/* ------------------------------------------------------------------ */
/* Upload Box                                                          */
/* ------------------------------------------------------------------ */

function UploadBox({ label, hint }) {
  return (
    <Box
      sx={{
        border: "1.5px dashed #BED3FC",
        borderRadius: "8px",
        bgcolor: "#fff",
        px: 2,
        py: 1.5,
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        cursor: "pointer",

        "&:hover": {
          bgcolor: "#F4F8FF",
        },
      }}
    >
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          bgcolor: "#E6F1FE",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <FileUploadOutlinedIcon
          sx={{
            color: T.blue,
            fontSize: 20,
          }}
        />
      </Box>

      <Box>
        <Typography
          sx={{
            fontSize: 13,
            fontWeight: 700,
            color: "#111827",
          }}
        >
          {label}
        </Typography>

        <Typography
          sx={{
            fontSize: 11,
            color: "#8F9098",
            lineHeight: 1.4,
          }}
        >
          {hint}
        </Typography>
      </Box>
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* Address table rows                                                  */
/* ------------------------------------------------------------------ */

const addrRows = [
  {
    type: "Billing",
    addr1: "Prac1bill",
    addr2: "Prac2bill",
    zip: "15232-1545",
    city: "Washington",
    country: "USA",
    state: "Arizona",
    county: "Alpine",
    phone: "(599) 966-666",
    fax: "(120) 200-000",
    email: "billprac@ttest",
  },
  {
    type: "Mailing",
    addr1: "Prac1bill",
    addr2: "Prac2bill",
    zip: "15232-1545",
    city: "Washington",
    country: "USA",
    state: "Arizona",
    county: "Alpine",
    phone: "(599) 966-666",
    fax: "(120) 200-000",
    email: "billprac@ttest",
  },
  {
    type: "Billing",
    addr1: "Prac1bill",
    addr2: "Prac2bill",
    zip: "15232-1545",
    city: "Washington",
    country: "USA",
    state: "Arizona",
    county: "Alpine",
    phone: "(599) 966-666",
    fax: "(120) 200-000",
    email: "billprac@ttest",
  },
];

const addrCols = [
  "TYPE",
  "ADDRESS 1",
  "ADDRESS 2",
  "ZIP CODE",
  "CITY",
  "COUNTRY",
  "STATE",
  "COUNTY",
  "PHONE",
  "FAX",
  "E-MAIL",
  "ACTION",
];

const headCellSx = {
  bgcolor: T.headBg,
  fontSize: 10,
  fontWeight: 700,
  color: "#373B4D",
  borderBottom: "none",
  borderRight: `1px solid ${T.headBorder}`,
  py: 1,
  px: 1,
  whiteSpace: "nowrap",
  letterSpacing: "0.04em",
};

const bodyCellSx = {
  borderBottom: `1px solid ${T.rowLine}`,
  py: 0.8,
  px: 0.8,
  fontSize: 11,
  color: "#2E2E2E",
  whiteSpace: "nowrap",
};

/* ------------------------------------------------------------------ */
/* Main Page                                                           */
/* ------------------------------------------------------------------ */

export default function PracticeEdit() {
  const navigate = useNavigate();
  const { state: routeState } = useLocation();
  const row = routeState?.row ?? null;
  const isEdit = row !== null;

  const [active, setActive] = React.useState(row?.active ?? true);

  const [form, setForm] = React.useState({
    practiceName:      row?.practice  ?? "",
    practiceCode:      "",
    npi:               row?.npi       ?? "",
    ein:               "",
    sftpHost:          "",
    sftpUsername:      "",
    sftpPassword:      "",
    sftpPort:          "",
    practiceCodeField: "",
    patientStatement:  "",
    billingPhone:      row?.contact   ?? "",
    extension:         "",
  });

  const [touched, setTouched] = React.useState({});

  const set = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const setPhone = (field) => (e) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
    setForm((prev) => ({ ...prev, [field]: digits }));
  };

  const touch = (name) =>
    setTouched((prev) => (prev[name] ? prev : { ...prev, [name]: true }));

  const errorOf = (name) =>
    touched[name] ? validateField(name, form[name]) : "";

  const tx = (name) => ({
    value: form[name],
    onChange: name === "billingPhone" ? setPhone(name) : set(name),
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
    console.log("Practice data:", form);
  };

  return (
    <Box
      sx={{
        bgcolor: T.page,
        minHeight: "100vh",
        width: "100%",
        py: {
          xs: 2,
          md: 3,
        },
        px: {
          xs: 1.5,
          sm: 2,
          md: 2.5,
          lg: 2.5,
        },
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
            sx={{
              fontSize: { xs: 16, sm: 18, md: 20 },
              fontWeight: 700,
              color: "#111827",
            }}
          >
            {isEdit ? "Edit Practice" : "Add New Practice"}
          </Typography>
        </Box>

        {/* =========================================================
            SINGLE BOX
        ========================================================= */}

        <SectionBox>
          {/* Row 1 */}

          <FormGrid>
            <InputField label="Practice Name" required {...tx("practiceName")} />
            <InputField label="Practice Short Code" required {...tx("practiceCode")} />
            <InputField label="NPI" required {...tx("npi")} />
            <InputField label="EIN" required {...tx("ein")} />
          </FormGrid>

          {/* Row 2 */}

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "repeat(4, 1fr)",
              },
              gap: 2,
              mb: 2.5,
            }}
          >
            {/* Active */}

            <Box sx={{ minWidth: 0 }}>
              <Label>Active</Label>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  border: "1px solid #C5C6CC",
                  borderRadius: "8px",
                  px: "12px",
                  height: 42,
                  width: "100%",
                  bgcolor: "#fff",
                  boxSizing: "border-box",
                  "&:hover": { borderColor: "#9CA3AF" },
                }}
              >
                <Typography sx={{ fontSize: 13, color: "#1E1E1E" }}>
                  Active
                </Typography>

                <Switch
                  size="small"
                  checked={active}
                  onChange={(e) =>
                    setActive(e.target.checked)
                  }
                  sx={{
                    mr: -0.5,

                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: "#fff",
                    },

                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                      {
                        bgcolor: "#22C55E",
                        opacity: 1,
                      },

                    "& .MuiSwitch-track": {
                      borderRadius: 20,
                    },
                  }}
                />
              </Box>
            </Box>

            <InputField label="SFTP Host"  />
            <InputField label="SFTP Username"  />
            <InputField label="SFTP Password" />
          </Box>

          {/* Row 3 */}

          <FormGrid cols={4}>
            <InputField label="SFTP Port" required {...tx("sftpPort")} />
            <InputField label="Practice Code" required {...tx("practiceCodeField")} />
            <Box />
            <Box />
          </FormGrid>

          {/* Patient Statement */}

          <SectionTitle>
            Patient Statement
          </SectionTitle>

          <FormGrid cols={4}>
            <InputField label="Patient Statement Message"   />

            <InputField
              label="Billing Question Phone" required
              inputMode="numeric"
              maxLength={10}
              {...tx("billingPhone")}
            />

            <InputField label="Extension"  />

            <Box />
          </FormGrid>

          {/* Uploads */}

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
              },
              gap: 2,
            }}
          >
            <UploadBox
              label="Upload Practice Logo"
              hint="SVG, PNG, JPG or GIF (max. 800×400px)"
            />

            <UploadBox
              label="Upload Practice QR"
              hint="SVG, PNG, JPG or GIF (max. 800×400px)"
            />
          </Box>

          {/* Address Details */}

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
              mt: 4,
            }}
          >
            <SectionTitle>
              Address Details
            </SectionTitle>

            <IconButton
              size="small"
              sx={{
                bgcolor: "#E6F1FE",
                width: 28,
                height: 28,
                borderRadius: "50%",

                "&:hover": {
                  bgcolor: "#D0E4FC",
                },
              }}
            >
              <AddIcon
                sx={{
                  fontSize: ICON_SIZE.add,
                  color: T.blue,
                }}
              />
            </IconButton>
          </Box>

          {/* =======================================================
              ADDRESS TABLE
          ======================================================= */}

          <TableContainer
            sx={{
              width: "100%",
              border: `1px solid ${T.headBorder}`,
              borderRadius: "8px",
              overflowX: "auto",
            }}
          >
            <Table
              size="small"
              sx={{
                width: "100%",
                minWidth: 1100,
                tableLayout: "fixed",
                borderCollapse: "collapse",
              }}
            >
              <TableHead>
                <TableRow>
                  {addrCols.map((col, i) => (
                    <TableCell
                      key={col}
                      sx={{
                        ...headCellSx,
                        fontSize: 12,
                        fontWeight: 600,
                        padding: "6px 8px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        borderRight:
                          i === addrCols.length - 1
                            ? "none"
                            : `1px solid ${T.headBorder}`,
                      }}
                    >
                      {col}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {addrRows.map((row, i) => (
                  <TableRow
                    key={i}
                    hover
                    sx={{
                      "&:hover": {
                        bgcolor: "#FAFBFE",
                      },

                      "&:last-child td": {
                        borderBottom: "none",
                      },
                    }}
                  >
                    {/* TYPE */}

                    <TableCell
                      sx={{
                        ...bodyCellSx,
                        padding: "4px",
                      }}
                    >
                      <FormControl fullWidth size="small">
                        <Select
                          defaultValue={row.type}
                          sx={{
                            ...tblSelectSx,
                            "& .MuiSelect-select": {
                              padding: "5px 8px",
                              fontSize: 12,
                            },
                          }}
                          IconComponent={KeyboardArrowDownIcon}
                        >
                          {["Billing", "Mailing"].map((o) => (
                            <MenuItem key={o} value={o} sx={{ fontSize: 12 }}>
                              {o}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </TableCell>

                    {/* ADDRESS 1 */}
                    <TableCell sx={{ ...bodyCellSx, padding: "4px" }}>
                      <TextField size="small" fullWidth defaultValue={row.addr1}
                        sx={{ ...tblInputSx, "& .MuiInputBase-input": { fontSize: 12, padding: "5px 8px" } }}
                      />
                    </TableCell>

                    {/* ADDRESS 2 */}
                    <TableCell sx={{ ...bodyCellSx, padding: "4px" }}>
                      <TextField size="small" fullWidth defaultValue={row.addr2}
                        sx={{ ...tblInputSx, "& .MuiInputBase-input": { fontSize: 12, padding: "5px 8px" } }}
                      />
                    </TableCell>

                    {/* ZIP */}
                    <TableCell sx={{ ...bodyCellSx, padding: "4px" }}>
                      <TextField size="small" fullWidth defaultValue={row.zip}
                        sx={{ ...tblInputSx, "& .MuiInputBase-input": { fontSize: 12, padding: "5px 8px" } }}
                      />
                    </TableCell>

                    {/* CITY */}
                    <TableCell sx={{ ...bodyCellSx, padding: "4px" }}>
                      <TextField size="small" fullWidth defaultValue={row.city}
                        sx={{ ...tblInputSx, "& .MuiInputBase-input": { fontSize: 12, padding: "5px 8px" } }}
                      />
                    </TableCell>

                    {/* COUNTRY */}
                    <TableCell sx={{ ...bodyCellSx, padding: "4px" }}>
                      <TextField size="small" fullWidth defaultValue={row.country}
                        sx={{ ...tblInputSx, "& .MuiInputBase-input": { fontSize: 12, padding: "5px 8px" } }}
                      />
                    </TableCell>

                    {/* STATE */}
                    <TableCell sx={{ ...bodyCellSx, padding: "4px" }}>
                      <FormControl fullWidth size="small">
                        <Select
                          defaultValue={row.state}
                          sx={{ ...tblSelectSx, "& .MuiSelect-select": { padding: "5px 8px", fontSize: 12 } }}
                          IconComponent={KeyboardArrowDownIcon}
                        >
                          {["Arizona", "California", "Texas"].map((o) => (
                            <MenuItem key={o} value={o} sx={{ fontSize: 12 }}>{o}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </TableCell>

                    {/* COUNTY */}
                    <TableCell sx={{ ...bodyCellSx, padding: "4px" }}>
                      <FormControl fullWidth size="small">
                        <Select
                          defaultValue={row.county}
                          sx={{ ...tblSelectSx, "& .MuiSelect-select": { padding: "5px 8px", fontSize: 12 } }}
                          IconComponent={KeyboardArrowDownIcon}
                        >
                          {["Alpine", "Barry", "Clark"].map((o) => (
                            <MenuItem key={o} value={o} sx={{ fontSize: 12 }}>{o}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </TableCell>

                    {/* PHONE */}
                    <TableCell sx={{ ...bodyCellSx, padding: "4px" }}>
                      <TextField size="small" fullWidth defaultValue={row.phone}
                        sx={{ ...tblInputSx, "& .MuiInputBase-input": { fontSize: 12, padding: "5px 8px" } }}
                      />
                    </TableCell>

                    {/* FAX */}
                    <TableCell sx={{ ...bodyCellSx, padding: "4px" }}>
                      <TextField size="small" fullWidth defaultValue={row.fax}
                        sx={{ ...tblInputSx, "& .MuiInputBase-input": { fontSize: 12, padding: "5px 8px" } }}
                      />
                    </TableCell>

                    {/* E-MAIL */}
                    <TableCell sx={{ ...bodyCellSx, padding: "4px" }}>
                      <TextField size="small" fullWidth defaultValue={row.email}
                        sx={{ ...tblInputSx, "& .MuiInputBase-input": { fontSize: 12, padding: "5px 8px" } }}
                      />
                    </TableCell>

                    {/* ACTION */}

                    <TableCell
                      sx={{
                        ...bodyCellSx,
                        padding: "4px",
                        borderRight: "none",
                        textAlign: "center",
                      }}
                    >
                      <IconButton
                        size="small"
                        sx={{
                          p: 0.25,
                        }}
                      >
                        <RPDeleteIcon
                          width={ICON_SIZE.delete}
                          height={ICON_SIZE.delete}
                          color={T.blue}
                        />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </SectionBox>

        {/* =========================================================
            FOOTER BUTTONS
        ========================================================= */}

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column-reverse", sm: "row" },
            justifyContent: { xs: "stretch", sm: "flex-end" },
            gap: 1.5,
            pb: 3,
          }}
        >
          <Button
            variant="outlined"
            onClick={() => navigate(-1)}
            sx={{
              textTransform: "none",
              fontSize: 14,
              fontWeight: 500,
              borderRadius: "8px",
              color: "#015DFF",
              border: "1.5px solid #015DFF",
              px: 3,

              "&:hover": {
                borderColor: "#9CA3AF",
                bgcolor: "#F9FAFB",
              },
            }}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            disableElevation
            onClick={handleSave}
            sx={{
              textTransform: "none",
              fontSize: 14,
              fontWeight: 500,
              borderRadius: "8px",
              bgcolor: T.blue,
              px: 4,

              "&:hover": {
                bgcolor: "#1D4ED8",
              },
            }}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Box>
  );
}