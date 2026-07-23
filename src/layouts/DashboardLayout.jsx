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
    setMobileOpen((prev) => !prev);
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
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <CssBaseline />

      {/* Mobile App Bar */}

      {isMobile && (
        <AppBar
          position="fixed"
          elevation={0}
          color="inherit"
          sx={{
            bgcolor: "background.paper",
            color: "text.primary",
            borderBottom: `1px solid ${theme.palette.divider}`,
            backdropFilter: "blur(12px)",
          }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              variant="h6"
              fontWeight={700}
            >
              Elevate
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      {/* Desktop Drawer */}

      {!isMobile && (
        <Drawer
          variant="permanent"
          open
          sx={{
            width: drawerWidth,
            flexShrink: 0,

            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              bgcolor: "background.paper",
              borderRight: `1px solid ${theme.palette.divider}`,
            },
          }}
        >
          {drawer}
        </Drawer>
      )}

      {/* Mobile Drawer */}

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
              bgcolor: "background.paper",
            },
          }}
        >
          {drawer}
        </Drawer>
      )}

      {/* Main */}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
          bgcolor: "background.default",
          transition: "background-color .3s",
        }}
      >
        {!isMobile && <Navbar />}

        <Box
          sx={{
            p: {
              xs: 2,
              sm: 3,
              md: 4,
            },

            mt: {
              xs: 8,
              md: 10,
            },

            width: "100%",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}