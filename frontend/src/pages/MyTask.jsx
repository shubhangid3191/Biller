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
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ScheduleIcon from "@mui/icons-material/Schedule";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";

// ---------------------------------------------------------------------------
// Mock data — replace with live data from the relevant service/context layer
// ---------------------------------------------------------------------------

const STATUS_CARDS = [
  {
    label: "Needs action now",
    value: 3,
    note: "Critical denials, cash & auth",
    icon: WarningAmberIcon,
    color: "#ef4444",
  },
  {
    label: "Overdue",
    value: 2,
    note: "Past deadline",
    icon: ScheduleIcon,
    color: "#ef4444",
  },
  {
    label: "Routine task",
    value: 4,
    note: "Clear when free",
    icon: AssignmentTurnedInOutlinedIcon,
    color: "#2563eb",
  },
];

const FILTERS = [
  { label: "All", count: 2, active: true },
  { label: "Charge Capture", count: 3 },
  { label: "Payment Posting", count: 4 },
  { label: "Denials", count: 5 },
  { label: "Patient Statement", count: 4 },
  { label: "A/R Calling", count: 5 },
  { label: "Assigned Task", count: 5 },
];

const PRIORITY_STYLES = {
  Critical: { bg: "#fee2e2", color: "#dc2626" },
  High: { bg: "#fef3c7", color: "#b45309" },
  Routine: { bg: "#dcfce7", color: "#16a34a" },
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
    task: "Work UHC 277 rejection \u2014 invalid subscriber ID",
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
    task: "Post BCBSM ERA \u2014 auto-post blocked",
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

const ROW_ICONS = [
  VisibilityOutlinedIcon,
  DescriptionOutlinedIcon,
  EditNoteOutlinedIcon,
  ShareOutlinedIcon,
  OpenInNewOutlinedIcon,
];

// ---------------------------------------------------------------------------
// Small presentational helpers
// ---------------------------------------------------------------------------

const StatusCard = ({ card }) => {
  const Icon = card.icon;
  return (
    <Paper
      variant="outlined"
      sx={{
        flex: 1,
        p: 2,
        borderRadius: 2,
        borderColor: "#e5e7eb",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Typography variant="caption" sx={{ color: "#9ca3af", fontWeight: 500 }}>
          {card.label}
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 700, color: "#111827" }}>
          {card.value}
        </Typography>
        <Typography variant="caption" sx={{ color: "#9ca3af" }}>
          {card.note}
        </Typography>
      </Box>
      <Icon sx={{ color: card.color, fontSize: 22 }} />
    </Paper>
  );
};

const TaskRow = ({ item, isLast }) => {
  const style = PRIORITY_STYLES[item.priority];
  return (
    <Box>
      <Stack direction="row" alignItems="center" spacing={1.5} sx={{ py: 1.25, px: 1 }}>
        <Checkbox size="small" sx={{ p: 0.5 }} />
        <Box sx={{ minWidth: 160 }}>
          <Typography variant="body2" sx={{ fontWeight: 600, color: "#111827" }}>
            {item.who}
          </Typography>
          {item.ref && (
            <Typography variant="caption" sx={{ color: "#9ca3af" }}>
              {item.ref}
            </Typography>
          )}
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="body2" sx={{ color: "#374151" }}>
            {item.task}
          </Typography>
          {item.reasonTag && (
            <Chip
              label={item.reasonTag}
              size="small"
              sx={{
                mt: 0.5,
                height: 18,
                fontSize: 11,
                bgcolor: "#fee2e2",
                color: "#dc2626",
              }}
            />
          )}
        </Box>
        <Chip
          label={item.priority}
          size="small"
          sx={{
            bgcolor: style.bg,
            color: style.color,
            fontWeight: 600,
            fontSize: 12,
            flexShrink: 0,
          }}
        />
        <Box sx={{ minWidth: 110, textAlign: "right", flexShrink: 0 }}>
          {item.overdue && (
            <Typography variant="caption" sx={{ color: "#dc2626", display: "block" }}>
              Overdue
            </Typography>
          )}
          <Typography
            variant="caption"
            sx={{ color: item.overdue ? "#dc2626" : "#6b7280" }}
          >
            {item.overdue ? `Due ${item.time}` : item.time}
          </Typography>
        </Box>
        <Stack direction="row" spacing={0.25} sx={{ flexShrink: 0 }}>
          {ROW_ICONS.map((Icon, i) => (
            <IconButton key={i} size="small">
              <Icon sx={{ fontSize: 16, color: "#2563eb" }} />
            </IconButton>
          ))}
        </Stack>
      </Stack>
      {!isLast && <Divider />}
    </Box>
  );
};

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function MyTask() {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <Box sx={{ bgcolor: "#f5f6f8", p: 3, minHeight: "100vh" }}>
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        sx={{ mb: 2 }}
      >
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, color: "#111827" }}>
            My Tasks
          </Typography>
          <Typography variant="body2" sx={{ color: "#6b7280", mt: 0.5 }}>
            Good morning, Ashok. You have 12 open tasks today, Tuesday, Aug 25
            &mdash; prioritized by revenue impact and deadline.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1.5} sx={{ flexShrink: 0 }}>
          <Button
            variant="outlined"
            startIcon={<GroupAddOutlinedIcon sx={{ fontSize: 16 }} />}
            sx={{
              textTransform: "none",
              borderColor: "#e5e7eb",
              color: "#374151",
              bgcolor: "#fff",
              borderRadius: 1.5,
            }}
          >
            Assign to team
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon sx={{ fontSize: 16 }} />}
            sx={{
              textTransform: "none",
              bgcolor: "#2563eb",
              "&:hover": { bgcolor: "#1d4ed8" },
              borderRadius: 1.5,
            }}
          >
            Add task
          </Button>
        </Stack>
      </Stack>

      {/* Status cards */}
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        {STATUS_CARDS.map((c) => (
          <StatusCard key={c.label} card={c} />
        ))}
        <Paper
          variant="outlined"
          sx={{
            flex: 1,
            p: 2,
            borderRadius: 2,
            borderColor: "#e5e7eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="body2" sx={{ color: "#6b7280", fontWeight: 500 }}>
            My Summary
          </Typography>
          <IconButton
            size="small"
            sx={{ bgcolor: "#2563eb", "&:hover": { bgcolor: "#1d4ed8" }, borderRadius: 1 }}
          >
            <ArrowForwardIcon sx={{ fontSize: 16, color: "#fff" }} />
          </IconButton>
        </Paper>
      </Stack>

      {/* Task list */}
      <Paper variant="outlined" sx={{ borderRadius: 2, borderColor: "#e5e7eb", overflow: "hidden" }}>
        <Box sx={{ px: 2.5, pt: 2 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#111827", letterSpacing: 0.5 }}>
            MY TASKS (12 OPEN)
          </Typography>
        </Box>

        {/* Filter pills */}
        <Stack direction="row" spacing={1} sx={{ px: 2.5, py: 1.5, flexWrap: "wrap" }}>
          {FILTERS.map((f) => (
            <Chip
              key={f.label}
              label={`${f.label}  ${f.count}`}
              clickable
              onClick={() => setActiveFilter(f.label)}
              size="small"
              sx={{
                fontWeight: 600,
                bgcolor: activeFilter === f.label ? "#111827" : "#f3f4f6",
                color: activeFilter === f.label ? "#fff" : "#4b5563",
              }}
            />
          ))}
        </Stack>
        <Divider />

        <Box sx={{ px: 1.5 }}>
          {TASKS.map((t, i) => (
            <TaskRow key={t.who + t.task} item={t} isLast={i === TASKS.length - 1} />
          ))}
        </Box>

        <Box sx={{ px: 2.5, py: 1.5 }}>
          <Typography variant="body2" sx={{ color: "#2563eb", fontWeight: 600, cursor: "pointer" }}>
            &gt; Completed today (4)
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}