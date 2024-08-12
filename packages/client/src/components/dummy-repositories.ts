import type { IRepo } from "types";

const veryLongMessage =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.";

export const repositories: IRepo[] = [
    {
        id: 1,
        name: "Zombie Must Survive",
        description: "HTML5 game, horde survivor. For Poki platform",
        path: "~/projects/quadro/zombie-must-survive",
        filesCount: 100,
        tokensCount: 1000,
        embeddingsStatus: "completed",
        tasks: [
            {
                id: "1",
                title: "Add new levels",
                needsAttention: false,
                chat: [
                    { role: "system", content: veryLongMessage },
                    { role: "assistant", content: "Level 1 added" },
                    { role: "assistant", content: "Level 2 added" },
                    { role: "user", content: "Level 3 added" },
                    { role: "assistant", content: "Task completed" },
                ],
            },
            {
                id: "2",
                title: "Add new characters",
                needsAttention: true,
                chat: [
                    { role: "system", content: "Task started" },
                    { role: "assistant", content: "Character 1 added" },
                    { role: "assistant", content: "Character 2 added" },
                    { role: "user", content: "Character 3 added" },
                    { role: "assistant", content: "Task in progress" },
                ],
            },
        ],
    },
    {
        id: 2,
        name: "Space Explorer",
        description: "React Native app for exploring space",
        path: "~/projects/space-explorer",
        filesCount: 50,
        tokensCount: 500,
        embeddingsStatus: "in-progress",
        tasks: [],
    },
    {
        id: 3,
        name: "Weather App",
        description: "A weather application built with React",
        path: "~/projects/weather-app",
        filesCount: 75,
        tokensCount: 750,
        embeddingsStatus: "not-started",
        tasks: [],
    },
];
