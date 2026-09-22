import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  ButtonGroup,
  Stack,
  Chip,
  Divider,
  LinearProgress,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

// ---------------------------------------------------------------------------
// Mock data — replace with live data from the relevant service/context layer
// ---------------------------------------------------------------------------

const METRICS = [
  {
    label: "Net Collections (MTD)",
    value: "$1.29M",
    status: "good",
    delta: "+8.4% vs last mo.",
    trend: [4, 5, 4, 6, 7, 6, 8],
    trendColor: "#22c55e",
  },
  {
    label: "Days in A/R",
    value: "34.2",
    status: "info",
    delta: "-2.1 days",
    trend: [8, 7, 7, 6, 5, 5, 4],
    trendColor: "#22c55e",
  },
  {
    label: "Clean Claim Rate",
    value: "94.6%",
    status: "good",
    delta: "+1.2 pts",
    trend: [5, 5, 6, 6, 7, 7, 8],
    trendColor: "#22c55e",
  },
  {
    label: "Denial Rate",
    value: "4.9%",
    status: "bad",
    delta: "+0.7 pts",
    trend: [3, 4, 4, 5, 5, 6, 7],
    trendColor: "#ef4444",
  },
  {
    label: "A/R >= 90 days",
    value: "17.8%",
    status: "good",
    delta: "-0.9 pts",
    trend: [8, 7, 7, 6, 6, 5, 4],
    trendColor: "#22c55e",
  },
];

const PRIORITIES = [
  {
    rank: 1,
    title: "Appeal 18 high-recovery denials before timely-filing window",
    subtitle: "Priority Health / UHC · Medicare · predicted 84% recovery",
    amount: "$9,420",
    tag: "Denials",
  },
  {
    rank: 2,
    title: "Re-verify Meridian Medicaid coverage for 7 patients",
    subtitle: "2 inactive · terms 04/30 · prevents downstream denials",
    amount: "$3,180",
    tag: "Risktology",
  },
  {
    rank: 3,
    title: "Post BCBSM ERA 56,117 (auto-post blocked)",
    subtitle: "Payer-ID mismatch on 4 of 13 claims · can resolve",
    amount: "$6,117",
    tag: "Posting",
  },
  {
    rank: 4,
    title: "Work BCBSM underpayment cluster on 00439",
    subtitle: "5 claims paid 13% below contracted rate",
    amount: "$124",
    tag: "Underpayment",
  },
  {
    rank: 5,
    title: "Submit 2 inpatient claims missing authorization",
    subtitle: "Bowman, Elston · PA required for submit",
    amount: "$342",
    tag: "Pre Bill",
  },
];

const CHARGES_COLLECTIONS = [
  { day: "Mon", value: 38 },
  { day: "Tue", value: 58 },
  { day: "Wed", value: 44 },
  { day: "Thu", value: 61 },
  { day: "Fri", value: 58 },
  { day: "Sat", value: 58 },
  { day: "Sun", value: 64 },
];

const CLAIM_PIPELINE = [
  { label: "Charges captured", value: 673, max: 673, color: "#111827" },
  { label: "Coded & scrubbed", value: 611, max: 673, color: "#3b82f6" },
  { label: "Submitted", value: 548, max: 673, color: "#3b82f6" },
  { label: "Adjudicated", value: 467, max: 673, color: "#a855f7" },
  { label: "Paid", value: 412, max: 673, color: "#22c55e" },
];

const DENIAL_ROOT_CAUSES = [
  { name: "Authorization", value: 38, color: "#ef4444" },
  { name: "Missing Info", value: 29, color: "#f97316" },
  { name: "Medical Necessity", value: 21, color: "#eab308" },
  { name: "Timely Filing", value: 14, color: "#3b82f6" },
];
const DENIAL_TOTAL = DENIAL_ROOT_CAUSES.reduce((s, d) => s + d.value, 0);

const AR_AGING = [
  { label: "0-30 days", amount: "$184.2K", pct: 100, color: "#22c55e" },
  { label: "31-60 days", amount: "$96.4K", pct: 52, color: "#84cc16" },
  { label: "61-90 days", amount: "$61.3K", pct: 33, color: "#eab308" },
  { label: "91-120 days", amount: "$42.8K", pct: 23, color: "#f97316" },
  { label: "120+ days", amount: "$33.5K", pct: 18, color: "#ef4444" },
];

// ---------------------------------------------------------------------------
// Small presentational helpers
// ---------------------------------------------------------------------------

const StatusIcon = ({ status }) => {
  if (status === "good")
    return <CheckCircleIcon sx={{ fontSize: 16, color: "#22c55e" }} />;
  if (status === "bad")
    return <ErrorIcon sx={{ fontSize: 16, color: "#ef4444" }} />;
  return <InfoOutlinedIcon sx={{ fontSize: 16, color: "#3b82f6" }} />;
};

const MetricCard = ({ metric }) => {
  const trendData = metric.trend.map((v, i) => ({ i, v }));
  return (
    <Paper
      variant="outlined"
      sx={{
        flex: 1,
        minWidth: 0,
        p: 2,
        borderRadius: 2,
        borderColor: "#e5e7eb",
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="caption" sx={{ color: "#6b7280", fontWeight: 500 }}>
          {metric.label}
        </Typography>
        <StatusIcon status={metric.status} />
      </Stack>
      <Typography variant="h5" sx={{ fontWeight: 700, mt: 0.5, color: "#111827" }}>
        {metric.value}
      </Typography>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: 0.5 }}>
        <Typography
          variant="caption"
          sx={{ color: metric.trendColor, fontWeight: 600 }}
        >
          {metric.delta}
        </Typography>
        <Box sx={{ width: 56, height: 24 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <Line
                type="monotone"
                dataKey="v"
                stroke={metric.trendColor}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Stack>
    </Paper>
  );
};

const PriorityRow = ({ item, isLast }) => (
  <Box>
    <Stack direction="row" alignItems="flex-start" spacing={1.5} sx={{ py: 1.25 }}>
      <Box
        sx={{
          width: 20,
          height: 20,
          borderRadius: "50%",
          bgcolor: item.rank === 1 ? "#2563eb" : "#e5e7eb",
          color: item.rank === 1 ? "#fff" : "#6b7280",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 11,
          fontWeight: 700,
          flexShrink: 0,
          mt: 0.25,
        }}
      >
        {item.rank}
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="body2" sx={{ fontWeight: 600, color: "#111827" }}>
          {item.title}
        </Typography>
        <Typography variant="caption" sx={{ color: "#9ca3af" }}>
          {item.subtitle}
        </Typography>
      </Box>
      <Stack alignItems="flex-end" spacing={0.25} sx={{ flexShrink: 0 }}>
        <Typography variant="body2" sx={{ fontWeight: 700, color: "#111827" }}>
          {item.amount}
        </Typography>
        <Typography variant="caption" sx={{ color: "#9ca3af" }}>
          {item.tag}
        </Typography>
      </Stack>
    </Stack>
    {!isLast && <Divider />}
  </Box>
);

const PipelineRow = ({ row }) => (
  <Box sx={{ mb: 1.5 }}>
    <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
      <Typography variant="body2" sx={{ color: "#4b5563" }}>
        {row.label}
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 700, color: "#111827" }}>
        {row.value}
      </Typography>
    </Stack>
    <LinearProgress
      variant="determinate"
      value={(row.value / row.max) * 100}
      sx={{
        height: 6,
        borderRadius: 3,
        bgcolor: "#f3f4f6",
        "& .MuiLinearProgress-bar": { bgcolor: row.color, borderRadius: 3 },
      }}
    />
  </Box>
);

const AgingRow = ({ row }) => (
  <Box sx={{ mb: 1.5 }}>
    <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
      <Typography variant="body2" sx={{ color: "#4b5563" }}>
        {row.label}
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: 700, color: "#111827" }}>
        {row.amount}
      </Typography>
    </Stack>
    <LinearProgress
      variant="determinate"
      value={row.pct}
      sx={{
        height: 6,
        borderRadius: 3,
        bgcolor: "#f3f4f6",
        "& .MuiLinearProgress-bar": { bgcolor: row.color, borderRadius: 3 },
      }}
    />
  </Box>
);

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function Summary() {
  const [range, setRange] = useState("Today");

  return (
    <Box sx={{ bgcolor: "#f5f6f8", p: 3, minHeight: "100vh" }}>
      {/* Header */}
      <Typography
        variant="overline"
        sx={{ color: "#9ca3af", fontWeight: 600, letterSpacing: 1 }}
      >
        OVERVIEW
      </Typography>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        sx={{ mb: 2 }}
      >
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, color: "#111827" }}>
            Summary
          </Typography>
          <Typography variant="body2" sx={{ color: "#6b7280", mt: 0.5 }}>
            Good morning, Ashok. TiaStat surfaced 5 priorities protecting $19.2K
            in revenue today.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <ButtonGroup
            variant="outlined"
            size="small"
            sx={{
              bgcolor: "#fff",
              "& .MuiButton-root": {
                textTransform: "none",
                borderColor: "#e5e7eb",
                color: "#6b7280",
              },
            }}
          >
            {["Today", "Week", "Month"].map((r) => (
              <Button
                key={r}
                onClick={() => setRange(r)}
                sx={
                  r === range
                    ? { bgcolor: "#111827 !important", color: "#fff !important" }
                    : {}
                }
              >
                {r}
              </Button>
            ))}
          </ButtonGroup>
          <Button
            variant="contained"
            startIcon={<AutoAwesomeIcon sx={{ fontSize: 16 }} />}
            sx={{
              textTransform: "none",
              bgcolor: "#2563eb",
              "&:hover": { bgcolor: "#1d4ed8" },
              borderRadius: 1.5,
              px: 2,
            }}
          >
            Generate daily brief
          </Button>
        </Stack>
      </Stack>

      {/* Metric cards */}
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        {METRICS.map((m) => (
          <MetricCard key={m.label} metric={m} />
        ))}
      </Stack>

      {/* Priorities + Charges/Collections */}
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Paper
          variant="outlined"
          sx={{ flex: 1.4, p: 2.5, borderRadius: 2, borderColor: "#e5e7eb" }}
        >
          <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#111827" }}>
              AI Daily Priorities
            </Typography>
            <Typography variant="caption" sx={{ color: "#2563eb", fontWeight: 600, cursor: "pointer" }}>
              View all tasks
            </Typography>
          </Stack>
          <Typography variant="caption" sx={{ color: "#9ca3af" }}>
            Ranked by revenue impact and deadline risk · refreshed 7:02 AM
          </Typography>
          <Box sx={{ mt: 1 }}>
            {PRIORITIES.map((p, i) => (
              <PriorityRow key={p.rank} item={p} isLast={i === PRIORITIES.length - 1} />
            ))}
          </Box>
        </Paper>

        <Paper
          variant="outlined"
          sx={{ flex: 1, p: 2.5, borderRadius: 2, borderColor: "#e5e7eb" }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#111827" }}>
            Charges & Collections
          </Typography>
          <Typography variant="caption" sx={{ color: "#9ca3af" }}>
            Trailing 7 days
          </Typography>
          <Box sx={{ height: 140, mt: 1 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CHARGES_COLLECTIONS}>
                <Bar dataKey="value" fill="#2563eb" radius={[3, 3, 0, 0]} barSize={22} />
              </BarChart>
            </ResponsiveContainer>
          </Box>
          <Stack direction="row" justifyContent="space-between" sx={{ px: 0.5, mt: -1, mb: 1.5 }}>
            {CHARGES_COLLECTIONS.map((d) => (
              <Typography key={d.day} variant="caption" sx={{ color: "#9ca3af" }}>
                {d.day.slice(0, 3)}
                <br />
                {d.value}K
              </Typography>
            ))}
          </Stack>
          <Divider sx={{ mb: 1.5 }} />
          <Stack spacing={0.75}>
            {[
              ["Total billed", "$1.43M"],
              ["Collected", "$1.29M"],
              ["Net collection rate", "96.2%"],
              ["Outstanding A/R", "$418.2K"],
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
          </Stack>
        </Paper>
      </Stack>

      {/* Pipeline + Denial causes + A/R aging */}
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Paper variant="outlined" sx={{ flex: 1, p: 2.5, borderRadius: 2, borderColor: "#e5e7eb" }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#111827", mb: 1.5 }}>
            Claim Pipeline
          </Typography>
          {CLAIM_PIPELINE.map((row) => (
            <PipelineRow key={row.label} row={row} />
          ))}
        </Paper>

        <Paper variant="outlined" sx={{ flex: 1, p: 2.5, borderRadius: 2, borderColor: "#e5e7eb" }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#111827" }}>
            Denial Root Causes
          </Typography>
          <Typography variant="caption" sx={{ color: "#9ca3af" }}>
            Last 30 days
          </Typography>
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 1 }}>
            <Box sx={{ position: "relative", width: 120, height: 120, flexShrink: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={DENIAL_ROOT_CAUSES}
                    dataKey="value"
                    innerRadius={38}
                    outerRadius={56}
                    paddingAngle={2}
                  >
                    {DENIAL_ROOT_CAUSES.map((d) => (
                      <Cell key={d.name} fill={d.color} stroke="none" />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  textAlign: "center",
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 700, color: "#111827", lineHeight: 1 }}>
                  {DENIAL_TOTAL}
                </Typography>
                <Typography variant="caption" sx={{ color: "#9ca3af" }}>
                  denials
                </Typography>
              </Box>
            </Box>
            <Stack spacing={0.75} sx={{ flex: 1 }}>
              {DENIAL_ROOT_CAUSES.map((d) => (
                <Stack key={d.name} direction="row" alignItems="center" justifyContent="space-between">
                  <Stack direction="row" alignItems="center" spacing={0.75}>
                    <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: d.color }} />
                    <Typography variant="body2" sx={{ color: "#4b5563" }}>
                      {d.name}
                    </Typography>
                  </Stack>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: "#111827" }}>
                    {d.value}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Paper>

        <Paper variant="outlined" sx={{ flex: 1, p: 2.5, borderRadius: 2, borderColor: "#e5e7eb" }}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#111827" }}>
              A/R Aging
            </Typography>
            <Typography variant="caption" sx={{ color: "#9ca3af" }}>
              $418.2K outstanding
            </Typography>
          </Stack>
          <Box sx={{ mt: 1.5 }}>
            {AR_AGING.map((row) => (
              <AgingRow key={row.label} row={row} />
            ))}
          </Box>
        </Paper>
      </Stack>

      {/* Predictive forecast banner */}
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          borderRadius: 2,
          bgcolor: "#eff6ff",
          borderColor: "#dbeafe",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Stack direction="row" spacing={1.5} alignItems="flex-start">
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
              mt: 0.25,
            }}
          >
            <AutoAwesomeIcon sx={{ fontSize: 13, color: "#fff" }} />
          </Box>
          <Box>
            <Typography variant="caption" sx={{ color: "#2563eb", fontWeight: 700, letterSpacing: 0.5 }}>
              PREDICTIVE FORECAST
            </Typography>
            <Typography variant="body2" sx={{ color: "#374151", mt: 0.25 }}>
              Projected collections next 30 days:{" "}
              <Box component="span" sx={{ color: "#2563eb", fontWeight: 700 }}>
                $1.34M (&plusmn;$48K)
              </Box>
              . Cash velocity is improving 6% on faster ERA posting. Watch
              BCBSM medical-necessity denials trending +18% &ndash; addressing
              now protects an estimated{" "}
              <Box component="span" sx={{ color: "#2563eb", fontWeight: 700 }}>
                $21.3K
              </Box>
              .
            </Typography>
          </Box>
        </Stack>
        <Button
          variant="contained"
          sx={{
            textTransform: "none",
            bgcolor: "#111827",
            "&:hover": { bgcolor: "#000" },
            flexShrink: 0,
            ml: 2,
          }}
        >
          Open forecast
        </Button>
      </Paper>
    </Box>
  );
}