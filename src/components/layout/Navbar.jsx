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

export default function Navbar() {
  const navigate = useNavigate();

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
        .map((name) => name[0])
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
        ml: { md: "260px" },
        width: {
          md: "calc(100% - 260px)",
        },
        bgcolor: "background.paper",
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          gap: 3,
        }}
      >
        {/* Left */}

        <Box>
          <Typography
            variant="h5"
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
          spacing={2}
          alignItems="center"
        >
          {/* Search */}

          <Paper
            elevation={0}
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },
              alignItems: "center",
              px: 2,
              py: 0.5,
              width: 300,
              border: 1,
              borderColor: "divider",
              borderRadius: 3,
            }}
          >
            <SearchRoundedIcon
              color="action"
            />

            <InputBase
              placeholder="Search..."
              sx={{
                ml: 1,
                flex: 1,
              }}
            />
          </Paper>

          {/* Dark Mode */}

          <IconButton
            onClick={toggleColorMode}
          >
            {mode === "light" ? (
              <DarkModeRoundedIcon />
            ) : (
              <LightModeRoundedIcon />
            )}
          </IconButton>

          {/* Notification */}

          <IconButton>
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
            sx={{
              cursor: "pointer",
            }}
            onClick={handleMenuOpen}
          >
            <Avatar
              src={user?.profileImage || ""}
              sx={{
                bgcolor: "primary.main",
                width: 42,
                height: 42,
              }}
            >
              {initials}
            </Avatar>

            <Box
              sx={{
                display: {
                  xs: "none",
                  sm: "block",
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

            <KeyboardArrowDownRoundedIcon />
          </Stack>

          {/* Menu */}

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
          >
            <MenuItem
              onClick={() => {
                navigate("/profile");
                handleMenuClose();
              }}
            >
              <PersonRoundedIcon
                sx={{ mr: 1 }}
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
                sx={{ mr: 1 }}
                fontSize="small"
              />
              Settings
            </MenuItem>

            <Divider />

            <MenuItem
              onClick={handleLogout}
            >
              <LogoutRoundedIcon
                sx={{ mr: 1 }}
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