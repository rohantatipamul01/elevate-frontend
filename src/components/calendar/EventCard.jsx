import {
  Chip,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";

const priorityColors = {
  LOW: "success",
  MEDIUM: "warning",
  HIGH: "error",
};

export default function EventCard({
  event,
  onClick,
}) {
  const isTask = event.type === "TASK";

  return (
    <Tooltip
      arrow
      title={event.title}
    >
      <Stack
        spacing={0.5}
        onClick={() => onClick?.(event)}
        sx={{
          cursor: "pointer",
          mb: 0.8,
          p: 1,
          borderRadius: 2,
          border: "1px solid #E2E8F0",
          bgcolor: isTask
            ? "primary.50"
            : "success.50",
          transition: "0.25s",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: 2,
          },
        }}
      >
        <Stack
          direction="row"
          spacing={0.5}
          alignItems="center"
        >
          {isTask ? (
            <AssignmentRoundedIcon
              color="primary"
              fontSize="small"
            />
          ) : (
            <NotificationsRoundedIcon
              color="success"
              fontSize="small"
            />
          )}

          <Typography
            variant="caption"
            fontWeight={600}
            noWrap
          >
            {event.title}
          </Typography>
        </Stack>

        <Stack
          direction="row"
          spacing={0.5}
          flexWrap="wrap"
        >
          <Chip
            size="small"
            label={event.type}
            color={
              isTask
                ? "primary"
                : "success"
            }
          />

          {event.priority && (
            <Chip
              size="small"
              icon={<FlagRoundedIcon />}
              label={event.priority}
              color={
                priorityColors[event.priority] ??
                "default"
              }
            />
          )}

          {event.completed && (
            <Chip
              size="small"
              icon={<CheckCircleRoundedIcon />}
              label="Done"
              color="success"
            />
          )}
        </Stack>
      </Stack>
    </Tooltip>
  );
}