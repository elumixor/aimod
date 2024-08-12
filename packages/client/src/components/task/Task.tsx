import { useEffect, useRef, useState } from "react";
import "./Task.scss";
import { ChatMessage } from "components/chat/ChatMessage";
import type { Role } from "types";
import { EditableText } from "components/editable-text/EditableText";

interface ChatMessage {
    role: Role;
    content: string;
}

interface TaskProps {
    id: string;
    title: string;
    needsAttention: boolean;
    chat: ChatMessage[];
}

export function Task({ id, title, needsAttention, chat }: TaskProps) {
    const [collapsed, setCollapsed] = useState(needsAttention);
    const [inputValue, setInputValue] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const areaContainerRef = useRef<HTMLDivElement>(null);

    const handleSend = () => {
        // Handle sending the message
        console.log("Message sent:", inputValue);
        setInputValue(""); // Clear the input field
    };

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(e.target.value);
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    useEffect(() => {
        if (textareaRef.current && areaContainerRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
            areaContainerRef.current.style.height = "auto";
            const h = Math.min(textareaRef.current.scrollHeight + 50, 400);
            areaContainerRef.current.style.height = `${h}px`;
        }
    }, [inputValue]);

    return (
        <div className={`task ${!collapsed ? "expanded" : ""}`} key={id}>
            <EditableText Tag="h3" value={title} onSave={(value) => console.log(value)} />
            <p className="secondary actionable mv-0" onClick={() => setCollapsed(!collapsed)}>
                {collapsed ? "expand" : "collapse"}
            </p>
            {collapsed ? (
                <></>
            ) : (
                <div className="chat">
                    {chat.map((message, index) => (
                        <ChatMessage key={index} role={message.role} content={message.content} />
                    ))}
                    <div className="input-container" ref={areaContainerRef}>
                        <textarea
                            ref={textareaRef}
                            value={inputValue}
                            onChange={handleInput}
                            placeholder="Type a message..."
                            rows={4}
                        />
                        <button onClick={handleSend}>Send</button>
                    </div>
                </div>
            )}
        </div>
    );
}
