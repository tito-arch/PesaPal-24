"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateHash = exports.commit = exports.add = exports.init = void 0;
var fs = require("fs");
var path = require("path");
var crypto = require("crypto");
// Initialize a new Git repository
function init(repoPath) {
    try {
        // Ensure the repository path exists
        if (!fs.existsSync(repoPath)) {
            fs.mkdirSync(repoPath, { recursive: true });
            // Set rwx permissions for the directory
            fs.chmodSync(repoPath, 511);
        }
        var initialCommit = {
            hash: generateHash(),
            message: "Initial commit",
            author: "System",
            timestamp: new Date().toISOString(),
            files: {},
        };
        var mainBranch = {
            name: "main",
            commits: [initialCommit],
            currentCommitIndex: 0,
        };
        var git = {
            repoPath: repoPath,
            stagedFiles: {},
            branches: { main: mainBranch },
            currentBranch: "main",
        };
        // Write git configuration to a file
        var gitFilePath = path.join(repoPath, "git.json");
        fs.writeFileSync(gitFilePath, JSON.stringify(git, null, 2));
        // Set rwx permissions for the git.json file
        fs.chmodSync(gitFilePath, 438); // Writable by owner/group/others
        console.log("Initialized empty Git repository in ".concat(repoPath));
        return git;
    }
    catch (error) {
        console.error("Failed to initialize the Git repository:", error);
        throw error; // Re-throw error for caller to handle
    }
}
exports.init = init;
// Stage a file
function add(git, filePath, content) {
    git.stagedFiles[filePath] = content;
    if (git.repoPath) {
        fs.writeFileSync(path.join(git.repoPath, "git.json"), JSON.stringify(git, null, 2));
    }
    else {
        throw new Error("Repository path is not defined.");
    }
    console.log("Staged file: ".concat(filePath));
}
exports.add = add;
// Commit staged files
function commit(git, message) {
    if (!git.currentBranch) {
        throw new Error("No branch is currently checked out.");
    }
    var branch = git.branches[git.currentBranch];
    if (Object.keys(git.stagedFiles).length === 0) {
        throw new Error("No files to commit.");
    }
    var newCommit = {
        hash: generateHash(),
        message: message,
        author: "User",
        timestamp: new Date().toISOString(),
        files: __assign({}, git.stagedFiles),
    };
    branch.commits.push(newCommit);
    branch.currentCommitIndex += 1;
    git.stagedFiles = {}; // Clear staged files
    if (git.repoPath) {
        fs.writeFileSync(path.join(git.repoPath, "git.json"), JSON.stringify(git, null, 2));
    }
    else {
        throw new Error("Repository path is not defined.");
    }
    console.log("Committed with message: \"".concat(message, "\""));
}
exports.commit = commit;
// Generate a hash for the commit (mocked)
function generateHash() {
    return crypto.randomBytes(16).toString("hex");
}
exports.generateHash = generateHash;
