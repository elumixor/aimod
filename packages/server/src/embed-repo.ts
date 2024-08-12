import chalk from "chalk";
import { embedFile } from "./embed-file";
import { listFiles } from "./list-files";
import { serializeMap } from "./map-serializer";
import { all } from "@elumixor/frontils";

export async function embedRepo(pattern: string, dir: string, embedPath: string) {
    const embeddingsMap = new Map<number[], string>();

    let files = new Array<{ file: string; content: string }>();
    for await (const { file, content } of listFiles(pattern, dir))
        files.push({ file, content });

    await all(...files.map(async ({ file, content }) => {
        console.log(chalk.yellow(`Embedding ${file}`));
        const embedding = await embedFile(file, content);
        embeddingsMap.set(embedding, file);
    }));

    console.log(chalk.green(`Embedding done`));
    const embeddings = await serializeMap(embeddingsMap);
    await Bun.write(embedPath, embeddings);
    console.log(chalk.green(`Embedding cache saved`));
}
