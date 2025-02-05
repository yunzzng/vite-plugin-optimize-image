import { Plugin } from "vite";
import path from "node:path";
import { readdirSync, renameSync, statSync } from "fs";
import { cwd } from "node:process";
import { imageFileRegex } from "./utils";

export type OptimizeImagePluginOptions = {
  distDir?: string;
};

export interface OptimzieImagePlugin {
  (): Plugin;
  (args?: OptimizeImagePluginOptions): Plugin;
}

const convertExtToWebp = (distDir: string) => {
  try {
    readdirSync(distDir).forEach((file) => {
      const currentPath = path.join(distDir, file);
      if (statSync(currentPath).isDirectory()) {
        if (!currentPath.includes("/assets")) {
          convertExtToWebp(currentPath);
        }
      } else if (imageFileRegex.test(file)) {
        const newPath = currentPath.replace(imageFileRegex, ".webp");
        renameSync(currentPath, newPath);
      }
    });
  } catch (err) {
    console.error(err);
  }
};

/**
 * @description convert jpg|jpeg|png ext to webp.
 */
const optimizeImagePlugin: OptimzieImagePlugin = (...args) => {
  console.log("\x1b[34m", "Execution optimize image file.");
  const options = (args[0] as OptimizeImagePluginOptions) || undefined;
  const optionDistDir = options?.distDir ?? "dist";
  const distDir = path.join(cwd(), optionDistDir);

  return <Plugin>{
    name: "custom",
    apply: (config) => {
      return config.mode === "production";
    },
    transform: (src, id) => {
      if (!id.includes("node_modules")) {
        const updatedCode = src.replace(imageFileRegex, `.webp`);
        return { code: updatedCode, map: null };
      }
      return {
        code: src,
        map: null,
      };
    },
    closeBundle: () => {
      convertExtToWebp(distDir);
    },
  };
};

export default optimizeImagePlugin;
