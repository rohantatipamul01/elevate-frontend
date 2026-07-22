import {
  Box,
  Grid,
  Typography,
} from "@mui/material";

import KPISection from "../components/analytics/KPISection";
import ProductivityChart from "../components/analytics/ProductivityChart";
import CompletionPieChart from "../components/analytics/CompletionPieChart";
import PerformanceGauge from "../components/analytics/PerformanceGauge";

export default function Analytics() {
  return (
    <Box>
      <Typography
        variant="h4"
        fontWeight={700}
        mb={1}
      >
        Analytics
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        mb={4}
      >
        Monitor your productivity, task completion,
        reminders, and overall performance from one place.
      </Typography>

      <Grid
        container
        spacing={3}
      >
        {/* KPI Cards */}
        <Grid size={12}>
          <KPISection />
        </Grid>

        {/* Productivity */}
        <Grid
          size={{
            xs: 12,
            lg: 8,
          }}
        >
          <ProductivityChart />
        </Grid>

        {/* Performance */}
        <Grid
          size={{
            xs: 12,
            lg: 4,
          }}
        >
          <PerformanceGauge />
        </Grid>

        {/* Completion */}
        <Grid size={12}>
          <CompletionPieChart />
        </Grid>
      </Grid>
    </Box>
  );
}