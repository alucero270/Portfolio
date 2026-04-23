import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import type { Metadata } from "next";

import { ExternalLink, SectionHeading } from "@/components/atoms";
import { getResume } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact details for Alex Lucero.",
};

function isExternalLink(value: string): boolean {
  return value.startsWith("http://") || value.startsWith("https://");
}

export default async function ContactPage() {
  const resume = await getResume();
  const email = resume.frontmatter.email ?? siteConfig.email;
  const linkedin = resume.frontmatter.linkedin ?? siteConfig.linkedin;
  const github = resume.frontmatter.github ?? siteConfig.github;

  return (
    <Stack spacing={3.5}>
      <SectionHeading component="h1" variant="h1">
        Contact
      </SectionHeading>

      <Card component="section" aria-labelledby="contact-links-heading">
        <CardContent>
          <SectionHeading id="contact-links-heading" sx={{ mb: 2 }}>
            Reach Out
          </SectionHeading>

          <Stack spacing={1.25}>
            <Typography component="p">
              <Box component="span" sx={{ fontWeight: 700 }}>
                Email:{" "}
              </Box>
              {email}
            </Typography>
            <Typography component="p">
              <Box component="span" sx={{ fontWeight: 700 }}>
                LinkedIn:{" "}
              </Box>
              {isExternalLink(linkedin) ? <ExternalLink href={linkedin} /> : linkedin}
            </Typography>
            <Typography component="p">
              <Box component="span" sx={{ fontWeight: 700 }}>
                GitHub:{" "}
              </Box>
              {isExternalLink(github) ? <ExternalLink href={github} /> : github}
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}
