import {
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Stack,
  Typography,
  Box,
} from "@mui/material";

import AssignmentTurnedInRoundedIcon from "@mui/icons-material/AssignmentTurnedInRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import LocalFireDepartmentRoundedIcon from "@mui/icons-material/LocalFireDepartmentRounded";

import { useAnalytics } from "../../context/AnalyticsContext";

function KPICard({
  title,
  value,
  subtitle,
  color,
  icon,
}) {
  return (
    <Card
      elevation={2}
      sx={{
        height: "100%",
        borderRadius: 4,
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 8,
        },
      }}
    >
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Typography
              variant="body2"
              color="text.secondary"
              gutterBottom
            >
              {title}
            </Typography>

            <Typography
              variant="h4"
              fontWeight={700}
            >
              {value}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              mt={1}
            >
              {subtitle}
            </Typography>
          </Box>

          <Box
            sx={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: `${color}.light`,
            }}
          >
            {icon}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default function KPISection() {
  const {
    analytics,
    loading,
    error,
  } = useAnalytics();

  if (loading) {
    return (
      <Box
        py={8}
        display="flex"
        justifyContent="center"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography
        color="error"
        align="center"
      >
        {error}
      </Typography>
    );
  }

  if (!analytics) {
    return null;
  }

  return (
    <Grid
      container
      spacing={3}
    >
      <Grid
        item
        xs={12}
        sm={6}
        lg={3}
      >
        <KPICard
          title="Total Tasks"
          value={analytics.totalTasks}
          subtitle={`${analytics.completedTasks} Completed`}
          color="primary"
          icon={
            <AssignmentTurnedInRoundedIcon
              color="primary"
              fontSize="large"
            />
          }
        />
      </Grid>

      <Grid
        item
        xs={12}
        sm={6}
        lg={3}
      >
        <KPICard
          title="Productivity"
          value={`${analytics.productivityScore.toFixed(1)}%`}
          subtitle="Overall Score"
          color="success"
          icon={
            <TrendingUpRoundedIcon
              color="success"
              fontSize="large"
            />
          }
        />
      </Grid>

      <Grid
        item
        xs={12}
        sm={6}
        lg={3}
      >
        <KPICard
          title="Active Habits"
          value={analytics.activeHabits}
          subtitle={`${analytics.totalHabits} Total Habits`}
          color="warning"
          icon={
            <LocalFireDepartmentRoundedIcon
              color="warning"
              fontSize="large"
            />
          }
        />
      </Grid>

      <Grid
        item
        xs={12}
        sm={6}
        lg={3}
      >
        <KPICard
          title="Reminders"
          value={analytics.totalReminders}
          subtitle={`${analytics.completedReminders} Completed`}
          color="secondary"
          icon={
            <NotificationsActiveRoundedIcon
              color="secondary"
              fontSize="large"
            />
          }
        />
      </Grid>
    </Grid>
  );
}