import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Core Next.js and JavaScript rules
  ...compat.extends(
    "next/core-web-vitals", // Next.js recommended rules
    "plugin:react/recommended", // React-specific rules
    "plugin:react-hooks/recommended" // React Hooks rules
  ),
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser, // Use TypeScript parser
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      // Suppress these errors globally for now
      "@typescript-eslint/no-explicit-any": "off", // Disable no-explicit-any
      "@typescript-eslint/no-unused-vars": [
        "warn", // Downgrade to warning
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }, // Ignore variables starting with _
      ],
      // React rules
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      // Other rules
      "no-unused-vars": "off", // Disable base rule
    },
  },
];

export default eslintConfig;