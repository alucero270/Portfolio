import fs from "node:fs/promises";
import path from "node:path";
import type { ReactNode } from "react";
import { cache } from "react";

import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import { mdxComponents } from "@/lib/mdx-components";

const CONTENT_DIR = path.join(process.cwd(), "content");
const PROJECTS_DIR = path.join(CONTENT_DIR, "projects");

export type BioFrontmatter = {
  title?: string;
  description?: string;
  now?: string;
};

export type ResumeFrontmatter = {
  title?: string;
  description?: string;
  pdfPath?: string;
  email?: string;
  linkedin?: string;
  github?: string;
};

export type ProjectFrontmatter = {
  title?: string;
  description?: string;
  slug?: string;
  summary?: string;
  featured?: boolean;
  status?: string;
  updated?: string;
};

export type RenderedMdx<TFrontmatter> = {
  frontmatter: TFrontmatter;
  content: ReactNode;
};

export type ProjectSummary = ProjectFrontmatter & {
  slug: string;
  fileName: string;
  title: string;
  summary: string;
};

const mdxOptions = {
  parseFrontmatter: true,
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug],
  },
};

async function readMdxFile(filePath: string): Promise<string> {
  return fs.readFile(filePath, "utf8");
}

function normalizeSlug(fileName: string, frontmatterSlug?: string): string {
  return (frontmatterSlug ?? fileName.replace(/\.mdx$/, "")).trim().toLowerCase();
}

function toIsoDateWeight(value: string | undefined): number {
  if (!value) {
    return Number.NEGATIVE_INFINITY;
  }

  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? Number.NEGATIVE_INFINITY : parsed;
}

function sortProjects(projects: ProjectSummary[]): ProjectSummary[] {
  return [...projects].sort((a, b) => {
    if ((a.featured ?? false) !== (b.featured ?? false)) {
      return a.featured ? -1 : 1;
    }

    const dateDiff = toIsoDateWeight(b.updated) - toIsoDateWeight(a.updated);
    if (dateDiff !== 0) {
      return dateDiff;
    }

    return a.slug.localeCompare(b.slug);
  });
}

async function compileFile<TFrontmatter extends Record<string, unknown>>(
  absolutePath: string,
): Promise<RenderedMdx<TFrontmatter>> {
  const source = await readMdxFile(absolutePath);
  return compileMDX<TFrontmatter>({
    source,
    options: mdxOptions,
    components: mdxComponents,
  });
}

export const getBio = cache(async (): Promise<RenderedMdx<BioFrontmatter>> => {
  return compileFile<BioFrontmatter>(path.join(CONTENT_DIR, "bio.mdx"));
});

export const getResume = cache(async (): Promise<RenderedMdx<ResumeFrontmatter>> => {
  return compileFile<ResumeFrontmatter>(path.join(CONTENT_DIR, "resume.mdx"));
});

export const getAllProjects = cache(async (): Promise<ProjectSummary[]> => {
  const entries = await fs.readdir(PROJECTS_DIR, { withFileTypes: true });
  const files = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => entry.name);

  const projects = await Promise.all(
    files.map(async (fileName) => {
      const source = await readMdxFile(path.join(PROJECTS_DIR, fileName));
      const { data } = matter(source);
      const frontmatter = data as ProjectFrontmatter;
      const slug = normalizeSlug(fileName, frontmatter.slug);

      return {
        ...frontmatter,
        slug,
        fileName,
        title: frontmatter.title ?? "TODO: Add project title",
        summary: frontmatter.summary ?? "TODO: Add project summary",
      } satisfies ProjectSummary;
    }),
  );

  return sortProjects(projects);
});

export const getFeaturedProjects = cache(async (): Promise<ProjectSummary[]> => {
  const allProjects = await getAllProjects();
  const featuredProjects = allProjects.filter((project) => project.featured);
  return (featuredProjects.length > 0 ? featuredProjects : allProjects).slice(0, 3);
});

export const getProjectSlugs = cache(async (): Promise<string[]> => {
  const projects = await getAllProjects();
  return projects.map((project) => project.slug);
});

export const getProjectBySlug = cache(
  async (slug: string): Promise<(RenderedMdx<ProjectFrontmatter> & { slug: string }) | null> => {
    const projects = await getAllProjects();
    const targetProject = projects.find((project) => project.slug === slug);
    if (!targetProject) {
      return null;
    }

    const rendered = await compileFile<ProjectFrontmatter>(
      path.join(PROJECTS_DIR, targetProject.fileName),
    );
    return {
      ...rendered,
      slug: targetProject.slug,
      frontmatter: {
        ...rendered.frontmatter,
        title: rendered.frontmatter.title ?? "TODO: Add project title",
        summary: rendered.frontmatter.summary ?? "TODO: Add project summary",
      },
    };
  },
);
