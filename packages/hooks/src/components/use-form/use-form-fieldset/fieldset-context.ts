'use client';
import React, { createContext } from 'react';

export const FieldsetContext = createContext({ path: '', validateFieldSet: () => {} });
FieldsetContext.displayName = 'FieldsetContext';

interface BaseFieldProps {
  bind?: string[];
  name: string | string[];
}

function extendName(path: string | undefined, name: string): string;
function extendName(path: string | undefined, name: undefined): undefined;
function extendName(path: string | undefined, name: string[]): string[];

function extendName(
  path: string = '',
  name: string | undefined | string[],
): string | string[] | undefined {
  if (name === undefined) return undefined;
  if (name === '') return path;
  if (Array.isArray(name)) {
    return name.map((n) => extendName(path, n));
  }
  return `${path}${path.length > 0 ? '.' : ''}${name}`;
}
export const useFieldSetConsumer = <T extends BaseFieldProps>(props: T) => {
  const { path, validateFieldSet } = React.useContext(FieldsetContext);
  const bind = React.useMemo(() => {
    return path ? (props.bind || []).concat(path) : props.bind;
  }, [path, props.bind]);
  const name = React.useMemo(() => {
    return extendName(path, props.name as any);
  }, [path, props.name]);

  return {
    ...props,
    name,
    bind,
    validateFieldSet,
  };
};

export default FieldsetContext;
