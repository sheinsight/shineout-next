import classNames from 'classnames';
import { SelectClasses } from './select.type';
import { StructKeygenStringType } from '@sheinx/hooks';
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
  const rootClass = classNames(styles.tree);

  const style = {
    maxHeight: height,
  };

  const getContentClass = (data: DataItem) => {
    const isDisabled = datum.disabledCheck(data);

    if (isDisabled) {
      return classNames(styles.optionDisabled);
    }
    const isCheck = datum.check(data);
    if (isCheck) {
      return classNames(styles.optionActive);
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

  return (
    <div className={rootClass} style={style}>
      <Tree
        line={false}
        jssStyle={jssStyle as any}
        onClick={handleClick}
        data={data}
        expanded={expanded}
        keygen={keygen as StructKeygenStringType<DataItem>}
        defaultExpanded={defaultExpanded}
        defaultExpandAll={defaultExpandAll}
        childrenKey={childrenKey}
        onExpand={onExpand}
        nodeClass={classNames(styles.treeOption)}
        contentClass={getContentClass}
        renderItem={renderItem}
        expandIcons={props.expandIcons}
      ></Tree>
    </div>
  );
};

export default TreeList;
