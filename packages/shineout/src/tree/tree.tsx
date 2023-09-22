import React, { useMemo } from 'react';
import { Tree as UnStyledButton } from '@sheinx/base';
import { useTreeStyle, useSpinStyle, useCheckboxStyle } from '@sheinx/shineout-style';
import { TreeProps } from './tree.type';

const Tree = <DataItem,>(props: TreeProps<DataItem>) => {
  const treeStyle = useTreeStyle();
  const spinStyle = useSpinStyle();
  const checkboxStyle = useCheckboxStyle();
  const jssStyle = useMemo(
    () => ({ tree: treeStyle, spin: spinStyle, checkbox: checkboxStyle }),
    [treeStyle, spinStyle],
  );
  return <UnStyledButton {...props} jssStyle={jssStyle}></UnStyledButton>;
};

Tree.displayName = 'ShineoutTree';

export default Tree;
