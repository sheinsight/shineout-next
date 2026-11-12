import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));

const readJson = (file: string) => JSON.parse(fs.readFileSync(file, 'utf8'));
const pkgVersion = (name: string) => readJson(path.join(HERE, 'node_modules', name, 'package.json')).version as string;

// 版本信息在启动 / 构建时注入，结果和 Markdown 报告里会带上。三个库都使用 npm 发布的产物
const META = {
  builtAt: new Date().toLocaleString('zh-CN', { hour12: false }),
  react: pkgVersion('react'),
  libs: {
    v2: { version: pkgVersion('shineout-v2'), source: 'npm' },
    v3: { version: pkgVersion('shineout-v3'), source: 'npm' },
    antd5: { version: pkgVersion('antd-v5'), source: 'npm' },
    antd: { version: pkgVersion('antd'), source: 'npm' },
  },
};

// shineout 2.x 的 es 产物会 import 各组件的 .less（只用于 cssModule 模式），
// 官方推荐的用法是忽略它们并全局引入 dist/theme.default.css，这里把 .less 换成空模块
const V2_LESS = /[\\/]shineout-v2[\\/].*\.less$/;
const EMPTY_LESS = '\0shineout-v2-empty-less';
const ignoreV2Less = (): Plugin => ({
  name: 'ignore-shineout-v2-less',
  enforce: 'pre',
  // 换成虚拟模块 id，否则以 .less 结尾的 id 仍会被 vite:css 当成样式编译。
  // 开发模式下预构建产物（.vite/deps）里的 .less 引用会被改写成绝对路径，所以也要匹配 source 本身
  resolveId(source, importer) {
    if (!source.endsWith('.less')) return null;
    if (V2_LESS.test(source) || (importer && /[\\/]shineout-v2[\\/]/.test(importer))) return EMPTY_LESS;
    return null;
  },
  load(id) {
    if (id === EMPTY_LESS) return 'export default {}';
    return null;
  },
});

export default defineConfig({
  // 相对路径：部署在 docs 站点的 /compare/ 子目录下，不依赖站点根路径
  base: './',
  plugins: [ignoreV2Less(), react()],
  define: {
    __COMPARE_META__: JSON.stringify(META),
    // shineout 2.x 的 es/config.js 直接读取这几个环境变量（webpack 4 会自动提供 process），这里给出它的默认值
    'process.env.CSS_MODULE': 'false',
    'process.env.SO_PREFIX': JSON.stringify('so'),
    'process.env.LOCALE': JSON.stringify('en-US'),
  },
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
  optimizeDeps: {
    entries: ['index.html', 'frame.html'],
  },
  server: {
    port: 5280,
  },
  preview: {
    port: 5281,
  },
  build: {
    // @sheinx/theme 的 esm 产物里用 require 引入了 CommonJS 的 figma.js（ESM 与 CJS 混用），
    // webpack 能直接处理，Vite 生产构建需要打开 transformMixedEsModules。开发模式由 esbuild 预构建处理
    commonjsOptions: { transformMixedEsModules: true },
    rollupOptions: {
      input: {
        index: path.join(HERE, 'index.html'),
        frame: path.join(HERE, 'frame.html'),
      },
    },
  },
});
