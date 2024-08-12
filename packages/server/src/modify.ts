#!bun

import chalk from "chalk";
import { client } from "../../client/src/client";
import { findRelated } from "./find-related";
import { promises as fs } from "fs";

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

const related = await findRelated(ext, dir, question, 50);

for (const { fileName, similarity } of related) console.log(chalk.yellow(fileName), chalk.cyan(similarity.toFixed(4)));

// You are a developer tasked with implementing some feature in an existing code base.
// Before making changes, you should make sure you understand the code base, existing functions and how it works.
// You can chat with the user to get more information.
// Your actions:
// - Get files - read the tree of repository files - just names
// - Read file - read the content of a file
// - Ask - ask the user for more information about the task in natural language
// - Find related file - you provide a search query that is used for embedding search against the file contents. You are given file names and their similarity to the search query.
// - Examine symbol - you provide the symbol name and location, and you get the information and example of the symbol
// - Write file - write the content to a file
// - ... - check linting/compilation errors?

const chat = [
    {
        role: "system",
        content:
            "You are a senior TypeScript developer. You are working on an HTML5 horde survivor game. " +
            "You should implement features that are requested by the user. " +
            "You should use the existing code base to understand the context. " +
            "You should use the existing frameworks and libraries, that are already included in the project. " +
            "Write complete code, without empty stubs, comments, or methods to be implemented later. " +
            "All methods that you write should include valid, complete, finalized code. " +
            "Separate logic in multiple classes and files when necessary, follow the example of other files in repository. " +
            "Only respond with code blocks and their corresponding file names. " +
            "Always write doc comments and regular comments describing the code. " +
            "Always write complete production-ready code, no prototypes, drafts, or pseudo code. " +
            "Always adhere to the code style of the existing code base, while following best practices. " +
            "",
    } as const,
    {
        role: "user",
        content:
            `You need to implement the following functionality:\n${question}\n` +
            "Create all necessary classes and methods to implement the requested functionality. " +
            "Make sure that next developer does not have to implement anything else to make the code work. " +
            "Here are related files for reference of the code base:\n\n" +
            related
                .map(
                    ({ fileName, contents }) =>
                        `--------\n${fileName}\n--------\n\`\`\`typescript\n${contents}\`\`\`--------`,
                )
                .join("\n") +
            "\n\n" +
            "Please provide the full code for new or modified files.",
    } as const,
];

// console.log(chat);

Bun.file("chat.json")
    .writer()
    .write(JSON.stringify(chat, null, 2));

const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: chat,
    stream: true,
});

let msg = "";
for await (const message of response) {
    const delta = message.choices[0].delta.content ?? "";
    msg += delta;
    process.stdout.write(delta);
}
process.stdout.write("\n");

// Remove the previously generated response file
if (await Bun.file("response.ts").exists()) await fs.unlink("response.ts");
Bun.file("response.ts").writer().write(msg);
// const answer = response.choices[0].message.content;
