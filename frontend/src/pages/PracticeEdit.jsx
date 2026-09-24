import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  IconButton,
  TextField,
  MenuItem,
  Select,
  FormControl,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AddIcon from "@mui/icons-material/Add";
import {
  RPDeleteIcon,
  FileUploadOutlinedIcon,
  PlusBlueIcon,
} from "../assets/Assets";

/* ------------------------------------------------------------------ */
/* Design tokens                                                        */
/* ------------------------------------------------------------------ */
const T = {
  blue: "#2563EB",
  page: "#F7F9FC",
  border: "#D5DCE8",
  headBg: "#EBF1FE",
  headBorder: "#BED3FC",
  rowLine: "#EEF1F7",
};

/* ------------------------------------------------------------------ */
/* Input / Select styles                                                */
/* ------------------------------------------------------------------ */
const inputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    fontSize: 12,
    bgcolor: "#fff",
    "& input": { py: "10px", px: "14px", fontSize: 12, color: "#1F2937" },
    "& input::placeholder": { color: "#8F9098", opacity: 1 },
    "& .MuiOutlinedInput-notchedOutline": { borderColor: T.border },
    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#9CA3AF" },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: T.blue,
      borderWidth: "1.5px",
    },
  },
  "& .MuiFormHelperText-root": { display: "none" },
};

const selectSx = {
  borderRadius: "8px",
  fontSize: 12,
  bgcolor: "#fff",
  "& .MuiOutlinedInput-notchedOutline": { borderColor: T.border },
  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#9CA3AF" },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: T.blue,
    borderWidth: "1.5px",
  },
  "& .MuiSelect-select": {
    py: "10px",
    px: "14px",
    fontSize: 12,
    color: "#8F9098",
  },
  "& .MuiSvgIcon-root": { color: "#8F9098" },
};

const tblInputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "6px",
    fontSize: 11,
    bgcolor: "#fff",
    "& input": { py: "5px", px: "8px", fontSize: 11, color: "#1F2937" },
    "& .MuiOutlinedInput-notchedOutline": { borderColor: T.border },
    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#9CA3AF" },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: T.blue,
      borderWidth: "1.5px",
    },
  },
  "& .MuiFormHelperText-root": { display: "none" },
};

const tblSelectSx = {
  borderRadius: "6px",
  fontSize: 11,
  bgcolor: "#fff",
  "& .MuiOutlinedInput-notchedOutline": { borderColor: T.border },
  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#9CA3AF" },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: T.blue,
    borderWidth: "1.5px",
  },
  "& .MuiSelect-select": {
    py: "5px",
    px: "8px",
    fontSize: 11,
    color: "#1F2937",
  },
  "& .MuiSvgIcon-root": { color: "#8F9098", fontSize: 16 },
};

/* ------------------------------------------------------------------ */
/* Shared components                                                    */
/* ------------------------------------------------------------------ */
function Label({ children, required }) {
  return (
    <Typography sx={{ fontSize: 12, fontWeight: 700, color: "#000", mb: 0.6 }}>
      {children}
      {required && (
        <Box component="span" sx={{ color: "red", ml: 0.3 }}>
          *
        </Box>
      )}
    </Typography>
  );
}

function InputField({ label, placeholder = "Type here", required }) {
  return (
    <Box>
      <Label required={required}>{label}</Label>
      <TextField
        fullWidth
        size="small"
        placeholder={placeholder}
        sx={inputSx}
      />
    </Box>
  );
}

function SelectField({
  label,
  placeholder = "Select",
  options = [],
  required,
}) {
  return (
    <Box>
      <Label required={required}>{label}</Label>
      <FormControl fullWidth size="small">
        <Select
          displayEmpty
          defaultValue=""
          sx={selectSx}
          IconComponent={KeyboardArrowDownIcon}
        >
          <MenuItem value="" sx={{ fontSize: 12, color: "#8F9098" }}>
            {placeholder}
          </MenuItem>
          {options.map((o) => (
            <MenuItem key={o} value={o} sx={{ fontSize: 12 }}>
              {o}
            </MenuItem>
          ))}
        </Select>
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
        px: { xs: 2, sm: 3, md: 4 },
        py: { xs: 2, sm: 3 },
      }}
    >
      {children}
    </Box>
  );
}

function SectionTitle({ children }) {
  return (
    <Typography sx={{ fontSize: 18, fontWeight: 700, color: "#111827", mb: 2 }}>
      {children}
    </Typography>
  );
}

/* ------------------------------------------------------------------ */
/* Upload Box                                                           */
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
        "&:hover": { bgcolor: "#F4F8FF" },
      }}
    >
      {/* Icon circle */}
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
        <FileUploadOutlinedIcon sx={{ color: T.blue, fontSize: 20 }} />
      </Box>
      <Box>
        <Typography sx={{ fontSize: 13, fontWeight: 700, color: "#111827" }}>
          {label}
        </Typography>
        <Typography sx={{ fontSize: 11, color: "#8F9098", lineHeight: 1.4 }}>
          {hint}
        </Typography>
      </Box>
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* Address table rows                                                   */
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
/* Main Page                                                            */
/* ------------------------------------------------------------------ */
export default function PracticeEdit() {
  const navigate = useNavigate();
  const [active, setActive] = React.useState(true);

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
        <Typography sx={{ fontSize: 28, fontWeight: 700, color: "#111827" }}>
          Edit Practice
        </Typography>

        {/* ══ SINGLE BOX ══ */}
        <SectionBox>
          {/* Row 1 */}
          <FormGrid>
            <InputField label="Practice Name" />
            <InputField label="Practice Short Code" />
            <InputField label="NPI" />
            <InputField label="EIN" />
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
            <Box>
              <Label>EIN</Label>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  border: `1px solid ${T.border}`,
                  borderRadius: "8px",
                  px: 1.5,
                  py: "5px",
                  bgcolor: "#fff",
                  height: "42px",
                  boxSizing: "border-box",
                }}
              >
                <Typography sx={{ fontSize: 12, color: "#8F9098" }}>
                  Active
                </Typography>
                <Switch
                  checked={active}
                  onChange={(e) => setActive(e.target.checked)}
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": { color: "#fff" },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      bgcolor: "#22C55E",
                      opacity: 1,
                    },
                    "& .MuiSwitch-track": { borderRadius: 20 },
                  }}
                />
              </Box>
            </Box>
            <InputField label="SFTP Host" />
            <InputField label="SFTP Username" />
            <InputField label="SFTP Password" />
          </Box>

          {/* Row 3 */}
          <FormGrid cols={4}>
            <InputField label="SFTP Port" />
            <InputField label="Practice Code" />
            <Box />
            <Box />
          </FormGrid>

          {/* Patient Statement */}
          <SectionTitle>Patient Statement</SectionTitle>

          <FormGrid cols={4}>
            <InputField label="Patient Statement Message" />
            <InputField label="Billing Question Phone" />
            <InputField label="Extension" />
            <Box />
          </FormGrid>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
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
            <SectionTitle>Address Details</SectionTitle>
            <IconButton
              size="small"
              sx={{
                bgcolor: "#E6F1FE",
                width: 36,
                height: 36,
                borderRadius: "50%",
                "&:hover": { bgcolor: "#D0E4FC" },
              }}
            >
              <AddIcon sx={{ fontSize: 20, color: T.blue }} />
            </IconButton>
          </Box>

          <TableContainer
            sx={{
              border: `1px solid ${T.headBorder}`,
              borderRadius: "8px",
              overflowX: "auto",
            }}
          >
            <Table
              size="small"
              sx={{
                tableLayout: "auto",
                borderCollapse: "collapse",
                minWidth: 900,
              }}
            >
              <TableHead>
                <TableRow>
                  {addrCols.map((col, i) => (
                    <TableCell
                      key={col}
                      sx={{
                        ...headCellSx,
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
                    sx={{ "&:hover": { bgcolor: "#FAFBFE" } }}
                  >
                    {/* TYPE — select */}
                    <TableCell sx={{ ...bodyCellSx, minWidth: 90 }}>
                      <FormControl fullWidth size="small">
                        <Select
                          defaultValue={row.type}
                          sx={tblSelectSx}
                          IconComponent={KeyboardArrowDownIcon}
                        >
                          {["Billing", "Mailing"].map((o) => (
                            <MenuItem key={o} value={o} sx={{ fontSize: 11 }}>
                              {o}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </TableCell>
                    {/* ADDRESS 1 */}
                    <TableCell sx={{ ...bodyCellSx, minWidth: 90 }}>
                      <TextField
                        size="small"
                        defaultValue={row.addr1}
                        sx={tblInputSx}
                      />
                    </TableCell>
                    {/* ADDRESS 2 */}
                    <TableCell sx={{ ...bodyCellSx, minWidth: 90 }}>
                      <TextField
                        size="small"
                        defaultValue={row.addr2}
                        sx={tblInputSx}
                      />
                    </TableCell>
                    {/* ZIP */}
                    <TableCell sx={{ ...bodyCellSx, minWidth: 90 }}>
                      <TextField
                        size="small"
                        defaultValue={row.zip}
                        sx={tblInputSx}
                      />
                    </TableCell>
                    {/* CITY */}
                    <TableCell sx={{ ...bodyCellSx, minWidth: 90 }}>
                      <TextField
                        size="small"
                        defaultValue={row.city}
                        sx={tblInputSx}
                      />
                    </TableCell>
                    {/* COUNTRY */}
                    <TableCell sx={{ ...bodyCellSx, minWidth: 60 }}>
                      <Typography sx={{ fontSize: 11, color: "#2E2E2E" }}>
                        {row.country}
                      </Typography>
                    </TableCell>
                    {/* STATE — select */}
                    <TableCell sx={{ ...bodyCellSx, minWidth: 90 }}>
                      <FormControl fullWidth size="small">
                        <Select
                          defaultValue={row.state}
                          sx={tblSelectSx}
                          IconComponent={KeyboardArrowDownIcon}
                        >
                          {["Arizona", "California", "Texas"].map((o) => (
                            <MenuItem key={o} value={o} sx={{ fontSize: 11 }}>
                              {o}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </TableCell>
                    {/* COUNTY — select */}
                    <TableCell sx={{ ...bodyCellSx, minWidth: 90 }}>
                      <FormControl fullWidth size="small">
                        <Select
                          defaultValue={row.county}
                          sx={tblSelectSx}
                          IconComponent={KeyboardArrowDownIcon}
                        >
                          {["Alpine", "Barry", "Clark"].map((o) => (
                            <MenuItem key={o} value={o} sx={{ fontSize: 11 }}>
                              {o}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </TableCell>
                    {/* PHONE */}
                    <TableCell sx={{ ...bodyCellSx, minWidth: 100 }}>
                      <Typography sx={{ fontSize: 11, color: "#2E2E2E" }}>
                        {row.phone}
                      </Typography>
                    </TableCell>
                    {/* FAX */}
                    <TableCell sx={{ ...bodyCellSx, minWidth: 100 }}>
                      <Typography sx={{ fontSize: 11, color: "#2E2E2E" }}>
                        {row.fax}
                      </Typography>
                    </TableCell>
                    {/* E-MAIL */}
                    <TableCell sx={{ ...bodyCellSx, minWidth: 110 }}>
                      <Typography sx={{ fontSize: 11, color: "#2E2E2E" }}>
                        {row.email}
                      </Typography>
                    </TableCell>
                    {/* ACTION */}
                    <TableCell sx={{ ...bodyCellSx, borderRight: "none" }}>
                      <IconButton size="small">
                        <RPDeleteIcon width={20} height={20} color="#2563EB" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </SectionBox>

        {/* ══ FOOTER BUTTONS ══ */}
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", gap: 1.5, pb: 3 }}
        >
          <Button
            variant="outlined"
            onClick={() => navigate(-1)}
            sx={{
              textTransform: "none",
              fontSize: 14,
              fontWeight: 600,
              borderRadius: "8px",
              color: "#374151",
              borderColor: "#D1D5DB",
              px: 3,
              "&:hover": { borderColor: "#9CA3AF", bgcolor: "#F9FAFB" },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            disableElevation
            sx={{
              textTransform: "none",
              fontSize: 14,
              fontWeight: 600,
              borderRadius: "8px",
              bgcolor: T.blue,
              px: 4,
              "&:hover": { bgcolor: "#1D4ED8" },
            }}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
