import type { Role } from "types";
import "./ChatMessage.scss";

interface ChatMessageProps {
    role: Role;
    content: string;
}

export function ChatMessage({ role, content }: ChatMessageProps) {
    const roleColors = {
        user: "#00796b30",
        assistant: "#ffb74d30",
        system: "#9e9e9e30",
    } as Record<Role, string>;

    return (
        <div className={`chat-message ${role === "user" ? "user-message" : ""}`}>
            <div className="avatar" style={{ backgroundColor: roleColors[role] }}>
                {role.charAt(0).toUpperCase()}
            </div>
            <div className="message-content">
                <div className="bubble">{content}</div>
            </div>
        </div>
    );
}
