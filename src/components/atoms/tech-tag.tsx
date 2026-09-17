import { Chip } from "@mui/material";

type TechTagProps = {
  label: string;
};

export function TechTag({ label }: TechTagProps) {
  return (
    <Chip
      size="small"
      label={label}
      variant="outlined"
      sx={{
        maxWidth: "100%",
        "& .MuiChip-label": {
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        },
      }}
    />
  );
}
