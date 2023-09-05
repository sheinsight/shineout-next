import classNames from 'classnames';
import TreeNode from './tree-node';
import { TreeListProps } from './tree-list.type';

const List = <DataItem,>(props: TreeListProps<DataItem>) => {
  const { className, data, id = '', keygen, expanded, active, renderItem, jssStyle } = props;

  const rootClass = classNames(className);

  const getKey = (data: DataItem, index: number) => {
    if (typeof keygen === 'function') return keygen(data, id as string);
    if (keygen) return data[keygen];

    return id + (id ? ',' : '') + index;
  };

  const renderNode = (node: DataItem, index: number) => {
    const id = getKey(node, index) as string;

    return (
      <TreeNode
        key={id}
        jssStyle={jssStyle}
        id={id}
        data={node}
        index={index}
        active={active}
        renderItem={renderItem}
        expanded={expanded}
        keygen={keygen}
      ></TreeNode>
    );
  };

  return <div className={rootClass}>{data.map(renderNode)}</div>;
};

export default List;
