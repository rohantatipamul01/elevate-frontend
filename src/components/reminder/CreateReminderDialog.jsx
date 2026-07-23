import { useEffect, useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";

const initialReminder = {
  title: "",
  description: "",
  reminderTime: "",
  priority: "MEDIUM",
};

export default function CreateReminderDialog({
  open,
  onClose,
  onSave,
  initialData,
}) {
  const [reminder, setReminder] = useState(initialReminder);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setReminder(initialData);
    } else {
      setReminder(initialReminder);
    }

    setErrors({});
  }, [initialData, open]);

  const handleChange = (e) => {
    setReminder((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!reminder.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!reminder.reminderTime) {
      newErrors.reminderTime = "Reminder time is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    onSave(reminder);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        {initialData
          ? "Edit Reminder"
          : "Create Reminder"}
      </DialogTitle>

      <DialogContent dividers>
        <Stack spacing={3} mt={1}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={reminder.title}
            onChange={handleChange}
            error={Boolean(errors.title)}
            helperText={errors.title}
          />

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Description"
            name="description"
            value={reminder.description}
            onChange={handleChange}
          />

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="datetime-local"
                label="Reminder Time"
                name="reminderTime"
                value={reminder.reminderTime}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                error={Boolean(errors.reminderTime)}
                helperText={errors.reminderTime}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>
                  Priority
                </InputLabel>

                <Select
                  label="Priority"
                  name="priority"
                  value={reminder.priority}
                  onChange={handleChange}
                >
                  <MenuItem value="LOW">
                    Low
                  </MenuItem>

                  <MenuItem value="MEDIUM">
                    Medium
                  </MenuItem>

                  <MenuItem value="HIGH">
                    High
                  </MenuItem>
                </Select>

                <FormHelperText>
                  Select reminder priority
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
        >
          {initialData
            ? "Update Reminder"
            : "Create Reminder"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}