module.exports = {
  root: true,
  env: {
    node: true,
      // 添加
	  jquery: true
  },
  'extends': [
    'plugin:vue/essential',
    // '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // "camelcase": ["error", {"allow": ["aa_bb"]}],
    "camelcase": [1, { "properties": "never" }],
    "space-before-function-paren": 0,
    "prettier/prettier": "off"
  },
}