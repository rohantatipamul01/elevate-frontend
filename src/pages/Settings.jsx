import { useState } from "react";
import { useColorMode } from "../context/ColorModeContext";

import {
  Box,
  Paper,
  Typography,
  Divider,
  Stack,
  Switch,
  FormControlLabel,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";

export default function Settings() {
  const { mode, toggleColorMode } = useColorMode();

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [taskReminders, setTaskReminders] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(false);

  const [open, setOpen] = useState(false);

  const handleSave = () => {
    localStorage.setItem(
      "settings",
      JSON.stringify({
        emailNotifications,
        taskReminders,
        weeklyReport,
      })
    );

    setOpen(true);
  };

  return (
    <Box>
      <Typography
        variant="h4"
        fontWeight={700}
        gutterBottom
      >
        Settings
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ mb: 3 }}
      >
        Customize your Elevate experience.
      </Typography>

      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 3,
          border: "1px solid #E2E8F0",
        }}
      >
        <Stack spacing={3}>

          <Typography variant="h6" fontWeight={600}>
            Preferences
          </Typography>

          <Divider />

          <FormControlLabel
            control={
              <Switch
                checked={mode === "dark"}
                onChange={toggleColorMode}
              />
            }
            label="Dark Mode"
          />

          <FormControlLabel
            control={
              <Switch
                checked={emailNotifications}
                onChange={(e) =>
                  setEmailNotifications(e.target.checked)
                }
              />
            }
            label="Email Notifications"
          />

          <FormControlLabel
            control={
              <Switch
                checked={taskReminders}
                onChange={(e) =>
                  setTaskReminders(e.target.checked)
                }
              />
            }
            label="Task Reminders"
          />

          <FormControlLabel
            control={
              <Switch
                checked={weeklyReport}
                onChange={(e) =>
                  setWeeklyReport(e.target.checked)
                }
              />
            }
            label="Weekly Productivity Report"
          />

          <Divider />

          <Button
            variant="contained"
            sx={{
              width: 220,
              borderRadius: 3,
              py: 1.4,
            }}
            onClick={handleSave}
          >
            Save Settings
          </Button>

        </Stack>
      </Paper>

      <Snackbar
        open={open}
        autoHideDuration={2500}
        onClose={() => setOpen(false)}
      >
        <Alert severity="success" variant="filled">
          Settings saved successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
}