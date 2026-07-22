import { useEffect, useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
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

  const [reminder, setReminder] =
    useState(initialReminder);

  useEffect(() => {

    if (initialData) {

      setReminder(initialData);

    } else {

      setReminder(initialReminder);

    }

  }, [initialData, open]);

  const handleChange = (e) => {

    setReminder({
      ...reminder,
      [e.target.name]: e.target.value,
    });

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

      <DialogContent>

        <Stack spacing={3} mt={1}>

          <TextField
            label="Title"
            name="title"
            value={reminder.title}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            multiline
            rows={4}
            label="Description"
            name="description"
            value={reminder.description}
            onChange={handleChange}
            fullWidth
          />

          <Grid container spacing={2}>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="datetime-local"
                name="reminderTime"
                value={reminder.reminderTime}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                label="Reminder Time"
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

              </FormControl>
            </Grid>

          </Grid>

        </Stack>

      </DialogContent>

      <DialogActions>

        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={() => onSave(reminder)}
        >
          {initialData
            ? "Update"
            : "Create"}
        </Button>

      </DialogActions>

    </Dialog>
  );
}