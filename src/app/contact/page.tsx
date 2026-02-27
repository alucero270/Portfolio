import { Box, Card, CardContent, Link, Stack, Typography } from "@mui/material";
import type { Metadata } from "next";

import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact details for Alex Lucero.",
};

function isExternalLink(value: string): boolean {
  return value.startsWith("http://") || value.startsWith("https://");
}

export default function ContactPage() {
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
              {siteConfig.email}
            </Typography>
            <Typography component="p">
              <Box component="span" sx={{ fontWeight: 700 }}>
                LinkedIn:{" "}
              </Box>
              {isExternalLink(siteConfig.linkedin) ? (
                <Link href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer">
                  {siteConfig.linkedin}
                </Link>
              ) : (
                siteConfig.linkedin
              )}
            </Typography>
            <Typography component="p">
              <Box component="span" sx={{ fontWeight: 700 }}>
                GitHub:{" "}
              </Box>
              {isExternalLink(siteConfig.github) ? (
                <Link href={siteConfig.github} target="_blank" rel="noopener noreferrer">
                  {siteConfig.github}
                </Link>
              ) : (
                siteConfig.github
              )}
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}
