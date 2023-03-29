import fs from "fs";
import path from "path";
import { preserveShebangs } from "rollup-plugin-preserve-shebangs";
import typescript from "rollup-plugin-typescript2";

const typescriptPlugin = typescript({
  useTsconfigDeclarationDir: true,
  tsconfigOverride: {
    compilerOptions: {
      module: "esnext",
      declarationDir: "dist",
    },
  },
});

export default [
  {
    input: ["src/cli.ts"],
    output: [{ dir: "dist/lib", format: "cjs", preserveModules: true }],
    external: ["@svgr/core"],
    plugins: [typescriptPlugin, preserveShebangs()],
  },
  {
    input: allFiles("shooters"),
    output: [{ dir: "dist/shooters", format: "cjs", preserveModules: true }],
    plugins: [typescriptPlugin],
  },
  {
    input: allFiles("renderers"),
    output: [{ dir: "dist/renderers", format: "esm", preserveModules: true }],
    plugins: [typescriptPlugin],
  },
];

function allFiles(dirPath) {
  return fs.readdirSync(dirPath).flatMap((f) => {
    const filePath = path.join(dirPath, f);
    const stat = fs.statSync(filePath);
    if (stat.isFile()) {
      return [filePath];
    } else if (stat.isDirectory()) {
      return [...allFiles(filePath)];
    } else {
      return [];
    }
  });
}
