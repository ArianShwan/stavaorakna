// .eslintrc.js
module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es2021": true,
    "node": true,
    "jest": true  // Lägg till jest-miljön
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 12
  },
  "rules": {
    "no-unused-vars": "warn",  // Ändra till varning istället för fel
    "no-undef": "warn"         // Ändra till varning istället för fel
  },
  "globals": {
    "describe": "readonly",
    "test": "readonly",
    "expect": "readonly",
    "it": "readonly",
    "beforeEach": "readonly",
    "afterEach": "readonly"
  }
};