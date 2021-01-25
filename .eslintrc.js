module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  overrides: [
    {
      files: ["*.test.js"],
      rules: {
        "react/react-in-jsx-scope": "off",
        "no-undef": "off",
      },
    },
  ],
};
