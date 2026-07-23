import { Grid } from "@mui/material";

import ReminderCard from "./ReminderCard";

export default function ReminderGrid({
  reminders,
  onEdit,
  onDelete,
  onComplete,
}) {
  return (
    <Grid container spacing={{ xs: 2, md: 3 }}>
      {reminders.map((reminder) => (
        <Grid
          key={reminder.id}
          size={{
            xs: 12,
            sm: 6,
            xl: 4,
          }}
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