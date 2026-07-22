import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import RadioButtonUncheckedRoundedIcon from "@mui/icons-material/RadioButtonUncheckedRounded";

const priorityColor = {
  HIGH: "error",
  MEDIUM: "warning",
  LOW: "success",
};

function formatDate(dateString) {
  if (!dateString) return "-";

  const parts = dateString.split("-");

  if (parts.length !== 3) {
    return dateString;
  }

  const year = Number(parts[0]);
  const month = Number(parts[1]) - 1;
  const day = Number(parts[2]);

  const date = new Date(year, month, day);

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function EventDetailsDialog({
  open,
  event,
  onClose,
}) {
  if (!event) {
    return null;
  }

  const isTask = event.type === "TASK";

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
        >
          {isTask ? (
            <AssignmentRoundedIcon color="primary" />
          ) : (
            <NotificationsRoundedIcon color="secondary" />
          )}

          <Typography
            variant="h6"
            fontWeight={700}
          >
            {event.title}
          </Typography>
        </Stack>
      </DialogTitle>

      <DialogContent dividers>
        <Stack spacing={3}>
          <Stack
            direction="row"
            spacing={1}
            flexWrap="wrap"
          >
            <Chip
              label={event.type}
              color={isTask ? "primary" : "secondary"}
            />

            {event.priority && (
              <Chip
                icon={<FlagRoundedIcon />}
                label={event.priority}
                color={
                  priorityColor[event.priority] ||
                  "default"
                }
              />
            )}

            <Chip
              icon={
                event.completed ? (
                  <CheckCircleRoundedIcon />
                ) : (
                  <RadioButtonUncheckedRoundedIcon />
                )
              }
              label={
                event.completed
                  ? "Completed"
                  : "Pending"
              }
              color={
                event.completed
                  ? "success"
                  : "warning"
              }
            />
          </Stack>

          <Divider />

          <Stack spacing={1}>
            <Typography
              variant="subtitle2"
              color="text.secondary"
            >
              Description
            </Typography>

            <Typography variant="body1">
              {event.description
                ? event.description
                : "No description available."}
            </Typography>
          </Stack>

          <Divider />

          <Stack spacing={1}>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
            >
              <CalendarTodayRoundedIcon
                fontSize="small"
                color="action"
              />

              <Typography>
                {formatDate(event.date)}
              </Typography>
            </Stack>

            {event.time && (
              <Typography color="text.secondary">
                Time : {event.time}
              </Typography>
            )}
          </Stack>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button
          variant="contained"
          onClick={onClose}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}