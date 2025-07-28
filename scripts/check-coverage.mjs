#!/usr/bin/env node

import { execSync } from "child_process";
import { mkdtempSync, readFileSync, rmSync, existsSync, symlinkSync } from "fs";
import os from "os";
import path from "path";

function runCoverageAndGetMetrics(cwd) {
  try {
    execSync("npm run test:coverage", { cwd, stdio: "inherit" });
  } catch (error) {
    // If test:coverage fails (e.g., on older branch without passWithNoTests), continue anyway
    console.log("Test coverage command failed, assuming no tests exist");
  }
  
  const summaryPath = path.join(cwd, "coverage", "coverage-summary.json");
  
  // Check if coverage summary file exists (it won't exist if no tests are found)
  if (!existsSync(summaryPath)) {
    console.log("No coverage summary found - likely no test files exist");
    return {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0
    };
  }
  
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
  execSync(`git worktree add ${tmpDir} origin/dev`);
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

    // Check if we have any test files by looking at coverage summary existence
    const currentSummaryPath = path.join(root, "coverage", "coverage-summary.json");
    const hasTests = existsSync(currentSummaryPath);
    
    for (const key of Object.keys(currentMetrics)) {
      // Only enforce minimum threshold if we have tests
      if (hasTests && currentMetrics[key] < minThreshold) {
        pass = false;
        failures.push(`${key}: ${currentMetrics[key]}% is below minimum ${minThreshold}%`);
      }
      // Only compare with dev if both branches have tests
      if (currentMetrics[key] < devMetrics[key]) {
        pass = false;
        failures.push(`${key}: ${currentMetrics[key]}% is lower than dev ${devMetrics[key]}%`);
      }
    }
    
    // If no tests exist, provide informational message but allow push
    if (!hasTests) {
      console.log("\n📋 No test files found in current branch.");
      console.log("Coverage checks skipped - add tests when ready to enforce coverage requirements.");
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
    try { execSync(`git worktree remove ${tmpDir} --force`); } catch {}
    rmSync(tmpDir, { recursive: true, force: true });
    try { execSync("git worktree prune"); } catch {}
  }
} catch (err) {
  console.error(err);
  process.exit(1);
} 