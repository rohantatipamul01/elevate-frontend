import {
  Card,
  CardContent,
  Skeleton,
  Stack,
} from "@mui/material";

export default function TableSkeleton({
  rows = 6,
  columns = 5,
}) {
  return (
    <Card
      elevation={0}
      sx={{
        border: (theme) =>
          `1px solid ${theme.palette.divider}`,
        borderRadius: 4,
      }}
    >
      <CardContent>
        <Stack spacing={2}>
          {/* Header */}
          <Stack
            direction="row"
            spacing={2}
          >
            {Array.from({ length: columns }).map(
              (_, index) => (
                <Skeleton
                  key={index}
                  variant="rounded"
                  height={32}
                  sx={{
                    flex: 1,
                  }}
                />
              )
            )}
          </Stack>

          {/* Rows */}
          {Array.from({ length: rows }).map(
            (_, rowIndex) => (
              <Stack
                key={rowIndex}
                direction="row"
                spacing={2}
              >
                {Array.from({
                  length: columns,
                }).map((_, columnIndex) => (
                  <Skeleton
                    key={columnIndex}
                    variant="rounded"
                    height={24}
                    sx={{
                      flex: 1,
                    }}
                  />
                ))}
              </Stack>
            )
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}