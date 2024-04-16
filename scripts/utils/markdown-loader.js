const fs = require('fs');
const path = require('path');
const prettier = require('prettier');
const prettierPath = prettier.resolveConfigFile.sync();
const exampleReader = require('./example-loader');

const exampleDirName = `__example__`;
const getStaticUrl = (component, num) =>
  `https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/${component}/${num}.png`;

const md = require('markdown-it')({
  html: true,
});

const splitByTagSections = (data, tag) => {
  // 初始化结果数组和缓存数组
  const results = [];
  let currentSection = [];

  // 遍历数据
  data.forEach((item, index, array) => {
    // 判断是否为 tag 开始标签
    if (item.type === 'heading_open' && item.tag === tag) {
      // 如果 currentSection 已有内容，推入结果数组
      if (currentSection.length > 0) results.push(currentSection);
      // 重置 currentSection 为新的部分
      currentSection = [];
    }
    // 将当前元素推入当前部分
    currentSection.push(item);

    // 判断是否为 tag 结束标签
    if (item.type === 'heading_close' && item.tag === tag) {
      // 如果是在数组的最后，推入结果数组（这里的校验可能是多余的，因为同样的工作已经在开始标签那里做过了）
      if (index === array.length - 1) {
        results.push(currentSection);
        currentSection = [];
      }
    }
  });

  // 如果最后一个部分非空，也推入结果数组
  if (currentSection.length > 0) results.push(currentSection);

  // 返回结果数组
  return results;
};

const tokenLoader = (content) => {
  const formattedCode = prettier.format(content, {
    filepath: prettierPath,
    parser: 'markdown',
    htmlWhitespaceSensitivity: 'strict',
  });
  const result = md.parse(formattedCode);
  return result;
};

// 提取 tokens 中的段落信息
const paragraphLoader = (tokens, component) => {
  const p = [];
  const h2 = splitByTagSections(tokens, 'h2');
  h2.forEach((_h2, _h2_index) => {
    if (_h2[0].type === 'heading_open' && _h2[0].tag === 'h2') {
      p.push({
        title: _h2[1].content,
        paragraphs: [],
      });
      const h3 = splitByTagSections(_h2.splice(3, _h2.length - 1) || [], 'h3') || [];
      h3.forEach((_h3, _h3_index) => {
        if (_h3[0].type === 'heading_open' && _h3[0].tag === 'h3') {
          p[_h2_index].paragraphs.push({
            title: _h3[1].content,
            image: [],
          });
        }
        const image = splitByTagSections(_h3.splice(3, _h3.length - 1) || [], 'p') || [];
        image.forEach((_image) => {
          if (_image[0].type === 'paragraph_open' && _image[0].tag === 'p') {
            if (_image[1].children && _image[1].children.length > 0) {
              _image[1].children.forEach((img) => {
                if (
                  img.type === 'image' &&
                  img.tag === 'img' &&
                  p[_h2_index].paragraphs[_h3_index] &&
                  p[_h2_index].paragraphs[_h3_index].image
                ) {
                  const isDescription =
                    img.content.indexOf('success') === -1 && img.content.indexOf('warning') === -1;
                  p[_h2_index].paragraphs[_h3_index].image.push({
                    type: isDescription ? '' : img.content,
                    description: isDescription ? img.content : '',
                    image: getStaticUrl(component, img.attrs[0][1]),
                  });
                }
              });
            }
          }
        });
      });
    }
  });

  return p;
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
    const files = file.split('/');
    const result = exampleReader(context, component, files?.[files.length - 1]);

    if (!result) return;

    examples.push(result);
  });

  if (examples.length === 0) return [];

  return examples;
};

const changelogLoader = (content) => {
  const tokens = tokenLoader(content);
  const changelogs = [];
  let currentVersion = '';
  let currentChangeType = '';

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    // 开始新版本的记录
    if (token.type === 'heading_open' && token.tag === 'h2') {
      const versionToken = tokens[i + 1];
      currentVersion = versionToken.children[0].content;
      currentTime = versionToken.children[0].content;
      changelogs.push({
        version: currentVersion,
        changes: {},
      });
    }
    if (token.type === 'heading_close' && token.tag === 'h2') {
      const timeToken = tokens[i + 2];
      changelogs[changelogs.length - 1].time = timeToken.children[0].content;
    }

    // 确定变更类型（fix、feat等）
    if (token.type === 'heading_open' && token.tag === 'h3') {
      const changeTypeToken = tokens[i + 1];
      currentChangeType = changeTypeToken.children[0].content;
      // 确保当前版本的变更类型已经初始化为数组
      changelogs[changelogs.length - 1].changes[currentChangeType] =
        changelogs[changelogs.length - 1].changes[currentChangeType] || [];
    }

    // 从段落中提取变更项
    if (
      token.type === 'inline' &&
      token.children &&
      token.children.some((t) => t.type === 'code_inline')
    ) {
      const changeDescriptions = token.content.split('\n').filter(Boolean);
      for (const desc of changeDescriptions) {
        changelogs[changelogs.length - 1].changes[currentChangeType].push(desc.trim());
      }
    }
  }

  return changelogs;
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

const guideLoader = (content, component) => {
  const tokens = tokenLoader(content);
  const paragraph = paragraphLoader(tokens, component) || [];

  return paragraph;
};

module.exports = {
  guideLoader,
  tokenLoader,
  markdownLoader,
  changelogLoader,
};
