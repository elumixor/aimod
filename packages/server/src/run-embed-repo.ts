#!bun

import { embedRepo } from "./embed-repo";

const ext = process.argv[2];
if (!ext) {
    console.error("Usage: tokenize <ext> [dir=.]");
    process.exit(1);
}

const dir = process.argv[3] ?? ".";

await embedRepo(`**/*.${ext}`, dir, ".embeddings.bin");
