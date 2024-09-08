export default {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  transform: { "^.+\\.tsx?$": "ts-jest" },
  moduleNameMapper: {
    "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/test/__ mocks __/fileMock.js",
    "^.+\\.(css|less|scss)$": "identity-obj-proxy",
  },
  setupFiles: ["./src/__test__/__setups__/canvas.js", "jest-canvas-mock"],
};
