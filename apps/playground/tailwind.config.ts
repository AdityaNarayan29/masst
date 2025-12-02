import baseConfig from '../../packages/tailwind-config/tailwind.config.cjs';

export default {
  ...baseConfig,
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    '../../packages/mastui/**/*.{ts,tsx}', // If using MastUI components
  ],
};
