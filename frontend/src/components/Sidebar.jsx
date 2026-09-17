import { useState } from "react";
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
import { HandIcon, ListCheckIcon } from "../Assets/Icons";

const drawerWidth = 240;

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [expandedSections, setExpandedSections] = useState({
    command: true,
    encounters: false,
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

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
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
  ];

  const patientMenuItems = [
    {
      text: "Add Patient",
      icon: <HandIcon width={18} height={18} color="currentColor" />,
      path: "/add-patient",
      badge: null,
    },
    {
      text: "Patient List",
      icon: <HandIcon width={18} height={18} color="currentColor" />,
      path: "/patient-list",
      badge: { value: 1, color: "warning" },
    },
    {
      text: "Statement",
      icon: <ListCheckIcon width={18} height={18} color="currentColor" />,
      path: "/statement",
      badge: { value: 38, color: "error" },
    },
    {
      text: "Refunds",
      icon: <ListCheckIcon width={18} height={18} color="currentColor" />,
      path: "/refunds",
      badge: { value: 38, color: "error" },
    },
    {
      text: "Bulk Eligibility",
      icon: <ListCheckIcon width={18} height={18} color="currentColor" />,
      path: "/bulk-eligibility",
      badge: { value: 38, color: "error" },
    },
  ];

  const claimsMenuItems = [
    {
      text: "Encounter list",
      icon: <HandIcon width={18} height={18} color="currentColor" />,
      path: "/encounter-list",
      badge: null,
    },
    {
      text: "Pre Billing Claim",
      icon: <HandIcon width={18} height={18} color="currentColor" />,
      path: "/pre-billing-claim",
      badge: null,
    },
    {
      text: "Post Billing Claim",
      icon: <ListCheckIcon width={18} height={18} color="currentColor" />,
      path: "/post-billing-claim",
      badge: null,
    },
    {
      text: "ERA",
      icon: <ListCheckIcon width={18} height={18} color="currentColor" />,
      path: "/era",
      badge: null,
    },
    {
      text: "Collections",
      icon: <ListCheckIcon width={18} height={18} color="currentColor" />,
      path: "/collections",
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
          // Custom scrollbar
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
                      py: 1.2,
                      "&.Mui-selected": {
                        backgroundColor: "rgba(0, 212, 255, 0.15)",
                        borderLeft: "3px solid #00d4ff",
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
                      primaryTypographyProps={{
                        fontSize: 13,
                        fontWeight: isActive(item.path) ? 500 : 400,
                        color: isActive(item.path)
                          ? "#00d4ff"
                          : "rgba(255, 255, 255, 0.7)",
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

          {/* ENCOUNTERS Section */}
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => toggleSection("encounters")}
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
                ENCOUNTERS
              </Typography>
              {expandedSections.encounters ? (
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
                      py: 1.2,
                      "&.Mui-selected": {
                        backgroundColor: "rgba(0, 212, 255, 0.15)",
                        borderLeft: "3px solid #00d4ff",
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
                      primaryTypographyProps={{
                        fontSize: 13,
                        fontWeight: isActive(item.path) ? 500 : 400,
                        color: isActive(item.path)
                          ? "#00d4ff"
                          : "rgba(255, 255, 255, 0.7)",
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
                      py: 1.2,
                      "&.Mui-selected": {
                        backgroundColor: "rgba(0, 212, 255, 0.15)",
                        borderLeft: "3px solid #00d4ff",
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
                      primaryTypographyProps={{
                        fontSize: 13,
                        fontWeight: isActive(item.path) ? 500 : 400,
                        color: isActive(item.path)
                          ? "#00d4ff"
                          : "rgba(255, 255, 255, 0.7)",
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
                    borderLeft: "3px solid #00d4ff",
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

      {/* Account Section at Bottom */}
      <Box sx={{ mt: "auto" }}>
        <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)" }} />
        <Box
          sx={{
            p: 2,
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
              lineHeight: "24px",
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
            py: 1.5,
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
            py: 1.5,
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
