import { defineConfig } from 'father';

const ignores = ['**/__test__/**', '**/__example__/**', '**/__test__/**'];
export default defineConfig({
  platform: 'browser',
  esm: { output: 'dist/esm', ignores },
  cjs: { output: 'dist/cjs', ignores },
});
