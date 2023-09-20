import { useMemo } from 'react';
import { Collapse } from '@sheinx/base';
import { useCollapseStyle } from '@sheinx/shineout-style';
import { CollapseProps } from './collapse.type';

export default (props: CollapseProps) => {
  const {} = props;
  const collapseStyle = useCollapseStyle();
  const jssStyle = useMemo(() => ({ collapse: collapseStyle }), [collapseStyle]);

  return (
    <Collapse
      jssStyle={jssStyle}
      // ...
    />
  );
};
