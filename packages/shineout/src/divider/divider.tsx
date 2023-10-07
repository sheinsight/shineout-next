import { useMemo } from 'react';
import { Divider } from '@sheinx/base';
import { useDividerStyle } from '@sheinx/shineout-style';
import { DividerProps } from './divider.type';

export default (props: DividerProps) => {
  const dividerStyle = useDividerStyle();
  const jssStyle = useMemo(() => ({ divider: dividerStyle }), [dividerStyle]);

  return <Divider jssStyle={jssStyle} {...props} />;
};
