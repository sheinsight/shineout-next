const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');

const md = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true,
});

const regex = /<code src=".\/([^"]+)">/i;

const astLoader = (token, type, flag) => {
  if (token.type === type && token.content.indexOf(flag) > -1) {
    return token.content.split(flag)[1].trim();
  }

  return '';
};

const titleLoader = (tokens) => {
  const title = {
    title: '',
    group: '',
    order: -1,
  };

  tokens.forEach((token) => {
    title.title = title.title || astLoader(token, 'text', 'title:');
    title.group = title.group || astLoader(token, 'text', 'group:');
    title.order = title.order || astLoader(token, 'text', 'order:');
  });

  return title;
};

const headerLoader = (tokens) => {
  const header = {
    title: {
      en: '',
      cn: '',
    },
    describe: {
      en: '',
      cn: '',
    },
  };

  tokens.forEach((token) => {
    if (token.type === 'inline') {
      token.children.forEach((child) => {
        header.title.en = header.title.en || astLoader(child, 'text', '-en');
        header.title.cn = header.title.cn || astLoader(child, 'text', '-cn');

        header.describe.en = header.describe.en || astLoader(child, 'text', '~en');
        header.describe.cn = header.describe.cn || astLoader(child, 'text', '~cn');
      });
    }
  });

  return header;
};

const exampleLoader = (tokens, component) => {
  const example = {
    prop: '',
    propName: {
      en: '',
      cn: '',
    },
    propDescribe: {
      en: '',
      cn: '',
    },
  };

  tokens.forEach((token) => {
    if (token.type === 'inline' && token.children && token.children[0].content === token.content) {
      example.prop = token.content;
    }

    if (
      token.type === 'inline' &&
      (token.content.indexOf('-cn' > -1) || token.content.indexOf('-en' > -1))
    ) {
      token.children.forEach((child) => {
        example.propName.en = example.propName.en || astLoader(child, 'text', '-en');
        example.propName.cn = example.propName.cn || astLoader(child, 'text', '-cn');
      });
    }

    if (
      token.type === 'inline' &&
      (token.content.indexOf('~cn' > -1) || token.content.indexOf('~en' > -1))
    ) {
      token.children.forEach((child) => {
        example.propDescribe.en = example.propDescribe.en || astLoader(child, 'text', '~en');
        example.propDescribe.cn = example.propDescribe.cn || astLoader(child, 'text', '~cn');
      });
    }

    if (token.content.indexOf('<code' > -1)) {
      const match = token.content.match(regex);
      if (match) {
        example.component = `require('shineout/src/${component}/${match[1]}')`;
      }
    }
  });

  return example;
};

const tokenLoader = (tokens, component) => {
  const doc = {
    title: {},
    header: {},
    examples: [],
  };
  tokens.forEach((token, index) => {
    // 解析标题
    if (token.type === 'hr') {
      const next = tokens[index + 1];
      if (next.type === 'heading_open' && next.tag === 'h2') {
        const titleContent = tokens[index + 2];
        if (titleContent.type === 'inline') {
          doc['title'] = titleLoader(titleContent.children);
        }
      }

      return;
    }

    // 解析头部
    if (token.type === 'heading_close' && token.tag === 'h1') {
      const firstExampleStartIndex = tokens.findIndex(
        (t, i) => i > index && t.type === 'heading_open' && t.tag === 'h2',
      );
      const headerTokens = tokens.slice(index, firstExampleStartIndex);
      doc['header'] = headerLoader(headerTokens);

      return;
    }

    // 解析示例
    if (token.type === 'heading_open' && token.tag === 'h2' && tokens[index - 1]?.type !== 'hr') {
      const nextExampleStartIndex = tokens.findIndex(
        (t, i) => i > index && t.type === 'heading_open' && t.tag === 'h2',
      );
      const exampleTokens = tokens.slice(index, nextExampleStartIndex || tokens.length - 1);
      doc['examples'].push(exampleLoader(exampleTokens, component));

      return;
    }
  });

  return doc;
};

const componentsDir = path.join(__dirname, '../packages', 'shineout', 'src');

const compile = (fileName) => {
  fs.readdirSync(componentsDir)
    .filter((file) => fs.statSync(path.join(componentsDir, file)).isDirectory())
    .filter((file) => {
      if (fileName) {
        return file === fileName;
      }
      return file.indexOf('@') === -1;
    })
    .forEach((component) => {
      const indexPath = path.join(componentsDir, component, 'index.md');
      try {
        const content = fs.readFileSync(indexPath, 'utf8');
        const tokens = md.parse(content);
        const doc = tokenLoader(tokens, component);

        fs.writeFileSync(
          path.join(__dirname, `../docs/chunk/${component}.ts`),
          `export default ${JSON.stringify(doc, null, 2).replace(
            /"component":\s*"([^"]*)"/g,
            '"component": $1',
          )}`,
        );
      } catch (err) {
        console.error(`Error reading file: ${indexPath}`);
      }
    });
};

const resolveDir = (filePath) => {
  const paths = filePath.split('/');
  return {
    component: paths.at(-2),
    fileType: paths.at(-1).split('.')[1],
  };
};

const watcher = chokidar.watch(componentsDir, { ignored: /index\.(ts|tsx)$/ });

watcher
  .on('add', (filePath) => {
    const { component, fileType } = resolveDir(filePath);
    if (fileType === 'md') {
      compile(component);
    }
  })
  .on('change', (filePath) => {
    const { component, fileType } = resolveDir(filePath);
    if (fileType === 'md') {
      compile(component);
    }
  })
  .on('unlink', (filePath) => {
    const { fileType } = resolveDir(filePath);
    if (fileType === 'md') {
      compile();
    }
  });

compile();
