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
  Switch,
  Popover,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import { RPAddIcon, RPDeleteIcon, CalendarIcon } from "../assets/Assets";

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
  email: ["lipsum@gmail.com", "provider@gmail.com", "info@gmail.com"],
  specialty: ["Cardiology", "Neurology", "Orthopedics"],
};

/* ------------------------------------------------------------------ */
/* Validation                                                          */
/* ------------------------------------------------------------------ */

const PHONE_FIELDS = ["mobilePhone", "workContact", "phone"];
const PHONE_ERROR = "Enter a valid 10-digit number";

const validatePhone = (value) =>
  !value || /^\d{10}$/.test(value) ? "" : PHONE_ERROR;

/* ------------------------------------------------------------------ */
/* Input styles                                                        */
/* ------------------------------------------------------------------ */

const inputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    fontSize: 12,
    bgcolor: "#fff",

    "& input": {
      py: "10px",
      px: "14px",
      fontSize: 12,
      color: "#1F2937",
    },

    "& input::placeholder": {
      color: "#8F9098",
      opacity: 1,
    },

    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: T.border,
    },

    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#9CA3AF",
    },

    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: T.blue,
      borderWidth: "1.5px",
    },

    "&.Mui-error .MuiOutlinedInput-notchedOutline": {
      borderColor: "#EF4444",
    },
  },

  "& .MuiFormHelperText-root": {
    fontSize: 11,
    mx: 0,
    mt: 0.4,
    color: "#EF4444",
  },
};

const selectSx = {
  borderRadius: "8px",
  fontSize: 12,
  bgcolor: "#fff",

  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: T.border,
  },

  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#9CA3AF",
  },

  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: T.blue,
    borderWidth: "1.5px",
  },

  "& .MuiSelect-select": {
    py: "10px",
    px: "14px",
    fontSize: 12,
    color: "#1F2937",
  },

  "& .MuiSvgIcon-root": {
    color: "#8F9098",
  },
};

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
            color: "red",
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
        size="small"
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
}) {
  return (
    <Box>
      <Label required={required}>{label}</Label>

      <FormControl fullWidth size="small">
        <Select
          displayEmpty
          value={value}
          onChange={onChange}
          sx={selectSx}
          IconComponent={KeyboardArrowDownIcon}
          renderValue={(val) =>
            val ? (
              <span
                style={{
                  fontSize: 12,
                  color: "#1F2937",
                }}
              >
                {val}
              </span>
            ) : (
              <span
                style={{
                  fontSize: 12,
                  color: "#8F9098",
                }}
              >
                {placeholder}
              </span>
            )
          }
        >
          <MenuItem
            value=""
            sx={{
              fontSize: 12,
              color: "#8F9098",
            }}
          >
            {placeholder}
          </MenuItem>

          {options.map((o) => (
            <MenuItem
              key={o}
              value={o}
              sx={{
                fontSize: 12,
              }}
            >
              {o}
            </MenuItem>
          ))}
        </Select>
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
  required,
  placeholder = "DD-MM-YYYY",
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDateChange = (newVal) => {
    if (newVal) {
      onChange({
        target: {
          value: newVal.format("DD-MM-YYYY"),
        },
      });
    }

    handleClose();
  };

  const parsed = value ? dayjs(value, "DD-MM-YYYY") : null;
  const parsedValue = parsed && parsed.isValid() ? parsed : null;

  return (
    <Box>
      <Label required={required}>{label}</Label>

      <TextField
        fullWidth
        size="small"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment
                position="end"
                sx={{
                  mr: "-4px",
                }}
              >
                <IconButton
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                  aria-label="Open calendar"
                  sx={{
                    p: "4px",
                    "&:hover": {
                      background: "transparent",
                    },
                  }}
                  disableRipple
                >
                  <CalendarIcon width={14} height={16} color="#1E1E1E" />
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
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
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
              width: {
                xs: "280px",
                sm: "320px",
              },

              "& .MuiPickersDay-root.Mui-selected": {
                backgroundColor: "#015DFF",
              },

              "& .MuiPickersDay-root:hover": {
                backgroundColor: "#EEF4FF",
              },
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
        fontSize: 15,
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
    firstName: row?.providerName?.split(" ")[0] ?? "",
    lastName: row?.providerName?.split(" ").slice(1).join(" ") ?? "",
    dateOfBirth: "",
    sex: "",
    suffix: "",
    prefix: "",
    npi: row?.npi ?? "",
    groupNpi: "",
    stateLicense: "",
    controlledSubstance: "",
    dea: "",
    practice: row?.practice ?? "",
    addressType: "",
    address1: row?.address ?? "",
    address2: "",
    zipCode: "",
    city: "",
    country: "",
    state: "",
    mobilePhone: row?.mobile ?? "",
    workContact: "",
    phone: "",
    fax: row?.fax ?? "",
    email: row?.email ?? "",
    specialty: "",
    taxonomy: "",
  });

  const [errors, setErrors] = React.useState({});

  const set = (field) => (e) =>
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));

  /* Phone fields */

  const setPhone = (field) => (e) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 10);

    setForm((prev) => ({
      ...prev,
      [field]: digits,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const blurPhone = (field) => () =>
    setErrors((prev) => ({
      ...prev,
      [field]: validatePhone(form[field]),
    }));

  const handleSave = () => {
    const nextErrors = {};

    PHONE_FIELDS.forEach((field) => {
      nextErrors[field] = validatePhone(form[field]);
    });

    setErrors(nextErrors);

    if (Object.values(nextErrors).some(Boolean)) {
      return;
    }

    // valid — submit form to API here
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

        <Typography
          sx={{
            fontSize: 28,
            fontWeight: 700,
            color: "#111827",
          }}
        >
          {isEdit ? "Edit Rendering Provider" : "Add New Rendering Provider"}
        </Typography>

        {/* =========================================================
            BASIC DETAILS
        ========================================================= */}

        <SectionBox>
          <SectionTitle>Basic Details</SectionTitle>

          <FormGrid>
            <InputField
              label="First Name"
              value={form.firstName}
              onChange={set("firstName")}
            />

            <InputField
              label="Last Name"
              value={form.lastName}
              onChange={set("lastName")}
            />

            <DateField
              label="Date of Birth"
              value={form.dateOfBirth}
              onChange={set("dateOfBirth")}
            />

            <SelectField
              label="Sex"
              options={OPTIONS.sex}
              value={form.sex}
              onChange={set("sex")}
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
              label="National Provider Identifier"
              value={form.npi}
              onChange={set("npi")}
            />

            <InputField
              label="Group NPI"
              value={form.groupNpi}
              onChange={set("groupNpi")}
            />
          </FormGrid>

          <FormGrid>
            <InputField
              label="State License Number"
              value={form.stateLicense}
              onChange={set("stateLicense")}
            />

            <InputField
              label="State Controlled Substance Number"
              value={form.controlledSubstance}
              onChange={set("controlledSubstance")}
            />

            <InputField
              label="DEA Number"
              placeholder="Typer here"
              value={form.dea}
              onChange={set("dea")}
            />

            <SelectField
              label="Practice"
              required
              options={OPTIONS.practice}
              value={form.practice}
              onChange={set("practice")}
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
                height: 38,
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

                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
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
            <InputField label="City" value={form.city} onChange={set("city")} />

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
              label="Mobile Phone"
              value={form.mobilePhone}
              onChange={setPhone("mobilePhone")}
              onBlur={blurPhone("mobilePhone")}
              error={errors.mobilePhone}
              inputMode="numeric"
              maxLength={10}
            />
          </FormGrid>

          {/* Row 3 */}

          <FormGrid>
            <InputField
              label="Work Contact No."
              value={form.workContact}
              onChange={setPhone("workContact")}
              onBlur={blurPhone("workContact")}
              error={errors.workContact}
              inputMode="numeric"
              maxLength={10}
            />

            <InputField
              label="Phone"
              value={form.phone}
              onChange={setPhone("phone")}
              onBlur={blurPhone("phone")}
              error={errors.phone}
              inputMode="numeric"
              maxLength={10}
            />

            <SelectField
              label="Fax"
              options={OPTIONS.fax}
              value={form.fax}
              onChange={set("fax")}
            />

            <SelectField
              label="E-mail"
              options={OPTIONS.email}
              value={form.email}
              onChange={set("email")}
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
              label="Specialty"
              options={OPTIONS.specialty}
              value={form.specialty}
              onChange={set("specialty")}
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
                  label="Taxonomy"
                  placeholder="Address 1"
                  value={form.taxonomy}
                  onChange={set("taxonomy")}
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
            justifyContent: "flex-end",
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
