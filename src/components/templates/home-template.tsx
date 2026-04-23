import { Divider, Stack } from "@mui/material";
import type { ReactNode } from "react";

type HomeTemplateProps = {
  sections: ReactNode[];
};

export function HomeTemplate({ sections }: HomeTemplateProps) {
  return (
    <Stack spacing={7}>
      {sections.map((section, index) => (
        <Stack key={index} spacing={7}>
          {index > 0 ? <Divider /> : null}
          {section}
        </Stack>
      ))}
    </Stack>
  );
}
