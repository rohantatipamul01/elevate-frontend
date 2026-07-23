import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Divider,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";

import { useAuth } from "../../context/AuthContext";
import { useColorMode } from "../../context/ColorModeContext";

const drawerWidth = 260;

export default function Navbar() {
  const navigate = useNavigate();

  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));

  const { user, logout } = useAuth();
  const { mode, toggleColorMode } = useColorMode();

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate("/", { replace: true });
  };

  const initials = user?.fullName
    ? user.fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .substring(0, 2)
        .toUpperCase()
    : "U";

  return (
    <AppBar
      position="fixed"
      elevation={0}
      color="inherit"
      sx={{
        ml: { md: `${drawerWidth}px` },
        width: {
          md: `calc(100% - ${drawerWidth}px)`,
        },
        bgcolor: "background.paper",
        borderBottom: `1px solid ${theme.palette.divider}`,
        backdropFilter: "blur(12px)",
        transition: "all .25s ease",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          gap: 2,
          minHeight: 72,
        }}
      >
        {/* Left */}

        <Box>
          <Typography
            variant={isTablet ? "h6" : "h5"}
            fontWeight={700}
          >
            Welcome back 👋
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            {user?.fullName || "User"}
          </Typography>
        </Box>

        {/* Right */}

        <Stack
          direction="row"
          spacing={1.5}
          alignItems="center"
        >
          {/* Search */}

          <Paper
            elevation={0}
            sx={{
              display: {
                xs: "none",
                lg: "flex",
              },
              alignItems: "center",
              px: 2,
              py: 0.6,
              width: 320,
              bgcolor: "background.default",
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 3,
            }}
          >
            <SearchRoundedIcon
              color="action"
              fontSize="small"
            />

            <InputBase
              placeholder="Search tasks..."
              sx={{
                ml: 1,
                flex: 1,
              }}
            />
          </Paper>

          {/* Theme */}

          <IconButton
            color="inherit"
            onClick={toggleColorMode}
            sx={{
              bgcolor: "action.hover",
              "&:hover": {
                bgcolor: "action.selected",
              },
            }}
          >
            {mode === "light" ? (
              <DarkModeRoundedIcon />
            ) : (
              <LightModeRoundedIcon />
            )}
          </IconButton>

          {/* Notifications */}

          <IconButton
            color="inherit"
            sx={{
              bgcolor: "action.hover",
              "&:hover": {
                bgcolor: "action.selected",
              },
            }}
          >
            <Badge
              badgeContent={3}
              color="error"
            >
              <NotificationsRoundedIcon />
            </Badge>
          </IconButton>

          {/* User */}

          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            onClick={handleMenuOpen}
            sx={{
              cursor: "pointer",
              borderRadius: 3,
              px: 1,
              py: 0.5,
              transition: ".2s",
              "&:hover": {
                bgcolor: "action.hover",
              },
            }}
          >
            <Avatar
              src={user?.profileImage || ""}
              sx={{
                width: 42,
                height: 42,
                bgcolor: "primary.main",
                fontWeight: 700,
              }}
            >
              {initials}
            </Avatar>

            <Box
              sx={{
                display: {
                  xs: "none",
                  md: "block",
                },
              }}
            >
              <Typography
                fontWeight={600}
                lineHeight={1.2}
              >
                {user?.fullName || "User"}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                @{user?.username || "username"}
              </Typography>
            </Box>

            <KeyboardArrowDownRoundedIcon
              sx={{
                display: {
                  xs: "none",
                  md: "block",
                },
              }}
            />
          </Stack>

          {/* User Menu */}

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            PaperProps={{
              sx: {
                mt: 1,
                borderRadius: 3,
                minWidth: 200,
              },
            }}
          >
            <MenuItem
              onClick={() => {
                navigate("/profile");
                handleMenuClose();
              }}
            >
              <PersonRoundedIcon
                sx={{ mr: 1.5 }}
                fontSize="small"
              />
              Profile
            </MenuItem>

            <MenuItem
              onClick={() => {
                navigate("/settings");
                handleMenuClose();
              }}
            >
              <SettingsRoundedIcon
                sx={{ mr: 1.5 }}
                fontSize="small"
              />
              Settings
            </MenuItem>

            <Divider />

            <MenuItem onClick={handleLogout}>
              <LogoutRoundedIcon
                sx={{ mr: 1.5 }}
                fontSize="small"
              />
              Logout
            </MenuItem>
          </Menu>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}