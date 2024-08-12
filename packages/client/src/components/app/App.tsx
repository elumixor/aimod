import type { IRepo } from "types";
import "./App.scss";
import { repositories } from "../dummy-repositories";
import { useState } from "react";
import { Repo } from "components/repo/Repo";

export function App() {
    const [repo, setRepo] = useState(repositories.first as IRepo | undefined);

    return (
        <>
            <p className="secondary">Repositories</p>
            <div className="flex gap-2 mb-2">
                {repositories.map((r) => (
                    <Tab key={r.id} repo={r} selected={repo === r} onClick={() => setRepo(r)} />
                ))}
                <div id="add-repo-button">+</div>
            </div>
            {repo && <Repo repo={repo} />}
        </>
    );
}

interface TabProps {
    repo: IRepo;
    onClick: () => void;
    selected: boolean;
}

const Tab: React.FC<TabProps> = ({ repo, selected, onClick }) => {
    return (
        <div className={`tab ${selected ? "selected" : ""}`} onClick={onClick}>
            {repo.name}
        </div>
    );
};
