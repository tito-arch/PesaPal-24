interface Commit {
    hash: string;
    message: string;
    author: string;
    timestamp: string;
    files: Record<string, string>; // Snapshot of staged files
  }
  
  interface Branch {
    name: string;
    commits: Commit[];
    currentCommitIndex: number;
  }
  
  interface Git {
    repoPath: string | null;
    stagedFiles: Record<string, string>;
    branches: Record<string, Branch>;
    currentBranch: string | null;
  }
  

  export { Commit, Branch, Git };