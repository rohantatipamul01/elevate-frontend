import {
  Grid,
} from "@mui/material";

import CardSkeleton from "./CardSkeleton";

export default function ReminderSkeleton({
  count = 6,
}) {
  return (
    <Grid
      container
      spacing={3}
    >
      {Array.from({ length: count }).map((_, index) => (
        <Grid
          key={index}
          size={{
            xs: 12,
            sm: 6,
            lg: 4,
          }}
        >
          <CardSkeleton
            height={240}
            lines={4}
          />
        </Grid>
      ))}
    </Grid>
  );
}