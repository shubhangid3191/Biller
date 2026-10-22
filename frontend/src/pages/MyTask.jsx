import React, { useState, useRef, useEffect } from "react";
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
  Dialog,
  TextField,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
  InputAdornment,
  Popover,
} from "@mui/material";

import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import AddIcon from "@mui/icons-material/Add";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import FolderIcon from "@mui/icons-material/Folder";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";

import {
  EyeIcon,
  NotesIcon,
  NoteEditIcon2,
  SharedIcon,
  OpenNewIcon,
} from "../assets/Assets";

// -----------------------------------------------------------------------------
// DATA
// -----------------------------------------------------------------------------

const STATUS_CARDS = [
  {
    label: "Needs action now",
    value: 3,
    note: "Critical denials, cash & auth",
    icon: WarningAmberOutlinedIcon,
    iconColor: "#C0322F",
    iconBg: "#fff1f2",
  },
  {
    label: "Overdue",
    value: 2,
    note: "Past deadline",
    icon: ScheduleOutlinedIcon,
    iconColor: "#C0322F",
    iconBg: "#fff1f2",
  },
  {
    label: "Routine task",
    value: 4,
    note: "Clear when free",
    icon: AssignmentOutlinedIcon,
    iconColor: "#0F7A45",
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
    bg: "#FDE9E9",
    color: "#C0322F",
  },
  High: {
    bg: "#FEF3D6",
    color: "#A26708",
  },
  Routine: {
    bg: "#DCF5E6",
    color: "#0C8F7E",
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

// Add Task popup dropdown options
const TASK_TYPES = [
  "Charge Capture",
  "Payment Posting",
  "Denials",
  "Patient Statement",
  "A/R Calling",
  "Other",
];
const LINK_TO_OPTIONS = ["Patient", "Claim", "Check / ERA"];
const PRIORITY_OPTIONS = ["Critical", "High", "Routine"];
const ASSIGNEE_OPTIONS = ["Ashok", "Julia R", "Amit K", "Sara L"];

const ALLOWED_FILE_TYPES = ["application/pdf", "image/jpeg", "image/png"];
const MAX_FILE_BYTES = 110 * 1024 * 1024; // 110 MB
const DATE_FORMAT = "DD/MM/YYYY";

// -----------------------------------------------------------------------------
// ROW ICONS
// -----------------------------------------------------------------------------

const ROW_ICONS = [EyeIcon, NotesIcon, NoteEditIcon2, SharedIcon, OpenNewIcon];

// -----------------------------------------------------------------------------
// ADD TASK POPUP — styles
// -----------------------------------------------------------------------------

const DIALOG_WIDTH = 560; // <- change this one number to resize the popup
const DIALOG_BLUE = "#1769e8";
const FIELD_H = 32;
const FIELD_RADIUS = "8px";
const FIELD_FONT = 12;

const dialogInputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: FIELD_RADIUS,
    fontSize: FIELD_FONT,
    bgcolor: "#fff",
    minHeight: FIELD_H,
    "& input": {
      height: FIELD_H - 2,
      boxSizing: "border-box",
      py: 0,
      px: "10px",
      fontSize: FIELD_FONT,
      color: "#1E1E1E",
    },
    "& textarea": {
      py: "7px",
      px: "10px",
      fontSize: FIELD_FONT,
      color: "#1E1E1E",
    },
    "& input::placeholder, & textarea::placeholder": {
      color: "#8F9098",
      opacity: 1,
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#D9DEE7",
      borderRadius: FIELD_RADIUS,
    },
    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#B8BFCF" },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: DIALOG_BLUE,
      borderWidth: "1.5px",
    },
    "&.Mui-error .MuiOutlinedInput-notchedOutline": {
      borderColor: "#EF4444",
    },
  },
  "& .MuiFormHelperText-root": {
    fontSize: 10.5,
    mx: 0,
    mt: 0.3,
    lineHeight: 1.3,
    color: "#EF4444",
  },
};

const dialogSelectSx = {
  borderRadius: FIELD_RADIUS,
  fontSize: FIELD_FONT,
  bgcolor: "#fff",
  height: FIELD_H,
  boxSizing: "border-box",
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#D9DEE7",
    borderRadius: FIELD_RADIUS,
  },
  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#B8BFCF" },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: DIALOG_BLUE,
    borderWidth: "1.5px",
  },
  "& .MuiSelect-select": {
    minHeight: "0 !important",
    height: "100% !important",
    py: "0 !important",
    pl: "10px",
    pr: "30px !important",
    display: "flex !important",
    alignItems: "center",
    boxSizing: "border-box",
    fontSize: FIELD_FONT,
  },
  "& .MuiSelect-icon": { color: DIALOG_BLUE, fontSize: 20, right: 6 },
};

const menuPaperSx = {
  mt: 0.5,
  borderRadius: "10px",
  border: "1px solid #E5E7EB",
  boxShadow: "0 8px 24px rgba(15, 23, 42, 0.12)",
  "& .MuiList-root": { py: 0.5 },
};

const menuItemSx = {
  fontSize: FIELD_FONT,
  minHeight: 32,
  color: "#374151",
  "&:hover": { bgcolor: "#F3F7FF" },
  "&.Mui-selected": { bgcolor: "#EBF1FE" },
  "&.Mui-selected:hover": { bgcolor: "#E2EBFD" },
};

// -----------------------------------------------------------------------------
// ADD TASK POPUP — small pieces
// -----------------------------------------------------------------------------

function DialogLabel({ children }) {
  return (
    <Typography
      sx={{
        fontSize: 11.5,
        fontWeight: 500,
        color: "#374151",
        mb: 0.5,
        lineHeight: 1.4,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </Typography>
  );
}

/* Dropdown (blue arrow, placeholder "Select") */
function DialogSelect({
  label,
  value,
  onChange,
  options,
  placeholder = "Select",
  icon = KeyboardArrowDownIcon,
}) {
  return (
    <Box sx={{ minWidth: 0 }}>
      <DialogLabel>{label}</DialogLabel>
      <FormControl fullWidth>
        <Select
          displayEmpty
          value={value}
          onChange={(e) => onChange(e.target.value)}
          IconComponent={icon}
          sx={dialogSelectSx}
          MenuProps={{ PaperProps: { sx: menuPaperSx } }}
          renderValue={(val) =>
            val ? (
              <span style={{ color: "#1E1E1E" }}>{val}</span>
            ) : (
              <span style={{ color: "#8F9098" }}>{placeholder}</span>
            )
          }
        >
          {options.map((opt) => (
            <MenuItem key={opt} value={opt} sx={menuItemSx}>
              {opt}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

/* Due date: calendar icon on the left, opens a calendar popover */
function DialogDateField({ label, value, onChange }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const parsed = value ? dayjs(value, DATE_FORMAT) : null;

  return (
    <Box sx={{ minWidth: 0 }}>
      <DialogLabel>{label}</DialogLabel>
      <TextField
        fullWidth
        value={value}
        placeholder={DATE_FORMAT}
        onClick={(e) => setAnchorEl(e.currentTarget)}
        slotProps={{
          input: {
            readOnly: true,
            startAdornment: (
              <InputAdornment position="start" sx={{ mr: 0.75 }}>
                <CalendarMonthOutlinedIcon
                  sx={{ fontSize: 17, color: DIALOG_BLUE }}
                />
              </InputAdornment>
            ),
          },
        }}
        sx={{ ...dialogInputSx, "& input": { cursor: "pointer" } }}
      />

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        PaperProps={{
          sx: {
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
            mt: 0.5,
          },
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            value={parsed && parsed.isValid() ? parsed : null}
            onChange={(d) => {
              if (d) onChange(d.format(DATE_FORMAT));
              setAnchorEl(null);
            }}
            sx={{
              width: 280,
              "& .MuiPickersDay-root.Mui-selected": {
                backgroundColor: DIALOG_BLUE,
              },
              "& .MuiPickersDay-root:hover": { backgroundColor: "#EEF4FF" },
            }}
          />
        </LocalizationProvider>
      </Popover>
    </Box>
  );
}

/* ------------------------------------------------------------------ */
/* ADD TASK POPUP                                                      */
/* ------------------------------------------------------------------ */

const EMPTY_TASK = {
  taskType: "",
  title: "",
  linkTo: "",
  linkSearch: "",
  priority: "",
  dueDate: "",
  assignTo: "",
  details: "",
};

function AddTaskDialog({ open, onClose, onCreate }) {
  const [form, setForm] = useState(EMPTY_TASK);
  const [files, setFiles] = useState([]);
  const [fileError, setFileError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  // fresh form every time the popup opens (due date defaults to today)
  useEffect(() => {
    if (open) {
      setForm({ ...EMPTY_TASK, dueDate: dayjs().format(DATE_FORMAT) });
      setFiles([]);
      setFileError("");
      setTitleError("");
      setDragOver(false);
    }
  }, [open]);

  const set = (field) => (value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  /* ---- files: PDF / JPG / PNG up to 110MB ---- */
  const addFiles = (list) => {
    const incoming = Array.from(list || []);
    const valid = [];
    let error = "";
    incoming.forEach((file) => {
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        error = "Only PDF, JPG and PNG files are allowed";
      } else if (file.size > MAX_FILE_BYTES) {
        error = "File is larger than 110MB";
      } else {
        valid.push(file);
      }
    });
    setFileError(error);
    if (valid.length) setFiles((prev) => [...prev, ...valid]);
  };

  const removeFile = (index) =>
    setFiles((prev) => prev.filter((_, i) => i !== index));

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    addFiles(e.dataTransfer.files);
  };

  /* ---- submit ---- */
  const handleCreate = () => {
    if (!form.title.trim()) {
      setTitleError("Title is required");
      return;
    }
    onCreate({ ...form, title: form.title.trim(), files });
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      sx={{
        // !important: same pattern as the Filter dialogs, so a global theme /
        // CSS rule on .MuiDialog-paper can't stretch the popup full width
        "& .MuiDialog-paper": {
          width: `${DIALOG_WIDTH}px !important`,
          minWidth: `${DIALOG_WIDTH}px !important`,
          maxWidth: `${DIALOG_WIDTH}px !important`,
          maxHeight: "92vh !important",
          margin: "0 !important",
          borderRadius: "16px !important",
          boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
        },
        "@media (max-width: 600px)": {
          "& .MuiDialog-paper": {
            width: "92vw !important",
            minWidth: "92vw !important",
            maxWidth: "92vw !important",
          },
        },
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2.5,
          pt: 2,
          pb: 1.25,
        }}
      >
        <Typography sx={{ fontSize: 15, fontWeight: 700, color: "#0F172A" }}>
          Add Task
        </Typography>
        <IconButton
          size="small"
          onClick={onClose}
          aria-label="Close"
          sx={{ p: 0.4, color: "#111827", "&:hover": { bgcolor: "#F3F4F6" } }}
        >
          <CloseIcon sx={{ fontSize: 20 }} />
        </IconButton>
      </Box>

      {/* BODY */}
      <Box sx={{ px: 2.5, pb: 1.5 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            columnGap: 1.5,
            rowGap: 1.5,
            alignItems: "start",
          }}
        >
          {/* Row 1 */}
          <DialogSelect
            label="Select Task Type"
            value={form.taskType}
            onChange={set("taskType")}
            options={TASK_TYPES}
          />

          <Box sx={{ minWidth: 0 }}>
            <DialogLabel>Title</DialogLabel>
            <TextField
              fullWidth
              placeholder="Enter title what needs to be done?"
              value={form.title}
              onChange={(e) => {
                set("title")(e.target.value);
                if (titleError) setTitleError("");
              }}
              error={!!titleError}
              helperText={titleError}
              sx={dialogInputSx}
            />
          </Box>

          {/* Row 2 */}
          <DialogSelect
            label="Link to"
            value={form.linkTo}
            onChange={set("linkTo")}
            options={LINK_TO_OPTIONS}
          />

          <Box sx={{ minWidth: 0 }}>
            <DialogLabel>Select</DialogLabel>
            <TextField
              fullWidth
              placeholder="Name, claim# or check#"
              value={form.linkSearch}
              onChange={(e) => set("linkSearch")(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start" sx={{ mr: 0.75 }}>
                      <SearchIcon sx={{ fontSize: 18, color: DIALOG_BLUE }} />
                    </InputAdornment>
                  ),
                },
              }}
              sx={dialogInputSx}
            />
          </Box>

          {/* Row 3 */}
          <DialogSelect
            label="Priority"
            value={form.priority}
            onChange={set("priority")}
            options={PRIORITY_OPTIONS}
          />

          <DialogDateField
            label="Due date"
            value={form.dueDate}
            onChange={set("dueDate")}
          />

          {/* Row 4 — Assign to (full width, search icon on the right) */}
          <Box sx={{ gridColumn: { sm: "1 / -1" } }}>
            <DialogSelect
              label="Assign to"
              value={form.assignTo}
              onChange={set("assignTo")}
              options={ASSIGNEE_OPTIONS}
              icon={SearchIcon}
            />
          </Box>

          {/* Row 5 — Details (full width) */}
          <Box sx={{ gridColumn: { sm: "1 / -1" } }}>
            <DialogLabel>Details</DialogLabel>
            <TextField
              fullWidth
              multiline
              minRows={1}
              maxRows={4}
              placeholder="Add description (If Any)"
              value={form.details}
              onChange={(e) => set("details")(e.target.value)}
              sx={dialogInputSx}
            />
          </Box>
        </Box>

        {/* FILE DROP ZONE */}
        <Box
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              fileInputRef.current?.click();
            }
          }}
          sx={{
            mt: 2,
            height: 48,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            borderRadius: "8px",
            bgcolor: dragOver ? "#DCE8FD" : "#EAF1FE",
            border: dragOver ? "1px dashed #1769e8" : "1px solid transparent",
            cursor: "pointer",
            transition: "background-color .15s ease",
            "&:hover": { bgcolor: "#E0EBFD" },
          }}
        >
          <FolderIcon sx={{ fontSize: 20, color: DIALOG_BLUE }} />
          <Typography sx={{ fontSize: 12, fontWeight: 600, color: "#1E3A8A" }}>
            Drop files or{" "}
            <Box
              component="span"
              sx={{ textDecoration: "underline", color: "#0F2F8F" }}
            >
              browse
            </Box>{" "}
            • PDF, JPG, PNG up to 110MB
          </Typography>
        </Box>

        <input
          ref={fileInputRef}
          type="file"
          hidden
          multiple
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) => {
            addFiles(e.target.files);
            e.target.value = ""; // allow picking the same file again
          }}
        />

        {fileError && (
          <FormHelperText sx={{ fontSize: 10.5, mx: 0, color: "#EF4444" }}>
            {fileError}
          </FormHelperText>
        )}

        {files.length > 0 && (
          <Stack
            direction="row"
            flexWrap="wrap"
            useFlexGap
            spacing={0.75}
            sx={{ mt: 1 }}
          >
            {files.map((file, index) => (
              <Chip
                key={`${file.name}-${index}`}
                label={file.name}
                size="small"
                onDelete={() => removeFile(index)}
                sx={{
                  maxWidth: 220,
                  height: 22,
                  fontSize: 11,
                  bgcolor: "#F3F4F6",
                  color: "#374151",
                }}
              />
            ))}
          </Stack>
        )}
      </Box>

      {/* FOOTER */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 1,
          px: 2.5,
          pb: 2,
        }}
      >
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{
            textTransform: "none",
            fontSize: 12,
            fontWeight: 500,
            height: 32,
            px: 2.25,
            borderRadius: "8px",
            color: "#374151",
            borderColor: "#D1D5DB",
            bgcolor: "#fff",
            "&:hover": { bgcolor: "#F9FAFB", borderColor: "#B8BFCF" },
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          disableElevation
          onClick={handleCreate}
          sx={{
            textTransform: "none",
            fontSize: 12,
            fontWeight: 600,
            height: 32,
            px: 2.25,
            borderRadius: "8px",
            bgcolor: DIALOG_BLUE,
            "&:hover": { bgcolor: "#155dcc" },
          }}
        >
          Create task
        </Button>
      </Box>
    </Dialog>
  );
}

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
            fontSize: "13px",
            lineHeight: 1.2,
            color: "#8A97AB",
            fontWeight: 600,
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
              fontSize: "28px",
              lineHeight: 1,
              fontWeight: 700,
              color: card.iconColor,
            }}
          >
            {card.value}
          </Typography>

          <Typography
            sx={{
              fontSize: "12px",
              color: "#8A97AB",
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
          "22px minmax(120px, 1.1fr) minmax(170px, 2fr) 96px 110px 122px",
        alignItems: "center",
        minHeight: item.reasonTag ? 52 : 42,
        py: 0.75,
        borderBottom: "1px solid #edf0f3",
        columnGap: 1.5,
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
            fontSize: "12.5px",
            lineHeight: 1.2,
            fontWeight: 500,
            color: "#475569",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {item.who}
        </Typography>

        {item.ref && (
          <Typography
            sx={{
              fontSize: "12.5px",
              color: "#475569",
              flexShrink: 0,
              whiteSpace: "nowrap",
            }}
          >
            • {item.ref}
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
            fontSize: "14px",
            lineHeight: 1.2,
            color: "#0F172A",
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
              height: 20,
              borderRadius: "4px",
              fontSize: "14px",
              backgroundColor: "#fee2e2",
              color: "#C0322F",
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
          width: 60,
          height: 26,
          borderRadius: "4px",
          backgroundColor: priority.bg,
          color: priority.color,
          fontSize: "12.5px",
          fontWeight: 600,
          justifySelf: "start",
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
          pr: 2.5,
        }}
      >
        {item.overdue && (
          <Typography
            sx={{
              fontSize: "13px",
              lineHeight: 1,
              color: "#C0322F",
              fontWeight: 600,
            }}
          >
            Overdue
          </Typography>
        )}

        <Typography
          sx={{
            fontSize: "13px",
            lineHeight: 1.2,
            color: item.overdue ? "#C0322F" : "#475569",
            whiteSpace: "nowrap",
          }}
        >
          {item.overdue ? `Due ${item.time}` : item.time}
        </Typography>
      </Box>

      {/* ACTION ICONS */}
      <Stack
        direction="row"
        spacing={1}
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
  const [tasks, setTasks] = useState(TASKS);
  const [addTaskOpen, setAddTaskOpen] = useState(false);

  // "Create task" in the popup -> new task shows at the top of the list
  const handleCreateTask = (data) => {
    setTasks((prev) => [
      {
        who: data.linkSearch.trim() || data.assignTo || "General",
        ref: data.linkTo,
        task: data.title,
        priority: data.priority || "Routine",
        time: data.dueDate || dayjs().format(DATE_FORMAT),
      },
      ...prev,
    ]);
  };

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
              fontSize: "22px",
              lineHeight: 1.2,
              fontWeight: 700,
              color: "#0F172A",
              mb: 0.35,
            }}
          >
            My Tasks
          </Typography>

          <Typography
            sx={{
              fontSize: "13.5px",
              lineHeight: 1.4,
              color: "#475569",
              whiteSpace: "nowrap",
            }}
          >
            Good morning, Ashok. You have{" "}
            <Box
              component="span"
              sx={{
                color: "#475569",
                fontWeight: 600,
              }}
            >
              {tasks.length} open tasks
            </Box>{" "}
            today, Tuesday, Aug 25 — prioritized by revenue impact and deadline.
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
              height: 30,
              minWidth: 95,
              px: 1,
              textTransform: "none",
              fontSize: "12px",
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
            onClick={() => setAddTaskOpen(true)}
            startIcon={
              <AddIcon
                sx={{
                  fontSize: "13px !important",
                }}
              />
            }
            sx={{
              height: 30,
              minWidth: 61,
              px: 1,
              textTransform: "none",
              fontSize: "12px",
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
              fontSize: "13px",
              color: "#8A97AB",
              fontWeight: 600,
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
              fontSize: "12px",
              lineHeight: 1.2,
              fontWeight: 700,
              letterSpacing: "0.4px",
              color: "#0F172A",
            }}
          >
            MY TASKS ({tasks.length} OPEN)
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
                      fontSize: "13px",
                      display: "flex",
                      alignItems: "center",
                      gap: 0.45,
                    }}
                  >
                    <span>{filter.label}</span>

                    <Box
                      component="span"
                      sx={{
                        fontSize: "11.5px",
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
                  color: active ? "#1D4ED8" : "#475569",
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
          {tasks.map((task, index) => (
            <TaskRow key={`${task.who}-${task.task}-${index}`} item={task} />
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
              display: "flex",
              alignItems: "center",
              fontSize: "13px",
              color: "#475569",
              fontWeight: 600,
              cursor: "pointer",
              "&:hover": {
                color: "#1769e8",
              },
            }}
          >
            <ChevronRightIcon
              sx={{
                fontSize: 24,
                color: "#94A3B8",
                mr: 0.3,
              }}
            />
            Completed today (4)
          </Typography>
        </Box>
      </Paper>

      {/* ADD TASK POPUP */}
      <AddTaskDialog
        open={addTaskOpen}
        onClose={() => setAddTaskOpen(false)}
        onCreate={handleCreateTask}
      />
    </Box>
  );
}
