import { useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Menu,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";

import { KeyboardArrowDown } from "@mui/icons-material";

const MODIFIER_OPTIONS = ["None", "26", "LT", "RT", "25", "59", "TC"];

const thinScrollSx = {
  "&::-webkit-scrollbar": { width: "4px" },
  "&::-webkit-scrollbar-track": { backgroundColor: "transparent" },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#D1D5DB",
    borderRadius: "4px",
  },
};

const outlineBtnSx = {
  textTransform: "none",
  color: "#374151",
  borderColor: "#E1E5EA",
  backgroundColor: "#FFFFFF",
  fontWeight: 600,
  fontSize: 10,
  height: 28,
  minHeight: 28,
  px: 1.2,
  borderRadius: "5px",
  minWidth: "auto",
  whiteSpace: "nowrap",

  "&:hover": {
    borderColor: "#D1D5DB",
    backgroundColor: "#F9FAFB",
  },
};

/* =========================================================
   Inline Field
========================================================= */

function InlineField({ label, value, onChange }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        minWidth: 0,
      }}
    >
      <Typography
        sx={{
          fontSize: 10.5,
          color: "#9CA3AF",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </Typography>

      <TextField
        size="small"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        sx={{
          flex: 1,
          minWidth: 0,

          "& .MuiInputBase-root": {
            height: 30,
            fontSize: 11,
            backgroundColor: "#F3F4F6",
            borderRadius: "6px",
          },

          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#E5E7EB",
          },

          "& .MuiInputBase-input": {
            padding: "5px 9px",
            color: "#6B7280",
          },
        }}
      />
    </Box>
  );
}

/* =========================================================
   Claim Select
========================================================= */

function ClaimSelect({ label, value, options, onChange }) {
  const opts = options.includes(value) ? options : [value, ...options];

  return (
    <Box sx={{ minWidth: 0 }}>
      <Typography
        sx={{
          fontSize: 10,
          color: "#8B95A5",
          mb: 0.5,
          lineHeight: 1.2,
        }}
      >
        {label}
      </Typography>

      <FormControl fullWidth size="small">
        <Select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          IconComponent={KeyboardArrowDown}
          sx={{
            height: 30,
            fontSize: 11,
            color: "#6B7280",
            backgroundColor: "#F3F4F6",
            borderRadius: "6px",

            "& .MuiSelect-select": {
              py: 0.5,
              px: 1.1,
            },

            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#E5E7EB",
            },

            "& .MuiSelect-icon": {
              fontSize: 17,
              color: "#9CA3AF",
            },
          }}
        >
          {opts.map((opt) => (
            <MenuItem key={opt} value={opt} sx={{ fontSize: 11 }}>
              {opt}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

/* =========================================================
   Main Page
========================================================= */

export default function PostBillingEditPage({ claim, onBack, onSave }) {
  const [actionAnchorEl, setActionAnchorEl] = useState(null);

  const initialModifiers = (claim?.modifier || "")
    .split(",")
    .map((m) => m.trim())
    .filter(Boolean);

  const initialDx = (claim?.icd || "").split(" ").filter(Boolean);

  const [modifier1, setModifier1] = useState(
    initialModifiers[0] || "None"
  );
  const [modifier2, setModifier2] = useState(
    initialModifiers[1] || "None"
  );
  const [dx1, setDx1] = useState(initialDx[0] || "S06.5X0A");
  const [dx2, setDx2] = useState(initialDx[1] || "");
  const [units, setUnits] = useState(claim?.units || "1.00 unit");
  const [billed, setBilled] = useState(claim?.billed || "$550");

  if (!claim) return null;

  const handleSave = () => {
    const modifier = [modifier1, modifier2]
      .filter((m) => m && m !== "None")
      .join(", ");

    const icd = [dx1, dx2].filter(Boolean).join(" ");

    if (onSave) {
      onSave({
        ...claim,
        modifier,
        icd,
        units,
        billed,
      });
    }

    if (onBack) onBack();
  };

  /* =========================================================
     Existing fallback values
  ========================================================= */

  const born = claim.dob || "15 Apr 1958";

  const patientNo = claim.mrn ? claim.mrn.slice(-4) : "2885";

  const location = claim.pos || "Garden City Hospital";

  const caseName =
    claim.billedTo ||
    claim.primaryInsurance ||
    "United Healthcare";

  const typeOfService = "3-Consultation";

  const provider = "Mohan YS, M.D";

  const clearingTrk =
    claim.clearingHouse || "2508265438810";

  const outstanding = billed || "$824.22";

  /* =========================================================
     Transactions
  ========================================================= */

  const GREEN = "#0E9F6E";
  const BLUE = "#0066FF";

  const created = {
    label: "Created",
    color: GREEN,
    bg: "#FFFBF3",
    desc: `Service line built from encounter ${claim.encounterId} using ICD-10 coding`,
    amount: billed,
    patResp: billed,
    balance: billed,
  };

  const billedRow = {
    label: "Billed",
    color: GREEN,
    bg: "#F1FFFD",
    desc: `Electronic claim submitted to primary insurance, ${
      claim.billedTo || "UHC Community Plan"
    }, with ICD-10 coding`,
    amount: "$0.00",
    patResp: "$0.00",
    balance: billed,
  };

  const processed = (desc) => ({
    label: "Claim processed",
    color: BLUE,
    bg: "#F4F5FF",
    desc,
    link: "Raw clearinghouse message",
    amount: "$0.00",
    patResp: "$0.00",
    balance: billed,
  });

  const ackDesc =
    "GatewayEDI confirmed the claim arrived intact and reported an acknowledged status.";

  const transactions = [
    created,

    {
      label: "Transfer",
      color: BLUE,
      bg: "#F4F5FF",
      desc: `${billed} moved to primary insurance, ${
        claim.billedTo || "UHC Community Plan"
      }. Patient responsibility set to $0.00`,
      amount: "–",
      patResp: "$0.00",
      balance: billed,
    },

    billedRow,
    processed("Handed to GatewayEDI in batch 103709866"),
    processed(ackDesc),
    billedRow,
    processed(ackDesc),
    processed(
      "No syntax or eligibility errors were flagged before the file went out to the payer."
    ),
    created,
    billedRow,
    processed(ackDesc),
  ];

  /* =========================================================
     Balance Row
  ========================================================= */

  const balanceRow = (
    label,
    value,
    dotColor,
    options = {}
  ) => {
    const { bold = false, muted = false } = options;

    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          minHeight: 24,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.9,
          }}
        >
          <Box
            sx={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              backgroundColor: dotColor,
              flexShrink: 0,
            }}
          />

          <Typography
            sx={{
              fontSize: 10.5,
              fontWeight: bold ? 700 : 500,
              color: "#4B5563",
              lineHeight: 1.2,
            }}
          >
            {label}
          </Typography>
        </Box>

        <Typography
          sx={{
            fontSize: 10.5,
            fontWeight: muted ? 500 : 700,
            color: muted ? "#9CA3AF" : "#1F2937",
            lineHeight: 1.2,
          }}
        >
          {value}
        </Typography>
      </Box>
    );
  };

  /* =========================================================
     Info Field
  ========================================================= */

  const infoField = (
    label,
    value,
    isLink,
    plain
  ) => (
    <Box
      sx={{
        display: "flex",
        alignItems: "baseline",
        gap: 0.8,
        mb: 1,
        minWidth: 0,
      }}
    >
      {label && (
        <Typography
          sx={{
            fontSize: 10.5,
            color: "#6B7280",
            lineHeight: 1.2,
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </Typography>
      )}

      <Typography
        sx={{
          fontSize: 10.5,
          fontWeight: plain ? 500 : 700,
          color: "#374151",
          textDecoration: isLink ? "underline" : "none",
          lineHeight: 1.2,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {value}
      </Typography>
    </Box>
  );

  /* =========================================================
     Diagnosis Row
  ========================================================= */

  const dxRow = (
    n,
    value,
    onChange,
    placeholder,
    hint
  ) => (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        px: 1,
        py: 1.1,
        backgroundColor: "#F8F9FB",
        border: "1px solid #EEF0F3",
        borderRadius: "6px",
      }}
    >
      <Box
        sx={{
          width: 20,
          height: 15,
          borderRadius: "3px",
          backgroundColor: value
            ? "#E6EAF5"
            : "#EDEFF3",
          color: value
            ? "#5B6B8C"
            : "#9CA3AF",
          fontSize: 10,
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {n}
      </Box>

      <TextField
        size="small"
        placeholder={placeholder}
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        sx={{
          width: 76,
          flexShrink: 0,

          "& .MuiInputBase-root": {
            height: 26,
            fontSize: 10.5,
            fontWeight: 600,
            backgroundColor: "#FFFFFF",
            borderRadius: "5px",
          },

          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#E5E7EB",
          },

          "& .MuiInputBase-input": {
            padding: "4px 8px",
            color: "#374151",
          },

          "& .MuiInputBase-input::placeholder": {
            fontWeight: 400,
            fontSize: 10,
            color: "#9CA3AF",
            opacity: 1,
          },
        }}
      />

      {hint && (
        <Typography
          sx={{
            fontSize: 10,
            color: "#9CA3AF",
            lineHeight: 1.3,
          }}
        >
          {hint}
        </Typography>
      )}
    </Box>
  );

  /* =========================================================
     Card Style
  ========================================================= */

  const cardSx = {
    backgroundColor: "#FFFFFF",
    border: "1px solid #E5E7EB",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow:
      "0 1px 3px rgba(15, 23, 42, 0.03)",
  };

  const cardTitleSx = {
    fontSize: 12,
    fontWeight: 700,
    color: "#1F2937",
    px: 1.7,
    py: 1.2,
    borderBottom: "1px solid #EEF0F3",
    lineHeight: 1.2,
  };

  /* =========================================================
     RETURN
  ========================================================= */

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: "#F5F7FA",
        overflowY: "auto",
        overflowX: "hidden",
        display: "flex",
        flexDirection: "column",
        fontSize: "1.08em",
        ...thinScrollSx,
      }}
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <Box
        sx={{
          backgroundColor: "#FFFFFF",
          borderBottom: "1px solid #E5E7EB",
          flexShrink: 0,
        }}
      >
        {/* Patient name + status */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 1.5,
            pt: 1.3,
            pb: 0.7,
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: 16,
                fontWeight: 700,
                color: "#1F2937",
                lineHeight: 1.2,
              }}
            >
              {claim.patientName}
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.4,
                mt: 0.6,
              }}
            >
              {[
                ["Claim", claim.claimId],
                ["Encounter", claim.encounterId],
                ["Born", born],
                ["Patient", patientNo],
              ].map(([label, val]) => (
                <Typography
                  key={label}
                  sx={{
                    fontSize: 10,
                    color: "#6B7280",
                  }}
                >
                  {label}{" "}
                  <span
                    style={{
                      color: "#374151",
                      fontWeight: 600,
                    }}
                  >
                    {val}
                  </span>
                </Typography>
              ))}
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.6,
                height: 24,
                px: 1.2,
                borderRadius: "12px",
                backgroundColor: "#FEF3E2",
                border: "1px solid #F3DDA8",
                color: "#A16207",
                fontSize: 10,
                fontWeight: 600,
                whiteSpace: "nowrap",
              }}
            >
              <Box
                sx={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  backgroundColor: "#F59E0B",
                }}
              />

              Waiting on {caseName}
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "baseline",
                gap: 0.5,
              }}
            >
              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#111827",
                  lineHeight: 1,
                }}
              >
                {outstanding}
              </Typography>

              <Typography
                sx={{
                  fontSize: 9,
                  color: "#9CA3AF",
                }}
              >
                Outstanding
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Tabs + Buttons */}

        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            px: 1.5,
            pb: 0.9,
          }}
        >
          <Tabs
            value={0}
            TabIndicatorProps={{
              style: { display: "none" },
            }}
            sx={{
              minHeight: 28,

              "& .MuiTabs-flexContainer": {
                gap: 0.5,
              },

              "& .MuiTab-root": {
                minHeight: 28,
                height: 28,
                textTransform: "none",
                fontSize: 10.5,
                fontWeight: 600,
                color: "#6B7280",
                minWidth: "auto",
                px: 1.6,
                py: 0,
                borderRadius: "5px",
              },

              "& .Mui-selected": {
                color: "#FFFFFF !important",
                backgroundColor: "#0066FF",
                fontWeight: 600,
              },
            }}
          >
            <Tab label="General" />
            <Tab label="Details" />
            <Tab label="Log" />
          </Tabs>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.8,
              mb: 1.2,
            }}
          >
            <Button
              variant="contained"
              size="small"
              onClick={handleSave}
              sx={{
                textTransform: "none",
                backgroundColor: "#0066FF",
                color: "#FFFFFF",
                fontWeight: 600,
                fontSize: 10,
                height: 28,
                minHeight: 28,
                px: 1.6,
                borderRadius: "5px",
                boxShadow:
                  "0 2px 5px rgba(0,102,255,0.2)",
                minWidth: "auto",
                whiteSpace: "nowrap",

                "&:hover": {
                  backgroundColor: "#0052CC",
                  boxShadow:
                    "0 2px 5px rgba(0,102,255,0.2)",
                },
              }}
            >
              Save changes
            </Button>

            <Button
              variant="outlined"
              size="small"
              onClick={onBack}
              sx={outlineBtnSx}
            >
              Cancel
            </Button>

            <Button
              variant="outlined"
              size="small"
              sx={outlineBtnSx}
            >
              Delete
            </Button>

            <Button
              variant="outlined"
              size="small"
              sx={outlineBtnSx}
            >
              Delete last transaction
            </Button>

            <Button
              variant="outlined"
              size="small"
              endIcon={
                <KeyboardArrowDown
                  sx={{ fontSize: 15 }}
                />
              }
              onClick={(e) =>
                setActionAnchorEl(e.currentTarget)
              }
              sx={{
                ...outlineBtnSx,
                px: 1.2,

                "& .MuiButton-endIcon": {
                  marginLeft: 0.5,
                  marginRight: -0.2,
                },
              }}
            >
              Select Action
            </Button>

            <Menu
              anchorEl={actionAnchorEl}
              open={Boolean(actionAnchorEl)}
              onClose={() =>
                setActionAnchorEl(null)
              }
              slotProps={{
                paper: {
                  sx: {
                    mt: 0.5,
                    minWidth: 135,
                  },
                },
              }}
            >
              <MenuItem
                sx={{ fontSize: 11 }}
                onClick={() =>
                  setActionAnchorEl(null)
                }
              >
                Print Claim
              </MenuItem>

              <MenuItem
                sx={{ fontSize: 11 }}
                onClick={() =>
                  setActionAnchorEl(null)
                }
              >
                Rebill
              </MenuItem>

              <MenuItem
                sx={{ fontSize: 11 }}
                onClick={() =>
                  setActionAnchorEl(null)
                }
              >
                Apply Payment
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Box>

      {/* =====================================================
          BODY
      ===================================================== */}

      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: 1.5,
          p: 1.5,
          flexShrink: 0,
        }}
      >
        {/* ===================================================
            LEFT COLUMN
        =================================================== */}

        <Box
          sx={{
            flex: "0 0 42%",
            minWidth: 330,
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          {/* PATIENT DETAILS */}

          <Box sx={{ ...cardSx, flexShrink: 0 }}>
            <Typography sx={cardTitleSx}>
              Patient Details
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                columnGap: 1.5,
                px: 1.5,
                pt: 1.3,
                pb: 0.4,
              }}
            >
              <Box sx={{ minWidth: 0 }}>
                {infoField(
                  "",
                  claim.patientName,
                  false,
                  true
                )}

                {infoField(
                  "Encounter",
                  `${claim.encounterId} ↗`,
                  true
                )}

                {infoField(
                  "Case",
                  `${caseName} ↗`,
                  true
                )}

                {infoField(
                  "Provider",
                  provider,
                  true
                )}
              </Box>

              <Box sx={{ minWidth: 0 }}>
                {infoField(
                  "Location",
                  location,
                  true
                )}

                {infoField(
                  "DOS",
                  claim.dos,
                  true
                )}

                {infoField(
                  "Type of Service",
                  typeOfService,
                  true
                )}

                {infoField(
                  "Clearing Trk#",
                  clearingTrk,
                  false
                )}
              </Box>
            </Box>
          </Box>

          {/* CPT & ICD */}

          <Box sx={{ ...cardSx, flexShrink: 0 }}>
            <Typography sx={cardTitleSx}>
              CPT &amp; ICD
            </Typography>

            <Box sx={{ p: 1.5 }}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns:
                    "1fr 1fr",
                  gap: 1.2,
                  mb: 1.2,
                }}
              >
                <ClaimSelect
                  label="Modifier 1"
                  value={modifier1}
                  options={MODIFIER_OPTIONS}
                  onChange={setModifier1}
                />

                <ClaimSelect
                  label="Modifier 2"
                  value={modifier2}
                  options={MODIFIER_OPTIONS}
                  onChange={setModifier2}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                {dxRow(
                  1,
                  dx1,
                  setDx1,
                  "Diagnosis"
                )}

                {dxRow(
                  2,
                  dx2,
                  setDx2,
                  "Not coded",
                  dx2
                    ? ""
                    : "Add a secondary diagnosis if the payer needs one"
                )}
              </Box>
            </Box>
          </Box>

          {/* CHARGES AND BALANCE */}

          <Box sx={{ ...cardSx, flexShrink: 0 }}>
            <Typography sx={cardTitleSx}>
              Charges and balance
            </Typography>

            <Box sx={{ p: 1.5 }}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns:
                    "1fr 1fr",
                  gap: 1.5,
                  mb: 1.4,
                }}
              >
                <InlineField
                  label="Units"
                  value={units}
                  onChange={setUnits}
                />

                <InlineField
                  label="Unit Charge"
                  value={billed}
                  onChange={setBilled}
                />
              </Box>

              {balanceRow(
                "Total Charges",
                "$0.00",
                "#8ED1B5",
                { muted: true }
              )}

              {balanceRow(
                "Adjustments:",
                "$0.00",
                "#8ED1B5",
                { muted: true }
              )}

              {balanceRow(
                "Adjusted charges",
                "$0.00",
                "#E9CF7B",
                { muted: true }
              )}

              {balanceRow(
                "Patient payments",
                claim.patientPayment ||
                  "$0.00",
                "#F2AA8C",
                { muted: true }
              )}

              {balanceRow(
                "Total payments",
                claim.insurancePayment ||
                  "$824.22",
                "#A7C9F8"
              )}

              {balanceRow(
                "Patient Balance",
                "$0.0",
                "#A7C9F8"
              )}

              {balanceRow(
                "Insurance Balance",
                billed || "$550.14",
                "#A7C9F8"
              )}

              {balanceRow(
                "Total Balance",
                billed || "$550.14",
                "#7FB0F0",
                { bold: true }
              )}
            </Box>
          </Box>
        </Box>

        {/* ===================================================
            RIGHT TRANSACTION TABLE
        =================================================== */}

        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            backgroundColor: "#FFFFFF",
            border: "1px solid #E5E7EB",
            borderRadius: "8px",
            overflow: "clip",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <TableContainer
            sx={{ overflow: "visible" }}
          >
            <Table
              size="small"
              stickyHeader
              sx={{
                width: "100%",
                tableLayout: "fixed",
              }}
            >
              <colgroup>
                <col style={{ width: "68px" }} />
                <col />
                <col style={{ width: "76px" }} />
                <col style={{ width: "78px" }} />
                <col style={{ width: "92px" }} />
              </colgroup>

              <TableHead>
                <TableRow>
                  {[
                    "Date",
                    "Transaction",
                    "Amount",
                    "Pat Resp.",
                    "Total Balance",
                  ].map((h, i) => (
                    <TableCell
                      key={h}
                      align={
                        i >= 2
                          ? "right"
                          : "left"
                      }
                      sx={{
                        fontSize: 10,
                        fontWeight: 700,
                        color: "#374151",
                        backgroundColor:
                          "#F1F3FF",
                        borderBottom:
                          "1px solid #E5E7EB",
                        whiteSpace: "nowrap",
                        py: 1.15,
                        px: 1,
                        lineHeight: 1.1,
                      }}
                    >
                      {h}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {transactions.map(
                  (t, idx) => (
                    <TableRow
                      key={idx}
                      sx={{
                        backgroundColor: t.bg,

                        "&:last-child td": {
                          borderBottom: 0,
                        },
                      }}
                    >
                      {/* DATE */}

                      <TableCell
                        sx={{
                          fontSize: 10,
                          fontWeight: 600,
                          color: "#374151",
                          verticalAlign:
                            "middle",
                          whiteSpace:
                            "nowrap",
                          py: 1.2,
                          px: 1,
                          lineHeight: 1.15,
                        }}
                      >
                        26 Aug 26
                      </TableCell>

                      {/* TRANSACTION */}

                      <TableCell
                        sx={{
                          verticalAlign:
                            "middle",
                          py: 1.2,
                          px: 1,
                          overflow: "hidden",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: 10,
                            fontWeight: 700,
                            color: t.color,
                            lineHeight: 1.2,
                            mb: 0.2,
                          }}
                        >
                          • {t.label}
                        </Typography>

                        <Typography
                          sx={{
                            fontSize: 9,
                            color: "#6B7280",
                            lineHeight: 1.35,
                            display:
                              "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient:
                              "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {t.desc}
                        </Typography>

                        {t.link && (
                          <Typography
                            sx={{
                              fontSize: 9,
                              color: "#0066FF",
                              textDecoration:
                                "underline",
                              cursor: "pointer",
                              lineHeight: 1.2,
                              mt: 0.15,
                            }}
                          >
                            {t.link}
                          </Typography>
                        )}
                      </TableCell>

                      {/* AMOUNT */}

                      <TableCell
                        align="right"
                        sx={{
                          fontSize: 10,
                          color: "#374151",
                          verticalAlign:
                            "middle",
                          py: 1.2,
                          px: 1,
                          whiteSpace:
                            "nowrap",
                          lineHeight: 1.15,
                        }}
                      >
                        {t.amount}
                      </TableCell>

                      {/* PATIENT RESPONSE */}

                      <TableCell
                        align="right"
                        sx={{
                          fontSize: 10,
                          color: "#374151",
                          verticalAlign:
                            "middle",
                          py: 1.2,
                          px: 1,
                          whiteSpace:
                            "nowrap",
                          lineHeight: 1.15,
                        }}
                      >
                        {t.patResp}
                      </TableCell>

                      {/* TOTAL BALANCE */}

                      <TableCell
                        align="right"
                        sx={{
                          fontSize: 10,
                          fontWeight: 600,
                          color: "#374151",
                          verticalAlign:
                            "middle",
                          py: 1.2,
                          px: 1,
                          whiteSpace:
                            "nowrap",
                          lineHeight: 1.15,
                        }}
                      >
                        {t.balance}
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
}