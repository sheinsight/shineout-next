const fs = require('fs');
const path = require('path');
const prettier = require('prettier');
const prettierPath = prettier.resolveConfigFile.sync();
const exampleReader = require('./example-loader');

const exampleDir = path.join(__dirname, '../../packages', 'shineout', 'src');

const md = require('markdown-it')({
  html: true,
});

const tokenLoader = (content) => {
  const formattedCode = prettier.format(content, {
    filepath: prettierPath,
    parser: 'markdown',
    htmlWhitespaceSensitivity: 'strict',
  });
  const result = md.parse(formattedCode);
  return result;
};

// 提取 tokens 中 title 、 group 信息
const headerLoader = (tokens) => {
  const header = {
    name: '',
    group: '',
  };

  const titleToken = tokens.find((token, index) => {
    return (
      tokens[index - 1]?.markup === '-' &&
      token.type === 'inline' &&
      tokens[index + 1]?.markup === '-'
    );
  });
  const children = titleToken.children;
  if (titleToken && children) {
    const titleStr = children.find((i) => i.content.indexOf('name') > -1);
    const groupStr = children.find((i) => i.content.indexOf('group') > -1);

    if (titleStr) {
      header.name = titleStr.content.split(':')[1].trim();
    }

    if (groupStr) {
      header.group = groupStr.content.split(':')[1].trim();
    }
  }
  return header;
};

// 提取 tokens 中 head 信息
const titleLoader = (tokens) => {
  const title = {
    cn: '',
    en: '',
  };

  const titleToken = tokens.find((token, index) => {
    return (
      tokens[index - 3]?.content === 'Title' &&
      tokens[index - 1]?.type === 'paragraph_open' &&
      token.type === 'inline' &&
      tokens[index + 1]?.type === 'paragraph_close'
    );
  });

  if (titleToken && titleToken.children) {
    if (titleToken.children[0]) {
      title.cn = titleToken.children[0].content;
    }
    if (titleToken.children[2]) {
      title.en = titleToken.children[2].content;
    }
  }

  return title;
};

// 提取 tokens 中 describe 信息
const describeLoader = (tokens) => {
  const describe = {
    cn: '',
    en: '',
  };

  const describeToken = tokens.find((token, index) => {
    return (
      tokens[index - 3]?.content === 'Describe' &&
      tokens[index - 1]?.type === 'paragraph_open' &&
      token.type === 'inline' &&
      tokens[index + 1]?.type === 'paragraph_close'
    );
  });

  if (describeToken && describeToken.children) {
    if (describeToken.children[0]) {
      describe.cn = describeToken.children[0].content;
    }
    if (describeToken.children[2]) {
      describe.en = describeToken.children[2].content;
    }
  }

  return describe;
};

// 提取 tokens 中的 example 信息
const exampleLoader = (tokens, component) => {
  const srcRegex = /<code src=".\/([^"]+)">/i;

  const examplesToken = tokens.find((token, index) => {
    return (
      tokens[index - 3]?.content === 'Example' &&
      tokens[index - 1]?.type === 'paragraph_open' &&
      token.type === 'inline' &&
      tokens[index + 1]?.type === 'paragraph_close'
    );
  });

  if (examplesToken && examplesToken.children) {
    const examples = examplesToken.children
      .filter((token) => {
        return token.content.indexOf('src') > -1;
      })
      .map((example) => {
        const match = example.content.match(srcRegex);
        const context = fs.readFileSync(path.join(exampleDir, component, match[1]), 'utf8');
        return exampleReader(context, component, match[1].split('/')?.at(-1));
      });
    return examples;
  }

  return [];
};

const markdownLoader = (content, component) => {
  const tokens = tokenLoader(content);
  const header = headerLoader(tokens);
  const title = titleLoader(tokens);
  const describe = describeLoader(tokens);
  const examples = exampleLoader(tokens, component);
  return {
    header,
    title,
    describe,
    examples,
  };
};

module.exports = {
  tokenLoader,
  markdownLoader,
};
