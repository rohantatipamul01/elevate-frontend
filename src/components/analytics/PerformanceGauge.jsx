import {
  Alert,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";

import SpeedRoundedIcon from "@mui/icons-material/SpeedRounded";

import {
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from "recharts";

import { useAnalytics } from "../../context/AnalyticsContext";

export default function PerformanceGauge() {
  const {
    analytics,
    loading,
    error,
  } = useAnalytics();

  if (loading) {
    return (
      <Card
        elevation={0}
        sx={{
          border: "1px solid #E2E8F0",
          borderRadius: 4,
          height: "100%",
        }}
      >
        <CardContent>
          <Stack
            justifyContent="center"
            alignItems="center"
            sx={{ py: 8 }}
          >
            <CircularProgress />
          </Stack>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!analytics) {
    return null;
  }

  const score = Math.max(
    0,
    Math.min(100, Number(analytics.productivityScore.toFixed(1)))
  );

  const gaugeData = [
    {
      name: "Performance",
      value: score,
      fill: "#4F46E5",
    },
  ];

  let performanceLabel = "Needs Improvement";

  if (score >= 90) {
    performanceLabel = "Excellent";
  } else if (score >= 75) {
    performanceLabel = "Very Good";
  } else if (score >= 60) {
    performanceLabel = "Good";
  } else if (score >= 40) {
    performanceLabel = "Average";
  }

  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid #E2E8F0",
        borderRadius: 4,
        height: "100%",
      }}
    >
      <CardContent>
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          mb={3}
        >
          <SpeedRoundedIcon color="primary" />

          <Typography
            variant="h6"
            fontWeight={700}
          >
            Performance Gauge
          </Typography>
        </Stack>

        <Box
          sx={{
            width: "100%",
            height: 320,
          }}
        >
          <ResponsiveContainer>
            <RadialBarChart
              innerRadius="72%"
              outerRadius="100%"
              data={gaugeData}
              startAngle={90}
              endAngle={-270}
              barSize={18}
            >
              <PolarAngleAxis
                type="number"
                domain={[0, 100]}
                angleAxisId={0}
                tick={false}
              />

              <RadialBar
                background
                dataKey="value"
                cornerRadius={12}
                animationDuration={1200}
              />
            </RadialBarChart>
          </ResponsiveContainer>
        </Box>

        <Stack
          spacing={1}
          alignItems="center"
          sx={{ mt: -5 }}
        >
          <Typography
            variant="h3"
            fontWeight={700}
            color="primary"
          >
            {score}%
          </Typography>

          <Typography
            variant="h6"
            fontWeight={600}
          >
            {performanceLabel}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="center"
            sx={{
              maxWidth: 320,
            }}
          >
            Your overall productivity score is calculated from
            task completion, reminder completion, and habit
            consistency.
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}