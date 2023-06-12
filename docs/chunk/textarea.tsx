import React from 'react';
import MarkDown from '../theme/components/markdown/index.tsx';

const source = require('shineout/textarea/index.md');

export const api = [];

export const header = {
  name: '',
  group: 'Form',
};

export const title = {
  cn: '',
  en: '',
};

export const describe = {
  cn: '',
  en: '',
};

export const examples = [];

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
