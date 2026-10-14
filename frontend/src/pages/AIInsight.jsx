import React from "react";
import { Box, Paper, Typography, Button, Stack, Divider } from "@mui/material";

import {
  TiaChatIcon,
  RightIcon,
  FlashIcon,
  IdeaIcon,
} from "../assets/Assets.jsx";

import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

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

const FORECAST_DATA = FORECAST.map((d) => ({ ...d, band: [d.low, d.high] }));

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

const CARD_STYLE = {
  backgroundColor: "#FFFFFF",
  border: "1px solid #E5E7EB",
  borderRadius: "7px",
  boxShadow: "none",
};

const ForecastRow = ({ label, value, valueColor = "#1F2937" }) => (
  <Box
    sx={{
      display: "grid !important",
      gridTemplateColumns: "1fr auto",
      alignItems: "center",
      columnGap: 2,
      width: "100%",
    }}
  >
    <Typography
      sx={{ fontSize: "13.5px", color: "#6B7280", textAlign: "left" }}
    >
      {label}
    </Typography>

    <Typography
      sx={{
        fontSize: "13.5px",
        fontWeight: 700,
        color: valueColor,
        textAlign: "right",
        justifySelf: "end",
        whiteSpace: "nowrap",
      }}
    >
      {value}
    </Typography>
  </Box>
);

const SummaryCard = ({ card }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        ...CARD_STYLE,
        flex: 1,
        minWidth: 0,
        minHeight: 140,
        p: 1.75,
        boxSizing: "border-box",
      }}
    >
      <Typography
        sx={{
          fontSize: "10px",
          lineHeight: 1,
          color: "#6B7280",
          fontWeight: 700,
          letterSpacing: "0.45px",
          mb: 1,
        }}
      >
        {card.label}
      </Typography>

      <Typography
        sx={{
          fontSize: "26px",
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
          fontSize: "14px",
          lineHeight: 1.35,
          color: "#6b7280",
        }}
      >
        {card.note}
      </Typography>

      <Stack
        direction="row"
        alignItems="center"
        spacing={0.5}
        sx={{
          mt: 1.2,
          cursor: "pointer",
          width: "fit-content",
        }}
      >
        <Typography
          sx={{
            fontSize: "13.5px",
            color: "#0878ff",
            fontWeight: 600,
          }}
        >
          Investigate
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            transform: "translateY(2px)",
          }}
        >
          <RightIcon width={14} height={14} />
        </Box>
      </Stack>
    </Paper>
  );
};

const FindingRow = ({ item, isLast }) => {
  return (
    <Box>
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          minHeight: 60,
          py: 1,
          gap: 1.5,
        }}
      >
        <FlashIcon
          sx={{
            fontSize: 18,
            color: "#0878ff",
            flexShrink: 0,
          }}
        />

        <Box
          sx={{
            flex: 1,
            minWidth: 0,
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              lineHeight: 1.3,
              fontWeight: 700,
              color: "#1F2937",
              mb: 0.3,
            }}
          >
            {item.title}
          </Typography>

          <Typography
            sx={{
              fontSize: "12px",
              lineHeight: 1.3,
              color: "#6B7280",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {item.detail}
          </Typography>
        </Box>

        <Typography
          sx={{
            fontSize: "15.5px",
            fontWeight: 700,
            color: "#1F2937",
            flexShrink: 0,
            minWidth: 60,
            textAlign: "right",
          }}
        >
          {item.amount}
        </Typography>

        <Button
          variant="contained"
          size="small"
          sx={{
            height: 30,
            minWidth: 0,
            px: 1.5,
            borderRadius: "4px",
            textTransform: "none",
            fontSize: "12px",
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

export default function AIInsight() {
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
      <Box sx={{ mb: 1.75 }}>
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
          COMMAND
        </Typography>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box sx={{ minWidth: 0 }}>
            <Typography
              sx={{
                fontSize: 30,
                fontWeight: 700,
                color: "#111827",
                lineHeight: 1.1,
              }}
            >
              AI Insights Center
            </Typography>

            <Typography
              sx={{
                fontSize: 13.5,
                color: "#4B5563",
                fontWeight: 500,
                mt: 0.5,
                lineHeight: 1.2,
              }}
            >
              Proactive intelligence: revenue leakage, underpayment detection,
              denial root-cause, and predictive forecasting — surfaced before
              you ask.
            </Typography>
          </Box>

          <Button
            variant="contained"
            sx={{
              ml: "auto",
              flexShrink: 0,
              height: 34,
              minWidth: 155,
              px: 1.5,
              borderRadius: "5px",
              textTransform: "none",
              fontSize: "13px",
              fontWeight: 600,
              backgroundColor: "#0878F9",
              boxShadow: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 0.7,
              "&:hover": {
                backgroundColor: "#0878F9",
                boxShadow: "none",
              },
            }}
          >
            <TiaChatIcon color="#fff" width={25} height={25} />
            Ask the analyst
          </Button>
        </Stack>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(3, minmax(0, 1fr))",
          },
          gap: 1.5,
          mb: 1.75,
        }}
      >
        {SUMMARY_CARDS.map((card) => (
          <SummaryCard key={card.label} card={card} />
        ))}
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "minmax(0, 1.7fr) minmax(250px, 0.82fr)",
          },
          gap: 1.5,
          mb: 1.75,
          alignItems: "stretch",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            ...CARD_STYLE,
            minWidth: 0,
            minHeight: 290,
            p: 1.75,
            boxSizing: "border-box",
          }}
        >
          <Typography
            sx={{
              fontSize: "18px",
              lineHeight: 1.2,
              fontWeight: 700,
              color: "#1F2937",
              mb: 0.55,
            }}
          >
            Predictive Cash Forecast
          </Typography>

          <Typography sx={{ fontSize: "14px", color: "#6B7280" }}>
            Next 7 weeks · 90% confidence band
          </Typography>

          <Box sx={{ width: "100%", height: 150, mt: 1 }}>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={FORECAST_DATA}
                margin={{ top: 8, right: 5, left: 5, bottom: 0 }}
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
                  interval={0}
                  padding={{ left: 20, right: 20 }}
                  tick={{ fontSize: 12, fill: "#6B7280" }}
                  dy={5}
                />

                <YAxis hide domain={[0.95, 1.45]} />

                <Area
                  type="monotone"
                  dataKey="band"
                  stroke="none"
                  fill="#eaf2ff"
                  fillOpacity={0.9}
                />

                <Line
                  type="monotone"
                  dataKey="mid"
                  stroke="#0878ff"
                  strokeWidth={1.8}
                  dot={{ r: 2.5, fill: "#0878ff", strokeWidth: 0 }}
                  activeDot={{ r: 3.5 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </Box>

          <Divider sx={{ mt: 1, mb: 1.5, borderColor: "#edf0f3" }} />

          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 1.25,
            }}
          >
            <ForecastRow label="Projected 30-day collections" value="$1.34M" />
            <ForecastRow label="Confidence interval" value="±$48K" />
            <ForecastRow
              label="Cash velocity trend"
              value="+6%"
              valueColor="#16a34a"
            />
          </Box>
        </Paper>

        <Paper
          elevation={0}
          sx={{
            ...CARD_STYLE,
            minWidth: 0,
            minHeight: 290,
            p: 1.75,
            boxSizing: "border-box",
          }}
        >
          <Typography
            sx={{
              fontSize: "12px",
              lineHeight: 1,
              color: "#006DFD",
              fontWeight: 700,
              letterSpacing: "0.5px",
              mb: 1.5,
            }}
          >
            UNDERPAYMENT DETECTOR
          </Typography>

          <Typography
            sx={{
              fontSize: "14px",
              lineHeight: 1.55,
              fontWeight: 600,
              color: "#1F2937",
            }}
          >
            BCBSM is paying 13% below contract on G0439 across 6 claims.
            Recoverable: $124.74. This matches a fee-schedule update the Payor
            applied incorrectly.
          </Typography>

          <Divider sx={{ my: 1.75, borderColor: "#edf0f3" }} />

          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 2.25,
            }}
          >
            <ForecastRow label="Contracted rate" value="$156.20" />
            <ForecastRow
              label="Average paid"
              value="$136.41"
              valueColor="#ef4444"
            />
            <ForecastRow label="Recoverable" value="$124.74" />
          </Box>

          <Button
            fullWidth
            variant="contained"
            startIcon={<IdeaIcon sx={{ fontSize: "16px !important" }} />}
            sx={{
              height: 36,
              mt: 2.5,
              borderRadius: "4px",
              textTransform: "none",
              fontSize: "13px",
              fontWeight: 600,
              backgroundColor: "#0878ff",
              boxShadow: "none",
              "&:hover": { backgroundColor: "#0067e8", boxShadow: "none" },
            }}
          >
            Dispute underpayment
          </Button>
        </Paper>
      </Box>

      <Paper
        elevation={0}
        sx={{
          ...CARD_STYLE,
          width: "100%",
          p: 1.75,
          boxSizing: "border-box",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={1.25}
          sx={{ mb: 0.5 }}
        >
          <Box
            sx={{
              width: 34,
              height: 34,
              borderRadius: "4px",
              backgroundColor: "#0878ff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <IdeaIcon sx={{ fontSize: 15, color: "#ffffff" }} />
          </Box>

          <Typography
            sx={{
              fontSize: "16px",
              lineHeight: 1.2,
              fontWeight: 700,
              color: "#111827",
            }}
          >
            Tia Findings
          </Typography>
        </Stack>

        <Typography
          sx={{
            fontSize: "12px",
            lineHeight: 1.4,
            color: "#6B7280",
            ml: 4.5,
          }}
        >
          Ranked, explainable insights with one-click actions
        </Typography>

        <Box sx={{ mt: 1.5 }}>
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
  );
}