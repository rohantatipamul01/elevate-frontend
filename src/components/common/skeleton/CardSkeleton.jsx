import {
  Card,
  CardContent,
  Skeleton,
  Stack,
} from "@mui/material";

export default function CardSkeleton({
  height = 220,
  showAvatar = false,
  lines = 3,
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
      <CardContent>
        <Stack spacing={2}>
          {/* Header */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
          >
            {showAvatar && (
              <Skeleton
                variant="circular"
                width={48}
                height={48}
              />
            )}

            <Stack flex={1} spacing={1}>
              <Skeleton
                variant="text"
                width="60%"
                height={32}
              />

              <Skeleton
                variant="text"
                width="35%"
                height={20}
              />
            </Stack>
          </Stack>

          {/* Content */}
          {Array.from({ length: lines }).map((_, index) => (
            <Skeleton
              key={index}
              variant="rounded"
              height={20}
              width={
                index === lines - 1
                  ? "75%"
                  : "100%"
              }
            />
          ))}

          {/* Footer */}
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ mt: "auto" }}
          >
            <Skeleton
              variant="rounded"
              width={90}
              height={32}
            />

            <Skeleton
              variant="rounded"
              width={70}
              height={32}
            />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}