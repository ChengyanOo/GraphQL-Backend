module.exports = {
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    testPathIgnorePatterns: [
        '/node_modules/',
        'employee-management/src/__tests__/utils/', 
    ],
    testMatch: [
        "**/__tests__/**/*.js?(x)",
        "**/?(*.)+(spec|test).js?(x)"
      ],
  };
  