// t-xxx 为测试示例
const testFlag = 't-';

const wrapWithSpan = (str) => {
  const regex = /`([^`]*)`/g;
  const wrappedStr = str.replace(regex, '<span>$1</span>');
  return wrappedStr;
};

const exampleLoader = (content, component, fileName) => {
  // 仅处理非 t-xxx 的文件
  // if (fileName.indexOf(testFlag) > -1) {
  //   return false;
  // }

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
  };

  if (fileName.indexOf(testFlag) > -1) {
    example['isTest'] = true;
  } else {
    example['isTest'] = false;
  }

  const textLine = content.split(`\n`);

  const cnStart = textLine.findIndex((i) => i.indexOf('cn -') > -1);
  const enStart = textLine.findIndex((i) => i.indexOf('en -') > -1);

  // 从 textLine 中提取中文描述，起始位置为 cnStart，如果有 enStart 则结束位置为 enStart，否则结束位置为 textLine.length
  if (cnStart > -1) {
    example.propName.cn = textLine[cnStart].split('cn -')?.[1].trim() || '';
    for (let i = cnStart; i < (enStart > -1 ? enStart : textLine.length); i++) {
      if (textLine[i].indexOf('*    --') > -1) {
        example.propDescribe.cn.push(
          wrapWithSpan(textLine[i].split('--')?.[1].trim() || '').replace(/`/g, ''),
        );
      }
    }
  }

  // 从 textLine 中提取英文描述，起始位置为 enStart，如果有 cnStart 则结束位置为 cnStart，否则结束位置为 textLine.length
  if (enStart > -1) {
    example.propName.en = textLine[enStart].split('en -')?.[1].trim() || '';
    for (let i = enStart; i < (cnStart > -1 ? cnStart : textLine.length); i++) {
      if (textLine[i].indexOf('*    --') > -1) {
        example.propDescribe.en.push(
          wrapWithSpan(textLine[i].split('--')?.[1].trim() || '').replace(/`/g, ''),
        );
      }
    }
  }
  return example;
};

module.exports = exampleLoader;
