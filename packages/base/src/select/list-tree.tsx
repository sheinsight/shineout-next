import classNames from 'classnames';
import { KeygenResult } from '@sheinx/hooks';
import { SelectClasses } from '@sheinx/shineout-style';
import { ListTreeProps } from './list-tree.type';
import Tree from '../tree';

const TreeList = <DataItem, Value>(props: ListTreeProps<DataItem, Value>) => {
  const {
    jssStyle,
    data,
    keygen,
    height,
    renderItem,
    datum,
    // childrenKey,
    // defaultExpandAll,
    // onExpand,
  } = props;
  const styles = jssStyle?.select?.() as SelectClasses;
  const rootClass = classNames(styles.tree);

  const style = {
    maxHeight: height,
  };

  const handleClick = (data: DataItem, id: KeygenResult) => {
    console.log(id);
    const isCheck = datum.check(data);
    if (isCheck) {
      datum.remove(data);
      return;
    }
    datum.add(data);
  };

  return (
    <div className={rootClass} style={style}>
      <Tree
        line={false}
        jssStyle={jssStyle}
        onClick={handleClick}
        data={data}
        keygen={keygen}
        renderItem={renderItem}
      ></Tree>
    </div>
  );
};

export default TreeList;
