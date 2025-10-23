// t-xxx | test-xxx 为测试示例

const isTest = (file) => /^(t|test)-(.)+/.test(file);
const wrapWithSpan = (str) => {
  const regex = /`([^`]*)`/g;
  const wrappedStr = str.replace(regex, '<span>$1</span>');
  return wrappedStr;
};

const exampleLoader = (content, component, fileName) => {
  // 仅处理非 t-xxx 的文件
  const fileisTest = isTest(fileName);
  if (process.env.NODE_ENV === 'production' && fileisTest ) {
    return false;
  }

  const example = {
    fileName,
    propName: {
      en: '',
      cn: '',
    },
    propDescribe: {
      en: [],
      cn: [],
    },
    component: '',
    files: {},
  };

  if (fileisTest) {
    example['isTest'] = true;
  } else {
    example['isTest'] = false;
  }

  const textLine = content.split(`\n`);
  if (component === 'select') {
    textLine.forEach((i, index) => {
      if (i.indexOf(`from './static/`) > -1) {
        let matches = i.match(/'([^']+)'/g);
        matches = matches.map((match) => match.slice(1, -1));
        if (matches.length > 0 && matches[0]) {
          const file = matches[0].split('/').at(-1);
          example.files[file] = '';
        }
      }
    });
  }

  const cnStart = textLine.findIndex((i) => i.indexOf('cn -') > -1);
  const enStart = textLine.findIndex((i) => i.indexOf('en -') > -1);
  const end = textLine.findIndex((i) => i.indexOf('*/') > -1);

  // 从 textLine 中提取中文描述，起始位置为 cnStart，如果有 enStart 则结束位置为 enStart，否则结束位置为 textLine.length
  if (cnStart > -1) {
    example.propName.cn = textLine[cnStart].split('cn -')?.[1].trim() || '';
    for (let i = cnStart; i < (enStart > -1 ? enStart : textLine.length); i++) {
      if (textLine[i].indexOf('*    --') > -1) {
        const parts = textLine[i].split('--');
        const description = parts.slice(1).join('--').trim();
        example.propDescribe.cn.push(
          wrapWithSpan(description || '').replace(/`/g, ''),
        );
      }
    }
  }

  // 从 textLine 中提取英文描述，起始位置为 enStart，如果有 cnStart 则结束位置为 cnStart，否则结束位置为 textLine.length
  if (enStart > -1) {
    example.propName.en = textLine[enStart].split('en -')?.[1].trim() || '';
    for (let i = enStart; i < end; i++) {
      if (textLine[i].indexOf('*    --') > -1) {
        const parts = textLine[i].split('--');
        const description = parts.slice(1).join('--').trim();
        example.propDescribe.en.push(
          wrapWithSpan(description || '').replace(/`/g, ''),
        );
      }
    }
  }
  return example;
};

module.exports = exampleLoader;
