import { defineConfig } from 'dumi';
import path from 'path';

export default defineConfig({
  outputPath: 'docs-dist',
  mfsu: {
    exclude: [/^@shined/, 'shineout'],
  },
  hash: true,
  themeConfig: {
    name: 'soui',
    favicon: '/shine.svg',
    logo: '/shine.svg',
  },
  autoAlias: false,
  resolve: {
    atomDirs: [
      { type: 'ui', dir: 'packages/ui/src' },
      { type: 'shineout', dir: 'packages/shineout/src' },
    ],
  },
  alias: {
    '@shined/ui': path.resolve(__dirname, 'packages/ui/src'),
    shineout: path.resolve(__dirname, 'packages/shineout/src'),
  },
});
