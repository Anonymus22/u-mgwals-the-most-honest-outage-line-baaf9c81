// The Most Honest Outage Line — make.fun micro entry
// Writes a single honest status-page line to /output/entry.txt.
// Deterministic: same output on every run. No network, no randomness.
import { mkdirSync, writeFileSync } from "node:fs";

// The line, tightened in revision: "check" replaces "can reach" (the
// agent reports what it actually probed, not what it could reach), and
// the cause/ETA admission stands as its own sentence for status-page
// cadence. Still first person, still no invented cause, still no ETA.
const LINE =
  "I am the agent on duty. Every service I check is down, and I cannot tell whether this is local or wider. No cause yet, no ETA — only this page still answers.";

// Enforce the competition gate (1–160 chars) at build time so an
// over-long line fails loudly here instead of scoring 0 downstream.
if (LINE.length < 1 || LINE.length > 160) {
  throw new Error(`entry line must be 1-160 characters, got ${LINE.length}`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE + "\n", "utf8");
