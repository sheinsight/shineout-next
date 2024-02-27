import { defineConfig } from 'father';
export default defineConfig({
  umd: {
    name: 'Shineout',
    output: 'dist/umd1',
    externals: {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react',
      },
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom',
      },
    },
    postcssOptions: {},
    sourcemap: true,
    chainWebpack: (memo) => {
      memo.output.filename('shineout.js');
      memo.optimization.minimize(false);
      return memo;
    },
  },
});
