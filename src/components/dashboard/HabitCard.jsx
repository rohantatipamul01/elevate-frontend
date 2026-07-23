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
  useMediaQuery,
  useTheme,
} from "@mui/material";

import LocalFireDepartmentRoundedIcon from "@mui/icons-material/LocalFireDepartmentRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";

import { useHabits } from "../../context/HabitContext";

export default function HabitCard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { dashboard, loading, error } = useHabits();

  if (loading) {
    return (
      <Card
        elevation={0}
        sx={{
          borderRadius: 4,
          border: `1px solid ${theme.palette.divider}`,
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
        height: "100%",
        borderRadius: 4,
        border: `1px solid ${theme.palette.divider}`,
        bgcolor: "background.paper",
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
        {/* Header */}

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
          >
            <LocalFireDepartmentRoundedIcon
              sx={{
                color: "#F97316",
              }}
            />

            <Typography
              variant="h6"
              fontWeight={700}
            >
              Habit Tracker
            </Typography>
          </Stack>

          <Chip
            color="warning"
            label={`${dashboard.currentStreak} Days`}
            size={isMobile ? "small" : "medium"}
          />
        </Stack>

        <Divider sx={{ mb: 3 }} />

        {/* Progress */}

        <Typography
          variant="body2"
          color="text.secondary"
          mb={1}
        >
          Habit Completion
        </Typography>

        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 10,
            borderRadius: 10,
            mb: 3,
          }}
        />

        {/* Statistics */}

        <Stack spacing={2}>
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
                color="warning"
              />

              <Typography variant="body2">
                Current Streak
              </Typography>
            </Stack>

            <Typography fontWeight={700}>
              {dashboard.currentStreak}
            </Typography>
          </Stack>

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
              <EmojiEventsRoundedIcon
                color="primary"
              />

              <Typography variant="body2">
                Longest Streak
              </Typography>
            </Stack>

            <Typography fontWeight={700}>
              {dashboard.longestStreak}
            </Typography>
          </Stack>

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
              <TrendingUpRoundedIcon
                color="success"
              />

              <Typography variant="body2">
                Active Habits
              </Typography>
            </Stack>

            <Typography fontWeight={700}>
              {dashboard.activeHabits}
            </Typography>
          </Stack>

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
              <CheckCircleRoundedIcon
                color="success"
              />

              <Typography variant="body2">
                Completed
              </Typography>
            </Stack>

            <Typography fontWeight={700}>
              {dashboard.completedCount}
            </Typography>
          </Stack>
        </Stack>

        {/* Footer */}

        <Box
          sx={{
            mt: 4,
            textAlign: "center",
          }}
        >
          <CheckCircleRoundedIcon
            color="success"
            sx={{
              fontSize: {
                xs: 42,
                md: 56,
              },
            }}
          />

          <Typography
            variant="body2"
            color="text.secondary"
            mt={1}
          >
            {progress}% of your habits are currently active.
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}