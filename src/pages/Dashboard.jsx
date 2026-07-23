import { Box, Grid } from "@mui/material";

import WelcomeCard from "../components/dashboard/WelcomeCard";
import StatsCards from "../components/dashboard/StatsCards";
import TaskListCard from "../components/dashboard/TaskListCard";
import HabitCard from "../components/dashboard/HabitCard";
import ReminderCard from "../components/dashboard/ReminderCard";
import ProductivityChart from "../components/dashboard/ProductivityChart";
import RecentActivity from "../components/dashboard/RecentActivity";

export default function Dashboard() {
  return (
    <Box
      sx={{
        width: "100%",
        p: {
          xs: 2,
          sm: 3,
          md: 4,
        },
      }}
    >
      <Grid container spacing={3}>
        {/* Welcome */}
        <Grid size={{ xs: 12 }}>
          <WelcomeCard />
        </Grid>

        {/* KPI Cards */}
        <Grid size={{ xs: 12 }}>
          <StatsCards />
        </Grid>

        {/* Tasks */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <TaskListCard />
        </Grid>

        {/* Habits */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <HabitCard />
        </Grid>

        {/* Chart */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <ProductivityChart />
        </Grid>

        {/* Reminders */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <ReminderCard />
        </Grid>

        {/* Activity */}
        <Grid size={{ xs: 12 }}>
          <RecentActivity />
        </Grid>
      </Grid>
    </Box>
  );
}