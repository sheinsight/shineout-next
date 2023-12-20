import classNames from 'classnames';
import { SelectClasses } from '@sheinx/shineout-style';
import { ListTreeProps } from './list-tree.type';
import Tree from '../tree';

const TreeList = <DataItem, Value>(props: ListTreeProps<DataItem, Value>) => {
  const { jssStyle, data, keygen, renderItem } = props;
  const styles = jssStyle?.select?.() as SelectClasses;
  const rootClass = classNames(styles.tree);

  return (
    <div className={rootClass}>
      <Tree
        line={false}
        jssStyle={jssStyle}
        data={data}
        keygen={keygen}
        renderItem={renderItem}
      ></Tree>
    </div>
  );
};

export default TreeList;
