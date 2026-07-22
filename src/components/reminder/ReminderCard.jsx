import {
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";

export default function ReminderCard({
  reminder,
  onEdit,
  onDelete,
  onComplete,
}) {
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
            {reminder.title}
          </Typography>

          <Chip
            label={reminder.priority}
            color={
              reminder.priority === "HIGH"
                ? "error"
                : reminder.priority === "MEDIUM"
                ? "warning"
                : "success"
            }
          />
        </Stack>

        <Typography
          color="text.secondary"
          sx={{ mb: 2 }}
        >
          {reminder.description}
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          mb={3}
        >
          <NotificationsActiveRoundedIcon
            color="primary"
          />

          <Typography variant="body2">
            {new Date(
              reminder.reminderTime
            ).toLocaleString()}
          </Typography>
        </Stack>

        <Stack
          direction="row"
          spacing={1}
        >
          <Button
            fullWidth
            variant="contained"
            startIcon={<CheckCircleRoundedIcon />}
            disabled={reminder.completed}
            onClick={() => onComplete(reminder)}
          >
            {reminder.completed
              ? "Completed"
              : "Complete"}
          </Button>

          <Button
            variant="outlined"
            onClick={() => onEdit(reminder)}
          >
            <EditRoundedIcon />
          </Button>

          <Button
            color="error"
            variant="outlined"
            onClick={() => onDelete(reminder)}
          >
            <DeleteRoundedIcon />
          </Button>

        </Stack>

      </CardContent>
    </Card>
  );
}