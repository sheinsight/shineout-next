import { useMemo } from 'react';
import { Descriptions as UnStyledDescriptions } from '@sheinx/base';
import { useDescriptionsStyle } from '@sheinx/shineout-style';
import { DescriptionsProps } from './descriptions.type';

const Descriptions = (props: DescriptionsProps) => {
  const descriptionsStyle = useDescriptionsStyle();
  const jssStyle = useMemo(() => ({ descriptions: descriptionsStyle }), [descriptionsStyle]);

  return <UnStyledDescriptions jssStyle={jssStyle} {...props} />;
};

export default Descriptions;
