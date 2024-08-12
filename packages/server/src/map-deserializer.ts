import { zip } from "@elumixor/frontils";

export async function deserializeMap(filePath: string) {
    // Step 1: Read the binary file
    const data = await Bun.file(filePath).arrayBuffer();

    // Step 2: Extract the total number of pairs
    const totalPairs = new Uint32Array(data.slice(0, Uint32Array.BYTES_PER_ELEMENT))[0];

    // Initialize offsets and the reconstructed Map
    let offset = Uint32Array.BYTES_PER_ELEMENT;

    const keys = [];

    // Step 3: Deserialize each key-value pair
    for (let i = 0; i < totalPairs; i++) {
        // Read key length
        const keyLength = new Uint32Array(data.slice(offset, offset + Uint32Array.BYTES_PER_ELEMENT))[0];
        offset += Uint32Array.BYTES_PER_ELEMENT;

        // Read key elements
        const key = new Float32Array(data.slice(offset, offset + keyLength * Float32Array.BYTES_PER_ELEMENT));
        offset += keyLength * Float32Array.BYTES_PER_ELEMENT;

        // Store key as an array
        const keyArray = Array.from(key);

        keys.push(keyArray);
    }

    // Read total length
    const stringLength = new Uint32Array(data.slice(offset, offset + Uint32Array.BYTES_PER_ELEMENT))[0];
    offset += Uint32Array.BYTES_PER_ELEMENT;

    // Read the joined strings
    const joinedStrings = new Uint8Array(data.slice(offset, offset + stringLength));
    const decoder = new TextDecoder();
    const stringData = decoder.decode(joinedStrings);
    offset += stringLength;

    // Split the string data back into individual strings
    const values = stringData.split("\0");

    // Add to the reconstructed map
    return new Map(zip(keys, values));
}

// // Usage example
// const filePath = "./serialized.bin";
// const map = await deserializeMap(filePath);
// console.log(map);
