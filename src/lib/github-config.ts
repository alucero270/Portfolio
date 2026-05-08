export type GitHubRepoConfig = {
  projectSlugs?: string[];
  repoName: string;
  repoOwner: string;
  repoPath?: string;
  repoPrimary?: boolean;
};

export const githubRepoAllowlist = [
  {
    projectSlugs: ["codex"],
    repoName: "memora",
    repoOwner: "alucero270",
    repoPrimary: true,
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
    projectSlugs: ["pantheon"],
    repoName: "pantheon",
    repoOwner: "alucero270",
    repoPrimary: true,
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

export function getGitHubReposForProject(projectSlug: string): GitHubRepoConfig[] {
  return getGitHubRepoAllowlist().filter((repo) => repo.projectSlugs?.includes(projectSlug));
}
