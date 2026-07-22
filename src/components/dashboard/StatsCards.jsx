import {
  Alert,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import AssignmentTurnedInRoundedIcon from "@mui/icons-material/AssignmentTurnedInRounded";
import LocalFireDepartmentRoundedIcon from "@mui/icons-material/LocalFireDepartmentRounded";
import PendingActionsRoundedIcon from "@mui/icons-material/PendingActionsRounded";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";

import { useDashboard } from "../../context/DashboardContext";

export default function StatsCards() {

  const {
    dashboard,
    loading,
    error,
  } = useDashboard();

  if (loading) {
    return (
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{ py: 6 }}
      >
        <CircularProgress />
      </Stack>
    );
  }

  if (error) {
    return (
      <Alert severity="error">
        {error}
      </Alert>
    );
  }

  const stats = [
    {
      title: "Completed Tasks",
      value: dashboard.completedTasks,
      subtitle: `${dashboard.completedTasks} completed`,
      icon: <AssignmentTurnedInRoundedIcon fontSize="large" />,
      color: "#22C55E",
    },
    {
      title: "Current Streak",
      value: `${dashboard.streak} Days`,
      subtitle: "Keep it going!",
      icon: <LocalFireDepartmentRoundedIcon fontSize="large" />,
      color: "#F97316",
    },
    {
      title: "Pending Tasks",
      value: dashboard.pendingTasks,
      subtitle: `${dashboard.dueToday} due today`,
      icon: <PendingActionsRoundedIcon fontSize="large" />,
      color: "#F59E0B",
    },
    {
      title: "Productivity",
      value: `${Math.round(dashboard.productivity)}%`,
      subtitle:
        dashboard.productivity >= 80
          ? "Excellent"
          : dashboard.productivity >= 60
          ? "Good"
          : dashboard.productivity >= 40
          ? "Average"
          : "Needs Improvement",
      icon: <EmojiEventsRoundedIcon fontSize="large" />,
      color: "#4F46E5",
    },
  ];

  return (
    <Grid container spacing={3}>
      {stats.map((item) => (
        <Grid
          key={item.title}
          size={{ xs: 12, sm: 6, lg: 3 }}
        >
          <Card
            elevation={0}
            sx={{
              border: "1px solid #E2E8F0",
              borderRadius: 4,
              transition: "all .25s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow:
                  "0 12px 24px rgba(15,23,42,0.08)",
              },
            }}
          >
            <CardContent>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Stack spacing={1}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    {item.title}
                  </Typography>

                  <Typography
                    variant="h4"
                    fontWeight={700}
                  >
                    {item.value}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: item.color,
                      fontWeight: 600,
                    }}
                  >
                    {item.subtitle}
                  </Typography>
                </Stack>

                <Stack
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    backgroundColor: `${item.color}15`,
                    color: item.color,
                  }}
                >
                  {item.icon}
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}