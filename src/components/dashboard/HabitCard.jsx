import {
  Alert,
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";

import LocalFireDepartmentRoundedIcon from "@mui/icons-material/LocalFireDepartmentRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

import { useHabits } from "../../context/HabitContext";

export default function HabitCard() {

  const {
    dashboard,
    loading,
    error,
  } = useHabits();

  if (loading) {
    return (
      <Card
        elevation={0}
        sx={{
          borderRadius: 4,
          border: "1px solid #E2E8F0",
          height: "100%",
        }}
      >
        <CardContent>
          <Stack
            alignItems="center"
            justifyContent="center"
            sx={{ py: 6 }}
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

  const progress =
    dashboard.totalHabits > 0
      ? Math.round(
          (dashboard.activeHabits /
            dashboard.totalHabits) *
            100
        )
      : 0;

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid #E2E8F0",
        height: "100%",
      }}
    >
      <CardContent>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
          >
            <LocalFireDepartmentRoundedIcon
              sx={{ color: "#F97316" }}
            />

            <Typography
              variant="h6"
              fontWeight={700}
            >
              Habit Tracker
            </Typography>
          </Stack>

          <Chip
            label={`${dashboard.currentStreak} Days`}
            color="warning"
          />
        </Stack>

        <Divider sx={{ my: 3 }} />

        <Stack spacing={3}>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            Current Streak
          </Typography>

          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 10,
              borderRadius: 10,
            }}
          />

          <Stack spacing={1}>

            <Typography>
              🔥 Current Streak:
              <strong> {dashboard.currentStreak}</strong>
            </Typography>

            <Typography>
              🏆 Longest Streak:
              <strong> {dashboard.longestStreak}</strong>
            </Typography>

            <Typography>
              ✅ Active Habits:
              <strong> {dashboard.activeHabits}</strong>
            </Typography>

            <Typography>
              📈 Completed:
              <strong> {dashboard.completedCount}</strong>
            </Typography>

          </Stack>

          <Box
            display="flex"
            justifyContent="center"
          >
            <CheckCircleRoundedIcon
              color="success"
              sx={{ fontSize: 48 }}
            />
          </Box>

        </Stack>

      </CardContent>
    </Card>
  );
}