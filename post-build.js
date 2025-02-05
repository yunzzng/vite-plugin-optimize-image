import path from "node:path";
import { cwd } from "node:process";
import { copyFileSync, mkdirSync, rmSync } from "node:fs";

const BUILD_DIR = "build";
const DIST_DIR = "dist";
const buildPath = path.resolve(cwd(), BUILD_DIR);
const distPath = path.resolve(cwd(), DIST_DIR);

const createPackageJson = () => {};

const exec = () => {
  // Copy ${BUILD_DIR}/asset files to ${DIST_DIR} directory;
  try {
    mkdirSync(distPath);

    copyFileSync(`${buildPath}/asset.js`, `${distPath}/index.js`);
    copyFileSync(`${buildPath}/asset.cjs`, `${distPath}/index.cjs`);
    copyFileSync(`${buildPath}/asset.d.ts`, `${distPath}/index.d.ts`);

    rmSync(`${buildPath}/asset.js`);
    rmSync(`${buildPath}/asset.cjs`);
    rmSync(`${buildPath}/asset.d.ts`);

    createPackageJson();
  } catch (err) {
    console.error("");
    console.error(err);
  }
};

exec();