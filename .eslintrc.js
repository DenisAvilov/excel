module.exports = {
  'parser': 'babel-eslint',
  'env': {
    'es6': true,
    'browser': true,
    'node': true,
  },
  'rules': {
    'semi': 'off',
    'no-unused-expressions': 0,
    'linebreak-style': 0,
    'comma-dangle': 'off',
    'require-jsdoc': 'off',
    'max-len': 'off',
    'operator-linebreak': 'off',
    'arrow-parens': 'off'
  },
  'extends': ['eslint:recommended', 'google']
}
