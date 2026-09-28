import { useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
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
  Menu,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";

import {
  KeyboardArrowDown,
  CalendarToday,
} from "@mui/icons-material";

/* =========================================================
   Claim Field
========================================================= */

function ClaimField({ label, value, calendar, disabled }) {
  return (
    <Box sx={{ minWidth: 0 }}>
      <Typography
        sx={{
          fontSize: 10,
          color: "#8B95A5",
          mb: 0.4,
          lineHeight: 1.2,
        }}
      >
        {label}
      </Typography>

      <TextField
        fullWidth
        size="small"
        value={value}
        disabled={disabled}
        sx={{
          "& .MuiInputBase-root": {
            height: 30,
            fontSize: 11,
            backgroundColor: disabled
              ? "#F3F4F6"
              : "#FFFFFF",
            borderRadius: "6px",
          },

          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#E5E7EB",
          },

          "& .MuiInputBase-input": {
            padding: "5px 8px",
          },

          "& .MuiInputBase-input.Mui-disabled": {
            WebkitTextFillColor: "#9CA3AF",
          },
        }}
        InputProps={
          calendar
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <CalendarToday
                      sx={{
                        fontSize: 12,
                        color: "#9CA3AF",
                      }}
                    />
                  </InputAdornment>
                ),
              }
            : undefined
        }
      />
    </Box>
  );
}

/* =========================================================
   Claim Select
========================================================= */

function ClaimSelect({ label, value }) {
  return (
    <Box sx={{ minWidth: 0 }}>
      <Typography
        sx={{
          fontSize: 10,
          color: "#8B95A5",
          mb: 0.4,
          lineHeight: 1.2,
        }}
      >
        {label}
      </Typography>

      <FormControl
        fullWidth
        size="small"
      >
        <Select
          value={value}
          IconComponent={KeyboardArrowDown}
          sx={{
            height: 30,
            fontSize: 11,
            backgroundColor: "#FFFFFF",
            borderRadius: "6px",

            "& .MuiSelect-select": {
              py: 0.5,
              px: 0.9,
            },

            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#E5E7EB",
            },

            "& .MuiSelect-icon": {
              fontSize: 16,
            },
          }}
        >
          <MenuItem
            value={value}
            sx={{ fontSize: 10 }}
          >
            {value}
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

/* =========================================================
   Main Page
========================================================= */

export default function PostBillingEditPage({
  claim,
  onBack,
}) {
  const [actionAnchorEl, setActionAnchorEl] =
    useState(null);

  if (!claim) return null;

  /* =========================================================
     Existing fallback values
  ========================================================= */

  const born =
    claim.dob || "15 Apr 1958";

  const patientNo = claim.mrn
    ? claim.mrn.slice(-4)
    : "2885";

  const location =
    claim.pos || "Garden City Hospital";

  const caseName =
    claim.billedTo ||
    claim.primaryInsurance ||
    "United Healthcare";

  const typeOfService =
    "3-Consultation";

  const provider =
    "Dr. Mohan YS, M.D";

  const clearingTrk =
    claim.clearingHouse ||
    "250826543810";

  const outstanding =
    claim.billed || "$824.22";

  /* =========================================================
     Transactions
  ========================================================= */

  const transactions = [
    {
      label: "Created",
      color: "#F59E0B",
      bg: "#FFFFFF",
      desc: `Service line built from encounter ${
        claim.encounterId
      } using ICD-10 coding`,
      amount: claim.billed,
      patResp: claim.billed,
      balance: claim.billed,
    },

    {
      label: "Transfer",
      color: "#0066FF",
      bg: "#FFFFFF",
      desc: `${
        claim.billed
      } moved to primary insurance, ${
        claim.billedTo ||
        "UHC Community Plan"
      }. Patient responsibility set to $0.00`,
      amount: "–",
      patResp: "$0.00",
      balance: claim.billed,
    },

    {
      label: "Billed",
      color: "#8B5CF6",
      bg: "#F0FFFC",
      desc: `Electronic claim submitted to primary insurance, ${
        claim.billedTo ||
        "UHC Community Plan"
      }, with ICD-10 coding`,
      amount: "$0.00",
      patResp: "$0.00",
      balance: claim.billed,
    },

    {
      label: "Claim processed",
      color: "#0066FF",
      bg: "#F4F5FF",
      desc:
        "Handed to GatewayEDI in batch 103709866",
      link: "Raw clearinghouse message",
      amount: "$0.00",
      patResp: "$0.00",
      balance: claim.billed,
    },

    {
      label: "Claim processed",
      color: "#0066FF",
      bg: "#F4F5FF",
      desc:
        "GatewayEDI confirmed the claim arrived intact and reported an acknowledged status.",
      link: "Raw clearinghouse message",
      amount: "$0.00",
      patResp: "$0.00",
      balance: claim.billed,
    },

    {
      label: "Billed",
      color: "#8B5CF6",
      bg: "#F0FFFC",
      desc: `Electronic claim submitted to primary insurance, ${
        claim.billedTo ||
        "UHC Community Plan"
      }, with ICD-10 coding`,
      amount: "$0.00",
      patResp: "$0.00",
      balance: claim.billed,
    },

    {
      label: "Claim processed",
      color: "#0066FF",
      bg: "#F4F5FF",
      desc:
        "GatewayEDI confirmed the claim arrived intact and reported an acknowledged status.",
      link: "Raw clearinghouse message",
      amount: "$0.00",
      patResp: "$0.00",
      balance: claim.billed,
    },

    {
      label: "Claim processed",
      color: "#0066FF",
      bg: "#F4F5FF",
      desc:
        "No syntax or eligibility errors were flagged before the file went out to the payer.",
      link: "Raw clearinghouse message",
      amount: "$0.00",
      patResp: "$0.00",
      balance: claim.billed,
    },

    {
      label: "Created",
      color: "#F59E0B",
      bg: "#FFFFFF",
      desc: `Service line built from encounter ${
        claim.encounterId
      } using ICD-10 coding`,
      amount: claim.billed,
      patResp: claim.billed,
      balance: claim.billed,
    },

    {
      label: "Billed",
      color: "#8B5CF6",
      bg: "#F0FFFC",
      desc: `Electronic claim submitted to primary insurance, ${
        claim.billedTo ||
        "UHC Community Plan"
      }, with ICD-10 coding`,
      amount: "$0.00",
      patResp: "$0.00",
      balance: claim.billed,
    },

    {
      label: "Claim processed",
      color: "#0066FF",
      bg: "#F4F5FF",
      desc:
        "GatewayEDI confirmed the claim arrived intact and reported an acknowledged status.",
      link: "Raw clearinghouse message",
      amount: "$0.00",
      patResp: "$0.00",
      balance: claim.billed,
    },
  ];

  /* =========================================================
     Balance Row
  ========================================================= */

  const balanceRow = (
    label,
    value,
    bold = false
  ) => (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        minHeight: 20,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.7,
        }}
      >
        <Box
          sx={{
            width: 5,
            height: 5,
            borderRadius: "50%",
            backgroundColor: "#A7C9F8",
            flexShrink: 0,
          }}
        />

        <Typography
          sx={{
            fontSize: 10,
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
          fontSize: 10,
          fontWeight: bold ? 700 : 500,
          color: "#374151",
          lineHeight: 1.2,
        }}
      >
        {value}
      </Typography>
    </Box>
  );

  /* =========================================================
     Info Field
  ========================================================= */

  const infoField = (
    label,
    value,
    isLink
  ) => (
    <Box
      sx={{
        mb: 0.8,
        minWidth: 0,
      }}
    >
      {label && (
        <Typography
          sx={{
            fontSize: 9,
            color: "#9CA3AF",
            mb: 0.1,
            lineHeight: 1.15,
          }}
        >
          {label}
        </Typography>
      )}

      <Typography
        sx={{
          fontSize: 10.5,
          fontWeight: 600,
          color: isLink
            ? "#0066FF"
            : "#374151",
          textDecoration: isLink
            ? "underline"
            : "none",
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
     Card Style
  ========================================================= */

  const cardSx = {
    backgroundColor: "#FFFFFF",
    border: "1px solid #E5E7EB",
    borderRadius: "8px",
    p: 1.2,
    boxShadow:
      "0 1px 3px rgba(15, 23, 42, 0.03)",
  };

  const cardTitleSx = {
    fontSize: 11,
    fontWeight: 700,
    color: "#1F2937",
    mb: 0.8,
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
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <Box
        sx={{
          backgroundColor: "#FFFFFF",
          borderBottom:
            "1px solid #E5E7EB",
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
            pt: 0.9,
            pb: 0.4,
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: 15,
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
                gap: 1.2,
                mt: 0.4,
              }}
            >
              <Typography
                sx={{
                  fontSize: 9,
                  color: "#6B7280",
                }}
              >
                Claim{" "}
                <span
                  style={{
                    color: "#374151",
                    fontWeight: 600,
                  }}
                >
                  {claim.claimId}
                </span>
              </Typography>

              <Typography
                sx={{
                  fontSize: 9,
                  color: "#6B7280",
                }}
              >
                Encounter{" "}
                <span
                  style={{
                    color: "#374151",
                    fontWeight: 600,
                  }}
                >
                  {claim.encounterId}
                </span>
              </Typography>

              <Typography
                sx={{
                  fontSize: 9,
                  color: "#6B7280",
                }}
              >
                Born{" "}
                <span
                  style={{
                    color: "#374151",
                    fontWeight: 600,
                  }}
                >
                  {born}
                </span>
              </Typography>

              <Typography
                sx={{
                  fontSize: 9,
                  color: "#6B7280",
                }}
              >
                Patient{" "}
                <span
                  style={{
                    color: "#374151",
                    fontWeight: 600,
                  }}
                >
                  {patientNo}
                </span>
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.2,
            }}
          >
            <Chip
              label={`● Waiting on ${caseName}`}
              size="small"
              sx={{
                height: 22,
                backgroundColor: "#FEF3E2",
                color: "#A16207",
                fontSize: 8,
                fontWeight: 600,
                border:
                  "1px solid #F3DDA8",

                "& .MuiChip-label": {
                  px: 0.8,
                },
              }}
            />

            <Box
              sx={{
                textAlign: "right",
              }}
            >
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#111827",
                  lineHeight: 1,
                }}
              >
                {outstanding}
              </Typography>

              <Typography
                sx={{
                  fontSize: 7.5,
                  color: "#9CA3AF",
                  mt: 0.2,
                }}
              >
                Outstanding
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Buttons */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: 1.5,
            pb: 0.6,
            gap: 0.5,
          }}
        >
          <Button
            variant="contained"
            size="small"
            sx={{
              textTransform: "none",
              backgroundColor: "#0066FF",
              color: "#FFFFFF",
              fontWeight: 600,
              fontSize: 9,
              height: 26,
              minHeight: 26,
              px: 1.3,
              borderRadius: "5px",
              boxShadow:
                "0 2px 5px rgba(0,102,255,0.2)",
              minWidth: "auto",

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
            sx={{
              textTransform: "none",
              color: "#374151",
              borderColor: "#E1E5EA",
              backgroundColor: "#FFFFFF",
              fontWeight: 600,
              fontSize: 9,
              height: 26,
              minHeight: 26,
              px: 1.1,
              borderRadius: "5px",
              minWidth: "auto",

              "&:hover": {
                borderColor: "#D1D5DB",
                backgroundColor: "#F9FAFB",
              },
            }}
          >
            Cancel
          </Button>

          <Button
            variant="outlined"
            size="small"
            sx={{
              textTransform: "none",
              color: "#374151",
              borderColor: "#E1E5EA",
              backgroundColor: "#FFFFFF",
              fontWeight: 600,
              fontSize: 9,
              height: 26,
              minHeight: 26,
              px: 1.1,
              borderRadius: "5px",
              minWidth: "auto",

              "&:hover": {
                borderColor: "#D1D5DB",
                backgroundColor: "#F9FAFB",
              },
            }}
          >
            Delete
          </Button>

          <Button
            variant="outlined"
            size="small"
            sx={{
              textTransform: "none",
              color: "#374151",
              borderColor: "#E1E5EA",
              backgroundColor: "#FFFFFF",
              fontWeight: 600,
              fontSize: 9,
              height: 26,
              minHeight: 26,
              px: 1.1,
              borderRadius: "5px",
              minWidth: "auto",
              whiteSpace: "nowrap",

              "&:hover": {
                borderColor: "#D1D5DB",
                backgroundColor: "#F9FAFB",
              },
            }}
          >
            Delete last transaction
          </Button>

          <Button
            variant="outlined"
            size="small"
            endIcon={
              <KeyboardArrowDown
                sx={{ fontSize: 14 }}
              />
            }
            onClick={(e) =>
              setActionAnchorEl(
                e.currentTarget
              )
            }
            sx={{
              textTransform: "none",
              color: "#374151",
              borderColor: "#E1E5EA",
              backgroundColor: "#FFFFFF",
              fontWeight: 600,
              fontSize: 9,
              height: 26,
              minHeight: 26,
              px: 0.9,
              borderRadius: "5px",
              minWidth: "auto",

              "& .MuiButton-endIcon": {
                marginLeft: 0,
                marginRight: -0.2,
              },

              "&:hover": {
                borderColor: "#D1D5DB",
                backgroundColor: "#F9FAFB",
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
                  minWidth: 130,
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

        {/* Tabs */}

        <Tabs
          value={0}
          sx={{
            minHeight: 32,
            px: 1.5,

            "& .MuiTab-root": {
              minHeight: 32,
              height: 32,
              textTransform: "none",
              fontSize: 10,
              fontWeight: 500,
              color: "#6B7280",
              minWidth: "auto",
              px: 1.2,
              py: 0,
            },

            "& .Mui-selected": {
              color:
                "#0066FF !important",
              fontWeight: 600,
            },

            "& .MuiTabs-indicator": {
              backgroundColor: "#0066FF",
              height: 2,
            },
          }}
        >
          <Tab label="General" />
          <Tab label="Details" />
          <Tab label="Log" />
        </Tabs>
      </Box>

      {/* =====================================================
          BODY
      ===================================================== */}

      <Box
        sx={{
          display: "flex",
          alignItems: "stretch",
          gap: 1,
          p: 1,
          flex: 1,
          minHeight: 0,
          overflow: "hidden",
        }}
      >
        {/* ===================================================
            LEFT COLUMN
        =================================================== */}

        <Box
          sx={{
            width: 300,
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            gap: 0.8,
            minHeight: 0,
          }}
        >
          {/* =================================================
              PATIENT DETAILS
          ================================================= */}

          <Box sx={cardSx}>
            <Typography sx={cardTitleSx}>
              Patient Details
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns:
                  "1fr 1fr",
                columnGap: 1.2,
              }}
            >
              <Box>
                {infoField(
                  "",
                  claim.patientName,
                  false
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

              <Box>
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
                  false
                )}

                {infoField(
                  "Clearing Trk#",
                  clearingTrk,
                  false
                )}
              </Box>
            </Box>
          </Box>

          {/* =================================================
              CPT & MODIFIERS
          ================================================= */}

          <Box sx={cardSx}>
            <Typography sx={cardTitleSx}>
              CPT &amp; Modifiers
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns:
                  "1fr 1fr",
                gap: 1,
                mb: 0.8,
              }}
            >
              <ClaimSelect
                label="Modifier 1"
                value="None"
              />

              <ClaimSelect
                label="Modifier 2"
                value="None"
              />
            </Box>

            {[
              {
                n: 1,
                code:
                  claim.icd?.split(
                    " "
                  )[0] ||
                  "S06.5X0A",

                desc:
                  "Traumatic subdural haemorrhage, loss of consciousness unspecified, initial encounter",
              },
            ].map((d) => (
              <Box
                key={d.n}
                sx={{
                  display: "flex",
                  gap: 0.8,
                  mb: 0.65,
                }}
              >
                <Box
                  sx={{
                    width: 18,
                    height: 18,
                    borderRadius: "4px",
                    backgroundColor:
                      "#EEF4FF",
                    color: "#0066FF",
                    fontSize: 9.5,
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent:
                      "center",
                    flexShrink: 0,
                    mt: 0.05,
                  }}
                >
                  {d.n}
                </Box>

                <Box
                  sx={{
                    minWidth: 0,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems:
                        "center",
                      gap: 0.5,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 10,
                        fontWeight: 700,
                        color: "#374151",
                        backgroundColor:
                          "#F8FAFC",
                        border:
                          "1px solid #E5E7EB",
                        borderRadius:
                          "3px",
                        px: 0.55,
                        py: 0.15,
                      }}
                    >
                      {d.code}
                    </Typography>
                  </Box>

                  <Typography
                    sx={{
                      fontSize: 9,
                      color: "#9CA3AF",
                      lineHeight: 1.25,
                      mt: 0.15,
                    }}
                  >
                    {d.desc}
                  </Typography>
                </Box>
              </Box>
            ))}

            <Box
              sx={{
                display: "flex",
                gap: 0.8,
                mb: 0.5,
              }}
            >
              <Box
                sx={{
                  width: 18,
                  height: 18,
                  borderRadius: "4px",
                  backgroundColor:
                    "#F3F4F6",
                  color: "#9CA3AF",
                  fontSize: 9.5,
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent:
                    "center",
                  flexShrink: 0,
                }}
              >
                2
              </Box>

              <Box
                sx={{
                  minWidth: 0,
                }}
              >
                <Typography
                  sx={{
                    fontSize: 10,
                    fontWeight: 600,
                    color: "#9CA3AF",
                    fontStyle: "italic",
                    lineHeight: 1.2,
                  }}
                >
                  Not coded
                </Typography>

                <Typography
                  sx={{
                    fontSize: 9,
                    color: "#C4C9D4",
                    lineHeight: 1.25,
                  }}
                >
                  Add a secondary diagnosis
                  if the payer needs one
                </Typography>
              </Box>
            </Box>

            <Typography
              sx={{
                fontSize: 9,
                fontWeight: 600,
                color: "#0066FF",
                cursor: "pointer",
                mt: 0.3,

                "&:hover": {
                  textDecoration:
                    "underline",
                },
              }}
            >
              + Add diagnosis
            </Typography>
          </Box>

          {/* =================================================
              CHARGES AND BALANCE
          ================================================= */}

          <Box
            sx={{
              ...cardSx,
              flex: 1,
              minHeight: 0,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography sx={cardTitleSx}>
              Charges and balance
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns:
                  "1fr 1fr",
                gap: 1,
                mb: 0.8,
              }}
            >
              <ClaimField
                label="Units"
                value="1.00 unit"
              />

              <ClaimField
                label="Unit Charge"
                value={
                  claim.billed ||
                  "$550"
                }
              />
            </Box>

            <Box
              sx={{
                borderTop:
                  "1px solid #F0F2F5",
                pt: 0.6,
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box>
                {balanceRow(
                  "Total Charges",
                  "$0.00"
                )}

                {balanceRow(
                  "Adjustments:",
                  "$0.00"
                )}

                {balanceRow(
                  "Adjusted charges",
                  "$0.00"
                )}

                {balanceRow(
                  "Patient payments",
                  claim.patientPayment ||
                    "$0.00"
                )}

                {balanceRow(
                  "Total payments",
                  claim.insurancePayment ||
                    "$824.22"
                )}

                {balanceRow(
                  "Patient Balance",
                  "$0.0"
                )}

                {balanceRow(
                  "Insurance Balance",
                  claim.billed ||
                    "$550.14"
                )}
              </Box>

              <Box
                sx={{
                  borderTop:
                    "1px solid #F0F2F5",
                  mt: 0.3,
                  pt: 0.3,
                }}
              >
                {balanceRow(
                  "Total Balance",
                  claim.billed ||
                    "$550.14",
                  true
                )}
              </Box>
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
            minHeight: 0,
            backgroundColor: "#FFFFFF",
            border:
              "1px solid #E5E7EB",
            borderRadius: "7px",
            overflow: "hidden",
            display: "flex",
            flexDirection:
              "column",
          }}
        >
          <TableContainer
            sx={{
              flex: 1,
              overflowX: "hidden",
              overflowY: "hidden",
            }}
          >
            <Table
              size="small"
              sx={{
                width: "100%",
                tableLayout:
                  "fixed",
              }}
            >
              <colgroup>
                <col
                  style={{
                    width: "60px",
                  }}
                />

                <col />

                <col
                  style={{
                    width: "72px",
                  }}
                />

                <col
                  style={{
                    width: "74px",
                  }}
                />

                <col
                  style={{
                    width: "84px",
                  }}
                />
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
                        fontSize: 9,
                        fontWeight: 700,
                        color: "#374151",
                        backgroundColor:
                          "#F1F3FF",
                        borderBottom:
                          "1px solid #E5E7EB",
                        whiteSpace:
                          "nowrap",
                        py: 0.8,
                        px: 0.8,
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
                        backgroundColor:
                          t.bg,

                        "&:last-child td":
                          {
                            borderBottom:
                              0,
                          },
                      }}
                    >
                      {/* DATE */}

                      <TableCell
                        sx={{
                          fontSize: 9,
                          color: "#374151",
                          verticalAlign:
                            "top",
                          whiteSpace:
                            "nowrap",
                          py: 0.85,
                          px: 0.8,
                          lineHeight:
                            1.15,
                        }}
                      >
                        26 Aug 26
                      </TableCell>

                      {/* TRANSACTION */}

                      <TableCell
                        sx={{
                          verticalAlign:
                            "top",
                          py: 0.85,
                          px: 0.8,
                          overflow:
                            "hidden",
                        }}
                      >
                        <Box
                          sx={{
                            display:
                              "flex",
                            alignItems:
                              "center",
                            gap: 0.5,
                            mb: 0.15,
                          }}
                        >
                          <Box
                            sx={{
                              width: 5,
                              height: 5,
                              borderRadius:
                                "50%",
                              backgroundColor:
                                t.color,
                              flexShrink: 0,
                            }}
                          />

                          <Typography
                            sx={{
                              fontSize: 9,
                              fontWeight: 700,
                              color:
                                t.color,
                              lineHeight:
                                1.1,
                              whiteSpace:
                                "nowrap",
                            }}
                          >
                            {t.label}
                          </Typography>
                        </Box>

                        <Typography
                          sx={{
                            fontSize: 8,
                            color:
                              "#6B7280",
                            lineHeight:
                              1.3,
                            display:
                              "-webkit-box",
                            WebkitLineClamp:
                              2,
                            WebkitBoxOrient:
                              "vertical",
                            overflow:
                              "hidden",
                          }}
                        >
                          {t.desc}
                        </Typography>

                        {t.link && (
                          <Typography
                            sx={{
                              fontSize: 8,
                              color:
                                "#0066FF",
                              textDecoration:
                                "underline",
                              cursor:
                                "pointer",
                              lineHeight:
                                1.1,
                              mt: 0.1,
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
                          fontSize: 9,
                          color:
                            "#374151",
                          verticalAlign:
                            "top",
                          py: 0.85,
                          px: 0.8,
                          whiteSpace:
                            "nowrap",
                          lineHeight:
                            1.15,
                        }}
                      >
                        {t.amount}
                      </TableCell>

                      {/* PATIENT RESPONSE */}

                      <TableCell
                        align="right"
                        sx={{
                          fontSize: 9,
                          color:
                            "#374151",
                          verticalAlign:
                            "top",
                          py: 0.85,
                          px: 0.8,
                          whiteSpace:
                            "nowrap",
                          lineHeight:
                            1.15,
                        }}
                      >
                        {t.patResp}
                      </TableCell>

                      {/* TOTAL BALANCE */}

                      <TableCell
                        align="right"
                        sx={{
                          fontSize: 9,
                          fontWeight: 600,
                          color:
                            "#374151",
                          verticalAlign:
                            "top",
                          py: 0.85,
                          px: 0.8,
                          whiteSpace:
                            "nowrap",
                          lineHeight:
                            1.15,
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