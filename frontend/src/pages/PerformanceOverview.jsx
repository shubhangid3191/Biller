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
  Divider,
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
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";

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

const providerData = [
  { name: "Abhimani Wickrama", Jan: 20, Feb: 18, Mar: 16, Apr: 10, May: 12 },
  { name: "Abhimani Wickrama", Jan: 18, Feb: 15, Mar: 14, Apr: 9, May: 12 },
  { name: "Abhimani Wickrama", Jan: 17, Feb: 13, Mar: 13, Apr: 10, May: 11 },
  { name: "Abhimani Wickrama", Jan: 16, Feb: 14, Mar: 12, Apr: 8, May: 11 },
  { name: "Abhimani Wickrama", Jan: 15, Feb: 13, Mar: 12, Apr: 8, May: 10 },
  { name: "Abhimani Wickrama", Jan: 14, Feb: 12, Mar: 11, Apr: 8, May: 10 },
  { name: "Abhimani Wickrama", Jan: 13, Feb: 11, Mar: 10, Apr: 7, May: 9 },
  { name: "Abhimani Wickrama", Jan: 12, Feb: 10, Mar: 10, Apr: 7, May: 9 },
  { name: "Abhimani Wickrama", Jan: 11, Feb: 10, Mar: 9, Apr: 7, May: 8 },
];

const claimRows = Array.from({ length: 10 }, (_, index) => ({
  provider: "Abhimani Wickrama",
  jan: index === 0 ? 660 : 660,
  feb: 908,
  mar: 873,
  apr: 204,
  may: "-",
  jun: "-",
  jul: "-",
  aug: 90,
  sep: 439,
  oct: 872,
  nov: 487,
  dec: 846,
  total: 5379,
}));

const billedRows = Array.from({ length: 9 }, () => ({
  provider: "Abhimani Wickrama",
  billed: "$1,35,800.00",
  collected: "$1,25,800.68",
}));

// -----------------------------------------------------------------------------
// COMMON STYLES
// -----------------------------------------------------------------------------

const blue = "#0867F2";
const border = "#E5E7EB";
const text = "#111827";
const muted = "#8A929E";

// -----------------------------------------------------------------------------
// SMALL SELECT
// -----------------------------------------------------------------------------

const FilterSelect = ({ children, width = 82 }) => (
  <FormControl size="small">
    <Select
      value={children}
      displayEmpty
      IconComponent={KeyboardArrowDownIcon}
      sx={{
        height: 30,
        width,
        borderRadius: "6px",
        backgroundColor: "#fff",
        fontSize: "10px",
        fontWeight: 500,
        color: "#20252D",
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: border,
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "#CBD5E1",
        },
        "& .MuiSelect-select": {
          px: 1.3,
          py: 0,
          display: "flex",
          alignItems: "center",
        },
      }}
    >
      <MenuItem value={children} sx={{ fontSize: "10px" }}>
        {children}
      </MenuItem>
    </Select>
  </FormControl>
);

// -----------------------------------------------------------------------------
// KPI CARD
// -----------------------------------------------------------------------------

const KpiCard = ({
  title,
  value,
  subtitle,
  icon,
  valueColor = "#1665D8",
}) => (
  <Paper
    elevation={0}
    sx={{
      height: 67,
      border: `1px solid ${border}`,
      borderRadius: "9px",
      px: 1.6,
      py: 1.1,
      position: "relative",
      backgroundColor: "#fff",
    }}
  >
    <Typography
      sx={{
        fontSize: "8px",
        color: "#9CA3AF",
        lineHeight: 1,
        mb: 0.45,
      }}
    >
      {title}
    </Typography>

    <Typography
      sx={{
        fontSize: "17px",
        lineHeight: 1.1,
        fontWeight: 700,
        color: valueColor,
      }}
    >
      {value}
    </Typography>

    <Typography
      sx={{
        fontSize: "7px",
        color: "#9CA3AF",
        mt: 0.25,
      }}
    >
      {subtitle}
    </Typography>

    <Box
      sx={{
        position: "absolute",
        right: 12,
        top: 17,
        width: 29,
        height: 29,
        borderRadius: "50%",
        backgroundColor: "#EAF3FF",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {React.cloneElement(icon, {
        sx: {
          fontSize: 15,
          color: blue,
        },
      })}
    </Box>
  </Paper>
);

// -----------------------------------------------------------------------------
// CARD WRAPPER
// -----------------------------------------------------------------------------

const DashboardCard = ({ children, sx = {} }) => (
  <Paper
    elevation={0}
    sx={{
      border: `1px solid ${border}`,
      borderRadius: "9px",
      backgroundColor: "#fff",
      overflow: "hidden",
      ...sx,
    }}
  >
    {children}
  </Paper>
);

// -----------------------------------------------------------------------------
// OVERVIEW
// -----------------------------------------------------------------------------

const OverviewView = () => {
  return (
    <>
      {/* KPI CARDS */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 1.5,
          mb: 1.5,
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
          gridTemplateColumns: "1.35fr 0.9fr 0.9fr",
          gap: 1.5,
          mb: 1.5,
        }}
      >
        {/* Monthly claims */}
        <DashboardCard sx={{ height: 136 }}>
          <Box sx={{ px: 1.4, pt: 1.2 }}>
            <Typography
              sx={{
                fontSize: "10px",
                fontWeight: 700,
                color: text,
              }}
            >
              Total claims by month
            </Typography>
          </Box>

          <Box sx={{ height: 105, px: 0.5 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyClaims}
                margin={{
                  top: 5,
                  right: 5,
                  bottom: 5,
                  left: 0,
                }}
              >
                <CartesianGrid
                  stroke="#EDF2F7"
                  vertical={false}
                />

                <XAxis
                  dataKey="month"
                  tick={{
                    fontSize: 7,
                    fill: "#7890B2",
                  }}
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  tick={{
                    fontSize: 6,
                    fill: "#7890B2",
                  }}
                  axisLine={false}
                  tickLine={false}
                  width={27}
                />

                <Tooltip />

                <Bar
                  dataKey="claims"
                  radius={[2, 2, 0, 0]}
                  fill="#2D6CDF"
                  barSize={12}
                />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </DashboardCard>

        {/* Collections */}
        <DashboardCard sx={{ height: 136 }}>
          <Box sx={{ px: 1.4, pt: 1.2 }}>
            <Typography
              sx={{
                fontSize: "10px",
                fontWeight: 700,
              }}
            >
              Collections
            </Typography>

            <Typography
              sx={{
                fontSize: "7px",
                color: muted,
              }}
            >
              Inpatient vs outpatient
            </Typography>
          </Box>

          <Stack
            direction="row"
            alignItems="center"
            sx={{
              px: 1.5,
              height: 94,
            }}
          >
            <Box sx={{ width: 78, height: 78 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={[
                      { name: "IP", value: 9.67 },
                      { name: "OP", value: 6.87 },
                    ]}
                    dataKey="value"
                    innerRadius={23}
                    outerRadius={31}
                    stroke="none"
                  >
                    <Cell fill="#14A44D" />
                    <Cell fill="#63A7FF" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </Box>

            <Stack spacing={1} sx={{ ml: 1, flex: 1 }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Stack direction="row" spacing={0.7}>
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      bgcolor: "#14A44D",
                    }}
                  />
                  <Typography sx={{ fontSize: "7px" }}>
                    IP
                  </Typography>
                </Stack>

                <Typography
                  sx={{
                    fontSize: "8px",
                    fontWeight: 700,
                    color: "#0A9348",
                    bgcolor: "#DCFCE7",
                    px: 0.7,
                    py: 0.3,
                    borderRadius: "2px",
                  }}
                >
                  $9.67M
                </Typography>
              </Stack>

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Stack direction="row" spacing={0.7}>
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      bgcolor: "#63A7FF",
                    }}
                  />
                  <Typography sx={{ fontSize: "7px" }}>
                    OP
                  </Typography>
                </Stack>

                <Typography
                  sx={{
                    fontSize: "8px",
                    fontWeight: 700,
                    color: "#0878FF",
                    bgcolor: "#EAF3FF",
                    px: 0.7,
                    py: 0.3,
                    borderRadius: "2px",
                  }}
                >
                  $6.87M
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </DashboardCard>

        {/* AR Aging */}
        <DashboardCard sx={{ height: 136 }}>
          <Box sx={{ px: 1.4, pt: 1.2 }}>
            <Typography
              sx={{
                fontSize: "10px",
                fontWeight: 700,
              }}
            >
              AR aging
            </Typography>

            <Typography
              sx={{
                fontSize: "7px",
                color: muted,
              }}
            >
              Amount by days outstanding
            </Typography>
          </Box>

          <Box sx={{ height: 100, px: 0.5 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={arAging}
                margin={{
                  top: 4,
                  right: 5,
                  left: 0,
                  bottom: 2,
                }}
              >
                <CartesianGrid
                  vertical={false}
                  stroke="#EDF2F7"
                />

                <XAxis
                  dataKey="name"
                  tick={{
                    fontSize: 6,
                    fill: "#7890B2",
                  }}
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  tick={{
                    fontSize: 5,
                    fill: "#7890B2",
                  }}
                  axisLine={false}
                  tickLine={false}
                  width={25}
                />

                <Bar
                  dataKey="value"
                  fill="#2D6CDF"
                  radius={[2, 2, 0, 0]}
                  barSize={17}
                />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </DashboardCard>
      </Box>

      {/* ROUNDING / CODING / NOTES */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 1.5,
          mb: 1.5,
        }}
      >
        <StatusCard
          title="Rounding"
          badge="99%"
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
          items={[
            ["Signed", "680", "99.7%"],
            ["Not signed", "2", "0.3%"],
            ["Not added", "0", "0%"],
          ]}
          colors={["#14A44D", "#F59E0B", "#F87171"]}
        />
      </Box>

      {/* ICD / CPT */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 1.5,
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
};

// -----------------------------------------------------------------------------
// STATUS CARD
// -----------------------------------------------------------------------------

const StatusCard = ({
  title,
  badge,
  items,
  colors,
}) => {
  const total = 680;

  return (
    <DashboardCard sx={{ height: 128, p: 1.3 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography
          sx={{
            fontSize: "10px",
            fontWeight: 700,
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            fontSize: "7px",
            fontWeight: 700,
            color: title === "Coding" ? "#B77900" : "#0A9348",
            backgroundColor:
              title === "Coding" ? "#FFF3D6" : "#DCFCE7",
            px: 0.7,
            py: 0.35,
            borderRadius: "2px",
          }}
        >
          {badge}
        </Typography>
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        sx={{ mt: 1 }}
      >
        {/* Donut */}
        <Box
          sx={{
            width: 66,
            height: 66,
            borderRadius: "50%",
            position: "relative",
            flexShrink: 0,
            background: `conic-gradient(
              #14A44D 0deg 270deg,
              #E8F7ED 270deg 360deg
            )`,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: 13,
              borderRadius: "50%",
              backgroundColor: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{
                fontSize: "9px",
                fontWeight: 700,
              }}
            >
              {title === "Rounding" ? "679" : "680"}
            </Typography>

            <Typography
              sx={{
                fontSize: "5px",
                color: muted,
              }}
            >
              Total
            </Typography>
          </Box>
        </Box>

        {/* Legend */}
        <Stack
          spacing={0.65}
          sx={{
            ml: 1.2,
            flex: 1,
          }}
        >
          {items.map((item, index) => (
            <Stack
              key={item[0]}
              direction="row"
              alignItems="center"
              spacing={0.6}
            >
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  bgcolor: colors[index],
                  flexShrink: 0,
                }}
              />

              <Typography
                sx={{
                  fontSize: "6.5px",
                  color: "#4B5563",
                  flex: 1,
                }}
              >
                {item[0]}
              </Typography>

              <Typography
                sx={{
                  fontSize: "6.5px",
                  fontWeight: 600,
                  color: "#4B5563",
                }}
              >
                {item[1]}
              </Typography>

              <Typography
                sx={{
                  fontSize: "7px",
                  fontWeight: 700,
                  color: "#0A9348",
                  backgroundColor: "#DCFCE7",
                  px: 0.5,
                  py: 0.15,
                  borderRadius: "2px",
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

const ProblemsCard = ({
  title,
  subtitle,
  rows,
}) => (
  <DashboardCard sx={{ p: 1.4, minHeight: 154 }}>
    <Typography
      sx={{
        fontSize: "10px",
        fontWeight: 700,
        mb: 0.5,
      }}
    >
      {title}
    </Typography>

    <Typography
      sx={{
        fontSize: "7px",
        color: "#6B7280",
        mb: 1.2,
      }}
    >
      {subtitle}
    </Typography>

    <Stack spacing={1}>
      {rows.map((row, index) => (
        <Stack
          key={row[0]}
          direction="row"
          alignItems="center"
          spacing={0.8}
        >
          <Typography
            sx={{
              width: 36,
              fontSize: "7px",
              fontWeight: 700,
              color: "#2970DB",
            }}
          >
            {row[0]}
          </Typography>

          <Box sx={{ flex: 1 }}>
            <LinearProgress
              variant="determinate"
              value={70 - index * 7}
              sx={{
                height: 5,
                borderRadius: 5,
                backgroundColor: "#E5E7EB",
                "& .MuiLinearProgress-bar": {
                  borderRadius: 5,
                  backgroundColor:
                    index === 0
                      ? "#3478E5"
                      : index === 1
                      ? "#7437F5"
                      : index === 2
                      ? "#1594AF"
                      : index === 3
                      ? "#0D9B75"
                      : "#E78900",
                },
              }}
            />
          </Box>

          <Typography
            sx={{
              width: 23,
              fontSize: "7px",
              color: "#6B7280",
            }}
          >
            {row[1]}
          </Typography>

          <Typography
            sx={{
              width: 105,
              fontSize: "6.5px",
              color: "#4B5563",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {row[2]}
          </Typography>
        </Stack>
      ))}
    </Stack>
  </DashboardCard>
);

// -----------------------------------------------------------------------------
// CLAIMS VIEW
// -----------------------------------------------------------------------------

const ClaimsView = () => {
  return (
    <>
      {/* TOP CLAIMS TABLES */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1.2fr 0.85fr",
          gap: 1.5,
          mb: 1.5,
        }}
      >
        {/* TOTAL CLAIMS */}
        <DashboardCard>
          <Box sx={{ px: 1.5, pt: 1.2, pb: 0.8 }}>
            <Typography
              sx={{
                fontSize: "10px",
                fontWeight: 700,
              }}
            >
              Total Claims
            </Typography>
          </Box>

          <Box sx={{ overflowX: "auto" }}>
            <Table
              size="small"
              sx={{
                minWidth: 760,
                "& .MuiTableCell-root": {
                  borderColor: "#E5E7EB",
                  padding: "5px 6px",
                  fontSize: "6.5px",
                  whiteSpace: "nowrap",
                },
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      backgroundColor: "#EDF3FF",
                      fontWeight: 700,
                    }}
                  >
                    Provider
                  </TableCell>

                  {[
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
                    "Total",
                  ].map((month) => (
                    <TableCell
                      key={month}
                      align="center"
                      sx={{
                        backgroundColor: "#EDF3FF",
                        fontWeight: 700,
                      }}
                    >
                      {month}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {claimRows.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.provider}</TableCell>
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
                          backgroundColor:
                            index % 2 === 0
                              ? "#F4F7FB"
                              : "#FFFFFF",
                        }}
                      >
                        {value}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}

                <TableRow>
                  <TableCell
                    sx={{
                      backgroundColor: "#1768B5",
                      color: "#fff",
                      fontWeight: 700,
                    }}
                  >
                    Total
                  </TableCell>

                  {Array.from({ length: 13 }).map(
                    (_, index) => (
                      <TableCell
                        key={index}
                        align="center"
                        sx={{
                          backgroundColor: "#1768B5",
                          color: "#fff",
                          fontWeight: 700,
                        }}
                      >
                        {index === 12 ? "999" : "999"}
                      </TableCell>
                    )
                  )}
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        </DashboardCard>

        {/* PROVIDER CLAIMS */}
        <DashboardCard>
          <Box sx={{ px: 1.5, pt: 1.2 }}>
            <Typography
              sx={{
                fontSize: "10px",
                fontWeight: 700,
              }}
            >
              Provider Claims
            </Typography>

            <Typography
              sx={{
                fontSize: "7px",
                color: muted,
                mb: 0.5,
              }}
            >
              Provider Name
            </Typography>
          </Box>

          {/* Legend */}
          <Stack
            direction="row"
            spacing={0.8}
            sx={{
              px: 1.5,
              mb: 0.5,
              flexWrap: "wrap",
            }}
          >
            {[
              ["Jan", "#2563EB"],
              ["Feb", "#3730A3"],
              ["Mar", "#E11D48"],
              ["Apr", "#F97316"],
              ["May", "#A855F7"],
            ].map(([name, color]) => (
              <Stack
                key={name}
                direction="row"
                alignItems="center"
                spacing={0.25}
              >
                <Box
                  sx={{
                    width: 5,
                    height: 5,
                    backgroundColor: color,
                  }}
                />

                <Typography
                  sx={{
                    fontSize: "5.5px",
                    color: "#6B7280",
                  }}
                >
                  {name}
                </Typography>
              </Stack>
            ))}
          </Stack>

          <Box
            sx={{
              height: 195,
              px: 0.8,
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={providerData}
                margin={{
                  left: 70,
                  right: 8,
                  top: 2,
                  bottom: 2,
                }}
                barGap={0}
              >
                <XAxis
                  type="number"
                  hide
                />

                <YAxis
                  type="category"
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 6.5,
                    fill: "#4B5563",
                  }}
                  width={75}
                />

                <Bar
                  dataKey="Jan"
                  stackId="a"
                  fill="#2563EB"
                  barSize={6}
                />

                <Bar
                  dataKey="Feb"
                  stackId="a"
                  fill="#3730A3"
                  barSize={6}
                />

                <Bar
                  dataKey="Mar"
                  stackId="a"
                  fill="#E11D48"
                  barSize={6}
                />

                <Bar
                  dataKey="Apr"
                  stackId="a"
                  fill="#F97316"
                  barSize={6}
                />

                <Bar
                  dataKey="May"
                  stackId="a"
                  fill="#A855F7"
                  barSize={6}
                />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </DashboardCard>
      </Box>

      {/* BILLED AND COLLECTED */}
      <DashboardCard>
        <Box sx={{ px: 1.5, pt: 1.2, pb: 0.8 }}>
          <Typography
            sx={{
              fontSize: "10px",
              fontWeight: 700,
            }}
          >
            Total Billed & Collected
          </Typography>
        </Box>

        <Box sx={{ overflowX: "auto" }}>
          <Table
            size="small"
            sx={{
              minWidth: 1000,
              "& .MuiTableCell-root": {
                padding: "6px 7px",
                borderColor: "#D9E2F0",
                fontSize: "6.5px",
                whiteSpace: "nowrap",
              },
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    backgroundColor: "#EDF3FF",
                    fontWeight: 700,
                  }}
                >
                  Provider
                </TableCell>

                {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map(
                  (month) => (
                    <TableCell
                      key={month}
                      align="center"
                      colSpan={2}
                      sx={{
                        backgroundColor: "#EDF3FF",
                        fontWeight: 700,
                      }}
                    >
                      {month}
                    </TableCell>
                  )
                )}
              </TableRow>

              <TableRow>
                <TableCell
                  sx={{
                    backgroundColor: "#F5F8FC",
                  }}
                />

                {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].flatMap(
                  (month) => [
                    <TableCell
                      key={`${month}-billed`}
                      align="center"
                      sx={{
                        backgroundColor: "#FFF1F1",
                      }}
                    >
                      Billed
                    </TableCell>,

                    <TableCell
                      key={`${month}-collected`}
                      align="center"
                      sx={{
                        backgroundColor: "#ECFDF3",
                      }}
                    >
                      Collected
                    </TableCell>,
                  ]
                )}
              </TableRow>
            </TableHead>

            <TableBody>
              {billedRows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.provider}</TableCell>

                  {Array.from({ length: 6 }).flatMap(
                    (_, monthIndex) => [
                      <TableCell
                        key={`billed-${monthIndex}`}
                        align="center"
                        sx={{
                          backgroundColor:
                            index % 2 === 0
                              ? "#FFF1F1"
                              : "#FFF7F7",
                        }}
                      >
                        {row.billed}
                      </TableCell>,

                      <TableCell
                        key={`collected-${monthIndex}`}
                        align="center"
                        sx={{
                          backgroundColor:
                            index % 2 === 0
                              ? "#ECFDF3"
                              : "#F3FFF7",
                        }}
                      >
                        {row.collected}
                      </TableCell>,
                    ]
                  )}
                </TableRow>
              ))}

              <TableRow>
                <TableCell
                  sx={{
                    backgroundColor: "#1768B5",
                    color: "#fff",
                    fontWeight: 700,
                  }}
                >
                  Total
                </TableCell>

                {Array.from({ length: 6 }).flatMap(
                  (_, index) => [
                    <TableCell
                      key={`total-billed-${index}`}
                      colSpan={2}
                      align="center"
                      sx={{
                        backgroundColor: "#1768B5",
                        color: "#fff",
                        fontWeight: 700,
                      }}
                    >
                      $2,244,234.77
                    </TableCell>,
                  ]
                )}
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </DashboardCard>
    </>
  );
};

// -----------------------------------------------------------------------------
// MAIN COMPONENT
// -----------------------------------------------------------------------------

export default function PerformanceOverview() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#F7F8FA",
        px: {
          xs: 1.5,
          md: 2.5,
        },
        py: 2,
        boxSizing: "border-box",
      }}
    >
      {/* CONTENT */}
      <Box
        sx={{
          maxWidth: "1180px",
          mx: "auto",
        }}
      >
        {/* PAGE TITLE */}
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 700,
            color: "#111827",
            mb: 1.2,
          }}
        >
          Performance Overview
        </Typography>

        {/* --------------------------------------------------------------- */}
        {/* TOGGLE + FILTER BAR */}
        {/* --------------------------------------------------------------- */}

        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{
            mb: 1.5,
            flexWrap: "wrap",
            rowGap: 1,
          }}
        >
          {/* OVERVIEW / CLAIMS TOGGLE */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              border: `1px solid ${border}`,
              borderRadius: "6px",
              backgroundColor: "#fff",
              height: 31,
              p: "2px",
            }}
          >
            <Button
              onClick={() => setActiveTab("overview")}
              startIcon={
                <DashboardOutlinedIcon
                  sx={{
                    fontSize: "11px !important",
                  }}
                />
              }
              sx={{
                height: 25,
                minWidth: 72,
                px: 1,
                borderRadius: "4px",
                textTransform: "none",
                fontSize: "8px",
                fontWeight: 600,
                color:
                  activeTab === "overview"
                    ? "#fff"
                    : "#6B7280",
                backgroundColor:
                  activeTab === "overview"
                    ? blue
                    : "transparent",
                "&:hover": {
                  backgroundColor:
                    activeTab === "overview"
                      ? blue
                      : "#F5F7FA",
                },
              }}
            >
              Overview
            </Button>

            <Button
              onClick={() => setActiveTab("claims")}
              startIcon={
                <DescriptionOutlinedIcon
                  sx={{
                    fontSize: "11px !important",
                  }}
                />
              }
              sx={{
                height: 25,
                minWidth: 64,
                px: 1,
                borderRadius: "4px",
                textTransform: "none",
                fontSize: "8px",
                fontWeight: 600,
                color:
                  activeTab === "claims"
                    ? "#fff"
                    : "#6B7280",
                backgroundColor:
                  activeTab === "claims"
                    ? blue
                    : "transparent",
                "&:hover": {
                  backgroundColor:
                    activeTab === "claims"
                      ? blue
                      : "#F5F7FA",
                },
              }}
            >
              Claims
            </Button>
          </Box>

          {/* VIEW TOGGLE */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              border: `1px solid ${border}`,
              borderRadius: "6px",
              backgroundColor: "#fff",
              height: 31,
              p: "2px",
              ml: 1,
            }}
          >
            <Button
              startIcon={
                <ViewListOutlinedIcon
                  sx={{
                    fontSize: "11px !important",
                  }}
                />
              }
              sx={{
                height: 25,
                minWidth: 36,
                borderRadius: "4px",
                color: "#8A929E",
                fontSize: "8px",
                textTransform: "none",
              }}
            />

            <Button
              startIcon={
                <BarChartOutlinedIcon
                  sx={{
                    fontSize: "11px !important",
                  }}
                />
              }
              sx={{
                height: 25,
                minWidth: 36,
                borderRadius: "4px",
                color: "#fff",
                backgroundColor: blue,
                fontSize: "8px",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: blue,
                },
              }}
            />
          </Box>

          {/* FILTERS */}
          <FilterSelect width={67}>YTD</FilterSelect>
          <FilterSelect width={82}>Practice</FilterSelect>
          <FilterSelect width={82}>Insurance</FilterSelect>
          <FilterSelect width={88}>Locations</FilterSelect>
          <FilterSelect width={82}>Doctors</FilterSelect>
          <FilterSelect width={115}>Advanced search</FilterSelect>
        </Stack>

        {/* --------------------------------------------------------------- */}
        {/* CONTENT */}
        {/* --------------------------------------------------------------- */}

        {activeTab === "overview" ? (
          <OverviewView />
        ) : (
          <ClaimsView />
        )}
      </Box>
    </Box>
  );
}