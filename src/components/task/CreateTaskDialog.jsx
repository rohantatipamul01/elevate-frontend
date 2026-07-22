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

const initialTask = {
  title: "",
  description: "",
  priority: "MEDIUM",
  category: "Personal",
  dueDate: "",
  status: "TODO",
  progress: 0,
};

export default function CreateTaskDialog({
  open,
  onClose,
  onSave,
  initialData = null,
}) {
  const [task, setTask] = useState(initialTask);

  useEffect(() => {
    if (initialData) {
      setTask({
        ...initialTask,
        ...initialData,
      });
    } else {
      setTask(initialTask);
    }
  }, [initialData, open]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (!task.title.trim()) return;

    const payload = {
      ...task,
      progress:
        task.status === "DONE"
          ? 100
          : Number(task.progress) || 0,
    };

    onSave(payload);

    setTask(initialTask);

    onClose();
  };

  const handleClose = () => {
    setTask(initialTask);
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
        {initialData ? "Edit Task" : "Create New Task"}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <TextField
            fullWidth
            required
            label="Task Title"
            name="title"
            value={task.title}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Description"
            name="description"
            value={task.description}
            onChange={handleChange}
          />

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>

                <Select
                  label="Priority"
                  name="priority"
                  value={task.priority}
                  onChange={handleChange}
                >
                  <MenuItem value="LOW">Low</MenuItem>
                  <MenuItem value="MEDIUM">Medium</MenuItem>
                  <MenuItem value="HIGH">High</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>

                <Select
                  label="Category"
                  name="category"
                  value={task.category}
                  onChange={handleChange}
                >
                  <MenuItem value="Personal">
                    Personal
                  </MenuItem>

                  <MenuItem value="Work">
                    Work
                  </MenuItem>

                  <MenuItem value="Study">
                    Study
                  </MenuItem>

                  <MenuItem value="Health">
                    Health
                  </MenuItem>

                  <MenuItem value="Fitness">
                    Fitness
                  </MenuItem>

                  <MenuItem value="Development">
                    Development
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="date"
                label="Due Date"
                name="dueDate"
                value={task.dueDate}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>

                <Select
                  label="Status"
                  name="status"
                  value={task.status}
                  onChange={handleChange}
                >
                  <MenuItem value="TODO">
                    To Do
                  </MenuItem>

                  <MenuItem value="IN_PROGRESS">
                    In Progress
                  </MenuItem>

                  <MenuItem value="DONE">
                    Completed
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                type="number"
                label="Progress (%)"
                name="progress"
                value={task.progress}
                onChange={handleChange}
                inputProps={{
                  min: 0,
                  max: 100,
                }}
              />
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
          {initialData ? "Update Task" : "Create Task"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}