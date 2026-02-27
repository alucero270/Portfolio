import { Box, Card, CardContent, Link, Stack, Typography } from "@mui/material";
import type { Metadata } from "next";

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
      <Typography component="h1" variant="h1">
        Contact
      </Typography>

      <Card component="section" aria-labelledby="contact-links-heading">
        <CardContent>
          <Typography id="contact-links-heading" component="h2" variant="h2" sx={{ mb: 2 }}>
            Reach Out
          </Typography>

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
              {isExternalLink(linkedin) ? (
                <Link href={linkedin} target="_blank" rel="noopener noreferrer">
                  {linkedin}
                </Link>
              ) : (
                linkedin
              )}
            </Typography>
            <Typography component="p">
              <Box component="span" sx={{ fontWeight: 700 }}>
                GitHub:{" "}
              </Box>
              {isExternalLink(github) ? (
                <Link href={github} target="_blank" rel="noopener noreferrer">
                  {github}
                </Link>
              ) : (
                github
              )}
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}
