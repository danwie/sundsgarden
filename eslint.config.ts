import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.node },
  },
  tseslint.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "error", // catch unused variables
      curly: "error", // braces around if/else
      semi: ["error", "always"], // require semicolons
      quotes: ["error", "double"], // consistent quotes
      indent: ["error", 2], // consistent indentation
      "object-curly-spacing": ["error", "always"], // { like this }

      // Disabled on purpose. no-console is useful in frontend code.
      // In a server application, logging to the console is normal so
      // the rule is usually not needed. Another option is to set it to off.
      // "no-console": "warn",
    },
    ignores: ["dist", "node_modules"],
  },
]);
