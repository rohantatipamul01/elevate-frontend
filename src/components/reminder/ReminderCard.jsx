import {
  Avatar,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
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
  const theme = useTheme();
  const mobile = useMediaQuery(
    theme.breakpoints.down("sm")
  );

  const priorityColor = {
    HIGH: "error",
    MEDIUM: "warning",
    LOW: "success",
  };

  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        borderRadius: 4,
        border: `1px solid ${theme.palette.divider}`,
        bgcolor: "background.paper",
        transition: ".25s",

        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: theme.shadows[8],
        },
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
          alignItems="flex-start"
          spacing={2}
          mb={2}
        >
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{
              flex: 1,
              wordBreak: "break-word",
            }}
          >
            {reminder.title}
          </Typography>

          <Chip
            label={reminder.priority}
            color={
              priorityColor[
                reminder.priority
              ] || "default"
            }
            size="small"
          />
        </Stack>

        {/* Description */}

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            minHeight: 50,
            mb: 3,
          }}
        >
          {reminder.description ||
            "No description provided."}
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {/* Reminder Time */}

        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          mb={3}
        >
          <Avatar
            sx={{
              bgcolor: "primary.main",
              width: 40,
              height: 40,
            }}
          >
            <NotificationsActiveRoundedIcon />
          </Avatar>

          <Stack>
            <Typography
              variant="caption"
              color="text.secondary"
            >
              Reminder Time
            </Typography>

            <Typography
              fontWeight={600}
              variant="body2"
            >
              {new Date(
                reminder.reminderTime
              ).toLocaleString()}
            </Typography>
          </Stack>
        </Stack>

        {/* Status */}

        <Chip
          sx={{ mb: 3 }}
          label={
            reminder.completed
              ? "Completed"
              : "Pending"
          }
          color={
            reminder.completed
              ? "success"
              : "warning"
          }
          variant="outlined"
        />

        {/* Actions */}

        <Stack
          direction={
            mobile ? "column" : "row"
          }
          spacing={1}
        >
          <Button
            fullWidth
            variant="contained"
            startIcon={
              <CheckCircleRoundedIcon />
            }
            disabled={
              reminder.completed
            }
            onClick={() =>
              onComplete(reminder)
            }
          >
            {reminder.completed
              ? "Completed"
              : "Complete"}
          </Button>

          <Button
            variant="outlined"
            color="primary"
            onClick={() =>
              onEdit(reminder)
            }
          >
            <EditRoundedIcon />
          </Button>

          <Button
            variant="outlined"
            color="error"
            onClick={() =>
              onDelete(reminder)
            }
          >
            <DeleteRoundedIcon />
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}