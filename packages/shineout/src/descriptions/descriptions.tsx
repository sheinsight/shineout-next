import { useMemo } from 'react';
import { Descriptions as UnStyledCheckbox } from '@sheinx/base';
import { useDescriptionsStyle } from '@sheinx/shineout-style';
import { DescriptionsProps } from './descriptions.type';

const Descriptions = (props: DescriptionsProps) => {
  const descriptionsStyle = useDescriptionsStyle();
  const jssStyle = useMemo(() => ({ descriptions: descriptionsStyle }), [descriptionsStyle]);

  return <UnStyledCheckbox jssStyle={jssStyle} {...props} />;
};

export default Descriptions;
