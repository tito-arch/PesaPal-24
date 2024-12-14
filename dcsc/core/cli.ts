#!/usr/bin/env ts-node

import * as fs from "fs";
import * as path from "path";
// import * as crypto from "crypto";
import { init, add, commit } from "./index.ts"

// Command line argument parser (you can use libraries like yargs or commander, but for simplicity, using process.argv)
const [,, command, ...args] = process.argv;

// Helper function to parse paths
const getFilePath = (relativePath: string) => path.resolve(process.cwd(), relativePath);

// CLI logic
switch (command) {
  case "init":
    if (args.length < 1) {
      console.log("Please provide a repository path.");
      process.exit(1);
    }
    const repoPath = getFilePath(args[0]);
    try {
      const git = init(repoPath); // Call the init function
      console.log(`Git repository initialized at: ${repoPath}`);
    } catch (error) {
      console.error("Error initializing repository:", error);
    }
    break;

  case "add":
    if (args.length < 2) {
      console.log("Please provide a file path and content.");
      process.exit(1);
    }
    const filePath = getFilePath(args[0]);
    const content = args[1];
    try {
      const git = JSON.parse(fs.readFileSync(path.join(process.cwd(), "git.json"), "utf-8"));
      add(git, filePath, content); // Call the add function
      console.log(`File ${filePath} staged.`);
    } catch (error) {
      console.error("Error staging file:", error);
    }
    break;

  case "commit":
    if (args.length < 1) {
      console.log("Please provide a commit message.");
      process.exit(1);
    }
    const commitMessage = args.join(" ");
    try {
      const git = JSON.parse(fs.readFileSync(path.join(process.cwd(), "git.json"), "utf-8"));
      commit(git, commitMessage); // Call the commit function
      console.log(`Commit with message: "${commitMessage}"`);
    } catch (error) {
      console.error("Error committing:", error);
    }
    break;

  default:
    console.log("Unknown command. Available commands: init, add, commit.");
    process.exit(1);
}
