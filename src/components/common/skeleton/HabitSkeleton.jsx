import {
  Grid,
} from "@mui/material";

import CardSkeleton from "./CardSkeleton";

export default function HabitSkeleton({
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
            height={230}
            lines={4}
          />
        </Grid>
      ))}
    </Grid>
  );
}