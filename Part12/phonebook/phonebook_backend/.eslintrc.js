module.exports = {
    'env': {
        'browser': true,
        'node': true,
        'commonjs': true,
        'es2021': true
    },
    'extends': [
      'eslint:recommended',
      'plugin:react/recommended'
    ],
    'overrides': [
    ],
    'parserOptions': {
      'ecmaFeatures': {
        'jsx': true
      },
      'ecmaVersion': 2018,
      'sourceType': 'module'
    },
    'plugins': [
      'react'
    ],
    'rules': {
        'indent': [
            'error',
            2
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'never'
        ],
        'eqeqeq': 'error',
        'no-trailing-spaces': 'error',
        'object-curly-spacing': [
            'error', 'always'
        ],
        'arrow-spacing': [
            'error', { 'before': true, 'after': true }
        ],
        'no-console': 0,
        'react/prop-types': 0
    }
}