import React, { createContext } from 'react';

const FieldsetContext = createContext({ path: '' });

interface BaseFieldProps {
  bind?: string[];
  name: string | string[];
}
export const useFieldSetConsumer = <T extends BaseFieldProps>(props: T) => {
  const { path } = React.useContext(FieldsetContext);
  const bind = React.useMemo(() => {
    return path ? (props.bind || []).concat(path) : props.bind;
  }, [path, props.bind]);
  const name = React.useMemo(() => {
    if (Array.isArray(props.name)) {
      return props.name.map((item) => {
        return path ? `${path}.${item}` : item;
      });
    }
    return path ? `${path}.${props.name}` : props.name;
  }, [path, props.name]);

  return {
    ...props,
    name,
    bind,
  };
};

export default FieldsetContext;
