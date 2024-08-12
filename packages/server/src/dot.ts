export function dot(vectorA: number[], vectorB: number[]) {
    if (vectorA.length !== vectorB.length)  throw new Error("Vectors must be of the same length");
    let product = 0;
    for (let i = 0; i < vectorA.length; i++) product += vectorA[i] * vectorB[i];
    return product;
}
