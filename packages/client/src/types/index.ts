export interface IRepo {
    id: number;
    name: string;
    description: string;
    path: string;
    filesCount: number;
    tokensCount: number;
    embeddingsStatus: EmbeddingStatus;
    tasks: TaskType[];
}

export type EmbeddingStatus = "not-started" | "in-progress" | "completed";

export interface TaskType {
    id: string;
    title: string;
    needsAttention: boolean;
    chat: ChatMessage[];
}

export interface ChatMessage {
    role: Role;
    content: string;
}
export type Role = "system" | "assistant" | "user";
