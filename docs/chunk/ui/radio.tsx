import React from 'react';
import MarkDown from '../../theme/components/markdown/index.tsx';

const source = require('ui/radio/index.md');

export const api = [];

export const header = {
  name: 'Radio',
  group: 'Form',
};

export const title = {
  cn: '单选 Radio',
  en: 'Radio',
};

export const describe = {
  cn: '',
  en: '',
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
    code: require('!raw-loader!ui/radio/__example__/001-base.tsx')
      .default.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '')
      .trim(),
    component: require('ui/radio/__example__/001-base.tsx').default,
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
    code: require('!raw-loader!ui/radio/__example__/002-disabled.tsx')
      .default.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '')
      .trim(),
    component: require('ui/radio/__example__/002-disabled.tsx').default,
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
