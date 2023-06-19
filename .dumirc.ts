import { defineConfig } from 'dumi';
import path from 'path';

export default defineConfig({
  outputPath: 'docs-dist',
  mfsu: {
    exclude: [/^@sheinx/, 'shineout'],
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
      { type: 'ui', dir: 'packages/base/src' },
      { type: 'shineout', dir: 'packages/shineout/src' },
    ],
  },
  alias: {
    '@sheinx/base': path.resolve(__dirname, 'packages/base/src'),
    shineout: path.resolve(__dirname, 'packages/shineout/src'),
  },
});
