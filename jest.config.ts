const { defaults } = require("jest-config");

module.exports = {
  testEnvironment: "jsdom",
  modulePathIgnorePatterns: ["dist/"],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  moduleNameMapper: {
    "^.+\\.(css|less|scss)$": "identity-obj-proxy",
    "@/(.*)": "<rootDir>/src/$1",
  },
  //   setupFilesAfterEnv: ["./setupTests.ts"],
  coverageReporters: ["text", "lcov"],
  coverageDirectory: ".",
  transform: {
    ".(js|jsx)": "babel-jest",
    ".(ts|tsx)": "ts-jest",
  },
};
