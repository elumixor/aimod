import React, { useState, useRef, useEffect } from "react";
import "./EditableText.scss";

interface EditableTextProps {
    value: string;
    multiline?: boolean;
    onSave: (value: string) => void;
    Tag?: JSX.ElementType;
}

export function EditableText({ Tag = "span", value, multiline = false, onSave }: EditableTextProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(value);
    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
    const spanRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (isEditing && inputRef.current && spanRef.current) {
            inputRef.current.style.width = `${spanRef.current.offsetWidth}px`;
            inputRef.current.focus();
        }
    }, [isEditing]);

    const handleSave = () => {
        setIsEditing(false);
        onSave(text);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !multiline) {
            handleSave();
        } else if (e.key === "Escape") {
            setIsEditing(false);
            setText(value);
        }
    };

    return (
        <div className="editable-text" onClick={() => setIsEditing(true)}>
            {isEditing ? (
                multiline ? (
                    <textarea
                        ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onBlur={handleSave}
                        onKeyDown={handleKeyDown}
                    />
                ) : (
                    <input
                        ref={inputRef as React.RefObject<HTMLInputElement>}
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onBlur={handleSave}
                        onKeyDown={handleKeyDown}
                    />
                )
            ) : (
                <Tag ref={spanRef}>{text}</Tag>
            )}
        </div>
    );
}
