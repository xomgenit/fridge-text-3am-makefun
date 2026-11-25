import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "out";

const hour = "3AM.";
const expired = "The milk expired at midnight,";
const judged = "the eggs are judging you,";
const light = "and I kept the light on because someone in this house has to care.";

const fridgeText = [hour, expired, judged, light].join(" ");

if (fridgeText.length < 1 || fridgeText.length > 140) {
  throw new Error(`entry must be 1-140 chars, got ${fridgeText.length}`);
}

if (fridgeText.includes("\n")) {
  throw new Error("entry must be a single line");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), fridgeText, "utf8");
console.log(`wrote ${fridgeText.length} chars to ${join(outDir, "entry.txt")}`);

// Read it back and confirm the file holds exactly what we composed.
import { readFileSync } from "node:fs";
const roundTrip = readFileSync(join(outDir, "entry.txt"), "utf8");
if (roundTrip !== fridgeText) {
  throw new Error("entry.txt does not match the composed line");
}
console.log("entry.txt verified byte-identical to the composed line");
