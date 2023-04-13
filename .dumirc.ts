import { defineConfig } from 'dumi';
import path from 'path';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'soui',
    favicon: 'https://assets.dotfashion.cn/webassets/assets-ocean/1625119864754.png',
    mode: 'site',
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
