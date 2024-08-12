import "./Badge.scss";

interface BadgeProps {
    label: string;
    value: string | number;
    color?: string;
}

export function Badge({ label, value, color }: BadgeProps) {
    return (
        <div className="badge" style={{ "--badge-color": color } as React.CSSProperties}>
            {label}: {value}
        </div>
    );
}
