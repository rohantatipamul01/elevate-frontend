import {
  Grid,
  Stack,
} from "@mui/material";

import CardSkeleton from "./CardSkeleton";
import ChartSkeleton from "./ChartSkeleton";

export default function AnalyticsSkeleton() {
  return (
    <Grid
      container
      spacing={3}
    >
      {/* KPI Cards */}
      {Array.from({ length: 4 }).map((_, index) => (
        <Grid
          key={index}
          size={{
            xs: 12,
            sm: 6,
            lg: 3,
          }}
        >
          <CardSkeleton
            height={170}
            lines={2}
          />
        </Grid>
      ))}

      {/* Productivity Chart */}
      <Grid
        size={{
          xs: 12,
          lg: 8,
        }}
      >
        <ChartSkeleton height={380} />
      </Grid>

      {/* Performance Gauge */}
      <Grid
        size={{
          xs: 12,
          lg: 4,
        }}
      >
        <CardSkeleton
          height={380}
          lines={4}
        />
      </Grid>

      {/* Completion Chart */}
      <Grid size={12}>
        <Stack spacing={3}>
          <ChartSkeleton height={420} />
        </Stack>
      </Grid>
    </Grid>
  );
}