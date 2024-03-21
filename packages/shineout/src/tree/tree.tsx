import React, { useMemo } from 'react';
import { Tree as UnStyledTree } from '@sheinx/base';
import { useTreeStyle, useSpinStyle, useCheckboxStyle } from '@sheinx/shineout-style';
import { TreeProps } from './tree.type';

const Tree = <DataItem, Value extends any[]>(props: TreeProps<DataItem, Value>) => {
  const treeStyle = useTreeStyle;
  const spinStyle = useSpinStyle;
  const checkboxStyle = useCheckboxStyle;
  const jssStyle = useMemo(
    () => ({ tree: treeStyle, spin: spinStyle, checkbox: checkboxStyle }),
    [treeStyle, spinStyle],
  );
  return <UnStyledTree {...props} jssStyle={jssStyle}></UnStyledTree>;
};

Tree.displayName = 'ShineoutTree';

export default Tree;
