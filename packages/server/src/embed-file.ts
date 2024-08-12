import { client } from "../../client/src/client";

const SIZE = 1024;
export async function embedString(text: string, size = SIZE) {
    const embeddings = await client.embeddings.create({
        model: "text-embedding-3-small",
        input: text,
        dimensions: size,
    });

    return embeddings.data[0].embedding;
}

export function embedFile(fileName: string, text: string, size = SIZE) {
    return embedString(`FILE NAME: ${fileName}\n\nCONTENT: ${text}`, size);
}
