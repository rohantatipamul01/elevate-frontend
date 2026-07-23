import {
  Box,
  Button,
  Typography,
} from "@mui/material";

import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

export default function EmptyReminder({
  onCreate,
}) {
  return (
    <Box
      sx={{
        py: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <NotificationsNoneRoundedIcon
        color="disabled"
        sx={{
          fontSize: 70,
          mb: 2,
        }}
      />

      <Typography
        variant="h5"
        fontWeight={700}
        gutterBottom
      >
        No Reminders Found
      </Typography>

      <Typography
        color="text.secondary"
        sx={{
          mb: 3,
          maxWidth: 420,
        }}
      >
        You don't have any reminders yet. Create one to
        keep track of important tasks and deadlines.
      </Typography>

      {onCreate && (
        <Button
          variant="contained"
          startIcon={<AddRoundedIcon />}
          onClick={onCreate}
        >
          Create Reminder
        </Button>
      )}
    </Box>
  );
}