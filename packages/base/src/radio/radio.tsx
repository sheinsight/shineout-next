import React from 'react';
import SimpleRadio from './simple-radio';
import { usePersistFn, util } from '@sheinx/hooks';
import { RadioProps } from './radio.type';
import GroupContext from './group-context';

const Radio = <T,>(props: RadioProps<T>) => {
  const {
    children,
    htmlValue = true as T,
    onChange,
    checked,
    jssStyle,
    renderContent,
    ...rest
  } = props;
  const handleChange = usePersistFn(() => {
    onChange?.(htmlValue);
  });

  const getChecked = () => {
    if (typeof checked === 'function') {
      return checked(htmlValue);
    }
    return checked;
  };
  return (
    <SimpleRadio jssStyle={jssStyle} {...rest} checked={getChecked()} onChange={handleChange}>
      {util.isFunc(renderContent)
        ? renderContent({
            content: children,
            checked: getChecked(),
            disabled: rest.disabled,
          })
        : children}
    </SimpleRadio>
  );
};

const RadioWithContext = <T,>(props: RadioProps<T>) => {
  return (
    <GroupContext.Consumer>{(value) => <Radio {...props} {...value} />}</GroupContext.Consumer>
  );
};

export default RadioWithContext;
