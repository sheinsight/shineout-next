import React from 'react';
import SimpleRadio from './simple-radio';
import { usePersistFn } from '@sheinx/hooks';
import { RadioProps } from './radio.type';
import GroupContext from './group-context';

const Radio = <T,>(props: RadioProps<T>) => {
  const { children, htmlValue = true as T, onChange, checked, jssStyle, ...rest } = props;
  const handleChange = usePersistFn(() => {
    onChange?.(htmlValue);
  });

  const getChecked = () => {
    if (typeof checked === 'function') {
      return checked(htmlValue);
    }
    return checked;
  };

  // 对齐v1,v2版本的表现
  const getDisabled = () => {
    if(typeof props.disabled === 'function') {
      return !!props.disabled(htmlValue);
    }

    return props.disabled;
  };

  return (
    <SimpleRadio jssStyle={jssStyle} {...rest} checked={getChecked()} onChange={handleChange} disabled={getDisabled()}>
      {children}
    </SimpleRadio>
  );
};

const RadioWithContext = <T,>(props: RadioProps<T>) => {
  return (
    <GroupContext.Consumer>{(value) => <Radio {...props} {...value} />}</GroupContext.Consumer>
  );
};

export default RadioWithContext;
