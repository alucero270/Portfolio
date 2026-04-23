import { Button } from "@mui/material";
import type { Metadata } from "next";

import { MdxContent } from "@/components/mdx-content";
import { ContentPageTemplate } from "@/components/templates";
import { getResume } from "@/lib/content";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Resume",
  description: "Detailed resume and work experience for Alex Lucero.",
};

export default async function ResumePage() {
  const resume = await getResume();
  const pdfPath = resume.frontmatter.pdfPath ?? "/resume/Alex_Lucero_Resume.pdf";

  return (
    <ContentPageTemplate
      actions={
        <Button href={pdfPath} variant="contained" component="a" download>
          Download PDF
        </Button>
      }
      title={resume.frontmatter.title ?? "Resume"}
    >
      <MdxContent>{resume.content}</MdxContent>
    </ContentPageTemplate>
  );
}
