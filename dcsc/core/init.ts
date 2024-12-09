import { Git, Branch, Commit } from "./types";


// Initialize a new Git repository
export function init(repoPath: string): Git {
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

  return {
    repoPath,
    stagedFiles: {},
    branches: { main: mainBranch },
    currentBranch: "main",
  };
}

// Stage a file
export function add(git: Git, filePath: string, content: string): void {
  git.stagedFiles[filePath] = content;
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
  console.log(`Committed with message: "${message}"`);
}

// Generate a hash for the commit (mocked)
export function generateHash(): string {
// crypto
  return Math.random().toString(36).substring(7);
}
