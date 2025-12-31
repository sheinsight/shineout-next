import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { SelectClasses } from './select.type';
import { StructKeygenStringType, KeygenResult } from '@sheinx/hooks';
import { ListTreeProps } from './list-tree.type';
import Tree from '../tree';

const TreeList = <DataItem, Value>(props: ListTreeProps<DataItem, Value>) => {
  const {
    jssStyle,
    data,
    keygen,
    height,
    renderItem: renderItemProp,
    datum,
    expanded,
    childrenKey,
    defaultExpanded,
    defaultExpandAll,
    onExpand,
  } = props;
  const styles = jssStyle?.select?.() as SelectClasses;
  const rootClass = clsx(styles.tree);

  const style = {
    maxHeight: height,
  };

  const getContentClass = (data: DataItem) => {
    const isDisabled = datum.disabledCheck(data);

    if (isDisabled) {
      return clsx(styles.optionDisabled);
    }
    const isCheck = datum.check(data);
    if (isCheck) {
      return clsx(styles.optionActive);
    }
    return '';
  };

  const handleClick = (data: DataItem) => {
    if (datum.disabledCheck(data)) return;
    const isCheck = datum.check(data);
    if (isCheck) {
      datum.remove(data);
      return;
    }
    datum.add(data);
  };

  // tree 的 renderItem 与 list 的 renderItem 不同，需要转换，且 tree 无 index 返回
  const renderItem = (item: DataItem) => {
    return renderItemProp(item);
  };

  const [virtualExpanded, setVirtualExpanded] = useState<KeygenResult[]>([]);

  useEffect(() => {
    if (props.virtual && expanded) {
      setVirtualExpanded(expanded);
    }
  }, [expanded]);

  const handleExpand = (expandedKeys: KeygenResult[]) => {
    if (props.virtual) {
      setVirtualExpanded(expandedKeys);
    }

    onExpand?.(expandedKeys);
  }

  const $tree = (
    <Tree
      line={false}
      jssStyle={jssStyle as any}
      onClick={handleClick}
      data={data}
      expanded={props.virtual ? (virtualExpanded?.length > 0 ? virtualExpanded : undefined) : expanded}
      keygen={keygen as StructKeygenStringType<DataItem>}
      defaultExpanded={defaultExpanded}
      defaultExpandAll={defaultExpandAll}
      childrenKey={childrenKey}
      onExpand={handleExpand}
      nodeClass={clsx(styles.treeOption)}
      contentClass={getContentClass}
      renderItem={renderItem}
      expandIcons={props.expandIcons}
      virtual={props.virtual}
      height={props.height}
    />
  );

  if (props.virtual) {
    return $tree;
  }

  return (
    <div className={rootClass} style={style}>
      {$tree}
    </div>
  );
};

export default TreeList;
