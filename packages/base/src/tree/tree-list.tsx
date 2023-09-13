import classNames from 'classnames';
import { util } from '@sheinx/hooks';
import TreeNode from './tree-node';
import { TreeClasses } from './tree.type';
import { TreeListProps } from './tree-list.type';

const List = <DataItem,>(props: TreeListProps<DataItem>) => {
  const {
    jssStyle,
    className,
    data,
    id = '',
    keygen,
    expanded,
    active,
    line,
    onChange,
    renderItem,
    childrenKey,
    onNodeClick,
    registerUpdate,
    childrenClass,
    childrenClassName,
    parentClickExpand,
  } = props;

  if (!expanded) return null;
  const listClass = jssStyle?.tree || ({} as TreeClasses);
  const rootClass = classNames(className || listClass.children, childrenClassName);

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
        childrenClass={childrenClass}
        childrenKey={childrenKey}
        renderItem={renderItem}
        registerUpdate={registerUpdate}
        expanded={expanded}
        parentClickExpand={parentClickExpand}
        keygen={keygen}
        onNodeClick={onNodeClick}
        line={line}
        onChange={onChange}
        listComponent={List}
      ></TreeNode>
    );
  };

  if (!data || !util.isArray(data)) {
    return null;
  }

  return <div className={rootClass}>{data.map(renderNode)}</div>;
};

export default List;
