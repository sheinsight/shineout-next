module.exports = {
  pluginSearchDirs: false,
  plugins: [
    require.resolve('prettier-plugin-organize-imports'),
    require.resolve('prettier-plugin-packagejson'),
  ],
  // 使用单引号
  singleQuote: true,
  // 末尾需要逗号
  trailingComma: 'all',
  // 箭头函数，只有一个参数的时候，也需要括号
  arrowParens: 'always',
  // jsx 使用单引号
  jsxSingleQuote: true,
  // 大括号内的首尾需要空格
  bracketSpacing: true,
  // jsx标签的反尖括号需要换行
  bracketSameLine: false,
  // 不使用缩进符，而使用空格
  useTabs: false,
  // 一行最多 100 字符
  printWidth: 100,
  // 使用 2 个空格缩进
  tabWidth: 2,
  // 折行标准 - preserve
  proseWrap: 'preserve',
  // 换行符使用 lf
  endOfLine: 'lf',
  // 根据显示样式决定 html 要不要折行
  htmlWhitespaceSensitivity: 'css',
  overrides: [
    {
      files: '*.md',
      options: {
        proseWrap: 'preserve',
      },
    },
    {
      files: '.prettierrc',
      options: {
        parser: 'json',
      },
    },
    {
      files: '*.ejs',
      options: {
        parser: 'html',
      },
    },
    {
      files: '*.json',
      options: {
        parser: 'json',
      },
    },
  ],
};
