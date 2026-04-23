import type { Metadata } from "next";

import { MdxContent } from "@/components/mdx-content";
import { ContentPageTemplate } from "@/components/templates";
import { getAbout } from "@/lib/content";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  const about = await getAbout();

  return {
    title: about.frontmatter.title ?? "About",
    description:
      about.frontmatter.description ?? "Founder context and technical direction for Alex Lucero.",
  };
}

export default async function AboutPage() {
  const about = await getAbout();

  return (
    <ContentPageTemplate title={about.frontmatter.title ?? "About Alex Lucero"}>
      <MdxContent>{about.content}</MdxContent>
    </ContentPageTemplate>
  );
}
