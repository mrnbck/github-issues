module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": ["eslint:recommended","plugin:react/recommended"],
    "settings": {
        "react": {
            "version": "detect", // React version. "detect" automatically picks the version you have installed.
        },
    },
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        'max-len':['error', { 'code': 80}],
        indent: ['error', 2],
        quotes:['error', 'single'],
        eqeqeq:'error',
        'object-curly-spacing': ['error', 'always'],
        'arrow-spacing': ['error', { before: true, after: true }],
        'no-console': 0,
        'linebreak-style': ['error', 'unix'],
        semi: ['error', 'never'],


    }
,}