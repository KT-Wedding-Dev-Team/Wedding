module.exports = {
    "extends": ["eslint:recommended", "google"],
    "parserOptions": {
        "ecmaVersion": 6
    },
    "env": {
        "es6": true,
        "node": true,
        "browser": true
    },
    "globals": {
        // ignore undefined variales in file
        "wx": true,
        "Page": true,
        "App": true,
    },
    "rules": {
        "no-console": 1,
        "new-cap": 1,
        "arrow-parens": 2,
        "comma-dangle": 2,
        "eol-last": 2,
        "key-spacing": 2,
        "max-len": 2,
        "new-cap": 1,
        "no-trailing-spaces": 2,
        "no-undef": 1,
        "no-unused-vars": 1,
        "no-var": 2,
        "object-curly-spacing": 2,
        "padded-blocks": 2,
        "quotes": 2,
        "require-jsdoc": 1,
        "semi": 2,
        "space-before-blocks": 2,
        "space-before-function-paren": 2,
        "spaced-comment": 2,
        "valid-jsdoc": 1,
      }
};
