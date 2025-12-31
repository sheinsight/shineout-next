import { useMemo } from 'react';
import clsx from 'clsx';
import { KeygenResult } from '@sheinx/hooks';
import { TreeRootProps } from './tree-root.type';
import { TreeClasses } from './tree.type';
import TreeList from './tree-list';

const Root = <DataItem, Value extends KeygenResult[]>(props: TreeRootProps<DataItem, Value>) => {
  const { jssStyle, rootStyle = {}, ...rest } = props;
  const treeStyle = jssStyle?.tree() || ({} as TreeClasses);

  const notTree = useMemo(() => {
    if(!props.data) return true;

    return props.data.every((item) => {
      if(!item) return true;
      if(!item[props.childrenKey]) return !props.loader;
      if(item[props.childrenKey] === null) return true;
      if(Array.isArray(item[props.childrenKey]) && (item[props.childrenKey] as []).length === 0) return true;
      return false;
    });
  }, [props.data]);
  const rootClass = clsx(treeStyle.root, notTree && treeStyle.notTree);
  return (
    <TreeList
      {...rest}
      expanded
      className={rootClass}
      jssStyle={jssStyle}
      style={rootStyle}
    ></TreeList>
  );
};

export default Root;
