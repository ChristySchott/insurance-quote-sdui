import baseConfig from "@insurance-quote/eslint-config/base";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: ["dist", "node_modules"],
  },
  ...baseConfig,
]);
