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
  useMediaQuery,
  useTheme,
} from "@mui/material";

import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";

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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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

  const latestTasks = [...tasks]
    .sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    )
    .slice(0, 5);

  const completedTasks = latestTasks.filter(
    (task) => task.completed
  ).length;

  const progress =
    latestTasks.length === 0
      ? 0
      : (completedTasks / latestTasks.length) * 100;

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
            {completedTasks}/{latestTasks.length}
          </Typography>
        </Stack>

        {/* Progress */}

        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 8,
            borderRadius: 10,
            mb: 3,
          }}
        />

        {latestTasks.length === 0 ? (
          <Typography
            textAlign="center"
            color="text.secondary"
            sx={{ py: 5 }}
          >
            No recent tasks.
          </Typography>
        ) : (
          <List disablePadding>
            {latestTasks.map((task, index) => (
              <Box key={task.id}>
                <ListItem
                  disablePadding
                  sx={{
                    py: 2,
                    alignItems: "flex-start",
                  }}
                >
                  <Checkbox
                    checked={task.completed}
                    onChange={() => {
                      if (!task.completed) {
                        completeTask(task.id);
                      }
                    }}
                    sx={{
                      mt: 0.5,
                    }}
                  />

                  <Box
                    sx={{
                      flex: 1,
                    }}
                  >
                    <Typography
                      fontWeight={600}
                      sx={{
                        fontSize: {
                          xs: 15,
                          md: 16,
                        },
                        textDecoration: task.completed
                          ? "line-through"
                          : "none",
                      }}
                    >
                      {task.title}
                    </Typography>

                    <Stack
                      direction="row"
                      spacing={1}
                      flexWrap="wrap"
                      useFlexGap
                      mt={1}
                    >
                      <Chip
                        size="small"
                        color={getPriorityColor(task.priority)}
                        label={task.priority}
                      />

                      <Chip
                        size="small"
                        variant="outlined"
                        icon={<CalendarTodayRoundedIcon />}
                        label={
                          task.dueDate
                            ? new Date(
                                task.dueDate
                              ).toLocaleDateString()
                            : "No Due Date"
                        }
                      />
                    </Stack>
                  </Box>
                </ListItem>

                {index !== latestTasks.length - 1 && (
                  <Divider />
                )}
              </Box>
            ))}
          </List>
        )}

        {/* Footer */}

        <Stack
          direction={isMobile ? "column" : "row"}
          justifyContent="space-between"
          mt={3}
          spacing={1}
        >
          <Typography
            variant="body2"
            color="text.secondary"
          >
            Progress
          </Typography>

          <Typography
            fontWeight={700}
            color="primary.main"
          >
            {Math.round(progress)}%
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}