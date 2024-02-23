import { createUseStyles } from 'react-jss';
import { JssStyle, GenerateId } from 'jss';
import handleStyle from './handleStyle';
import version from '../version';

export { JssProvider } from 'react-jss';

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

export function generateClassName(version: string, prefix: string, ns: string, key: string) {
  const name = `${version}-${prefix}-${ns}-${key}`;
  return stringToHash(name);
  // return `${prefix}-${ns}${key}`;
}

// function camelToDash(str: string): string {
//   return str.replace(/([A-Z])/g, '-$1').toLowerCase();
// }

const createClassname = (rule: any, sheet: any) => {
  const options = sheet.options;
  const ns = options.classNamePrefix;
  if (!ns) {
    console.warn('[sheinx/base]: styled should give namespace');
  }
  const prefix = 'so';
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
  return hoc;
};
