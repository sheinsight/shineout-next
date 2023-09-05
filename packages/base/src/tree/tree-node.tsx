import classNames from 'classnames';
import { TreeClasses } from './tree.type';
import { TreeNodeProps } from './tree-node.type';
import TreeContent from './tree-content';

const Node = <DataItem,>(props: TreeNodeProps<DataItem>) => {
  const { jssStyle, data, active, expanded, id, renderItem, keygen } = props;
  const contentStyle = jssStyle?.tree || ({} as TreeClasses);
  const rootClass = classNames(contentStyle.node);

  const handleFetch = () => {};

  const handleToggle = () => {};

  const handleDragOver = () => {};

  return (
    <div className={rootClass}>
      <TreeContent
        jssStyle={jssStyle}
        id={id}
        data={data}
        active={active}
        keygen={keygen}
        expanded={expanded}
        renderItem={renderItem}
        onFetch={handleFetch}
        onToggle={handleToggle}
        onDragOver={handleDragOver}
      ></TreeContent>
    </div>
  );
};

export default Node;
