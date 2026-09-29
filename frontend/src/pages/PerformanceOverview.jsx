import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  Paper,
  Select,
  MenuItem,
  FormControl,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  LinearProgress,
} from "@mui/material";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import ViewListOutlinedIcon from "@mui/icons-material/ViewListOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

// -----------------------------------------------------------------------------
// MOCK DATA
// -----------------------------------------------------------------------------

const monthlyClaims = [
  { month: "Jan", claims: 2500 },
  { month: "Feb", claims: 4200 },
  { month: "Mar", claims: 3000 },
  { month: "Apr", claims: 4200 },
  { month: "May", claims: 3500 },
  { month: "Jun", claims: 3000 },
  { month: "Jul", claims: 4200 },
  { month: "Aug", claims: 3000 },
  { month: "Sep", claims: 4200 },
  { month: "Oct", claims: 3200 },
  { month: "Nov", claims: 1700 },
  { month: "Dec", claims: 3800 },
];

const arAging = [
  { name: "0-30", value: 16 },
  { name: "31-60", value: 7 },
  { name: "61-90", value: 4 },
  { name: "91-120", value: 2 },
  { name: "120+", value: 1 },
];

const MONTHS_12 = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const MONTH_COLORS = {
  Jan: "#2F6FED",
  Feb: "#1E22A8",
  Mar: "#F97316",
  Apr: "#8B1AA8",
  May: "#EC4899",
  Jun: "#8B5CF6",
  Jul: "#EAB308",
  Aug: "#EF4444",
  Sep: "#0F9D8A",
  Oct: "#16A34A",
  Nov: "#22D3EE",
  Dec: "#3B82F6",
};

const PROVIDER_BASE = [10, 22, 12, 14, 4, 3, 1, 5, 8, 20, 6, 4];
const PROVIDER_SCALE = [
  1, 0.9, 1.1, 0.8, 1.2, 0.95, 1.05, 1.3, 0.85, 1, 0.9, 1.15,
];

// Each row gets a unique `id` so recharts doesn't merge identical provider names
const providerData = PROVIDER_SCALE.map((scale, id) => {
  const row = { id, name: "Abhimani Wickrama" };
  MONTHS_12.forEach((m, i) => {
    row[m] = Math.round(PROVIDER_BASE[i] * scale);
  });
  return row;
});

const claimRows = Array.from({ length: 11 }, () => ({
  provider: "Abhimani Wickrama",
  jan: 660,
  feb: 908,
  mar: 873,
  apr: 204,
  may: "–",
  jun: "–",
  jul: "–",
  aug: 90,
  sep: 439,
  oct: 872,
  nov: 487,
  dec: 846,
  total: 5379,
}));

const billedRows = Array.from({ length: 11 }, () => ({
  provider: "Abhimani Wickrama",
  billed: "$1,35,800.00",
  collected: "$1,25,800.68",
}));

// -----------------------------------------------------------------------------
// COMMON TOKENS
// -----------------------------------------------------------------------------

const blue = "#0867F2";
const border = "#E5E7EB";
const text = "#111827";
const muted = "#8A929E";

const BAR_DARK = "#1B57B0";
const BAR_LIGHT = "#7BB2F3";
const BAR_LIGHTEST = "#C7DEFB";

const monthBarColor = (claims) =>
  claims >= 3800 ? BAR_DARK : claims < 2000 ? BAR_LIGHTEST : BAR_LIGHT;

// -----------------------------------------------------------------------------
// HEADER CONTROLS
// -----------------------------------------------------------------------------

const FilterSelect = ({ label, width = 100, xsFull = false }) => (
  <FormControl
    size="small"
    sx={{
      width: { xs: xsFull ? "100%" : "calc(50% - 6px)", sm: width },
      flexShrink: 0,
    }}
  >
    <Select
      value={label}
      IconComponent={KeyboardArrowDownIcon}
      sx={{
        height: 42,
        borderRadius: "8px",
        backgroundColor: "#fff",
        fontSize: "14px",
        fontWeight: 500,
        color: text,
        "& .MuiOutlinedInput-notchedOutline": { borderColor: border },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "#CBD5E1",
        },
        "& .MuiSelect-select": {
          pl: 1.75,
          py: 0,
          display: "flex",
          alignItems: "center",
        },
        "& .MuiSelect-icon": { color: blue, right: 8 },
      }}
    >
      <MenuItem value={label} sx={{ fontSize: "14px" }}>
        {label}
      </MenuItem>
    </Select>
  </FormControl>
);

const segmentBtn = (active) => ({
  height: 34,
  px: 1.75,
  minWidth: 0,
  borderRadius: "6px",
  textTransform: "none",
  fontSize: "14px",
  fontWeight: 600,
  color: active ? "#fff" : "#6B7280",
  backgroundColor: active ? blue : "transparent",
  "&:hover": { backgroundColor: active ? blue : "#F5F7FA" },
});

const segmentWrap = {
  display: "flex",
  alignItems: "center",
  border: `1px solid ${border}`,
  borderRadius: "8px",
  backgroundColor: "#fff",
  height: 42,
  p: "3px",
  flexShrink: 0,
};

// -----------------------------------------------------------------------------
// CARDS
// -----------------------------------------------------------------------------

const DashboardCard = ({ children, sx = {} }) => (
  <Paper
    elevation={0}
    sx={{
      border: `1px solid ${border}`,
      borderRadius: "10px",
      backgroundColor: "#fff",
      overflow: "hidden",
      minWidth: 0,
      display: "flex",
      flexDirection: "column",
      ...sx,
    }}
  >
    {children}
  </Paper>
);

const CardTitle = ({ title, subtitle }) => (
  <Box sx={{ mb: 1 }}>
    <Typography
      sx={{ fontSize: "14px", fontWeight: 700, color: text, lineHeight: 1.3 }}
    >
      {title}
    </Typography>
    {subtitle && (
      <Typography sx={{ fontSize: "12px", color: muted, lineHeight: 1.3 }}>
        {subtitle}
      </Typography>
    )}
  </Box>
);

const KpiCard = ({ title, value, subtitle, icon, valueColor = "#1665D8" }) => (
  <Paper
    elevation={0}
    sx={{
      minHeight: 104,
      border: `1px solid ${border}`,
      borderRadius: "10px",
      p: "18px 20px",
      backgroundColor: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 1.5,
      minWidth: 0,
    }}
  >
    <Box sx={{ minWidth: 0 }}>
      <Typography
        sx={{ fontSize: "13px", color: "#6B7280", lineHeight: 1.2, mb: 0.75 }}
      >
        {title}
      </Typography>

      <Typography
        sx={{
          fontSize: { xs: "22px", md: "26px" },
          lineHeight: 1.1,
          fontWeight: 700,
          color: valueColor,
        }}
      >
        {value}
      </Typography>

      <Typography sx={{ fontSize: "12px", color: "#9CA3AF", mt: 0.5 }}>
        {subtitle}
      </Typography>
    </Box>

    <Box
      sx={{
        width: 44,
        height: 44,
        borderRadius: "50%",
        backgroundColor: "#EAF3FF",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {React.cloneElement(icon, { sx: { fontSize: 22, color: blue } })}
    </Box>
  </Paper>
);

// -----------------------------------------------------------------------------
// STATUS CARD (Rounding / Coding / Notes)
// -----------------------------------------------------------------------------

const StatusCard = ({
  title,
  badge,
  badgeColor,
  badgeBg,
  total,
  items,
  colors,
  sx = {},
}) => {
  // Build the donut from the real counts
  const sum = items.reduce((a, it) => a + Number(it[1]), 0) || 1;
  let acc = 0;
  const stops = items
    .map((it, i) => {
      const start = acc;
      acc += (Number(it[1]) / sum) * 360;
      return `${colors[i]} ${start}deg ${acc}deg`;
    })
    .join(", ");

  return (
    <DashboardCard sx={{ p: "18px 20px", minHeight: 190, ...sx }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography sx={{ fontSize: "14px", fontWeight: 700, color: text }}>
          {title}
        </Typography>

        <Typography
          sx={{
            fontSize: "12px",
            fontWeight: 700,
            color: badgeColor,
            backgroundColor: badgeBg,
            px: 1,
            py: 0.4,
            ml: "auto",
            borderRadius: "4px",
            lineHeight: 1.3,
          }}
        >
          {badge}
        </Typography>
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        sx={{ flex: 1, mt: 1.5 }}
      >
        {/* Donut */}
        <Box
          sx={{
            width: 104,
            height: 104,
            borderRadius: "50%",
            position: "relative",
            flexShrink: 0,
            background: `conic-gradient(${stops})`,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: 20,
              borderRadius: "50%",
              backgroundColor: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{ fontSize: "15px", fontWeight: 700, lineHeight: 1.1 }}
            >
              {total}
            </Typography>
            <Typography
              sx={{ fontSize: "10px", color: muted, lineHeight: 1.1 }}
            >
              Total
            </Typography>
          </Box>
        </Box>

        {/* Legend */}
        <Stack spacing={1} sx={{ flex: 1, minWidth: 0 }}>
          {items.map((item, index) => (
            <Stack
              key={item[0]}
              direction="row"
              alignItems="center"
              spacing={0.75}
            >
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  bgcolor: colors[index],
                  flexShrink: 0,
                }}
              />

              <Typography
                sx={{
                  fontSize: "12px",
                  color: "#4B5563",
                  flex: 1,
                  minWidth: 0,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {item[0]}
              </Typography>

              <Typography
                sx={{ fontSize: "12px", fontWeight: 600, color: "#4B5563" }}
              >
                {item[1]}
              </Typography>

              <Typography
                sx={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#0A9348",
                  backgroundColor: "#DCFCE7",
                  px: 0.75,
                  py: 0.2,
                  borderRadius: "4px",
                  minWidth: 42,
                  textAlign: "center",
                }}
              >
                {item[2]}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </DashboardCard>
  );
};

// -----------------------------------------------------------------------------
// ICD / CPT CARD
// -----------------------------------------------------------------------------

const PROBLEM_COLORS = ["#3478E5", "#7437F5", "#1594AF", "#0D9B75", "#E78900"];

const ProblemsCard = ({ title, subtitle, rows }) => {
  const max = Math.max(...rows.map((r) => Number(r[1])));

  return (
    <DashboardCard sx={{ p: "20px 24px" }}>
      <Typography sx={{ fontSize: "14px", fontWeight: 700, mb: 0.5 }}>
        {title}
      </Typography>

      <Typography sx={{ fontSize: "12px", color: "#6B7280", mb: 2 }}>
        {subtitle}
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.75 }}>
        {rows.map((row, index) => (
          <Box
            key={row[0]}
            sx={{
              display: "grid",
              alignItems: "center",
              columnGap: 1.5,
              rowGap: 0.5,
              gridTemplateColumns: {
                xs: "56px minmax(0,1fr) 34px",
                sm: "60px minmax(0,1fr) 34px minmax(130px, 190px)",
              },
            }}
          >
            <Typography
              sx={{ fontSize: "12px", fontWeight: 700, color: "#2970DB" }}
            >
              {row[0]}
            </Typography>

            <LinearProgress
              variant="determinate"
              value={(Number(row[1]) / max) * 92}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: "#E5E7EB",
                "& .MuiLinearProgress-bar": {
                  borderRadius: 4,
                  backgroundColor: PROBLEM_COLORS[index],
                },
              }}
            />

            <Typography
              sx={{ fontSize: "12px", color: "#6B7280", textAlign: "right" }}
            >
              {row[1]}
            </Typography>

            <Typography
              sx={{
                fontSize: "12px",
                color: "#4B5563",
                lineHeight: 1.3,
                gridColumn: { xs: "1 / -1", sm: "auto" },
              }}
            >
              {row[2]}
            </Typography>
          </Box>
        ))}
      </Box>
    </DashboardCard>
  );
};

// -----------------------------------------------------------------------------
// OVERVIEW
// -----------------------------------------------------------------------------

const OverviewView = () => (
  <>
    {/* KPI CARDS */}
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "minmax(0,1fr)",
          sm: "repeat(2, minmax(0,1fr))",
          md: "repeat(4, minmax(0,1fr))",
        },
        gap: "20px",
      }}
    >
      <KpiCard
        title="Total Balance"
        value="$1.96M"
        subtitle="Outstanding AR"
        icon={<AccountBalanceWalletOutlinedIcon />}
      />

      <KpiCard
        title="Payment Received"
        value="$16.53M"
        subtitle="Collected YTD"
        valueColor="#0A9348"
        icon={<AccountBalanceWalletOutlinedIcon />}
      />

      <KpiCard
        title="Payment Velocity"
        value="4 days"
        subtitle="Avg. payout speed"
        icon={<AccessTimeOutlinedIcon />}
      />

      <KpiCard
        title="Denial Rate"
        value="1.05%"
        subtitle="Claims denied"
        valueColor="#EF4444"
        icon={<DescriptionOutlinedIcon />}
      />
    </Box>

    {/* CHART ROW */}
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "minmax(0,1fr)",
          md: "repeat(2, minmax(0,1fr))",
          lg: "minmax(0,1.5fr) minmax(0,1fr) minmax(0,1fr)",
        },
        gap: "20px",
      }}
    >
      {/* Monthly claims */}
      <DashboardCard
        sx={{
          p: "16px 18px",
          gridColumn: { md: "1 / -1", lg: "auto" },
        }}
      >
        <CardTitle title="Total claims by month" />

        <Box sx={{ height: 166, width: "100%" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={monthlyClaims}
              margin={{ top: 5, right: 0, bottom: 0, left: 0 }}
            >
              <CartesianGrid stroke="#EDF2F7" vertical={false} />

              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: "#7890B2" }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{ fontSize: 11, fill: "#7890B2" }}
                axisLine={false}
                tickLine={false}
                width={38}
              />

              <Tooltip cursor={{ fill: "rgba(0,0,0,0.03)" }} />

              <Bar dataKey="claims" radius={[3, 3, 0, 0]} maxBarSize={22}>
                {monthlyClaims.map((d) => (
                  <Cell key={d.month} fill={monthBarColor(d.claims)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </DashboardCard>

      {/* Collections */}
      <DashboardCard sx={{ p: "16px 18px" }}>
        <CardTitle title="Collections" subtitle="Inpatient vs outpatient" />

        <Stack direction="row" alignItems="center" spacing={2} sx={{ flex: 1 }}>
          <Box sx={{ width: 120, height: 120, flexShrink: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: "IP", value: 9.67 },
                    { name: "OP", value: 6.87 },
                  ]}
                  dataKey="value"
                  innerRadius={38}
                  outerRadius={56}
                  startAngle={90}
                  endAngle={-270}
                  stroke="none"
                >
                  <Cell fill="#14A44D" />
                  <Cell fill="#63A7FF" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Box>

          <Stack spacing={1.5} sx={{ flex: 1, minWidth: 0 }}>
            {[
              ["IP", "$9.67M", "#14A44D", "#0A9348", "#DCFCE7"],
              ["OP", "$6.87M", "#63A7FF", "#0878FF", "#EAF3FF"],
            ].map(([label, value, dot, color, bg]) => (
              <Stack
                key={label}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={1}
              >
                <Stack direction="row" alignItems="center" spacing={0.75}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      bgcolor: dot,
                    }}
                  />
                  <Typography sx={{ fontSize: "12px", color: "#4B5563" }}>
                    {label}
                  </Typography>
                </Stack>

                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color,
                    bgcolor: bg,
                    px: 1,
                    py: 0.35,
                    borderRadius: "4px",
                  }}
                >
                  {value}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </DashboardCard>

      {/* AR Aging */}
      <DashboardCard sx={{ p: "16px 18px" }}>
        <CardTitle title="AR aging" subtitle="Amount by days outstanding" />

        <Box sx={{ height: 140, width: "100%" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={arAging}
              margin={{ top: 4, right: 0, left: 0, bottom: 0 }}
            >
              <CartesianGrid vertical={false} stroke="#EDF2F7" />

              <XAxis
                dataKey="name"
                tick={{ fontSize: 10, fill: "#7890B2" }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{ fontSize: 10, fill: "#7890B2" }}
                axisLine={false}
                tickLine={false}
                width={28}
              />

              <Tooltip cursor={{ fill: "rgba(0,0,0,0.03)" }} />

              <Bar dataKey="value" radius={[3, 3, 0, 0]} maxBarSize={28}>
                {arAging.map((d, i) => (
                  <Cell key={d.name} fill={i === 0 ? BAR_DARK : BAR_LIGHT} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </DashboardCard>
    </Box>

    {/* ROUNDING / CODING / NOTES */}
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "minmax(0,1fr)",
          md: "repeat(2, minmax(0,1fr))",
          lg: "repeat(3, minmax(0,1fr))",
        },
        gap: "20px",
      }}
    >
      <StatusCard
        title="Rounding"
        badge="99%"
        badgeColor="#0A9348"
        badgeBg="#DCFCE7"
        total="679"
        items={[
          ["Seen by me", "750", "75%"],
          ["Not seen", "125", "1%"],
          ["Seen by others", "125", "24%"],
        ]}
        colors={["#14A44D", "#60A5FA", "#84CC16"]}
      />

      <StatusCard
        title="Coding"
        badge="7 Pending"
        badgeColor="#B77900"
        badgeBg="#FFF3D6"
        total="680"
        items={[
          ["Sent to billing", "668", "98.2%"],
          ["Drafted", "3", "0.4%"],
          ["Partial", "2", "0.3%"],
          ["Pending", "7", "1.0%"],
        ]}
        colors={["#14A44D", "#60A5FA", "#FBBF24", "#F87171"]}
      />

      <StatusCard
        title="Notes"
        badge="2 Unsigned"
        badgeColor="#DC2626"
        badgeBg="#FEE2E2"
        total="680"
        items={[
          ["Signed", "680", "99.7%"],
          ["Not signed", "2", "0.3%"],
          ["Not added", "0", "0%"],
        ]}
        colors={["#14A44D", "#F59E0B", "#F87171"]}
        sx={{ gridColumn: { md: "1 / -1", lg: "auto" } }}
      />
    </Box>

    {/* ICD / CPT */}
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "minmax(0,1fr)",
          md: "repeat(2, minmax(0,1fr))",
        },
        gap: "20px",
      }}
    >
      <ProblemsCard
        title="Top ICD-10 problems"
        subtitle={
          <>
            Top 5 of <b>1,383 total diagnoses</b> this period
          </>
        }
        rows={[
          ["R42", "172", "Dizziness and giddiness"],
          ["R51.9", "184", "Headache, unspecified"],
          ["J11.1", "170", "Influenza with pharyngitis"],
          ["I63.9", "165", "Cerebral infarction, unspecified"],
          ["R06.02", "162", "Shortness of breath"],
        ]}
      />

      <ProblemsCard
        title="Top CPT procedures"
        subtitle={
          <>
            Top 5 of <b>1,336 total procedures</b> this period
          </>
        }
        rows={[
          ["99214", "312", "Clinic visit, moderate complexity"],
          ["99222", "205", "Initial hospital care"],
          ["99223", "213", "Initial hospital care, high"],
          ["99233", "199", "Subsequent hospital care"],
          ["94664", "213", "MDI or nebulizer demonstration"],
        ]}
      />
    </Box>
  </>
);

// -----------------------------------------------------------------------------
// CLAIMS VIEW
// -----------------------------------------------------------------------------

const CARD_BORDER = "#C3D2F2";
const CELL_BORDER = "#DCE4F5";
const HEAD_BG = "#EAF0FF";
const SUBHEAD_BG = "#F5F8FF";
const TOTAL_BG = "#1B5FA8";
const BILLED_BG = "#FAC3C3";
const COLLECTED_BG = "#C6EFAE";
const HEAT_MAX = 908;

// Heat-map shade: higher value = darker blue, "–" stays white
const heatBg = (v) =>
  typeof v === "number"
    ? `rgba(37, 99, 235, ${0.1 + 0.5 * (v / HEAT_MAX)})`
    : "#FFFFFF";

const gridTableSx = (minWidth) => ({
  minWidth,
  "& .MuiTableCell-root": {
    border: `1px solid ${CELL_BORDER}`,
    padding: "6px 4px",
    fontSize: "12px",
    lineHeight: 1.5,
    whiteSpace: "nowrap",
    color: text,
  },
  "& .MuiTableCell-root.pv": {
    paddingLeft: "12px",
    paddingRight: "8px",
    borderLeft: 0,
    minWidth: 150,
  },
  "& .MuiTableCell-root.total-cell": {
    backgroundColor: TOTAL_BG,
    color: "#fff",
    fontWeight: 700,
    borderColor: "rgba(255,255,255,0.28)",
  },
  "& tr > *:last-child": { borderRight: 0 },
  "& thead tr:first-of-type > *": { borderTop: 0 },
  "& tbody tr:last-of-type > *": { borderBottom: 0 },
});

const SectionTitle = ({ children }) => (
  <Typography sx={{ fontSize: "14px", fontWeight: 700, color: text, mb: 1 }}>
    {children}
  </Typography>
);

const ProviderHead = ({ rowSpan }) => (
  <TableCell
    className="pv"
    rowSpan={rowSpan}
    sx={{ backgroundColor: HEAD_BG, fontWeight: 700 }}
  >
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <span>Provider</span>
      <KeyboardArrowDownIcon sx={{ fontSize: 18, color: "#374151" }} />
    </Stack>
  </TableCell>
);

// Custom tick: plain SVG <text> never wraps (recharts' default tick does)
const NameTick = ({ x, y, payload }) => (
  <text
    x={x}
    y={y}
    dy={4}
    textAnchor="end"
    fontSize={11}
    fontWeight={500}
    fill={text}
  >
    {providerData[payload.value].name}
  </text>
);

const ClaimsView = () => (
  <>
    {/* TOP: TOTAL CLAIMS + PROVIDER CLAIMS */}
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "minmax(0,1fr)",
          lg: "minmax(0,1.35fr) minmax(0,1fr)",
        },
        gap: "20px",
      }}
    >
      {/* TOTAL CLAIMS */}
      <Box sx={{ minWidth: 0, display: "flex", flexDirection: "column" }}>
        <SectionTitle>Total Claims</SectionTitle>

        <DashboardCard sx={{ borderColor: CARD_BORDER, flex: 1 }}>
          <Box sx={{ overflowX: "auto" }}>
            <Table size="small" sx={gridTableSx(660)}>
              <TableHead>
                <TableRow>
                  <ProviderHead />

                  {[...MONTHS_12, "Total"].map((m) => (
                    <TableCell
                      key={m}
                      align="center"
                      sx={{ backgroundColor: HEAD_BG, fontWeight: 700 }}
                    >
                      {m}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {claimRows.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell className="pv">{row.provider}</TableCell>

                    {[
                      row.jan,
                      row.feb,
                      row.mar,
                      row.apr,
                      row.may,
                      row.jun,
                      row.jul,
                      row.aug,
                      row.sep,
                      row.oct,
                      row.nov,
                      row.dec,
                      row.total,
                    ].map((value, i) => (
                      <TableCell
                        key={i}
                        align="center"
                        sx={{
                          backgroundColor: i === 12 ? "#FFFFFF" : heatBg(value),
                        }}
                      >
                        {value}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}

                <TableRow>
                  <TableCell className="pv total-cell">Total</TableCell>

                  {Array.from({ length: 13 }).map((_, index) => (
                    <TableCell
                      key={index}
                      align="center"
                      className="total-cell"
                    >
                      999
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        </DashboardCard>
      </Box>

      {/* PROVIDER CLAIMS */}
      <Box sx={{ minWidth: 0, display: "flex", flexDirection: "column" }}>
        <SectionTitle>Provider Claims</SectionTitle>

        <DashboardCard sx={{ borderColor: "#E1E8F6", flex: 1 }}>
          {/* Header strip: name + 12-month legend */}
          <Box sx={{ backgroundColor: HEAD_BG, px: 2, py: 1.25 }}>
            <Typography
              sx={{ fontSize: "12px", fontWeight: 700, color: text, mb: 0.75 }}
            >
              Provider Name
            </Typography>

            <Stack
              direction="row"
              sx={{ flexWrap: "wrap", columnGap: 1.25, rowGap: 0.5 }}
            >
              {MONTHS_12.map((m) => (
                <Stack
                  key={m}
                  direction="row"
                  alignItems="center"
                  spacing={0.5}
                >
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      backgroundColor: MONTH_COLORS[m],
                    }}
                  />
                  <Typography sx={{ fontSize: "11px", color: "#4B5563" }}>
                    {m}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Box>

          <Box
            sx={{
              height: 340,
              width: "100%",
              px: 1,
              py: 1.5,
              overflowX: "auto",
              overflowY: "hidden",
            }}
          >
            <ResponsiveContainer width="100%" height="100%" minWidth={420}>
              <BarChart
                layout="vertical"
                data={providerData}
                margin={{ left: 0, right: 8, top: 0, bottom: 0 }}
                barCategoryGap={8}
              >
                <XAxis type="number" hide />

                {/* Unique id per row so identical names don't collapse into one row */}
                <YAxis
                  type="category"
                  dataKey="id"
                  interval={0}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(id) => providerData[id].name}
                  tick={<NameTick />}
                  width={125}
                />

                <Tooltip cursor={{ fill: "rgba(0,0,0,0.03)" }} />

                {MONTHS_12.map((m) => (
                  <Bar
                    key={m}
                    dataKey={m}
                    stackId="a"
                    fill={MONTH_COLORS[m]}
                    barSize={10}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </DashboardCard>
      </Box>
    </Box>

    {/* TOTAL BILLED & COLLECTED */}
    <Box sx={{ minWidth: 0 }}>
      <SectionTitle>Total Billed & Collected</SectionTitle>

      <DashboardCard sx={{ borderColor: CARD_BORDER }}>
        <Box sx={{ overflowX: "auto" }}>
          <Table size="small" sx={gridTableSx(1330)}>
            <TableHead>
              <TableRow>
                <ProviderHead rowSpan={2} />

                {MONTHS_12.slice(0, 6).map((m) => (
                  <TableCell
                    key={m}
                    align="center"
                    colSpan={2}
                    sx={{
                      backgroundColor: HEAD_BG,
                      fontWeight: 700,
                      py: "9px !important",
                    }}
                  >
                    {m}
                  </TableCell>
                ))}
              </TableRow>

              <TableRow>
                {MONTHS_12.slice(0, 6).flatMap((m) => [
                  <TableCell
                    key={`${m}-billed`}
                    align="center"
                    sx={{ backgroundColor: SUBHEAD_BG }}
                  >
                    Billed
                  </TableCell>,
                  <TableCell
                    key={`${m}-collected`}
                    align="center"
                    sx={{ backgroundColor: SUBHEAD_BG }}
                  >
                    Collected
                  </TableCell>,
                ])}
              </TableRow>
            </TableHead>

            <TableBody>
              {billedRows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell className="pv">{row.provider}</TableCell>

                  {Array.from({ length: 6 }).flatMap((_, mi) => [
                    <TableCell
                      key={`billed-${mi}`}
                      align="center"
                      sx={{ backgroundColor: BILLED_BG }}
                    >
                      {row.billed}
                    </TableCell>,
                    <TableCell
                      key={`collected-${mi}`}
                      align="center"
                      sx={{ backgroundColor: COLLECTED_BG }}
                    >
                      {row.collected}
                    </TableCell>,
                  ])}
                </TableRow>
              ))}

              <TableRow>
                <TableCell className="pv total-cell">Total</TableCell>

                {Array.from({ length: 6 }).map((_, i) => (
                  <TableCell
                    key={`total-${i}`}
                    colSpan={2}
                    align="center"
                    className="total-cell"
                  >
                    $2,244,234.77
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </DashboardCard>
    </Box>
  </>
);

// -----------------------------------------------------------------------------
// MAIN COMPONENT
// -----------------------------------------------------------------------------

export default function PerformanceOverview() {
  const [activeTab, setActiveTab] = useState("overview");
  const [viewMode, setViewMode] = useState("chart");

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#F7F8FA",
        px: { xs: "12px", sm: "16px", md: "24px" },
        pt: { xs: "12px", md: "9px" },
        pb: "24px",
        boxSizing: "border-box",
      }}
    >
      {/* Figma: frames are 1224px wide, header → content gap 24px */}
      <Box
        sx={{
          maxWidth: 1224,
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        {/* ------------------------------------------------------------- */}
        {/* HEADER  (Figma: padding 16px 24px, gap 10px, white)            */}
        {/* ------------------------------------------------------------- */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "10px",
            p: { xs: "12px", md: "16px 24px" },
            backgroundColor: "#FFFFFF",
            borderRadius: "8px",
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "18px", md: "22px" },
              lineHeight: "32px",
              fontWeight: 700,
              color: "#000000",
            }}
          >
            Performance Overview
          </Typography>

          <Stack
            direction="row"
            alignItems="center"
            sx={{ flexWrap: "wrap", gap: "12px", width: "100%" }}
          >
            {/* OVERVIEW / CLAIMS */}
            <Box sx={segmentWrap}>
              <Button
                onClick={() => setActiveTab("overview")}
                startIcon={
                  <DashboardOutlinedIcon sx={{ fontSize: "18px !important" }} />
                }
                sx={segmentBtn(activeTab === "overview")}
              >
                Overview
              </Button>

              <Button
                onClick={() => setActiveTab("claims")}
                startIcon={
                  <DescriptionOutlinedIcon
                    sx={{ fontSize: "18px !important" }}
                  />
                }
                sx={segmentBtn(activeTab === "claims")}
              >
                Claims
              </Button>
            </Box>

            {/* LIST / CHART */}
            <Box sx={segmentWrap}>
              <Button
                aria-label="List view"
                onClick={() => setViewMode("list")}
                sx={{ ...segmentBtn(viewMode === "list"), width: 40, px: 0 }}
              >
                <ViewListOutlinedIcon sx={{ fontSize: 18 }} />
              </Button>

              <Button
                aria-label="Chart view"
                onClick={() => setViewMode("chart")}
                sx={{ ...segmentBtn(viewMode === "chart"), width: 40, px: 0 }}
              >
                <BarChartOutlinedIcon sx={{ fontSize: 18 }} />
              </Button>
            </Box>

            {/* FILTERS */}
            <FilterSelect label="YTD" width={92} />
            <FilterSelect label="Practice" width={112} />
            <FilterSelect label="Insurance" width={120} />
            <FilterSelect label="Locations" width={120} />
            <FilterSelect label="Doctors" width={112} />
            <FilterSelect label="Advanced search" width={168} xsFull />
          </Stack>
        </Box>

        {/* ------------------------------------------------------------- */}
        {/* CONTENT  (Figma: column, gap 20px)                             */}
        {/* ------------------------------------------------------------- */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            minWidth: 0,
          }}
        >
          {activeTab === "overview" ? <OverviewView /> : <ClaimsView />}
        </Box>
      </Box>
    </Box>
  );
}