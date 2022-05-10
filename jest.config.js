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
      //branches: 80,
      functions: 30,
      //lines: 80,
      //statements: -10,
    },
  },
};
