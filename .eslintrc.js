module.exports = {
  parser: "babel-eslint",
  env: {
    es6: true,
    node: true,
    browser: true
  },
  parserOptions: {
    ecmaVersion: 8,
    sourceType: "module",
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    }
  },
  extends: "eslint:recommended",
  rules: {
    indent: ["error", 2],
    "linebreak-style": ["error", "windows"],
    quotes: ["error", "double"],
    "react/jsx-uses-react": 2,
    "react/jsx-uses-vars": 2,
    "react/react-in-jsx-scope": 2
  },
  plugins: ["react"]
}
