import { useState, useEffect, createContext, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const SidebarContext = createContext();

export const useSidebar = () => useContext(SidebarContext);
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
  IconButton,
} from "@mui/material";
import { Add, Remove, ArrowForwardIosOutlined } from "@mui/icons-material";
import logo from "../assets/logo.png";
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
} from "../assets/Assets";

const collapsedWidth = 70;
const expandedWidth = 260;

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [recentPages, setRecentPages] = useState([]);

  const [expandedSections, setExpandedSections] = useState({
    command: true,
    configuration: false,
    patient: false,
    claims: false,
    userManagement: false,
    myRecent: false,
  });

  // Track recent pages
  useEffect(() => {
    const pageTitle = getPageTitle(location.pathname);
    if (pageTitle && location.pathname !== '/login') {
      setRecentPages((prev) => {
        const filtered = prev.filter((page) => page.path !== location.pathname);
        const updated = [{ path: location.pathname, title: pageTitle }, ...filtered];
        return updated.slice(0, 4); // Keep only 4 most recent
      });
    }
  }, [location.pathname]);

  const getPageTitle = (path) => {
    const routes = {
      '/summary': 'Summary',
      '/ai-insights': 'AI Insights',
      '/my-tasks': 'My Tasks',
      '/performance-overview': 'Performance Overview',
      '/encounters': 'Encounters',
      '/referring-provider': 'Referring Provider',
      '/rendering-provider': 'Rendering Provider',
      '/locations': 'Locations',
      '/practice': 'Practice',
      '/fee': 'Fee',
      '/insurance-provider': 'Insurance Provider',
      '/program': 'Program',
      '/add-patient': 'Add Patient',
      '/patient-list': 'Patient List',
      '/statement': 'Patient Statement',
      '/refunds': 'Refunds',
      '/pre-billing-claim-page': 'Pre Billing Claim',
      '/post-billing-claim-page': 'Post Billing Claim',
      '/era': 'ERA/EOB',
      '/eob-upload': 'EOB Upload',
      '/icd-10-search': 'ICD 10 Search',
      '/excel-access': 'Excel Access',
      '/reports': 'Reports',
      '/documents': 'Documents',
      '/new-payment': 'New Payment',
    };
    return routes[path] || null;
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const isActive = (path) => location.pathname === path;

  const isSectionActive = (section) => {
    switch (section) {
      case "command":
        return commandMenuItems.some((item) => isActive(item.path));
      case "encounters":
        return isActive("/encounters");
      case "configuration":
        return configurationMenuItems.some((item) => isActive(item.path));
      case "patient":
        return patientMenuItems.some((item) => isActive(item.path));
      case "claims":
        return claimsMenuItems.some((item) => isActive(item.path));
      case "eob-upload":
        return isActive("/eob-upload");
      case "icd-10-search":
        return isActive("/icd-10-search");
      case "excel-access":
        return isActive("/excel-access");
      case "reports":
        return isActive("/reports");
      case "documents":
        return isActive("/documents");
      case "userManagement":
        return false; // Add user management paths if needed
      default:
        return false;
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const isExpanded = isHovered || !isCollapsed;
  const currentWidth = isExpanded ? expandedWidth : collapsedWidth;

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
      path: "/claims/pre-billing",
      badge: null,
    },
    {
      text: "Post Billing Claim",
      icon: <PostBillingClaim width={18} height={18} color="currentColor" />,
      path: "/claims/post-billing",
      badge: null,
    },
    {
      text: "Remittance ERA/EOB",
      icon: <ERA width={18} height={18} color="currentColor" />,
      path: "/claims/remittance-era",
      badge: null,
    },
    {
      text: "Patient Statement",
      icon: <Statement width={18} height={18} color="currentColor" />,
      path: "/claims/patient-statement",
      badge: null,
    },
  ];

  const myRecentItems = [
    {
      text: "Post Billing Claim",
      icon: <PostBillingClaim width={18} height={18} color="currentColor" />,
      path: "/post-billing-claim-page",
    },
    {
      text: "ERA/EOB",
      icon: <ERA width={18} height={18} color="currentColor" />,
      path: "/era",
    },
    {
      text: "Patient Statement",
      icon: <Statement width={18} height={18} color="currentColor" />,
      path: "/statement",
    },
    {
      text: "New Payment",
      icon: <PreBillingClaim width={18} height={18} color="currentColor" />,
      path: "/new-payment",
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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        width: currentWidth,
        flexShrink: 0,
        transition: "width 0.3s ease",
        "& .MuiDrawer-paper": {
          width: currentWidth,
          boxSizing: "border-box",
          background: "linear-gradient(180deg, #1a1d2e 0%, #16192b 100%)",
          color: "#ffffff",
          borderRight: "none",
          display: "flex",
          flexDirection: "column",
          transition: "width 0.3s ease",
          fontFamily: "'Roboto', sans-serif",
          overflow: "hidden",
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
      <SidebarContext.Provider value={{ currentWidth, isExpanded }}>
        {/* Rest of sidebar content */}
      {/* Header Section */}
      <Box
        sx={{
          p: 1.5,
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          minHeight: 56,
          flexShrink: 0,
        }}
      >
        <Box
          sx={{
            width: 36,
            height: 36,
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

        {isExpanded && (
          <Typography
            variant="h6"
            sx={{
              fontWeight: 500,
              fontSize: 16,
              letterSpacing: 0.5,
              fontFamily: "'Roboto', sans-serif",
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ color: "#FFFFFF" }}>Tia</span>
            <span style={{ color: "#44CDD9" }}>STAT</span>
          </Typography>
        )}
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
              onClick={() => isExpanded && toggleSection("command")}
              sx={{
                py: 1.5,
                px: 2,
                justifyContent: isExpanded ? "flex-start" : "center",
                backgroundColor: !isExpanded && isSectionActive("command") 
                  ? "rgba(0, 212, 255, 0.15)" 
                  : "transparent",
                position: "relative",
                "&::before": !isExpanded && isSectionActive("command") ? {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: "3px",
                  backgroundColor: "#00d4ff",
                } : {},
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                },
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: !isExpanded && isSectionActive("command")
                    ? "#00d4ff"
                    : "rgba(255, 255, 255, 0.5)",
                  fontWeight: 600,
                  letterSpacing: 1,
                  flex: 1,
                  fontSize: "11px",
                  fontFamily: "'Roboto', sans-serif",
                  display: isExpanded ? "block" : "none",
                }}
              >
                COMMAND
              </Typography>
              {!isExpanded && (
                <HandIcon 
                  width={20} 
                  height={20} 
                  color={isSectionActive("command") ? "#00d4ff" : "rgba(255, 255, 255, 0.7)"} 
                />
              )}
              {isExpanded && (
                expandedSections.command ? (
                  <Remove
                    fontSize="small"
                    sx={{ color: "rgba(255, 255, 255, 0.5)" }}
                  />
                ) : (
                  <Add
                    fontSize="small"
                    sx={{ color: "rgba(255, 255, 255, 0.5)" }}
                  />
                )
              )}
            </ListItemButton>
          </ListItem>
          <Collapse in={expandedSections.command && isExpanded} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {commandMenuItems.map((item) => (
                <ListItem key={item.path} disablePadding>
                  <ListItemButton
                    onClick={() => handleNavigation(item.path)}
                    selected={isActive(item.path)}
                    sx={{
                      pl: isExpanded ? 2 : 0,
                      pr: 0.5,
                      py: 1.2,
                      justifyContent: isExpanded ? "flex-start" : "center",
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
                        minWidth: isExpanded ? 36 : "auto",
                        justifyContent: "center",
                        color: isActive(item.path)
                          ? "#00d4ff"
                          : "rgba(255, 255, 255, 0.7)",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    {isExpanded && (
                      <>
                        <ListItemText
                          primary={item.text}
                          sx={{ minWidth: 0, mr: item.badge ? 0.5 : 0 }}
                          primaryTypographyProps={{
                            noWrap: true,
                            fontSize: 13,
                            fontWeight: isActive(item.path) ? 500 : 400,
                            fontFamily: "'Roboto', sans-serif",
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
                              minWidth: 20,
                              borderRadius: "50%",
                              fontSize: 11,
                              fontWeight: 700,
                              fontFamily: "'Roboto', sans-serif",
                              flexShrink: 0,
                              backgroundColor:
                                item.badge.color === "warning"
                                  ? "#F59E0B"
                                  : "#FF6B6B",
                              color: "#000000",
                              "& .MuiChip-label": {
                                px: 0.5,
                              },
                            }}
                          />
                        )}
                      </>
                    )}
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Collapse>

          {/* ENCOUNTERS Section */}
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => handleNavigation("/encounters")}
              selected={isActive("/encounters")}
              sx={{
                py: 1.5,
                px: 2,
                justifyContent: isExpanded ? "flex-start" : "center",
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
              {!isExpanded && (
                <ListCheckIcon 
                  width={20} 
                  height={20} 
                  color={isActive("/encounters") ? "#00d4ff" : "rgba(255, 255, 255, 0.7)"} 
                />
              )}
              {isExpanded && (
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
                    fontFamily: "'Roboto', sans-serif",
                  }}
                >
                  ENCOUNTERS
                </Typography>
              )}
            </ListItemButton>
          </ListItem>

          {/* CONFIGURATION Section */}
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => isExpanded && toggleSection("configuration")}
              sx={{
                py: 1.5,
                px: 2,
                justifyContent: isExpanded ? "flex-start" : "center",
                backgroundColor: !isExpanded && isSectionActive("configuration") 
                  ? "rgba(0, 212, 255, 0.15)" 
                  : "transparent",
                position: "relative",
                "&::before": !isExpanded && isSectionActive("configuration") ? {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: "3px",
                  backgroundColor: "#00d4ff",
                } : {},
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                },
              }}
            >
              {!isExpanded && (
                <ReferringProvider 
                  width={20} 
                  height={20} 
                  color={isSectionActive("configuration") ? "#00d4ff" : "rgba(255, 255, 255, 0.7)"} 
                />
              )}
              {isExpanded && (
                <>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "rgba(255, 255, 255, 0.5)",
                      fontWeight: 600,
                      letterSpacing: 1,
                      flex: 1,
                      fontSize: "11px",
                      fontFamily: "'Roboto', sans-serif",
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
                </>
              )}
            </ListItemButton>
          </ListItem>

          <Collapse
            in={expandedSections.configuration && isExpanded}
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
                        fontFamily: "'Roboto', sans-serif",
                        color: isActive(item.path)
                          ? "#00d4ff"
                          : "rgba(255, 255, 255, 0.7)",
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
              onClick={() => isExpanded && toggleSection("patient")}
              sx={{
                py: 1.5,
                px: 2,
                justifyContent: isExpanded ? "flex-start" : "center",
                backgroundColor: !isExpanded && isSectionActive("patient") 
                  ? "rgba(0, 212, 255, 0.15)" 
                  : "transparent",
                position: "relative",
                "&::before": !isExpanded && isSectionActive("patient") ? {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: "3px",
                  backgroundColor: "#00d4ff",
                } : {},
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                },
              }}
            >
              {!isExpanded && (
                <AddPatient 
                  width={20} 
                  height={20} 
                  color={isSectionActive("patient") ? "#00d4ff" : "rgba(255, 255, 255, 0.7)"} 
                />
              )}
              {isExpanded && (
                <>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "rgba(255, 255, 255, 0.5)",
                      fontWeight: 600,
                      letterSpacing: 1,
                      flex: 1,
                      fontSize: "11px",
                      fontFamily: "'Roboto', sans-serif",
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
                </>
              )}
            </ListItemButton>
          </ListItem>
          <Collapse in={expandedSections.patient && isExpanded} timeout="auto" unmountOnExit>
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
                        fontFamily: "'Roboto', sans-serif",
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
                          minWidth: 20,
                          borderRadius: "50%",
                          fontSize: 11,
                          fontWeight: 700,
                          fontFamily: "'Roboto', sans-serif",
                          flexShrink: 0,
                          backgroundColor:
                            item.badge.color === "warning"
                              ? "#F59E0B"
                              : "#FF6B6B",
                          color: "#000000",
                          "& .MuiChip-label": {
                            px: 0.5,
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
              onClick={() => isExpanded && toggleSection("claims")}
              sx={{
                py: 1.5,
                px: 2,
                justifyContent: isExpanded ? "flex-start" : "center",
                backgroundColor: !isExpanded && isSectionActive("claims") 
                  ? "rgba(0, 212, 255, 0.15)" 
                  : "transparent",
                position: "relative",
                "&::before": !isExpanded && isSectionActive("claims") ? {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: "3px",
                  backgroundColor: "#00d4ff",
                } : {},
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                },
              }}
            >
              {!isExpanded && (
                <PreBillingClaim 
                  width={20} 
                  height={20} 
                  color={isSectionActive("claims") ? "#00d4ff" : "rgba(255, 255, 255, 0.7)"} 
                />
              )}
              {isExpanded && (
                <>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "rgba(255, 255, 255, 0.5)",
                      fontWeight: 600,
                      letterSpacing: 1,
                      flex: 1,
                      fontSize: "11px",
                      fontFamily: "'Roboto', sans-serif",
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
                </>
              )}
            </ListItemButton>
          </ListItem>
          <Collapse in={expandedSections.claims && isExpanded} timeout="auto" unmountOnExit>
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
                        fontFamily: "'Roboto', sans-serif",
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
                          minWidth: 20,
                          borderRadius: "50%",
                          fontSize: 11,
                          fontWeight: 700,
                          fontFamily: "'Roboto', sans-serif",
                          flexShrink: 0,
                          backgroundColor:
                            item.badge.color === "warning"
                              ? "#F59E0B"
                              : "#FF6B6B",
                          color: "#000000",
                          "& .MuiChip-label": {
                            px: 0.5,
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
                  justifyContent: isExpanded ? "flex-start" : "center",
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
                {!isExpanded && (
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {item.path === "/eob-upload" && (
                      <HandIcon 
                        width={20} 
                        height={20} 
                        color={isActive(item.path) ? "#00d4ff" : "rgba(255, 255, 255, 0.7)"} 
                      />
                    )}
                    {item.path === "/icd-10-search" && (
                      <ListCheckIcon 
                        width={20} 
                        height={20} 
                        color={isActive(item.path) ? "#00d4ff" : "rgba(255, 255, 255, 0.7)"} 
                      />
                    )}
                    {item.path === "/excel-access" && (
                      <InsuranceProvider 
                        width={20} 
                        height={20} 
                        color={isActive(item.path) ? "#00d4ff" : "rgba(255, 255, 255, 0.7)"} 
                      />
                    )}
                    {item.path === "/reports" && (
                      <Program 
                        width={20} 
                        height={20} 
                        color={isActive(item.path) ? "#00d4ff" : "rgba(255, 255, 255, 0.7)"} 
                      />
                    )}
                    {item.path === "/documents" && (
                      <Statement 
                        width={20} 
                        height={20} 
                        color={isActive(item.path) ? "#00d4ff" : "rgba(255, 255, 255, 0.7)"} 
                      />
                    )}
                  </Box>
                )}
                {isExpanded && (
                  <Typography
                    variant="caption"
                    sx={{
                      color: isActive(item.path)
                        ? "#00d4ff"
                        : "rgba(255, 255, 255, 0.5)",
                      fontWeight: 600,
                      letterSpacing: 1,
                      fontSize: "11px",
                      fontFamily: "'Roboto', sans-serif",
                    }}
                  >
                    {item.text}
                  </Typography>
                )}
              </ListItemButton>
            </ListItem>
          ))}

          {/* MY RECENTS Section - Card Style */}
          {isExpanded && recentPages.length > 0 && (
            <Box
              sx={{
                mx: 1.5,
                my: 1.5,
                mb: 2,
              }}
            >
              <Box
                sx={{
                  backgroundColor: "rgba(44, 62, 80, 0.95)",
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.25)",
                }}
              >
                <ListItemButton
                  onClick={() => toggleSection("myRecent")}
                  sx={{
                    py: 2,
                    px: 2.5,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                    },
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      color: "rgba(255, 255, 255, 0.95)",
                      fontWeight: 700,
                      letterSpacing: 1.5,
                      fontSize: "12px",
                      fontFamily: "'Roboto', sans-serif",
                    }}
                  >
                    MY RECENTS
                  </Typography>
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transform: expandedSections.myRecent
                        ? "rotate(45deg)"
                        : "rotate(0deg)",
                      transition: "transform 0.3s ease",
                    }}
                  >
                    <ArrowForwardIosOutlined
                      sx={{
                        fontSize: 14,
                        color: "rgba(255, 255, 255, 0.7)",
                      }}
                    />
                  </Box>
                </ListItemButton>

                <Collapse in={expandedSections.myRecent} timeout="auto">
                  <Box sx={{ pb: 1.5, px: 1 }}>
                    {recentPages.map((page, index) => (
                      <ListItemButton
                        key={`${page.path}-${index}`}
                        onClick={() => handleNavigation(page.path)}
                        sx={{
                          px: 2,
                          py: 1.2,
                          borderRadius: "10px",
                          mx: 0.5,
                          minHeight: "auto",
                          "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                          },
                        }}
                      >
                        <ListItemText
                          primary={page.title}
                          primaryTypographyProps={{
                            fontSize: 14,
                            fontWeight: 400,
                            fontFamily: "'Roboto', sans-serif",
                            color: "rgba(255, 255, 255, 0.8)",
                          }}
                        />
                      </ListItemButton>
                    ))}
                  </Box>
                </Collapse>
              </Box>
            </Box>
          )}

          {/* USER MANAGEMENT Section */}
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => isExpanded && toggleSection("userManagement")}
              sx={{
                py: 1.5,
                px: 2,
                justifyContent: isExpanded ? "flex-start" : "center",
                backgroundColor: !isExpanded && isSectionActive("userManagement") 
                  ? "rgba(0, 212, 255, 0.15)" 
                  : "transparent",
                position: "relative",
                "&::before": !isExpanded && isSectionActive("userManagement") ? {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: "3px",
                  backgroundColor: "#00d4ff",
                } : {},
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                },
              }}
            >
              {isExpanded && (
                <>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "rgba(255, 255, 255, 0.5)",
                      fontWeight: 600,
                      letterSpacing: 1,
                      flex: 1,
                      fontSize: "11px",
                      fontFamily: "'Roboto', sans-serif",
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
                </>
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
            p: 1.5,
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            cursor: "pointer",
            justifyContent: isExpanded ? "flex-start" : "center",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.05)",
            },
          }}
        >
          <Avatar
            sx={{
              width: 36,
              height: 36,
              borderRadius: "6px",
              backgroundColor: "#6366F1",
              fontSize: "14px",
              fontWeight: 600,
              fontFamily: "'Roboto', sans-serif",
              lineHeight: "20px",
              flexShrink: 0,
            }}
          >
            AK
          </Avatar>
          {isExpanded && (
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  fontSize: 13,
                  color: "#ffffff",
                  lineHeight: 1.2,
                  fontFamily: "'Roboto', sans-serif",
                }}
              >
                Ashok Kathayat
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  fontSize: 11,
                  color: "rgba(255, 255, 255, 0.5)",
                  lineHeight: 1.2,
                  fontFamily: "'Roboto', sans-serif",
                }}
              >
                Sr. Billing Lead
              </Typography>
            </Box>
          )}
        </Box>
        {isExpanded && (
          <>
            <ListItemButton
              sx={{
                py: 1,
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
                  fontFamily: "'Roboto', sans-serif",
                }}
              >
                CHANGE PASSWORD
              </Typography>
            </ListItemButton>
            <ListItemButton
              onClick={handleLogout}
              sx={{
                py: 1,
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
                  fontFamily: "'Roboto', sans-serif",
                }}
              >
                LOGOUT
              </Typography>
            </ListItemButton>
          </>
        )}
      </Box>
      </SidebarContext.Provider>
    </Drawer>
  );
}

export default Sidebar;
