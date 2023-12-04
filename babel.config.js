module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          chrome: '49',
          firefox: '83',
          safari: '13',
        },
        corejs: {
          version: '3.33.3',
        },
        useBuiltIns: 'usage',
      },
    ],
    '@babel/preset-typescript',
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
  plugins: ['@babel/plugin-transform-runtime'],
};
