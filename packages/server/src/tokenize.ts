#!bun

import { Glob } from "bun";
import chalk from "chalk";
import { promises as fs } from "fs";
import { encode } from "gpt-tokenizer";

const exclude = ["node_modules", ".git", ".vscode", ".idea", "dist", "build"];

const ext = process.argv[2];
if (!ext) {
  console.error("Usage: tokenize <ext> [dir=.]");
  process.exit(1);
}

const dir = process.argv[3] ?? ".";

const glob = new Glob(`**/*.${ext}`);

// Scans the current working directory and each of its sub-directories recursively
let totalChars = 0;
let totalTokens = 0;

for await (const file of glob.scan(`${dir}`)) {
  if (exclude.some((x) => file.includes(x))) {
    continue;
  }

  process.stdout.write(file);
  const content = await fs.readFile(file, "utf-8");
  process.stdout.write(` ${chalk.yellow(content.length)} characters`);
  const tokens = encode(content);
  process.stdout.write(` -> ${chalk.cyan(tokens.length)} tokens\n`);

  totalChars += content.length;
  totalTokens += tokens.length;
}

console.log(
  `Total: ${chalk.yellow(totalChars)} characters -> ${chalk.cyan(
    totalTokens
  )} tokens`
);
