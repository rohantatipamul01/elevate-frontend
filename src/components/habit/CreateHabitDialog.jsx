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

const initialHabit = {
  title: "",
  description: "",
  category: "Personal",
  frequency: "DAILY",
};

export default function CreateHabitDialog({
  open,
  onClose,
  onSave,
  initialData = null,
}) {
  const [habit, setHabit] = useState(initialHabit);

  useEffect(() => {
    if (initialData) {
      setHabit({
        ...initialHabit,
        ...initialData,
      });
    } else {
      setHabit(initialHabit);
    }
  }, [initialData, open]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setHabit((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (!habit.title.trim()) return;

    onSave(habit);

    setHabit(initialHabit);

    onClose();
  };

  const handleClose = () => {
    setHabit(initialHabit);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        {initialData ? "Edit Habit" : "Create Habit"}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <TextField
            fullWidth
            required
            label="Habit Title"
            name="title"
            value={habit.title}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Description"
            name="description"
            value={habit.description}
            onChange={handleChange}
          />

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>

                <Select
                  label="Category"
                  name="category"
                  value={habit.category}
                  onChange={handleChange}
                >
                  <MenuItem value="Personal">Personal</MenuItem>
                  <MenuItem value="Health">Health</MenuItem>
                  <MenuItem value="Fitness">Fitness</MenuItem>
                  <MenuItem value="Study">Study</MenuItem>
                  <MenuItem value="Work">Work</MenuItem>
                  <MenuItem value="Development">Development</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Frequency</InputLabel>

                <Select
                  label="Frequency"
                  name="frequency"
                  value={habit.frequency}
                  onChange={handleChange}
                >
                  <MenuItem value="DAILY">Daily</MenuItem>
                  <MenuItem value="WEEKLY">Weekly</MenuItem>
                  <MenuItem value="MONTHLY">Monthly</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button onClick={handleClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSave}
        >
          {initialData ? "Update Habit" : "Create Habit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}