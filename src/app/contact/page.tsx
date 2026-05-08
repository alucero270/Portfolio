import { Card, CardContent } from "@mui/material";
import type { Metadata } from "next";

import { SectionHeading } from "@/components/atoms";
import { ContactLinkList } from "@/components/molecules";
import { ContentPageTemplate } from "@/components/templates";
import { getResume } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Loose Arrow Labs about prototype systems engineering and technical R&D.",
};

export default async function ContactPage() {
  const resume = await getResume();
  const email = resume.frontmatter.email ?? siteConfig.email;
  const linkedin = resume.frontmatter.linkedin ?? siteConfig.linkedin;
  const github = resume.frontmatter.github ?? siteConfig.github;

  return (
    <ContentPageTemplate title="Contact Loose Arrow Labs">
      <Card component="section" aria-labelledby="contact-links-heading">
        <CardContent>
          <SectionHeading id="contact-links-heading" sx={{ mb: 2 }}>
            Discuss a technical system
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
    </ContentPageTemplate>
  );
}
