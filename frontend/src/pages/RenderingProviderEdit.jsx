import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  MenuItem,
  Select,
  FormControl,
  FormHelperText,
  Switch,
  Popover,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import {
  RPAddIcon,
  RPDeleteIcon,
  CalendarIcon,
} from "../assets/Assets";

/* ------------------------------------------------------------------ */
/* Design tokens                                                       */
/* ------------------------------------------------------------------ */

const T = {
  blue: "#2563EB",
  page: "#F7F9FC",
  border: "#D5DCE8",
  labelColor: "#000",
};

const ICON_SIZE = {
  delete: 20,
  add: 14,
};

/* ------------------------------------------------------------------ */
/* Dropdown options                                                    */
/* ------------------------------------------------------------------ */

const OPTIONS = {
  sex: ["Male", "Female", "Other"],
  suffix: ["Jr.", "Sr.", "III"],
  prefix: ["Dr.", "Mr.", "Ms."],
  practice: ["Fresh Original", "Hitex", "Balance Report"],
  address2: ["Suite 100", "Apt 2B", "Floor 3"],
  country: ["United States", "Canada", "India"],
  state: ["California", "Texas", "New York"],
  fax: ["8475875747", "8475875748", "8475875749"],
  email: [
    "lipsum@gmail.com",
    "provider@gmail.com",
    "info@gmail.com",
  ],
  specialty: ["Cardiology", "Neurology", "Orthopedics"],
};

/* ------------------------------------------------------------------ */
/* Validation                                                          */
/* ------------------------------------------------------------------ */

const PHONE_REGEX = /^\d{10}$/;
const PHONE_ERROR = "Enter a valid 10-digit number";

/* All required text/phone fields → label shown in error messages */
const REQUIRED_TEXT_FIELDS = {
  firstName:      "First Name",
  lastName:       "Last Name",
  dateOfBirth:    "Date of Birth",
  npi:            "National Provider Identifier",
  stateLicense:   "State License Number",
  mobilePhone:    "Mobile Phone",
  phone:          "Phone",
  taxonomy:       "Taxonomy",
};

/* Required select fields → label shown in error messages */
const REQUIRED_SELECT_FIELDS = {
  sex:       "Sex",
  practice:  "Practice",
  fax:       "Fax",
  email:     "E-mail",
  specialty: "Specialty",
};

const validateField = (name, value) => {
  const v = String(value ?? "").trim();
  if (REQUIRED_TEXT_FIELDS[name]) {
    if (!v) return `${REQUIRED_TEXT_FIELDS[name]} is required`;
    if ((name === "mobilePhone" || name === "phone") && !PHONE_REGEX.test(v))
      return PHONE_ERROR;
  }
  if (REQUIRED_SELECT_FIELDS[name]) {
    if (!v) return `${REQUIRED_SELECT_FIELDS[name]} is required`;
  }
  return "";
};

const ALL_REQUIRED = {
  ...Object.fromEntries(Object.keys(REQUIRED_TEXT_FIELDS).map((k) => [k, ""])),
  ...Object.fromEntries(Object.keys(REQUIRED_SELECT_FIELDS).map((k) => [k, ""])),
};

/* ------------------------------------------------------------------ */
/* Input styles                                                        */
/* ------------------------------------------------------------------ */

const inputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    fontSize: 13,
    bgcolor: "#fff",

    "& input": {
      padding: "8px 12px",
      fontSize: 13,
      color: "#1E1E1E",
    },

    "& input::placeholder": {
      color: "#8F9098",
      opacity: 1,
    },

    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#C5C6CC",
    },

    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#9CA3AF",
    },

    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#006FFD",
      borderWidth: "1.5px",
    },

    "&.Mui-error .MuiOutlinedInput-notchedOutline": {
      borderColor: "#EF4444",
    },
  },

  "& .MuiInputBase-root": { height: "42px" },

  "& .MuiFormHelperText-root": {
    fontSize: 11,
    mx: 0,
    mt: 0.4,
    color: "#EF4444",
  },
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

  "&.Mui-error .MuiOutlinedInput-notchedOutline": {
    borderColor: "#EF4444",
  },

  "& .MuiSelect-select": {
    padding: "0 !important",
    px: "12px !important",
    fontSize: 13,
    display: "flex",
    alignItems: "center",
    height: "42px",
    boxSizing: "border-box",
  },

  "& .MuiSvgIcon-root": {
    color: "#8F9098",
  },
});

/* ------------------------------------------------------------------ */
/* Shared components                                                   */
/* ------------------------------------------------------------------ */

function Label({ children, required }) {
  return (
    <Typography
      sx={{
        fontSize: 12,
        fontWeight: 600,
        color: T.labelColor,
        mb: 0.5,
      }}
    >
      {children}

      {required && (
        <Box
          component="span"
          sx={{
            color: "#EF4444",
            ml: 0.3,
          }}
        >
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
  onChange,
  onBlur,
  error,
  inputMode,
  maxLength,
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
        inputProps={{
          inputMode,
          maxLength,
        }}
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
  value,
  onChange,
  onClose,
  error,
}) {
  return (
    <Box>
      <Label required={required}>{label}</Label>

      <FormControl fullWidth error={!!error}>
        <Select
          displayEmpty
          value={value}
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
          <MenuItem value="" sx={{ fontSize: 13, color: "#8F9098" }}>
            {placeholder}
          </MenuItem>

          {options.map((o) => (
            <MenuItem key={o} value={o} sx={{ fontSize: 13 }}>
              {o}
            </MenuItem>
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

/* ------------------------------------------------------------------ */
/* Date field                                                          */
/* ------------------------------------------------------------------ */

function DateField({
  label,
  value,
  onChange,
  onBlur,
  required,
  error,
  placeholder = "MM-DD-YYYY",
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClose = () => {
    setAnchorEl(null);
    if (onBlur) onBlur();
  };

  const handleDateChange = (newVal) => {
    if (newVal) {
      onChange({
        target: {
          value: newVal.format("MM-DD-YYYY"),
        },
      });
    }

    handleClose();
  };

  const parsed = value ? dayjs(value, "MM-DD-YYYY") : null;
  const parsedValue = parsed && parsed.isValid() ? parsed : null;

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
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end" sx={{ mr: "-4px" }}>
                <IconButton
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                  aria-label="Open calendar"
                  sx={{
                    p: "4px",
                    "&:hover": { background: "transparent" },
                  }}
                  disableRipple
                >
                  <CalendarIcon width={14} height={16} color="#1E1E1E" />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
        sx={{
          ...inputSx,
          "& .MuiFormHelperText-root": {
            fontSize: 11,
            mx: 0,
            mt: 0.4,
            color: "#EF4444",
          },
        }}
      />

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
            mt: 0.5,
          },
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            value={parsedValue}
            onChange={handleDateChange}
            disableFuture
            sx={{
              width: { xs: "280px", sm: "320px" },
              "& .MuiPickersDay-root.Mui-selected": { backgroundColor: "#015DFF" },
              "& .MuiPickersDay-root:hover": { backgroundColor: "#EEF4FF" },
            }}
          />
        </LocalizationProvider>
      </Popover>
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* Form Grid                                                           */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/* Section Title                                                       */
/* ------------------------------------------------------------------ */

function SectionTitle({ children }) {
  return (
    <Typography
      sx={{
        fontSize: 14,
        fontWeight: 700,
        letterSpacing: "0.09em",
        color: "#111827",
        textTransform: "uppercase",
        mb: 2,
      }}
    >
      {children}
    </Typography>
  );
}

/* ------------------------------------------------------------------ */
/* Section Box                                                         */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/* Main Page                                                           */
/* ------------------------------------------------------------------ */

export default function ReferringProviderEdit() {
  const navigate = useNavigate();
  const { state: routeState } = useLocation();
  const row = routeState?.row ?? null;
  const isEdit = row !== null;

  const [pcp, setPcp] = React.useState(true);

  const [form, setForm] = React.useState({
    firstName:           row?.providerName?.split(" ")[0] ?? "",
    lastName:            row?.providerName?.split(" ").slice(1).join(" ") ?? "",
    dateOfBirth:         "",
    sex:                 "",
    suffix:              "",
    prefix:              "",
    npi:                 row?.npi        ?? "",
    groupNpi:            "",
    stateLicense:        "",
    controlledSubstance: "",
    dea:                 "",
    practice:            row?.practice   ?? "",
    addressType:         "",
    address1:            row?.address    ?? "",
    address2:            "",
    zipCode:             "",
    city:                "",
    country:             "",
    state:               "",
    mobilePhone:         row?.mobile     ?? "",
    workContact:         "",
    phone:               "",
    fax:                 row?.fax        ?? "",
    email:               row?.email      ?? "",
    specialty:           "",
    taxonomy:            "",
  });

  /* touched mirrors ALL_REQUIRED keys */
  const [touched, setTouched] = React.useState({});

  /* ---------- helpers ---------- */
  const set = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  /* phone fields: digits only, max 10 */
  const setPhone = (field) => (e) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
    setForm((prev) => ({ ...prev, [field]: digits }));
  };

  const touch = (name) =>
    setTouched((prev) => (prev[name] ? prev : { ...prev, [name]: true }));

  /* error shows only after the user has visited the field */
  const errorOf = (name) =>
    touched[name] ? validateField(name, form[name]) : "";

  /* props helpers */
  const tx = (name) => ({
    value: form[name],
    onChange: name === "mobilePhone" || name === "phone" || name === "workContact"
      ? setPhone(name)
      : set(name),
    onBlur: () => touch(name),
    error: errorOf(name),
  });

  const sel = (name) => ({
    value: form[name],
    onChange: set(name),
    onClose: () => touch(name),
    error: errorOf(name),
  });

  /* ---------- save ---------- */
  const handleSave = () => {
    /* mark every required field as touched */
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
    /* valid — submit form to API here */
    console.log("Provider data:", form);
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
        {/* =========================================================
            TITLE
        ========================================================= */}
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
          {isEdit ? "Edit Referring Provider" : "Add New Referring Provider"}
        </Typography>
         </Box>

        {/* =========================================================
            BASIC DETAILS
        ========================================================= */}

        <SectionBox>
          <SectionTitle>Basic Details</SectionTitle>

          <FormGrid>
            <InputField
              label="First Name" required
              {...tx("firstName")}
            />

            <InputField
              label="Last Name" required
              {...tx("lastName")}
            />

            <DateField
              label="Date of Birth" required
              {...tx("dateOfBirth")}
            />

            <SelectField
              label="Sex" required
              options={OPTIONS.sex}
              {...sel("sex")}
            />
          </FormGrid>

          <FormGrid>
            <SelectField
              label="Select suffix"
              options={OPTIONS.suffix}
              value={form.suffix}
              onChange={set("suffix")}
            />

            <SelectField
              label="Select prefix"
              options={OPTIONS.prefix}
              value={form.prefix}
              onChange={set("prefix")}
            />

            <InputField
              label="National Provider Identifier" required
              {...tx("npi")}
            />

            <InputField
              label="Group NPI"
              value={form.groupNpi}
              onChange={set("groupNpi")}
            />
          </FormGrid>

          <FormGrid>
            <InputField
              label="State License Number" required
              {...tx("stateLicense")}
            />

            <InputField
              label="State Controlled Substance Number"
              value={form.controlledSubstance}
              onChange={set("controlledSubstance")}
            />

            <InputField
              label="DEA Number"
              placeholder="Type here"
              value={form.dea}
              onChange={set("dea")}
            />

            <SelectField
              label="Practice" required
              options={OPTIONS.practice}
              {...sel("practice")}
            />
          </FormGrid>

          {/* PCP Toggle */}

          <Box
            sx={{
              width: {
                xs: "100%",
                sm: "calc((100% - 16px) / 2)",
                md: "calc((100% - 48px) / 4)",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                border: `1px solid ${T.border}`,
                borderRadius: "8px",
                px: "14px",
                height: 42,
                bgcolor: "#fff",
                boxSizing: "border-box",

                "&:hover": {
                  borderColor: "#9CA3AF",
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: 12,
                  color: "#1F2937",
                }}
              >
                PCP
              </Typography>

              <Switch
                size="small"
                checked={pcp}
                onChange={(e) => setPcp(e.target.checked)}
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
        </SectionBox>

        {/* =========================================================
            ADDRESS
        ========================================================= */}

        <SectionBox>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <SectionTitle>Address</SectionTitle>

            <IconButton
              size="small"
              sx={{
                p: 0.5,
                "&:hover": {
                  bgcolor: "transparent",
                },
              }}
            >
              <RPDeleteIcon
                width={ICON_SIZE.delete}
                height={ICON_SIZE.delete}
                color="#2563EB"
              />
            </IconButton>
          </Box>

          {/* Row 1 */}

          <FormGrid>
            <InputField
              label="Address Type"
              placeholder="Basic"
              value={form.addressType}
              onChange={set("addressType")}
            />

            <InputField
              label="Address 1"
              placeholder="Address 1"
              value={form.address1}
              onChange={set("address1")}
            />

            <SelectField
              label="Address 2"
              placeholder="Address 2"
              options={OPTIONS.address2}
              value={form.address2}
              onChange={set("address2")}
            />

            <InputField
              label="Zip Code"
              value={form.zipCode}
              onChange={set("zipCode")}
            />
          </FormGrid>

          {/* Row 2 */}

          <FormGrid>
            <InputField
              label="City"
              value={form.city}
              onChange={set("city")}
            />

            <SelectField
              label="State"
              options={OPTIONS.state}
              value={form.state}
              onChange={set("state")}
            />

            <SelectField
              label="Country"
              options={OPTIONS.country}
              value={form.country}
              onChange={set("country")}
            />

            <InputField
              label="Mobile Phone" required
              inputMode="numeric"
              maxLength={10}
              {...tx("mobilePhone")}
            />
          </FormGrid>

          {/* Row 3 */}

          <FormGrid>
            <InputField
              label="Work Contact No."
              inputMode="numeric"
              maxLength={10}
              value={form.workContact}
              onChange={setPhone("workContact")}
              onBlur={() => {
                if (form.workContact && !PHONE_REGEX.test(form.workContact))
                  touch("workContact");
              }}
              error={
                form.workContact && !PHONE_REGEX.test(form.workContact)
                  ? PHONE_ERROR
                  : ""
              }
            />

            <InputField
              label="Phone" required
              inputMode="numeric"
              maxLength={10}
              {...tx("phone")}
            />

            <SelectField
              label="Fax" required
              options={OPTIONS.fax}
              {...sel("fax")}
            />

            <SelectField
              label="E-mail" required
              options={OPTIONS.email}
              {...sel("email")}
            />
          </FormGrid>
        </SectionBox>

        {/* =========================================================
            SPECIALTY & TAXONOMY
        ========================================================= */}

        <SectionBox>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <SectionTitle>Specialty & Taxonomy</SectionTitle>

            <IconButton
              size="small"
              sx={{
                p: 0.5,
                "&:hover": {
                  bgcolor: "transparent",
                },
              }}
            >
              <RPAddIcon
                width={ICON_SIZE.add}
                height={ICON_SIZE.add}
                color={T.blue}
              />
            </IconButton>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
              },
              gap: 2,
              alignItems: "end",
            }}
          >
            <SelectField
              label="Specialty" required
              options={OPTIONS.specialty}
              {...sel("specialty")}
            />

            <Box
              sx={{
                display: "flex",
                alignItems: "end",
                gap: 1,
              }}
            >
              <Box sx={{ flex: 1 }}>
                <InputField
                  label="Taxonomy" required
                  placeholder="Type here"
                  {...tx("taxonomy")}
                />
              </Box>

              <IconButton
                size="small"
                sx={{
                  p: 0.5,
                }}
              >
                <RPDeleteIcon
                  width={ICON_SIZE.delete}
                  height={ICON_SIZE.delete}
                  color="#2563EB"
                />
              </IconButton>
            </Box>
          </Box>
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
              color: "#0052E1",
              borderColor: "#0052E1",
              px: 3,

              "&:hover": {
                borderColor: "#0052E1",
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