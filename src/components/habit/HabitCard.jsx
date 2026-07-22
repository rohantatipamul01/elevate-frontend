import {
  Button,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";

import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import LocalFireDepartmentRoundedIcon from "@mui/icons-material/LocalFireDepartmentRounded";

export default function HabitCard({
  habit,
  onEdit,
  onDelete,
  onComplete,
}) {
  const progress = Math.min(
    (habit.currentStreak / 30) * 100,
    100
  );

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
          mb={2}
        >
          <Typography
            variant="h6"
            fontWeight={700}
          >
            {habit.title}
          </Typography>

          <Chip
            label={habit.category}
            color="primary"
            size="small"
          />
        </Stack>

        <Typography
          color="text.secondary"
          sx={{ mb: 2 }}
        >
          {habit.description}
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          mb={2}
        >
          <Chip
            icon={<LocalFireDepartmentRoundedIcon />}
            label={`${habit.currentStreak} Days`}
            color="warning"
          />

          <Chip
            label={habit.frequency}
            variant="outlined"
          />
        </Stack>

        <Typography
          variant="body2"
          gutterBottom
        >
          Streak Progress
        </Typography>

        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 8,
            borderRadius: 4,
            mb: 3,
          }}
        />

        <Stack
          direction="row"
          spacing={1}
        >
          <Button
            fullWidth
            variant="contained"
            startIcon={
              <CheckCircleRoundedIcon />
            }
            onClick={() =>
              onComplete(habit)
            }
          >
            Complete
          </Button>

          <Button
            variant="outlined"
            onClick={() =>
              onEdit(habit)
            }
          >
            <EditRoundedIcon />
          </Button>

          <Button
            color="error"
            variant="outlined"
            onClick={() =>
              onDelete(habit)
            }
          >
            <DeleteRoundedIcon />
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}