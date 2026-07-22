import { Grid } from "@mui/material";

import HabitCard from "./HabitCard";

export default function HabitGrid({
  habits,
  onEdit,
  onDelete,
  onComplete,
}) {
  return (
    <Grid container spacing={3}>
      {habits.map((habit) => (
        <Grid
          key={habit.id}
          item
          xs={12}
          md={6}
          lg={4}
        >
          <HabitCard
            habit={habit}
            onEdit={onEdit}
            onDelete={onDelete}
            onComplete={onComplete}
          />
        </Grid>
      ))}
    </Grid>
  );
}