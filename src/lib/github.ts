import {
  githubRepoAllowlist,
  isGitHubRepoAllowed,
  toGitHubRepoKey,
  type GitHubRepoConfig,
} from "@/lib/github-config";

const GITHUB_API_BASE = "https://api.github.com";
const DEFAULT_COMMIT_LIMIT = 5;

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

type FetchOptions = {
  commitLimit?: number;
};

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
