#!/usr/bin/env node
const { initRepo } = require('./init');

// Command to initialize a repository from the terminal
const args = process.argv.slice(2);
if (args[0] === 'init') {
    try {
        initRepo(args[1] || '.');
    } catch (error) {
        console.error(error.message);
    }
}
