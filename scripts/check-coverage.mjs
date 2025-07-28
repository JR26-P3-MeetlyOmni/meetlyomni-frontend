#!/usr/bin/env node

import { execSync } from "child_process";
import { mkdtempSync, readFileSync, rmSync, existsSync, symlinkSync } from "fs";
import os from "os";
import path from "path";

function runCoverageAndGetMetrics(cwd) {
  execSync("npm run test:coverage", { cwd, stdio: "inherit" });
  const summaryPath = path.join(cwd, "coverage", "coverage-summary.json");
  const summary = JSON.parse(readFileSync(summaryPath, "utf-8")).total;
  return {
    branches: summary.branches.pct,
    functions: summary.functions.pct,
    lines: summary.lines.pct,
    statements: summary.statements.pct
  };
}

function printMetrics(name, metrics) {
  console.log(`${name} coverage:`);
  for (const [k, v] of Object.entries(metrics)) {
    console.log(`  ${k}: ${v}%`);
  }
}

const root = process.cwd();
const minThreshold = 80;

try {
  const currentMetrics = runCoverageAndGetMetrics(root);
  printMetrics("Current branch", currentMetrics);

  const tmpDir = mkdtempSync(path.join(os.tmpdir(), "dev-worktree-"));
  execSync(`git worktree add ${tmpDir} origin/dev --quiet`);
  try {
    const nodeModulesRoot = path.join(root, "node_modules");
    const nodeModulesLink = path.join(tmpDir, "node_modules");
    if (!existsSync(nodeModulesLink) && existsSync(nodeModulesRoot)) {
      symlinkSync(nodeModulesRoot, nodeModulesLink, "dir");
    }

    const devMetrics = runCoverageAndGetMetrics(tmpDir);
    printMetrics("origin/dev", devMetrics);

    let pass = true;
    const failures = [];

    for (const key of Object.keys(currentMetrics)) {
      if (currentMetrics[key] < minThreshold) {
        pass = false;
        failures.push(`${key}: ${currentMetrics[key]}% is below minimum ${minThreshold}%`);
      }
      if (currentMetrics[key] < devMetrics[key]) {
        pass = false;
        failures.push(`${key}: ${currentMetrics[key]}% is lower than dev ${devMetrics[key]}%`);
      }
    }

    if (!pass) {
      console.error("\n\uD83D\uDED1 Coverage check failed:");
      failures.forEach(f => console.error(" -", f));
      console.error("\nAdd or update tests to resolve the above issues.");
      process.exit(1);
    } else {
      console.log("\n✅ Coverage requirements satisfied.");
    }
  } finally {
    try { execSync(`git worktree remove ${tmpDir} --force --quiet`); } catch {}
    rmSync(tmpDir, { recursive: true, force: true });
    execSync("git worktree prune --quiet");
  }
} catch (err) {
  console.error(err);
  process.exit(1);
} 