import { Grid } from "@mui/material";

import ReminderCard from "./ReminderCard";

export default function ReminderGrid({
  reminders,
  onEdit,
  onDelete,
  onComplete,
}) {
  return (
    <Grid container spacing={3}>
      {reminders.map((reminder) => (
        <Grid
          item
          xs={12}
          md={6}
          lg={4}
          key={reminder.id}
        >
          <ReminderCard
            reminder={reminder}
            onEdit={onEdit}
            onDelete={onDelete}
            onComplete={onComplete}
          />
        </Grid>
      ))}
    </Grid>
  );
}