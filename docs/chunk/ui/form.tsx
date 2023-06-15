import React from 'react';
import MarkDown from '../../theme/components/markdown/index.tsx';

const source = require('ui/form/index.md');

export const api = [];

export const header = {
  name: 'Form',
  group: 'Form',
};

export const title = {
  cn: '表单 Form',
  en: 'Form',
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
    code: require('!raw-loader!ui/form/__example__/001-base.tsx')
      .default.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '')
      .trim(),
    component: require('ui/form/__example__/001-base.tsx').default,
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
    code: require('!raw-loader!ui/form/__example__/002-vertical.tsx')
      .default.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '')
      .trim(),
    component: require('ui/form/__example__/002-vertical.tsx').default,
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
