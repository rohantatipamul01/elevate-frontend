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
  useTheme,
} from "@mui/material";

import { alpha } from "@mui/material/styles";

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
  const theme = useTheme();

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
          px: 3,
        }}
      >
        <TrendingUpRoundedIcon
          color="primary"
          sx={{
            fontSize: 36,
          }}
        />

        <Box>
          <Typography
            variant="h6"
            fontWeight={700}
          >
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
          flexGrow: 1,
          px: 2,
          py: 2,
        }}
      >
        {menuItems.map((item) => {
          const selected =
            location.pathname === item.path;

          return (
            <ListItemButton
              key={item.title}
              component={Link}
              to={item.path}
              selected={selected}
              onClick={onNavigate}
              sx={{
                mb: 1,
                borderRadius: 3,
                py: 1.3,
                px: 2,

                transition: "all .2s ease",

                "& .MuiListItemIcon-root": {
                  minWidth: 42,
                  color: selected
                    ? "primary.contrastText"
                    : "text.secondary",
                },

                "& .MuiListItemText-primary": {
                  fontWeight: selected ? 700 : 600,
                },

                "&.Mui-selected": {
                  bgcolor: "primary.main",
                  color: "primary.contrastText",

                  boxShadow: `0 8px 20px ${alpha(
                    theme.palette.primary.main,
                    0.30
                  )}`,
                },

                "&.Mui-selected:hover": {
                  bgcolor: "primary.dark",
                },

                "&:hover": {
                  bgcolor: "action.hover",
                  transform: "translateX(4px)",
                },
              }}
            >
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>

              <ListItemText primary={item.title} />
            </ListItemButton>
          );
        })}
      </List>

      <Divider />

      {/* Logout */}

      <Box sx={{ px: 2, py: 1.5 }}>
        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: 3,
            color: "error.main",

            "& .MuiListItemIcon-root": {
              color: "error.main",
              minWidth: 42,
            },

            "&:hover": {
              bgcolor: alpha(
                theme.palette.error.main,
                0.08
              ),
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

      {/* Motivation Card */}

      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            p: 2.5,
            borderRadius: 3,
            bgcolor: "action.hover",
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography
            variant="subtitle2"
            fontWeight={700}
            gutterBottom
          >
            Stay Consistent 🚀
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            Complete your daily tasks, maintain your habits,
            and keep building your streak every day.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}