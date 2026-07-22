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
    <Box>
      <Grid container spacing={3}>
        {/* Welcome */}
        <Grid size={12}>
          <WelcomeCard />
        </Grid>

        {/* KPI Cards */}
        <Grid size={12}>
          <StatsCards />
        </Grid>

        {/* Tasks & Habits */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <TaskListCard />
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <HabitCard />
        </Grid>

        {/* Productivity Chart */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <ProductivityChart />
        </Grid>

        {/* Upcoming Reminders */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <ReminderCard />
        </Grid>

        {/* Recent Activity */}
        <Grid size={12}>
          <RecentActivity />
        </Grid>
      </Grid>
    </Box>
  );
}