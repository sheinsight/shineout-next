import classNames from 'classnames';
import { TreeListProps } from './tree-list.type';

const List = (props: TreeListProps) => {
  const { className } = props;
  const rootClass = classNames(className);

  return <div className={rootClass}>list</div>;
};

export default List;
