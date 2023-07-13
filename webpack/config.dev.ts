const path = require('path');
const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const HTMLWebpackPlugin = require('html-webpack-plugin');

require('../scripts/dev-doc.js');
// class CustomPlugin {
//   apply(compiler) {
//     compiler.hooks.invalid.tap('CustomPlugin', () => {
//       console.log('Shineout Doc is compiling...');
//     });

//     compiler.hooks.done.tap('CustomPlugin', (stats) => {
//       console.log('Shineout Doc is compiled');
//     });
//   }
// }

const webpackConfig = {
  mode: 'development',
  stats: 'errors-only',
  devtool: 'source-map',
  entry: path.join(__dirname, '../docs/index.tsx'),
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.md', '.less'],
    alias: {
      shineout: path.resolve(__dirname, '../packages/shineout/src'),
      base: path.resolve(__dirname, '../packages/base/src'),
      store: path.resolve(__dirname, '../docs/theme/store'),
      chunk: path.resolve(__dirname, '../docs/chunk'),
      docs: path.resolve(__dirname, '../docs'),
      '@sheinx/base': path.resolve(__dirname, '../packages/base/src'),
      '@sheinx/shineout-style': path.resolve(__dirname, '../packages/shineout-style/src'),
      '@sheinx/hooks': path.resolve(__dirname, '../packages/hooks/src'),
      '@sheinx/theme': path.resolve(__dirname, '../packages/theme/src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        include: [/prismjs/],
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.md$/i,
        loader: 'raw-loader',
      },
      {
        test: /\.(tsx|ts)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
          },
        },
      },
    ],
  },
  plugins: [
    new Webpack.ProvidePlugin({
      React: 'react',
    }),
    new HTMLWebpackPlugin({
      title: 'Shineout Next',
      template: path.join(__dirname, '../public/index.ejs'),
    }),
    // new CustomPlugin(),
  ],
};

const compiler = Webpack(webpackConfig);

const server = new WebpackDevServer(
  {
    open: false,
    compress: true,
  },
  compiler,
);

server.listen(2333, 'localhost', () => {
  console.log('Shineout Doc is running on port 2333');
});
