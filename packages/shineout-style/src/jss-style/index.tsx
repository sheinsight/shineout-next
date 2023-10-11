import type { FC } from 'react';
import { createUseStyles, JssProvider } from 'react-jss';
import { JssStyle } from 'jss';

function camelToDash(str: string): string {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase();
}

const createClassname = (rule: any, sheet: any) => {
  const ns = sheet.options.classNamePrefix;
  if (!ns) {
    console.warn('[sheinx/base]: styled should give namespace');
  }
  const prefix = 'so-';
  return `${prefix}${ns}${camelToDash(rule.key)}`;
};
export const StyleProvider: FC<{ children?: any; prefix?: string }> = function ({ children }) {
  return <JssProvider generateId={createClassname}>{children}</JssProvider>;
};

export type JsStyles<Name extends string = string> = Record<Name, JssStyle<undefined> | string>;

export type ClassStyle<K extends Record<string, any>> = {
  [P in keyof K]: Record<string, any>;
};
export const styled = <C extends string>(style: JsStyles<C>, ns: string) => {
  // const hoc = createUseStyles(handleRtl(style) as JsStyles<C>, { name: ns });
  const hoc = createUseStyles(style, { name: ns, generateId: createClassname });
  return hoc;
};
