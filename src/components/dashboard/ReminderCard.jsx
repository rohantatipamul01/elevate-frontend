import {
  Alert,
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import AlarmRoundedIcon from "@mui/icons-material/AlarmRounded";
import EventRoundedIcon from "@mui/icons-material/EventRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";

import { useReminders } from "../../context/ReminderContext";

const getPriorityColor = (priority) => {
  switch (priority?.toUpperCase()) {
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

const getReminderIcon = () => {
  return <AlarmRoundedIcon />;
};

export default function ReminderCard() {
  const {
    reminders,
    loading,
    error,
  } = useReminders();

  if (loading) {
    return (
      <Card
        elevation={0}
        sx={{
          borderRadius: 4,
          border: 1,
          borderColor: "divider",
          height: "100%",
        }}
      >
        <CardContent>
          <Stack
            justifyContent="center"
            alignItems="center"
            sx={{ py: 6 }}
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

  const upcomingReminders = [...reminders]
    .sort(
      (a, b) =>
        new Date(a.reminderDate) -
        new Date(b.reminderDate)
    )
    .slice(0, 5);

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: 1,
        borderColor: "divider",
        height: "100%",
      }}
    >
      <CardContent>
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          mb={3}
        >
          <NotificationsActiveRoundedIcon color="primary" />

          <Typography
            variant="h6"
            fontWeight={700}
          >
            Upcoming Reminders
          </Typography>
        </Stack>

        {upcomingReminders.length === 0 ? (
          <Stack
            alignItems="center"
            spacing={2}
            sx={{ py: 5 }}
          >
            <NotificationsActiveRoundedIcon
              color="disabled"
              sx={{ fontSize: 48 }}
            />

            <Typography color="text.secondary">
              No reminders scheduled.
            </Typography>
          </Stack>
        ) : (
          <List disablePadding>
            {upcomingReminders.map(
              (reminder, index) => (
                <Box key={reminder.id}>
                  <ListItem
                    disableGutters
                    sx={{
                      py: 1.5,
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          bgcolor: "action.hover",
                          color: "primary.main",
                        }}
                      >
                        {getReminderIcon()}
                      </Avatar>
                    </ListItemAvatar>

                    <ListItemText
                      primary={
                        <Typography
                          fontWeight={600}
                        >
                          {reminder.title}
                        </Typography>
                      }
                      secondary={`${reminder.reminderDate} ${
                        reminder.reminderTime || ""
                      }`}
                    />

                    <Chip
                      size="small"
                      label={reminder.priority}
                      color={getPriorityColor(
                        reminder.priority
                      )}
                    />
                  </ListItem>

                  {index !==
                    upcomingReminders.length -
                      1 && <Divider />}
                </Box>
              )
            )}
          </List>
        )}
      </CardContent>
    </Card>
  );
}