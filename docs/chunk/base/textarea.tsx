import React from 'react';
import MarkDown from '../../theme/components/markdown/index.tsx';

const source = require('base/textarea/index.md');

export const api = [];

export const header = {
  name: '',
  group: 'Form',
};

export const title = {
  cn: '多行文本框 Textarea',
  en: 'Textarea',
};

export const describe = {
  cn: '用户可以在文本框内输入或编辑文字。',
  en: 'Users can input or edit text in the text box.',
};

export const examples = [
  {
    propName: {
      cn: '',
      en: '',
    },
    propDescribe: {
      cn: '',
      en: '',
    },
    code: require('!raw-loader!base/textarea/__example__/001-base.tsx')
      .default.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '')
      .trim(),
    component: require('base/textarea/__example__/001-base.tsx').default,
  },
  {
    propName: {
      cn: '',
      en: '',
    },
    propDescribe: {
      cn: '',
      en: '',
    },
    code: require('!raw-loader!base/textarea/__example__/002-disabled.tsx')
      .default.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '')
      .trim(),
    component: require('base/textarea/__example__/002-disabled.tsx').default,
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
