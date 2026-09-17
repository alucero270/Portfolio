/**
 * Regression test for issue #73.
 *
 * Stands up a fake GitHub API that serves commit data for EVERY allowlisted
 * repository, including the private ones, then builds the site and inspects
 * the generated HTML.
 *
 * Each repo is given a uniquely identifiable commit subject. A private repo's
 * subject must never appear in the output; a public repo's must, which proves
 * the harness is actually exercising the render path rather than passing
 * because nothing rendered at all.
 */
import { spawn } from "node:child_process";
import { createServer } from "node:http";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const PRIVATE_REPOS = [
  ["Loose-Arrow-Labs", "canonis"],
  ["Loose-Arrow-Labs", "memora"],
  ["alucero270", "pantheon"],
];
const PUBLIC_CONTROL = ["Loose-Arrow-Labs", "anemoi"];

const canary = (owner, name) => `CANARY-${owner}-${name}-COMMIT-SUBJECT`;

// The homepage activity feed renders only the 3 most recent commits, so the
// public control repo is dated newest to guarantee it appears. Without this
// every repo shares a timestamp and the control can be crowded out, making
// the test fail for a reason unrelated to privacy.
const NOW = Date.now();
const dateFor = (owner, name) =>
  new Date(
    owner === PUBLIC_CONTROL[0] && name === PUBLIC_CONTROL[1] ? NOW : NOW - 30 * 864e5,
  ).toISOString();

const server = createServer((req, res) => {
  const [, , owner, name, sub] = req.url.split("?")[0].split("/");
  res.setHeader("Content-Type", "application/json");

  if (sub === "commits") {
    res.end(
      JSON.stringify([
        {
          sha: "0".repeat(40),
          html_url: `https://github.com/${owner}/${name}/commit/0000000`,
          commit: {
            message: canary(owner, name),
            author: { name: "Test Author", date: dateFor(owner, name) },
          },
        },
      ]),
    );
    return;
  }

  res.end(
    JSON.stringify({
      name,
      owner: { login: owner },
      html_url: `https://github.com/${owner}/${name}`,
      description: `CANARY-${owner}-${name}-DESCRIPTION`,
      language: "Rust",
      pushed_at: dateFor(owner, name),
      updated_at: dateFor(owner, name),
      topics: [],
    }),
  );
});

await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const { port } = server.address();
console.log(`> fake GitHub API on 127.0.0.1:${port}`);

// spawn, not spawnSync: the fake API above runs on this process's event loop,
// and a synchronous child would block it so no request could ever be served.
const buildStatus = await new Promise((resolve, reject) => {
  const child = spawn("npm", ["run", "build"], {
    env: {
      ...process.env,
      GITHUB_API_BASE_URL: `http://127.0.0.1:${port}`,
      GITHUB_TOKEN: "test-token-private-repos-readable",
    },
    shell: process.platform === "win32",
    stdio: "inherit",
  });

  child.on("error", reject);
  child.on("close", resolve);
});

server.close();

if (buildStatus !== 0) {
  console.error("build failed");
  process.exit(buildStatus ?? 1);
}

function collectText(dir) {
  let out = "";
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stats = statSync(full);
    if (stats.isDirectory()) {
      out += collectText(full);
    } else if (/\.(html|json|js|rsc|txt)$/.test(entry)) {
      out += readFileSync(full, "utf8");
    }
  }
  return out;
}

const output = collectText(".next");
const failures = [];

for (const [owner, name] of PRIVATE_REPOS) {
  if (output.includes(canary(owner, name))) {
    failures.push(`LEAK: commit subject from private repo ${owner}/${name} is in build output`);
  }
  if (output.includes(`CANARY-${owner}-${name}-DESCRIPTION`)) {
    failures.push(`LEAK: description from private repo ${owner}/${name} is in build output`);
  }
}

const [publicOwner, publicName] = PUBLIC_CONTROL;
if (!output.includes(canary(publicOwner, publicName))) {
  failures.push(
    `HARNESS BROKEN: public control repo ${publicOwner}/${publicName} rendered no commit subject, ` +
      `so the private-repo assertions above prove nothing`,
  );
}

if (failures.length > 0) {
  console.error("\n" + failures.map((line) => `  x ${line}`).join("\n"));
  process.exit(1);
}

console.log("\n  ok private repo commit subjects and descriptions are absent from build output");
console.log("  ok public control repo commit subject is present");
