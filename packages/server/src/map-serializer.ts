export async function serializeMap(myMap: Map<number[], string>) {
    // Step 2: Prepare data for binary storage
    const entries = Array.from(myMap.entries());
    const totalPairs = entries.length;

    // Step 3: Create buffers
    const totalPairsBuffer = new Uint32Array([totalPairs]); // Store total pairs as a float
    const keysBuffer = [];
    const strings = [];

    // Fill buffers for keys and strings
    for (const [key, value] of entries) {
        // Store the length of the key
        keysBuffer.push(new Uint32Array([key.length]));

        // Store the key elements as floats
        keysBuffer.push(new Float32Array(key));

        // Store the string value
        strings.push(value);
    }

    // Step 4: Prepare the keys buffer
    const keysByteLength = keysBuffer.reduce((sum, buffer) => sum + buffer.byteLength, 0);
    const combinedKeysBuffer = new Uint8Array(keysByteLength);
    let offset = 0;

    for (const buffer of keysBuffer) {
        combinedKeysBuffer.set(new Uint8Array(buffer.buffer), offset);
        offset += buffer.byteLength;
    }

    // Step 5: Prepare the strings buffer
    const joinedStrings = strings.join("\0"); // Join strings with null character
    const stringLength = joinedStrings.length;
    const stringLengthBuffer = new Uint32Array([stringLength]); // Store length of the joined strings
    const stringsBuffer = new Uint8Array(stringLengthBuffer.buffer.byteLength + stringLength);

    // Copy the length and the joined strings
    stringsBuffer.set(new Uint8Array(stringLengthBuffer.buffer), 0);
    stringsBuffer.set(new TextEncoder().encode(joinedStrings), stringLengthBuffer.byteLength);

    // Step 6: Create a final combined buffer
    const finalBuffer = new ArrayBuffer(
        totalPairsBuffer.byteLength + combinedKeysBuffer.byteLength + stringsBuffer.byteLength
    );
    const finalView = new Uint8Array(finalBuffer);

    // Copy all parts into the final buffer
    let finalOffset = 0;
    finalView.set(new Uint8Array(totalPairsBuffer.buffer), finalOffset);
    finalOffset += totalPairsBuffer.byteLength;
    finalView.set(combinedKeysBuffer, finalOffset);
    finalOffset += combinedKeysBuffer.byteLength;
    finalView.set(stringsBuffer, finalOffset);

    return finalBuffer;
}

// // Step 1: Create a Map
// const myMap = new Map();
// myMap.set([1, 2.3, 3.1, 4.5], "First Entry");
// myMap.set([4, 5, 6], "Second Entry with longer text");

// console.log(myMap);

// // Serialize the Map
// const serialized = await serializeMap(myMap);
// console.log(serialized);

// // Write the serialized data to a file
// await Bun.write("serialized.bin", serialized);
