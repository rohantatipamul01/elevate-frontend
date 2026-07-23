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
  useMediaQuery,
  useTheme,
} from "@mui/material";

import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import AlarmRoundedIcon from "@mui/icons-material/AlarmRounded";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";

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

export default function ReminderCard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
          height: "100%",
          borderRadius: 4,
          border: `1px solid ${theme.palette.divider}`,
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
            justifyContent="center"
            spacing={2}
            sx={{
              py: 6,
            }}
          >
            <NotificationsActiveRoundedIcon
              color="disabled"
              sx={{
                fontSize: 54,
              }}
            />

            <Typography
              color="text.secondary"
              textAlign="center"
            >
              No upcoming reminders.
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
                      py: 2,
                      alignItems: "flex-start",
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          bgcolor: "primary.light",
                          color: "primary.main",
                          width: isMobile ? 42 : 48,
                          height: isMobile ? 42 : 48,
                        }}
                      >
                        <AlarmRoundedIcon />
                      </Avatar>
                    </ListItemAvatar>

                    <Box sx={{ flex: 1 }}>
                      <Typography
                        fontWeight={600}
                        sx={{
                          fontSize: {
                            xs: 15,
                            md: 16,
                          },
                        }}
                      >
                        {reminder.title}
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
                          color={getPriorityColor(
                            reminder.priority
                          )}
                          label={reminder.priority}
                        />

                        <Chip
                          size="small"
                          variant="outlined"
                          icon={
                            <CalendarTodayRoundedIcon />
                          }
                          label={`${reminder.reminderDate}${
                            reminder.reminderTime
                              ? ` • ${reminder.reminderTime}`
                              : ""
                          }`}
                        />
                      </Stack>
                    </Box>
                  </ListItem>

                  {index !==
                    upcomingReminders.length - 1 && (
                    <Divider />
                  )}
                </Box>
              )
            )}
          </List>
        )}

        {/* Footer */}

        {upcomingReminders.length > 0 && (
          <Stack
            direction="row"
            justifyContent="space-between"
            mt={3}
          >
            <Typography
              variant="body2"
              color="text.secondary"
            >
              Total Upcoming
            </Typography>

            <Typography
              fontWeight={700}
              color="primary.main"
            >
              {upcomingReminders.length}
            </Typography>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
}