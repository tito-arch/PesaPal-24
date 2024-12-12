import { Git, Branch, Commit } from "./types";
import * as fs from "fs";
import * as path from "path";
import * as crypto from "crypto";

// Initialize a new Git repository
export function init(repoPath: string): Git {
  try {
    // Ensure the repository path exists
    if (!fs.existsSync(repoPath)) {
      fs.mkdirSync(repoPath, { recursive: true });
      // Set rwx permissions for the directory
      fs.chmodSync(repoPath, 0o777);
    }

    const initialCommit: Commit = {
      hash: generateHash(),
      message: "Initial commit",
      author: "System",
      timestamp: new Date().toISOString(),
      files: {},
    };

    const mainBranch: Branch = {
      name: "main",
      commits: [initialCommit],
      currentCommitIndex: 0,
    };

    const git: Git = {
      repoPath,
      stagedFiles: {},
      branches: { main: mainBranch },
      currentBranch: "main",
    };

    // Write git configuration to a file
    const gitFilePath = path.join(repoPath, "git.json");
    fs.writeFileSync(gitFilePath, JSON.stringify(git, null, 2));

    // Set rwx permissions for the git.json file
    fs.chmodSync(gitFilePath, 0o666); // Writable by owner/group/others

    console.log(`Initialized empty Git repository in ${repoPath}`);
    return git;
  } catch (error) {
    console.error("Failed to initialize the Git repository:", error);
    throw error; // Re-throw error for caller to handle
  }
}


// Stage a file
export function add(git: Git, filePath: string, content: string): void {
  git.stagedFiles[filePath] = content;
  if (git.repoPath) {
    fs.writeFileSync(
      path.join(git.repoPath, "git.json"),
      JSON.stringify(git, null, 2)
    );
  } else {
    throw new Error("Repository path is not defined.");
  }
  console.log(`Staged file: ${filePath}`);
}

// Commit staged files
export function commit(git: Git, message: string): void {
  if (!git.currentBranch) {
    throw new Error("No branch is currently checked out.");
  }

  const branch = git.branches[git.currentBranch];

  if (Object.keys(git.stagedFiles).length === 0) {
    throw new Error("No files to commit.");
  }

  const newCommit: Commit = {
    hash: generateHash(),
    message,
    author: "User",
    timestamp: new Date().toISOString(),
    files: { ...git.stagedFiles },
  };

  branch.commits.push(newCommit);
  branch.currentCommitIndex += 1;
  git.stagedFiles = {}; // Clear staged files

  if (git.repoPath) {
    fs.writeFileSync(
      path.join(git.repoPath, "git.json"),
      JSON.stringify(git, null, 2)
    );
  } else {
    throw new Error("Repository path is not defined.");
  }

  console.log(`Committed with message: "${message}"`);
}

// Generate a hash for the commit (mocked)
export function generateHash(): string {
  return crypto.randomBytes(16).toString("hex");
}
