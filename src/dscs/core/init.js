const fs = require('fs');
const path = require('path');

// Initializes a new repository by creating a .dscs directory and config file
function initRepo(repoPath = '.') {
    const repoDir = path.join(repoPath, '.dscs');
    if (fs.existsSync(repoDir)) {
        throw new Error('Repository already exists.');
    }

    fs.mkdirSync(repoDir);
    fs.writeFileSync(path.join(repoDir, 'config'), JSON.stringify({ branches: ['main'], currentBranch: 'main' }));
    console.log('Initialized empty DSCS repository in', repoDir);
}

module.exports = { initRepo };
