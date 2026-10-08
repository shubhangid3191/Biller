import { useNavigate, useLocation, useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Select,
  FormControl,
  MenuItem,
  Switch,
} from "@mui/material";
import {
  KeyboardArrowDown,
  CalendarToday,
  Add,
  ArrowBackIosNew,
  ArrowForwardIos,
} from "@mui/icons-material";

/* ================================================================== */
/* Styles                                                               */
/* ================================================================== */
const eobHeadSx = {
  fontSize: 13,
  fontWeight: 600,
  color: "#373B4D",
  py: 1.15,
  px: 1,
  backgroundColor: "#F1F3FF",
  borderBottom: "1px solid #E5E7EB",
  whiteSpace: "nowrap",
};

const eobBodySx = {
  fontSize: 12,
  py: 1.25,
  px: 1,
  color: "#000",
  fontWeight: 600,
  verticalAlign: "top",
  borderBottom: "1px solid #E5E7EB",
};

const eobHeaderBtnSx = {
  height: 32,
  px: 1.5,
  textTransform: "none",
  borderColor: "#E5E7EB",
  color: "#374151",
  fontSize: 12,
  borderRadius: "7px",
  backgroundColor: "#FFFFFF",
  boxShadow: "none",
};

const eobReadBoxSx = {
  height: 34,
  display: "flex",
  alignItems: "center",
  px: 1.2,
  border: "1px solid #E5E7EB",
  borderRadius: "6px",
  backgroundColor: "#FFFFFF",
  fontSize: 12,
  fontWeight: 600,
  color: "#374151",
  boxSizing: "border-box",
};

const eobCardSx = {
  backgroundColor: "#FFFFFF",
  border: "1px solid #E5E7EB",
  borderRadius: "10px",
  overflow: "hidden",
  width: "100%",
  fontSize: 13,
};

const thinScroll = {
  "&::-webkit-scrollbar": { width: "4px" },
  "&::-webkit-scrollbar-track": { backgroundColor: "transparent" },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#D1D5DB",
    borderRadius: "4px",
  },
};

const postingBodySx = {
  px: 1.2,
  py: 1.15,
  "& .MuiInputBase-root": {
    height: 29,
    minHeight: 29,
    fontSize: 12,
    borderRadius: "6px",
    backgroundColor: "#F1F3F7",
  },
  "& .MuiOutlinedInput-root": {
    height: 29,
    minHeight: 29,
    borderRadius: "6px",
    backgroundColor: "#F1F3F7",
  },
  "& .MuiOutlinedInput-notchedOutline": { borderColor: "#E5E7EB" },
  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#D7DBE2",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#0066FF",
  },
  "& .MuiOutlinedInput-input": {
    fontSize: 12,
    color: "#6B7280",
    padding: "5px 9px",
  },
  "& .MuiSelect-select": {
    fontSize: 12,
    color: "#6B7280",
    padding: "5px 30px 5px 9px !important",
    minHeight: "unset !important",
    backgroundColor: "#F1F3F7",
    display: "flex",
    alignItems: "center",
  },
  "& .MuiSelect-icon": { color: "#0066FF", fontSize: 18, right: 7 },
  "& .MuiInputBase-root.Mui-disabled": { backgroundColor: "#E9EBF0" },
  "& .MuiInputBase-root.Mui-disabled input": {
    color: "#8A8F98",
    WebkitTextFillColor: "#8A8F98",
  },
  "& .MuiInputBase-root.Mui-disabled .MuiSelect-select": {
    color: "#8A8F98",
    WebkitTextFillColor: "#8A8F98",
  },
  "& .MuiInputAdornment-root svg": { fontSize: 16 },
};

/* ================================================================== */
/* Helpers                                                              */
/* ================================================================== */
function ClaimField({ label, value, calendar, disabled }) {
  return (
    <Box>
      <Typography sx={{ fontSize: 12, color: "#6B7280", mb: 0.5 }}>
        {label}
      </Typography>
      <TextField
        fullWidth
        size="small"
        defaultValue={value}
        disabled={disabled}
        sx={{
          "& .MuiInputBase-root": {
            height: 29,
            fontSize: 12,
            backgroundColor: disabled ? "#F3F4F6" : "#FFFFFF",
          },
          "& .MuiOutlinedInput-notchedOutline": { borderColor: "#E5E7EB" },
        }}
        InputProps={
          calendar
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <CalendarToday sx={{ fontSize: 14, color: "#9CA3AF" }} />
                  </InputAdornment>
                ),
              }
            : undefined
        }
      />
    </Box>
  );
}

function ClaimSelect({ label, value }) {
  return (
    <Box>
      <Typography sx={{ fontSize: 12, color: "#6B7280", mb: 0.5 }}>
        {label}
      </Typography>
      <FormControl fullWidth size="small">
        <Select
          defaultValue={value}
          IconComponent={KeyboardArrowDown}
          sx={{
            fontSize: 12,
            backgroundColor: "#FFFFFF",
            "& .MuiSelect-select": { py: 0.6, height: 14, fontSize: 12 },
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "#E5E7EB" },
          }}
        >
          <MenuItem value={value} sx={{ fontSize: 12 }}>
            {value}
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

/* ================================================================== */
/* Sample data                                                          */
/* ================================================================== */
const POSTING_ROWS = [
  [
    { t: "f", label: "Posting Date", value: "09/13/2026", calendar: true },
    { t: "s", label: "Payor sequence", value: "Primary" },
    { t: "s", label: "Payor", value: "6734759 - ICI" },
  ],
  [
    { t: "f", label: "Allowed", value: "$73.13" },
    { t: "f", label: "Paid", value: "$26.4" },
    { t: "f", label: "Contract Adj.", value: "$43.22", disabled: true },
  ],
  [
    { t: "f", label: "Adj. Code", value: "CO-45, CO-253, C..." },
    { t: "f", label: "Second Adj.", value: "$113.52", disabled: true },
    { t: "s", label: "Adj. Code", value: "OA-9" },
  ],
  [
    { t: "f", label: "Coinsurance", value: "$15.49", disabled: true },
    { t: "f", label: "Copay", value: "$21.37", disabled: true },
    { t: "f", label: "Deductible", value: "$0", disabled: true },
  ],
  [
    { t: "f", label: "Other PR Codes", value: "-", disabled: true },
    { t: "f", label: "Other PR Amount", value: "$0", disabled: true },
    { t: "s", label: "Payment Method", value: "EFT" },
  ],
  [
    { t: "s", label: "Actions", value: "Settle" },
    { t: "f", label: "Remarks", value: "Lorem ipsum dum..." },
    { t: "f", label: "Prov. Adj.", value: "-" },
  ],
  [
    { t: "s", label: "Denial Category", value: "NA" },
    { t: "f", label: "Balance", value: "$0" },
    null,
  ],
];

const EOB_TRANSACTIONS = [
  ["Claim created and added to Queue", "$550.14", "$550.14"],
  ["Claim submitted to Payor - ICIC, $150", "-", "$0.00"],
  ["Payor Settlement EFT/Check #: 150219802000/0906", "$0.00", "$0.00"],
  [
    "Patient Responsibility - PR-1: $3.96, PR-2: $15.36, PR-3: $13.52.",
    "$0.00",
    "$0.00",
  ],
  [
    "Transferred to Insurance responsibility (Action: None, Status: E-submit to secondary)",
    "$0.00",
    "$0.00",
  ],
  [
    "Patient Responsibility - PR-1: $3.96, PR-2: $15.36, PR-3: $13.52.",
    "$0.00",
    "$0.00",
  ],
  [
    "Transferred to Insurance responsibility (Action: None, Status: E-submit to secondary)",
    "$0.00",
    "$0.00",
  ],
  [
    "Patient Responsibility - PR-1: $3.96, PR-2: $15.36, PR-3: $13.52.",
    "$0.00",
    "$0.00",
  ],
].map(([type, amount, patResp]) => ({
  date: "26 Aug 26",
  type,
  amount,
  patResp,
  balance: "$550.14",
}));

/* ================================================================== */
/* Page                                                                 */
/* ================================================================== */
function RemittanceERAEdit() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const remittance = location.state?.remittance ?? null;

  const handleBack = () => navigate("/encounters", { state: { activeTab: 2 } });

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: "#F5F7FA",
        overflowY: "auto",
        px: 1.5,
        py: 1.5,
        boxSizing: "border-box",
        ...thinScroll,
      }}
    >
      {/* ── Header ── */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 1.5,
          minHeight: 48,
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: 20,
              fontWeight: 700,
              color: "#1F2937",
              lineHeight: 1.2,
            }}
          >
            Marian, Kalki P (3664)
          </Typography>
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 1.5, mt: 0.6 }}
          >
            <Typography sx={{ fontSize: 12, color: "#5C6A7D" }}>
              Claim <b>6178</b>
            </Typography>
            <Typography sx={{ fontSize: 12, color: "#5C6A7D" }}>
              Encounter <b>3501</b>
            </Typography>
            <Typography sx={{ fontSize: 12, color: "#5C6A7D" }}>
              Born <b>15 Apr 1958</b>
            </Typography>
            <Typography sx={{ fontSize: 12, color: "#5C6A7D" }}>
              Patient <b>2885</b>
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
          <Button
            variant="outlined"
            size="small"
            startIcon={
              <ArrowBackIosNew
                sx={{
                  fontSize: "16px !important",
                  color: "#0052E1",
                  fontWeight: 600,
                }}
              />
            }
            sx={{
              ...eobHeaderBtnSx,
              minWidth: 105,
              color: "#0D1B2A",
              fontWeight: 600,
            }}
          >
            Previous claim
          </Button>
          <Button
            variant="outlined"
            size="small"
            endIcon={
              <ArrowForwardIos
                sx={{
                  fontSize: "16px !important",
                  color: "#0052E1",
                  fontWeight: 600,
                }}
              />
            }
            sx={{
              ...eobHeaderBtnSx,
              minWidth: 92,
              color: "#0D1B2A",
              fontWeight: 600,
            }}
          >
            Next claim
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={handleBack}
            sx={{
              ...eobHeaderBtnSx,
              minWidth: 58,
              color: "#0D1B2A",
              fontWeight: 600,
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={handleBack}
            sx={{
              height: 32,
              minWidth: 48,
              px: 1.5,
              textTransform: "none",
              backgroundColor: "#0066FF",
              fontSize: 12,
              fontWeight: 600,
              borderRadius: "7px",
              boxShadow: "none",
              "&:hover": { backgroundColor: "#0052CC", boxShadow: "none" },
            }}
          >
            Apply
          </Button>
        </Box>
      </Box>

      {/* ── Two-column layout ── */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
          gap: 1.5,
          alignItems: "start",
        }}
      >
        {/* ────────── LEFT ────────── */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          {/* Claim Details */}
          <Box sx={eobCardSx}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                px: 1.5,
                py: 1.25,
                borderBottom: "1px solid #E5E7EB",
              }}
            >
              <Typography
                sx={{ fontSize: 13, fontWeight: 700, color: "#1F2937" }}
              >
                Claim Details
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                <Switch
                  size="small"
                  sx={{
                    width: 32,
                    height: 20,
                    p: 0,
                    "& .MuiSwitch-switchBase": { p: 0.3 },
                    "& .MuiSwitch-thumb": { width: 13, height: 13 },
                    "& .MuiSwitch-track": {
                      borderRadius: 10,
                      backgroundColor: "#D1D5DB",
                      opacity: 1,
                    },
                  }}
                />
                <Typography sx={{ fontSize: 12, color: "#5C6A7D" }}>
                  Show applied
                </Typography>
                <Button
                  size="small"
                  startIcon={
                    <Add
                      sx={{ fontSize: "20px !important", color: "#0052E1" }}
                    />
                  }
                  sx={{
                    minWidth: "auto",
                    ml: 0.5,
                    p: 0,
                    textTransform: "none",
                    color: "#5C6A7D",
                    fontSize: 12,
                  }}
                >
                  Add New
                </Button>
              </Box>
            </Box>

            <TableContainer>
              <Table size="small" sx={{ tableLayout: "fixed" }}>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#F9FAFB" }}>
                    <TableCell
                      padding="checkbox"
                      sx={{
                        width: 30,
                        py: 0.7,
                        borderBottom: "1px solid #E5E7EB",
                      }}
                    />
                    {["DOS", "Location", "CPT", "Claim#", "ICN", "Status"].map(
                      (h) => (
                        <TableCell
                          key={h}
                          sx={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: "#373B4D",
                            py: 1,
                            px: 0.8,
                            whiteSpace: "nowrap",
                            borderBottom: "1px solid #E5E7EB",
                            lineHeight: 1.1,
                          }}
                        >
                          {h}
                        </TableCell>
                      ),
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[0, 1].map((index) => (
                    <TableRow
                      key={index}
                      sx={{
                        backgroundColor: index === 1 ? "#EEF4FF" : "#FFFFFF",
                        borderBottom: "none",
                      }}
                    >
                      <TableCell padding="checkbox" sx={{ py: 1.2 }}>
                        <Checkbox
                          size="small"
                          defaultChecked={index === 1}
                          sx={{ p: 0.25 }}
                        />
                      </TableCell>
                      {["08/21/26", "TU-RL", "11980", "PRSH6002"].map((v) => (
                        <TableCell
                          key={v}
                          sx={{
                            fontSize: 12,
                            py: 1.2,
                            px: 0.8,
                            color: "#2E2E2E",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {v}
                        </TableCell>
                      ))}
                      <TableCell
                        sx={{
                          fontSize: 12,
                          py: 1.2,
                          px: 0.8,
                          color: "#2E2E2E",
                          wordBreak: "break-all",
                        }}
                      >
                        202608211142023
                      </TableCell>
                      <TableCell sx={{ py: 1.2, px: 0.8 }}>
                        <Chip
                          label={
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                lineHeight: 1.1,
                                alignItems: "flex-start",
                              }}
                            >
                              <span>Primary,</span>
                              <span>Forwarded</span>
                            </Box>
                          }
                          size="small"
                          sx={{
                            height: 36,
                            backgroundColor:
                              index === 1 ? "#0066FF" : "#EFF6FF",
                            color: index === 1 ? "#FFFFFF" : "#0066FF",
                            fontSize: 12,
                            fontWeight: 600,
                            borderRadius: "4px",
                            "& .MuiChip-label": { px: 0.8, py: 0.3 },
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          {/* Posting Data */}
          <Box sx={eobCardSx}>
            <Box sx={{ px: 1.2, py: 1, borderBottom: "1px solid #E5E7EB" }}>
              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#1F2937",
                  lineHeight: 1.2,
                }}
              >
                Posting Data
              </Typography>
            </Box>

            <Box sx={postingBodySx}>
              {POSTING_ROWS.map((row, i) => (
                <Box
                  key={i}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                    columnGap: 1.5,
                    mb: i === POSTING_ROWS.length - 1 ? 0 : 1.15,
                  }}
                >
                  {row.map((field, j) =>
                    !field ? (
                      <Box key={j} />
                    ) : field.t === "s" ? (
                      <ClaimSelect
                        key={j}
                        label={field.label}
                        value={field.value}
                      />
                    ) : (
                      <ClaimField
                        key={j}
                        label={field.label}
                        value={field.value}
                        calendar={field.calendar}
                        disabled={field.disabled}
                      />
                    ),
                  )}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        {/* ────────── RIGHT ────────── */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          {/* EOB / ERA Details */}
          <Box sx={eobCardSx}>
            <Box sx={{ px: 1.5, py: 1.5 }}>
              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#1F2937",
                  lineHeight: 1.2,
                  mb: 1.2,
                }}
              >
                EOB/ERA Details
              </Typography>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr auto",
                  gap: 1.25,
                  alignItems: "end",
                  width: "100%",
                }}
              >
                {/* Note */}
                <Box>
                  <Typography
                    sx={{
                      fontSize: 12,
                      color: "#6B7280",
                      mb: 0.55,
                      lineHeight: 1.2,
                    }}
                  >
                    Note
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Type here"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        height: 34,
                        borderRadius: "6px",
                        backgroundColor: "#FFFFFF",
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#E5E7EB",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#D1D5DB",
                      },
                      "& .MuiInputBase-input": {
                        fontSize: 12,
                        color: "#374151",
                        py: 0,
                      },
                      "& .MuiInputBase-input::placeholder": {
                        fontSize: 12,
                        color: "#9CA3AF",
                        opacity: 1,
                      },
                    }}
                  />
                </Box>

                {/* Reference number */}
                <Box>
                  <Typography
                    sx={{
                      fontSize: 12,
                      color: "#6B7280",
                      mb: 0.55,
                      lineHeight: 1.2,
                    }}
                  >
                    Reference number
                  </Typography>
                  <Box sx={eobReadBoxSx}>
                    {remittance?.chequeNumber ?? "150219802000"}
                  </Box>
                </Box>

                {/* ERA Balance */}
                <Box>
                  <Typography
                    sx={{
                      fontSize: 12,
                      color: "#6B7280",
                      mb: 0.55,
                      lineHeight: 1.2,
                    }}
                  >
                    ERA Balance
                  </Typography>
                  <Box sx={eobReadBoxSx}>
                    {remittance?.unpostedAmount ?? "$0"}
                  </Box>
                </Box>

                {/* View File */}
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    height: 34,
                    minWidth: 68,
                    px: 1.5,
                    textTransform: "none",
                    backgroundColor: "#0066FF",
                    color: "#FFFFFF",
                    fontSize: 12,
                    fontWeight: 600,
                    borderRadius: "7px",
                    boxShadow: "none",
                    whiteSpace: "nowrap",
                    "&:hover": {
                      backgroundColor: "#0052CC",
                      boxShadow: "none",
                    },
                  }}
                >
                  View File
                </Button>
              </Box>
            </Box>
          </Box>

          {/* Transactions table */}
          <Box sx={eobCardSx}>
            <TableContainer
              sx={{
                width: "100%",
                maxHeight: "calc(100vh - 245px)",
                overflowY: "auto",
                overflowX: "hidden",
                ...thinScroll,
              }}
            >
              <Table
                size="small"
                stickyHeader
                sx={{ tableLayout: "fixed", width: "100%" }}
              >
                <TableHead>
                  <TableRow>
                    {[
                      ["Date", "14%", "left"],
                      ["Transaction", "39%", "left"],
                      ["Amount", "15%", "right"],
                      ["Pat Resp.", "15%", "right"],
                      ["Total Balance", "17%", "right"],
                    ].map(([h, w, align]) => (
                      <TableCell
                        key={h}
                        sx={{ ...eobHeadSx, width: w, textAlign: align }}
                      >
                        {h}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {EOB_TRANSACTIONS.map((t, idx) => (
                    <TableRow
                      key={idx}
                      sx={{
                        backgroundColor: idx % 2 === 0 ? "#FFFFFF" : "#F5F7FF",
                        "&:last-child td": { borderBottom: 0 },
                      }}
                    >
                      <TableCell sx={{ ...eobBodySx, whiteSpace: "nowrap" }}>
                        {t.date}
                      </TableCell>
                      <TableCell
                        sx={{
                          ...eobBodySx,
                          color: "#4B5563",
                          lineHeight: 1.4,
                          wordBreak: "break-word",
                          fontWeight: 500,
                        }}
                      >
                        {t.type}
                      </TableCell>
                      {[t.amount, t.patResp, t.balance].map((v, k) => (
                        <TableCell
                          key={k}
                          sx={{
                            ...eobBodySx,
                            textAlign: "right",
                            whiteSpace: "nowrap",
                            fontWeight: k === 2 ? 600 : 600,
                          }}
                        >
                          {v}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default RemittanceERAEdit;
