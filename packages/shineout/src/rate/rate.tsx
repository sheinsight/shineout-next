import { Rate as UnStyleRate } from '@sheinx/base';
import { useRateStyle } from '@sheinx/shineout-style';
import { ArgProps, RateProps, BaseRateProps } from './rate.type';
import useFieldCommon from '../hooks/use-field-common';

const jssStyle = {
  rate: useRateStyle,
};

type InnerProps = Omit<BaseRateProps, keyof ArgProps>;

const BaseRate = (props: BaseRateProps) => {
  return <UnStyleRate jssStyle={jssStyle} {...props} />;
};

const Rate = (props: RateProps) => {
  return useFieldCommon(props, BaseRate);
};

export default (
  background: ArgProps['background'],
  front: ArgProps['front'],
  opts?: InnerProps,
) => {
  const RateIns = (props: RateProps) => {
    return <Rate {...opts} background={background} front={front || background} {...props} />;
  };
  return RateIns;
};
