import {
  Alert,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";

import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts";

import { useAnalytics } from "../../context/AnalyticsContext";

export default function ProductivityChart() {
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
    return (
      <Alert severity="error">
        {error}
      </Alert>
    );
  }

  if (!analytics) {
    return null;
  }

  const chartData = [
    {
      name: "Productivity",
      value: Number(analytics.productivityScore.toFixed(1)),
      color: "#4F46E5",
    },
    {
      name: "Tasks",
      value: Number(analytics.taskCompletionRate.toFixed(1)),
      color: "#22C55E",
    },
    {
      name: "Reminders",
      value: Number(analytics.reminderCompletionRate.toFixed(1)),
      color: "#F59E0B",
    },
  ];

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
          <TrendingUpRoundedIcon color="primary" />

          <Typography
            variant="h6"
            fontWeight={700}
          >
            Productivity Overview
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ ml: "auto" }}
          >
            {analytics.productivityScore.toFixed(1)}%
          </Typography>
        </Stack>

        <ResponsiveContainer
          width="100%"
          height={320}
        >
          <BarChart
            data={chartData}
            margin={{
              top: 10,
              right: 20,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis domain={[0, 100]} />

            <Tooltip
              formatter={(value) => [`${value}%`, "Score"]}
            />

            <Bar
              dataKey="value"
              radius={[10, 10, 0, 0]}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={entry.color}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}