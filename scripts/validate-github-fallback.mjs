import { spawnSync } from "node:child_process";

const checks = [
  {
    env: {
      GITHUB_API_BASE_URL: "http://127.0.0.1:9",
    },
    name: "GitHub unavailable fallback",
  },
  {
    env: {
      GITHUB_ALLOWLIST_DISABLED: "true",
    },
    name: "Empty allowlist fallback",
  },
  {
    env: {
      STATIC_EXPORT: "true",
    },
    name: "Static export fallback",
  },
];

for (const check of checks) {
  console.log(`\n> ${check.name}`);

  const result = spawnSync("npm", ["run", "build"], {
    env: {
      ...process.env,
      ...check.env,
    },
    shell: process.platform === "win32",
    stdio: "inherit",
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}
