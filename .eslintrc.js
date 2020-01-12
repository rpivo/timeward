module.exports = {
  "env": {
    "browser": true,
    "jest": true
  },
  "extends": [
    "eslint:all",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  "plugins": ["@typescript-eslint", "react"],
  "rules": {
    "array-element-newline": 0,
    "capitalized-comments": 0,
    "class-methods-use-this": 0,
    "comma-dangle": ["error", "always-multiline"],
    "dot-location": 0,
    "function-call-argument-newline": 0,
    "global-require": 0,
    "jsx-quotes": 0,
    "indent": ["error", 2],
    "init-declarations": 0,
    "max-len": ["error", { "code": 100 }],
    "no-inline-comments": 0,
    "no-magic-numbers": 0,
    "no-underscore-dangle": 0,
    "no-warning-comments": 0,
    "object-curly-spacing": ["error", "always"],
    "one-var": 0,
    "padded-blocks": 0,
    "prefer-named-capture-group": 0,
    "quote-props": 0,
    "quotes": 0,
    "require-unicode-regexp": 0,
    "sort-imports": 0,
    "space-before-function-paren": 0,
  },
  "settings": {
    "react": {
      "pragma": "React",
      "version": "detect"
    }
  },
  "parser": "@typescript-eslint/parser"
}