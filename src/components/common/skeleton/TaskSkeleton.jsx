import {
  Grid,
} from "@mui/material";

import CardSkeleton from "./CardSkeleton";

export default function TaskSkeleton({
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
            height={250}
            lines={5}
          />
        </Grid>
      ))}
    </Grid>
  );
}