import { useState } from "react";
import { Outlet } from "react-router-dom";

import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

const drawerWidth = 260;

export default function DashboardLayout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Sidebar
      onNavigate={() => {
        if (isMobile) {
          setMobileOpen(false);
        }
      }}
    />
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />

      {/* Mobile App Bar */}
      {isMobile && (
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            color: "text.primary",
            borderBottom: "1px solid #E2E8F0",
          }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" fontWeight={700}>
              Elevate
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      {/* Desktop Sidebar */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              borderRight: "1px solid #E2E8F0",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      )}

      {/* Mobile Sidebar */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            "& .MuiDrawer-paper": {
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      )}

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: "#F5F7FB",
          minHeight: "100vh",
        }}
      >
        {!isMobile && <Navbar />}

        <Box
          sx={{
            p: 4,
            mt: isMobile ? 8 : 10,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}