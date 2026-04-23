import { Button, Stack } from "@mui/material";
import type { ReactNode } from "react";

type CTA = {
  endIcon?: ReactNode;
  href: string;
  label: string;
  startIcon?: ReactNode;
  variant?: "contained" | "outlined" | "text";
};

type CTAGroupProps = {
  actions: CTA[];
};

export function CTAGroup({ actions }: CTAGroupProps) {
  if (actions.length === 0) {
    return null;
  }

  return (
    <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
      {actions.map((action) => (
        <Button
          key={`${action.href}-${action.label}`}
          href={action.href}
          variant={action.variant ?? "text"}
          startIcon={action.startIcon}
          endIcon={action.endIcon}
        >
          {action.label}
        </Button>
      ))}
    </Stack>
  );
}
