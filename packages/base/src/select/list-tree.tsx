import classNames from 'classnames';
import { SelectClasses } from '@sheinx/shineout-style';
import { ListTreeProps } from './list-tree.type';
import Tree from '../tree';

const TreeList = <DataItem, Value>(props: ListTreeProps<DataItem, Value>) => {
  const {
    jssStyle,
    data,
    keygen,
    multiple,
    height,
    renderItem: renderItemProp,
    datum,
    childrenKey,
    defaultExpanded,
    defaultExpandAll,
    onExpand,
    closePop,
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
    if (!multiple) {
      closePop();
    }
  };

  return (
    <div className={rootClass} style={style}>
      <Tree
        line={false}
        jssStyle={jssStyle}
        onClick={handleClick}
        data={data}
        keygen={keygen}
        defaultExpanded={defaultExpanded}
        defaultExpandAll={defaultExpandAll}
        childrenKey={childrenKey}
        onExpand={onExpand}
        nodeClass={classNames(styles.treeOption)}
        contentClass={getContentClass}
        renderItem={renderItemProp}
      ></Tree>
    </div>
  );
};

export default TreeList;
