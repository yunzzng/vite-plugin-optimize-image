import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import { terser } from "rollup-plugin-terser";
const config = [
  {
    input: "build/index.js",
    output: [
      {
        file: "build/asset.cjs",
        format: "cjs",
        sourcemap: false,
      },
      {
        file: "build/asset.js",
        format: "esm",
        sourcemap: false,
      },
    ],
    external: ["esbuild"],
    plugins: [typescript(), terser()],
  },
  {
    input: "build/index.d.ts",
    output: {
      file: "build/asset.d.ts",
      format: "es",
    },
    plugins: [dts()],
  },
];
export default config;