import type { FC } from 'react';
import { createContext, useCallback, useContext } from 'react';
import type { Styles } from 'react-jss';
import type {} from 'jss';
import { createGenerateId, createUseStyles, JssProvider, SheetsRegistry } from 'react-jss';
import deepmerge from 'ts-deepmerge';
import { CompStyle } from '../types/common';

import * as mixins from './mixin';
import defaultTheme from './themes/default';
import type { OptTheme, Theme } from './type';

export const mixin = mixins;
const context = createContext<Theme>(defaultTheme);
const CLS_PREFIX = 'soui';

export const StyleProvider: FC<{ theme?: OptTheme; children?: any }> = function ({
  theme = {},
  children,
}) {
  const mergedTheme = deepmerge(defaultTheme, theme) as Theme;
  const createClassname = useCallback((rule: any, sheet: any) => {
    const ns = sheet.options.classNamePrefix;
    if (!ns) {
      console.warn('[soui-view]: styled should give namespace');
    }
    console.log('!!!!', `${CLS_PREFIX}${ns}${rule.key}`);
    return `${CLS_PREFIX}${ns}${rule.key}`;
  }, []);

  return (
    <context.Provider value={mergedTheme}>
      <JssProvider generateId={createClassname}>{children}</JssProvider>
    </context.Provider>
  );
};

type StyledArgFuncType = (theme: Theme) => Styles<string, { theme: Theme }, undefined>;
export const styled = (
  style: Styles<any, { theme: Theme }, Theme> | StyledArgFuncType,
  ns: string,
) => {
  const hoc = createUseStyles(style, { name: ns });
  return () => {
    const theme = useContext<Theme>(context);
    return hoc({ theme });
  };
};

export const DocumentProvider: FC<{
  children?: any;
  registry?: SheetsRegistry;
}> = function ({ children, registry }) {
  const generateId = createGenerateId();

  return (
    <JssProvider generateId={generateId} registry={registry}>
      {children}
    </JssProvider>
  );
};

export { SheetsRegistry };

export function makeStyle<T extends StyledArgFuncType>(createStyle: T) {
  type InputStyleType = CompStyle<T>;

  type SetCustomInputStyle = (style: ReturnType<T>, t: Theme) => InputStyleType;

  const getInputStyle = (
    trans: SetCustomInputStyle = (style: ReturnType<T>) => style as InputStyleType,
    name?: string,
  ) => styled((t) => trans(createStyle(t) as ReturnType<T>, t) as ReturnType<T>, name || 'input');

  return getInputStyle;
}
