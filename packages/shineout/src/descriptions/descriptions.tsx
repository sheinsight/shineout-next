import { useMemo } from 'react';
import { Descriptions } from '@sheinx/base';
import { useDescriptionsStyle } from '@sheinx/shineout-style';
import { DescriptionsProps } from './descriptions.type';

export default (props: DescriptionsProps) => {
  const {} = props;
  const descriptionsStyle = useDescriptionsStyle();
  const jssStyle = useMemo(() => ({ descriptions: descriptionsStyle }), [descriptionsStyle]);

  return (
    <Descriptions
      jssStyle={jssStyle}
      // ...
    />
  );
};
