import { Box, Button, Stack, Typography } from "@mui/material";
import type { Metadata } from "next";

import { MdxContent } from "@/components/mdx-content";
import { getResume } from "@/lib/content";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Resume",
  description: "Detailed resume and work experience for Alex Lucero.",
};

export default async function ResumePage() {
  const resume = await getResume();

  return (
    <Stack spacing={3}>
      <Box component="header">
        <Typography component="h1" variant="h1" gutterBottom>
          {resume.frontmatter.title ?? "Resume"}
        </Typography>
        <Button href="/resume/Alex_Lucero_Resume.pdf" variant="contained" component="a" download>
          Download PDF
        </Button>
      </Box>

      <MdxContent>{resume.content}</MdxContent>
    </Stack>
  );
}
