export type GitHubRepoConfig = {
  projectSlugs?: string[];
  repoName: string;
  repoOwner: string;
  repoPath?: string;
  repoPrimary?: boolean;
  /**
   * Marks a repository that is not publicly readable.
   *
   * Private repos publish recency and language only. Commit messages, SHAs,
   * authors, and commit links are never fetched for them, so no unreleased
   * work can reach the public site regardless of whether GITHUB_TOKEN is set.
   */
  repoPrivate?: boolean;
};

export const githubRepoAllowlist = [
  {
    projectSlugs: ["canonis"],
    repoName: "canonis",
    repoOwner: "Loose-Arrow-Labs",
    repoPrimary: true,
    repoPrivate: true,
  },
  {
    projectSlugs: ["anemoi"],
    repoName: "anemoi",
    repoOwner: "Loose-Arrow-Labs",
    repoPrimary: true,
  },
  {
    projectSlugs: ["pantheon"],
    repoName: "pantheon",
    repoOwner: "alucero270",
    repoPrimary: true,
    repoPrivate: true,
  },
  {
    projectSlugs: ["codex"],
    repoName: "memora",
    repoOwner: "Loose-Arrow-Labs",
    repoPrimary: true,
    repoPrivate: true,
  },
  {
    projectSlugs: ["kittybot"],
    repoName: "kittybot",
    repoOwner: "alucero270",
    repoPrimary: true,
  },
  {
    projectSlugs: ["vtcn"],
    repoName: "Vehicle-Telemetry-and-Control-Node-VTCN-",
    repoOwner: "alucero270",
    repoPrimary: true,
  },
  {
    projectSlugs: ["om606-signal-integration"],
    repoName: "Vehicle-Telemetry-and-Control-Node-VTCN-",
    repoOwner: "alucero270",
    repoPath: "om606-signal-integration",
    repoPrimary: false,
  },
  {
    projectSlugs: ["strata"],
    repoName: "strata",
    repoOwner: "alucero270",
    repoPrimary: true,
  },
] satisfies GitHubRepoConfig[];

export function getGitHubRepoAllowlist(): GitHubRepoConfig[] {
  return process.env.GITHUB_ALLOWLIST_DISABLED === "true" ? [] : githubRepoAllowlist;
}

export function toGitHubRepoKey(repoOwner: string, repoName: string): string {
  return `${repoOwner.toLowerCase()}/${repoName.toLowerCase()}`;
}

export function isGitHubRepoAllowed(repoOwner: string, repoName: string): boolean {
  const repoKey = toGitHubRepoKey(repoOwner, repoName);
  return getGitHubRepoAllowlist().some(
    (repo) => toGitHubRepoKey(repo.repoOwner, repo.repoName) === repoKey,
  );
}

export function isGitHubRepoPrivate(repoOwner: string, repoName: string): boolean {
  const repoKey = toGitHubRepoKey(repoOwner, repoName);
  return getGitHubRepoAllowlist().some(
    (repo) =>
      toGitHubRepoKey(repo.repoOwner, repo.repoName) === repoKey && repo.repoPrivate === true,
  );
}

export function getGitHubReposForProject(projectSlug: string): GitHubRepoConfig[] {
  return getGitHubRepoAllowlist().filter((repo) => repo.projectSlugs?.includes(projectSlug));
}
