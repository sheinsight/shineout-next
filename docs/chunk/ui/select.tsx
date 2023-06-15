import React from 'react';
import MarkDown from '../../theme/components/markdown/index.tsx';

const source = require('ui/select/index.md');

export const api = [];

export const header = {
  name: 'Select',
  group: 'Other',
};

export const title = {
  cn: 'Select',
  en: 'Select',
};

export const describe = {
  cn: 'Select 描述信息',
  en: 'Select Describe',
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
