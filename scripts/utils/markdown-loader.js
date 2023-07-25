const fs = require('fs');
const path = require('path');
const prettier = require('prettier');
const prettierPath = prettier.resolveConfigFile.sync();
const exampleReader = require('./example-loader');

const exampleDirName = `__example__`;

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

const getParagraph = (tokens, index) => {
  const nextH2Index = tokens.findIndex((token, i) => {
    return (
      i > index &&
      token.tag === 'h2' &&
      token.type === 'heading_open' &&
      tokens[i + 1].type === 'inline' &&
      tokens?.[i + 4] &&
      tokens[i + 4].content.indexOf('![') > -1
    );
  });

  const paragraphs = tokens.filter((token, i) => {
    if (nextH2Index === -1) {
      return i > index && token.content.indexOf('![') > -1;
    } else {
      return i > index && i < nextH2Index && token.content.indexOf('![') > -1;
    }
  });

  const result = paragraphs.map((p) => {
    return {
      paragraph: p.children?.[0]?.content,
      image: p.children?.[0]?.attrs?.[0]?.[1],
    };
  });

  return result;
};

// 提取 tokens 中的段落信息
const paragraphLoader = (tokens) => {
  const paragraphs = [];
  tokens.forEach((token, index) => {
    if (
      index === 0 &&
      token.tag === 'h2' &&
      token.type === 'heading_open' &&
      tokens[index + 1].type === 'inline' &&
      tokens[index + 1].content.indexOf('![') === -1
    ) {
      paragraphs.push({
        title: tokens[index + 1].content,
        paragraphs: [
          {
            paragraph: tokens[index + 4].content,
            image: '',
          },
        ],
      });
    }

    if (
      token.tag === 'h2' &&
      token.type === 'heading_open' &&
      tokens[index + 1].type === 'inline' &&
      tokens?.[index + 4] &&
      tokens[index + 4].content.indexOf('![') > -1
    ) {
      const title = tokens[index + 1].content;
      const paragraph = getParagraph(tokens, index);
      paragraphs.push({
        title,
        paragraphs: paragraph,
      });
    }
  });

  return paragraphs;
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
const exampleLoader = (tokens, component, module) => {
  const hasExample = tokens.find((i) => i.content === 'Example' && i.type === 'inline');

  if (!hasExample) return [];

  const exampleDir = path.join(module, component, exampleDirName);
  const hasExampleDir = fs.existsSync(exampleDir);

  if (!hasExampleDir) return [];
  const examples = [];
  fs.readdirSync(exampleDir).forEach((file) => {
    if (file.indexOf('.tsx') === -1) return;
    const context = fs.readFileSync(path.join(exampleDir, file), 'utf-8');
    const result = exampleReader(context, component, file.split('/')?.at(-1));

    if (!result) return;

    examples.push(result);
  });

  if (examples.length === 0) return [];

  return examples;
};

const markdownLoader = (content, component, module) => {
  const tokens = tokenLoader(content);
  const header = headerLoader(tokens);
  const title = titleLoader(tokens);
  const describe = describeLoader(tokens);
  const examples = exampleLoader(tokens, component, module);
  return {
    header,
    title,
    describe,
    examples,
  };
};

const guideLoader = (content) => {
  const tokens = tokenLoader(content);
  const paragraph = paragraphLoader(tokens);
  return paragraph;
};

module.exports = {
  guideLoader,
  tokenLoader,
  markdownLoader,
};
