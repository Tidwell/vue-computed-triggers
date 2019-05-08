module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/prettier'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'prettier/prettier': [
      'error',
      {
        singleQuote: true
      }
    ],
    'vue/max-attributes-per-line': 0,
    'vue/html-self-closing': 0,
    'vue/no-v-html': 0,
    'vue/html-indent': [
      'error',
      2,
      { ignores: ['VElement[name=prism].children'] }
    ]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};
