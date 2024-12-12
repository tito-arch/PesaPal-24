/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node", // Use "node" for backend-like environments
  moduleFileExtensions: ["ts", "tsx", "js"], // Resolve these extensions
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest", // Transform .ts/.tsx files using ts-jest
  },
  testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"], // Match test files
  moduleNameMapper: {
    // Map module paths if needed, e.g., for CSS or static assets
  },
};
