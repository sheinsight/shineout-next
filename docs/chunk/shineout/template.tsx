import React from 'react';
import MarkDown from '../../theme/components/markdown/index.tsx';

const source = require('shineout/template/index.md');

export const api = [];

export const header = {
  name: 'Template',
  group: 'Form',
};

export const title = {
  cn: '模板 Template',
  en: 'Template',
};

export const describe = {
  cn: '描述中文---',
  en: '描述英文---',
};

export const examples = [
  {
    propName: {
      cn: '基本用法',
      en: 'Base',
    },
    propDescribe: {
      cn: '基础 template 用法',
      en: 'Base template',
    },
    code: require('!raw-loader!shineout/template/__example__/001-base.tsx')
      .default.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '')
      .trim(),
    component: require('shineout/template/__example__/001-base.tsx').default,
  },
];

export default (props) => (
  <MarkDown
    {...props}
    source={source}
    header={header}
    title={title}
    describe={describe}
    examples={examples}
    api={api}
  />
);
