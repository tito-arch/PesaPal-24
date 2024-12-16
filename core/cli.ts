#!/usr/bin/env node

import { Command } from "commander";
import { Commit, Branch, Git } from "./types";
import { init, add, commit } from ".";
import fs from "fs";
import path from "path";

const program = new Command();

// const git : Git = JSON.parse(fs.readFileSync(path.join(process.cwd(), "git.json"), "utf-8"));

program
  .command("init <repoPath>")
  .description("Initialize a new Git repository")
  .action((repoPath: string) => {
    // init(repoPath);
    console.log(`Initialized empty Git repository in ${repoPath}`);

  });



  program
    .command("add <filePath> <content>")
    .description("Stage a file")
    .action((filePath: string, content: string ) => {
    // add(git, filePath, content);
    console.log(`Staged file: ${filePath}`);
});

program
    .command("commit <message>")
    .description("Commit staged files")
    .action((message:string) => {
    // commit(git, message);
    console.log(`Committed files: ${message}`);
});

program.parse(process.argv);

