import { setJssConfig } from '@sheinx/shineout-style';
import { _convertCamelToDash } from './utils';

import { setConfig, } from 'shineout';
setConfig({ delay: 0 });

setJssConfig({
  generateId: (rule: any, sheet: any) => {
    const options = sheet.options;
    const ns = options.classNamePrefix;
    if (!ns) {
      console.warn('[sheinx/base]: styled should give namespace');
    }
    const prefix = 'soui-';
    return `${prefix}${ns}${_convertCamelToDash(rule.key)}`;
  },
});