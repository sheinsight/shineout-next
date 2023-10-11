import { Empty } from '@sheinx/base';
import { useEmptyStyle } from '@sheinx/shineout-style';
import { EmptyProps } from './empty.type';

export default (props: EmptyProps) => {
  const jssStyle = {
    empty: useEmptyStyle,
  };
  return <Empty jssStyle={jssStyle} {...props} />;
};
