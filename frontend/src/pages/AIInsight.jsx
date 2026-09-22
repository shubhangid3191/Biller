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
  AreaChart,
  Area,
  Line,
  ComposedChart,
  ResponsiveContainer,
} from "recharts";

// ---------------------------------------------------------------------------
// Mock data — replace with live data from the relevant service/context layer
// ---------------------------------------------------------------------------

const SUMMARY_CARDS = [
  {
    label: "REVENUE LEAKAGE",
    value: "$33.4K",
    color: "#ef4444",
    note: "Missed charges & underpayments (30d)",
  },
  {
    label: "UNDERPAYMENTS",
    value: "$8.6K",
    color: "#2563eb",
    note: "42 claims paid below contract",
  },
  {
    label: "PREVENTABLE DENIALS",
    value: "$14.8K",
    color: "#f59e0b",
    note: "71% from missing authorization",
  },
];

// projected collections with an upper/lower confidence band
const FORECAST = [
  { week: "W1", low: 1.02, mid: 1.1, high: 1.18 },
  { week: "W", low: 1.08, mid: 1.16, high: 1.24 },
  { week: "W2", low: 1.14, mid: 1.22, high: 1.3 },
  { week: "W3", low: 1.16, mid: 1.25, high: 1.34 },
  { week: "W", low: 1.2, mid: 1.28, high: 1.36 },
  { week: "W", low: 1.22, mid: 1.3, high: 1.38 },
  { week: "W", low: 1.24, mid: 1.32, high: 1.4 },
].map((d) => ({ ...d, band: d.high - d.low }));

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

// ---------------------------------------------------------------------------
// Small presentational helpers
// ---------------------------------------------------------------------------

const SummaryCard = ({ card }) => (
  <Paper
    variant="outlined"
    sx={{ flex: 1, p: 2.5, borderRadius: 2, borderColor: "#e5e7eb" }}
  >
    <Typography
      variant="caption"
      sx={{ color: "#9ca3af", fontWeight: 600, letterSpacing: 0.5 }}
    >
      {card.label}
    </Typography>
    <Typography
      variant="h4"
      sx={{ fontWeight: 700, color: card.color, mt: 0.5 }}
    >
      {card.value}
    </Typography>
    <Typography variant="body2" sx={{ color: "#6b7280", mt: 0.5 }}>
      {card.note}
    </Typography>
    <Stack
      direction="row"
      alignItems="center"
      spacing={0.5}
      sx={{ mt: 1.5, cursor: "pointer" }}
    >
      <Typography variant="body2" sx={{ color: "#2563eb", fontWeight: 600 }}>
        Investigate
      </Typography>
      <ArrowForwardIcon sx={{ fontSize: 14, color: "#2563eb" }} />
    </Stack>
  </Paper>
);

const FindingRow = ({ item, isLast }) => (
  <Box>
    <Stack
      direction="row"
      alignItems="center"
      spacing={1.5}
      sx={{ py: 1.5 }}
    >
      <BoltIcon sx={{ fontSize: 16, color: "#2563eb", flexShrink: 0 }} />
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="body2" sx={{ fontWeight: 600, color: "#111827" }}>
          {item.title}
        </Typography>
        <Typography variant="caption" sx={{ color: "#9ca3af" }}>
          {item.detail}
        </Typography>
      </Box>
      <Typography
        variant="body2"
        sx={{ fontWeight: 700, color: "#111827", flexShrink: 0 }}
      >
        {item.amount}
      </Typography>
      <Button
        size="small"
        variant="contained"
        sx={{
          textTransform: "none",
          bgcolor: "#2563eb",
          "&:hover": { bgcolor: "#1d4ed8" },
          borderRadius: 1.5,
          flexShrink: 0,
          whiteSpace: "nowrap",
        }}
      >
        {item.action}
      </Button>
    </Stack>
    {!isLast && <Divider />}
  </Box>
);

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function AIInsight() {
  return (
    <Box sx={{ bgcolor: "#f5f6f8", p: 3, minHeight: "100vh" }}>
      {/* Header */}
      <Typography
        variant="overline"
        sx={{ color: "#9ca3af", fontWeight: 600, letterSpacing: 1 }}
      >
        COMMAND
      </Typography>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        sx={{ mb: 2 }}
      >
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, color: "#111827" }}>
            AI Insights Center
          </Typography>
          <Typography variant="body2" sx={{ color: "#6b7280", mt: 0.5 }}>
            Proactive intelligence: revenue leakage, underpayment detection,
            denial root-cause, and predictive forecasting — surfaced before
            you ask.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<ForumOutlinedIcon sx={{ fontSize: 16 }} />}
          sx={{
            textTransform: "none",
            bgcolor: "#111827",
            "&:hover": { bgcolor: "#000" },
            borderRadius: 1.5,
            flexShrink: 0,
          }}
        >
          Ask the analyst
        </Button>
      </Stack>

      {/* Summary cards */}
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        {SUMMARY_CARDS.map((c) => (
          <SummaryCard key={c.label} card={c} />
        ))}
      </Stack>

      {/* Forecast + Underpayment detector */}
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Paper
          variant="outlined"
          sx={{ flex: 1.6, p: 2.5, borderRadius: 2, borderColor: "#e5e7eb" }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#111827" }}>
            Predictive Cash Forecast
          </Typography>
          <Typography variant="caption" sx={{ color: "#9ca3af" }}>
            Next 6 weeks &middot; 90% confidence band
          </Typography>
          <Box sx={{ height: 190, mt: 1 }}>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={FORECAST}>
                <Area
                  type="monotone"
                  dataKey="high"
                  stroke="none"
                  fill="#dbeafe"
                  fillOpacity={0.6}
                  stackId="band"
                />
                <Area
                  type="monotone"
                  dataKey="low"
                  stroke="none"
                  fill="#f5f6f8"
                  fillOpacity={1}
                  stackId="band2"
                />
                <Line
                  type="monotone"
                  dataKey="mid"
                  stroke="#2563eb"
                  strokeWidth={2}
                  dot={{ r: 3, fill: "#2563eb", strokeWidth: 0 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </Box>
          <Stack direction="row" justifyContent="space-between" sx={{ px: 0.5, mb: 1.5 }}>
            {FORECAST.map((d, i) => (
              <Typography key={i} variant="caption" sx={{ color: "#9ca3af" }}>
                {d.week}
              </Typography>
            ))}
          </Stack>
          <Divider sx={{ mb: 1.5 }} />
          <Stack spacing={0.75}>
            {[
              ["Projected 30-day collections", "$1.34M"],
              ["Confidence interval", "\u00B1$48K"],
            ].map(([label, val]) => (
              <Stack key={label} direction="row" justifyContent="space-between">
                <Typography variant="body2" sx={{ color: "#6b7280" }}>
                  {label}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 700, color: "#111827" }}>
                  {val}
                </Typography>
              </Stack>
            ))}
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" sx={{ color: "#6b7280" }}>
                Cash velocity trend
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 700, color: "#22c55e" }}>
                +6%
              </Typography>
            </Stack>
          </Stack>
        </Paper>

        <Paper
          variant="outlined"
          sx={{ flex: 1, p: 2.5, borderRadius: 2, borderColor: "#e5e7eb" }}
        >
          <Typography
            variant="caption"
            sx={{ color: "#9ca3af", fontWeight: 600, letterSpacing: 0.5 }}
          >
            UNDERPAYMENT DETECTOR
          </Typography>
          <Typography variant="body2" sx={{ color: "#374151", mt: 1 }}>
            BCBSM is paying 33% below contract on G0439 across 6 claims.
            Revenue: $124.74. This matches a fee-schedule update the payer
            applied incorrectly.
          </Typography>
          <Divider sx={{ my: 1.5 }} />
          <Stack spacing={1}>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" sx={{ color: "#6b7280" }}>
                Contracted rate
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 700, color: "#111827" }}>
                $156.20
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" sx={{ color: "#6b7280" }}>
                Average paid
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 700, color: "#ef4444" }}>
                $136.41
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" sx={{ color: "#6b7280" }}>
                Recoverable
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 700, color: "#111827" }}>
                $124.74
              </Typography>
            </Stack>
          </Stack>
          <Button
            fullWidth
            variant="contained"
            startIcon={<LightbulbOutlinedIcon sx={{ fontSize: 16 }} />}
            sx={{
              textTransform: "none",
              bgcolor: "#2563eb",
              "&:hover": { bgcolor: "#1d4ed8" },
              borderRadius: 1.5,
              mt: 2,
            }}
          >
            Dispute underpayment
          </Button>
        </Paper>
      </Stack>

      {/* Tia Findings */}
      <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2, borderColor: "#e5e7eb" }}>
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 0.5 }}>
          <Box
            sx={{
              width: 22,
              height: 22,
              borderRadius: 1,
              bgcolor: "#2563eb",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <LightbulbOutlinedIcon sx={{ fontSize: 13, color: "#fff" }} />
          </Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#111827" }}>
            Tia Findings
          </Typography>
        </Stack>
        <Typography variant="caption" sx={{ color: "#9ca3af", ml: 4.5 }}>
          Ranked, explainable insights with one-click actions
        </Typography>
        <Box sx={{ mt: 1 }}>
          {FINDINGS.map((f, i) => (
            <FindingRow key={f.title} item={f} isLast={i === FINDINGS.length - 1} />
          ))}
        </Box>
      </Paper>
    </Box>
  );
}