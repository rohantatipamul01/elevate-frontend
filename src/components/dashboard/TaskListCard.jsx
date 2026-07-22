import {
  Alert,
  Box,
  Card,
  CardContent,
  Checkbox,
  Chip,
  CircularProgress,
  Divider,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";

import { useTasks } from "../../context/TaskContext";

const getPriorityColor = (priority) => {
  switch (priority) {
    case "HIGH":
      return "error";

    case "MEDIUM":
      return "warning";

    case "LOW":
      return "success";

    default:
      return "default";
  }
};

export default function TaskListCard() {
  const {
    tasks,
    loading,
    error,
    completeTask,
  } = useTasks();

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

  const latestTasks = [...tasks]
    .sort(
      (a, b) =>
        new Date(a.createdAt) -
        new Date(b.createdAt)
    )
    .reverse()
    .slice(0, 5);

  const completedTasks = latestTasks.filter(
    (task) => task.completed
  ).length;

  const progress =
    latestTasks.length > 0
      ? (completedTasks / latestTasks.length) * 100
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
          mb={2}
        >
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
          >
            <AssignmentRoundedIcon color="primary" />

            <Typography
              variant="h6"
              fontWeight={700}
            >
              Recent Tasks
            </Typography>
          </Stack>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            {completedTasks}/{latestTasks.length} Completed
          </Typography>
        </Stack>

        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 8,
            borderRadius: 5,
            mb: 3,
          }}
        />

        {latestTasks.length === 0 ? (
          <Typography
            textAlign="center"
            color="text.secondary"
            sx={{ py: 5 }}
          >
            No tasks available.
          </Typography>
        ) : (
          <List disablePadding>
            {latestTasks.map((task, index) => (
              <Box key={task.id}>
                <ListItem
                  disablePadding
                  sx={{
                    py: 1.5,
                  }}
                >
                  <Checkbox
                    checked={task.completed}
                    onChange={() => {
                      if (!task.completed) {
                        completeTask(task.id);
                      }
                    }}
                  />

                  <ListItemText
                    primary={
                      <Typography
                        fontWeight={600}
                        sx={{
                          textDecoration:
                            task.completed
                              ? "line-through"
                              : "none",
                        }}
                      >
                        {task.title}
                      </Typography>
                    }
                    secondary={
                      task.dueDate
                        ? `Due: ${new Date(
                            task.dueDate
                          ).toLocaleDateString()}`
                        : "No Due Date"
                    }
                  />

                  <Chip
                    label={task.priority}
                    color={getPriorityColor(
                      task.priority
                    )}
                    size="small"
                  />
                </ListItem>

                {index !==
                  latestTasks.length - 1 && (
                  <Divider />
                )}
              </Box>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
}