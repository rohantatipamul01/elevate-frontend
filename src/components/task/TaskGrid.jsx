import {
  Box,
  Grid,
  Paper,
  Typography,
} from "@mui/material";

import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";

import TaskCard from "./TaskCard";

export default function TaskGrid({
  tasks,
  onEdit,
  onDelete,
  onToggleComplete,
}) {
  if (!tasks || tasks.length === 0) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: 8,
          borderRadius: 4,
          border: "1px solid #E2E8F0",
          textAlign: "center",
        }}
      >
        <AssignmentRoundedIcon
          sx={{
            fontSize: 70,
            color: "#CBD5E1",
            mb: 2,
          }}
        />

        <Typography
          variant="h5"
          fontWeight={700}
        >
          No Tasks Found
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mt: 1 }}
        >
          Create your first task to start organizing your work.
        </Typography>
      </Paper>
    );
  }

  return (
    <Box>
      <Grid container spacing={3}>
        {tasks.map((task) => (
          <Grid
            key={task.id}
            size={{ xs: 12, md: 6, xl: 4 }}
          >
            <TaskCard
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleComplete={onToggleComplete}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}