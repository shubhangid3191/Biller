import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  ButtonGroup,
  Stack,
  Divider,
  LinearProgress,
} from "@mui/material";

import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

import {
  TiaChatIcon,
  PredictiveIcon,
  RedCrossIcon,
  InfoIcon,
  CheckGreenIcon,
} from "../assets/Assets.jsx";

import {
  BarChart,
  Bar,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

/* =========================================================
   DATA
========================================================= */

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
    tag: "Riskology",
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
  { day: "Sat", value: 48 },
  { day: "Sun", value: 64 },
];

const CLAIM_PIPELINE = [
  {
    label: "Charges captured",
    value: 673,
    max: 673,
    color: "#374151",
  },
  {
    label: "Coded & scrubbed",
    value: 611,
    max: 673,
    color: "#3B82F6",
  },
  {
    label: "Submitted",
    value: 548,
    max: 673,
    color: "#14B8A6",
  },
  {
    label: "Adjudicated",
    value: 467,
    max: 673,
    color: "#A855F7",
  },
  {
    label: "Paid",
    value: 412,
    max: 673,
    color: "#22C55E",
  },
];

const DENIAL_ROOT_CAUSES = [
  {
    name: "Authorization",
    value: 38,
    color: "#ef4444",
  },
  {
    name: "Missing Info",
    value: 29,
    color: "#f97316",
  },
  {
    name: "Medical Necessity",
    value: 21,
    color: "#eab308",
  },
  {
    name: "Timely Filing",
    value: 14,
    color: "#3b82f6",
  },
];

const DENIAL_TOTAL = DENIAL_ROOT_CAUSES.reduce(
  (sum, item) => sum + item.value,
  0,
);

const AR_AGING = [
  {
    label: "0-30 days",
    amount: "$184.2K",
    pct: 100,
    color: "#22c55e",
  },
  {
    label: "31-60 days",
    amount: "$96.4K",
    pct: 52,
    color: "#84cc16",
  },
  {
    label: "61-90 days",
    amount: "$61.3K",
    pct: 33,
    color: "#eab308",
  },
  {
    label: "91-120 days",
    amount: "$42.8K",
    pct: 23,
    color: "#f97316",
  },
  {
    label: "120+ days",
    amount: "$33.5K",
    pct: 18,
    color: "#ef4444",
  },
];

/* =========================================================
   CARD STYLE
========================================================= */

const CARD_STYLE = {
  backgroundColor: "#FFFFFF",
  border: "1px solid #E5E7EB",
  borderRadius: "7px",
  boxShadow: "none",
};

/* =========================================================
   STATUS ICON
========================================================= */

const StatusIcon = ({ status }) => {
  if (status === "good") {
    return (
      <CheckGreenIcon
        sx={{
          fontSize: 15,
          color: "#22c55e",
        }}
      />
    );
  }

  if (status === "bad") {
    return (
      <RedCrossIcon
        sx={{
          fontSize: 15,
          color: "#ef4444",
        }}
      />
    );
  }

  return (
    <InfoIcon
      sx={{
        fontSize: 15,
        color: "#3b82f6",
      }}
    />
  );
};

/* =========================================================
   METRIC CARD
========================================================= */

const MetricCard = ({ metric }) => {
  const trendData = metric.trend.map((value, index) => ({
    index,
    value,
  }));

  return (
    <Paper
      variant="outlined"
      sx={{
        ...CARD_STYLE,
        height: 130,
        minWidth: 0,
        p: 1.5,
        boxSizing: "border-box",
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography
          sx={{
            flex: 1,
            fontSize: 13,
            fontWeight: 600,
            color: "#4B5563",
            lineHeight: 1.15,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {metric.label}
        </Typography>

        <StatusIcon status={metric.status} />
      </Stack>

      <Typography
        sx={{
          fontSize: 24,
          fontWeight: 700,
          color: "#111827",
          lineHeight: 1,
          mt: 2,
        }}
      >
        {metric.value}
      </Typography>

      <Stack
        direction="row"
        alignItems="flex-end"
        justifyContent="space-between"
        sx={{
          mt: 1.3,
        }}
      >
        <Typography
          sx={{
            fontSize: 12,
            color: metric.trendColor,
            fontWeight: 600,
            lineHeight: 1.15,
            whiteSpace: "nowrap",
          }}
        >
          {metric.status === "info" ? "↓ " : "↑ "}
          {metric.delta}
        </Typography>

        <Box
          sx={{
            width: 65,
            height: 26,
            flexShrink: 0,
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <Line
                type="monotone"
                dataKey="value"
                stroke={metric.trendColor}
                strokeWidth={1.6}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Stack>
    </Paper>
  );
};

/* =========================================================
   PRIORITY ROW
========================================================= */

const PriorityRow = ({ item }) => (
  <Stack
    direction="row"
    alignItems="center"
    spacing={1.5}
    sx={{
      minHeight: 58,
      px: 1.75,
      py: 1,
      borderRadius: "6px",
      boxSizing: "border-box",
      cursor: "pointer",

      // Normal state (sab rows same)
      backgroundColor: "#F8F9FB",
      borderLeft: "3px solid #D1D5DB",
      transition: "background-color 0.15s ease, border-color 0.15s ease",

      // Hover state (jis par hover ho wahi blue)
      "&:hover": {
        backgroundColor: "#EFF6FF",
        borderLeftColor: "#2563EB",
        "& .priority-rank": {
          backgroundColor: "#2563EB",
        },
      },
    }}
  >
    {/* Rank */}
    <Box
      className="priority-rank"
      sx={{
        width: 22,
        height: 22,
        minWidth: 22,
        borderRadius: "50%",
        backgroundColor: "#9CA3AF",
        color: "#FFFFFF",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 11,
        fontWeight: 700,
        transition: "background-color 0.15s ease",
      }}
    >
      {item.rank}
    </Box>

    {/* Text */}
    <Box sx={{ flex: 1, minWidth: 0 }}>
      <Typography
        sx={{
          fontSize: 13.5,
          fontWeight: 700,
          color: "#111827",
          lineHeight: 1.3,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {item.title}
      </Typography>

      <Typography
        sx={{
          fontSize: 11.5,
          color: "#6B7280",
          lineHeight: 1.3,
          mt: 0.4,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {item.subtitle}
      </Typography>
    </Box>

    {/* Amount */}
    <Stack
      alignItems="flex-end"
      spacing={0.3}
      sx={{ minWidth: 88, flexShrink: 0 }}
    >
      <Typography
        sx={{
          fontSize: 13.5,
          fontWeight: 700,
          color: "#111827",
          lineHeight: 1.2,
          whiteSpace: "nowrap",
        }}
      >
        {item.amount}
      </Typography>

      <Typography
        sx={{
          fontSize: 11.5,
          color: "#6B7280",
          lineHeight: 1.2,
          whiteSpace: "nowrap",
        }}
      >
        {item.tag}
      </Typography>
    </Stack>
  </Stack>
);

/* =========================================================
   PIPELINE ROW
========================================================= */

const PipelineRow = ({ row }) => (
  <Box sx={{ width: "100%", minWidth: 0, mb: 2, "&:last-child": { mb: 0 } }}>
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        mb: 0.75,
      }}
    >
      {/* Left: label */}
      <Typography
        sx={{
          flex: 1, // ← bachi hui poori jagah le leta hai
          minWidth: 0,
          fontSize: 13,
          color: "#4B5563",
          lineHeight: 1.2,
          whiteSpace: "nowrap",
        }}
      >
        {row.label}
      </Typography>

      {/* Right: value */}
      <Typography
        sx={{
          ml: "auto", // ← value ko right corner mein bhejta hai
          flexShrink: 0,
          fontSize: 13,
          fontWeight: 700,
          color: "#111827",
          lineHeight: 1.2,
          whiteSpace: "nowrap",
        }}
      >
        {row.value}
      </Typography>
    </Box>

    <LinearProgress
      variant="determinate"
      value={(row.value / row.max) * 100}
      sx={{
        height: 8,
        borderRadius: 4,
        backgroundColor: "#E5E7EB",
        "& .MuiLinearProgress-bar": {
          backgroundColor: row.color,
          borderRadius: 4,
        },
      }}
    />
  </Box>
);
/* =========================================================
   AGING ROW
========================================================= */

const AgingRow = ({ row }) => (
  <Box sx={{ width: "100%", minWidth: 0, mb: 2, "&:last-child": { mb: 0 } }}>
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        mb: 0.75,
      }}
    >
      {/* Left: label */}
      <Typography
        sx={{
          flex: 1,
          fontSize: 13,
          color: "#4B5563",
          lineHeight: 1.2,
        }}
      >
        {row.label}
      </Typography>

      {/* Right: amount */}
      <Typography
        sx={{
          ml: "auto",
          flexShrink: 0,
          fontSize: 13,
          fontWeight: 700,
          color: "#111827",
          lineHeight: 1.2,
          whiteSpace: "nowrap",
        }}
      >
        {row.amount}
      </Typography>
    </Box>

    <LinearProgress
      variant="determinate"
      value={row.pct}
      sx={{
        height: 8,
        borderRadius: 4,
        backgroundColor: "#E5E7EB",
        "& .MuiLinearProgress-bar": {
          backgroundColor: row.color,
          borderRadius: 4,
        },
      }}
    />
  </Box>
);

/* =========================================================
   SUMMARY PAGE
========================================================= */

export default function Summary() {
  const [range, setRange] = useState("Today");

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#F5F6F8",
        p: 2.25,
        boxSizing: "border-box",

        "& *": {
          boxSizing: "border-box",
        },
      }}
    >
      {/* ===================================================
          HEADER
      =================================================== */}

      <Box
        sx={{
          mb: 1.75,
        }}
      >
        <Typography
          sx={{
            fontSize: 12,
            fontWeight: 600,
            color: "#6B7280",
            letterSpacing: 0.7,
            textTransform: "uppercase",
            lineHeight: 1,
            mb: 0.55,
          }}
        >
          OVERVIEW
        </Typography>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          {/* Left */}
          <Box
            sx={{
              minWidth: 0,
            }}
          >
            <Typography
              sx={{
                fontSize: 30,
                fontWeight: 700,
                color: "#111827",
                lineHeight: 1.1,
              }}
            >
              Summary
            </Typography>

            <Typography
              sx={{
                fontSize: 13.5,
                color: "#4B5563",
                fontWeight: 500,
                mt: 0.5,
                lineHeight: 1.2,
                whiteSpace: "nowrap",
              }}
            >
              Good morning, Ashok. TiaStat surfaced 5 priorities protecting
              $19.2K in revenue today.
            </Typography>
          </Box>

          {/* Controls */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={1}
            sx={{
              ml: "auto",
              flexShrink: 0,
              height: "100%",
            }}
          >
            {/* Today / Week / Month */}
            <ButtonGroup
              sx={{
                height: 34,
                borderRadius: "8px",
                overflow: "hidden",
                border: "1px solid #DDE3EA",
                backgroundColor: "#F4F6F8",

                "& .MuiButtonGroup-grouped": {
                  minWidth: 58,
                  height: 32,
                  border: "none !important",
                  borderRadius: "7px !important",
                  padding: "0 10px",
                  color: "#64748B",
                  fontSize: "13px",
                  fontWeight: 600,
                  textTransform: "none",
                },
              }}
            >
              {["Today", "Week", "Month"].map((item) => (
                <Button
                  key={item}
                  onClick={() => setRange(item)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",

                    backgroundColor: range === item ? "#FFFFFF" : "transparent",

                    color: range === item ? "#0D1B2A" : "#5A6B7E",

                    boxShadow:
                      range === item ? "0 1px 3px rgba(0,0,0,0.10)" : "none",

                    "&:hover": {
                      backgroundColor: range === item ? "#FFFFFF" : "#EEF2F6",
                    },
                  }}
                >
                  {item}
                </Button>
              ))}
            </ButtonGroup>

            {/* Generate Daily Brief */}
            <Button
              variant="contained"
              sx={{
                height: 34,
                minWidth: 155,
                px: 1.5,
                borderRadius: "5px",
                backgroundColor: "#0878F9",
                color: "#FFFFFF",
                fontSize: "13px",
                fontWeight: 600,
                textTransform: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "none",
                gap: 0.7,

                "& .MuiButton-startIcon": {
                  marginRight: "5px",
                },

                "&:hover": {
                  backgroundColor: "#0878F9",
                  boxShadow: "none",
                },
              }}
            >
              <TiaChatIcon color="#fff" width={25} height={25} />
              Generate daily brief
            </Button>
          </Stack>
        </Stack>
      </Box>

      {/* ===================================================
          METRICS
      =================================================== */}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
          gap: "10px",
          mb: "14px",
          width: "100%",
          alignItems: "stretch",
        }}
      >
        {METRICS.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </Box>

      {/* ===================================================
          MIDDLE ROW
      =================================================== */}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.7fr) minmax(250px, 0.82fr)",
          gap: 1.5,
          mb: 1.75,
          alignItems: "stretch",
        }}
      >
        {/* =================================================
            AI DAILY PRIORITIES
        ================================================= */}

        <Paper
          variant="outlined"
          sx={{
            ...CARD_STYLE,
            minHeight: 275,
            p: 1.75,
          }}
        >
          {/* Header */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              mb: 0.45,
            }}
          >
            <Stack direction="row" alignItems="center" spacing={0.7}>
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: "3px",
                  backgroundColor: "#2563EB",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <TiaChatIcon color="#fff" width={25} height={25} />
              </Box>

              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#111827",
                }}
              >
                AI Daily Priorities
              </Typography>
            </Stack>

            {/* Right side */}
            <Typography
              sx={{
                fontSize: 13.5,
                color: "#6366F1",
                fontWeight: 600,
                whiteSpace: "nowrap",
                cursor: "pointer",
                marginLeft: "auto",
                textAlign: "right",
              }}
            >
              View all tasks
            </Typography>
          </Stack>

          {/* Subheading */}
          <Typography
            sx={{
              fontSize: 12,
              color: "#6B7280",
              lineHeight: 1.2,
              mb: 1.5,
            }}
          >
            Ranked by revenue impact & deadline risk · refreshed 7:02 AM
          </Typography>

          {/* Priority rows */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            {PRIORITIES.map((item, index) => (
              <PriorityRow
                key={item.rank}
                item={item}
                isLast={index === PRIORITIES.length - 1}
              />
            ))}
          </Box>
        </Paper>

        {/* =================================================
            CHARGES & COLLECTIONS
        ================================================= */}

        <Paper
          variant="outlined"
          sx={{
            ...CARD_STYLE,
            minHeight: 275,
            p: 1.75,
          }}
        >
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: 700,
              color: "#111827",
              lineHeight: 1.1,
            }}
          >
            Charges & Collections
          </Typography>

          <Typography
            sx={{
              fontSize: 12,
              color: "#6B7280",
              mt: 2,
            }}
          >
            Trailing 7 days
          </Typography>

          <Box
            sx={{
              width: "100%",
              height: 125,
              mt: 0.7,
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={CHARGES_COLLECTIONS}
                margin={{
                  top: 8,
                  right: 4,
                  left: -22,
                  bottom: 0,
                }}
                barCategoryGap="22%"
              >
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 12,
                    fill: "#4B5563",
                  }}
                />

                <YAxis hide domain={[0, 70]} />

                <Tooltip
                  cursor={{
                    fill: "transparent",
                  }}
                  contentStyle={{
                    fontSize: 9,
                    borderRadius: 4,
                    border: "1px solid #E5E7EB",
                  }}
                />

                <Bar
                  dataKey="value"
                  fill="#2563EB"
                  radius={[2, 2, 0, 0]}
                  barSize={17}
                />
              </BarChart>
            </ResponsiveContainer>
          </Box>

          <Divider
            sx={{
              borderColor: "#EEF0F3",
              mb: 1.4,
            }}
          />

          <Stack spacing={1.2} sx={{ width: "100%" }}>
            {[
              ["Total billed", "$1.43M"],
              ["Collected", "$1.29M"],
              ["Net collection rate", "96.2%"],
              ["Outstanding A/R", "$418.2K"],
            ].map(([label, value]) => (
              <Stack
                key={label}
                direction="row"
                alignItems="center"
                sx={{ width: "100%" }}
              >
                <Typography
                  sx={{ fontSize: 13, color: "#4B5563", fontWeight: 600 }}
                >
                  {label}
                </Typography>

                <Typography
                  sx={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: "#111827",
                    ml: "auto",
                  }}
                >
                  {value}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Paper>
      </Box>

      {/* ===================================================
          BOTTOM ROW
      =================================================== */}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: 1.5,
          mb: 1.75,
        }}
      >
        {/* =================================================
            CLAIM PIPELINE
        ================================================= */}

        <Paper
          variant="outlined"
          sx={{
            ...CARD_STYLE,
            height: "auto",
            minHeight: 215,
            display: "block",
            overflow: "visible",
            p: 2,
            boxSizing: "border-box",
          }}
        >
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: 700,
              color: "#111827",
              lineHeight: 1.3,
              mb: 2,
            }}
          >
            Claim Pipeline
          </Typography>

          <Box sx={{ width: "100%" }}>
            {CLAIM_PIPELINE.map((row) => (
              <PipelineRow key={row.label} row={row} />
            ))}
          </Box>
        </Paper>

        {/* =================================================
            DENIAL ROOT CAUSES
        ================================================= */}

        <Paper
          variant="outlined"
          sx={{
            ...CARD_STYLE,
            height: "auto", // ← fixed 215 hataya
            minHeight: 215,
            display: "block",
            overflow: "visible",
            p: 2,
            boxSizing: "border-box",
          }}
        >
          {/* Header */}
          <Box>
            <Typography
              sx={{
                fontSize: 18,
                fontWeight: 700,
                color: "#111827",
                lineHeight: 1.3,
              }}
            >
              Denial Root Causes
            </Typography>
            <Typography sx={{ fontSize: 12, color: "#6B7280", mt: 0.5 }}>
              Last 30 days
            </Typography>
          </Box>

          {/* Donut (center) */}
          <Box
            sx={{
              position: "relative",
              width: 130,
              height: 130,
              mx: "auto", // ← beech mein
              mt: 2,
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={DENIAL_ROOT_CAUSES}
                  dataKey="value"
                  innerRadius={44}
                  outerRadius={62}
                  paddingAngle={2}
                  stroke="none"
                >
                  {DENIAL_ROOT_CAUSES.map((item) => (
                    <Cell key={item.name} fill={item.color} stroke="none" />
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
              <Typography
                sx={{
                  fontSize: 28,
                  fontWeight: 700,
                  color: "#111827",
                  lineHeight: 1,
                }}
              >
                {DENIAL_TOTAL}
              </Typography>
              <Typography sx={{ fontSize: 11, color: "#6B7280", mt: 0.4 }}>
                denials
              </Typography>
            </Box>
          </Box>

          {/* Legend (neeche) */}
          <Box sx={{ mt: 2.5, width: "100%" }}>
            {DENIAL_ROOT_CAUSES.map((item) => (
              <Box
                key={item.name}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  mb: 1.25,
                  "&:last-child": { mb: 0 },
                }}
              >
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    minWidth: 10,
                    borderRadius: "50%",
                    backgroundColor: item.color,
                    mr: 1.25,
                  }}
                />
                <Typography sx={{ flex: 1, fontSize: 13, color: "#4B5563" }}>
                  {item.name}
                </Typography>
                <Typography
                  sx={{
                    ml: "auto",
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#111827",
                  }}
                >
                  {item.value}
                </Typography>
              </Box>
            ))}
          </Box>
        </Paper>

        {/* =================================================
            A/R AGING
        ================================================= */}

        <Paper
          variant="outlined"
          sx={{
            ...CARD_STYLE,
            height: "auto",
            minHeight: 215,
            display: "block",
            overflow: "visible",
            p: 2,
            boxSizing: "border-box",
          }}
        >
          {/* Header: title upar, subtitle neeche */}
          <Box>
            <Typography
              sx={{
                fontSize: 18,
                fontWeight: 700,
                color: "#111827",
                lineHeight: 1.3,
              }}
            >
              A/R Aging
            </Typography>
            <Typography sx={{ fontSize: 12, color: "#9CA3AF", mt: 0.5 }}>
              $418.2K outstanding
            </Typography>
          </Box>

          <Box sx={{ mt: 2, width: "100%" }}>
            {AR_AGING.map((row) => (
              <AgingRow key={row.label} row={row} />
            ))}
          </Box>
        </Paper>
      </Box>

      {/* ===================================================
          PREDICTIVE FORECAST
      =================================================== */}

      <Paper
        variant="outlined"
        sx={{
          width: "100%", // parent ki width se bahar nahi jayega
          minWidth: 0,
          backgroundColor: "#EFF6FF",
          border: "1px solid #BFDBFE",
          borderRadius: "6px",
          boxShadow: "none",
          minHeight: 78,
          px: 1.75,
          py: 1.25,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxSizing: "border-box",
        }}
      >
        {/* Left */}
        <Stack
          direction="row"
          spacing={1}
          alignItems="flex-start"
          sx={{
            minWidth: 0,
            flex: 1, // bachi hui jagah le, button ke liye space chhode
          }}
        >
          <Box
            sx={{
              width: 28,
              height: 28,
              minWidth: 20,
              borderRadius: "3px",
              backgroundColor: "#2563EB",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mt: 0.1,
            }}
          >
            <PredictiveIcon sx={{ fontSize: 16, color: "#FFFFFF" }} />
          </Box>

          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography
              sx={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 0.45,
                color: "#015DFF",
                lineHeight: 1,
              }}
            >
              PREDICTIVE FORECAST
            </Typography>

            <Typography
              sx={{
                fontSize: 15,
                color: "#111827",
                fontWeight: 700,
                lineHeight: 1.4,
                mt: 0.35,
                whiteSpace: "normal",
                wordBreak: "break-word",
              }}
            >
              Projected collections next 30 days:{" "}
              <Box
                component="span"
                sx={{ fontSize: 15, color: "#015DFF", fontWeight: 700 }}
              >
                $1.34M (&plusmn;$48K)
              </Box>
              . Cash velocity is improving 6% on faster ERA posting. Watch BCBSM
              medical-necessity denials trending +18% — addressing now protects
              an estimated{" "}
              <Box
                component="span"
                sx={{ fontSize: 15, color: "#015DFF", fontWeight: 700 }}
              >
                $21.3K
              </Box>
              .
            </Typography>
          </Box>
        </Stack>

        {/* Button */}
        <Button
          variant="contained"
          sx={{
            minWidth: 100,
            height: 38,
            ml: 2,
            px: 1.25,
            flexShrink: 0,
            textTransform: "none",
            backgroundColor: "#111827",
            fontSize: 13,
            fontWeight: 600,
            borderRadius: "3px",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "#000000",
              boxShadow: "none",
            },
          }}
        >
          Open forecast
        </Button>
      </Paper>
    </Box>
  );
}
