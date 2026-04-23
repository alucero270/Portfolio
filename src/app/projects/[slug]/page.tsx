import { ArrowBack } from "@mui/icons-material";
import { Box, Stack } from "@mui/material";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SectionHeading } from "@/components/atoms";
import { MdxContent } from "@/components/mdx-content";
import { CTAGroup, ProjectMetaRow } from "@/components/molecules";
import { getProjectBySlug, getProjectSlugs } from "@/lib/content";
import { toInternalHref } from "@/lib/routing";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
      description: "Requested project page was not found.",
    };
  }

  const title = project.frontmatter.title ?? slug;
  const description =
    project.frontmatter.summary ?? project.frontmatter.description ?? "Project details page.";
  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <Stack spacing={3.5}>
      <Box component="header">
        <Box sx={{ mb: 1.5 }}>
          <CTAGroup
            actions={[
              {
                href: toInternalHref("/projects"),
                label: "Back to projects",
                startIcon: <ArrowBack />,
              },
            ]}
          />
        </Box>
        <SectionHeading component="h1" variant="h1" gutterBottom>
          {project.frontmatter.title}
        </SectionHeading>
        <ProjectMetaRow status={project.frontmatter.status} updated={project.frontmatter.updated} />
      </Box>

      <MdxContent>{project.content}</MdxContent>
    </Stack>
  );
}
