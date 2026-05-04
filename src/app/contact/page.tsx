import { Card, CardContent, Stack } from "@mui/material";
import type { Metadata } from "next";

import { SectionHeading } from "@/components/atoms";
import { ContactLinkList } from "@/components/molecules";
import { getResume } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact details for Alex Lucero.",
};

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

          <ContactLinkList
            links={[
              { label: "Email", value: email },
              { label: "LinkedIn", value: linkedin },
              { label: "GitHub", value: github },
            ]}
          />
        </CardContent>
      </Card>
    </Stack>
  );
}
