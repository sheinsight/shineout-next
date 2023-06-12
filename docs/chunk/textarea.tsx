import React from 'react';
import MarkDown from '../theme/components/markdown/index.tsx';

const source = require('shineout/textarea/index.md');

export const api = [];

export const header = {
  name: 'Textarea',
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
      cn: '基本用法',
      en: 'Base',
    },
    propDescribe: {
      cn: '基础 textarea 用法',
      en: 'Base Textarea',
    },
    code: require('!raw-loader!shineout/textarea/__example__/s-001-base.tsx')
      .default.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '')
      .trim(),
    component: require('shineout/textarea/__example__/s-001-base.tsx').default,
  },
  {
    propName: {
      cn: '尺寸',
      en: 'Size',
    },
    propDescribe: {
      cn: '基础 textarea 用法',
      en: 'Base Textarea',
    },
    code: require('!raw-loader!shineout/textarea/__example__/s-002-size.tsx')
      .default.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '')
      .trim(),
    component: require('shineout/textarea/__example__/s-002-size.tsx').default,
  },
  {
    propName: {
      cn: '自适应高度',
      en: '自适应高度',
    },
    propDescribe: {
      cn: 'autosize 为 true 时， rows 为最小高度，如果要设置最大高度，使用 maxHeight 即可',
      en: 'autosize 为 true 时， rows 为最小高度，如果要设置最大高度，使用 maxHeight 即可',
    },
    code: require('!raw-loader!shineout/textarea/__example__/s-003-autosize.tsx')
      .default.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '')
      .trim(),
    component: require('shineout/textarea/__example__/s-003-autosize.tsx').default,
  },
  {
    propName: {
      cn: '信息',
      en: 'Info',
    },
    propDescribe: {
      cn: '设置 info 为数字, 设定最大长度，用户 focus 时会显示用户已输入文字长度。',
      en: 'Set info to number, set the maximum length, and the user&#39;s focus shows the length of text that the user has entered.',
    },
    code: require('!raw-loader!shineout/textarea/__example__/s-004-info.tsx')
      .default.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '')
      .trim(),
    component: require('shineout/textarea/__example__/s-004-info.tsx').default,
  },
  {
    propName: {
      cn: '渲染底部信息',
      en: 'RenderFooter',
    },
    propDescribe: {
      cn: '渲染 textarea footer',
      en: 'render textarea footer',
    },
    code: require('!raw-loader!shineout/textarea/__example__/s-006-footer.tsx')
      .default.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '')
      .trim(),
    component: require('shineout/textarea/__example__/s-006-footer.tsx').default,
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
