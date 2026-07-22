import {
  Card,
  CardContent,
  Grid,
  Skeleton,
  Stack,
} from "@mui/material";

export default function CalendarSkeleton() {
  const weekDays = Array.from({ length: 7 });
  const calendarCells = Array.from({ length: 42 });

  return (
    <Stack spacing={3}>
      {/* Calendar Header */}
      <Card
        elevation={0}
        sx={{
          border: (theme) =>
            `1px solid ${theme.palette.divider}`,
          borderRadius: 4,
        }}
      >
        <CardContent>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Skeleton
              variant="text"
              width={220}
              height={40}
            />

            <Stack
              direction="row"
              spacing={1}
            >
              <Skeleton
                variant="rounded"
                width={90}
                height={38}
              />

              <Skeleton
                variant="circular"
                width={38}
                height={38}
              />

              <Skeleton
                variant="circular"
                width={38}
                height={38}
              />
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      {/* Legend */}
      <Card
        elevation={0}
        sx={{
          border: (theme) =>
            `1px solid ${theme.palette.divider}`,
          borderRadius: 4,
        }}
      >
        <CardContent>
          <Stack
            direction="row"
            spacing={2}
            flexWrap="wrap"
          >
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton
                key={index}
                variant="rounded"
                width={110}
                height={34}
              />
            ))}
          </Stack>
        </CardContent>
      </Card>

      {/* Weekday Labels */}
      <Grid
        container
        spacing={2}
      >
        {weekDays.map((_, index) => (
          <Grid
            key={index}
            size={{
              xs: 12 / 7,
            }}
          >
            <Skeleton
              variant="text"
              width="70%"
              height={28}
              sx={{ mx: "auto" }}
            />
          </Grid>
        ))}
      </Grid>

      {/* Calendar Grid */}
      <Grid
        container
        spacing={2}
      >
        {calendarCells.map((_, index) => (
          <Grid
            key={index}
            size={{
              xs: 12,
              sm: 6,
              md: 12 / 7,
            }}
          >
            <Card
              elevation={0}
              sx={{
                minHeight: 170,
                border: (theme) =>
                  `1px solid ${theme.palette.divider}`,
                borderRadius: 3,
              }}
            >
              <CardContent>
                <Stack spacing={1.5}>
                  <Skeleton
                    variant="circular"
                    width={32}
                    height={32}
                  />

                  <Skeleton
                    variant="rounded"
                    height={24}
                  />

                  <Skeleton
                    variant="rounded"
                    height={24}
                    width="85%"
                  />

                  <Skeleton
                    variant="rounded"
                    height={24}
                    width="65%"
                  />
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}