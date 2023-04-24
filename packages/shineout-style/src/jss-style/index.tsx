import type { FC } from 'react';
import { createContext, useCallback, useContext } from 'react';
import type { Styles } from 'react-jss';
import type {} from 'jss';
import { createUseStyles, JssProvider } from 'react-jss';
import deepmerge from 'ts-deepmerge';
import defaultTheme from '../themes/default';
import type { OptTheme, Theme } from '../themes/type';

const context = createContext<Theme>(defaultTheme);
const CLS_PREFIX = 'so-';

function camelToDash(str: string): string {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase();
}

export const StyleProvider: FC<{ theme?: OptTheme; children?: any }> = function ({
  theme = {},
  children,
}) {
  const mergedTheme = deepmerge(defaultTheme, theme) as Theme;
  const createClassname = useCallback((rule: any, sheet: any) => {
    const ns = sheet.options.classNamePrefix;
    if (!ns) {
      console.warn('[shined/ui]: styled should give namespace');
    }
    return `${CLS_PREFIX}${ns}${camelToDash(rule.key)}`;
  }, []);

  return (
    <context.Provider value={mergedTheme}>
      <JssProvider generateId={createClassname}>{children}</JssProvider>
    </context.Provider>
  );
};

export const styled = <C extends string>(
  style:
    | Styles<C, { theme: Theme }, Theme>
    | ((theme: Theme) => Styles<C, { theme: Theme }, undefined>),
  ns: string,
) => {
  const hoc = createUseStyles(style, { name: ns });
  return () => {
    const theme = useContext<Theme>(context);
    return hoc({ theme });
  };
};
