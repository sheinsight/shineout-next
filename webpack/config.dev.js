const path = require('path');
const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const multer = require('multer');
const HTMLWebpackPlugin = require('html-webpack-plugin');

require('../scripts/dev-doc.js');

const port = 3333;

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
      '@sheinx/mock': path.resolve(__dirname, '../packages/mock/src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(css)$/,
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
        test: /\.(css)$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(tsx|ts)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
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
    new Webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
};

const compiler = Webpack(webpackConfig);

const upload = multer({ dest: 'uploads/' });
const server = new WebpackDevServer(
  {
    open: false,
    compress: true,
    onBeforeSetupMiddleware: (server) => {
      // mock upload api
      server.app.all('/api/upload', upload.any(), (req, res) => {
        // 读取请求中的formData 数据的file 字段
        console.log(req.files);
        res.json({ code: 0, data: req.files });
      });
      server.app.all('/api/upload/error', upload.any(), (req, res) => {
        // 读取请求中的formData 数据的file 字段
        res.error('上传失败');
      });
    },
  },
  compiler,
);

server.listen(port, 'localhost', () => {
  console.log(`Shineout Doc is running on port ${port}`);
});
