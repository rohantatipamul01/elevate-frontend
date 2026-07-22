import {
  Alert,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import PieChartRoundedIcon from "@mui/icons-material/PieChartRounded";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

import { useAnalytics } from "../../context/AnalyticsContext";

const TASK_COLORS = ["#4F46E5", "#E2E8F0"];
const REMINDER_COLORS = ["#22C55E", "#E2E8F0"];

export default function CompletionPieChart() {
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

  const pendingTasks =
    analytics.totalTasks - analytics.completedTasks;

  const pendingReminders =
    analytics.totalReminders - analytics.completedReminders;

  const taskData = [
    {
      name: "Completed",
      value: analytics.completedTasks,
    },
    {
      name: "Pending",
      value: pendingTasks,
    },
  ];

  const reminderData = [
    {
      name: "Completed",
      value: analytics.completedReminders,
    },
    {
      name: "Pending",
      value: pendingReminders,
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
          <PieChartRoundedIcon color="primary" />

          <Typography
            variant="h6"
            fontWeight={700}
          >
            Completion Overview
          </Typography>
        </Stack>

        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="space-between"
          gap={4}
        >
          <Box flex={1} minWidth={280}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              align="center"
              gutterBottom
            >
              Tasks
            </Typography>

            <ResponsiveContainer
              width="100%"
              height={250}
            >
              <PieChart>
                <Pie
                  data={taskData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={3}
                >
                  {taskData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={TASK_COLORS[index]}
                    />
                  ))}
                </Pie>

                <Tooltip />

                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Box>

          <Divider
            orientation="vertical"
            flexItem
            sx={{
              display: {
                xs: "none",
                md: "block",
              },
            }}
          />

          <Box flex={1} minWidth={280}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              align="center"
              gutterBottom
            >
              Reminders
            </Typography>

            <ResponsiveContainer
              width="100%"
              height={250}
            >
              <PieChart>
                <Pie
                  data={reminderData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={3}
                >
                  {reminderData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={REMINDER_COLORS[index]}
                    />
                  ))}
                </Pie>

                <Tooltip />

                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          justifyContent="space-around"
          spacing={3}
        >
          <Box textAlign="center">
            <Typography
              variant="h5"
              fontWeight={700}
              color="primary"
            >
              {analytics.taskCompletionRate.toFixed(1)}%
            </Typography>

            <Typography
              color="text.secondary"
            >
              Task Completion
            </Typography>
          </Box>

          <Box textAlign="center">
            <Typography
              variant="h5"
              fontWeight={700}
              color="success.main"
            >
              {analytics.reminderCompletionRate.toFixed(1)}%
            </Typography>

            <Typography
              color="text.secondary"
            >
              Reminder Completion
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}