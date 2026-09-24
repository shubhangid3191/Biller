import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Stack,
  Chip,
  Checkbox,
  IconButton,
  Divider,
} from "@mui/material";

import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import AddIcon from "@mui/icons-material/Add";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";

// -----------------------------------------------------------------------------
// DATA
// -----------------------------------------------------------------------------

const STATUS_CARDS = [
  {
    label: "Needs action now",
    value: 3,
    note: "Critical denials, cash & auth",
    icon: WarningAmberOutlinedIcon,
    iconColor: "#ef4444",
    iconBg: "#fff1f2",
  },
  {
    label: "Overdue",
    value: 2,
    note: "Past deadline",
    icon: ScheduleOutlinedIcon,
    iconColor: "#ef4444",
    iconBg: "#fff1f2",
  },
  {
    label: "Routine task",
    value: 4,
    note: "Clear when free",
    icon: AssignmentOutlinedIcon,
    iconColor: "#2563eb",
    iconBg: "#eff6ff",
  },
];

const FILTERS = [
  { label: "All", count: 2 },
  { label: "Charge Capture", count: 3 },
  { label: "Payment Posting", count: 4 },
  { label: "Denials", count: 5 },
  { label: "Patient Statement", count: 4 },
  { label: "A/R Calling", count: 5 },
  { label: "Assigned Task", count: 5 },
];

const PRIORITY_STYLES = {
  Critical: {
    bg: "#fee2e2",
    color: "#dc2626",
  },
  High: {
    bg: "#fef3c7",
    color: "#b45309",
  },
  Routine: {
    bg: "#dcfce7",
    color: "#16a34a",
  },
};

const TASKS = [
  {
    who: "Bowman, Lisa",
    ref: "RHPL160073",
    task: "Submit inpatient claim missing authorization",
    priority: "Critical",
    time: "8:15 AM",
    overdue: true,
  },
  {
    who: "White, Willie",
    ref: "terms 06/30",
    task: "Re-verify Meridian coverage before DOS",
    priority: "Critical",
    time: "10:45 AM",
  },
  {
    who: "Sloane, Marcus",
    ref: "RHPL1601",
    task: "Work UHC 277 rejection — invalid subscriber ID",
    priority: "Critical",
    time: "10:45 AM",
  },
  {
    who: "Elston, Dwayne",
    ref: "RHPL160043",
    task: "Clear coding review on scrubbed claim",
    priority: "Critical",
    time: "2:30 PM",
  },
  {
    who: "Green, Candy, Tellis +2",
    ref: "",
    task: "Send 5 ready-to-bill encounters to billing",
    priority: "High",
    time: "2:30 PM",
  },
  {
    who: "Check 7905000239",
    ref: "14 claims",
    task: "Post BCBSM ERA — auto-post blocked",
    priority: "High",
    time: "8:15 AM",
    overdue: true,
  },
  {
    who: "ERA 17614",
    ref: "$108.09",
    task: "Reconcile Aetna EFT to posted claims",
    priority: "High",
    time: "2:30 PM",
  },
  {
    who: "Lisha Cook",
    ref: "CPCP143019",
    task: "Appeal CO-197 denial before timely-filing window",
    priority: "High",
    time: "8:15 AM",
    overdue: true,
    reasonTag: "Denial reason",
  },
  {
    who: "Crawford, Mary",
    ref: "CPCP155864",
    task: "Dispute BCBSM underpayment on G0439",
    priority: "Routine",
    time: "10:45 AM",
  },
  {
    who: "Shannon, Laura",
    ref: "CPCP138772",
    task: "File Humana timely-filing exception",
    priority: "Routine",
    time: "10:45 AM",
  },
  {
    who: "Williams, Geraldine",
    ref: "APL-2038",
    task: "Review redetermination draft before submit",
    priority: "Routine",
    time: "2:30 PM",
  },
  {
    who: "Akinyosoye",
    ref: "expires 07/2026",
    task: "Start re-credentialing packet (UHC)",
    priority: "Routine",
    time: "2:30 PM",
  },
];

// -----------------------------------------------------------------------------
// ROW ICONS
// -----------------------------------------------------------------------------

const ROW_ICONS = [
  VisibilityOutlinedIcon,
  DescriptionOutlinedIcon,
  EditNoteOutlinedIcon,
  ShareOutlinedIcon,
  OpenInNewOutlinedIcon,
];

// -----------------------------------------------------------------------------
// STATUS CARD
// -----------------------------------------------------------------------------

const StatusCard = ({ card }) => {
  const Icon = card.icon;

  return (
    <Paper
      variant="outlined"
      sx={{
        height: 66,
        px: 1.5,
        py: 1,
        borderRadius: "7px",
        borderColor: "#dfe4ea",
        backgroundColor: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 1px 2px rgba(0,0,0,0.02)",
        minWidth: 0,
      }}
    >
      <Box sx={{ minWidth: 0 }}>
        <Typography
          sx={{
            fontSize: "8.5px",
            lineHeight: 1.2,
            color: "#8993a4",
            fontWeight: 500,
            mb: 0.2,
            whiteSpace: "nowrap",
          }}
        >
          {card.label}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "baseline",
            gap: 0.5,
            lineHeight: 1,
          }}
        >
          <Typography
            sx={{
              fontSize: "17px",
              lineHeight: 1,
              fontWeight: 700,
              color: card.iconColor,
            }}
          >
            {card.value}
          </Typography>

          <Typography
            sx={{
              fontSize: "8px",
              color: "#8b95a5",
              whiteSpace: "nowrap",
            }}
          >
            {card.note}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          width: 25,
          height: 25,
          borderRadius: "6px",
          backgroundColor: card.iconBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          ml: 0.5,
        }}
      >
        <Icon
          sx={{
            fontSize: 15,
            color: card.iconColor,
          }}
        />
      </Box>
    </Paper>
  );
};

// -----------------------------------------------------------------------------
// TASK ROW
// -----------------------------------------------------------------------------

const TaskRow = ({ item }) => {
  const priority = PRIORITY_STYLES[item.priority];

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns:
          "22px minmax(120px, 1.1fr) minmax(170px, 2fr) 50px 62px 122px",
        alignItems: "center",
        minHeight: item.reasonTag ? 37 : 29,
        px: 0.75,
        borderBottom: "1px solid #edf0f3",
        columnGap: 0.75,
        "&:last-child": {
          borderBottom: "none",
        },
      }}
    >
      {/* CHECKBOX */}
      <Checkbox
        size="small"
        sx={{
          p: 0,
          color: "#cbd3dc",
          "& .MuiSvgIcon-root": {
            fontSize: 15,
          },
        }}
      />

      {/* PATIENT / REFERENCE */}
      <Box
        sx={{
          minWidth: 0,
          display: "flex",
          alignItems: "baseline",
          gap: 0.5,
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        <Typography
          sx={{
            fontSize: "8.5px",
            lineHeight: 1.2,
            fontWeight: 600,
            color: "#526071",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {item.who}
        </Typography>

        {item.ref && (
          <Typography
            sx={{
              fontSize: "7.5px",
              color: "#9ba5b3",
              flexShrink: 0,
              whiteSpace: "nowrap",
            }}
          >
            {item.ref}
          </Typography>
        )}
      </Box>

      {/* TASK */}
      <Box
        sx={{
          minWidth: 0,
          overflow: "hidden",
        }}
      >
        <Typography
          sx={{
            fontSize: "8.5px",
            lineHeight: 1.2,
            color: "#263241",
            fontWeight: 600,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {item.task}
        </Typography>

        {item.reasonTag && (
          <Chip
            label={item.reasonTag}
            size="small"
            sx={{
              mt: 0.15,
              height: 14,
              borderRadius: "4px",
              fontSize: "6.5px",
              backgroundColor: "#fee2e2",
              color: "#dc2626",
              "& .MuiChip-label": {
                px: 0.6,
              },
            }}
          />
        )}
      </Box>

      {/* PRIORITY */}
      <Chip
        label={item.priority}
        size="small"
        sx={{
          width: 47,
          height: 16,
          borderRadius: "4px",
          backgroundColor: priority.bg,
          color: priority.color,
          fontSize: "6.5px",
          fontWeight: 600,
          justifySelf: "center",
          "& .MuiChip-label": {
            px: 0.5,
          },
        }}
      />

      {/* TIME */}
      <Box
        sx={{
          textAlign: "right",
          minWidth: 0,
        }}
      >
        {item.overdue && (
          <Typography
            sx={{
              fontSize: "6.5px",
              lineHeight: 1,
              color: "#ef4444",
              fontWeight: 600,
            }}
          >
            Overdue
          </Typography>
        )}

        <Typography
          sx={{
            fontSize: "7px",
            lineHeight: 1.2,
            color: item.overdue ? "#ef4444" : "#697586",
            whiteSpace: "nowrap",
          }}
        >
          {item.overdue ? `Due ${item.time}` : item.time}
        </Typography>
      </Box>

      {/* ACTION ICONS */}
      <Stack
        direction="row"
        spacing={0}
        sx={{
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        {ROW_ICONS.map((Icon, index) => (
          <IconButton
            key={index}
            size="small"
            sx={{
              width: 20,
              height: 20,
              p: 0,
              color: "#1465e8",
              "&:hover": {
                backgroundColor: "#eff6ff",
              },
            }}
          >
            <Icon
              sx={{
                fontSize: 13,
                strokeWidth: 1.7,
              }}
            />
          </IconButton>
        ))}
      </Stack>
    </Box>
  );
};

// -----------------------------------------------------------------------------
// MAIN COMPONENT
// -----------------------------------------------------------------------------

export default function MyTask() {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#f5f6f8",
        px: { xs: 1.5, sm: 2, md: 2.5 },
        py: { xs: 1.5, sm: 2 },
        boxSizing: "border-box",
      }}
    >
      {/* ------------------------------------------------------------------ */}
      {/* HEADER */}
      {/* ------------------------------------------------------------------ */}

      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          mb: 1.5,
          gap: 2,
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          <Typography
            sx={{
              fontSize: "14px",
              lineHeight: 1.2,
              fontWeight: 700,
              color: "#18212f",
              mb: 0.35,
            }}
          >
            My Tasks
          </Typography>

          <Typography
            sx={{
              fontSize: "8px",
              lineHeight: 1.4,
              color: "#7d8795",
              whiteSpace: "nowrap",
            }}
          >
            Good morning, Ashok. You have 12 open tasks today, Tuesday, Aug 25
            — prioritized by revenue impact and deadline.
          </Typography>
        </Box>

        <Stack
          direction="row"
          spacing={0.75}
          sx={{
            flexShrink: 0,
          }}
        >
          <Button
            variant="outlined"
            startIcon={
              <GroupAddOutlinedIcon
                sx={{
                  fontSize: "13px !important",
                }}
              />
            }
            sx={{
              height: 29,
              minWidth: 95,
              px: 1,
              textTransform: "none",
              fontSize: "7.5px",
              fontWeight: 600,
              color: "#526071",
              backgroundColor: "#fff",
              borderColor: "#dfe4ea",
              borderRadius: "6px",
              boxShadow: "0 1px 1px rgba(0,0,0,0.02)",
              "&:hover": {
                backgroundColor: "#fff",
                borderColor: "#cbd5e1",
              },
            }}
          >
            Assign to team
          </Button>

          <Button
            variant="contained"
            startIcon={
              <AddIcon
                sx={{
                  fontSize: "13px !important",
                }}
              />
            }
            sx={{
              height: 29,
              minWidth: 61,
              px: 1,
              textTransform: "none",
              fontSize: "7.5px",
              fontWeight: 600,
              color: "#fff",
              backgroundColor: "#1769e8",
              borderRadius: "6px",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#155dcc",
                boxShadow: "none",
              },
            }}
          >
            Add task
          </Button>
        </Stack>
      </Box>

      {/* ------------------------------------------------------------------ */}
      {/* STATUS CARDS */}
      {/* ------------------------------------------------------------------ */}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1.08fr",
          gap: 0.75,
          mb: 1.5,
        }}
      >
        {STATUS_CARDS.map((card) => (
          <StatusCard key={card.label} card={card} />
        ))}

        {/* SUMMARY CARD */}
        <Paper
          variant="outlined"
          sx={{
            height: 66,
            px: 1.5,
            borderRadius: "7px",
            borderColor: "#dfe4ea",
            backgroundColor: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontSize: "8px",
              color: "#8a94a3",
              fontWeight: 500,
            }}
          >
            My Summary
          </Typography>

          <IconButton
            size="small"
            sx={{
              width: 23,
              height: 23,
              p: 0,
              borderRadius: "5px",
              backgroundColor: "#1769e8",
              "&:hover": {
                backgroundColor: "#155dcc",
              },
            }}
          >
            <ArrowForwardIcon
              sx={{
                fontSize: 13,
                color: "#fff",
              }}
            />
          </IconButton>
        </Paper>
      </Box>

      {/* ------------------------------------------------------------------ */}
      {/* TASK CONTAINER */}
      {/* ------------------------------------------------------------------ */}

      <Paper
        variant="outlined"
        sx={{
          width: "100%",
          borderRadius: "8px",
          borderColor: "#dfe4ea",
          backgroundColor: "#fff",
          overflow: "hidden",
          boxShadow: "0 1px 2px rgba(0,0,0,0.02)",
        }}
      >
        {/* TITLE */}
        <Box
          sx={{
            px: 1.5,
            pt: 1.25,
            pb: 0.8,
          }}
        >
          <Typography
            sx={{
              fontSize: "8px",
              lineHeight: 1.2,
              fontWeight: 700,
              letterSpacing: "0.4px",
              color: "#283342",
            }}
          >
            MY TASKS (12 OPEN)
          </Typography>
        </Box>

        {/* ---------------------------------------------------------------- */}
        {/* FILTERS */}
        {/* ---------------------------------------------------------------- */}

        <Box
          sx={{
            px: 1.5,
            pb: 1,
            display: "flex",
            alignItems: "center",
            gap: 0.55,
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {FILTERS.map((filter) => {
            const active = activeFilter === filter.label;

            return (
              <Chip
                key={filter.label}
                clickable
                onClick={() => setActiveFilter(filter.label)}
                label={
                  <Box
                    component="span"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.45,
                    }}
                  >
                    <span>{filter.label}</span>

                    <Box
                      component="span"
                      sx={{
                        fontSize: "6.5px",
                        fontWeight: 600,
                        opacity: active ? 0.9 : 0.75,
                      }}
                    >
                      {filter.count}
                    </Box>
                  </Box>
                }
                sx={{
                  height: 18,
                  borderRadius: "9px",
                  backgroundColor: active ? "#edf4ff" : "#fff",
                  border: "1px solid",
                  borderColor: active ? "#c8dcff" : "#e2e7ed",
                  color: active ? "#1769e8" : "#5d6877",
                  fontSize: "6.5px",
                  fontWeight: 500,
                  "& .MuiChip-label": {
                    px: 0.8,
                  },
                  "&:hover": {
                    backgroundColor: active ? "#edf4ff" : "#f8fafc",
                  },
                }}
              />
            );
          })}
        </Box>

        <Divider
          sx={{
            borderColor: "#edf0f3",
          }}
        />

        {/* ---------------------------------------------------------------- */}
        {/* TASK ROWS */}
        {/* ---------------------------------------------------------------- */}

        <Box sx={{ px: 0.75 }}>
          {TASKS.map((task) => (
            <TaskRow
              key={`${task.who}-${task.task}`}
              item={task}
            />
          ))}
        </Box>

        {/* ---------------------------------------------------------------- */}
        {/* COMPLETED */}
        {/* ---------------------------------------------------------------- */}

        <Box
          sx={{
            px: 1.5,
            py: 0.9,
          }}
        >
          <Typography
            sx={{
              fontSize: "7.5px",
              color: "#526071",
              fontWeight: 500,
              cursor: "pointer",
              "&:hover": {
                color: "#1769e8",
              },
            }}
          >
            › Completed today (4)
          </Typography>
        </Box>
      </Paper>

    
    </Box>
  );
}