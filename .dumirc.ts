import { defineConfig } from 'dumi';
import path from 'path';

export default defineConfig({
  outputPath: 'docs-dist',
  mfsu: {
    exclude: [/^@shined/],
  },
  hash: true,
  themeConfig: {
    name: 'soui',
    favicon: '/shine.svg',
    logo: '/shine.svg',
  },
  resolve: {
    atomDirs: [
      { type: 'component', dir: 'packages/shineout/src' },
      { type: 'hooks', dir: 'packages/hooks/src' },
      { type: 'UI', dir: 'packages/ui/src' },
    ],
  },
  alias: {
    '@shined/ui': path.resolve(__dirname, 'packages/ui/src'),
  },
});
