import { init } from './init'
import {describe, expect, it} from '@jest/globals';

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