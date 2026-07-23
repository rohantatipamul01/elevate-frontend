import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";

import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import AnalyticsRoundedIcon from "@mui/icons-material/AnalyticsRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

import { useAuth } from "../../context/AuthContext";

const menuItems = [
  {
    title: "Dashboard",
    icon: <DashboardRoundedIcon />,
    path: "/dashboard",
  },
  {
    title: "Tasks",
    icon: <AssignmentRoundedIcon />,
    path: "/tasks",
  },
  {
    title: "Habits",
    icon: <EmojiEventsRoundedIcon />,
    path: "/habits",
  },
  {
    title: "Calendar",
    icon: <CalendarMonthRoundedIcon />,
    path: "/calendar",
  },
  {
    title: "Analytics",
    icon: <AnalyticsRoundedIcon />,
    path: "/analytics",
  },
  {
    title: "Profile",
    icon: <PersonRoundedIcon />,
    path: "/profile",
  },
  {
    title: "Settings",
    icon: <SettingsRoundedIcon />,
    path: "/settings",
  },
];

export default function Sidebar({ onNavigate }) {
  const location = useLocation();
  const navigate = useNavigate();

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();

    if (onNavigate) {
      onNavigate();
    }

    navigate("/", { replace: true });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        bgcolor: "background.paper",
      }}
    >
      {/* Logo */}
      <Toolbar
        sx={{
          minHeight: 72,
          display: "flex",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <TrendingUpRoundedIcon
          color="primary"
          sx={{
            fontSize: 34,
          }}
        />

        <Box>
          <Typography variant="h6" fontWeight={700}>
            Elevate
          </Typography>

          <Typography
            variant="caption"
            color="text.secondary"
          >
            Productivity Suite
          </Typography>
        </Box>
      </Toolbar>

      <Divider />

      {/* Navigation */}
      <List
        sx={{
          px: 2,
          py: 2,
          flexGrow: 1,
        }}
      >
        {menuItems.map((item) => (
          <ListItemButton
            key={item.title}
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
            onClick={onNavigate}
            sx={{
              mb: 1,
              py: 1.2,
              borderRadius: 2,

              "& .MuiListItemIcon-root": {
                minWidth: 42,
              },

              "&.Mui-selected": {
                bgcolor: "primary.main",
                color: "primary.contrastText",
              },

              "&.Mui-selected:hover": {
                bgcolor: "primary.dark",
              },

              "&.Mui-selected .MuiListItemIcon-root": {
                color: "primary.contrastText",
              },

              "&:hover": {
                bgcolor: "action.hover",
              },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>

            <ListItemText
              primary={item.title}
              primaryTypographyProps={{
                fontWeight: 600,
              }}
            />
          </ListItemButton>
        ))}
      </List>

      <Divider />

      {/* Logout */}
      <Box sx={{ px: 2, py: 1 }}>
        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: 2,
            color: "error.main",

            "& .MuiListItemIcon-root": {
              color: "error.main",
              minWidth: 42,
            },

            "&:hover": {
              bgcolor: "error.lighter",
            },
          }}
        >
          <ListItemIcon>
            <LogoutRoundedIcon />
          </ListItemIcon>

          <ListItemText
            primary="Logout"
            primaryTypographyProps={{
              fontWeight: 600,
            }}
          />
        </ListItemButton>
      </Box>

      <Divider />

      {/* Bottom Card */}
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            bgcolor: "action.hover",
            borderRadius: 3,
            p: 2,
          }}
        >
          <Typography
            variant="subtitle2"
            fontWeight={700}
          >
            Stay Consistent 🚀
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 1 }}
          >
            Complete your daily tasks and build your streak every day.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}