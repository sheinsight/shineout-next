import { useTreeContext } from './tree-context';
import VirtualTreeNode from './tree-virtual-node';
import { VirtualScrollList } from '../virtual-scroll';
import { KeygenResult, FlatNodeType } from '@sheinx/hooks';
import { VirtualTreeProps } from './tree.type';

const TreeVirtual = <DataItem, Value extends KeygenResult[]>(
  props: VirtualTreeProps<DataItem, Value>,
) => {
  const {
    jssStyle,
    height,
    lineHeight = 36,
    line,
    mode,
    contentClass,
    expandIcons,
    loader,
    inlineNode,
    highlight,
    parentClickExpand,
    doubleClickExpand,
    expanded,
    keygen,
    defaultExpandAll,
    active,
    isControlled,
    childrenClass,
    childrenKey,
    iconClass,
    leafClass,
    nodeClass,
    onNodeClick,
    onToggle,
    onChange,
  } = props;

  const datum = useTreeContext();

  const renderItem = (item: FlatNodeType<DataItem>, index: number) => {
    const { id, data, level } = item;

    return (
      <VirtualTreeNode<DataItem, Value>
        jssStyle={jssStyle}
        id={id}
        level={level}
        data={data}
        index={index}
        key={id}
        line={line}
        keygen={keygen}
        defaultExpandAll={defaultExpandAll}
        isControlled={isControlled}
        mode={mode}
        active={active}
        childrenClass={childrenClass}
        childrenKey={childrenKey}
        renderItem={props.renderItem}
        iconClass={iconClass}
        leafClass={leafClass}
        nodeClass={nodeClass}
        contentClass={contentClass}
        expandIcons={expandIcons}
        loader={loader}
        inlineNode={inlineNode}
        highlight={highlight}
        parentClickExpand={parentClickExpand}
        doubleClickExpand={doubleClickExpand}
        expanded={expanded}
        onNodeClick={onNodeClick}
        onToggle={onToggle}
        onChange={onChange}
      ></VirtualTreeNode>
    );
  };

  return (
    <VirtualScrollList
      data={datum.dataFlat}
      height={height}
      rowsInView={10}
      scrollerStyle={{
        height: '100%',
        width: '100%',
        overflow: 'auto',
        padding: '0 4px',
      }}
      keepScrollHeight
      dynamicVirtual
      lineHeight={lineHeight}
      renderItem={renderItem}
    ></VirtualScrollList>
  );
};

export default TreeVirtual;
