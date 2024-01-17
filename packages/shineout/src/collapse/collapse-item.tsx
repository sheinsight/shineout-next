import { useMemo } from 'react';
import { CollapseItem as UnStyledCollapseItem } from '@sheinx/base';
import { useCollapseItemStyle } from '@sheinx/shineout-style';
import { CollapseItemProps } from './collapse-item.type';

const CollapseItem = (props: CollapseItemProps) => {
  const collapseItemStyle = useCollapseItemStyle();
  const jssStyle = useMemo(() => ({ collapseItem: collapseItemStyle }), [collapseItemStyle]);

  return <UnStyledCollapseItem jssStyle={jssStyle} {...props} />;
};

export default CollapseItem;
