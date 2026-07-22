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
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useDashboard } from "../../context/DashboardContext";

export default function ProductivityChart() {
  const {
    dashboard,
    loading,
    error,
  } = useDashboard();

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

  const productivityData = [
    { day: "Mon", productivity: dashboard.productivity },
    { day: "Tue", productivity: dashboard.productivity },
    { day: "Wed", productivity: dashboard.productivity },
    { day: "Thu", productivity: dashboard.productivity },
    { day: "Fri", productivity: dashboard.productivity },
    { day: "Sat", productivity: dashboard.productivity },
    { day: "Sun", productivity: dashboard.productivity },
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
            Productivity
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ ml: "auto" }}
          >
            {Math.round(dashboard.productivity)}%
          </Typography>
        </Stack>

        <ResponsiveContainer
          width="100%"
          height={320}
        >
          <AreaChart data={productivityData}>
            <defs>
              <linearGradient
                id="productivityGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="#4F46E5"
                  stopOpacity={0.4}
                />

                <stop
                  offset="95%"
                  stopColor="#4F46E5"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="day" />

            <YAxis domain={[0, 100]} />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="productivity"
              stroke="#4F46E5"
              strokeWidth={3}
              fill="url(#productivityGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}