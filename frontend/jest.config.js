module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testRegex: "(/__tests__/.*\\.(test|spec))\\.(ts|tsx|js|jsx)$",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
};
