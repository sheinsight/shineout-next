import { createUseStyles } from 'react-jss';
import { JssStyle, GenerateId, Classes } from 'jss';
import handleStyle from './handleStyle';
import version from '../version';

export { JssProvider } from 'react-jss';
const prefix = 'soui';

const config: {
  generateId?: GenerateId;
} = {};

export const setJssConfig = (newConfig: { generateId?: GenerateId }) => {
  Object.assign(config, newConfig);
};

const stringToHash = (str: string) => {
  let hash = 0;
  if (str.length === 0) return '';
  for (let i = 0; i < str.length; i += 1) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return 'c' + hash.toString(36);
};

const camelToDash = (str: string) => str.replace(/([A-Z])/g, '-$1').toLowerCase();

export function generateClassName(version: string, prefix: string, ns: string, key: string) {
  const name = `${version}-${prefix}-${ns}-${key}`;
  return stringToHash(name);
  // return `${prefix}-${ns}${key}`;
}

const createClassname = (rule: any, sheet: any) => {
  const options = sheet.options;
  const ns = options.classNamePrefix;
  if (!ns) {
    console.warn('[sheinx/base]: styled should give namespace');
  }

  if (config.generateId) return config.generateId(rule, sheet);
  return generateClassName(version, prefix, ns, rule.key);
  // return `${prefix}${ns}${camelToDash(rule.key)}`;
};
// export const StyleProvider: FC<{ children?: any; prefix?: string }> = function ({ children }) {
//   return <JssProvider generateId={createClassname}>{children}</JssProvider>;
// };

export type JsStyles<Name extends string = string> = Record<Name, JssStyle<undefined> | string>;

export type ClassStyle<K extends Record<string, any>> = {
  [P in keyof K]: Record<string, any>;
};

export const styled = <C extends string>(style: JsStyles<C>, ns: string) => {
  const hoc = createUseStyles(handleStyle(style), { name: ns, generateId: createClassname });
  const getClassName = () => {
    const classes = hoc();
    return Object.keys(classes).reduce((acc, key) => {
      const k = key as keyof typeof classes;
      const oldClass = classes[k];
      const constClass = `${prefix}-${ns}-${camelToDash(k)}`;
      console.log('oldClass', oldClass, constClass);
      const value = constClass === oldClass ? oldClass : `${oldClass} ${constClass}`;
      acc[k] = value;
      return acc;
    }, {} as Classes<C>);
  };
  return getClassName;
};
