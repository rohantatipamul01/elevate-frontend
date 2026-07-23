import {
  Alert,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { dashboard, loading, error } = useDashboard();

  if (loading) {
    return (
      <Card
        elevation={0}
        sx={{
          borderRadius: 4,
          border: `1px solid ${theme.palette.divider}`,
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
        borderRadius: 4,
        border: `1px solid ${theme.palette.divider}`,
        bgcolor: "background.paper",
        height: "100%",
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
          alignItems="center"
          spacing={1}
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
            sx={{
              ml: "auto",
              fontWeight: 600,
              color: "primary.main",
            }}
          >
            {Math.round(dashboard.productivity)}%
          </Typography>
        </Stack>

        <ResponsiveContainer
          width="100%"
          height={isMobile ? 240 : 320}
        >
          <AreaChart
            data={productivityData}
            margin={{
              top: 10,
              right: 10,
              left: isMobile ? -20 : 0,
              bottom: 0,
            }}
          >
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
                  stopColor={theme.palette.primary.main}
                  stopOpacity={0.4}
                />
                <stop
                  offset="95%"
                  stopColor={theme.palette.primary.main}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke={theme.palette.divider}
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="day"
              tick={{
                fill: theme.palette.text.secondary,
                fontSize: isMobile ? 10 : 12,
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              domain={[0, 100]}
              tick={{
                fill: theme.palette.text.secondary,
                fontSize: isMobile ? 10 : 12,
              }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: `1px solid ${theme.palette.divider}`,
                background: theme.palette.background.paper,
                color: theme.palette.text.primary,
              }}
            />

            <Area
              type="monotone"
              dataKey="productivity"
              stroke={theme.palette.primary.main}
              strokeWidth={3}
              fill="url(#productivityGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}