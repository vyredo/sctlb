const { defaults } = require("jest-config");

module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  modulePathIgnorePatterns: ["dist/"],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  moduleNameMapper: {
    "^.+\\.(css|less|scss)$": "identity-obj-proxy",
    "@/(.*)": "<rootDir>/src/$1",
  },
  transform: {
    ".(js|jsx)": "babel-jest",
    ".(ts|tsx)": "ts-jest",
  },
  coverageReporters: ["text", "lcov", "html"],
  coverageDirectory: "./jest-coverage",
  collectCoverage: true,
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: [...defaults.moduleFileExtensions, "ts", "tsx"],
  roots: ["<rootDir>/src"],
  globals: {
    "ts-jest": {
      tsconfig: "./tsconfig.test.json",
    },
  },
};
