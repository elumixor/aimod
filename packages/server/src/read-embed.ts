import { deserializeMap } from "./map-deserializer";

export async function readEmbed(filePath = "./.embeddings.bin") {
    const map = await deserializeMap(filePath);
    return map;
}
