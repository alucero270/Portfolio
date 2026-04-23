import {
  getGitHubReposForProject,
  githubRepoAllowlist,
  isGitHubRepoAllowed,
  toGitHubRepoKey,
  type GitHubRepoConfig,
} from "@/lib/github-config";

const GITHUB_API_BASE = "https://api.github.com";
const DEFAULT_COMMIT_LIMIT = 5;
const DEFAULT_ACTIVITY_LIMIT = 4;

type RawGitHubRepo = {
  description?: string | null;
  html_url?: string;
  language?: string | null;
  name?: string;
  owner?: {
    login?: string;
  };
  pushed_at?: string | null;
  topics?: string[];
  updated_at?: string | null;
};

type RawGitHubCommit = {
  commit?: {
    author?: {
      date?: string | null;
      name?: string | null;
    };
    message?: string;
  };
  html_url?: string;
  sha?: string;
};

export type NormalizedGitHubCommit = {
  authorName?: string;
  committedAt?: string;
  message: string;
  sha: string;
  url: string;
};

export type NormalizedGitHubRepo = {
  description?: string;
  latestCommits: NormalizedGitHubCommit[];
  primaryLanguage?: string;
  projectSlugs: string[];
  pushedAt?: string;
  repoName: string;
  repoOwner: string;
  repoPrimary?: boolean;
  topics: string[];
  updatedAt?: string;
  url: string;
};

export type GitHubActivityItem = {
  label: string;
  occurredAt?: string;
  repoName: string;
  repoOwner: string;
  repoUrl: string;
  summary?: string;
  title: string;
  url: string;
};

export type GitHubRepoFreshness = {
  label: string;
  occurredAt: string;
  primaryLanguage?: string;
  repoName: string;
  repoOwner: string;
  url: string;
};

type FetchOptions = {
  commitLimit?: number;
};

type ActivityFilterOptions = {
  limit?: number;
};

const noisyCommitPatterns = [
  /^merge\b/i,
  /^bump\b/i,
  /^update dependenc/i,
  /^chore\(deps\)/i,
  /^build\(deps\)/i,
  /\bdependabot\b/i,
];

function getGitHubHeaders(): HeadersInit {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
}

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url, {
      headers: getGitHubHeaders(),
      cache: "force-cache",
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as T;
  } catch {
    return null;
  }
}

function normalizeCommit(rawCommit: RawGitHubCommit): NormalizedGitHubCommit | null {
  const sha = rawCommit.sha;
  const url = rawCommit.html_url;
  const message = rawCommit.commit?.message?.split("\n")[0]?.trim();

  if (!sha || !url || !message) {
    return null;
  }

  return {
    authorName: rawCommit.commit?.author?.name ?? undefined,
    committedAt: rawCommit.commit?.author?.date ?? undefined,
    message,
    sha,
    url,
  };
}

function normalizeRepo(
  config: GitHubRepoConfig,
  rawRepo: RawGitHubRepo,
  latestCommits: NormalizedGitHubCommit[],
): NormalizedGitHubRepo | null {
  const repoOwner = rawRepo.owner?.login ?? config.repoOwner;
  const repoName = rawRepo.name ?? config.repoName;
  const url = rawRepo.html_url;

  if (!url) {
    return null;
  }

  return {
    description: rawRepo.description ?? undefined,
    latestCommits,
    primaryLanguage: rawRepo.language ?? undefined,
    projectSlugs: config.projectSlugs ?? [],
    pushedAt: rawRepo.pushed_at ?? undefined,
    repoName,
    repoOwner,
    repoPrimary: config.repoPrimary,
    topics: rawRepo.topics ?? [],
    updatedAt: rawRepo.updated_at ?? undefined,
    url,
  };
}

function getUniqueRepoConfigs(configs: GitHubRepoConfig[]): GitHubRepoConfig[] {
  const configsByRepo = new Map<string, GitHubRepoConfig>();

  for (const config of configs) {
    const key = toGitHubRepoKey(config.repoOwner, config.repoName);
    const existing = configsByRepo.get(key);

    configsByRepo.set(key, {
      ...existing,
      ...config,
      projectSlugs: [...(existing?.projectSlugs ?? []), ...(config.projectSlugs ?? [])],
      repoPrimary: existing?.repoPrimary ?? config.repoPrimary,
    });
  }

  return [...configsByRepo.values()];
}

export async function fetchGitHubRepo(
  config: GitHubRepoConfig,
  options: FetchOptions = {},
): Promise<NormalizedGitHubRepo | null> {
  if (!isGitHubRepoAllowed(config.repoOwner, config.repoName)) {
    return null;
  }

  const commitLimit = options.commitLimit ?? DEFAULT_COMMIT_LIMIT;
  const repoUrl = `${GITHUB_API_BASE}/repos/${config.repoOwner}/${config.repoName}`;
  const commitsUrl = `${repoUrl}/commits?per_page=${commitLimit}`;

  const [rawRepo, rawCommits] = await Promise.all([
    fetchJson<RawGitHubRepo>(repoUrl),
    fetchJson<RawGitHubCommit[]>(commitsUrl),
  ]);

  if (!rawRepo) {
    return null;
  }

  const latestCommits = (rawCommits ?? [])
    .map((commit) => normalizeCommit(commit))
    .filter((commit): commit is NormalizedGitHubCommit => Boolean(commit));

  return normalizeRepo(config, rawRepo, latestCommits);
}

export async function fetchAllowlistedGitHubRepos(
  configs: GitHubRepoConfig[] = githubRepoAllowlist,
  options: FetchOptions = {},
): Promise<NormalizedGitHubRepo[]> {
  const repos = await Promise.all(
    getUniqueRepoConfigs(configs).map((config) => fetchGitHubRepo(config, options)),
  );

  return repos.filter((repo): repo is NormalizedGitHubRepo => Boolean(repo));
}

export function isUsefulGitHubCommit(commit: NormalizedGitHubCommit): boolean {
  const authorName = commit.authorName?.toLowerCase() ?? "";
  const message = commit.message.trim();

  if (!message) {
    return false;
  }

  if (authorName.includes("bot") || authorName.includes("github-actions")) {
    return false;
  }

  return !noisyCommitPatterns.some((pattern) => pattern.test(message));
}

function toDateWeight(value: string | undefined): number {
  if (!value) {
    return Number.NEGATIVE_INFINITY;
  }

  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? Number.NEGATIVE_INFINITY : parsed;
}

function formatGitHubDate(value: string): string | null {
  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
    year: "numeric",
  }).format(parsed);
}

function getLatestUsefulCommit(repo: NormalizedGitHubRepo): NormalizedGitHubCommit | null {
  const usefulCommits = repo.latestCommits
    .filter((commit) => isUsefulGitHubCommit(commit))
    .sort((a, b) => toDateWeight(b.committedAt) - toDateWeight(a.committedAt));

  return usefulCommits[0] ?? null;
}

export function getFilteredGitHubActivity(
  repos: NormalizedGitHubRepo[],
  options: ActivityFilterOptions = {},
): GitHubActivityItem[] {
  const limit = options.limit ?? DEFAULT_ACTIVITY_LIMIT;

  const activityItems = repos.map((repo): GitHubActivityItem | null => {
    const latestCommit = getLatestUsefulCommit(repo);

    if (!latestCommit) {
      return null;
    }

    const repoLabel = `${repo.repoOwner}/${repo.repoName}`;
    const omittedCommitCount =
      repo.latestCommits.filter((commit) => isUsefulGitHubCommit(commit)).length - 1;

    return {
      label: repoLabel,
      occurredAt: latestCommit.committedAt ?? repo.pushedAt ?? repo.updatedAt,
      repoName: repo.repoName,
      repoOwner: repo.repoOwner,
      repoUrl: repo.url,
      summary:
        omittedCommitCount > 0
          ? `${omittedCommitCount} other recent useful commit${
              omittedCommitCount === 1 ? "" : "s"
            } in this repository.`
          : repo.description,
      title: latestCommit.message,
      url: latestCommit.url,
    };
  });

  return activityItems
    .filter((item): item is GitHubActivityItem => Boolean(item))
    .sort((a, b) => toDateWeight(b.occurredAt) - toDateWeight(a.occurredAt))
    .slice(0, limit);
}

export function getGitHubRepoFreshness(repo: NormalizedGitHubRepo): GitHubRepoFreshness | null {
  const occurredAt = repo.pushedAt ?? repo.updatedAt;

  if (!occurredAt) {
    return null;
  }

  const formattedDate = formatGitHubDate(occurredAt);

  if (!formattedDate) {
    return null;
  }

  return {
    label: `${repo.pushedAt ? "Repo pushed" : "Repo updated"} ${formattedDate}`,
    occurredAt,
    primaryLanguage: repo.primaryLanguage,
    repoName: repo.repoName,
    repoOwner: repo.repoOwner,
    url: repo.url,
  };
}

function selectGitHubRepoFreshness(repos: NormalizedGitHubRepo[]): GitHubRepoFreshness | null {
  const freshnessCandidates = repos
    .map((repo) => ({
      freshness: getGitHubRepoFreshness(repo),
      repo,
    }))
    .filter(
      (candidate): candidate is { freshness: GitHubRepoFreshness; repo: NormalizedGitHubRepo } =>
        Boolean(candidate.freshness),
    )
    .sort((a, b) => {
      if (a.repo.repoPrimary !== b.repo.repoPrimary) {
        return b.repo.repoPrimary ? 1 : -1;
      }

      return toDateWeight(b.freshness.occurredAt) - toDateWeight(a.freshness.occurredAt);
    });

  return freshnessCandidates[0]?.freshness ?? null;
}

export async function fetchProjectGitHubFreshness(
  projectSlug: string,
): Promise<GitHubRepoFreshness | null> {
  if (process.env.STATIC_EXPORT === "true") {
    return null;
  }

  const configs = getGitHubReposForProject(projectSlug);

  if (configs.length === 0) {
    return null;
  }

  try {
    const repos = await fetchAllowlistedGitHubRepos(configs, { commitLimit: 1 });

    return selectGitHubRepoFreshness(repos);
  } catch {
    return null;
  }
}

export async function fetchGitHubFreshnessByProjectSlug(
  configs: GitHubRepoConfig[] = githubRepoAllowlist,
): Promise<Map<string, GitHubRepoFreshness>> {
  const freshnessBySlug = new Map<string, GitHubRepoFreshness>();

  if (process.env.STATIC_EXPORT === "true") {
    return freshnessBySlug;
  }

  try {
    const repos = await fetchAllowlistedGitHubRepos(configs, { commitLimit: 1 });
    const reposBySlug = new Map<string, NormalizedGitHubRepo[]>();

    for (const repo of repos) {
      for (const projectSlug of repo.projectSlugs) {
        reposBySlug.set(projectSlug, [...(reposBySlug.get(projectSlug) ?? []), repo]);
      }
    }

    for (const [projectSlug, projectRepos] of reposBySlug.entries()) {
      const freshness = selectGitHubRepoFreshness(projectRepos);

      if (freshness) {
        freshnessBySlug.set(projectSlug, freshness);
      }
    }
  } catch {
    return freshnessBySlug;
  }

  return freshnessBySlug;
}
