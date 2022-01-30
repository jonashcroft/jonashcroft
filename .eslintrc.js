module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
    'plugin:vue/recommended',
    'prettier',
  ],
  plugins: [],
  rules: {
    'babel/no-invalid-this': 0,
    'import/extensions': [
      'error',
      'never',
      {
        gql: 'always',
        scss: 'always',
      },
    ],
    'import/no-anonymous-default-export': 0,
    'import/no-unresolved': ['error', { ignore: ['@', '~', 'helpers'] }],
    'import/namespace': ['error', { allowComputed: true }],
    'no-alert': 0,
    'no-new': 0,
    'node/shebang': 0,
    'func-style': 0,
    'no-useless-catch': 0,
    'no-misleading-character-class': 0,
    'require-atomic-updates': 0,
    'prefer-object-spread': 0,
    'import/no-cycle': 0,
    'import/no-unused-modules': 0,
    'spaced-comment': ['error', 'always', { markers: ['/'] }],
    'vue/component-tags-order': [
      'error',
      {
        order: ['template', 'script', 'style'],
      },
    ],
    'vue/no-v-html': 0,
    'vue/max-len': [
      'error',
      {
        code: 200,
        template: 200,
        tabWidth: 2,
        comments: 200,
        ignorePattern: '',
        ignoreComments: false,
        ignoreTrailingComments: false,
        ignoreUrls: false,
        ignoreStrings: false,
        ignoreTemplateLiterals: false,
        ignoreRegExpLiterals: false,
        ignoreHTMLAttributeValues: false,
        ignoreHTMLTextContents: false,
      },
    ],
    'vue/padding-line-between-blocks': ['error'],
    'vue/multi-word-component-names': [
      'error',
      {
        ignores: ['default', 'error'],
      },
    ],
  },
}
