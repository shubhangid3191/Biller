import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Menu,
  MenuItem,
  Select,
  FormControl,
  Checkbox,
  Chip,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { KeyboardArrowDown, UnfoldMore } from "@mui/icons-material";

/* ─────────────────────────────────────────────
   Constants
───────────────────────────────────────────── */
const MODIFIER_OPTIONS = ["None", "26", "LT", "RT", "25", "59", "TC"];

const LOG_ENTRIES = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  date: "11/20/2025",
  time: "14:19",
  user: "Alex Tobar",
  remarks: "Marked as payment received",
}));

const LOG_COLUMNS = [
  { key: "date", label: "Date", sortable: true, width: "20%" },
  { key: "time", label: "Time", sortable: false, width: "18%" },
  { key: "user", label: "Updated By", sortable: false, width: "22%" },
  { key: "remarks", label: "Remarks", sortable: false, width: "40%" },
];

const logSortValue = (row, key) => {
  if (key === "date") {
    const [m, d, y] = row.date.split("/").map(Number);
    return new Date(y, m - 1, d).getTime();
  }
  return String(row[key]).toLowerCase();
};

const DX_COLORS = [
  { bg: "#E2F6EE", color: "#1A7A54" },
  { bg: "#FDE8F0", color: "#B83070" },
  { bg: "#E8ECFB", color: "#3B4CB8" },
  { bg: "#FDF1DC", color: "#9A5B0B" },
];

/* ─────────────────────────────────────────────
   Shared sx helpers
───────────────────────────────────────────── */
const thinScrollSx = {
  "&::-webkit-scrollbar": { width: "4px" },
  "&::-webkit-scrollbar-track": { backgroundColor: "transparent" },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#D1D5DB",
    borderRadius: "4px",
  },
};

const outlineBtnSx = {
  textTransform: "none",
  color: "#374151",
  borderColor: "#E1E5EA",
  backgroundColor: "#FFFFFF",
  fontWeight: 600,
  fontSize: 12,
  height: 28,
  minHeight: 28,
  px: 1.2,
  borderRadius: "5px",
  minWidth: "auto",
  whiteSpace: "nowrap",
  "&:hover": { borderColor: "#D1D5DB", backgroundColor: "#F9FAFB" },
};

const readOnlyFieldSx = {
  "& .MuiInputBase-root": {
    height: 32,
    fontSize: 12,
    backgroundColor: "#F3F4F6",
    borderRadius: "6px",
  },
  "& .MuiOutlinedInput-notchedOutline": { borderColor: "#E5E7EB" },
  "& .MuiInputBase-input": {
    padding: "5px 10px",
    color: "#6B7280",
    fontWeight: 600,
  },
};

/* ─────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────── */
function InlineField({ label, value, onChange }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 0 }}>
      <Typography sx={{ fontSize: 12, color: "#9CA3AF", whiteSpace: "nowrap" }}>
        {label}
      </Typography>
      <TextField
        size="small"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        sx={{
          flex: 1,
          minWidth: 0,
          "& .MuiInputBase-root": {
            height: 30,
            fontSize: 12,
            backgroundColor: "#F3F4F6",
            borderRadius: "6px",
          },
          "& .MuiOutlinedInput-notchedOutline": { borderColor: "#E5E7EB" },
          "& .MuiInputBase-input": { padding: "5px 9px", color: "#6B7280" },
        }}
      />
    </Box>
  );
}

function ClaimSelect({ label, value, options, onChange }) {
  const opts = options.includes(value) ? options : [value, ...options];
  return (
    <Box sx={{ minWidth: 0 }}>
      <Typography
        sx={{ fontSize: 12, color: "#8B95A5", mb: 0.5, lineHeight: 1.2 }}
      >
        {label}
      </Typography>
      <FormControl fullWidth size="small">
        <Select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          IconComponent={KeyboardArrowDown}
          sx={{
            height: 32,
            fontSize: 12,
            color: "#6B7280",
            backgroundColor: "#F3F4F6",
            borderRadius: "6px",
            "& .MuiSelect-select": { py: 0.5, px: 1.1 },
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "#E5E7EB" },
            "& .MuiSelect-icon": { fontSize: 17, color: "#9CA3AF" },
          }}
        >
          {opts.map((opt) => (
            <MenuItem key={opt} value={opt} sx={{ fontSize: 12 }}>
              {opt}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

/* ======================================================
   Main Page
========================================================= */
export default function PostBillingEditPage({
  claim: claimProp,
  onBack: onBackProp,
  onSave,
  onDelete,
}) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const claim = claimProp ?? state?.claim;
  const onBack =
    onBackProp ?? (() => navigate("/encounters", { state: { activeTab: 1 } }));
  const [actionAnchorEl, setActionAnchorEl] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [logSort, setLogSort] = useState({ key: null, dir: "asc" });

  const [showPatientDetails, setShowPatientDetails] = useState(false);
  const [showCptDetails, setShowCptDetails] = useState(false);

  const initialModifiers = (claim?.modifier || "")
    .split(",")
    .map((m) => m.trim())
    .filter(Boolean);

  const [mods, setMods] = useState([
    initialModifiers[0] || "None",
    initialModifiers[1] || "None",
    initialModifiers[2] || "None",
    initialModifiers[3] || "None",
  ]);
  const setMod = (i, v) =>
    setMods((prev) => prev.map((m, idx) => (idx === i ? v : m)));

  const [dxList, setDxList] = useState(
    (claim?.icd || "").split(" ").filter(Boolean).length
      ? (claim?.icd || "").split(" ").filter(Boolean)
      : ["A_F73", "B_C73"],
  );
  const [addingDx, setAddingDx] = useState(false);
  const [newDx, setNewDx] = useState("");

  const commitDx = () => {
    const v = newDx.trim().toUpperCase();
    if (v && !dxList.includes(v)) setDxList((prev) => [...prev, v]);
    setNewDx("");
    setAddingDx(false);
  };

  const [units, setUnits] = useState(claim?.units || "1.00 unit");
  const [billed, setBilled] = useState(claim?.billed || "$550");

  const [doNotSendElectronically, setDoNotSendElectronically] = useState(false);
  const [removedCount, setRemovedCount] = useState(0);

  /* ── Responsive breakpoints — must be before any early return ── */
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // < 600
  const isTablet = useMediaQuery(theme.breakpoints.down("md")); // < 900
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg")); // ≥ 1200

  if (!claim) return null;

  /* ---------- save / delete ---------- */
  const handleSave = () => {
    const modifier = mods.filter((m) => m && m !== "None").join(", ");
    const icd = dxList.join(" ");
    if (onSave)
      onSave({
        ...claim,
        modifier,
        icd,
        units,
        billed,
        doNotSendElectronically,
      });
    if (onBack) onBack();
  };
  const handleDelete = () => {
    if (onDelete) onDelete(claim);
    if (onBack) onBack();
  };

  /* ---------- derived values ---------- */
  const born = claim.dob || "15 Apr 1958";
  const patientNo = claim.mrn ? claim.mrn.slice(-4) : "2885";
  const location = claim.pos || "Garden City Hospital";
  const caseName =
    claim.billedTo || claim.primaryInsurance || "United Healthcare";
  const typeOfService = "3-Consultation";
  const provider = "Mohan YS, M.D";
  const clearingTrk = claim.clearingHouse || "2508265438810";
  const outstanding = billed || "$824.22";
  const cptDisplay = (claim.cpt || "99222; 99223; 99221")
    .split(/[\s;]+/)
    .filter(Boolean)
    .join("; ");

  const posName =
    claim.placeOfService && claim.placeOfService !== "NA"
      ? claim.placeOfService
      : "21 Inpatient Hospital";
  const ndc = claim.ndc || "Lorem Ipsum";
  const uc = claim.uc || "1";
  const um = claim.um || "ML";
  const lineNote = claim.lineNote || "Lorem ipsum";
  const PayorTrk = claim.PayorTrk || clearingTrk;
  const referralNo =
    claim.referral && claim.referral !== "NA"
      ? claim.referral
      : "2508265438810";
  const localUse = claim.localUseData || "2508265438810";

  /* ---------- transactions ---------- */
  const GREEN = "#0E9F6E";
  const BLUE = "#0066FF";

  const createdRow = {
    label: "Created",
    color: GREEN,
    bg: "#FFFBF3",
    desc: `Service line built from encounter ${claim.encounterId} using ICD-10 coding`,
    amount: billed,
    patResp: billed,
    balance: billed,
  };
  const billedRow = {
    label: "Billed",
    color: GREEN,
    bg: "#F1FFFD",
    desc: `Electronic claim submitted to primary insurance, ${claim.billedTo || "UHC Community Plan"}, with ICD-10 coding`,
    amount: "$0.00",
    patResp: "$0.00",
    balance: billed,
  };
  const processed = (desc) => ({
    label: "Claim processed",
    color: BLUE,
    bg: "#F4F5FF",
    desc,
    link: "Raw clearinghouse message",
    amount: "$0.00",
    patResp: "$0.00",
    balance: billed,
  });
  const ackDesc =
    "GatewayEDI confirmed the claim arrived intact and reported an acknowledged status.";

  const allTransactions = [
    createdRow,
    {
      label: "Transfer",
      color: BLUE,
      bg: "#F4F5FF",
      desc: `${billed} moved to primary insurance, ${claim.billedTo || "UHC Community Plan"}. Patient responsibility set to $0.00`,
      amount: "–",
      patResp: "$0.00",
      balance: billed,
    },
    billedRow,
    processed("Handed to GatewayEDI in batch 103709866"),
    processed(ackDesc),
    billedRow,
    processed(ackDesc),
    processed(
      "No syntax or eligibility errors were flagged before the file went out to the Payor.",
    ),
    createdRow,
    billedRow,
    processed(ackDesc),
  ];

  const transactions = allTransactions.slice(
    0,
    Math.max(allTransactions.length - removedCount, 0),
  );

  /* ─────────────────────────────────────────────
     Render helpers
  ───────────────────────────────────────────── */
  const balanceRow = (label, value, dotColor, options = {}) => {
    const { bold = false, muted = false } = options;
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          minHeight: 24,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.9 }}>
          <Box
            sx={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              backgroundColor: dotColor,
              flexShrink: 0,
            }}
          />
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: bold ? 700 : 500,
              color: "#4B5563",
              lineHeight: 1.2,
            }}
          >
            {label}
          </Typography>
        </Box>
        <Typography
          sx={{
            fontSize: 12,
            fontWeight: muted ? 500 : 700,
            color: muted ? "#9CA3AF" : "#1F2937",
            lineHeight: 1.2,
          }}
        >
          {value}
        </Typography>
      </Box>
    );
  };

  const infoField = (label, value, isLink, plain) => (
    <Box
      sx={{
        display: "flex",
        alignItems: "baseline",
        gap: 0.8,
        mb: 1,
        minWidth: 0,
      }}
    >
      {label && (
        <Typography
          sx={{
            fontSize: 12,
            color: "#6B7280",
            lineHeight: 1.2,
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </Typography>
      )}
      <Typography
        sx={{
          fontSize: 12,
          fontWeight: plain ? 500 : 700,
          color: "#374151",
          textDecoration: isLink ? "underline" : "none",
          lineHeight: 1.2,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {value}
      </Typography>
    </Box>
  );

  const cardSx = {
    backgroundColor: "#FFFFFF",
    border: "1px solid #E5E7EB",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 1px 3px rgba(15,23,42,0.03)",
  };

  const cardHeader = (title, expanded, onToggle, showEdit = false, onEdit) => (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 1.7,
        py: 1.2,
        borderBottom: "1px solid #EEF0F3",
      }}
    >
      <Typography
        sx={{
          fontSize: 12,
          fontWeight: 700,
          color: "#1F2937",
          lineHeight: 1.2,
        }}
      >
        {title}
      </Typography>
      {onToggle && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
          <Typography
            role="button"
            tabIndex={0}
            onClick={onToggle}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onToggle();
              }
            }}
            sx={{
              fontSize: 12,
              fontWeight: 700,
              color: "#0066FF",
              cursor: "pointer",
              userSelect: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            {expanded ? "Hide details −" : "View all details +"}
          </Typography>
          {showEdit && (
            <Typography
              role="button"
              tabIndex={0}
              onClick={onEdit}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  if (onEdit) onEdit();
                }
              }}
              sx={{
                fontSize: 12,
                fontWeight: 700,
                color: "#0066FF",
                cursor: "pointer",
                userSelect: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Edit
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );

  /* ─────────────────────────────────────────────
     LEFT PANEL
  ───────────────────────────────────────────── */
  const leftPanel = (
    <Box
      sx={{
        flex: isTablet ? "1 1 100%" : "0 0 42%",
        width: isTablet ? "100%" : "auto",
        minWidth: isTablet ? 0 : 300,
        maxWidth: isDesktop ? 360 : "none",
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      {/* ── PATIENT DETAILS ── */}
      <Box sx={{ ...cardSx, flexShrink: 0 }}>
        {cardHeader("Patient Details", showPatientDetails, () =>
          setShowPatientDetails((p) => !p),
        )}
        <Box sx={{ px: 1.5, pt: 1.3, pb: 0.4 }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              columnGap: 1.5,
            }}
          >
            {!showPatientDetails ? (
              <>
                <Box sx={{ minWidth: 0 }}>
                  {infoField("", claim.patientName, false, true)}
                  {infoField("Encounter", `${claim.encounterId} ↗`, true)}
                  {infoField("Case", `${caseName} ↗`, true)}
                  {infoField("Provider", provider, true)}
                </Box>
                <Box sx={{ minWidth: 0 }}>
                  {infoField("Location", location, true)}
                  {infoField("DOS", claim.dos, true)}
                  {infoField("Type of Service", typeOfService, true)}
                  {infoField("Clearing Trk#", clearingTrk, false)}
                </Box>
              </>
            ) : (
              <>
                <Box sx={{ minWidth: 0 }}>
                  {infoField("", claim.patientName, false, true)}
                  {infoField("Encounter", `${claim.encounterId} ↗`, true)}
                  {infoField("Case", `${caseName} ↗`, true)}
                  {infoField("POS", posName, false)}
                  {infoField("UC", uc, false)}
                  {infoField("Line note", lineNote, false)}
                  {infoField("Referral#", referralNo, false)}
                </Box>
                <Box sx={{ minWidth: 0 }}>
                  {infoField("Location", location, true)}
                  {infoField("DOS", claim.dos, true)}
                  {infoField("Type of Service", typeOfService, true)}
                  {infoField("NDC", ndc, false)}
                  {infoField("UM", um, false)}
                  {infoField("Payor Trk", PayorTrk, false)}
                  {infoField("Local use data", localUse, false)}
                </Box>
              </>
            )}
          </Box>

          {showPatientDetails && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.8,
                pb: 1,
                mt: -0.2,
              }}
            >
              <Checkbox
                size="small"
                checked={doNotSendElectronically}
                onChange={(e) => setDoNotSendElectronically(e.target.checked)}
                sx={{
                  p: 0,
                  color: "#C8CDD8",
                  "&.Mui-checked": { color: "#0066FF" },
                  "& svg": { fontSize: 16 },
                }}
              />
              <Typography sx={{ fontSize: 12, color: "#374151" }}>
                Do not send electronically
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      {/* ── CPT & ICD ── */}
      <Box sx={{ ...cardSx, flexShrink: 0 }}>
        {cardHeader(
          "CPT & ICD",
          showCptDetails,
          () => setShowCptDetails((p) => !p),
          true,
          () => setShowCptDetails(true),
        )}
        <Box sx={{ p: 1.5 }}>
          <Typography sx={{ fontSize: 12, color: "#8B95A5", mb: 0.5 }}>
            CPT
          </Typography>
          <TextField
            fullWidth
            size="small"
            value={cptDisplay}
            InputProps={{ readOnly: true }}
            sx={{ ...readOnlyFieldSx, mb: 1.4 }}
          />

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 1.2,
              mb: 1.4,
            }}
          >
            <ClaimSelect
              label="Modifier 1"
              value={mods[0]}
              options={MODIFIER_OPTIONS}
              onChange={(v) => setMod(0, v)}
            />
            <ClaimSelect
              label="Modifier 2"
              value={mods[1]}
              options={MODIFIER_OPTIONS}
              onChange={(v) => setMod(1, v)}
            />
            {showCptDetails && (
              <>
                <ClaimSelect
                  label="Modifier 3"
                  value={mods[2]}
                  options={MODIFIER_OPTIONS}
                  onChange={(v) => setMod(2, v)}
                />
                <ClaimSelect
                  label="Modifier 4"
                  value={mods[3]}
                  options={MODIFIER_OPTIONS}
                  onChange={(v) => setMod(3, v)}
                />
              </>
            )}
          </Box>

          <Typography sx={{ fontSize: 12, color: "#8B95A5", mb: 0.6 }}>
            ICD
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: 0.8,
            }}
          >
            {dxList.map((dx, i) => {
              const c = DX_COLORS[i % DX_COLORS.length];
              return (
                <Chip
                  key={dx}
                  label={dx}
                  size="small"
                  onDelete={() =>
                    setDxList((prev) => prev.filter((d) => d !== dx))
                  }
                  sx={{
                    bgcolor: c.bg,
                    color: c.color,
                    fontWeight: 600,
                    fontSize: 12,
                    height: 24,
                    borderRadius: "14px",
                    "& .MuiChip-deleteIcon": {
                      color: c.color,
                      fontSize: 14,
                      "&:hover": { color: c.color, opacity: 0.7 },
                    },
                  }}
                />
              );
            })}
            {addingDx ? (
              <TextField
                autoFocus
                size="small"
                placeholder="Dx code"
                value={newDx}
                onChange={(e) => setNewDx(e.target.value)}
                onBlur={commitDx}
                onKeyDown={(e) => {
                  if (e.key === "Enter") commitDx();
                  if (e.key === "Escape") {
                    setNewDx("");
                    setAddingDx(false);
                  }
                }}
                sx={{
                  width: 96,
                  "& .MuiInputBase-root": {
                    height: 24,
                    fontSize: 12,
                    borderRadius: "14px",
                  },
                  "& .MuiInputBase-input": { padding: "3px 10px" },
                }}
              />
            ) : (
              <Chip
                label="+ Add"
                size="small"
                variant="outlined"
                clickable
                onClick={() => setAddingDx(true)}
                sx={{
                  borderColor: "#DCD6F8",
                  color: "#5443C4",
                  fontWeight: 600,
                  fontSize: 12,
                  height: 24,
                  borderRadius: "14px",
                }}
              />
            )}
          </Box>
        </Box>
      </Box>

      {/* ── CHARGES AND BALANCE ── */}
      <Box sx={{ ...cardSx, flexShrink: 0 }}>
        {cardHeader("Charges and Balance")}
        <Box sx={{ p: 1.5 }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 1.5,
              mb: 1.4,
            }}
          >
            <InlineField label="Units" value={units} onChange={setUnits} />
            <InlineField
              label="Unit Charge"
              value={billed}
              onChange={setBilled}
            />
          </Box>

          {balanceRow("Total Charges", "$0.00", "#8ED1B5", { muted: true })}
          {balanceRow("Adjustments:", "$0.00", "#8ED1B5", { muted: true })}
          {balanceRow("Adjusted charges", "$0.00", "#E9CF7B", { muted: true })}
          {balanceRow(
            "Patient payments",
            claim.patientPayment || "$0.00",
            "#F2AA8C",
            { muted: true },
          )}
          {balanceRow(
            "Total payments",
            claim.insurancePayment || "$824.22",
            "#A7C9F8",
          )}
          {balanceRow("Patient Balance", "$0.0", "#A7C9F8")}
          {balanceRow("Insurance Balance", billed || "$550.14", "#A7C9F8")}
          {balanceRow("Total Balance", billed || "$550.14", "#7FB0F0", {
            bold: true,
          })}
        </Box>
      </Box>
    </Box>
  );

  /* ─────────────────────────────────────────────
     RIGHT TRANSACTION TABLE
  ───────────────────────────────────────────── */
  const rightPanel = (
    <Box
      sx={{
        flex: 1,
        minWidth: 0,
        backgroundColor: "#FFFFFF",
        border: "1px solid #E5E7EB",
        borderRadius: "8px",
        overflow: "clip",
        display: "flex",
        flexDirection: "column",
        width: isTablet ? "100%" : "auto",
      }}
    >
      <TableContainer sx={{ overflow: "auto", ...thinScrollSx }}>
        <Table
          size="small"
          stickyHeader
          sx={{
            width: "100%",
            tableLayout: isMobile ? "auto" : "fixed",
            minWidth: isMobile ? 500 : "auto",
          }}
        >
          <colgroup>
            <col style={{ width: "68px" }} />
            <col />
            <col style={{ width: "76px" }} />
            <col style={{ width: "78px" }} />
            <col style={{ width: "92px" }} />
          </colgroup>

          <TableHead>
            <TableRow>
              {[
                "Date",
                "Transaction",
                "Amount",
                "Pat Resp.",
                "Total Balance",
              ].map((h, i) => (
                <TableCell
                  key={h}
                  align={i >= 2 ? "right" : "left"}
                  sx={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#000",
                    backgroundColor: "#F1F3FF",
                    borderBottom: "1px solid #E5E7EB",
                    whiteSpace: "nowrap",
                    py: 1.15,
                    px: 1,
                    lineHeight: 1.1,
                  }}
                >
                  {h}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {transactions.map((t, idx) => (
              <TableRow
                key={idx}
                sx={{
                  backgroundColor: t.bg,
                  "&:last-child td": { borderBottom: 0 },
                }}
              >
                {/* Date */}
                <TableCell
                  sx={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#2E2E2E",
                    verticalAlign: "middle",
                    whiteSpace: "nowrap",
                    py: 1.2,
                    px: 1,
                    lineHeight: 1.15,
                  }}
                >
                  26 Aug 26
                </TableCell>

                {/* Transaction */}
                <TableCell
                  sx={{
                    verticalAlign: "middle",
                    py: 1.2,
                    px: 1,
                    overflow: "hidden",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: t.color,
                      lineHeight: 1.2,
                      mb: 0.2,
                    }}
                  >
                    • {t.label}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 12,
                      color: "#6B7280",
                      lineHeight: 1.35,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {t.desc}
                  </Typography>
                  {t.link && (
                    <Typography
                      sx={{
                        fontSize: 12,
                        color: "#0066FF",
                        textDecoration: "underline",
                        cursor: "pointer",
                        lineHeight: 1.2,
                        mt: 0.15,
                      }}
                    >
                      {t.link}
                    </Typography>
                  )}
                </TableCell>

                {/* Amount / Pat Resp. / Total Balance */}
                {[t.amount, t.patResp, t.balance].map((val, i) => (
                  <TableCell
                    key={i}
                    align="right"
                    sx={{
                      fontSize: 12,
                      fontWeight: i === 2 ? 600 : 600,
                      color: "#000",
                      verticalAlign: "middle",
                      py: 1.2,
                      px: 1,
                      whiteSpace: "nowrap",
                      lineHeight: 1.15,
                    }}
                  >
                    {val}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );

  /* ─────────────────────────────────────────────
     RENDER
  ───────────────────────────────────────────── */
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: "#F5F7FA",
        overflowY: "auto",
        overflowX: "hidden",
        display: "flex",
        flexDirection: "column",
        ...thinScrollSx,
      }}
    >
      {/* ══════════════════ HEADER ══════════════════ */}
      <Box
        sx={{
          backgroundColor: "#FFFFFF",
          borderBottom: "1px solid #E5E7EB",
          flexShrink: 0,
        }}
      >
        {/* Top row: patient info + status badge + outstanding */}
        <Box
          sx={{
            display: "flex",
            alignItems: isMobile ? "flex-start" : "center",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            gap: isMobile ? 1 : 0,
            px: { xs: 1.2, sm: 1.5 },
            pt: 1.3,
            pb: 0.7,
          }}
        >
          {/* Patient name + meta */}
          <Box>
            <Typography
              sx={{
                fontSize: { xs: 16, sm: 20 },
                fontWeight: 700,
                color: "#1F2937",
                lineHeight: 1.2,
              }}
            >
              {claim.patientName}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: { xs: 0.8, sm: 1.4 },
                mt: 0.6,
              }}
            >
              {[
                ["Claim", claim.claimId],
                ["Encounter", claim.encounterId],
                ["Born", born],
                ["Patient", patientNo],
              ].map(([label, val]) => (
                <Typography key={label} sx={{ fontSize: 13, color: "#5C6A7D" }}>
                  {label}{" "}
                  <span style={{ color: "#28313F", fontWeight: 600 }}>
                    {val}
                  </span>
                </Typography>
              ))}
            </Box>
          </Box>

          {/* Status badge + outstanding */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 1, sm: 1.5 },
              flexShrink: 0,
            }}
          >
            {/* Waiting badge */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.6,
                height: 24,
                px: 1.2,
                borderRadius: "12px",
                backgroundColor: "#FEF3E2",
                border: "1px solid #F3DDA8",
                color: "#A16207",
                fontSize: 13,
                fontWeight: 600,
                whiteSpace: "nowrap",
              }}
            >
              <Box
                sx={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  backgroundColor: "#F59E0B",
                }}
              />
              Waiting on {caseName}
            </Box>

            {/* Outstanding amount */}
            <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.5 }}>
              <Typography
                sx={{
                  fontSize: { xs: 16, sm: 20 },
                  fontWeight: 700,
                  color: "#111827",
                  lineHeight: 1,
                }}
              >
                {outstanding}
              </Typography>
              <Typography sx={{ fontSize: 12, color: "#9CA3AF" }}>
                Outstanding
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Tabs row + action buttons */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            gap: isMobile ? 1 : 0,
            px: { xs: 1.2, sm: 1.5 },
            pb: 0.9,
          }}
        >
          {/* General / Log tabs */}
          <Tabs
            value={activeTab}
            onChange={(_, v) => setActiveTab(v)}
            TabIndicatorProps={{ style: { display: "none" } }}
            sx={{
              minHeight: 28,
              "& .MuiTabs-flexContainer": { gap: 0.5 },
              "& .MuiTab-root": {
                minHeight: 28,
                height: 28,
                textTransform: "none",
                fontSize: 12,
                fontWeight: 600,
                color: "#6B7280",
                minWidth: "auto",
                px: 1.6,
                py: 0,
                borderRadius: "5px",
              },
              "& .Mui-selected": {
                color: "#FFFFFF !important",
                backgroundColor: "#0066FF",
                fontWeight: 600,
              },
            }}
          >
            <Tab label="General" />
            <Tab label="Log" />
          </Tabs>

          {/* Action buttons */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: 0.8,
              mb: isMobile ? 0 : 1.2,
              width: isMobile ? "100%" : "auto",
            }}
          >
            {/* Save */}
            <Button
              variant="contained"
              size="small"
              onClick={handleSave}
              sx={{
                textTransform: "none",
                backgroundColor: "#0066FF",
                color: "#FFFFFF",
                fontWeight: 600,
                fontSize: 12,
                height: 28,
                minHeight: 28,
                px: 1.6,
                borderRadius: "5px",
                boxShadow: "0 2px 5px rgba(0,102,255,0.2)",
                minWidth: "auto",
                whiteSpace: "nowrap",
                "&:hover": {
                  backgroundColor: "#0052CC",
                  boxShadow: "0 2px 5px rgba(0,102,255,0.2)",
                },
              }}
            >
              Save changes
            </Button>

            <Button
              variant="outlined"
              size="small"
              onClick={onBack}
              sx={outlineBtnSx}
            >
              Cancel
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={handleDelete}
              sx={outlineBtnSx}
            >
              Delete
            </Button>

            <Button
              variant="outlined"
              size="small"
              disabled={transactions.length <= 1}
              onClick={() => setRemovedCount((c) => c + 1)}
              sx={outlineBtnSx}
            >
              Delete Last Transaction
            </Button>

            <Button
              variant="outlined"
              size="small"
              endIcon={<KeyboardArrowDown sx={{ fontSize: 15 }} />}
              onClick={(e) => setActionAnchorEl(e.currentTarget)}
              sx={{
                ...outlineBtnSx,
                px: 1.2,
                "& .MuiButton-endIcon": { marginLeft: 0.5, marginRight: -0.2 },
              }}
            >
              Select Action
            </Button>

            <Menu
              anchorEl={actionAnchorEl}
              open={Boolean(actionAnchorEl)}
              onClose={() => setActionAnchorEl(null)}
              slotProps={{ paper: { sx: { mt: 0.5, minWidth: 135 } } }}
            >
              {["Print Claim", "Rebill", "Apply Payment"].map((a) => (
                <MenuItem
                  key={a}
                  sx={{ fontSize: 12 }}
                  onClick={() => setActionAnchorEl(null)}
                >
                  {a}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Box>
      </Box>

      {/* ══════════════════ GENERAL TAB BODY ══════════════════ */}
      {activeTab === 0 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: isTablet ? "column" : "row",
            alignItems: isTablet ? "stretch" : "flex-start",
            gap: 1.5,
            p: { xs: 1, sm: 1.5 },
            flexShrink: 0,
          }}
        >
          {leftPanel}
          {rightPanel}
        </Box>
      )}

      {/* ══════════════════ LOG TAB ══════════════════ */}
      {activeTab === 1 &&
        (() => {
          const rows = [...LOG_ENTRIES];
          if (logSort.key === 'date') {
            rows.sort((a, b) => {
              const va = logSortValue(a, 'date');
              const vb = logSortValue(b, 'date');
              const r = va < vb ? -1 : va > vb ? 1 : 0;
              return logSort.dir === "asc" ? r : -r;
            });
          }
          const toggleSort = (key) => {
            if (key !== 'date') return; // Only allow sorting on date column
            setLogSort((prev) =>
              prev.key === key && prev.dir === 'asc'
                ? { key, dir: "desc" }
                : { key, dir: "asc" },
            );
          };

          const getSortTitle = () => {
            if (logSort.key !== 'date') return "Sort oldest first";
            return logSort.dir === "asc" ? "Sorted oldest first" : "Sorted newest first";
          };

          return (
            <Box sx={{ p: { xs: 1, sm: 1.5 } }}>
              <TableContainer
                sx={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #D6E0F5",
                  borderRadius: "10px",
                  overflow: "auto",
                  ...thinScrollSx,
                }}
              >
                <Table
                  size="small"
                  sx={{ tableLayout: "fixed", width: "100%", minWidth: 480 }}
                >
                  <TableHead>
                    <TableRow>
                      {LOG_COLUMNS.map((col) => (
                        <TableCell
                          key={col.key}
                          onClick={() => col.sortable && toggleSort(col.key)}
                          sx={{
                            backgroundColor: "#E8EEFC",
                            borderBottom: "1px solid #D6E0F5",
                            borderRight: "1px solid #D6E0F5",
                            "&:last-of-type": { borderRight: 0 },
                            cursor: col.sortable ? "pointer" : "default",
                            userSelect: "none",
                            py: 1.4,
                            px: 1.5,
                            width: col.width,
                            textAlign: "center",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: 0.3,
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: 12,
                                fontWeight: 700,
                                color: "#374151",
                              }}
                            >
                              {col.label}
                            </Typography>
                            {col.sortable && (
                              <KeyboardArrowDown
                                title={getSortTitle()}
                                sx={{
                                  fontSize: 16,
                                  color:
                                    logSort.key === col.key
                                      ? "#2563EB"
                                      : "#52525B",
                                  transform:
                                    logSort.key === col.key &&
                                    logSort.dir === "desc"
                                      ? "rotate(180deg)"
                                      : "none",
                                  transition: "transform .15s ease",
                                }}
                              />
                            )}
                          </Box>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell
                          sx={{
                            fontSize: 12,
                            color: "#4B5563",
                            py: 1.6,
                            px: 1.5,
                            height: 41,
                            textAlign: "center",
                          }}
                        >
                          {row.date}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: 12,
                            color: "#4B5563",
                            py: 1.6,
                            px: 1.5,
                            textAlign: "center",
                          }}
                        >
                          {row.time}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: "#4B5563",
                            py: 1.6,
                            px: 1.5,
                            textAlign: "center",
                          }}
                        >
                          {row.user}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: "#4B5563",
                            py: 1.6,
                            px: 1.5,
                            textAlign: "center",
                          }}
                        >
                          {row.remarks}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          );
        })()}
    </Box>
  );
}
