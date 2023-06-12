const exampleFlag = 's-';
const testFlag = 'st-';

const exampleLoader = (content, component, fileName) => {
  const example = {
    fileName,
    propName: {
      en: '',
      cn: '',
    },
    propDescribe: {
      en: '',
      cn: '',
    },
    component: '',
  };

  if (fileName.indexOf(exampleFlag) > -1) {
    example['isTest'] = false;
  }

  if (fileName.indexOf(testFlag) > -1) {
    example['isTest'] = true;
  }

  const textLine = content.split(`\n`);
  textLine.forEach((line, idx) => {
    if (line.indexOf('cn -') > -1) {
      example.propName.cn = line.split('cn -')?.[1].trim() || '';
      if (textLine[idx + 1].indexOf('*    --') > -1) {
        example.propDescribe.cn = textLine[idx + 1].split('--')?.[1].trim() || '';
      }
    }
    if (line.indexOf('en -') > -1) {
      example.propName.en = line.split('en -')?.[1].trim() || '';
      if (textLine[idx + 1].indexOf('*    --') > -1) {
        example.propDescribe.en = textLine[idx + 1].split('--')?.[1].trim() || '';
      }
    }
  });
  return example;
};

module.exports = exampleLoader;
