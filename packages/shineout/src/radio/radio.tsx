import React from 'react';
import { Radio as UiRadio } from '@sheinx/ui';
import { useRadioStyle } from '@sheinx/shineout-style';
import { usePersistFn } from '@sheinx/hooks';
import { RadioProps } from './radio.type';
import GroupContext from './group-context';

const Radio = <T,>(props: RadioProps<T>) => {
  const jssStyle = useRadioStyle();
  const { children, htmlValue = true as T, onChange, checked, ...rest } = props;
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
    <UiRadio jssStyle={jssStyle} {...rest} checked={getChecked()} onChange={handleChange}>
      {children}
    </UiRadio>
  );
};

const RadioWithContext = <T,>(props: RadioProps<T>) => {
  return (
    <GroupContext.Consumer>{(value) => <Radio {...props} {...value} />}</GroupContext.Consumer>
  );
};

export default RadioWithContext;
