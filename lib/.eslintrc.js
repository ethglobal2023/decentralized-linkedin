// https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/README.md
module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
    rules: {
        '@typescript-eslint/no-loss-of-precision': 'warn',
        '@typescript-eslint/no-unnecessary-type-constraint': 'warn',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-unused-vars': 'warn',
    },
}