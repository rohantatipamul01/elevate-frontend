import {
  Card,
  CardContent,
  Skeleton,
  Stack,
} from "@mui/material";

export default function ChartSkeleton({
  height = 360,
}) {
  return (
    <Card
      elevation={0}
      sx={{
        height,
        border: (theme) => `1px solid ${theme.palette.divider}`,
        borderRadius: 4,
      }}
    >
      <CardContent
        sx={{
          height: "100%",
        }}
      >
        <Stack
          spacing={3}
          sx={{
            height: "100%",
          }}
        >
          {/* Title */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Skeleton
              variant="text"
              width={180}
              height={34}
            />

            <Skeleton
              variant="rounded"
              width={70}
              height={28}
            />
          </Stack>

          {/* Chart Area */}
          <Stack
            direction="row"
            alignItems="flex-end"
            justifyContent="space-between"
            spacing={1}
            sx={{
              flexGrow: 1,
            }}
          >
            {[45, 90, 65, 120, 80, 105, 70].map(
              (barHeight, index) => (
                <Skeleton
                  key={index}
                  variant="rounded"
                  width="100%"
                  height={barHeight}
                  sx={{
                    borderRadius: 2,
                  }}
                />
              )
            )}
          </Stack>

          {/* X-Axis Labels */}
          <Stack
            direction="row"
            justifyContent="space-between"
          >
            {Array.from({ length: 7 }).map((_, index) => (
              <Skeleton
                key={index}
                variant="text"
                width={28}
                height={20}
              />
            ))}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}