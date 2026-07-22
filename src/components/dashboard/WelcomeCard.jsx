import { useNavigate } from "react-router-dom";

import {
  Avatar,
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import WavingHandRoundedIcon from "@mui/icons-material/WavingHandRounded";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";

import { useAuth } from "../../context/AuthContext";
import { useDashboard } from "../../context/DashboardContext";

export default function WelcomeCard() {
  const navigate = useNavigate();

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
        background:
          "linear-gradient(135deg,#4F46E5 0%,#6366F1 100%)",
        color: "#fff",
      }}
    >
      <Stack
        direction={{
          xs: "column",
          md: "row",
        }}
        justifyContent="space-between"
        alignItems={{
          xs: "flex-start",
          md: "center",
        }}
        spacing={4}
        sx={{
          p: 4,
        }}
      >
        <Box flex={1}>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
          >
            <WavingHandRoundedIcon />

            <Typography
              variant="h4"
              fontWeight={700}
            >
              {greeting},{" "}
              {user?.fullName || "User"} 👋
            </Typography>
          </Stack>

          <Typography
            sx={{
              mt: 2,
              opacity: .9,
            }}
          >
            Welcome back to Elevate.
            Stay focused and complete today's goals.
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            mt={3}
            flexWrap="wrap"
          >
            <Chip
              icon={
                <CalendarTodayRoundedIcon />
              }
              label={today}
              sx={{
                bgcolor:
                  "rgba(255,255,255,.15)",
                color: "#fff",
              }}
            />

            <Chip
              label={`${dashboard.completedTasks} Completed`}
              sx={{
                bgcolor:
                  "rgba(255,255,255,.15)",
                color: "#fff",
              }}
            />

            <Chip
              label={`${dashboard.pendingTasks} Pending`}
              sx={{
                bgcolor:
                  "rgba(255,255,255,.15)",
                color: "#fff",
              }}
            />
          </Stack>

          <Button
            variant="contained"
            sx={{
              mt: 4,
              bgcolor: "#fff",
              color: "#4F46E5",
              fontWeight: 700,
              "&:hover": {
                bgcolor: "#F8FAFC",
              },
            }}
            onClick={() =>
              navigate("/tasks")
            }
          >
            View Today's Tasks
          </Button>
        </Box>

        <Stack
          alignItems="center"
          spacing={2}
        >
          <Avatar
            src={user?.profileImage || ""}
            sx={{
              width: 90,
              height: 90,
              bgcolor:
                "rgba(255,255,255,.15)",
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            {initials}
          </Avatar>

          <TrendingUpRoundedIcon
            sx={{
              fontSize: 50,
              opacity: .9,
            }}
          />

          <Typography
            fontWeight={600}
          >
            Productivity
          </Typography>

          <Typography
            variant="h3"
            fontWeight={700}
          >
            {Math.round(
              dashboard.productivity
            )}
            %
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
}