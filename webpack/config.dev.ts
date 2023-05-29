const path = require('path');
const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const webpackConfig = {
  mode: 'development',
  stats: 'errors-only',
  entry: path.join(__dirname, '../docs/index.tsx'),
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.md', '.less'],
    alias: {
      shineout: path.resolve(__dirname, '../packages/shineout'),
    },
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.less$/i,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          {
            loader: 'less-loader',
          },
        ],
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
      title: 'Custom template',
      template: path.join(__dirname, '../public/index.ejs'),
    }),
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
