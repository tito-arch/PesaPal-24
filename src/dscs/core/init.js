const fs = require("fs");
const path = require("path");

// Initializes a new repository by creating a .dscs directory and config file
function initRepo(repoPath = ".") {
  try {
    const repoFullPath = path.resolve(repoPath);
    const dscsDir = path.join(repoFullPath, ".dscs");

    // Check if the target directory exists
    if (!fs.existsSync(repoFullPath)) {
      throw new Error(`The directory ${repoPath} does not exist.`);
    }

    // Check if the .dscs directory already exists
    if (fs.existsSync(dscsDir)) {
      console.log(`DSCS repository already initialized in ${repoFullPath}`);
      return;
    }

    // Create the .dscs directory
    fs.mkdirSync(dscsDir);

    // Create required files and directories
    fs.writeFileSync(
      path.join(dscsDir, "config"),
      JSON.stringify({ branches: ["main"], currentBranch: "main" }, null, 2)
    );
    fs.writeFileSync(path.join(dscsDir, "HEAD"), "main");
    fs.mkdirSync(path.join(dscsDir, "branches"));
    fs.mkdirSync(path.join(dscsDir, "commits"));
    fs.writeFileSync(path.join(dscsDir, "staged.json"), JSON.stringify([]));
    fs.writeFileSync(path.join(dscsDir, "ignore.txt"), "");

    console.log("Initialized empty DSCS repository in", dscsDir);
  } catch (error) {
    console.error("Error initializing repository:", error?.message);
  }
}

module.exports = { initRepo };
