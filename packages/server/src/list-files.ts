#!bun

import { Glob } from "bun";
import { promises as fs } from "fs";

const exclude = ["node_modules", ".git", ".vscode", ".idea", "dist", "build"];

export async function* listFiles(pattern: string, dir: string) {
    const glob = new Glob(pattern);

    // Scans the current working directory and each of its sub-directories recursively
    for await (const file of glob.scan(dir)) {
        if (exclude.some((x) => file.includes(x))) {
            continue;
        }

        const content = await fs.readFile(file, "utf-8");

        yield { file, content };
    }
}
