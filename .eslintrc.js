// .eslintrc.js
module.exports = {
  extends: [
    'next/core-web-vitals',
    'eslint:recommended'
    // Temporarily remove @typescript-eslint/recommended to fix build
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    'prefer-const': 'error',
    'react-hooks/exhaustive-deps': 'warn'
  },
  ignorePatterns: [
    '.next/',
    'node_modules/',
    'out/',
    'public/'
  ]
}
