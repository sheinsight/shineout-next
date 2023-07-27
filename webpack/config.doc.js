const path = require('path');
const Webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { docBuild } = require('../scripts/doc-build');

docBuild();

module.exports = {
  mode: 'production',
  entry: {
    app: path.join(__dirname, '../docs/index.tsx'),
    css: path.join(__dirname, '../public/index.css'),
  },
  output: {
    path: path.join(__dirname, `../dist`),
    publicPath: './',
    libraryTarget: 'umd',
    library: 'ShineoutDoc',
  },
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
        test: /\.(css)$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
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
    new MiniCssExtractPlugin(),
    new Webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
};
