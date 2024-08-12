#!bun

import chalk from "chalk";
import { findRelated } from "./find-related";

// Create embeddings if not found yet
const ext = process.argv[2];
if (!ext) {
    console.error("Usage: aimod <ext> <dir> <question>");
    process.exit(1);
}

const dir = process.argv[3] ?? ".";
const question = process.argv[4];
if (!question) {
    console.error("Usage: aimod <ext> <dir> <question>");
    process.exit(1);
}

const top = parseInt(process.argv[5]) ?? 5;
const related = await findRelated(ext, dir, question, top);

// Print the top 5 most similar files and their similarity scores
for (const { fileName, similarity } of related)
    console.log(chalk.yellow(fileName), chalk.cyan(similarity.toFixed(4)));

