module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        "./node_modules/@elumixor/eslint",
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react-hooks/recommended",
    ],
    ignorePatterns: ["dist", ".eslintrc.cjs"],
    plugins: ["react-refresh"],
    rules: {
        "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    },
    parserOptions: {
        project: ["./packages/*/tsconfig.json"],
    },
};
