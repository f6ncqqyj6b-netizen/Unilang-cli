#!/usr/bin/env node
import { compileFile } from "unilang-compiler/dist/index";
import { Backend } from "unilang-compiler/dist/types";

function usage(): void {
  console.log(`UNILANG CLI

Usage:
  unilang build <file.unilang> [--backend evm|ton]

Commands:
  build    Compile a UNILANG source file
`);
}

const [, , cmd, ...rest] = process.argv;

if (!cmd) {
  usage();
  process.exit(1);
}

if (cmd === "build") {
  const file = rest[0];
  const backendFlagIndex = rest.indexOf("--backend");
  let backend: Backend = "evm";

  if (backendFlagIndex !== -1 && rest[backendFlagIndex + 1]) {
    backend = rest[backendFlagIndex + 1] as Backend;
  }

  if (!file) {
    console.error("Missing file argument");
    process.exit(1);
  }

  const result = compileFile(file, { backend });
  console.log(JSON.stringify(result, null, 2));
} else {
  usage();
}
