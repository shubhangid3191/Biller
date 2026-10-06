import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Typography,
  Chip,
  Avatar,
  Divider,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import logo from "../Assets/logo.png";
import {
  HandIcon,
  ListCheckIcon,
  ReferringProvider,
  RenderingProvider,
  Location,
  Practice,
  Fee,
  InsuranceProvider,
  Program,
  PreBillingClaim,
  PostBillingClaim,
  ERA,
  AddPatient,
  PatientList,
  Statement,
  Refund,
  RecentsArrowIcon,
} from "../assets/Assets";

const drawerWidth = 240;

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [expandedSections, setExpandedSections] = useState({
    command: true,
    configuration: false,
    patient: false,
    claims: false,
    userManagement: false,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const isActive = (path) => location.pathname === path;

  /* ── Route → human label map ── */
  const ROUTE_LABELS = {
    "/summary":                  "Summary",
    "/ai-insights":              "AI Insights",
    "/my-tasks":                 "My Tasks",
    "/performance-overview":     "Performance Overview",
    "/encounters":               "Encounters",
    "/referring-provider":       "Referring Provider",
    "/rendering-provider":       "Rendering Provider",
    "/locations":                "Locations",
    "/practice":                 "Practice",
    "/fee":                      "Fee",
    "/insurance-provider":       "Insurance Provider",
    "/program":                  "Program",
    "/add-patient":              "Add Patient",
    "/patient-list":             "Patient List",
    "/statement":                "Statement",
    "/refunds":                  "Refunds",
    "/pre-billing-claim-page":   "Pre Billing Claim",
    "/post-billing-claim-page":  "Post Billing Claim",
    "/era":                      "ERA/EOB",
    "/eob-upload":               "EOB Upload",
    "/icd-10-search":            "ICD 10 Search",
    "/excel-access":             "Excel Access",
    "/reports":                  "Reports",
    "/documents":                "Documents",
    "/new-payment":              "New Payment",
    "/new-encounter":            "New Encounter",
    "/referring-provider/edit":  "Referring Provider Edit",
    "/rendering-provider/edit":  "Rendering Provider Edit",
    "/locations/edit":           "Locations Edit",
    "/practice/edit":            "Practice Edit",
    "/fee/configuration":        "Fee Configuration",
    "/insurance-provider/edit":  "Insurance Provider Edit",
    "/program/configuration":    "Program Edit",
  };

  const MAX_RECENTS = 5;
  const STORAGE_KEY = "sidebar_recents";

  /* Load recents from localStorage */
  const loadRecents = () => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
      return [];
    }
  };

  const [recents, setRecents] = useState(loadRecents);

  /* Update recents whenever route changes */
  useEffect(() => {
    const path  = location.pathname;
    const label = ROUTE_LABELS[path];
    if (!label) return;                       // skip unknown / edit sub-pages

    setRecents((prev) => {
      const filtered = prev.filter((r) => r.path !== path);
      const next     = [{ path, label }, ...filtered].slice(0, MAX_RECENTS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const commandMenuItems = [
    {
      text: "Summary",
      icon: <HandIcon width={18} height={18} color="currentColor" />,
      path: "/summary",
      badge: null,
    },
    {
      text: "AI Insights",
      icon: <HandIcon width={18} height={18} color="currentColor" />,
      path: "/ai-insights",
      badge: { value: 1, color: "warning" },
    },
    {
      text: "My Tasks",
      icon: <ListCheckIcon width={18} height={18} color="currentColor" />,
      path: "/my-tasks",
      badge: { value: 38, color: "error" },
    },
    {
      text: "Performance Overview",
      icon: <ListCheckIcon width={18} height={18} color="currentColor" />,
      path: "/performance-overview",
      badge: null,
    },
  ];

  const configurationMenuItems = [
    {
      text: "Referring Provider",
      icon: <ReferringProvider width={14} height={14} color="currentColor" />,
      path: "/referring-provider",
      badge: { value: 1, color: "warning" },
    },
    {
      text: "Rendering Provider",
      icon: <RenderingProvider width={14} height={14} color="currentColor" />,
      path: "/rendering-provider",
      badge: { value: 1, color: "warning" },
    },
    {
      text: "Locations",
      icon: <Location width={14} height={14} color="currentColor" />,
      path: "/locations",
      badge: { value: 1, color: "warning" },
    },
    {
      text: "Practice",
      icon: <Practice width={14} height={14} color="currentColor" />,
      path: "/practice",
      badge: { value: 1, color: "warning" },
    },
    {
      text: "Fee",
      icon: <Fee width={14} height={14} color="currentColor" />,
      path: "/fee",
      badge: { value: 1, color: "warning" },
    },
    {
      text: "Insurance Provider",
      icon: <InsuranceProvider width={14} height={14} color="currentColor" />,
      path: "/insurance-provider",
      badge: { value: 1, color: "warning" },
    },
    {
      text: "Program",
      icon: <Program width={14} height={14} color="currentColor" />,
      path: "/program",
      badge: { value: 1, color: "warning" },
    },
  ];

  const patientMenuItems = [
    {
      text: "Add Patient",
      icon: <AddPatient width={18} height={18} color="currentColor" />,
      path: "/add-patient",
      badge: null,
    },
    {
      text: "Patient List",
      icon: <PatientList width={18} height={18} color="currentColor" />,
      path: "/patient-list",
      badge: { value: 1, color: "warning" },
    },
    {
      text: "Statement",
      icon: <Statement width={18} height={18} color="currentColor" />,
      path: "/statement",
      badge: { value: 38, color: "error" },
    },
    {
      text: "Refunds",
      icon: <Refund width={18} height={18} color="currentColor" />,
      path: "/refunds",
      badge: { value: 38, color: "error" },
    },
  ];

  const claimsMenuItems = [
    {
      text: "Pre Billing Claim",
      icon: <PreBillingClaim width={18} height={18} color="currentColor" />,
      path: "/pre-billing-claim-page",
      badge: null,
    },
    {
      text: "Post Billing Claim",
      icon: <PostBillingClaim width={18} height={18} color="currentColor" />,
      path: "/post-billing-claim-page",
      badge: null,
    },
    {
      text: "ERA",
      icon: <ERA width={18} height={18} color="currentColor" />,
      path: "/era",
      badge: null,
    },
  ];

  const standaloneItems = [
    { text: "EOB UPLOAD", path: "/eob-upload" },
    { text: "ICD 10 SEARCH", path: "/icd-10-search" },
    { text: "EXCEL ACCESS", path: "/excel-access" },
    { text: "REPORTS", path: "/reports" },
    { text: "DOCUMENTS", path: "/documents" },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          background: "linear-gradient(180deg, #1a1d2e 0%, #16192b 100%)",
          color: "#ffffff",
          borderRight: "none",
          display: "flex",
          flexDirection: "column",
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "rgba(255, 255, 255, 0.2)",
            borderRadius: "4px",
            "&:hover": {
              background: "rgba(255, 255, 255, 0.3)",
            },
          },
        },
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <Box
          sx={{
            width: 48,
            height: 48,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <img
            src={logo}
            alt="TiaSTAT"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </Box>

        <Typography
          variant="h6"
          sx={{
            fontWeight: 500,
            fontSize: 20,
            letterSpacing: 0.5,
          }}
        >
          <span style={{ color: "#FFFFFF" }}>Tia</span>
          <span style={{ color: "#44CDD9" }}>STAT</span>
        </Typography>
      </Box>

      {/* Navigation Menu */}
      <Box
        sx={{
          overflow: "auto",
          flex: 1,
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "rgba(255, 255, 255, 0.2)",
            borderRadius: "4px",
            "&:hover": {
              background: "rgba(255, 255, 255, 0.3)",
            },
          },
        }}
      >
        <List sx={{ py: 1 }}>
          {/* COMMAND Section */}
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => toggleSection("command")}
              sx={{
                py: 1.5,
                px: 2,
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                },
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: "rgba(255, 255, 255, 0.5)",
                  fontWeight: 600,
                  letterSpacing: 1,
                  flex: 1,
                  fontSize: "11px",
                }}
              >
                COMMAND
              </Typography>
              {expandedSections.command ? (
                <Remove
                  fontSize="small"
                  sx={{ color: "rgba(255, 255, 255, 0.5)" }}
                />
              ) : (
                <Add
                  fontSize="small"
                  sx={{ color: "rgba(255, 255, 255, 0.5)" }}
                />
              )}
            </ListItemButton>
          </ListItem>
          <Collapse in={expandedSections.command} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {commandMenuItems.map((item) => (
                <ListItem key={item.path} disablePadding>
                  <ListItemButton
                    onClick={() => handleNavigation(item.path)}
                    selected={isActive(item.path)}
                    sx={{
                      pl: 2,
                      pr: 0.5,
                      py: 1.2,
                     "&.Mui-selected": {
  backgroundColor: "rgba(0, 212, 255, 0.15)",
  position: "relative",

  "&::before": {
    content: '""',
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: "3px",
    backgroundColor: "#00d4ff",
  },

  "&:hover": {
    backgroundColor: "rgba(0, 212, 255, 0.2)",
  },
},
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.08)",
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 36,
                        color: isActive(item.path)
                          ? "#00d4ff"
                          : "rgba(255, 255, 255, 0.7)",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      sx={{ minWidth: 0, mr: item.badge ? 0.5 : 0 }}
                      primaryTypographyProps={{
                        noWrap: true,
                        fontSize: 13,
                        fontWeight: isActive(item.path) ? 500 : 400,
                        color: isActive(item.path)
                          ? "#00d4ff"
                          : "rgba(255, 255, 255, 0.7)",
                        sx: {
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        },
                      }}
                    />
                    {item.badge && (
                      <Chip
                        label={item.badge.value}
                        size="small"
                        sx={{
                          height: 20,
                          width: 20,
                          borderRadius: "50%",
                          fontSize: 12,
                          fontWeight: 700,
                          flexShrink: 0,
                          backgroundColor:
                            item.badge.color === "warning"
                              ? "#F59E0B"
                              : "#FF6B6B",
                          color: "#000000",
                          "& .MuiChip-label": {
                            px: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          },
                        }}
                      />
                    )}
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Collapse>

          {/* ENCOUNTERS Section — navigates directly, no submenu */}
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => handleNavigation("/encounters")}
              selected={isActive("/encounters")}
              sx={{
                py: 1.5,
                px: 2,
               "&.Mui-selected": {
  backgroundColor: "rgba(0, 212, 255, 0.15)",
  position: "relative",

  "&::before": {
    content: '""',
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: "3px",
    backgroundColor: "#00d4ff",
  },

  "&:hover": {
    backgroundColor: "rgba(0, 212, 255, 0.2)",
  },
},
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                },
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: isActive("/encounters")
                    ? "#00d4ff"
                    : "rgba(255, 255, 255, 0.5)",
                  fontWeight: 600,
                  letterSpacing: 1,
                  flex: 1,
                  fontSize: "11px",
                }}
              >
                ENCOUNTERS
              </Typography>
            </ListItemButton>
          </ListItem>

          {/* CONFIGURATION Section */}
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => toggleSection("configuration")}
              sx={{
                py: 1.5,
                px: 2,
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                },
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: "rgba(255, 255, 255, 0.5)",
                  fontWeight: 600,
                  letterSpacing: 1,
                  flex: 1,
                  fontSize: "11px",
                }}
              >
                CONFIGURATION
              </Typography>
              {expandedSections.configuration ? (
                <Remove
                  fontSize="small"
                  sx={{ color: "rgba(255, 255, 255, 0.5)" }}
                />
              ) : (
                <Add
                  fontSize="small"
                  sx={{ color: "rgba(255, 255, 255, 0.5)" }}
                />
              )}
            </ListItemButton>
          </ListItem>

          <Collapse
            in={expandedSections.configuration}
            timeout="auto"
            unmountOnExit
          >
            <List component="div" disablePadding>
              {configurationMenuItems.map((item) => (
                <ListItem key={item.path} disablePadding>
                  <ListItemButton
                    onClick={() => handleNavigation(item.path)}
                    selected={isActive(item.path)}
                    sx={{
                      pl: 2,
                      pr: 0.5,
                      py: 1.2,
                     "&.Mui-selected": {
  backgroundColor: "rgba(0, 212, 255, 0.15)",
  position: "relative",

  "&::before": {
    content: '""',
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: "3px",
    backgroundColor: "#00d4ff",
  },

  "&:hover": {
    backgroundColor: "rgba(0, 212, 255, 0.2)",
  },
},
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.08)",
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 36,
                        color: isActive(item.path)
                          ? "#00d4ff"
                          : "rgba(255, 255, 255, 0.7)",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>

                    <ListItemText
                      primary={item.text}
                      sx={{ minWidth: 0 }}
                      primaryTypographyProps={{
                        noWrap: true,
                        fontSize: 13,
                        fontWeight: isActive(item.path) ? 500 : 400,
                        color: isActive(item.path)
                          ? "#00d4ff"
                          : "rgba(255, 255, 255, 0.7)",
                        sx: {
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        },
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Collapse>

          {/* PATIENT Section */}
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => toggleSection("patient")}
              sx={{
                py: 1.5,
                px: 2,
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                },
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: "rgba(255, 255, 255, 0.5)",
                  fontWeight: 600,
                  letterSpacing: 1,
                  flex: 1,
                  fontSize: "11px",
                }}
              >
                PATIENT
              </Typography>
              {expandedSections.patient ? (
                <Remove
                  fontSize="small"
                  sx={{ color: "rgba(255, 255, 255, 0.5)" }}
                />
              ) : (
                <Add
                  fontSize="small"
                  sx={{ color: "rgba(255, 255, 255, 0.5)" }}
                />
              )}
            </ListItemButton>
          </ListItem>
          <Collapse in={expandedSections.patient} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {patientMenuItems.map((item) => (
                <ListItem key={item.path} disablePadding>
                  <ListItemButton
                    onClick={() => handleNavigation(item.path)}
                    selected={isActive(item.path)}
                    sx={{
                      pl: 2,
                      pr: 0.5,
                      py: 1.2,
                     "&.Mui-selected": {
  backgroundColor: "rgba(0, 212, 255, 0.15)",
  position: "relative",

  "&::before": {
    content: '""',
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: "3px",
    backgroundColor: "#00d4ff",
  },

  "&:hover": {
    backgroundColor: "rgba(0, 212, 255, 0.2)",
  },
},
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.08)",
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 36,
                        color: isActive(item.path)
                          ? "#00d4ff"
                          : "rgba(255, 255, 255, 0.7)",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      sx={{ minWidth: 0, mr: item.badge ? 0.5 : 0 }}
                      primaryTypographyProps={{
                        noWrap: true,
                        fontSize: 13,
                        fontWeight: isActive(item.path) ? 500 : 400,
                        color: isActive(item.path)
                          ? "#00d4ff"
                          : "rgba(255, 255, 255, 0.7)",
                        sx: {
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        },
                      }}
                    />
                    {item.badge && (
                      <Chip
                        label={item.badge.value}
                        size="small"
                        sx={{
                          height: 20,
                          width: 20,
                          borderRadius: "50%",
                          fontSize: 12,
                          fontWeight: 700,
                          flexShrink: 0,
                          backgroundColor:
                            item.badge.color === "warning"
                              ? "#F59E0B"
                              : "#FF6B6B",
                          color: "#000000",
                          "& .MuiChip-label": {
                            px: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          },
                        }}
                      />
                    )}
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Collapse>

          {/* CLAIMS Section */}
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => toggleSection("claims")}
              sx={{
                py: 1.5,
                px: 2,
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                },
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: "rgba(255, 255, 255, 0.5)",
                  fontWeight: 600,
                  letterSpacing: 1,
                  flex: 1,
                  fontSize: "11px",
                }}
              >
                CLAIMS
              </Typography>
              {expandedSections.claims ? (
                <Remove
                  fontSize="small"
                  sx={{ color: "rgba(255, 255, 255, 0.5)" }}
                />
              ) : (
                <Add
                  fontSize="small"
                  sx={{ color: "rgba(255, 255, 255, 0.5)" }}
                />
              )}
            </ListItemButton>
          </ListItem>
          <Collapse in={expandedSections.claims} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {claimsMenuItems.map((item) => (
                <ListItem key={item.path} disablePadding>
                  <ListItemButton
                    onClick={() => handleNavigation(item.path)}
                    selected={isActive(item.path)}
                    sx={{
                      pl: 2,
                      pr: 0.5,
                      py: 1.2,
                     "&.Mui-selected": {
  backgroundColor: "rgba(0, 212, 255, 0.15)",
  position: "relative",

  "&::before": {
    content: '""',
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: "3px",
    backgroundColor: "#00d4ff",
  },

  "&:hover": {
    backgroundColor: "rgba(0, 212, 255, 0.2)",
  },
},
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.08)",
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 36,
                        color: isActive(item.path)
                          ? "#00d4ff"
                          : "rgba(255, 255, 255, 0.7)",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      sx={{ minWidth: 0, mr: item.badge ? 0.5 : 0 }}
                      primaryTypographyProps={{
                        noWrap: true,
                        fontSize: 13,
                        fontWeight: isActive(item.path) ? 500 : 400,
                        color: isActive(item.path)
                          ? "#00d4ff"
                          : "rgba(255, 255, 255, 0.7)",
                        sx: {
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        },
                      }}
                    />
                    {item.badge && (
                      <Chip
                        label={item.badge.value}
                        size="small"
                        sx={{
                          height: 20,
                          width: 20,
                          borderRadius: "50%",
                          fontSize: 12,
                          fontWeight: 700,
                          flexShrink: 0,
                          backgroundColor:
                            item.badge.color === "warning"
                              ? "#F59E0B"
                              : "#FF6B6B",
                          color: "#000000",
                          "& .MuiChip-label": {
                            px: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          },
                        }}
                      />
                    )}
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Collapse>

          {/* Standalone Items */}
          {standaloneItems.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                selected={isActive(item.path)}
                sx={{
                  px: 2,
                  py: 1.5,
                 "&.Mui-selected": {
  backgroundColor: "rgba(0, 212, 255, 0.15)",
  position: "relative",

  "&::before": {
    content: '""',
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: "3px",
    backgroundColor: "#00d4ff",
  },

  "&:hover": {
    backgroundColor: "rgba(0, 212, 255, 0.2)",
  },
},
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                  },
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: isActive(item.path)
                      ? "#00d4ff"
                      : "rgba(255, 255, 255, 0.5)",
                    fontWeight: 600,
                    letterSpacing: 1,
                    fontSize: "11px",
                  }}
                >
                  {item.text}
                </Typography>
              </ListItemButton>
            </ListItem>
          ))}

          {/* USER MANAGEMENT Section */}
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => toggleSection("userManagement")}
              sx={{
                py: 1.5,
                px: 2,
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                },
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: "rgba(255, 255, 255, 0.5)",
                  fontWeight: 600,
                  letterSpacing: 1,
                  flex: 1,
                  fontSize: "11px",
                }}
              >
                USER MANAGEMENT
              </Typography>
              {expandedSections.userManagement ? (
                <Remove
                  fontSize="small"
                  sx={{ color: "rgba(255, 255, 255, 0.5)" }}
                />
              ) : (
                <Add
                  fontSize="small"
                  sx={{ color: "rgba(255, 255, 255, 0.5)" }}
                />
              )}
            </ListItemButton>
          </ListItem>
        </List>
      </Box>

      {/* ── MY RECENTS ── */}
      {recents.length > 0 && (
        <Box sx={{ px: 1.5, pb: 1.5 }}>
          <Box
            sx={{
              backgroundColor: "rgba(255,255,255,0.06)",
              borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.09)",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                px: 1.5,
                pt: 1.2,
                pb: 0.8,
              }}
            >
              <Typography
                sx={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.09em",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                MY RECENTS
              </Typography>
              {/* arrow icon — click to clear recents */}
              <Box
                onClick={() => {
                  localStorage.removeItem(STORAGE_KEY);
                  setRecents([]);
                }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  opacity: 0.45,
                  "&:hover": { opacity: 1 },
                  transition: "opacity 0.15s",
                }}
                title="Clear recents"
              >
                <RecentsArrowIcon width={16} height={16} color="white" />
              </Box>
            </Box>

            {/* Items */}
            {recents.map((r) => (
              <Box
                key={r.path}
                onClick={() => navigate(r.path)}
                sx={{
                  px: 1.5,
                  py: 0.75,
                  cursor: "pointer",
                  borderTop: "1px solid rgba(255,255,255,0.05)",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.07)",
                  },
                }}
              >
                <Typography
                  noWrap
                  sx={{
                    fontSize: 12.5,
                    fontWeight: location.pathname === r.path ? 600 : 400,
                    color:
                      location.pathname === r.path
                        ? "#00d4ff"
                        : "rgba(255,255,255,0.75)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {r.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {/* Account Section at Bottom */}
      <Box sx={{ mt: "auto" }}>
        <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)" }} />
        <Box
          sx={{
            px: 1.5,
            py: 1,
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.05)",
            },
          }}
        >
          <Avatar
            sx={{
              width: 40,
              height: 40,
              borderRadius: "6px",
              backgroundColor: "#6366F1",
              fontSize: "15px",
              fontWeight: 600,
              lineHeight: "10px",
            }}
          >
            AK
          </Avatar>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                fontSize: 14,
                color: "#ffffff",
                lineHeight: 1.3,
              }}
            >
              Ashok Kathayat
            </Typography>
            <Typography
              variant="caption"
              sx={{
                fontSize: 11,
                color: "rgba(255, 255, 255, 0.5)",
                lineHeight: 1.3,
              }}
            >
              Sr. Billing Lead
            </Typography>
          </Box>
        </Box>
        <ListItemButton
          sx={{
            py: 0.6,
            px: 2,
            justifyContent: "center",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.05)",
            },
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: "rgba(255, 255, 255, 0.6)",
              fontWeight: 500,
              letterSpacing: 0.5,
              fontSize: 11,
            }}
          >
            CHANGE PASSWORD
          </Typography>
        </ListItemButton>
        <ListItemButton
          onClick={handleLogout}
          sx={{
            py: 0.6,
            px: 2,
            justifyContent: "center",
            "&:hover": {
              backgroundColor: "rgba(255, 0, 0, 0.1)",
            },
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: "rgba(255, 100, 100, 0.8)",
              fontWeight: 500,
              letterSpacing: 0.5,
              fontSize: 11,
            }}
          >
            LOGOUT
          </Typography>
        </ListItemButton>
      </Box>
    </Drawer>
  );
}

export default Sidebar;