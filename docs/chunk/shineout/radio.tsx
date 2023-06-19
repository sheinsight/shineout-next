import React from 'react';
import MarkDown from '../../theme/components/markdown/index.tsx';

const source = require('shineout/radio/index.md');

export const api = [];

export const header = {
  name: 'Radio',
  group: 'Form',
};

export const title = {
  cn: '单选框 Radio',
  en: 'Radio',
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
      cn: '基础 radio 用法',
      en: 'Base radio',
    },
    code: require('!raw-loader!shineout/radio/__example__/001-base.tsx')
      .default.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '')
      .trim(),
    component: require('shineout/radio/__example__/001-base.tsx').default,
  },
  {
    propName: {
      cn: '',
      en: '',
    },
    propDescribe: {
      cn: '将一组 Radio 放在 Radio.Group 中，以 React 组件方式调用。',
      en: 'A series of radios group by Radio.Group.',
    },
    code: require('!raw-loader!shineout/radio/__example__/002-group.tsx')
      .default.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '')
      .trim(),
    component: require('shineout/radio/__example__/002-group.tsx').default,
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
