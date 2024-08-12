import chalk from "chalk";
import { dot } from "./dot";
import { embedString } from "./embed-file";
import { embedRepo } from "./embed-repo";
import { deserializeMap } from "./map-deserializer";

const embedPath = "./.embeddings.bin";

export async function findRelated(ext: string, dir: string, question: string, top = 5) {
    let cached = await Bun.file(embedPath).exists();
    if (!cached) await embedRepo(`**/*.${ext}`, dir, embedPath);

    // Load embeddings
    const embeddings = await deserializeMap(embedPath);
    console.log(chalk.green(`Embeddings loaded` + (cached ? " (cached)" : "")));

    // Find the most similar file
    const questionEmbedding = await embedString(question);

    const values = [...embeddings].map(([embedding, value]) => {
        const similarity = dot(embedding, questionEmbedding);
        return { value, similarity };
    });

    console.log(chalk.green(`Similarity calculated`));

    values.sort((a, b) => b.similarity - a.similarity);

    return Promise.all(values.slice(0, top).map(async ({ value: fileName, similarity }) => ({ fileName, contents: await Bun.file(fileName).text(), similarity })));
}
