import type { IRepo } from "types";
import { Badge } from "components/badge/Badge";
import { Task } from "components/task/Task";
import "./Repo.scss";
import { EditableText } from "components/editable-text/EditableText";

interface RepoProps {
    repo: IRepo;
}

export function Repo({ repo }: RepoProps) {
    const green = "#4caf5030";
    const yellow = "#ffeb3b30";
    const gray = "#9e9e9e30";

    const embeddingColor =
        repo.embeddingsStatus === "completed" ? green : repo.embeddingsStatus === "in-progress" ? yellow : gray;

    return (
        <div className="repo">
            <EditableText Tag="h2" value={repo.name} onSave={(value) => console.log(value)} />
            <p className="secondary mt-1">{repo.path}</p>
            <EditableText Tag="p" value={repo.description} onSave={(value) => console.log(value)} multiline />
            <div className="mt-3 mb-5">
                <Badge label="Files" value={repo.filesCount} />
                <Badge label="Tokens" value={repo.tokensCount} />
                <Badge label="Embeddings" value={repo.embeddingsStatus} color={embeddingColor} />
            </div>
            <div className="tasks">
                <h3>Tasks:</h3>
                {repo.tasks.map((task) => (
                    <Task
                        key={task.id}
                        id={task.id}
                        title={task.title}
                        needsAttention={task.needsAttention}
                        chat={task.chat}
                    />
                ))}
            </div>
        </div>
    );
}
