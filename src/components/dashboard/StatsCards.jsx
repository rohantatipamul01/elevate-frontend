import {
  Alert,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

import AssignmentTurnedInRoundedIcon from "@mui/icons-material/AssignmentTurnedInRounded";
import LocalFireDepartmentRoundedIcon from "@mui/icons-material/LocalFireDepartmentRounded";
import PendingActionsRoundedIcon from "@mui/icons-material/PendingActionsRounded";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";

import { useDashboard } from "../../context/DashboardContext";

export default function StatsCards() {
  const theme = useTheme();

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
    return <Alert severity="error">{error}</Alert>;
  }

  const stats = [
    {
      title: "Completed Tasks",
      value: dashboard.completedTasks,
      subtitle: `${dashboard.completedTasks} completed`,
      icon: <AssignmentTurnedInRoundedIcon />,
      color: "#22C55E",
    },
    {
      title: "Current Streak",
      value: `${dashboard.streak} Days`,
      subtitle: "Keep it going!",
      icon: <LocalFireDepartmentRoundedIcon />,
      color: "#F97316",
    },
    {
      title: "Pending Tasks",
      value: dashboard.pendingTasks,
      subtitle: `${dashboard.dueToday} due today`,
      icon: <PendingActionsRoundedIcon />,
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
      icon: <EmojiEventsRoundedIcon />,
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
              height: "100%",
              borderRadius: 4,
              border: `1px solid ${theme.palette.divider}`,
              bgcolor: "background.paper",
              transition: "all .25s",

              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: theme.shadows[6],
              },
            }}
          >
            <CardContent
              sx={{
                p: {
                  xs: 2,
                  md: 3,
                },
              }}
            >
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
                    fontWeight={700}
                    sx={{
                      fontSize: {
                        xs: "1.7rem",
                        sm: "2rem",
                        md: "2.3rem",
                      },
                    }}
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
                    width: {
                      xs: 52,
                      md: 64,
                    },
                    height: {
                      xs: 52,
                      md: 64,
                    },
                    borderRadius: "50%",
                    bgcolor: `${item.color}15`,
                    color: item.color,

                    "& svg": {
                      fontSize: {
                        xs: 28,
                        md: 34,
                      },
                    },
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