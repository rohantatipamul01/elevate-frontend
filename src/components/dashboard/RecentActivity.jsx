import {
  Alert,
  Avatar,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import AssignmentTurnedInRoundedIcon from "@mui/icons-material/AssignmentTurnedInRounded";
import PendingActionsRoundedIcon from "@mui/icons-material/PendingActionsRounded";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import LocalFireDepartmentRoundedIcon from "@mui/icons-material/LocalFireDepartmentRounded";

import { useTasks } from "../../context/TaskContext";
import { useReminders } from "../../context/ReminderContext";

export default function RecentActivity() {

  const {
    tasks,
    loading: taskLoading,
    error: taskError,
  } = useTasks();

  const {
    reminders,
    loading: reminderLoading,
    error: reminderError,
  } = useReminders();

  if (taskLoading || reminderLoading) {
    return (
      <Card
        elevation={0}
        sx={{
          borderRadius: 4,
          border: 1,
          borderColor: "divider",
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

  if (taskError || reminderError) {
    return (
      <Alert severity="error">
        {taskError || reminderError}
      </Alert>
    );
  }

  const taskActivities = tasks.map((task) => ({
    id: `task-${task.id}`,
    title: task.completed
      ? "Task Completed"
      : "Task Created",
    description: task.title,
    createdAt: task.createdAt,
    icon: task.completed ? (
      <AssignmentTurnedInRoundedIcon />
    ) : (
      <PendingActionsRoundedIcon />
    ),
    color: task.completed
      ? "success.main"
      : "warning.main",
  }));

  const reminderActivities = reminders.map((reminder) => ({
    id: `reminder-${reminder.id}`,
    title: "Reminder Scheduled",
    description: reminder.title,
    createdAt: reminder.createdAt,
    icon: <NotificationsActiveRoundedIcon />,
    color: "secondary.main",
  }));

  const activities = [
    ...taskActivities,
    ...reminderActivities,
  ]
    .sort(
      (a, b) =>
        new Date(b.createdAt || 0) -
        new Date(a.createdAt || 0)
    )
    .slice(0, 6);

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: 1,
        borderColor: "divider",
      }}
    >
      <CardContent>

        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          mb={3}
        >
          <HistoryRoundedIcon color="primary" />

          <Typography
            variant="h6"
            fontWeight={700}
          >
            Recent Activity
          </Typography>
        </Stack>

        {activities.length === 0 ? (
          <Stack
            alignItems="center"
            spacing={2}
            sx={{ py: 5 }}
          >
            <LocalFireDepartmentRoundedIcon
              color="disabled"
              sx={{ fontSize: 48 }}
            />

            <Typography color="text.secondary">
              No recent activity.
            </Typography>
          </Stack>
        ) : (
          <List disablePadding>

            {activities.map((activity, index) => (

              <Box key={activity.id}>

                <ListItem
                  disableGutters
                  sx={{ py: 1.5 }}
                >
                  <ListItemAvatar>

                    <Avatar
                      sx={{
                        bgcolor: "action.hover",
                        color: activity.color,
                      }}
                    >
                      {activity.icon}
                    </Avatar>

                  </ListItemAvatar>

                  <ListItemText
                    primary={
                      <Typography fontWeight={600}>
                        {activity.title}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                        >
                          {activity.description}
                        </Typography>

                        <Typography
                          variant="caption"
                          color="text.disabled"
                        >
                          {activity.createdAt
                            ? new Date(
                                activity.createdAt
                              ).toLocaleString()
                            : ""}
                        </Typography>
                      </>
                    }
                  />

                </ListItem>

                {index !==
                  activities.length - 1 && (
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