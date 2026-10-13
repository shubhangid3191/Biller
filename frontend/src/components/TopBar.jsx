import {
  AppBar,
  Toolbar,
  Box,
  InputBase,
  IconButton,
  Button,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { StarIcon, EditIcon, Bell, TiaChatIcon } from "../assets/Assets";
import { useSidebar } from "./Sidebar";

function TopBar() {
  const sidebarContext = useSidebar();
  const sidebarWidth = sidebarContext?.currentWidth || 70;

  return (
    <AppBar
      position="fixed"
      sx={{
        left: `${sidebarWidth}px`,
        right: 0,
        width: `calc(100% - ${sidebarWidth}px)`,
        backgroundColor: "#ffffff",
        boxShadow: "0 1px 4px rgba(0, 0, 0, 0.08)",
        borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        transition: "left 0.3s ease, width 0.3s ease",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          py: 0.5,
          minHeight: "42px !important",
        }}
      >
        {/* Search Bar */}
        <Box
          sx={{
            position: "relative",
            borderRadius: "6px",
            backgroundColor: "#f9fafb",
            border: "1px solid #e5e7eb",
            transition: "all 0.2s ease",
            "&:hover": {
              borderColor: "#0066ff",
            },
            "&:focus-within": {
              backgroundColor: "#ffffff",
              borderColor: "#0066ff",
            },
            flexGrow: 1,
            maxWidth: 500,
            mr: 2,
          }}
        >
          <Box
            sx={{
              padding: "0 10px",
              height: "100%",
              position: "absolute",
              pointerEvents: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <StarIcon width={14} height={14} color="rgba(0, 0, 0, 0.54)" />
          </Box>
          <InputBase
            placeholder='Ask anything — "show denied claims over $500 from BCBSM"'
            sx={{
              color: "rgba(0, 0, 0, 0.87)",
              width: "100%",
              fontFamily: "'Roboto', sans-serif",
              "& .MuiInputBase-input": {
                padding: "6px 36px 6px 0",
                paddingLeft: `calc(1em + 24px)`,
                fontSize: 12,
                "&::placeholder": {
                  color: "rgba(0, 0, 0, 0.5)",
                  opacity: 1,
                },
              },
            }}
          />
        </Box>

        {/* Right Side Icons */}
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 0.75, flexShrink: 0 }}
        >
          {/* Edit Icon */}

          <IconButton
            size="small"
            sx={{
              color: "rgba(0, 0, 0, 0.54)",
              p: 0.4,
              "&:hover": {
                backgroundColor: alpha("#000", 0.04),
              },
            }}
          >
            <EditIcon width={14} height={14} color="rgba(0, 0, 0, 0.54)" />
          </IconButton>

          {/* Notification Bell */}

          <IconButton
            size="small"
            sx={{
              color: "rgba(0, 0, 0, 0.54)",
              p: 0.4,
              "&:hover": {
                backgroundColor: alpha("#000", 0.04),
              },
            }}
          >
            <Bell width={13} height={14} color="rgba(0, 0, 0, 0.54)" />
          </IconButton>

          {/* TiaChat Button */}
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#0066ff",
              color: "#ffffff",
              textTransform: "none",
              fontWeight: 500,
              fontFamily: "'Roboto', sans-serif",
              px: 1.75,
              py: 0.5,
              borderRadius: 1.5,
              gap: 0.5,
              fontSize: 12,
              whiteSpace: "nowrap",
              boxShadow: "none",
              minHeight: 28,
              "&:hover": {
                backgroundColor: "#0052cc",
                boxShadow: "none",
              },
            }}
          >
            <TiaChatIcon color="#fff" width={18} height={18} />
            TIAChat
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
