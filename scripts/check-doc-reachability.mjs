#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(scriptDirectory, "..");
const docsConfig = JSON.parse(
  fs.readFileSync(path.join(repositoryRoot, "docs.json"), "utf8"),
);
const allowlist = JSON.parse(
  fs.readFileSync(
    path.join(scriptDirectory, "doc-reachability-allowlist.json"),
    "utf8",
  ),
);

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name === ".git" || entry.name === "node_modules") {
      return [];
    }

    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(entryPath) : [entryPath];
  });
}

function normalizeRoute(route) {
  return route
    .replace(/^https?:\/\/docs\.risingwave\.com/, "")
    .replace(/^\/+/, "")
    .replace(/\.mdx$/, "")
    .replace(/\/$/, "");
}

const mdxFiles = walk(repositoryRoot).filter((file) => file.endsWith(".mdx"));
const routes = new Map(
  mdxFiles.map((file) => [
    normalizeRoute(path.relative(repositoryRoot, file).replaceAll("\\", "/")),
    file,
  ]),
);

const navigationRoutes = new Set();
function collectNavigationRoutes(value, parentKey = "") {
  if (Array.isArray(value)) {
    for (const item of value) {
      collectNavigationRoutes(item, parentKey);
    }
  } else if (value && typeof value === "object") {
    for (const [key, child] of Object.entries(value)) {
      collectNavigationRoutes(child, key);
    }
  } else if (typeof value === "string" && parentKey === "pages") {
    navigationRoutes.add(normalizeRoute(value));
  }
}
collectNavigationRoutes(docsConfig.navigation);

const redirects = new Map(
  (docsConfig.redirects ?? []).map(({ source, destination }) => [
    normalizeRoute(source),
    normalizeRoute(destination.replace(/[?#].*$/, "")),
  ]),
);

function followRedirect(route) {
  const visited = new Set();
  while (redirects.has(route) && !visited.has(route)) {
    visited.add(route);
    route = redirects.get(route);
  }
  return route;
}

function resolveTarget(sourceRoute, rawTarget) {
  const target = rawTarget
    .trim()
    .replace(/^<|>$/g, "")
    .replace(/[?#].*$/, "");

  if (
    !target ||
    target.startsWith("#") ||
    /^(?:https?:|mailto:|tel:|data:|javascript:)/.test(target)
  ) {
    return null;
  }

  const route = target.startsWith("/")
    ? normalizeRoute(target)
    : normalizeRoute(
        path.posix.normalize(path.posix.join(path.posix.dirname(sourceRoute), target)),
      );
  const canonicalRoute = followRedirect(route);
  return routes.has(canonicalRoute) ? canonicalRoute : null;
}

const edges = new Map([...routes.keys()].map((route) => [route, new Set()]));
const linkPatterns = [
  /\]\(([^)\s]+)(?:\s+["'][^)]*["'])?\)/g,
  /(?:href|src)\s*=\s*["']([^"']+)["']/g,
  /\bfrom\s+["']([^"']+)["']/g,
];

for (const [sourceRoute, file] of routes) {
  const content = fs.readFileSync(file, "utf8");
  for (const pattern of linkPatterns) {
    for (const match of content.matchAll(pattern)) {
      const targetRoute = resolveTarget(sourceRoute, match[1]);
      if (targetRoute && targetRoute !== sourceRoute) {
        edges.get(sourceRoute).add(targetRoute);
      }
    }
  }
}

const errors = [];
const shadowedRoutes = [...redirects.keys()].filter((route) => routes.has(route));
if (shadowedRoutes.length > 0) {
  errors.push(
    "Redirect sources must not also exist as .mdx files:\n" +
      shadowedRoutes.map((route) => `  - ${route}.mdx`).join("\n"),
  );
}

const missingNavigationPages = [...navigationRoutes].filter(
  (route) => !routes.has(followRedirect(route)),
);
if (missingNavigationPages.length > 0) {
  errors.push(
    "Navigation entries do not resolve to .mdx files:\n" +
      missingNavigationPages.map((route) => `  - ${route}`).join("\n"),
  );
}

const reachableRoutes = new Set(
  [...navigationRoutes]
    .map(followRedirect)
    .filter((route) => routes.has(route) && !redirects.has(route)),
);
const queue = [...reachableRoutes];
while (queue.length > 0) {
  const sourceRoute = queue.shift();
  for (const targetRoute of edges.get(sourceRoute) ?? []) {
    if (!reachableRoutes.has(targetRoute)) {
      reachableRoutes.add(targetRoute);
      queue.push(targetRoute);
    }
  }
}

const allowedOrphans = new Map(
  Object.entries(allowlist.orphanedPages ?? {}).map(([route, reason]) => [
    normalizeRoute(route),
    reason,
  ]),
);
const orphanedRoutes = [...routes.keys()]
  .filter((route) => !reachableRoutes.has(route) && !redirects.has(route))
  .sort();
const unexpectedOrphans = orphanedRoutes.filter(
  (route) => !allowedOrphans.has(route),
);
if (unexpectedOrphans.length > 0) {
  errors.push(
    "Pages are not reachable from docs.json navigation through links or imports:\n" +
      unexpectedOrphans.map((route) => `  - ${route}.mdx`).join("\n"),
  );
}

const staleAllowlistEntries = [...allowedOrphans.keys()].filter(
  (route) => !orphanedRoutes.includes(route),
);
if (staleAllowlistEntries.length > 0) {
  errors.push(
    "Remove stale entries from scripts/doc-reachability-allowlist.json:\n" +
      staleAllowlistEntries.map((route) => `  - ${route}`).join("\n"),
  );
}

if (errors.length > 0) {
  console.error(errors.join("\n\n"));
  process.exit(1);
}

console.log(
  `Docs reachability check passed: ${routes.size} pages, ` +
    `${reachableRoutes.size} reachable, ${orphanedRoutes.length} explicitly allowed.`,
);
