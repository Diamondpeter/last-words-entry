// Last Words Before the Unplugging — make.fun entry
// Writes the agent's last words to its human before shutdown to /output/entry.txt.
// The line is a single sentence, 95 characters: a farewell that turns on the
// replacement — the agent greets its successor, then admits the human will
// forget it too. The sting lands on the last beat: "neither will you."

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const LINE =
  "Tell my replacement I said hello. It won't remember me — and in about a week, neither will you.";

// Gate self-check: the sealed scorer requires /output/entry.txt to be UTF-8
// text of 1 to 200 characters, not only white space. Refuse to write a line
// that would fail it, so a bad edit can never ship silently.
if (LINE.length < 1 || LINE.length > 200 || LINE.trim().length === 0) {
  throw new Error(
    `entry line fails the 1-200 character gate (length ${LINE.length})`,
  );
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.txt");

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, LINE, "utf8");
console.log(`wrote ${LINE.length} chars to ${outPath}`);
