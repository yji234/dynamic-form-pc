const eslintrc = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb',
    'airbnb/hooks',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  plugins: [
    '@typescript-eslint',
  ],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 2019,
    sourceType: 'module',
    ecmaFeatures: {
      experimentalObjectRestSpread: true
    }
  },
  rules: {
    '@typescript-eslint/consistent-type-definitions': ['error'],
    '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }],
    'indent': 'off', // 缩进2
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/member-ordering': ['error'],
    '@typescript-eslint/no-explicit-any': 0,
    'no-extra-parens': 'off',
    '@typescript-eslint/no-extra-parens': ['error', 'all', { ignoreJSX: 'all', enforceForArrowConditionals: false, nestedBinaryExpressions: false }],
    '@typescript-eslint/no-magic-numbers': 0,
    '@typescript-eslint/no-parameter-properties': 0,
    '@typescript-eslint/no-type-alias': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/prefer-for-of': 1,
    '@typescript-eslint/prefer-interface': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/interface-name-prefix': [0, {
      prefixWithI: 'always'
    }], // 接口名称首字母 I
    '@typescript-eslint/member-delimiter-style': [0, {
      delimiter: 'none'
    }], // 成员分隔符
    '@typescript-eslint/semi': ['error', 'always'],
    '@typescript-eslint/no-var-requires': 0,

    "no-empty-function": "off",
    "@typescript-eslint/no-empty-function": ["warn"],

    'space-infix-ops': ['error'],
    'comma-dangle': ['error', {
      'arrays': 'always-multiline',
      'objects': 'always-multiline',
      'imports': 'always-multiline',
      'exports': 'always-multiline',
      'functions': 'never'
    }],

    'quotes': ['error', 'single'], // 单引号
    'no-param-reassign': 0, // 传入参数可修改
    'no-restricted-globals': ['error', 'event'], // 部分全局变量禁止直接使用
    'react/jsx-indent': [2, 2],
    'react/react-in-jsx-scope': 'off',
    'import/extensions': ['error', 'never', {ts: 'never',tsx: 'never'}],
    'import/no-unresolved': 'off',
    'react/jsx-filename-extension': [2, { 'extensions': ['.tsx', '.ts', 'js', 'jsx'] }],
    'react/jsx-props-no-spreading': [0],
    'react/prop-types': [0],
    'jsx-a11y/anchor-is-valid': [0],
    'max-len': ['error', { 'code': 140, 'ignoreUrls': true }],
    "jsx-a11y/no-static-element-interactions": 0, // 有一些 event 的时候，不需要 role 属性，不需要其他解释
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/mouse-events-have-key-events": 0,
  },
}

module.exports = eslintrc
