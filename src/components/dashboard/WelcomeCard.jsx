import { useNavigate } from "react-router-dom";

import {
  Avatar,
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import WavingHandRoundedIcon from "@mui/icons-material/WavingHandRounded";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";

import { useAuth } from "../../context/AuthContext";
import { useDashboard } from "../../context/DashboardContext";

export default function WelcomeCard() {
  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { user } = useAuth();
  const { dashboard } = useDashboard();

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 18) {
    greeting = "Good Afternoon";
  }

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const initials = user?.fullName
    ? user.fullName
        .split(" ")
        .map((name) => name[0])
        .join("")
        .substring(0, 2)
        .toUpperCase()
    : "U";

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 4,
        overflow: "hidden",
        background: "linear-gradient(135deg,#4F46E5 0%,#6366F1 100%)",
        color: "#fff",
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "stretch", md: "center" }}
        spacing={{ xs: 3, md: 4 }}
        sx={{
          p: {
            xs: 2,
            sm: 3,
            md: 4,
          },
        }}
      >
        {/* Left Section */}
        <Box flex={1}>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            flexWrap="wrap"
            useFlexGap
          >
            <WavingHandRoundedIcon />

            <Typography
              fontWeight={700}
              sx={{
                fontSize: {
                  xs: "1.45rem",
                  sm: "1.9rem",
                  md: "2.3rem",
                },
                lineHeight: 1.2,
              }}
            >
              {greeting}, {user?.fullName || "User"} 👋
            </Typography>
          </Stack>

          <Typography
            sx={{
              mt: 2,
              opacity: 0.9,
              maxWidth: 650,
              fontSize: {
                xs: 14,
                sm: 16,
              },
            }}
          >
            Welcome back to Elevate.
            Stay focused and complete today's goals.
          </Typography>

          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            flexWrap="wrap"
            sx={{
              mt: 3,
            }}
          >
            <Chip
              icon={<CalendarTodayRoundedIcon />}
              label={today}
              sx={{
                bgcolor: "rgba(255,255,255,.18)",
                color: "#fff",
              }}
            />

            <Chip
              label={`${dashboard.completedTasks} Completed`}
              sx={{
                bgcolor: "rgba(255,255,255,.18)",
                color: "#fff",
              }}
            />

            <Chip
              label={`${dashboard.pendingTasks} Pending`}
              sx={{
                bgcolor: "rgba(255,255,255,.18)",
                color: "#fff",
              }}
            />
          </Stack>

          <Button
            variant="contained"
            fullWidth={isMobile}
            sx={{
              mt: 3,
              bgcolor: "#fff",
              color: "#4F46E5",
              fontWeight: 700,
              py: 1.2,
              "&:hover": {
                bgcolor: "#F8FAFC",
              },
            }}
            onClick={() => navigate("/tasks")}
          >
            View Today's Tasks
          </Button>
        </Box>

        {/* Right Section */}
        <Stack
          alignItems="center"
          spacing={1}
          sx={{
            minWidth: {
              md: 180,
            },
          }}
        >
          <Avatar
            src={user?.profileImage || ""}
            sx={{
              width: {
                xs: 70,
                sm: 80,
                md: 90,
              },
              height: {
                xs: 70,
                sm: 80,
                md: 90,
              },
              bgcolor: "rgba(255,255,255,.18)",
              fontSize: {
                xs: 24,
                md: 30,
              },
              fontWeight: 700,
            }}
          >
            {initials}
          </Avatar>

          <TrendingUpRoundedIcon
            sx={{
              fontSize: {
                xs: 36,
                md: 48,
              },
              opacity: 0.9,
            }}
          />

          <Typography
            fontWeight={600}
            sx={{
              fontSize: {
                xs: 14,
                md: 16,
              },
            }}
          >
            Productivity
          </Typography>

          <Typography
            fontWeight={700}
            sx={{
              fontSize: {
                xs: "2rem",
                sm: "2.4rem",
                md: "3rem",
              },
            }}
          >
            {Math.round(dashboard.productivity)}%
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
}