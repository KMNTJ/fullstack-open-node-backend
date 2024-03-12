module.exports = {
  // Environment settings
  env: {
    node: true,
    commonjs: true,
    es2021: true,
  },

  // Parser options
  parserOptions: {
    ecmaVersion: 'latest',
  },

  // Plugins
  //plugins: ["@stylistic/js"],

  // Extending rules
  extends: ['eslint:recommended', 'prettier'],

  // Overrides for specific files
  overrides: [
    {
      files: ['.eslintrc.{js,cjs}'],
      env: {
        node: true,
      },
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
}
