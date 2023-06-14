import React from 'react';
import MarkDown from '../../theme/components/markdown/index.tsx';

const source = require('shineout/form/index.md');

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
  cn: '高性能表单控件，自带数据域管理。包含数据录入、校验以及对应样式。',
  en: 'Users can input or edit text in the text box.',
};

export const examples = [
  {
    propName: {
      cn: '基本用法',
      en: 'Basic usage',
    },
    propDescribe: {
      cn: '',
      en: '',
    },
    code: require('!raw-loader!shineout/form/__example__/s-001-base.tsx')
      .default.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '')
      .trim(),
    component: require('shineout/form/__example__/s-001-base.tsx').default,
  },
  {
    propName: {
      cn: '数组name',
      en: '数组name',
    },
    propDescribe: {
      cn: '',
      en: '',
    },
    code: require('!raw-loader!shineout/form/__example__/s-002-array.tsx')
      .default.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '')
      .trim(),
    component: require('shineout/form/__example__/s-002-array.tsx').default,
  },
  {
    propName: {
      cn: 'initValidate',
      en: 'initValidate',
    },
    propDescribe: {
      cn: '',
      en: '',
    },
    code: require('!raw-loader!shineout/form/__example__/t-003-initvalidate.tsx')
      .default.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '')
      .trim(),
    component: require('shineout/form/__example__/t-003-initvalidate.tsx').default,
  },
  {
    propName: {
      cn: '联动校验',
      en: '联动校验',
    },
    propDescribe: {
      cn: '',
      en: '',
    },
    code: require('!raw-loader!shineout/form/__example__/s-004-bind.tsx')
      .default.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '')
      .trim(),
    component: require('shineout/form/__example__/s-004-bind.tsx').default,
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
