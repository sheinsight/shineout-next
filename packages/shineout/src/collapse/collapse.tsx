import { useMemo } from 'react';
import { Collapse as UnStyledCollapse } from '@sheinx/base';
import { useCollapseStyle } from '@sheinx/shineout-style';
import { CollapseProps } from './collapse.type';

const Collapse = (props: CollapseProps) => {
  const collapseStyle = useCollapseStyle();
  const jssStyle = useMemo(() => ({ collapse: collapseStyle }), [collapseStyle]);

  return <UnStyledCollapse jssStyle={jssStyle} {...props} />;
};

export default Collapse;
