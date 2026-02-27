import { Button, Stack, Typography } from "@mui/material";

export default function NotFoundPage() {
  return (
    <Stack spacing={2.5}>
      <Typography component="h1" variant="h1">
        Not Found
      </Typography>
      <Typography color="text.secondary">The page you requested does not exist.</Typography>
      <Button href="/" variant="contained">
        Back to home
      </Button>
    </Stack>
  );
}
