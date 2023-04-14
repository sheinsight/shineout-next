import { defineConfig } from 'dumi';
import path from 'path';

export default defineConfig({
  outputPath: 'docs-dist',
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
      { type: 'View', dir: 'packages/view/src' },
    ],
  },
  alias: {
    '@soui/view': path.resolve(__dirname, './packages/view/src'),
  },
});
