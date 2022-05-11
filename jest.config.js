module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  moduleFileExtensions: [
    "js",
    "json",
    // tell Jest to handle `*.vue` files
    "vue",
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    // process `*.js` files with `babel-jest`
    ".*\\.(js)$": "babel-jest",
  },
  coveragePathIgnorePatterns: [
    ".eslintrc.js",
    ".*.config.js",
    "/node_modules/",
    "src/main.js",
    "lcov-report/*",
  ],
  collectCoverage: true,
  collectCoverageFrom: ["**/*.{js,vue}", "!**/node_modules/**"],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};
