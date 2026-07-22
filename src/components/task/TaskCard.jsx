import {
  Card,
  CardContent,
  Checkbox,
  Chip,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";

const priorityColor = {
  HIGH: "error",
  MEDIUM: "warning",
  LOW: "success",
};

const statusColor = {
  TODO: "default",
  IN_PROGRESS: "info",
  DONE: "success",
};

export default function TaskCard({
  task,
  onEdit,
  onDelete,
  onToggleComplete,
}) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid #E2E8F0",
        transition: "0.25s",
        height: "100%",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 12px 24px rgba(15,23,42,0.08)",
        },
      }}
    >
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={2}
        >
          <Stack
            direction="row"
            spacing={2}
            alignItems="flex-start"
            flex={1}
          >
            <Checkbox
              checked={task.status === "DONE"}
              onChange={() => onToggleComplete(task)}
            />

            <Stack spacing={1} flex={1}>
              <Typography
                variant="h6"
                fontWeight={700}
                sx={{
                  textDecoration:
                    task.status === "DONE"
                      ? "line-through"
                      : "none",
                }}
              >
                {task.title}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                {task.description}
              </Typography>

              <Stack
                direction="row"
                spacing={1}
                flexWrap="wrap"
                useFlexGap
              >
                <Chip
                  label={task.priority}
                  color={priorityColor[task.priority]}
                  size="small"
                />

                <Chip
                  label={task.category}
                  variant="outlined"
                  size="small"
                />

                <Chip
                  label={task.status.replace("_", " ")}
                  color={statusColor[task.status]}
                  size="small"
                />
              </Stack>

              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                mt={1}
              >
                <CalendarMonthRoundedIcon
                  fontSize="small"
                  color="action"
                />

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Due: {task.dueDate || "No Due Date"}
                </Typography>
              </Stack>
            </Stack>
          </Stack>

          <Stack direction="row">
            <Tooltip title="Edit Task">
              <IconButton
                color="primary"
                onClick={() => onEdit(task)}
              >
                <EditRoundedIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Delete Task">
              <IconButton
                color="error"
                onClick={() => onDelete(task)}
              >
                <DeleteRoundedIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>

        <Divider sx={{ mt: 3 }} />
      </CardContent>
    </Card>
  );
}