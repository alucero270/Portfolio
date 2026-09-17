import { Chip } from "@mui/material";

type StatusChipProps = {
  label: string;
};

export function StatusChip({ label }: StatusChipProps) {
  return (
    <Chip
      size="small"
      label={label}
      sx={{
        border: "1px solid rgba(123, 216, 143, 0.28)",
        borderRadius: 1,
        color: "#7BD88F",
        fontFamily: "var(--font-code)",
        fontSize: "0.64rem",
        fontWeight: 600,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        "& .MuiChip-label": { px: 1 },
      }}
      variant="outlined"
    />
  );
}
