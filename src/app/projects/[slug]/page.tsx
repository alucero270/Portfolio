import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { MdxContent } from "@/components/mdx-content";
import { ProjectDetailHeader } from "@/components/organisms";
import { ProjectDetailTemplate } from "@/components/templates";
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
    <ProjectDetailTemplate
      header={
        <ProjectDetailHeader
          backHref={toInternalHref("/projects")}
          status={project.frontmatter.status}
          title={project.frontmatter.title ?? slug}
          updated={project.frontmatter.updated}
        />
      }
    >
      <MdxContent>{project.content}</MdxContent>
    </ProjectDetailTemplate>
  );
}
