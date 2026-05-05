import { Divider, Stack } from "@mui/material";
import type { ReactNode } from "react";

type HomeTemplateProps = {
  sections: ReactNode[];
};

export function HomeTemplate({ sections }: HomeTemplateProps) {
  return (
    <Stack spacing={{ xs: 6, md: 8 }}>
      {sections.map((section, index) => (
        <Stack key={index} spacing={{ xs: 6, md: 8 }}>
          {index > 0 ? <Divider /> : null}
          {section}
        </Stack>
      ))}
    </Stack>
  );
}
