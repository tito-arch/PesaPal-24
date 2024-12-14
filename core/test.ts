import { init, add, commit } from './index'
import {describe, expect, it} from '@jest/globals';
import * as fs from 'fs';
import * as path from 'path';

describe('git', () => {
    it('initializes a git repository', () => {
        const git = init('test-repo')
        console.log(git); // Get a glimpse of the Git object
        expect(git).toEqual({
            repoPath: 'test-repo',
            stagedFiles: {},
            branches: {
                main: {
                    name: 'main',
                    commits: [
                        {
                            hash: expect.any(String),
                            message: 'Initial commit',
                            author: 'System',
                            timestamp: expect.any(String),
                            files: {},
                        },
                    ],
                    currentCommitIndex: 0,
                },
            },
            currentBranch: 'main',
        })
    })
})

describe('git', () => {
    it('stages a file', () => {
        const git = init('test-repo')
        add(git, 'test.txt', 'Hello, Git!')
        console.log(git); // Get a glimpse of the Git object
        expect(git.stagedFiles).toEqual({
            'test.txt': 'Hello, Git!',
        })
    })
})

describe('git', ()=>{
    it('commits staged files', () => {
        const repoPath = 'test-repo';
        const git = init(repoPath);
        add(git, 'test.txt', 'Hello, Git!');
        commit(git, 'Initial commit');
    
        const gitFilePath = path.join(repoPath, 'git.json');
        const savedGit = JSON.parse(fs.readFileSync(gitFilePath, 'utf-8'));
    
        console.log(savedGit); // Get a glimpse of the Git object after commit
    
        expect(savedGit.branches.main.commits.length).toBe(2);
        expect(savedGit.branches.main.commits[1]).toEqual({
          hash: expect.any(String),
          message: 'Initial commit',
          author: 'User',
          timestamp: expect.any(String),
          files: {
            'test.txt': 'Hello, Git!',
          },
        });
        expect(savedGit.stagedFiles).toEqual({});
      });
})
