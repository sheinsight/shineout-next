import { Descriptions as UnStyledDescriptions } from '@sheinx/base';
import { useDescriptionsStyle } from '@sheinx/shineout-style';
import { DescriptionsProps } from './descriptions.type';

const jssStyle = {
  descriptions: useDescriptionsStyle,
};

const Descriptions = (props: DescriptionsProps) => {
  return <UnStyledDescriptions jssStyle={jssStyle} {...props} />;
};

export default Descriptions;
