import type { FC } from 'react';
import { createContext, useCallback, useContext } from 'react';
import type { Styles } from 'react-jss';
import { createGenerateId, createUseStyles, JssProvider, SheetsRegistry } from 'react-jss';
import deepmerge from 'ts-deepmerge';

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
    return `${CLS_PREFIX}${ns}${rule.key}`;
  }, []);

  return (
    <context.Provider value={mergedTheme}>
      <JssProvider generateId={createClassname}>{children}</JssProvider>
    </context.Provider>
  );
};

export const styled = (
  style:
    | Styles<string, { theme: Theme }, Theme>
    | ((theme: Theme) => Styles<string, { theme: Theme }, undefined>),
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
