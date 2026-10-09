import { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Button,
  TextField,
  IconButton,
  InputAdornment,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Menu,
  MenuItem,
  Tooltip,
  Select,
  FormControl,
  Dialog,
  InputBase,
} from "@mui/material";
import {
  ViewList,
  ViewModule,
  KeyboardArrowDown,
  Close,
  InfoOutlined,
  Add,
  Send,
  MicNone,
} from "@mui/icons-material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {
  Search,
  FilterIcon1,
  SettingsIcon,
  DownloadIcon,
  EditIconClaim,
  Icon2,
  Icon3,
  Icon4,
  Icon5,
  Icon6,
  Star,
  RefreshIcon,
  ViewIconRemittance,
  DownloadIconRemittance,
  SmsIcon,
  AtRateIcon,
  PrinterIcon,
  ListIcon,
  EyeVisible,
  Share,
  DeleteIcon,
  SearchIcon,
  BlueCalendarIcon,
} from "../assets/Assets";

dayjs.extend(customParseFormat);

/* ================================================================== */
/* Design tokens / shared styles                                        */
/* ================================================================== */
const BLUE = "#0B63F6";
const SORT_BLUE = "#2563EB";
const SORT_ARROW = "#52525B";

const headBg = "#F1F5FC";
const selHeadBg = "#E6EDFC";
const selBodyBg = "#EEF3FE";

const thSx = {
  fontWeight: 600,
  fontSize: 11,
  color: "#4B5563",
  backgroundColor: headBg,
  borderBottom: "1px solid #E5E7EB",
  whiteSpace: "pre-line",
  lineHeight: 1.2,
  padding: "8px 8px",
  textAlign: "center",
};

const tdSx = {
  fontSize: 11,
  color: "#1F2937",
  padding: "6px 8px",
  borderBottom: "1px solid #F0F1F4",
  textAlign: "center",
};

const checkboxSx = {
  p: 0,
  color: "#9CA3AF",
  "& .MuiSvgIcon-root": { fontSize: 18, borderRadius: "4px" },
  "&.Mui-checked, &.MuiCheckbox-indeterminate": { color: BLUE },
};

const pillBtnSx = (active) => ({
  textTransform: "none",
  fontSize: 11,
  fontWeight: active ? 600 : 500,
  height: 28,
  minWidth: 0,
  px: 2,
  borderRadius: "16px",
  gap: 0.6,
  backgroundColor: active ? "#0066FF" : "#FFFFFF",
  color: active ? "#FFFFFF" : "rgba(0, 0, 0, 0.7)",
  border: active ? "none" : "1px solid #e0e0e0",
  boxShadow: "none",
  "&:hover": {
    backgroundColor: active ? "#0052CC" : "#f5f5f5",
    boxShadow: "none",
  },
});

const filterChipSx = {
  textTransform: "none",
  color: "#1e293b",
  borderColor: "#E5E7EB",
  backgroundColor: "#FFFFFF",
  fontWeight: 600,
  fontSize: 12,
  height: 32,
  px: 1.75,
  borderRadius: "8px",
  whiteSpace: "nowrap",
  "&:hover": { borderColor: "#D1D5DB", backgroundColor: "#F9FAFB" },
};

const footerBtnSx = {
  textTransform: "none",
  color: "#1F2937",
  borderColor: "#E5E7EB",
  backgroundColor: "#FFFFFF",
  fontWeight: 500,
  fontSize: 12,
  height: 34,
  px: 1.75,
  borderRadius: "6px",
  "&:hover": { borderColor: "#D1D5DB", backgroundColor: "#F9FAFB" },
};

const chipBase = {
  height: "auto",
  maxWidth: 70,
  borderRadius: "4px",
  fontWeight: 600,
  fontSize: 9.5,
  "& .MuiChip-label": {
    whiteSpace: "normal",
    px: 0.75,
    py: 0.25,
    lineHeight: 1.25,
  },
};

const categoryStyles = {
  "Self pay": { backgroundColor: "#E8ECFB", color: "#3B4CB8" },
  Medicare: { backgroundColor: "#FDF1DC", color: "#9A5B0B" },
  "Payment plan": { backgroundColor: "#DFF5EA", color: "#1E7F55" },
  Commercial: { backgroundColor: "#E3EEFB", color: "#2F5FA8" },
  "Credit bal.": { backgroundColor: "#FCE4E4", color: "#C0392B" },
};

const statusChipStyles = {
  Draft: { backgroundColor: "#E8ECFB", color: "#3B4CB8" },
  "Email sent": { backgroundColor: "#DFF5EA", color: "#1E7F55" },
  "Partially sent": { backgroundColor: "#FDF1DC", color: "#B45309" },
  Failure: { backgroundColor: "#FCE4E4", color: "#C0392B" },
  "Queued for email": { backgroundColor: "#E3EEFB", color: "#2F5FA8" },
};

const thinScroll = {
  "&::-webkit-scrollbar": { width: "4px", height: "4px" },
  "&::-webkit-scrollbar-track": { backgroundColor: "transparent" },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#d1d5db",
    borderRadius: "2px",
  },
  "&::-webkit-scrollbar-thumb:hover": { backgroundColor: "#9ca3af" },
};

const listContainerSx = {
  boxShadow: "none",
  border: "1px solid #e0e0e0",
  maxHeight: "400px",
  overflow: "auto",
  ...thinScroll,
};

const stmtContainerSx = {
  boxShadow: "none",
  border: "1px solid #E5E7EB",
  borderRadius: "10px",
  maxHeight: "400px",
  overflow: "auto",
  ...thinScroll,
};

const listHeadSx = {
  fontWeight: 700,
  fontSize: 12,
  color: "#1e293b",
  py: 1.2,
  px: 1.25,
  lineHeight: 1.15,
  backgroundColor: "#ffffff",
  borderBottom: "1px solid #e0e0e0",
  whiteSpace: "pre-line",
  verticalAlign: "middle",
  textAlign: "center",
};

const listCellSx = {
  fontSize: 12,
  py: 1.2,
  px: 1.25,
  color: "rgba(0, 0, 0, 0.87)",
  textAlign: "center",
};

const toolbarIconBtnSx = {
  width: 40,
  height: 30,
  border: "none",
  borderRadius: "8px",
  backgroundColor: "white",
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  "&:hover": { backgroundColor: "#f9fafb" },
};

const selectActionBtnSx = {
  textTransform: "none",
  color: "#1e293b",
  borderColor: "#e2e8f0",
  backgroundColor: "white",
  fontWeight: 600,
  fontSize: 13,
  height: 30,
  px: 2,
  minWidth: "auto",
  boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
  borderRadius: "8px",
  "&:hover": {
    borderColor: "#cbd5e1",
    backgroundColor: "#f8fafc",
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
  },
};

const getListColor = (index) => {
  const groupIndex = Math.floor(index / 3) % 4;
  return ["#F2F6FF", "#FFFBF6", "#F1FFFD", "#F2F6FF"][groupIndex];
};

const getGridColor = (index) => {
  const groupIndex = Math.floor(index / 2) % 4;
  return ["#F2F6FF", "#FFFBF6", "#F1FFFD", "#F2F6FF"][groupIndex];
};

const toAmount = (s) =>
  parseFloat(String(s ?? "").replace(/[^0-9.-]/g, "")) || 0;

/* Handles MM/DD/YYYY and MM/DD/YY */
const parseMDY = (str) => {
  const m = String(str ?? "").match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/);
  if (!m) return null;
  const year = m[3].length === 2 ? 2000 + Number(m[3]) : Number(m[3]);
  return new Date(year, Number(m[1]) - 1, Number(m[2])).getTime();
};

const COMPARERS = {
  alpha: (a, b) =>
    String(a ?? "").localeCompare(String(b ?? ""), undefined, {
      sensitivity: "base",
      numeric: true,
    }),
  number: (a, b) => toAmount(a) - toAmount(b),
  date: (a, b) => (parseMDY(a) ?? 0) - (parseMDY(b) ?? 0),
};

const SORT_TITLES = {
  alpha: { asc: "Sorted A–Z", desc: "Sorted Z–A", none: "Sort A–Z" },
  number: {
    asc: "Sorted low to high",
    desc: "Sorted high to low",
    none: "Sort low to high",
  },
  date: {
    asc: "Sorted oldest first",
    desc: "Sorted newest first",
    none: "Sort oldest first",
  },
};

function useSortedRows(rows, columns) {
  const [sort, setSort] = useState({ columnId: null, dir: null });

  const sortedRows = useMemo(() => {
    if (!sort.columnId || !sort.dir) return rows;
    const column = columns.find((c) => c.id === sort.columnId);
    if (!column?.sort) return rows;
    const factor = sort.dir === "asc" ? 1 : -1;
    const compare = COMPARERS[column.sort];
    const get = column.getValue || ((r) => r[column.id]);
    return [...rows].sort((a, b) => compare(get(a), get(b)) * factor);
  }, [rows, columns, sort]);

  const handleSort = (columnId) =>
    setSort((prev) => {
      if (prev.columnId !== columnId || !prev.dir)
        return { columnId, dir: "asc" };
      return { columnId, dir: prev.dir === "asc" ? "desc" : "asc" };
    });

  return { sort, sortedRows, handleSort };
}

/* Header cell with the sort arrow (shared by all 4 tabs) */
function SortHeadCell({ column, sortDir, onSort, sx }) {
  const active = !!sortDir;
  const titles = column.sort ? SORT_TITLES[column.sort] : null;
  const plainLabel =
    typeof column.label === "string"
      ? column.label.replace(/\n/g, " ")
      : column.title || "column";

  return (
    <TableCell align={column.center ? "center" : "left"} sx={sx}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: column.center ? "center" : "flex-start",
          gap: 0.3,
        }}
      >
        {column.label}
        {column.sort && (
          <Tooltip title={titles[sortDir || "none"]} arrow>
            <IconButton
              size="small"
              aria-label={`Sort ${plainLabel}`}
              onClick={() => onSort(column.id)}
              sx={{
                p: 0.2,
                ml: column.center ? 0 : "auto",
                flexShrink: 0,
                borderRadius: "6px",
                color: active ? SORT_BLUE : SORT_ARROW,
                bgcolor: active ? "#DCE7FD" : "transparent",
                "&:hover": { bgcolor: "#DCE7FD" },
              }}
            >
              <KeyboardArrowDown
                sx={{
                  fontSize: 16,
                  transform: sortDir === "desc" ? "rotate(180deg)" : "none",
                  transition: "transform .15s ease",
                }}
              />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </TableCell>
  );
}

/* Generic sortable table used by every tab */
function ListTable({
  columns,
  rows,
  selection,
  ctx,
  minWidth = 1400,
  stickyHeader = false,
  containerSx,
  headSx,
  cellSx,
  rowSx,
  cbSx,
  checkHeadSx,
  checkCellSx,
  highlightSelected = true,
  onRowClick,
}) {
  const { sort, sortedRows, handleSort } = useSortedRows(rows, columns);

  const selectedCount = selection
    ? rows.filter((r) => selection.selected.includes(r.id)).length
    : 0;
  const allSelected = rows.length > 0 && selectedCount === rows.length;
  const someSelected = selectedCount > 0 && !allSelected;

  return (
    <TableContainer component={Paper} sx={containerSx}>
      <Table size="small" stickyHeader={stickyHeader} sx={{ minWidth }}>
        <TableHead>
          <TableRow>
            {selection && (
              <TableCell
                padding="checkbox"
                sx={{ ...headSx, width: 40, ...checkHeadSx }}
              >
                <Checkbox
                  size="small"
                  sx={cbSx}
                  indeterminate={someSelected}
                  checked={allSelected}
                  onChange={(e) => selection.onToggleAll(e.target.checked)}
                />
              </TableCell>
            )}
            {columns.map((col) => (
              <SortHeadCell
                key={col.id}
                column={col}
                sortDir={sort.columnId === col.id ? sort.dir : null}
                onSort={handleSort}
                sx={{
                  ...headSx,
                  ...col.headSx,
                  ...(col.width && { width: col.width, minWidth: col.width }),
                }}
              />
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {sortedRows.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={columns.length + (selection ? 1 : 0)}
                align="center"
                sx={{ py: 6, color: "#6B7280", borderBottom: "none" }}
              >
                No records found
              </TableCell>
            </TableRow>
          )}

          {sortedRows.map((row, index) => {
            const isSel = selection
              ? selection.selected.includes(row.id)
              : false;
            return (
              <TableRow
                key={row.id}
                selected={highlightSelected && isSel}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                sx={{
                  ...(rowSx ? rowSx(row, index) : {}),
                  ...(onRowClick ? { cursor: 'pointer' } : {}),
                }}
              >
                {selection && (
                  <TableCell
                    padding="checkbox"
                    sx={{ ...cellSx, ...checkCellSx }}
                  >
                    <Checkbox
                      size="small"
                      sx={cbSx}
                      checked={isSel}
                      onChange={() => selection.onToggle(row.id)}
                    />
                  </TableCell>
                )}
                {columns.map((col) => (
                  <TableCell
                    key={col.id}
                    align={col.center ? "center" : "left"}
                    sx={{
                      ...cellSx,
                      ...(typeof col.cellSx === "function"
                        ? col.cellSx(row)
                        : col.cellSx),
                    }}
                  >
                    {col.render ? col.render(row, ctx) : row[col.id]}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

/* ================================================================== */
/* Small shared components                                              */
/* ================================================================== */
function StatusPill({ label, bg, fg, height = 20, mb }) {
  return (
    <Chip
      label={label}
      size="small"
      sx={{
        backgroundColor: bg,
        color: fg,
        fontWeight: 600,
        fontSize: 10,
        height,
        mb,
      }}
    />
  );
}

function RowActionIcons({ onEdit, onCheck }) {
  const items = [
    ["View list", Icon2, undefined],
    ["Clipboard", Icon3, undefined],
    ["Folder", Icon4, undefined],
    ["Document", Icon5, undefined],
    ["Check", Icon6, onCheck],
  ];
  
  const handleEditClick = (e) => {
    e.stopPropagation(); // Prevent row click
    if (onEdit) onEdit();
  };
  
  const handleIconClick = (handler) => (e) => {
    e.stopPropagation(); // Prevent row click
    if (handler) handler();
  };
  
  return (
    <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
      <Tooltip title="Edit" placement="top">
        <IconButton size="small" sx={{ padding: "4px" }} onClick={handleEditClick}>
          <EditIconClaim />
        </IconButton>
      </Tooltip>
      {items.map(([title, Icon, handler]) => (
        <Tooltip key={title} title={title} placement="top">
          <IconButton size="small" sx={{ padding: "4px" }} onClick={handleIconClick(handler)}>
            <Icon />
          </IconButton>
        </Tooltip>
      ))}
    </Box>
  );
}

function FilterChip({ label, active, onClick }) {
  return (
    <Chip
      label={label}
      clickable
      onClick={onClick}
      sx={{
        backgroundColor: active ? "#0066ff" : "white",
        color: active ? "white" : "rgba(0, 0, 0, 0.7)",
        fontWeight: active ? 600 : 500,
        fontSize: 11,
        height: 28,
        border: active ? "none" : "1px solid #e0e0e0",
        cursor: "pointer",
        "&:hover": { backgroundColor: active ? "#0052cc" : "#f5f5f5" },
      }}
    />
  );
}

function ToolbarIcons({ onSettings }) {
  return (
    <>
      <IconButton
        size="small"
        aria-label="Column settings"
        onClick={onSettings}
        sx={toolbarIconBtnSx}
      >
        <SettingsIcon />
      </IconButton>
      <IconButton size="small" aria-label="Download" sx={toolbarIconBtnSx}>
        <DownloadIcon />
      </IconButton>
    </>
  );
}

function IconHead({ Icon, title }) {
  return (
    <Tooltip title={title}>
      <Box sx={{ display: "inline-flex", alignItems: "center" }}>
        <Icon />
      </Box>
    </Tooltip>
  );
}

const HEAD_LABEL_SX = {
  fontSize: 12,
  fontWeight: 600,
  color: "#374151",
  mb: 0.8,
};

const filterFieldSx = {
  fontSize: 13,
  "& .MuiOutlinedInput-root": {
    fontSize: 13,
    borderRadius: "8px",
    "& fieldset": { borderColor: "#E5E7EB", borderRadius: "8px" },
  },
};

const filterSelectSx = {
  fontSize: 13,
  borderRadius: "8px",
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#E5E7EB",
    borderRadius: "8px",
  },
  "& .MuiSelect-icon": { color: "#6B7280" },
  "& .MuiSelect-select": {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
};

function FilterSelect({
  label,
  value,
  onChange,
  options,
  placeholder = "Select",
}) {
  return (
    <Box>
      <Typography sx={HEAD_LABEL_SX}>{label}</Typography>
      <FormControl fullWidth size="small">
        <Select
          displayEmpty
          value={value}
          onChange={(e) => onChange(e.target.value)}
          IconComponent={KeyboardArrowDown}
          renderValue={(v) =>
            v ? v : <span style={{ color: "#9CA3AF" }}>{placeholder}</span>
          }
          sx={filterSelectSx}
        >
          {options.map((s) => (
            <MenuItem key={s} value={s}>
              {s}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

function FilterText({ label, value, onChange }) {
  return (
    <Box>
      <Typography sx={HEAD_LABEL_SX}>{label}</Typography>
      <TextField
        fullWidth
        size="small"
        placeholder="Type"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        sx={filterFieldSx}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Search style={{ width: 16, height: 16 }} />
              </Box>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}

function FilterDate({ label, value, onChange }) {
  const parsed = value && dayjs(value, "MM/DD/YYYY", true).isValid()
    ? dayjs(value, "MM/DD/YYYY", true)
    : null;

  return (
    <Box>
      <Typography sx={HEAD_LABEL_SX}>{label}</Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          value={parsed}
          onChange={(newValue) => {
            if (newValue && newValue.isValid()) {
              onChange(newValue.format("MM/DD/YYYY"));
            } else {
              onChange("");
            }
          }}
          format="MM/DD/YYYY"
          slots={{
            openPickerIcon: () => <BlueCalendarIcon width={16} height={17} />,
          }}
          slotProps={{
            textField: {
              fullWidth: true,
              size: "small",
              sx: filterFieldSx,
            },
            openPickerButton: { sx: { p: 0.5, mr: 0.2 } },
          }}
        />
      </LocalizationProvider>
    </Box>
  );
}

/* Additional Details form helpers */
const adjFieldSx = {
  fontSize: 12,
  "& .MuiOutlinedInput-root": {
    fontSize: 12,
    borderRadius: "10px",
    backgroundColor: "#FFFFFF",
    "& fieldset": { borderColor: "#D9DEE7", borderRadius: "10px" },
    "& input::-webkit-calendar-picker-indicator": {
      opacity: 1,
      cursor: "pointer",
      width: 16,
      height: 16,
      filter: "brightness(0)",
    },
  },
};

const adjSelectSx = {
  fontSize: 12,
  borderRadius: "10px",
  backgroundColor: "#FFFFFF",
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#D9DEE7",
    borderRadius: "10px",
  },
  "& .MuiSelect-icon": { color: "#555555", fontSize: 18, right: 7 },
};

const ADJ_LABEL_SX = {
  fontSize: 12,
  fontWeight: 600,
  color: "#1E293B",
  mb: 0.7,
  whiteSpace: "nowrap",
};

function AdjSelect({ label, value, onChange, options }) {
  return (
    <Box>
      <Typography sx={ADJ_LABEL_SX}>{label}</Typography>
      <FormControl fullWidth size="small">
        <Select
          displayEmpty
          value={value}
          onChange={(e) => onChange(e.target.value)}
          IconComponent={KeyboardArrowDown}
          sx={adjSelectSx}
        >
          <MenuItem value="" disabled>
            Select
          </MenuItem>
          {options.map(([v, l]) => (
            <MenuItem key={v} value={v}>
              {l}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

function AdjText({ label, value, onChange, placeholder, type, endIcon }) {
  return (
    <Box>
      <Typography sx={ADJ_LABEL_SX}>{label}</Typography>
      <TextField
        fullWidth
        size="small"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        sx={adjFieldSx}
        InputProps={
          endIcon
            ? {
                endAdornment: (
                  <InputAdornment position="end">{endIcon}</InputAdornment>
                ),
              }
            : undefined
        }
      />
    </Box>
  );
}

/* Grid-view helpers */
function GridSection({ title, flex, children, sx }) {
  return (
    <Box sx={{ flex: { xs: "1 1 auto", md: flex }, minWidth: { xs: "100%", sm: "45%", md: "auto" }, ...sx }}>
      <Typography
        variant="caption"
        sx={{
          color: "#9CA3AF",
          fontSize: 8.5,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.3px",
          lineHeight: 1,
          mb: 0.5,
        }}
      >
        {title}
      </Typography>
      <Box sx={{ mt: 0.5 }}>{children}</Box>
    </Box>
  );
}

function GridLine({ label, children, last }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        fontSize: 10.5,
        color: "rgba(0, 0, 0, 0.87)",
        mb: last ? 0 : 0.3,
        lineHeight: 1.4,
        overflow: "hidden",
        gap: 0.3,
      }}
    >
      <Box
        component="span"
        sx={{
          flexShrink: 0,
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </Box>
      <Box
        component="span"
        sx={{
          fontWeight: 700,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          minWidth: 0,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

function ChargeCaptureBanner() {
  return (
    <Box
      sx={{
        flexShrink: 0,
        backgroundColor: "#ECF5FF",
        border: "1px solid #D5E3F2",
        p: "10px 12px",
        mx: 2,
        mt: 2,
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        minHeight: "52px",
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minWidth: 0,
          gap: "3px",
        }}
      >
        <Typography
          component="div"
          sx={{
            fontWeight: 700,
            color: "#0066FF",
            fontSize: "10px",
            lineHeight: 1.2,
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <Star />
          <span>CHARGE-CAPTURE ASSIST</span>
        </Typography>

        <Typography
          component="div"
          sx={{
            color: "#1F2937",
            fontSize: "11px",
            lineHeight: 1.45,
            whiteSpace: "normal",
          }}
        >
          TiaStat auto-coded <strong>11 encounters</strong> from clinical notes.{" "}
          <strong>3 are clean and ready to bill</strong>; the rest have flagged
          edits (gender conflicts, missing etiology dx, cosmetic-vs-functional).
          Toggle Grid to see full problem/procedure detail without opening each
          record.
        </Typography>
      </Box>

      <Button
        variant="contained"
        size="small"
        sx={{
          textTransform: "none",
          backgroundColor: "#0066FF",
          color: "#fff",
          boxShadow: "none",
          fontSize: "11px",
          px: 2,
          py: 0,
          minWidth: "89px",
          height: "30px",
          fontWeight: 600,
          whiteSpace: "nowrap",
          flexShrink: 0,
          borderRadius: "6px",
          "&:hover": { backgroundColor: "#0066FF", boxShadow: "none" },
        }}
      >
        View Details
      </Button>
    </Box>
  );
}

/* ================================================================== */
/* Sample data                                                          */
/* ================================================================== */
const money = (n) => `$${n.toLocaleString("en-US")}`;

const PEOPLE = [
  ["Lisha Cook", "(F)"],
  ["Aamir Pathan", "(M)"],
  ["Rahul Sharma", "(M)"],
  ["Priya Patel", "(F)"],
  ["John Miller", "(M)"],
  ["Anita Desai", "(F)"],
  ["Mark Wilson", "(M)"],
  ["Sneha Kulkarni", "(F)"],
  ["David Brown", "(M)"],
  ["Meera Nair", "(F)"],
  ["Kevin Zhang", "(M)"],
];
const INSURERS = ["Aetna", "BCBS", "Cigna", "UnitedHealth", "Medicare"];
const DOS_LIST = [
  "08/25/2026",
  "08/20/2026",
  "09/02/2026",
  "07/15/2026",
  "08/30/2026",
  "09/10/2026",
  "07/28/2026",
  "08/05/2026",
  "09/15/2026",
  "06/30/2026",
  "08/12/2026",
];
const DOB_LIST = [
  "08/05/1981",
  "05/13/1984",
  "03/14/1973",
  "07/02/1991",
  "01/29/1964",
  "09/18/1997",
  "05/06/1978",
  "12/11/1986",
  "08/23/1955",
  "02/17/1970",
  "10/09/1995",
];
const BILLED_LIST = [1240, 320, 785, 2450, 150, 980, 615, 1890, 430, 275, 3200];
const COPAY_LIST = [75, 20, 40, 100, 15, 60, 35, 90, 25, 10, 120];
const CPT_LIST = [
  "11980; 00934",
  "99213; 36415",
  "93000; 80053",
  "99214; 85025",
  "71046; 99213",
  "99203; 81002",
  "11980; 99212",
  "99215; 93000",
  "73030; 99213",
  "99202; 82947",
  "99213; 80061",
];
const MOD_LIST = [
  "26, LT",
  "25",
  "59",
  "TC",
  "26",
  "RT",
  "LT",
  "25, 59",
  "26, RT",
  "TC, LT",
  "59",
];
const ICD_LIST = [
  "S11.011D, Z20.4",
  "J02.9",
  "I10, E11.9",
  "M54.5",
  "R07.9",
  "K21.9",
  "L72.0",
  "N39.0",
  "G43.909",
  "E78.5",
  "F41.1",
];
const REMARK_LIST = [
  "Gender conflict — P13.1 removed...",
  "Missing etiology dx",
  "Cosmetic vs functional",
  "Clean — ready to bill",
  "Gender conflict — P13.1 removed...",
  "Clean — ready to bill",
  "Missing etiology dx",
  "Clean — ready to bill",
  "Cosmetic vs functional",
  "Missing etiology dx",
  "Gender conflict — P13.1 removed...",
];

/* ---------- Pre-billing ---------- */
const PRE_STATUS = [
  "Unbilled",
  "Unbilled",
  "Ready",
  "Unbilled",
  "Processed",
  "Ready",
  "Unbilled",
  "Ready",
  "Processed",
  "Unbilled",
  "Processed",
];

const PRE_STATUS_STYLES = {
  Unbilled: { bg: "#FFF3E0", fg: "#F57C00" },
  Ready: { bg: "#DFF5EA", fg: "#1E7F55" },
  "Need Info": { bg: "#FFEBEE", fg: "#C62828" },
  Processed: { bg: "#E3EEFB", fg: "#2F5FA8" },
  Archived: { bg: "#F3F4F6", fg: "#4B5563" },
};

const preBillingClaimsData = PEOPLE.map(([name, gender], i) => {
  const [mm, dd, yyyy] = DOS_LIST[i].split("/");
  return {
    id: i + 1,
    encounterId: String(1234567 + i * 11),
    claimId: String(1234567 + i * 3),
    dos: DOS_LIST[i],
    dosShort: `${mm}/${dd}/${yyyy.slice(2)}`,
    patientName: name,
    gender,
    fin: String(763454 + i),
    mrn: String(563526626 + i * 7),
    dob: DOB_LIST[i],
    pos: "The University RL",
    cpt: CPT_LIST[i],
    cpt2: CPT_LIST[i],
    modifier: MOD_LIST[i],
    modifier2: MOD_LIST[i],
    icd: ICD_LIST[i],
    icd2: ICD_LIST[i],
    doa: DOS_LIST[i],
    referral: "NA",
    author: "NA",
    subscriber: "NA",
    placeOfService: "NA",
    primaryInsurance: INSURERS[i % INSURERS.length],
    plan: `${INSURERS[i % INSURERS.length]} ${109375091 + i}`,
    billed: money(BILLED_LIST[i]),
    billedAmount: money(BILLED_LIST[i]),
    patientCopay: money(COPAY_LIST[i]),
    patientPayment: money(Math.round(COPAY_LIST[i] / 2)),
    status: PRE_STATUS[i],
    remarks: REMARK_LIST[i],
    referenceId: String(1234567 + i * 2),
  };
});

/* ---------- Post-billing ---------- */
const POST_STATUS = [
  "Submitted",
  "Ready for statement",
  "Submitted",
  "Settled",
  "Ready for statement",
  "Submitted",
  "Ready for statement",
  "ERA Received",
  "Settled",
  "Posted",
  "ERA Received",
];

const POST_STATUS_STYLES = {
  Submitted: { bg: "#E1BEE7", fg: "#6A1B9A" },
  "Ready for statement": { bg: "#FFF3E0", fg: "#F57C00" },
  Settled: { bg: "#B2DFDB", fg: "#00695C" },
  "ERA Received": { bg: "#BBDEFB", fg: "#0D47A1" },
  Posted: { bg: "#C8E6C9", fg: "#2E7D32" },
};

const postBillingClaimsData = PEOPLE.map(([name, gender], i) => {
  const [mm, dd, yyyy] = DOS_LIST[(i + 3) % 11].split("/");
  return {
    id: i + 1,
    dos: `${mm}/${dd}/${yyyy.slice(2)}`,
    patientName: name,
    gender,
    cpt: CPT_LIST[(i + 2) % 11].replace("; ", " "),
    modifier: MOD_LIST[(i + 4) % 11],
    icd: ICD_LIST[(i + 1) % 11],
    billedTo: INSURERS[(i + 2) % INSURERS.length],
    billed: money(BILLED_LIST[i]),
    adjustment: money(Math.round(BILLED_LIST[i] * 0.1)),
    insurancePayment: money(Math.round(BILLED_LIST[i] * 0.6)),
    patientPayment: money(COPAY_LIST[i]),
    billedAs: i % 3 === 0 ? "Secondary" : "Primary",
    status: POST_STATUS[i],
    clearingHouse: String(1234567 + i * 7),
    firstBilled: money(BILLED_LIST[(i + 4) % 11]),
    encounterId: String(1234567 + i * 11),
    claimId: String(1234567 + i * 3),
  };
});

/* ---------- Remittance ERA/EOB ---------- */
const REMIT_STATUS_STYLES = {
  Posted: { bg: "#C8E6C9", fg: "#2E7D32" },
  "Partially posted": { bg: "#FFF3E0", fg: "#F57C00" },
  "Not Posted": { bg: "#FFEBEE", fg: "#C62828" },
  "Fully posted": { bg: "#B2DFDB", fg: "#00695C" },
  "Mark as review": { bg: "#E1BEE7", fg: "#6A1B9A" },
};

const REMIT_SAMPLE = [
  [
    "1234567",
    "GCH-IH",
    "Ramesh M. MD",
    "Aetna",
    "Cheque",
    "14315316136",
    "$455",
    "11/20/2025",
    "11/21/2025",
    3,
    "$0",
    "Posted",
  ],
  [
    "1234568",
    "GCH-OH",
    "Sarah K. MD",
    "BCBS",
    "EFT",
    "14315316137",
    "$1,240",
    "11/21/2025",
    "11/22/2025",
    5,
    "$240",
    "Partially posted",
  ],
  [
    "1234569",
    "GCH-IH",
    "David L. MD",
    "Cigna",
    "Cheque",
    "14315316138",
    "$820",
    "11/19/2025",
    "11/20/2025",
    2,
    "$820",
    "Not Posted",
  ],
  [
    "1234570",
    "GCH-OH",
    "Emily R. MD",
    "UnitedHealth",
    "EFT",
    "14315316139",
    "$2,100",
    "11/22/2025",
    "11/23/2025",
    7,
    "$0",
    "Fully posted",
  ],
  [
    "1234571",
    "GCH-IH",
    "Michael T. MD",
    "Aetna",
    "Cheque",
    "14315316140",
    "$675",
    "11/18/2025",
    "11/19/2025",
    4,
    "$675",
    "Not Posted",
  ],
  [
    "1234572",
    "GCH-OH",
    "Jennifer W. MD",
    "Medicare",
    "EFT",
    "14315316141",
    "$3,450",
    "11/23/2025",
    "11/24/2025",
    12,
    "$450",
    "Partially posted",
  ],
  [
    "1234573",
    "GCH-IH",
    "Robert H. MD",
    "BCBS",
    "Cheque",
    "14315316142",
    "$1,890",
    "11/17/2025",
    "11/18/2025",
    6,
    "$0",
    "Posted",
  ],
  [
    "1234574",
    "GCH-OH",
    "Lisa M. MD",
    "Cigna",
    "EFT",
    "14315316143",
    "$920",
    "11/24/2025",
    "11/25/2025",
    3,
    "$120",
    "Partially posted",
  ],
  [
    "1234575",
    "GCH-IH",
    "James P. MD",
    "UnitedHealth",
    "Cheque",
    "14315316144",
    "$1,550",
    "11/16/2025",
    "11/17/2025",
    5,
    "$1,550",
    "Not Posted",
  ],
  [
    "1234576",
    "GCH-OH",
    "Patricia D. MD",
    "Aetna",
    "EFT",
    "14315316145",
    "$2,340",
    "11/25/2025",
    "11/26/2025",
    8,
    "$0",
    "Fully posted",
  ],
  [
    "1234577",
    "GCH-IH",
    "William S. MD",
    "Medicare",
    "Cheque",
    "14315316146",
    "$780",
    "11/15/2025",
    "11/16/2025",
    2,
    "$780",
    "Mark as review",
  ],
];

const remittanceData = REMIT_SAMPLE.map(
  (
    [
      remittanceId,
      location,
      provider,
      Payor,
      paymentMethod,
      chequeNumber,
      amount,
      checkDate,
      receivedDate,
      claimNumbers,
      unpostedAmount,
      status,
    ],
    id,
  ) => ({
    id: id + 1,
    remittanceId,
    location,
    provider,
    Payor,
    paymentMethod,
    chequeNumber,
    amount,
    checkDate,
    receivedDate,
    claimNumbers,
    unpostedAmount,
    status,
  }),
);

/* ---------- Patient Statement: New ---------- */
const STMT_SAMPLE = [
  [
    "Aamir Pathan",
    "863",
    "05/13/1984",
    "Self pay",
    "Never sent",
    0,
    0,
    0,
    "$600.00",
    "",
  ],
  [
    "Ashwani Srivas..",
    "849",
    "06/30/2000",
    "Self pay",
    "11/11/2025",
    1,
    1,
    0,
    "$44.08",
    "",
  ],
  [
    "Asok Rana",
    "852",
    "11/27/1980",
    "Self pay",
    "Never sent",
    0,
    0,
    0,
    "$220.00",
    "",
  ],
  [
    "Beena Rawat",
    "846",
    "08/24/1965",
    "Medicare",
    "11/19/2025",
    1,
    0,
    1,
    "$180.00",
    "",
  ],
  [
    "Daniel Mishra",
    "833",
    "11/17/1999",
    "Payment plan",
    "11/11/2025",
    2,
    1,
    1,
    "$554.50",
    "",
  ],
  [
    "Dinesh Singh",
    "837",
    "06/23/1998",
    "Self pay",
    "12/13/2025",
    1,
    0,
    0,
    "$101.00",
    "",
  ],
  [
    "Divesh Sundriyal",
    "830",
    "05/18/1987",
    "Self pay",
    "01/14/2026",
    2,
    1,
    1,
    "$120.00",
    "",
  ],
  [
    "Divya Negi",
    "828",
    "01/27/1990",
    "Self pay",
    "07/28/2026",
    2,
    1,
    0,
    "$133.00",
    "Bad address on file, mailing",
  ],
  [
    "Govind Singh",
    "850",
    "05/12/2013",
    "Commercial",
    "Never sent",
    0,
    0,
    0,
    "$226.00",
    "Bad address on file, mailing",
  ],
  [
    "Govind Singh",
    "850",
    "05/12/2013",
    "Commercial",
    "Never sent",
    0,
    0,
    0,
    "$226.00",
    "Bad address on file, mailing",
  ],
  [
    "Preeti Bhandari",
    "868",
    "03/09/1972",
    "Medicare",
    "02/02/2026",
    3,
    1,
    0,
    "$88.25",
    "",
  ],
  [
    "Rajkumar Patwal",
    "827",
    "02/13/1989",
    "Credit bal.",
    "Never sent",
    0,
    1,
    1,
    "-$1,652.00",
    "",
  ],
  [
    "Ramesh Chopra",
    "854",
    "11/29/2001",
    "Payment plan",
    "11/25/2025",
    1,
    1,
    0,
    "$284.00",
    "",
  ],
  [
    "Salmaan Pathan",
    "864",
    "10/29/1979",
    "Commercial",
    "11/20/2025",
    1,
    1,
    0,
    "$270.00",
    "",
  ],
  [
    "Sunita Joshi",
    "875",
    "12/01/1958",
    "Commercial",
    "10/30/2025",
    1,
    1,
    0,
    "$96.40",
    "",
  ],
];

const newStatementData = STMT_SAMPLE.map(
  (
    [
      name,
      pid,
      dob,
      category,
      lastStatement,
      sent,
      calls,
      emails,
      balance,
      alert,
    ],
    i,
  ) => ({
    id: i + 1,
    name,
    pid,
    dob,
    category,
    lastStatement,
    sent,
    calls,
    emails,
    docs: 0,
    prints: 0,
    enc: "1/1",
    balance,
    selectedBalance: balance,
    alert,
    flagged: i === 5,
    negative: balance.startsWith("-"),
  }),
);

/* ---------- Patient Statement: History ---------- */
const historyBatchStatuses = [
  "Draft",
  "Email sent",
  "Partially sent",
  "Failure",
  "Draft",
  "Queued for email",
  "Draft",
  "Draft",
  "Draft",
  "Draft",
  "Draft",
  "Draft",
  "Draft",
  "Draft",
  "Draft",
];

const historyStatementData = historyBatchStatuses.map((status, index) => ({
  id: index + 1,
  practice: "Fresh Original",
  batchId: String(863 + index),
  batchName: "DanialMishra",
  batchDescription: "—",
  noOfStatement: 1,
  totalBalance: "Never sent",
  batchStatus: status,
  statementWithErrors: 0,
}));

/* ================================================================== */
/* Table column definitions (id, label, sort type, optional render)     */
/* ================================================================== */
const PRE_COLUMNS = [
  { id: "dosShort", label: "DOS", sort: "date", center: true },
  {
    id: "patientName",
    label: "Patient Name\n(Gender)",
    sort: "alpha",
    center: true,
    render: (r) => `${r.patientName} ${r.gender}`,
  },
  { id: "cpt", label: "CPT", center: true },
  { id: "modifier", label: "Modifier", center: true },
  { id: "icd", label: "ICD", center: true },
  { id: "primaryInsurance", label: "Primary\nInsurance", center: true },
  { id: "billed", label: "Billed\nAmount", center: true },
  { id: "patientCopay", label: "Patient\nCopay", center: true },
  {
    id: "status",
    label: "Status",
    center: true,
    render: (r) => {
      const s = PRE_STATUS_STYLES[r.status] || PRE_STATUS_STYLES.Unbilled;
      return <StatusPill label={r.status} bg={s.bg} fg={s.fg} />;
    },
  },
  {
    id: "remarks",
    label: "Remarks",
    center: true,
    cellSx: { maxWidth: 180, fontSize: 11, color: "rgba(0, 0, 0, 0.7)" },
  },
  { id: "encounterId", label: "Encounter ID", sort: "number", center: true },
  { id: "claimId", label: "Claim ID", sort: "number", center: true },
  { id: "referenceId", label: "Reference ID", sort: "number", center: true },
  {
    id: "actions",
    label: "Actions",
    center: true,
    render: (r, ctx) => (
      <RowActionIcons
        onEdit={() => ctx.onEdit(r)}
        onCheck={() => ctx.onCheck(r)}
      />
    ),
  },
];

const POST_COLUMNS = [
  { id: "dos", label: "DOS", sort: "date", center: true },
  {
    id: "patientName",
    label: "Patient Name\n(Gender)",
    sort: "alpha",
    center: true,
    render: (r) => `${r.patientName} ${r.gender}`,
  },
  { id: "cpt", label: "CPT", center: true },
  { id: "modifier", label: "Modifier", center: true },
  { id: "icd", label: "ICD", center: true },
  { id: "billedTo", label: "Billed To", center: true },
  { id: "billed", label: "Billed Amnt", center: true },
  { id: "adjustment", label: "Adjustment", center: true },
  { id: "insurancePayment", label: "Insurance\nPayment", center: true },
  { id: "patientPayment", label: "Patient\nPayment", center: true },
  { id: "billedAs", label: "Billed As", center: true },
  {
    id: "status",
    label: "Status",
    center: true,
    render: (r) => {
      const s = POST_STATUS_STYLES[r.status] || POST_STATUS_STYLES.Submitted;
      return <StatusPill label={r.status} bg={s.bg} fg={s.fg} />;
    },
  },
  { id: "clearingHouse", label: "Clearing\nHouse", center: true },
  { id: "firstBilled", label: "First Billed", center: true },
  { id: "encounterId", label: "Encounter ID", sort: "number", center: true },
  { id: "claimId", label: "Claim ID", sort: "number", center: true },
  {
    id: "actions",
    label: "Actions",
    center: true,
    render: (r, ctx) => (
      <RowActionIcons
        onEdit={() => ctx.onEdit(r)}
        onCheck={() => ctx.onCheck(r)}
      />
    ),
  },
];

const REMIT_COLUMNS = [
  { id: "remittanceId", label: "ID", sort: "number", center: true },
  { id: "location", label: "Location", center: true },
  { id: "provider", label: "Provider", center: true },
  { id: "Payor", label: "Payor", center: true },
  { id: "paymentMethod", label: "Payment Method", center: true },
  { id: "chequeNumber", label: "Check", center: true },
  { id: "amount", label: "Amount", center: true },
  { id: "checkDate", label: "Check Date", sort: "date", center: true },
  { id: "receivedDate", label: "Received Date", sort: "date", center: true },
  { id: "claimNumbers", label: "Claim Numbers", center: true },
  { id: "unpostedAmount", label: "Unposted Amount", center: true },
  {
    id: "status",
    label: "Status",
    center: true,
    render: (r) => {
      const s = REMIT_STATUS_STYLES[r.status] || REMIT_STATUS_STYLES.Posted;
      return <StatusPill label={r.status} bg={s.bg} fg={s.fg} />;
    },
  },
  {
    id: "actions",
    label: "Action",
    center: true,
    render: (r, ctx) => (
      <Box sx={{ display: "flex", gap: 0.5, alignItems: "center", justifyContent: "center" }}>
        <Tooltip title="Refresh/Sync" placement="top">
          <IconButton
            size="small"
            onClick={() => ctx.onShowEob(r)}
            sx={{ padding: "2px" }}
          >
            <RefreshIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="View" placement="top">
          <IconButton size="small" sx={{ padding: "4px" }}>
            <ViewIconRemittance />
          </IconButton>
        </Tooltip>
        <Tooltip title="Download" placement="top">
          <IconButton size="small" sx={{ padding: "4px" }}>
            <DownloadIconRemittance />
          </IconButton>
        </Tooltip>
      </Box>
    ),
  },
];

const iconColSx = { width: 30, minWidth: 30, px: 0, maxWidth: 30 };
const iconCellSx = { color: "#4B5563", px: 0 };

const NEW_STMT_COLUMNS = [
  {
    id: "name",
    label: "Patient Name",
    sort: "alpha",
    center: true,
    cellSx: { fontWeight: 600 },
  },
  { id: "pid", label: "ID", sort: "number", center: true, cellSx: { color: "#4B5563" } },
  { id: "dob", label: "DOB", center: true, cellSx: { color: "#4B5563" } },
  {
    id: "category",
    label: "Category",
    center: true,
    render: (r) => (
      <Chip
        label={r.category}
        size="small"
        sx={{
          ...chipBase,
          ...(categoryStyles[r.category] || categoryStyles["Self pay"]),
        }}
      />
    ),
  },
  {
    id: "lastStatement",
    label: "Last\nStatement",
    center: true,
    cellSx: (r) => ({
      color: r.lastStatement === "Never sent" ? "#B45309" : "#4B5563",
    }),
  },
  { id: "sent", label: "Sent", center: true, cellSx: { color: "#6B7280" } },
  {
    id: "calls",
    title: "Calls",
    label: <IconHead Icon={SmsIcon} title="Calls" />,
    center: true,
    headSx: { ...iconColSx, px: 0.25 },
    cellSx: iconCellSx,
  },
  {
    id: "emails",
    title: "Emails",
    label: <IconHead Icon={AtRateIcon} title="Emails" />,
    center: true,
    headSx: { ...iconColSx, px: 0.25 },
    cellSx: iconCellSx,
    render: (r) =>
      r.flagged ? (
        <Box
          sx={{
            width: 9,
            height: 9,
            borderRadius: "50%",
            backgroundColor: "#EF4444",
            display: "inline-block",
          }}
        />
      ) : (
        r.emails
      ),
  },
  {
    id: "prints",
    title: "Prints",
    label: <IconHead Icon={PrinterIcon} title="Prints" />,
    center: true,
    headSx: { ...iconColSx, px: 0.25 },
    cellSx: iconCellSx,
  },
  {
    id: "docs",
    title: "Documents",
    label: <IconHead Icon={ListIcon} title="Documents" />,
    center: true,
    headSx: { ...iconColSx, px: 0.25 },
    cellSx: iconCellSx,
  },
  { id: "enc", label: "Enc", center: true, cellSx: { color: "#4B5563" } },
  {
    id: "balance",
    label: "Balance",
    center: true,
    cellSx: (r) => ({
      fontWeight: 600,
      color: r.negative ? "#DC2626" : "#1F2937",
    }),
  },
  {
    id: "reason",
    label: "Reason",
    center: true,
    getValue: (r) => r.reason || "Reason here",
    cellSx: { color: "#374151" },
    render: (r) => r.reason || "Reason here",
  },
  {
    id: "selectedBalance",
    label: "Selected",
    center: true,
    getValue: (r) => r.balance,
    headSx: { backgroundColor: selHeadBg, minWidth: 100 },
    cellSx: (r) => ({
      fontWeight: 700,
      color: r.negative ? "#DC2626" : "#1F2937",
      backgroundColor: selBodyBg,
    }),
    render: (r, ctx) =>
      ctx.selectedIds.includes(r.id) ? (r.selectedBalance ?? r.balance) : "—",
  },
  {
    id: "alert",
    label: "Alert",
    center: true,
    getValue: (r) => r.alert || "",
    cellSx: { fontSize: 10.5, color: "#A16207", maxWidth: 130 },
    render: (r) =>
      r.alert ? (
        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 0.6, justifyContent: "center" }}>
          <Box
            sx={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              backgroundColor: "#F59E0B",
              mt: "5px",
              flexShrink: 0,
            }}
          />
          <span>{r.alert}</span>
        </Box>
      ) : (
        <span style={{ color: "#9CA3AF" }}>—</span>
      ),
  },
  {
    id: "action",
    label: "Action",
    center: true,
    headSx: { width: 75 },
    render: (r) => (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
        }}
      >
        <Tooltip title="View" placement="top">
          <IconButton
            size="small"
            sx={{ p: "3px", "&:hover": { backgroundColor: "transparent" } }}
          >
            <EyeVisible width={17} height={17} />
          </IconButton>
        </Tooltip>

        <Tooltip title="Share" placement="top">
          <IconButton
            size="small"
            sx={{ p: "3px", "&:hover": { backgroundColor: "transparent" } }}
          >
            <Share width={17} height={17} />
          </IconButton>
        </Tooltip>
      </Box>
    ),
  },
];

const HISTORY_COLUMNS = [
  {
    id: "practice",
    label: "Practice",
    sort: "alpha",
    cellSx: { fontWeight: 700 },
  },
  {
    id: "batchId",
    label: "Batch ID",
    sort: "number",
    cellSx: { color: "#4B5563" },
  },
  { id: "batchName", label: "Batch Name", sort: "alpha" },
  {
    id: "batchDescription",
    label: "Batch Description",
    sort: "alpha",
    cellSx: { color: "#9CA3AF" },
  },
  { id: "noOfStatement", label: "No. of Statement", sort: "number" },
  {
    id: "totalBalance",
    label: "Total Balance",
    sort: "alpha",
    cellSx: (r) => ({
      color: r.totalBalance === "Never sent" ? "#B45309" : "#1F2937",
    }),
  },
  {
    id: "batchStatus",
    label: "Batch Status",
    sort: "alpha",
    render: (r) => (
      <Chip
        label={r.batchStatus}
        size="small"
        sx={{
          ...chipBase,
          maxWidth: "none",
          ...(statusChipStyles[r.batchStatus] || statusChipStyles.Draft),
        }}
      />
    ),
  },
  {
    id: "statementWithErrors",
    label: "Statement\nwith errors",
    sort: "number",
  },
  {
    id: "actions",
    label: "",
    headSx: { width: 80 },
    render: () => (
      <Box
        sx={{
          display: "flex",
          gap: 0.75,
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Tooltip title="Info" placement="top">
          <IconButton size="small" sx={{ p: "2px" }}>
            <InfoOutlined sx={{ fontSize: 16, color: BLUE }} />
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete" placement="top">
          <IconButton size="small" sx={{ p: "2px" }}>
            <DeleteIcon sx={{ fontSize: 16, color: "#1E3A8A" }} />
          </IconButton>
        </Tooltip>
      </Box>
    ),
  },
];

/* ================================================================== */
/* Static config                                                        */
/* ================================================================== */
const EMPTY_FILTERS = {
  provider: "",
  serviceLocation: "",
  patientName: "",
  claimNumber: "", // Claim / Encounter ID
  dosFrom: "",
  dosTill: "",
  insurance: "",
  insurancePlan: "",
  batchNumber: "",
  finId: "",
  mrn: "",
  status: "",
};

const PROVIDER_OPTIONS = [
  "Ramesh M. MD",
  "Sarah K. MD",
  "David L. MD",
  "Emily R. MD",
];
const PLAN_OPTIONS = ["PPO", "HMO", "EPO", "POS"];

const EMPTY_ADJ = {
  type: "",
  postingDate: "",
  adjustment: "",
  code: "",
  reasonCode: "",
  relatedPayment: "",
  changeStatus: "",
  notes: "",
};

// Column options for each tab
const PRE_BILLING_COLUMN_OPTIONS = [
  { key: "dosShort", label: "DOS" },
  { key: "patientName", label: "Patient Name (Gender)" },
  { key: "cpt", label: "CPT" },
  { key: "modifier", label: "Modifier" },
  { key: "icd", label: "ICD" },
  { key: "primaryInsurance", label: "Primary Insurance" },
  { key: "billed", label: "Billed Amount" },
  { key: "patientCopay", label: "Patient Copay" },
  { key: "status", label: "Status" },
  { key: "remarks", label: "Remarks" },
  { key: "encounterId", label: "Encounter ID" },
  { key: "claimId", label: "Claim ID" },
  { key: "referenceId", label: "Reference ID" },
];

const POST_BILLING_COLUMN_OPTIONS = [
  { key: "dos", label: "DOS" },
  { key: "patientName", label: "Patient Name (Gender)" },
  { key: "cpt", label: "CPT" },
  { key: "modifier", label: "Modifier" },
  { key: "icd", label: "ICD" },
  { key: "billedTo", label: "Billed To" },
  { key: "billed", label: "Billed Amount" },
  { key: "adjustment", label: "Adjustment" },
  { key: "insurancePayment", label: "Insurance Payment" },
  { key: "patientPayment", label: "Patient Payment" },
  { key: "billedAs", label: "Billed As" },
  { key: "status", label: "Status" },
  { key: "clearingHouse", label: "Clearing House" },
  { key: "firstBilled", label: "First Billed" },
  { key: "encounterId", label: "Encounter ID" },
  { key: "claimId", label: "Claim ID" },
];

const REMITTANCE_COLUMN_OPTIONS = [
  { key: "remittanceId", label: "Remittance ID" },
  { key: "location", label: "Location" },
  { key: "provider", label: "Provider" },
  { key: "Payor", label: "Payor" },
  { key: "paymentMethod", label: "Payment Method" },
  { key: "chequeNumber", label: "Check Number" },
  { key: "amount", label: "Amount" },
  { key: "checkDate", label: "Check Date" },
  { key: "receivedDate", label: "Received Date" },
  { key: "claimNumbers", label: "Claim Numbers" },
  { key: "unpostedAmount", label: "Unposted Amount" },
  { key: "status", label: "Status" },
];

const PATIENT_STATEMENT_COLUMN_OPTIONS = [
  { key: "name", label: "Patient Name" },
  { key: "pid", label: "Patient ID" },
  { key: "dob", label: "DOB" },
  { key: "category", label: "Category" },
  { key: "lastStatement", label: "Last Statement" },
  { key: "sent", label: "Sent" },
  { key: "calls", label: "Calls" },
  { key: "emails", label: "Emails" },
  { key: "prints", label: "Prints" },
  { key: "docs", label: "Documents" },
  { key: "enc", label: "Encounters" },
  { key: "balance", label: "Balance" },
  { key: "reason", label: "Reason" },
  { key: "selectedBalance", label: "Selected Balance" },
  { key: "alert", label: "Alert" },
];

const HISTORY_COLUMN_OPTIONS = [
  { key: "practice", label: "Practice" },
  { key: "batchId", label: "Batch ID" },
  { key: "batchName", label: "Batch Name" },
  { key: "batchDescription", label: "Batch Description" },
  { key: "noOfStatement", label: "No. of Statement" },
  { key: "totalBalance", label: "Total Balance" },
  { key: "batchStatus", label: "Batch Status" },
  { key: "statementWithErrors", label: "Statement with Errors" },
];

// Helper to get column options based on current tab and subtab
const getColumnOptions = (tabIndex, statementSubTab = "new") => {
  switch (tabIndex) {
    case 0: return PRE_BILLING_COLUMN_OPTIONS;
    case 1: return POST_BILLING_COLUMN_OPTIONS;
    case 2: return REMITTANCE_COLUMN_OPTIONS;
    case 3: 
      return statementSubTab === "history" 
        ? HISTORY_COLUMN_OPTIONS 
        : PATIENT_STATEMENT_COLUMN_OPTIONS;
    default: return PRE_BILLING_COLUMN_OPTIONS;
  }
};

const setAllColumns = (columnOptions, value) => ({
  ...Object.fromEntries(columnOptions.map((c) => [c.key, value])),
});

// Helper function to filter columns based on visibility
const filterColumns = (columns, visibleColumns) => {
  return columns.filter(col => {
    // Always show actions/action column
    if (col.id === 'actions' || col.id === 'action') return true;
    // Show column if it's visible
    return visibleColumns[col.id] !== false;
  });
};

const ACTION_MENU_ITEMS = [
  ["Print Claim", "Ctrl+P"],
  ["Rebill", "Ctrl+R"],
  ["Transfer Balance", "Ctrl+T"],
  [
    <>
      Transfer patient balance to
      <br />
      patient responsibility
    </>,
    "Ctrl+Shift+T",
    32,
  ],
  ["Note", "Ctrl+N"],
  ["Settle", "Ctrl+S"],
  ["Re-Open", "Ctrl+Shift+R"],
  ["Void", "Ctrl+O"],
  ["Apply Payment", "Ctrl+Shift+A"],
  ["Adjustment", "Ctrl+J"],
  ["Apply Payment & Adjust", "Ctrl+Shift+J"],
  ["Set Follow-up Date", "Ctrl+Shift+F"],
];

/* ================================================================== */
/* Main Page                                                            */
/* ================================================================== */
const PRE_CHIPS = [
  ["all", "All", null],
  ["unbilled", "Unbilled", "Unbilled"],
  ["ready", "Ready To Bill", "Ready"],
  ["need", "Need Info", "Need Info"],
  ["processed", "Processed", "Processed"],
  ["archived", "Archived", "Archived"],
];

const REMIT_CHIPS = [
  ["all", "All", null],
  ["notPosted", "Not Posted", "Not Posted"],
  ["partiallyPosted", "Partially Posted", "Partially posted"],
  ["fullyPosted", "Fully Posted", "Fully posted"],
  ["markReview", "Mark as Review", "Mark as review"],
];

const TABS = [
  "Pre-Billing Claims",
  "Post-Billing Claims",
  "Remittance ERA/EOB",
  "Patient Statement",
];

function PreBillingClaim() {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine initial tab based on URL path
  const getInitialTab = () => {
    const path = location.pathname;
    if (path.includes('/claims/pre-billing')) return 0;
    if (path.includes('/claims/post-billing')) return 1;
    if (path.includes('/claims/remittance-era')) return 2;
    if (path.includes('/claims/patient-statement')) return 3;
    // For /encounters route, check if there's a stored tab in state, otherwise default to 0
    if (path === '/encounters') {
      return location.state?.activeTab ?? 0;
    }
    return location.state?.activeTab ?? 0;
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [appliedFilters, setAppliedFilters] = useState(null);
  const [filterForm, setFilterForm] = useState(EMPTY_FILTERS);
  const setFilterField = (key) => (value) =>
    setFilterForm((prev) => ({ ...prev, [key]: value }));

  const [currentTab, setCurrentTab] = useState(getInitialTab());
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [viewMode, setViewMode] = useState("list");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState({
    preBilling: false,
    postBilling: false,
    remittance: false,
    statement: false,
  });

  // Check if we're on a claims submenu route (not encounters)
  const isClaimsSubmenu = location.pathname.startsWith('/claims/');
  // Determine if tabs and banner should be hidden
  const hideTabsAndBanner = isClaimsSubmenu;
  const [showColumnSettings, setShowColumnSettings] = useState(false);
  
  // Separate column visibility for each tab
  const [visibleColumnsPreBilling, setVisibleColumnsPreBilling] = useState(
    setAllColumns(PRE_BILLING_COLUMN_OPTIONS, true)
  );
  const [visibleColumnsPostBilling, setVisibleColumnsPostBilling] = useState(
    setAllColumns(POST_BILLING_COLUMN_OPTIONS, true)
  );
  const [visibleColumnsRemittance, setVisibleColumnsRemittance] = useState(
    setAllColumns(REMITTANCE_COLUMN_OPTIONS, true)
  );
  const [visibleColumnsPatientStatement, setVisibleColumnsPatientStatement] = useState(
    setAllColumns(PATIENT_STATEMENT_COLUMN_OPTIONS, true)
  );
  const [visibleColumnsHistory, setVisibleColumnsHistory] = useState(
    setAllColumns(HISTORY_COLUMN_OPTIONS, true)
  );
  
  // Temporary state for column dialog (only apply on Save View)
  const [tempVisibleColumns, setTempVisibleColumns] = useState({});

  /* Check-action: Add Remark popup */
  const [checkPopupOpen, setCheckPopupOpen] = useState(false);
  const [checkPopupRow, setCheckPopupRow] = useState(null);
  const [remarkText, setRemarkText] = useState("");
  // remarks are stored per tab + row id, so Pre and Post claims with the same id don't clash
  const [remarksByClaim, setRemarksByClaim] = useState({});
  const remarkEndRef = useRef(null);

  const remarkKey = checkPopupRow ? `${currentTab}-${checkPopupRow.id}` : null;
  const currentRemarks = remarkKey ? remarksByClaim[remarkKey] || [] : [];

  // Helper to get current visible columns based on tab
  const getCurrentVisibleColumns = () => {
    switch (currentTab) {
      case 0: return visibleColumnsPreBilling;
      case 1: return visibleColumnsPostBilling;
      case 2: return visibleColumnsRemittance;
      case 3: 
        return statementSubTab === "history" 
          ? visibleColumnsHistory 
          : visibleColumnsPatientStatement;
      default: return visibleColumnsPreBilling;
    }
  };

  // Helper to set visible columns for current tab
  const setCurrentVisibleColumns = (columns) => {
    switch (currentTab) {
      case 0: setVisibleColumnsPreBilling(columns); break;
      case 1: setVisibleColumnsPostBilling(columns); break;
      case 2: setVisibleColumnsRemittance(columns); break;
      case 3: 
        if (statementSubTab === "history") {
          setVisibleColumnsHistory(columns);
        } else {
          setVisibleColumnsPatientStatement(columns);
        }
        break;
    }
  };
  
  // Open dialog - initialize temp state with current tab's visibility
  const handleOpenColumnSettings = () => {
    setTempVisibleColumns(getCurrentVisibleColumns());
    setShowColumnSettings(true);
  };
  
  // Save View - apply temp state to actual state
  const handleSaveColumnSettings = () => {
    setCurrentVisibleColumns(tempVisibleColumns);
    setShowColumnSettings(false);
  };
  
  // Cancel - discard changes
  const handleCancelColumnSettings = () => {
    setShowColumnSettings(false);
  };

  const formatRemarkTime = (d = new Date()) => {
    const p = (n) => String(n).padStart(2, "0");
    return `${p(d.getMonth() + 1)}/${p(d.getDate())}/${d.getFullYear()} ${p(
      d.getHours(),
    )}:${p(d.getMinutes())}`;
  };

  const handleOpenCheckPopup = (row) => {
    setCheckPopupRow(row);
    setRemarkText("");
    setCheckPopupOpen(true);
  };

  const handleCloseCheckPopup = () => {
    setCheckPopupOpen(false);
    setCheckPopupRow(null);
    setRemarkText("");
  };

  const handleSendRemark = () => {
    const text = remarkText.trim();
    if (!text || !remarkKey) return;
    setRemarksByClaim((prev) => ({
      ...prev,
      [remarkKey]: [
        ...(prev[remarkKey] || []),
        {
          id: Date.now(),
          text,
          author: "Biller V2, Jayram", // replace with logged-in user
          time: formatRemarkTime(),
        },
      ],
    }));
    setRemarkText("");
  };

  /* auto scroll to latest remark */
  useEffect(() => {
    remarkEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentRemarks.length, checkPopupOpen]);

  /* Reopen the correct tab when returning from an edit page */
  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/claims/pre-billing')) {
      setCurrentTab(0);
    } else if (path.includes('/claims/post-billing')) {
      setCurrentTab(1);
    } else if (path.includes('/claims/remittance-era')) {
      setCurrentTab(2);
    } else if (path.includes('/claims/patient-statement')) {
      setCurrentTab(3);
    } else if (location.state?.activeTab !== undefined) {
      setCurrentTab(location.state.activeTab);
    }
  }, [location.pathname, location.state]);

  /* Additional Details */
  const [adj, setAdj] = useState(EMPTY_ADJ);
  const setAdjField = (key) => (value) =>
    setAdj((prev) => ({ ...prev, [key]: value }));

  /* Remittance */
  const [remittanceFilter, setRemittanceFilter] = useState("all");
  const [remittanceSelected, setRemittanceSelected] = useState([]);

  /* Patient Statement */
  const [statementSubTab, setStatementSubTab] = useState("new");
  const [statementSelectedRows, setStatementSelectedRows] = useState(
    newStatementData.map((r) => r.id),
  );
  const [historySelectedRows, setHistorySelectedRows] = useState([]);

  const handleEditClick = (claim) =>
    navigate(`/claims/post-billing-edit/${claim.id}`, { 
      state: { claim, activeTab: currentTab } 
    });
  
  // Handler for clicking on post-billing row (anywhere in the row) - opens detail view
  const handlePostBillingRowClick = (claim) =>
    navigate(`/claims/post-billing-detail/${claim.id}`, { 
      state: { claim, activeTab: currentTab } 
    });

  const handleEditPreBilling = (claim) =>
    navigate(`/pre-billing-edit/${claim.id}`, { 
      state: { claim, activeTab: currentTab } 
    });

  const handleShowEobDetails = (remittance) =>
    navigate(`/remittance-era-edit/${remittance.id}`, {
      state: { remittance },
    });

  const handleResetFilters = () => {
    setFilterForm(EMPTY_FILTERS);
    setAppliedFilters(null);
  };

  const handleApplyFilters = () => setAppliedFilters({ ...filterForm });

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
    setSearchQuery("");
    handleResetFilters();
    setSelectedRows([]);
    
    // Only update URL if we're on a claims submenu route, not on /encounters
    const currentPath = location.pathname;
    if (currentPath.startsWith('/claims/')) {
      const tabRoutes = [
        '/claims/pre-billing',
        '/claims/post-billing',
        '/claims/remittance-era',
        '/claims/patient-statement'
      ];
      navigate(tabRoutes[newValue], { replace: true });
    }
    // If on /encounters, don't change the route when tabs change
  };

  const toggleIn = (setter) => (id) =>
    setter((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  /* ================= SEARCH + ADVANCED FILTER ENGINE ================= */
  const f = appliedFilters || {};
  const norm = (v) =>
    String(v ?? "")
      .toLowerCase()
      .trim();
  const hasVal = (v) =>
    v !== undefined && v !== null && String(v).trim() !== "";

  /* <input type="date"> gives YYYY-MM-DD, but we now use MM/DD/YYYY */
  const parseInputDate = (s) => {
    if (!s) return null;
    const m = String(s).match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (!m) return null;
    const year = Number(m[3]);
    const month = Number(m[1]) - 1;
    const day = Number(m[2]);
    return new Date(year, month, day).getTime();
  };

  const matchesDateRange = (dateStr) => {
    const from = parseInputDate(f.dosFrom);
    const till = parseInputDate(f.dosTill);
    if (from === null && till === null) return true;
    const t = parseMDY(dateStr);
    if (t === null) return false;
    if (from !== null && t < from) return false;
    if (till !== null && t > till) return false;
    return true;
  };

  const applyAll = (
    rows,
    { searchFields, textMap = {}, selectMap = {}, statusField, dateField },
  ) =>
    rows.filter((row) => {
      const q = norm(searchQuery);
      if (q && !searchFields.some((k) => norm(row[k]).includes(q)))
        return false;

      for (const [filterKey, rowField] of Object.entries(textMap)) {
        if (!hasVal(f[filterKey])) continue;
        const fields = Array.isArray(rowField) ? rowField : [rowField];
        if (!fields.some((k) => norm(row[k]).includes(norm(f[filterKey]))))
          return false;
      }

      for (const [filterKey, rowField] of Object.entries(selectMap)) {
        if (hasVal(f[filterKey]) && norm(row[rowField]) !== norm(f[filterKey]))
          return false;
      }

      if (
        hasVal(f.status) &&
        statusField &&
        norm(row[statusField]) !== norm(f.status)
      )
        return false;

      if (dateField && !matchesDateRange(row[dateField])) return false;

      return true;
    });

  const withMeta = (rows) =>
    rows.map((r, i) => ({
      ...r,
      provider: r.provider ?? PROVIDER_OPTIONS[i % PROVIDER_OPTIONS.length],
      serviceLocation: r.serviceLocation ?? "The University RL",
      insurancePlan: r.insurancePlan ?? PLAN_OPTIONS[i % PLAN_OPTIONS.length],
    }));

  /* ---------- Pre-billing ---------- */
  const preBillingSearched = applyAll(withMeta(preBillingClaimsData), {
    searchFields: [
      "patientName",
      "mrn",
      "fin",
      "claimId",
      "encounterId",
      "referenceId",
      "primaryInsurance",
    ],
    textMap: {
      patientName: "patientName",
      finId: "fin",
      mrn: "mrn",
      claimNumber: ["claimId", "encounterId"],
    },
    selectMap: {
      insurance: "primaryInsurance",
      insurancePlan: "insurancePlan",
      provider: "provider",
      serviceLocation: "serviceLocation",
    },
    statusField: "status",
    dateField: "dos",
  });

  const preChipStatus = PRE_CHIPS.find((c) => c[0] === statusFilter)?.[2];
  const preBillingFiltered = preChipStatus
    ? preBillingSearched.filter((c) => c.status === preChipStatus)
    : preBillingSearched;

  /* ---------- Post-billing ---------- */
  const postBillingFiltered = applyAll(withMeta(postBillingClaimsData), {
    searchFields: [
      "patientName",
      "claimId",
      "encounterId",
      "billedTo",
      "status",
      "cpt",
      "clearingHouse",
    ],
    textMap: {
      patientName: "patientName",
      claimNumber: ["claimId", "encounterId"],
    },
    selectMap: {
      insurance: "billedTo",
      insurancePlan: "insurancePlan",
      provider: "provider",
      serviceLocation: "serviceLocation",
    },
    statusField: "status",
    dateField: "dos",
  });

  /* ---------- Remittance ERA/EOB ---------- */
  const remittanceSearched = applyAll(remittanceData, {
    searchFields: [
      "remittanceId",
      "location",
      "provider",
      "Payor",
      "paymentMethod",
      "chequeNumber",
      "status",
    ],
    textMap: { claimNumber: "remittanceId" },
    selectMap: {
      insurance: "Payor",
      provider: "provider",
      serviceLocation: "location",
    },
    statusField: "status",
    dateField: "checkDate",
  });

  const remitChipStatus = REMIT_CHIPS.find(
    (c) => c[0] === remittanceFilter,
  )?.[2];
  const remittanceFiltered = remitChipStatus
    ? remittanceSearched.filter((r) => r.status === remitChipStatus)
    : remittanceSearched;

  /* ---------- Patient Statement: New ---------- */
  const newStatementFiltered = applyAll(newStatementData, {
    searchFields: [
      "name",
      "pid",
      "dob",
      "category",
      "balance",
      "alert",
      "lastStatement",
    ],
    textMap: { patientName: "name", finId: "pid", mrn: "pid" },
    selectMap: {},
    statusField: "category",
  });

  /* ---------- Patient Statement: History ---------- */
  const historyFiltered = applyAll(historyStatementData, {
    searchFields: [
      "practice",
      "batchId",
      "batchName",
      "batchStatus",
      "batchDescription",
    ],
    textMap: { batchNumber: "batchId", patientName: "batchName" },
    selectMap: { practice: "practice" },
    statusField: "batchStatus",
  });

  const filteredData =
    currentTab === 0 ? preBillingFiltered : postBillingFiltered;

  /* Footer totals only count rows that are visible */
  const statementNewSelected = newStatementFiltered.filter((r) =>
    statementSelectedRows.includes(r.id),
  );
  const statementNewSelectedCount = statementNewSelected.length;
  const statementNewSelectedBalance = statementNewSelected.reduce(
    (sum, r) => sum + toAmount(r.balance),
    0,
  );

  const advStatusOptions =
    currentTab === 0
      ? ["Unbilled", "Ready", "Need Info", "Processed", "Archived"]
      : currentTab === 1
        ? [
            "Submitted",
            "Ready for statement",
            "Settled",
            "ERA Received",
            "Posted",
          ]
        : currentTab === 2
          ? [
              "Posted",
              "Partially posted",
              "Not Posted",
              "Fully posted",
              "Mark as review",
            ]
          : statementSubTab === "new"
            ? [
                "Self pay",
                "Medicare",
                "Payment plan",
                "Commercial",
                "Credit bal.",
              ]
            : [
                "Draft",
                "Email sent",
                "Partially sent",
                "Failure",
                "Queued for email",
              ];

  const providerOptions =
    currentTab === 2
      ? [...new Set(remittanceData.map((r) => r.provider))]
      : PROVIDER_OPTIONS;
  const locationOptions =
    currentTab === 2 ? ["GCH-IH", "GCH-OH"] : ["The University RL"];
  const insuranceOptions = [
    "Aetna",
    "BCBS",
    "Cigna",
    "UnitedHealth",
    "Medicare",
  ];

  const searchPlaceholder =
    currentTab === 2
      ? "Search ID, Payor, Provider, Check..."
      : currentTab === 3
        ? statementSubTab === "new"
          ? "Search patient, ID, DOB, category..."
          : "Search batch ID, name, practice, status..."
        : "Search Patient, MRN, FIN, Claim ID...";

  /* Row selection for the Pre / Post billing tables */
  const claimSelection = {
    selected: selectedRows,
    onToggle: toggleIn(setSelectedRows),
    onToggleAll: (checked) =>
      setSelectedRows(checked ? filteredData.map((r) => r.id) : []),
  };

  const activeFilterCount = Object.values(appliedFilters || {}).filter(
    hasVal,
  ).length;

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: "#f5f7fa",
        overflow: "hidden",
        overflowY: "auto",
      }}
    >
      {/* Main Tabs and Search Bar in Same Row (never wraps) - Hidden for Claims Submenu */}
      {!hideTabsAndBanner && (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: { xs: "wrap", md: "nowrap" },
          borderBottom: "1px solid #e0e0e0",
          backgroundColor: "white",
          px: { xs: 1, sm: 2 },
          gap: 1,
          minWidth: 0,
        }}
      >
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            minHeight: 48,
            flex: { xs: "1 1 100%", md: "0 0 auto" },
            flexShrink: 0,
            "& .MuiTabs-flexContainer": { gap: 0 },
            "& .MuiTab-root": {
              minHeight: 48,
              textTransform: "none",
              fontSize: { xs: 11, sm: 12 },
              fontWeight: 500,
              color: "#000000",
              px: { xs: 0.8, sm: 1.2 },
              minWidth: "auto",
              whiteSpace: "nowrap",
            },
            "& .Mui-selected": { color: "#0066ff", fontWeight: 600 },
            "& .MuiTabs-indicator": { backgroundColor: "#0066ff", height: 3 },
            "& .MuiTabs-scroller": { overflow: "visible !important" },
          }}
        >
          {TABS.map((label) => (
            <Tab key={label} label={label} />
          ))}
        </Tabs>

        {/* Right-hand group takes the leftover space; only the search shrinks */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 0.5, sm: 0.8 },
            flex: { xs: "1 1 100%", md: "1 1 0" },
            minWidth: 0,
            justifyContent: "flex-end",
            mt: { xs: 1, md: 0 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.8,
              flex: "1 1 120px",
              maxWidth: { xs: "100%", md: 290 },
              minWidth: { xs: 0, sm: 90 },
              height: 32,
              px: 1.25,
              borderRadius: "18px",
              backgroundColor: "#F5F7FA",
              border: "1px solid #E5E7EB",
              transition: "border-color 0.2s ease",
              "&:hover": { borderColor: "#0066FF" },
              "&:focus-within": { borderColor: "#0066FF" },
            }}
          >
            <SearchIcon width={16} height={16} color="#9CA3AF" />

            <InputBase
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              inputProps={{ "aria-label": "Search" }}
              sx={{
                flex: 1,
                minWidth: 0,
                fontSize: 12,
                color: "#4B5563",
                "& input::placeholder": { color: "#9CA3AF", opacity: 1 },
              }}
            />

            {searchQuery && (
              <IconButton
                size="small"
                onClick={() => setSearchQuery("")}
                sx={{ p: 0.25 }}
              >
                <Close sx={{ fontSize: 14 }} />
              </IconButton>
            )}
          </Box>

          {/* Advanced Filters */}
          <Button
            variant="outlined"
            size="small"
            onClick={() => {
              const tabKeys = ['preBilling', 'postBilling', 'remittance', 'statement'];
              const currentKey = tabKeys[currentTab];
              setShowAdvancedFilters(prev => ({
                ...prev,
                [currentKey]: !prev[currentKey]
              }));
            }}
            sx={{
              height: 32,
              minHeight: 32,
              width: { xs: "auto", sm: activeFilterCount > 0 ? 152 : 126 },
              minWidth: { xs: 32, sm: activeFilterCount > 0 ? 152 : 126 },
              borderRadius: "18px",
              textTransform: "none",
              color: showAdvancedFilters[['preBilling', 'postBilling', 'remittance', 'statement'][currentTab]] ? "#0066FF" : "#374151",
              borderColor: showAdvancedFilters[['preBilling', 'postBilling', 'remittance', 'statement'][currentTab]] ? "#0066FF" : "#E5E7EB",
              backgroundColor: showAdvancedFilters[['preBilling', 'postBilling', 'remittance', 'statement'][currentTab]] ? "#EFF6FF" : "#FFFFFF",
              fontWeight: 500,
              fontSize: { xs: 0, sm: 11.5 },
              px: { xs: 0, sm: 1.25 },
              whiteSpace: "nowrap",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: { xs: 0, sm: "6px" },
              "&:hover": {
                borderColor: showAdvancedFilters[['preBilling', 'postBilling', 'remittance', 'statement'][currentTab]] ? "#0052CC" : "#D1D5DB",
                backgroundColor: showAdvancedFilters[['preBilling', 'postBilling', 'remittance', 'statement'][currentTab]] ? "#DBEAFE" : "#F9FAFB",
              },
            }}
          >
            <Box
              sx={{
                width: 16,
                height: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {showAdvancedFilters[['preBilling', 'postBilling', 'remittance', 'statement'][currentTab]] ? (
                <Close sx={{ fontSize: 16 }} />
              ) : (
                <FilterIcon1 width={16} height={16} />
              )}
            </Box>

            <Box component="span" sx={{ lineHeight: 1, whiteSpace: "nowrap", display: { xs: "none", sm: "block" } }}>
              Advanced Filters
            </Box>

            {activeFilterCount > 0 && (
              <Box
                component="span"
                sx={{
                  minWidth: 18,
                  height: 18,
                  px: "5px",
                  borderRadius: "9px",
                  backgroundColor: "#0057E7",
                  color: "#FFFFFF",
                  fontSize: 10,
                  fontWeight: 600,
                  lineHeight: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {activeFilterCount}
              </Box>
            )}
          </Button>

          {/* List / Grid toggle - only for Pre-billing tab */}
          {currentTab === 0 && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexShrink: 0,
                height: 32,
                border: "1px solid #E5E7EB",
                borderRadius: "8px",
                overflow: "hidden",
                backgroundColor: "#FFFFFF",
              }}
            >
              {[
                ["list", ViewList],
                ["grid", ViewModule],
              ].map(([mode, Icon]) => (
                <IconButton
                  key={mode}
                  size="small"
                  onClick={() => setViewMode(mode)}
                  sx={{
                    width: 32,
                    height: 34,
                    borderRadius: 0,
                    backgroundColor: viewMode === mode ? "#0066FF" : "#FFFFFF",
                    color: viewMode === mode ? "#FFFFFF" : "#6B7280",
                    "&:hover": {
                      backgroundColor:
                        viewMode === mode ? "#0052CC" : "#F3F4F6",
                    },
                  }}
                >
                  <Icon sx={{ fontSize: 17 }} />
                </IconButton>
              ))}
            </Box>
          )}
        </Box>
      </Box>
      )}

      {/* Advanced Filters Panel */}
      {(showAdvancedFilters.preBilling && currentTab === 0) ||
       (showAdvancedFilters.postBilling && currentTab === 1) ||
       (showAdvancedFilters.remittance && currentTab === 2) ||
       (showAdvancedFilters.statement && currentTab === 3) ? (
        <Box sx={{ backgroundColor: "#F5F7FA", px: 2, py: 2 }}>
          <Box
            sx={{
              backgroundColor: "#FFFFFF",
              borderRadius: "12px",
              border: "1px solid #E5E7EB",
              p: "18px 18px 20px",
            }}
          >
            {/* PRE-BILLING FILTERS */}
            {currentTab === 0 && (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { 
                    xs: "repeat(1, minmax(0, 1fr))",
                    sm: "repeat(2, minmax(0, 1fr))", 
                    md: "repeat(3, minmax(0, 1fr))",
                    lg: "repeat(6, minmax(0, 1fr))"
                  },
                  columnGap: "14px",
                  rowGap: "19px",
                  mb: "20px",
                }}
              >
                {/* Row 1 */}
                <FilterSelect
                  label="Select Practice"
                  value={filterForm.provider}
                  onChange={setFilterField("provider")}
                  options={providerOptions}
                />
                <FilterSelect
                  label="Service Location"
                  value={filterForm.serviceLocation}
                  onChange={setFilterField("serviceLocation")}
                  options={locationOptions}
                />
                <FilterText
                  label="Patient Name"
                  value={filterForm.patientName}
                  onChange={setFilterField("patientName")}
                />
                <FilterText
                  label="Fin ID"
                  value={filterForm.finId}
                  onChange={setFilterField("finId")}
                />
                <FilterText
                  label="MRN"
                  value={filterForm.mrn}
                  onChange={setFilterField("mrn")}
                />
                <FilterText
                  label="Batch#"
                  value={filterForm.batchNumber}
                  onChange={setFilterField("batchNumber")}
                />

                {/* Row 2 */}
                <FilterText
                  label="Claim Number"
                  value={filterForm.claimNumber}
                  onChange={setFilterField("claimNumber")}
                />
                <FilterDate
                  label="DOS From"
                  value={filterForm.dosFrom}
                  onChange={setFilterField("dosFrom")}
                />
                <FilterDate
                  label="DOS Till"
                  value={filterForm.dosTill}
                  onChange={setFilterField("dosTill")}
                />
                <FilterSelect
                  label="Select Status"
                  value={filterForm.status}
                  onChange={setFilterField("status")}
                  options={advStatusOptions}
                />
                <FilterSelect
                  label="Select Insurance"
                  value={filterForm.insurance}
                  onChange={setFilterField("insurance")}
                  options={insuranceOptions}
                />
                <FilterSelect
                  label="Select Submission Method"
                  value={filterForm.insurancePlan}
                  onChange={setFilterField("insurancePlan")}
                  options={PLAN_OPTIONS}
                />
              </Box>
            )}

            {/* POST-BILLING FILTERS */}
            {currentTab === 1 && (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { 
                    xs: "repeat(1, minmax(0, 1fr))",
                    sm: "repeat(2, minmax(0, 1fr))", 
                    md: "repeat(3, minmax(0, 1fr))",
                    lg: "repeat(6, minmax(0, 1fr))"
                  },
                  columnGap: "14px",
                  rowGap: "19px",
                  mb: "20px",
                }}
              >
                {/* Row 1 */}
                <FilterSelect
                  label="Select Practice"
                  value={filterForm.provider}
                  onChange={setFilterField("provider")}
                  options={providerOptions}
                />
                <FilterSelect
                  label="Service Location"
                  value={filterForm.serviceLocation}
                  onChange={setFilterField("serviceLocation")}
                  options={locationOptions}
                />
                <FilterText
                  label="Patient Name"
                  value={filterForm.patientName}
                  onChange={setFilterField("patientName")}
                />
                <FilterText
                  label="Fin ID"
                  value={filterForm.finId}
                  onChange={setFilterField("finId")}
                />
                <FilterText
                  label="MRN"
                  value={filterForm.mrn}
                  onChange={setFilterField("mrn")}
                />
                <FilterText
                  label="Batch#"
                  value={filterForm.batchNumber}
                  onChange={setFilterField("batchNumber")}
                />

                {/* Row 2 */}
                <FilterText
                  label="Claim Number"
                  value={filterForm.claimNumber}
                  onChange={setFilterField("claimNumber")}
                />
                <FilterDate
                  label="DOS From"
                  value={filterForm.dosFrom}
                  onChange={setFilterField("dosFrom")}
                />
                <FilterDate
                  label="DOS Till"
                  value={filterForm.dosTill}
                  onChange={setFilterField("dosTill")}
                />
                <FilterSelect
                  label="Select Status"
                  value={filterForm.status}
                  onChange={setFilterField("status")}
                  options={advStatusOptions}
                />
                <FilterSelect
                  label="Select Insurance"
                  value={filterForm.insurance}
                  onChange={setFilterField("insurance")}
                  options={insuranceOptions}
                />
                <FilterSelect
                  label="Select Submission Method"
                  value={filterForm.insurancePlan}
                  onChange={setFilterField("insurancePlan")}
                  options={PLAN_OPTIONS}
                />

                {/* Row 3 */}
                <FilterSelect
                  label="Select Rendering Provider"
                  value={filterForm.patientName}
                  onChange={setFilterField("patientName")}
                  options={providerOptions}
                />
                <FilterSelect
                  label="Select Insurance Plan"
                  value={filterForm.mrn}
                  onChange={setFilterField("mrn")}
                  options={PLAN_OPTIONS}
                />
                <Box /> {/* Empty cell */}
                <Box /> {/* Empty cell */}
                <Box /> {/* Empty cell */}
                <Box /> {/* Empty cell */}
              </Box>
            )}

            {/* REMITTANCE ERA/EOB FILTERS */}
            {currentTab === 2 && (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { 
                    xs: "repeat(1, minmax(0, 1fr))",
                    sm: "repeat(2, minmax(0, 1fr))", 
                    md: "repeat(3, minmax(0, 1fr))",
                    lg: "repeat(6, minmax(0, 1fr))"
                  },
                  columnGap: "14px",
                  rowGap: "19px",
                  mb: "20px",
                }}
              >
                {/* Row 1 */}
                <FilterSelect
                  label="Select Practice"
                  value={filterForm.provider}
                  onChange={setFilterField("provider")}
                  options={providerOptions}
                />
                <FilterDate
                  label="Received Since"
                  value={filterForm.receivedSince}
                  onChange={setFilterField("receivedSince")}
                />
                <FilterDate
                  label="Received Till"
                  value={filterForm.receivedTill}
                  onChange={setFilterField("receivedTill")}
                />
                <FilterText
                  label="Claim Number"
                  value={filterForm.claimNumber}
                  onChange={setFilterField("claimNumber")}
                />
                <FilterText
                  label="Check Number"
                  value={filterForm.checkNumber}
                  onChange={setFilterField("checkNumber")}
                />
                <FilterText
                  label="Id"
                  value={filterForm.eraId}
                  onChange={setFilterField("eraId")}
                />

                {/* Row 2 */}
                <FilterSelect
                  label="Status"
                  value={filterForm.status}
                  onChange={setFilterField("status")}
                  options={advStatusOptions}
                />
                <FilterSelect
                  label="Payor"
                  value={filterForm.insurance}
                  onChange={setFilterField("insurance")}
                  options={insuranceOptions}
                />
                <FilterDate
                  label="Check Date From"
                  value={filterForm.dosFrom}
                  onChange={setFilterField("dosFrom")}
                />
                <FilterDate
                  label="Check Date Till"
                  value={filterForm.dosTill}
                  onChange={setFilterField("dosTill")}
                />
                <FilterSelect
                  label="Payment Method"
                  value={filterForm.paymentMethod}
                  onChange={setFilterField("paymentMethod")}
                  options={["EFT", "Check", "Wire Transfer", "Card"]}
                />
                <FilterText
                  label="Total Posted Amount"
                  value={filterForm.totalPostedAmount}
                  onChange={setFilterField("totalPostedAmount")}
                />

                {/* Row 3 */}
                <FilterText
                  label="Total Unposted Amount"
                  value={filterForm.totalUnpostedAmount}
                  onChange={setFilterField("totalUnpostedAmount")}
                />
                <Box /> {/* Empty cell */}
                <Box /> {/* Empty cell */}
                <Box /> {/* Empty cell */}
                <Box /> {/* Empty cell */}
                <Box /> {/* Empty cell */}
              </Box>
            )}

            {/* PATIENT STATEMENT FILTERS */}
            {currentTab === 3 && (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { 
                    xs: "repeat(1, minmax(0, 1fr))",
                    sm: "repeat(2, minmax(0, 1fr))", 
                    md: "repeat(3, minmax(0, 1fr))",
                    lg: "repeat(6, minmax(0, 1fr))"
                  },
                  columnGap: "14px",
                  rowGap: "19px",
                  mb: "20px",
                }}
              >
                {statementSubTab === "new" ? (
                  <>
                    {/* Row 1 - New Statement Filters */}
                    <FilterSelect
                      label="Practice"
                      value={filterForm.provider}
                      onChange={setFilterField("provider")}
                      options={providerOptions}
                    />
                    <FilterSelect
                      label="Service Location"
                      value={filterForm.serviceLocation}
                      onChange={setFilterField("serviceLocation")}
                      options={locationOptions}
                    />
                    <FilterText
                      label="Patient Name"
                      value={filterForm.patientName}
                      onChange={setFilterField("patientName")}
                    />
                    <FilterText
                      label="Global Patient ID"
                      value={filterForm.claimNumber}
                      onChange={setFilterField("claimNumber")}
                    />
                    <Box /> {/* Empty cell */}
                    <Box /> {/* Empty cell */}
                  </>
                ) : (
                  <>
                    {/* Row 1 - History Filters */}
                    <FilterSelect
                      label="Practice"
                      value={filterForm.provider}
                      onChange={setFilterField("provider")}
                      options={providerOptions}
                    />
                    <FilterSelect
                      label="Service Location"
                      value={filterForm.serviceLocation}
                      onChange={setFilterField("serviceLocation")}
                      options={locationOptions}
                    />
                    <FilterText
                      label="Patient Name"
                      value={filterForm.patientName}
                      onChange={setFilterField("patientName")}
                    />
                    <FilterText
                      label="Batch Name"
                      value={filterForm.batchNumber}
                      onChange={setFilterField("batchNumber")}
                    />
                    <FilterSelect
                      label="Batch Status"
                      value={filterForm.status}
                      onChange={setFilterField("status")}
                      options={["Draft", "Email sent", "Partially sent", "Failure", "Queued for email"]}
                    />
                    <FilterText
                      label="Global Patient ID"
                      value={filterForm.claimNumber}
                      onChange={setFilterField("claimNumber")}
                    />
                  </>
                )}
              </Box>
            )}

            <Box sx={{ display: "flex", gap: "16px", alignItems: "center" }}>
              <Button
                variant="contained"
                disableElevation
                onClick={handleApplyFilters}
                sx={{
                  textTransform: "none",
                  backgroundColor: "#0057E7",
                  color: "#FFFFFF",
                  fontWeight: 500,
                  fontSize: 12,
                  height: 28,
                  minWidth: 64,
                  px: 1.5,
                  borderRadius: "4px",
                  "&:hover": { backgroundColor: "#0049C2" },
                }}
              >
                Search
              </Button>
              <Button
                variant="outlined"
                onClick={handleResetFilters}
                sx={{
                  textTransform: "none",
                  color: "#0057E7",
                  borderColor: "#0057E7",
                  fontWeight: 500,
                  fontSize: 12,
                  height: 30,
                  minWidth: 60,
                  px: 1.5,
                  borderRadius: "4px",
                  backgroundColor: "#FFFFFF",
                  "&:hover": {
                    borderColor: "#0049C2",
                    backgroundColor: "#F5F9FF",
                  },
                }}
              >
                Reset
              </Button>
            </Box>
          </Box>
        </Box>
      ) : null}

      {/* ================= PRE-BILLING TAB ================= */}
      {currentTab === 0 && (
        <Box>
          {!hideTabsAndBanner && <ChargeCaptureBanner />}

          {/* Status chips + actions */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 2,
              py: 1.5,
            }}
          >
            <Box sx={{ display: "flex", gap: 1 }}>
              {PRE_CHIPS.map(([id, label, match]) => (
                <FilterChip
                  key={id}
                  label={`${label} ${
                    match
                      ? preBillingSearched.filter((c) => c.status === match)
                          .length
                      : preBillingSearched.length
                  }`}
                  active={statusFilter === id}
                  onClick={() => setStatusFilter(id)}
                />
              ))}
            </Box>

            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <Button
                variant="contained"
                startIcon={<Add sx={{ fontSize: 18 }} />}
                onClick={() => navigate("/new-claim")}
                sx={{
                  textTransform: "none",
                  backgroundColor: "#0066FF",
                  color: "#FFFFFF",
                  fontWeight: 600,
                  fontSize: 12,
                  height: 30,
                  px: 1.75,
                  borderRadius: "8px",
                  whiteSpace: "nowrap",
                  boxShadow: "none",
                  "& .MuiButton-startIcon": { mr: 0.5 },
                  "&:hover": { backgroundColor: "#0052CC", boxShadow: "none" },
                }}
              >
                New Claim
              </Button>
              <ToolbarIcons onSettings={handleOpenColumnSettings} />
              <Button
                variant="outlined"
                endIcon={<KeyboardArrowDown sx={{ fontSize: 20 }} />}
                sx={selectActionBtnSx}
                onClick={(e) => setAnchorEl(e.currentTarget)}
              >
                Select Action
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl) && currentTab === 0}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem onClick={() => setAnchorEl(null)}>
                  Submit Claims
                </MenuItem>
                <MenuItem onClick={() => setAnchorEl(null)}>
                  Export Selected
                </MenuItem>
                <MenuItem onClick={() => setAnchorEl(null)}>
                  Mark as Processed
                </MenuItem>
              </Menu>
            </Box>
          </Box>

          {viewMode === "list" ? (
            <Box sx={{ pb: 2, px: 2 }}>
              <ListTable
                columns={filterColumns(PRE_COLUMNS, visibleColumnsPreBilling)}
                rows={preBillingFiltered}
                selection={claimSelection}
                ctx={{
                  onEdit: handleEditPreBilling,
                  onCheck: handleOpenCheckPopup,
                }}
                minWidth={1400}
                stickyHeader
                containerSx={listContainerSx}
                headSx={listHeadSx}
                cellSx={listCellSx}
                rowSx={(row, index) => ({
                  backgroundColor: getListColor(index),
                  borderBottom: "none",
                })}
              />
            </Box>
          ) : (
            <Box
              sx={{
                width: "100%",
                pb: 2,
                px: 2,
                maxHeight: "calc(100vh - 280px)",
                overflowY: "auto",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                {preBillingFiltered.length === 0 && (
                  <Box sx={{ py: 6, textAlign: "center", color: "#6B7280" }}>
                    No records found
                  </Box>
                )}

                {preBillingFiltered.map((row, index) => {
                  const st =
                    PRE_STATUS_STYLES[row.status] || PRE_STATUS_STYLES.Unbilled;
                  return (
                    <Box
                      key={row.id}
                      sx={{
                        backgroundColor: getGridColor(index),
                        border: "1px solid #e0e0e0",
                        borderRadius: 1,
                        px: 1.5,
                        py: 0.8,
                         mb: "14px",
                        boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                      }}
                    >
                      <Box
                        // sx={{
                        //   display: "flex",
                        //   gap: 2,
                        //   alignItems: "flex-start",
                        //   width: "100%",
                        //   flexWrap: { xs: "wrap", xl: "nowrap" },
                        // }}
                        sx={{
    display: "flex",
    columnGap: "28px",
    rowGap: 2,
    alignItems: "flex-start",
    width: "100%",
    flexWrap: { xs: "wrap", xl: "nowrap" },
  }}
                      >
                        {/* Checkbox */}
                        <Box sx={{ flex: "0 0 auto", pt: 0.3 }}>
                          <Checkbox
                            size="small"
                            checked={selectedRows.includes(row.id)}
                            onChange={() => {
                              setSelectedRows((prev) =>
                                prev.includes(row.id)
                                  ? prev.filter((id) => id !== row.id)
                                  : [...prev, row.id]
                              );
                            }}
                            sx={{
                              p: 0,
                              color: "#9CA3AF",
                              "& .MuiSvgIcon-root": { fontSize: 18 },
                              "&.Mui-checked": { color: "#0066FF" },
                            }}
                          />
                        </Box>

                        {/* Encounter Details */}
                        <Box sx={{ flex: "0 0 auto", width: "140px" }}>
                          <Typography
                            sx={{
                              fontSize: 9,
                              fontWeight: 600,
                              color: "rgba(0, 0, 0, 0.87)",
                              textTransform: "uppercase",
                              letterSpacing: "0.3px",
                              mb: 2,
                              mt: 1,
                              lineHeight: 1,
                            }}
                          >
                            Encounter Details
                          </Typography>
                          <GridLine label="Encounter ID:">{row.encounterId}</GridLine>
                          <GridLine label="Claim ID:">{row.claimId}</GridLine>
                          <GridLine label="DOS:">{row.dos}</GridLine>
                          <GridLine label="POS:">{row.pos}</GridLine>
                          <GridLine label="Rendering Prov.:" last>JohnJohn</GridLine>
                        </Box>

                        {/* Patient Details */}
                        <Box sx={{ flex: "0 0 auto", width: "145px" }}>
                          <Typography
                            sx={{
                              fontSize: 9,
                              fontWeight: 600,
                              color: "rgba(0, 0, 0, 0.87)",
                              textTransform: "uppercase",
                              letterSpacing: "0.3px",
                               mb: 2,
                              mt: 1,
                              lineHeight: 1,
                            }}
                          >
                            Patient Details
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: 10.5,
                              fontWeight: 700,
                              color: "rgba(0, 0, 0, 0.87)",
                              mb: 0.3,
                              lineHeight: 1.4,
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {row.patientName} {row.gender}
                          </Typography>
                          <GridLine label="FIN:">{row.fin}</GridLine>
                          <GridLine label="MRN:">{row.mrn}</GridLine>
                          <GridLine label="DOB:">{row.dob}</GridLine>
                          <GridLine label="Referring Prov.:" last>JohnJohn</GridLine>
                        </Box>

                        {/* Admit & Authorization */}
                        <Box sx={{ flex: "0 0 auto", width: "135px" }}>
                          <Typography
                            sx={{
                              fontSize: 9,
                              fontWeight: 600,
                              color: "rgba(0, 0, 0, 0.87)",
                              textTransform: "uppercase",
                              letterSpacing: "0.3px",
                               mb: 2,
                              mt: 1,
                              lineHeight: 1,
                            }}
                          >
                            Admit & Authorization
                          </Typography>
                          <GridLine label="DOA:">{row.doa}</GridLine>
                          <GridLine label="Referral#:">{row.referral}</GridLine>
                          <GridLine label="Authir:">{row.author}</GridLine>
                          <GridLine label="Subscriber ID:" last>{row.subscriber}</GridLine>
                        </Box>

                        {/* Audit & Authorization */}
                        <Box sx={{ flex: "0 0 auto", width: "160px" }}>
                          <Typography
                            sx={{
                              fontSize: 9,
                              fontWeight: 600,
                              color: "rgba(0, 0, 0, 0.87)",
                              textTransform: "uppercase",
                              letterSpacing: "0.3px",
                               mb: 2,
                              mt: 1,
                              lineHeight: 1,
                            }}
                          >
                            Audit & Authorization
                          </Typography>
                          <GridLine label="CPT:">{row.cpt2}</GridLine>
                          <GridLine label="Modifier:">{row.modifier2}</GridLine>
                          <GridLine label="ICD:">{row.icd2}</GridLine>
                          <GridLine label="Place of Service:" last>{row.placeOfService}</GridLine>
                        </Box>

                        {/* Insurance & Payment */}
                        <Box sx={{ flex: "0 0 auto", width: "165px" }}>
                          <Typography
                            sx={{
                              fontSize: 9,
                              fontWeight: 600,
                              color: "rgba(0, 0, 0, 0.87)",
                              textTransform: "uppercase",
                              letterSpacing: "0.3px",
                             mb: 2,
                              mt: 1,
                              lineHeight: 1,
                            }}
                          >
                            Insurance & Payment Details
                          </Typography>
                          <GridLine label="Insurance:">{row.primaryInsurance}</GridLine>
                          <GridLine label="Plan:">{row.plan}</GridLine>
                          <GridLine label="Billed amount:">{row.billedAmount}</GridLine>
                          <GridLine label="Patient paymemt:" last>{row.patientPayment}</GridLine>
                        </Box>

                        {/* Status & Remarks */}
                        <Box sx={{ flex: "0 0 auto", width: "150px" }}>
                          <Typography
                            sx={{
                              fontSize: 9,
                              fontWeight: 600,
                              color: "rgba(0, 0, 0, 0.87)",
                              textTransform: "uppercase",
                              letterSpacing: "0.3px",
                              mb: 2,
                              mt: 1,
                              lineHeight: 1,
                            }}
                          >
                            Status & Remarks
                          </Typography>
                          <StatusPill
                            label={row.status}
                            bg={st.bg}
                            fg={st.fg}
                            height={19}
                            mb={0.4}
                          />
                          <Typography
                            sx={{
                              fontSize: 10,
                              fontWeight: 600,
                              color: "rgba(0, 0, 0, 0.87)",
                              mb: 0.3,
                              lineHeight: 1.4,
                              whiteSpace: "nowrap",
                            }}
                          >
                            Remarks
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: 10,
                              color: "rgba(0, 0, 0, 0.7)",
                              lineHeight: 1.4,
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {row.remarks}
                          </Typography>
                        </Box>

                        {/* Edit Icon */}
                        <Box
                          sx={{
                            flex: "0 0 auto",
                            display: "flex",
                            alignItems: "flex-start",
                            pt: 0.5,
                          }}
                        >
                          <IconButton
                            size="small"
                            sx={{ color: "#0066ff", p: 0.5 }}
                            onClick={() => handleEditPreBilling(row)}
                          >
                            <EditIconClaim />
                          </IconButton>
                        </Box>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          )}
        </Box>
      )}

      {/* ================= POST-BILLING TAB ================= */}
      {currentTab === 1 && (
        <Box
          sx={{
            height: "calc(100vh - 160px)",
            overflowY: "auto",
            ...thinScroll,
          }}
        >
          {!hideTabsAndBanner && <ChargeCaptureBanner />}

          {/* Action buttons row */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: 2,
              py: 1.5,
              gap: 2,
              backgroundColor: "#f5f7fa",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 1,
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              <ToolbarIcons onSettings={handleOpenColumnSettings} />
              <Button
                variant="outlined"
                endIcon={<KeyboardArrowDown sx={{ fontSize: 20 }} />}
                sx={selectActionBtnSx}
                onClick={(e) => setAnchorEl(e.currentTarget)}
              >
                Select Action
              </Button>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl) && currentTab === 1}
                onClose={() => setAnchorEl(null)}
                PaperProps={{
                  sx: {
                    width: "320px !important",
                    minWidth: "320px !important",
                    maxWidth: "320px !important",
                    borderRadius: "6px",
                    border: "1px solid #d9dfe7",
                    boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
                    overflow: "hidden",
                    backgroundColor: "#fff",
                  },
                }}
                MenuListProps={{ disablePadding: true }}
              >
                <Box
                  sx={{
                    height: 34,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    px: 1.2,
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  <Typography
                    sx={{ fontSize: 12, fontWeight: 600, color: "#374151" }}
                  >
                    Select Actions
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() => setAnchorEl(null)}
                    sx={{
                      p: 0.2,
                      color: "#006FFD",
                      "&:hover": { backgroundColor: "transparent" },
                    }}
                  >
                    <Close sx={{ fontSize: 17 }} />
                  </IconButton>
                </Box>

                <Box
                  sx={{
                    p: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 0.8,
                  }}
                >
                  {ACTION_MENU_ITEMS.map(([label, shortcut, minH = 28]) => (
                    <Box
                      key={shortcut}
                      onClick={() => setAnchorEl(null)}
                      sx={{
                        minHeight: minH,
                        px: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        border: "1px solid #e5e7eb",
                        borderRadius: "5px",
                        backgroundColor: "#f8f9fa",
                        cursor: "pointer",
                        color: "#006FFD",
                        fontSize: 9,
                        lineHeight: 1.15,
                        fontWeight: 600,
                        "&:hover": {
                          backgroundColor: "#eaf3ff",
                          borderColor: "#dbeafe",
                        },
                      }}
                    >
                      <Box sx={{ flex: 1 }}>{label}</Box>
                      <span
                        style={{
                          color: "#9CA3AF",
                          fontSize: 9,
                          fontWeight: 500,
                          whiteSpace: "nowrap",
                          marginLeft: 8,
                        }}
                      >
                        {shortcut}
                      </span>
                    </Box>
                  ))}
                </Box>
              </Menu>

              <Button
                variant="outlined"
                sx={{ ...selectActionBtnSx, whiteSpace: "nowrap" }}
              >
                Submit E-Claim
              </Button>
              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                  backgroundColor: "#0066ff",
                  color: "white",
                  fontWeight: 600,
                  fontSize: 13,
                  height: 30,
                  px: 2.5,
                  whiteSpace: "nowrap",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                  borderRadius: "8px",
                  "&:hover": {
                    backgroundColor: "#0052cc",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                  },
                }}
              >
                Send Statement
              </Button>
            </Box>
          </Box>

          {/* Post-billing table */}
          <Box sx={{ pb: 2, px: 2 }}>
            <ListTable
              columns={filterColumns(POST_COLUMNS, visibleColumnsPostBilling)}
              rows={postBillingFiltered}
              selection={claimSelection}
              ctx={{ onEdit: handleEditClick, onCheck: handleOpenCheckPopup }}
              onRowClick={handlePostBillingRowClick}
              minWidth={1750}
              stickyHeader
              containerSx={listContainerSx}
              headSx={listHeadSx}
              cellSx={listCellSx}
              rowSx={(row, index) => ({
                backgroundColor: getListColor(index),
                borderBottom: "none",
              })}
            />
          </Box>

          {/* Additional Details */}
          <Box sx={{ px: 2, pb: 2 }}>
            <Box
              sx={{
                backgroundColor: "#FFFFFF",
                borderRadius: "12px",
                border: "1px solid #E5E7EB",
                p: 3,
              }}
            >
              <Typography
                sx={{ fontSize: 15, fontWeight: 600, color: "#1E293B", mb: 2 }}
              >
                Additional Details
              </Typography>

              <Box
                sx={{ backgroundColor: "#F5F6FA", borderRadius: "10px", p: 2 }}
              >
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: 2,
                    mb: 2,
                  }}
                >
                  <AdjSelect
                    label="Type"
                    value={adj.type}
                    onChange={setAdjField("type")}
                    options={[
                      ["adjustment1", "Adjustment Type 1"],
                      ["adjustment2", "Adjustment Type 2"],
                    ]}
                  />
                  <AdjText
                    label="Posting Date"
                    type="date"
                    value={adj.postingDate}
                    onChange={setAdjField("postingDate")}
                  />
                  <AdjText
                    label="Adjustment"
                    placeholder="Type here"
                    value={adj.adjustment}
                    onChange={setAdjField("adjustment")}
                  />
                  <AdjText
                    label="Adjustment Code"
                    placeholder="Type here"
                    value={adj.code}
                    onChange={setAdjField("code")}
                  />
                </Box>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: 2,
                    mb: 2,
                  }}
                >
                  <AdjSelect
                    label="Reason Code"
                    value={adj.reasonCode}
                    onChange={setAdjField("reasonCode")}
                    options={[
                      ["reason1", "Reason Code 1"],
                      ["reason2", "Reason Code 2"],
                    ]}
                  />
                  <AdjText
                    label="Related payment"
                    placeholder="Search"
                    value={adj.relatedPayment}
                    onChange={setAdjField("relatedPayment")}
                    endIcon={<Search sx={{ fontSize: 16, color: "#111827" }} />}
                  />
                  <AdjSelect
                    label="Status"
                    value={adj.changeStatus}
                    onChange={setAdjField("changeStatus")}
                    options={[
                      ["submitted", "Submitted"],
                      ["ready", "Ready for statement"],
                      ["settled", "Settled"],
                    ]}
                  />
                  <AdjText
                    label="Notes"
                    placeholder="Type here"
                    value={adj.notes}
                    onChange={setAdjField("notes")}
                  />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 1,
                    mt: 1,
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      textTransform: "none",
                      backgroundColor: "#0066FF",
                      color: "#FFFFFF",
                      fontWeight: 600,
                      fontSize: 12,
                      px: 2.5,
                      py: 0.65,
                      minWidth: 70,
                      borderRadius: "8px",
                      boxShadow: "none",
                      "&:hover": {
                        backgroundColor: "#0052CC",
                        boxShadow: "none",
                      },
                    }}
                  >
                    Apply
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => setAdj(EMPTY_ADJ)}
                    sx={{
                      textTransform: "none",
                      color: "#0066FF",
                      borderColor: "#0066FF",
                      fontWeight: 600,
                      fontSize: 12,
                      px: 2.5,
                      py: 0.65,
                      minWidth: 70,
                      borderRadius: "8px",
                      backgroundColor: "#FFFFFF",
                      "&:hover": {
                        borderColor: "#0052CC",
                        backgroundColor: "#F5F9FF",
                      },
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      )}

      {/* ================= REMITTANCE ERA/EOB TAB ================= */}
      {currentTab === 2 && (
        <Box>
          {!hideTabsAndBanner && <ChargeCaptureBanner />}

          <Box
            sx={{
              display: "flex",
              gap: 1,
              px: 2,
              py: 1.5,
              alignItems: "center",
            }}
          >
            {REMIT_CHIPS.map(([id, label, match]) => (
              <FilterChip
                key={id}
                label={`${label} ${
                  match
                    ? remittanceSearched.filter((r) => r.status === match)
                        .length
                    : remittanceSearched.length
                }`}
                active={remittanceFilter === id}
                onClick={() => setRemittanceFilter(id)}
              />
            ))}

            <Box sx={{ flex: 1 }} />

            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <ToolbarIcons onSettings={handleOpenColumnSettings} />
              <Button
                variant="outlined"
                endIcon={<KeyboardArrowDown sx={{ fontSize: 20 }} />}
                sx={selectActionBtnSx}
              >
                Select Action
              </Button>
              <Button
                variant="contained"
                onClick={() => navigate("/new-payment")}
                sx={{
                  textTransform: "none",
                  backgroundColor: "#0066ff",
                  color: "white",
                  fontWeight: 500,
                  fontSize: 13,
                  height: 30,
                  px: 2,
                  boxShadow: "none",
                  "&:hover": { backgroundColor: "#0052cc", boxShadow: "none" },
                }}
              >
                New Payment
              </Button>
            </Box>
          </Box>

          <Box sx={{ pb: 2, px: 2 }}>
            <ListTable
              columns={filterColumns(REMIT_COLUMNS, visibleColumnsRemittance)}
              rows={remittanceFiltered}
              selection={{
                selected: remittanceSelected,
                onToggle: toggleIn(setRemittanceSelected),
                onToggleAll: (checked) =>
                  setRemittanceSelected(
                    checked ? remittanceFiltered.map((r) => r.id) : [],
                  ),
              }}
              ctx={{ onShowEob: handleShowEobDetails }}
              minWidth={1600}
              stickyHeader
              containerSx={listContainerSx}
              headSx={{ ...listHeadSx, whiteSpace: "nowrap" }}
              cellSx={listCellSx}
              rowSx={(row, index) => ({
                backgroundColor: getListColor(index),
                borderBottom: "none",
              })}
            />
          </Box>
        </Box>
      )}

      {/* ================= PATIENT STATEMENT TAB ================= */}
      {currentTab === 3 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            boxSizing: "border-box",
          }}
        >
          {!hideTabsAndBanner && <ChargeCaptureBanner />}

          {/* Toolbar */}
          <Box
            sx={{
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 2,
              py: 1.5,
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Button
                onClick={() => setStatementSubTab("new")}
                sx={pillBtnSx(statementSubTab === "new")}
              >
                New
                <Box component="span" sx={{ fontWeight: 400, opacity: 0.85 }}>
                  {newStatementFiltered.length}
                </Box>
              </Button>

              <Button
                onClick={() => setStatementSubTab("history")}
                sx={pillBtnSx(statementSubTab === "history")}
              >
                History
                <Box
                  component="span"
                  sx={{
                    fontWeight: 400,
                    color: statementSubTab === "history" ? "#fff" : "#9CA3AF",
                  }}
                >
                  {historyFiltered.length}
                </Box>
              </Button>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                flexWrap: "wrap",
              }}
            >
              <ToolbarIcons onSettings={handleOpenColumnSettings} />
              <Button variant="outlined" sx={filterChipSx}>
                Balance greater than $
              </Button>
              <Button variant="outlined" sx={filterChipSx}>
                No statement for last days
              </Button>
              <Button variant="outlined" sx={filterChipSx}>
                Fewer [#] statements since last payment
              </Button>
            </Box>
          </Box>

          {/* Tables */}
          <Box sx={{ pb: 2, px: 2 }}>
            {statementSubTab === "new" ? (
              <ListTable
                columns={filterColumns(NEW_STMT_COLUMNS, visibleColumnsPatientStatement)}
                rows={newStatementFiltered}
                selection={{
                  selected: statementSelectedRows,
                  onToggle: toggleIn(setStatementSelectedRows),
                  onToggleAll: (checked) =>
                    setStatementSelectedRows(
                      checked ? newStatementFiltered.map((r) => r.id) : [],
                    ),
                }}
                ctx={{ selectedIds: statementSelectedRows }}
                minWidth={1250}
                stickyHeader
                containerSx={listContainerSx}
                headSx={{
                  ...listHeadSx,
                  whiteSpace: "nowrap",
                }}
                cellSx={listCellSx}
                rowSx={(row, index) => ({
                  backgroundColor: getListColor(index),
                  borderBottom: "none",
                })}
                cbSx={checkboxSx}
                checkHeadSx={{ pl: 1.5 }}
                checkCellSx={{ pl: 1.5 }}
                highlightSelected={false}
              />
            ) : (
              <ListTable
                columns={filterColumns(HISTORY_COLUMNS, visibleColumnsHistory)}
                rows={historyFiltered}
                selection={{
                  selected: historySelectedRows,
                  onToggle: toggleIn(setHistorySelectedRows),
                  onToggleAll: (checked) =>
                    setHistorySelectedRows(
                      checked ? historyFiltered.map((r) => r.id) : [],
                    ),
                }}
                minWidth={1150}
                stickyHeader
                containerSx={listContainerSx}
                headSx={{
                  ...listHeadSx,
                  whiteSpace: "nowrap",
                }}
                cellSx={listCellSx}
                rowSx={(row, index) => ({
                  backgroundColor: getListColor(index),
                  borderBottom: "none",
                })}
                cbSx={checkboxSx}
                checkHeadSx={{ pl: 1.5 }}
                checkCellSx={{ pl: 1.5 }}
                highlightSelected={false}
              />
            )}
          </Box>

          {/* Gap between table and footer */}
          <Box sx={{ height: 42, flexShrink: 0 }} />

          {/* Footer */}
          <Box
            sx={{
              mx: 2,
              mb: 1.5,
              px: 2,
              py: 1.25,
              minHeight: 64,
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "#FFFFFF",
              border: "1px solid #E5E7EB",
              borderRadius: "14px",
              boxSizing: "border-box",
              width: "calc(100% - 32px)",
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                minWidth: 0,
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: 11,
                    color: "#6B7280",
                    fontWeight: 500,
                    whiteSpace: "nowrap",
                  }}
                >
                  Patients selected
                </Typography>
                <Typography
                  sx={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: "#1F2937",
                    lineHeight: 1.2,
                  }}
                >
                  {statementSubTab === "new"
                    ? statementNewSelectedCount
                    : historySelectedRows.length}
                </Typography>
              </Box>

              <Box
                sx={{ width: "1px", height: 38, backgroundColor: "#E5E7EB" }}
              />

              <Box>
                <Typography
                  sx={{
                    fontSize: 11,
                    color: "#6B7280",
                    fontWeight: 500,
                    whiteSpace: "nowrap",
                  }}
                >
                  Selected balance
                </Typography>
                <Typography
                  sx={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: "#1E40AF",
                    lineHeight: 1.2,
                    whiteSpace: "nowrap",
                  }}
                >
                  {statementSubTab === "new"
                    ? `$${statementNewSelectedBalance.toLocaleString(
                        undefined,
                        {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        },
                      )}`
                    : "$0.00"}
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                flexShrink: 0,
              }}
            >
              <Button
                variant="outlined"
                endIcon={<KeyboardArrowDown sx={{ fontSize: 18 }} />}
                onClick={(e) => setAnchorEl(e.currentTarget)}
                sx={{
                  ...footerBtnSx,
                  height: 36,
                  minWidth: 0,
                  px: 1.75,
                  whiteSpace: "nowrap",
                }}
              >
                Select action
              </Button>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl) && currentTab === 3}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem onClick={() => setAnchorEl(null)}>
                  Send statement
                </MenuItem>
                <MenuItem onClick={() => setAnchorEl(null)}>
                  Export selected
                </MenuItem>
                <MenuItem onClick={() => setAnchorEl(null)}>
                  Mark as reviewed
                </MenuItem>
              </Menu>

              <Button
                variant="outlined"
                sx={{ ...footerBtnSx, height: 36, minWidth: 70, px: 1.75 }}
              >
                Cancel
              </Button>

              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                  backgroundColor: BLUE,
                  color: "#FFFFFF",
                  fontWeight: 600,
                  fontSize: 12,
                  height: 36,
                  minWidth: 70,
                  px: 2,
                  borderRadius: "6px",
                  boxShadow: "none",
                  "&:hover": { backgroundColor: "#0952CC", boxShadow: "none" },
                }}
              >
                Save
              </Button>
            </Box>
          </Box>
        </Box>
      )}

      {/* ================= CUSTOMISE COLUMNS DIALOG ================= */}
      <Dialog
        open={showColumnSettings}
        onClose={handleCancelColumnSettings}
        PaperProps={{
          sx: {
            width: "100%",
            maxWidth: 500,
            minHeight: 500,
            maxHeight: 650,
            borderRadius: "22px",
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
            m: 20,
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        <Box sx={{ px: 2.5, pt: 2.2, pb: 1.2 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              mb: 0.5,
            }}
          >
            <Typography
              sx={{
                fontSize: 16,
                fontWeight: 700,
                color: "#1F2937",
                lineHeight: 1.25,
              }}
            >
              Customise columns
            </Typography>
            <IconButton
              size="small"
              onClick={handleCancelColumnSettings}
              sx={{
                p: 0.3,
                color: "#111827",
                mt: -0.3,
                mr: -0.3,
                "&:hover": { backgroundColor: "#F3F4F6" },
              }}
            >
              <Close sx={{ fontSize: 18 }} />
            </IconButton>
          </Box>

          <Typography
            sx={{ fontSize: 11.5, color: "#171923", mb: 1.5, lineHeight: 1.4 }}
          >
            Choose which columns to show and drag to reorder them.
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              {[
                ["Select all", true],
                ["Clear All", false],
              ].map(([label, value]) => {
                const currentColumnOptions = getColumnOptions(currentTab, statementSubTab);
                return (
                  <Typography
                    key={label}
                    onClick={() => setTempVisibleColumns(setAllColumns(currentColumnOptions, value))}
                    sx={{
                      fontSize: 11.5,
                      fontWeight: 600,
                      color: "#0066FF",
                      cursor: "pointer",
                    }}
                  >
                    {label}
                  </Typography>
                );
              })}
            </Box>

            <Typography sx={{ fontSize: 11, color: "#171923" }}>
              {Object.values(tempVisibleColumns).filter(Boolean).length} of {getColumnOptions(currentTab, statementSubTab).length} shown
            </Typography>
          </Box>
        </Box>

        <Box sx={{ 
          px: 2.5, 
          flex: 1, 
          overflow: "auto",
          maxHeight: 400,
          minHeight: 300,
        }}>
          {getColumnOptions(currentTab, statementSubTab).map((col) => (
            <Box
              key={col.key}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                height: 28,
                minHeight: 28,
                px: 1,
                py: 0,
                mb: 0.45,
                backgroundColor: "#F5F5F5",
                borderRadius: "8px",
                "&:hover": { backgroundColor: "#F1F2F4" },
              }}
            >
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "2px",
                  cursor: "grab",
                  mr: 0.4,
                  flexShrink: 0,
                  width: 10,
                }}
              >
                {[...Array(6)].map((_, i) => (
                  <Box
                    key={i}
                    sx={{
                      width: 3,
                      height: 3,
                      borderRadius: "50%",
                      backgroundColor: "#0066FF",
                    }}
                  />
                ))}
              </Box>

              <Checkbox
                size="small"
                checked={tempVisibleColumns[col.key]}
                onChange={(e) =>
                  setTempVisibleColumns((prev) => ({
                    ...prev,
                    [col.key]: e.target.checked,
                  }))
                }
                sx={{
                  p: 0,
                  color: "#C8CDD8",
                  flexShrink: 0,
                  "&.Mui-checked": { color: "#0066FF" },
                  "& svg": { fontSize: 16 },
                }}
              />

              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: "#374151",
                  lineHeight: 1,
                  whiteSpace: "nowrap",
                }}
              >
                {col.label}
              </Typography>
            </Box>
          ))}
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2.5,
            py: 1.2,
            flexShrink: 0,
          }}
        >
          {/* Reset to default */}
          <Button
            variant="outlined"
            onClick={() => {
              const currentColumnOptions = getColumnOptions(currentTab, statementSubTab);
              setTempVisibleColumns(setAllColumns(currentColumnOptions, true));
            }}
            sx={{
              textTransform: "none",
              fontSize: "10px",
              fontWeight: 500,
              color: "#2B2842",
              backgroundColor: "#FFFFFF",
              border: "1px solid #E5E7EB",
              borderRadius: "7px",
              minWidth: "96px",
              height: "30px",
              px: 1.2,
              py: 0,
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#F9FAFB",
                borderColor: "#D1D5DB",
                boxShadow: "none",
              },
            }}
          >
            Reset to default
          </Button>

          {/* Right buttons */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
            <Button
              variant="outlined"
              onClick={handleCancelColumnSettings}
              sx={{
                textTransform: "none",
                fontSize: "10px",
                fontWeight: 500,
                color: "#2B2842",
                backgroundColor: "#FFFFFF",
                border: "1px solid #E5E7EB",
                borderRadius: "7px",
                minWidth: "46px",
                height: "30px",
                px: 1.2,
                py: 0,
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "#F9FAFB",
                  borderColor: "#D1D5DB",
                  boxShadow: "none",
                },
              }}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              disableElevation
              onClick={handleSaveColumnSettings}
              sx={{
                textTransform: "none",
                fontSize: "10px",
                fontWeight: 500,
                backgroundColor: "#0066FF",
                color: "#FFFFFF",
                borderRadius: "7px",
                minWidth: "60px",
                height: "30px",
                px: 1.3,
                py: 0,
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "#0052CC",
                  boxShadow: "none",
                },
              }}
            >
              Save View
            </Button>
          </Box>
        </Box>
      </Dialog>

      {/* ================= ADD REMARK POPUP ================= */}
      <Dialog
        open={checkPopupOpen}
        onClose={handleCloseCheckPopup}
        PaperProps={{
          sx: {
            width: "100%",
            maxWidth: 405,
            m: 2,
            borderRadius: "28px",
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
          },
        }}
      >
        {/* Title */}
        <Box
          sx={{
            px: 2.5,
            pt: 2.5,
            pb: 1.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ fontSize: 14, fontWeight: 700, color: "#1F2937" }}>
            Add Remark
          </Typography>
          <IconButton
            size="small"
            onClick={handleCloseCheckPopup}
            sx={{
              p: 0.2,
              color: "#111827",
              "&:hover": { backgroundColor: "#F3F4F6" },
            }}
          >
            <Close sx={{ fontSize: 20 }} />
          </IconButton>
        </Box>

        {/* Claim info */}
        {checkPopupRow && (
          <Box sx={{ px: 2.5, pb: 1.5, display: "flex", gap: 6 }}>
            {[
              ["Patient Name", checkPopupRow.patientName],
              ["Claim Item ID", checkPopupRow.claimId],
              [
                "CPT Code",
                String(checkPopupRow.cpt || "").split(/[;\s]+/)[0] || "—",
              ],
            ].map(([label, value]) => (
              <Box key={label}>
                <Typography
                  sx={{
                    fontSize: 10,
                    color: "#4B5563",
                    fontWeight: 500,
                    lineHeight: 1.4,
                  }}
                >
                  {label}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 10,
                    color: "#111827",
                    fontWeight: 700,
                    lineHeight: 1.4,
                  }}
                >
                  {value}
                </Typography>
              </Box>
            ))}
          </Box>
        )}

        {/* Remarks / chat area */}
        <Box sx={{ px: 2.5, pb: 1.5 }}>
          <Box
            sx={{
              backgroundColor: "#F1F4FA",
              border: "1px solid #E5E7EB",
              borderRadius: "10px",
              height: 250,
              p: 1.5,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 1.2,
              ...thinScroll,
            }}
          >
            {currentRemarks.length === 0 && (
              <Typography
                sx={{
                  m: "auto",
                  fontSize: 11,
                  color: "#9CA3AF",
                  textAlign: "center",
                }}
              >
                No remarks yet
              </Typography>
            )}

            {currentRemarks.map((r) => (
              <Box
                key={r.id}
                sx={{
                  alignSelf: "flex-end",
                  maxWidth: "88%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                <Box
                  sx={{
                    backgroundColor: "#D6E0F5",
                    color: "#1F2937",
                    fontSize: 11,
                    lineHeight: 1.4,
                    px: 1,
                    py: 0.5,
                    borderRadius: "3px",
                    wordBreak: "break-word",
                  }}
                >
                  {r.text}
                </Box>
                <Typography sx={{ fontSize: 9, color: "#4B5563", mt: 0.4 }}>
                  {r.author} • {r.time}
                </Typography>
              </Box>
            ))}
            <div ref={remarkEndRef} />
          </Box>
        </Box>

        {/* Input bar (inset pill with divider above) */}
        <Box sx={{ px: 1.5, pt: 1.2, pb: 1.5, borderTop: "1px solid #EEF0F4" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              height: 32,
              pl: 1.4,
              pr: 0.8,
              backgroundColor: "#EAF1FD",
              borderRadius: "10px",
            }}
          >
            <InputBase
              fullWidth
              placeholder="Type your remark here..."
              value={remarkText}
              onChange={(e) => setRemarkText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendRemark();
                }
              }}
              sx={{
                fontSize: 11,
                fontWeight: 600,
                color: "#111827",
                "& input": { p: 0 },
                "& input::placeholder": {
                  color: "#111827",
                  opacity: 0.85,
                  fontWeight: 600,
                },
              }}
            />

            <IconButton
              size="small"
              sx={{
                width: 18,
                height: 18,
                p: 0,
                border: "1px solid #0066FF",
                color: "#0066FF",
                flexShrink: 0,
              }}
            >
              <MicNone sx={{ fontSize: 12 }} />
            </IconButton>

            <Button
              variant="contained"
              disableElevation
              onClick={handleSendRemark}
              startIcon={<Send sx={{ fontSize: 9, height: 13 }} />}
              sx={{
                textTransform: "none",
                backgroundColor: "#0066FF",
                color: "#FFFFFF",
                fontSize: 8,
                fontWeight: 700,
                height: 20,
                minWidth: 52,
                px: 1,
                borderRadius: "5px",
                flexShrink: 0,
                "& .MuiButton-startIcon": { mr: 0.4, ml: 0 },
                "&:hover": { backgroundColor: "#0052CC" },
              }}
            >
              Send
            </Button>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
}

export default PreBillingClaim;
