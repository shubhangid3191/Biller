import React from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Stack,
  Divider,
} from "@mui/material";

import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import BoltIcon from "@mui/icons-material/Bolt";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

// -----------------------------------------------------------------------------
// DATA
// -----------------------------------------------------------------------------

const SUMMARY_CARDS = [
  {
    label: "REVENUE LEAKAGE",
    value: "$33.4K",
    color: "#ff3b3b",
    note: "Missed charges & underpayments (30d)",
  },
  {
    label: "UNDERPAYMENTS",
    value: "$8.6K",
    color: "#0878ff",
    note: "42 claims paid below contract",
  },
  {
    label: "PREVENTABLE DENIALS",
    value: "$14.8K",
    color: "#f5a400",
    note: "71% from missing authorization",
  },
];

const FORECAST = [
  { week: "W1", low: 1.02, mid: 1.1, high: 1.18 },
  { week: "W2", low: 1.08, mid: 1.16, high: 1.24 },
  { week: "W3", low: 1.14, mid: 1.22, high: 1.3 },
  { week: "W4", low: 1.16, mid: 1.25, high: 1.34 },
  { week: "W5", low: 1.2, mid: 1.28, high: 1.36 },
  { week: "W6", low: 1.22, mid: 1.3, high: 1.38 },
  { week: "W7", low: 1.24, mid: 1.32, high: 1.4 },
];

const FINDINGS = [
  {
    title: "Medical-necessity denials trending +18% (BCBSM)",
    detail:
      "New LCD effective 05/01 not reflected in documentation for G0439/94997. 14 claims affected.",
    amount: "$21.3K",
    action: "Add documentation prompt",
  },
  {
    title: "Charge lag on Reliance Hospitals encounters",
    detail:
      "673 unbilled encounters averaging 11 days from DOS to charge — slows cash by ~4 days.",
    amount: "$48K",
    action: "Auto-route to coders",
  },
  {
    title: "Timely-filing risk on Humana A/R",
    detail: "9 claims will breach 90-day window in 7 days.",
    amount: "$4.1K",
    action: "Escalate to A/R queue",
  },
  {
    title: "Patient copay collection gap",
    detail:
      "Front desk collected 61% of estimated copays — $6.2K uncollected MTD.",
    amount: "$6.2K",
    action: "Enable estimate at-check-in",
  },
];

// -----------------------------------------------------------------------------
// SUMMARY CARD
// -----------------------------------------------------------------------------

const SummaryCard = ({ card }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        flex: 1,
        minWidth: 0,
        height: 118,
        px: 2,
        py: 1.7,
        borderRadius: "6px",
        border: "1px solid #e5e7eb",
        backgroundColor: "#ffffff",
        boxSizing: "border-box",
      }}
    >
      <Typography
        sx={{
          fontSize: "7px",
          lineHeight: 1,
          color: "#9ca3af",
          fontWeight: 700,
          letterSpacing: "0.45px",
          mb: 1,
        }}
      >
        {card.label}
      </Typography>

      <Typography
        sx={{
          fontSize: "16px",
          lineHeight: 1.2,
          fontWeight: 700,
          color: card.color,
          mb: 0.8,
        }}
      >
        {card.value}
      </Typography>

      <Typography
        sx={{
          fontSize: "8px",
          lineHeight: 1.35,
          color: "#6b7280",
          whiteSpace: "nowrap",
        }}
      >
        {card.note}
      </Typography>

      <Stack
        direction="row"
        alignItems="center"
        spacing={0.25}
        sx={{
          mt: 1.2,
          cursor: "pointer",
          width: "fit-content",
        }}
      >
        <Typography
          sx={{
            fontSize: "8px",
            color: "#0878ff",
            fontWeight: 600,
          }}
        >
          Investigate
        </Typography>

        <ArrowForwardIcon
          sx={{
            fontSize: 10,
            color: "#0878ff",
          }}
        />
      </Stack>
    </Paper>
  );
};

// -----------------------------------------------------------------------------
// FINDING ROW
// -----------------------------------------------------------------------------

const FindingRow = ({ item, isLast }) => {
  return (
    <Box>
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          minHeight: 43,
          py: 0.8,
          gap: 1,
        }}
      >
        {/* Blue lightning icon */}
        <BoltIcon
          sx={{
            fontSize: 13,
            color: "#0878ff",
            flexShrink: 0,
          }}
        />

        {/* Text */}
        <Box
          sx={{
            flex: 1,
            minWidth: 0,
          }}
        >
          <Typography
            sx={{
              fontSize: "8px",
              lineHeight: 1.25,
              fontWeight: 700,
              color: "#111827",
              mb: 0.3,
            }}
          >
            {item.title}
          </Typography>

          <Typography
            sx={{
              fontSize: "6.8px",
              lineHeight: 1.3,
              color: "#9ca3af",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {item.detail}
          </Typography>
        </Box>

        {/* Amount */}
        <Typography
          sx={{
            fontSize: "8px",
            fontWeight: 700,
            color: "#111827",
            flexShrink: 0,
            minWidth: 40,
            textAlign: "right",
          }}
        >
          {item.amount}
        </Typography>

        {/* Action */}
        <Button
          variant="contained"
          size="small"
          sx={{
            height: 19,
            minWidth: 0,
            px: 1,
            borderRadius: "3px",
            textTransform: "none",
            fontSize: "6px",
            fontWeight: 600,
            lineHeight: 1,
            backgroundColor: "#0878ff",
            boxShadow: "none",
            whiteSpace: "nowrap",
            "&:hover": {
              backgroundColor: "#0067e8",
              boxShadow: "none",
            },
          }}
        >
          {item.action}
        </Button>
      </Stack>

      {!isLast && (
        <Divider
          sx={{
            borderColor: "#edf0f3",
          }}
        />
      )}
    </Box>
  );
};

// -----------------------------------------------------------------------------
// MAIN PAGE
// -----------------------------------------------------------------------------

export default function AIInsight() {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        boxSizing: "border-box",
        backgroundColor: "#f5f5f5",
        px: {
          xs: 1.5,
          sm: 2.5,
          md: 3,
        },
        py: {
          xs: 2,
          sm: 2.5,
          md: 3,
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "1200px",
          mx: "auto",
        }}
      >
        {/* ---------------------------------------------------------------- */}
        {/* HEADER */}
        {/* ---------------------------------------------------------------- */}

        <Box sx={{ mb: 2 }}>
          <Typography
            sx={{
              fontSize: "7px",
              lineHeight: 1,
              color: "#9ca3af",
              fontWeight: 700,
              letterSpacing: "0.6px",
              mb: 0.8,
            }}
          >
            COMMAND
          </Typography>

          <Stack
            direction="row"
            alignItems="flex-start"
            justifyContent="space-between"
            gap={2}
          >
            <Box sx={{ minWidth: 0 }}>
              <Typography
                sx={{
                  fontSize: {
                    xs: "20px",
                    sm: "22px",
                  },
                  lineHeight: 1.15,
                  fontWeight: 700,
                  color: "#111827",
                  mb: 0.6,
                }}
              >
                AI Insights Center
              </Typography>

              <Typography
                sx={{
                  fontSize: "8px",
                  lineHeight: 1.5,
                  color: "#7b8491",
                  maxWidth: 700,
                }}
              >
                Proactive intelligence: revenue leakage, underpayment
                detection, denial root-cause, and predictive forecasting —
                surfaced before you ask.
              </Typography>
            </Box>

            <Button
              variant="contained"
              startIcon={
                <ForumOutlinedIcon
                  sx={{
                    fontSize: "12px !important",
                  }}
                />
              }
              sx={{
                flexShrink: 0,
                height: 28,
                px: 1.5,
                borderRadius: "3px",
                textTransform: "none",
                fontSize: "8px",
                fontWeight: 600,
                backgroundColor: "#0878ff",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "#0067e8",
                  boxShadow: "none",
                },
              }}
            >
              Ask the analyst
            </Button>
          </Stack>
        </Box>

        {/* ---------------------------------------------------------------- */}
        {/* SUMMARY CARDS */}
        {/* ---------------------------------------------------------------- */}

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(3, 1fr)",
            },
            gap: 2,
            mb: 2,
          }}
        >
          {SUMMARY_CARDS.map((card) => (
            <SummaryCard
              key={card.label}
              card={card}
            />
          ))}
        </Box>

        {/* ---------------------------------------------------------------- */}
        {/* FORECAST + UNDERPAYMENT */}
        {/* ---------------------------------------------------------------- */}

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "1.72fr 0.88fr",
            },
            gap: 2,
            mb: 2,
          }}
        >
          {/* Forecast */}
          <Paper
            elevation={0}
            sx={{
              minWidth: 0,
              minHeight: 290,
              p: 2,
              borderRadius: "6px",
              border: "1px solid #e5e7eb",
              backgroundColor: "#ffffff",
              boxSizing: "border-box",
            }}
          >
            <Typography
              sx={{
                fontSize: "10px",
                lineHeight: 1.2,
                fontWeight: 700,
                color: "#111827",
                mb: 0.55,
              }}
            >
              Predictive Cash Forecast
            </Typography>

            <Typography
              sx={{
                fontSize: "7px",
                color: "#9ca3af",
              }}
            >
              Next 6 weeks · 90% confidence band
            </Typography>

            {/* Chart */}
            <Box
              sx={{
                width: "100%",
                height: 132,
                mt: 1,
              }}
            >
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <ComposedChart
                  data={FORECAST}
                  margin={{
                    top: 8,
                    right: 5,
                    left: 5,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid
                    horizontal
                    vertical={false}
                    stroke="#edf0f3"
                    strokeWidth={1}
                  />

                  <XAxis
                    dataKey="week"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fontSize: 6,
                      fill: "#a1a7b0",
                    }}
                    dy={5}
                  />

                  <YAxis
                    hide
                    domain={["dataMin - 0.04", "dataMax + 0.04"]}
                  />

                  {/* Confidence area */}
                  <Area
                    type="monotone"
                    dataKey="high"
                    stroke="none"
                    fill="#eaf2ff"
                    fillOpacity={0.85}
                  />

                  <Area
                    type="monotone"
                    dataKey="low"
                    stroke="none"
                    fill="#ffffff"
                    fillOpacity={1}
                  />

                  {/* Main line */}
                  <Line
                    type="monotone"
                    dataKey="mid"
                    stroke="#0878ff"
                    strokeWidth={1.6}
                    dot={{
                      r: 2.3,
                      fill: "#0878ff",
                      strokeWidth: 0,
                    }}
                    activeDot={{
                      r: 3,
                    }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </Box>

            <Divider
              sx={{
                mt: 0.8,
                mb: 1.2,
                borderColor: "#edf0f3",
              }}
            />

            <Stack spacing={1}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  sx={{
                    fontSize: "7px",
                    color: "#7b8491",
                  }}
                >
                  Projected 30-day collections
                </Typography>

                <Typography
                  sx={{
                    fontSize: "7px",
                    fontWeight: 700,
                    color: "#111827",
                  }}
                >
                  $1.34M
                </Typography>
              </Stack>

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  sx={{
                    fontSize: "7px",
                    color: "#7b8491",
                  }}
                >
                  Confidence interval
                </Typography>

                <Typography
                  sx={{
                    fontSize: "7px",
                    fontWeight: 700,
                    color: "#111827",
                  }}
                >
                  ±$48K
                </Typography>
              </Stack>

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  sx={{
                    fontSize: "7px",
                    color: "#7b8491",
                  }}
                >
                  Cash velocity trend
                </Typography>

                <Typography
                  sx={{
                    fontSize: "7px",
                    fontWeight: 700,
                    color: "#16a34a",
                  }}
                >
                  +6%
                </Typography>
              </Stack>
            </Stack>
          </Paper>

          {/* Underpayment detector */}
          <Paper
            elevation={0}
            sx={{
              minWidth: 0,
              minHeight: 290,
              p: 2,
              borderRadius: "6px",
              border: "1px solid #e5e7eb",
              backgroundColor: "#ffffff",
              boxSizing: "border-box",
            }}
          >
            <Typography
              sx={{
                fontSize: "6.5px",
                lineHeight: 1,
                color: "#0878ff",
                fontWeight: 700,
                letterSpacing: "0.4px",
                mb: 1.4,
              }}
            >
              UNDERPAYMENT DETECTOR
            </Typography>

            <Typography
              sx={{
                fontSize: "7.5px",
                lineHeight: 1.55,
                color: "#374151",
              }}
            >
              BCBSM is paying 33% below contract on G0439 across 6 claims.
              Revenue: $124.74. This matches a fee-schedule update the payer
              applied incorrectly.
            </Typography>

            <Divider
              sx={{
                my: 1.4,
                borderColor: "#edf0f3",
              }}
            />

            <Stack spacing={1.25}>
              <Box>
                <Typography
                  sx={{
                    fontSize: "6px",
                    color: "#9ca3af",
                    mb: 0.3,
                  }}
                >
                  Contracted rate
                </Typography>

                <Typography
                  sx={{
                    fontSize: "8px",
                    fontWeight: 700,
                    color: "#111827",
                  }}
                >
                  $156.20
                </Typography>
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontSize: "6px",
                    color: "#9ca3af",
                    mb: 0.3,
                  }}
                >
                  Average paid
                </Typography>

                <Typography
                  sx={{
                    fontSize: "8px",
                    fontWeight: 700,
                    color: "#ef4444",
                  }}
                >
                  $136.41
                </Typography>
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontSize: "6px",
                    color: "#9ca3af",
                    mb: 0.3,
                  }}
                >
                  Recoverable
                </Typography>

                <Typography
                  sx={{
                    fontSize: "8px",
                    fontWeight: 700,
                    color: "#111827",
                  }}
                >
                  $124.74
                </Typography>
              </Box>
            </Stack>

            <Button
              fullWidth
              variant="contained"
              startIcon={
                <LightbulbOutlinedIcon
                  sx={{
                    fontSize: "11px !important",
                  }}
                />
              }
              sx={{
                height: 25,
                mt: 2,
                borderRadius: "3px",
                textTransform: "none",
                fontSize: "7px",
                fontWeight: 600,
                backgroundColor: "#0878ff",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "#0067e8",
                  boxShadow: "none",
                },
              }}
            >
              Dispute underpayment
            </Button>
          </Paper>
        </Box>

        {/* ---------------------------------------------------------------- */}
        {/* TIA FINDINGS */}
        {/* ---------------------------------------------------------------- */}

        <Paper
          elevation={0}
          sx={{
            width: "100%",
            p: 2,
            borderRadius: "6px",
            border: "1px solid #e5e7eb",
            backgroundColor: "#ffffff",
            boxSizing: "border-box",
          }}
        >
          {/* Findings Header */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{
              mb: 0.25,
            }}
          >
            <Box
              sx={{
                width: 17,
                height: 17,
                borderRadius: "3px",
                backgroundColor: "#0878ff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <LightbulbOutlinedIcon
                sx={{
                  fontSize: 10,
                  color: "#ffffff",
                }}
              />
            </Box>

            <Typography
              sx={{
                fontSize: "9px",
                lineHeight: 1,
                fontWeight: 700,
                color: "#111827",
              }}
            >
              Tia Findings
            </Typography>
          </Stack>

          <Typography
            sx={{
              fontSize: "6px",
              lineHeight: 1.4,
              color: "#9ca3af",
              ml: 3,
            }}
          >
            Ranked, explainable insights with one-click actions
          </Typography>

          {/* Finding rows */}
          <Box sx={{ mt: 0.8 }}>
            {FINDINGS.map((item, index) => (
              <FindingRow
                key={item.title}
                item={item}
                isLast={index === FINDINGS.length - 1}
              />
            ))}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}