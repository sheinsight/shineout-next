import { useEffect, useRef } from 'react';
import classNames from 'classnames';
import { KeygenResult, useTree, util, ObjectKey } from '@sheinx/hooks';
import { TreeClasses } from './tree.type';
import { TreeProps } from './tree.type';
import RootTree from './tree-root';
import { Provider } from './tree-context';

const { produce } = util;

const Tree = <DataItem, Value extends KeygenResult[]>(props: TreeProps<DataItem, Value>) => {
  const {
    jssStyle,
    line = true,
    childrenKey = 'children' as ObjectKey<DataItem>,
    data,
    value,
    mode = 1,
    keygen,
    expanded: expandedProp,
    expandIcons,
    iconClass,
    leafClass,
    nodeClass,
    contentClass,
    renderItem,
    defaultValue,
    dataUpdate = true,
    childrenClass,
    defaultExpandAll,
    defaultExpanded,
    parentClickExpand,
    doubleClickExpand,
    dragImageSelector,
    dragImageStyle,
    dragSibling,
    unmatch,
    dragHoverExpand,
    active,
    disabled,
    inlineNode,
    highlight,
    className,
    onClick,
    loader,
    getDatum,
    onDrop,
    onExpand: onExpandProp,
    onChange,
    onDragEnd,
    onDragLeave,
    onDragOver,
    onDragStart,
    datum: propsDatum,
    ...rest
  } = props;

  const { current: context } = useRef({ mounted: false });

  const { datum, expanded, onExpand } = useTree({
    mode,
    value,
    data,
    dataUpdate,
    active,
    unmatch,
    isControlled: 'expanded' in props,
    expanded: expandedProp,
    disabled,
    defaultValue,
    defaultExpandAll,
    defaultExpanded,
    childrenKey: childrenKey,
    keygen,
    onExpand: onExpandProp,
    datum: propsDatum,
  });

  const treeStyle = jssStyle?.tree() || ({} as TreeClasses);
  const rootClass = classNames(treeStyle.tree, className, {
    [treeStyle.line]: line,
    [treeStyle.noline]: !line,
  });

  const getDragImageSelector = (data?: DataItem) => {
    if (util.isFunc(dragImageSelector)) return dragImageSelector(data);
    return dragImageSelector;
  };

  const handleUpdateExpanded = (expanded?: KeygenResult[]) => {
    const tempExpandMap = new Set(expanded);
    datum.updateMap.forEach((update, id) => {
      update('expanded', tempExpandMap.has(id));
    });
  };

  const handleUpdateActive = (active?: KeygenResult) => {
    datum.updateMap.forEach((update, id) => {
      update('active', id === active);
    });
  };

  const handleNodeClick = (node: DataItem, id: KeygenResult) => {
    if (active === undefined) {
      handleUpdateActive(id);
    }

    if (onClick) {
      onClick(node, id, datum.getPath(id));
    }
  };

  const handleToggle = (id: KeygenResult) => {
    let newExpanded;
    if (!expanded && onExpand) {
      onExpand([id]);
      return;
    }

    const expandedArr = expanded!;

    if (expandedArr.indexOf(id) >= 0) {
      newExpanded = expandedArr.filter((e) => e !== id);
    } else {
      newExpanded = [...expandedArr, id];
    }
    if (onExpand) onExpand(newExpanded);
  };

  const handleDrop = (id: KeygenResult, targetId: KeygenResult, position: number) => {
    let targetIdCopy = targetId;
    let positionCopy = position;

    const current = datum.getPath(id);
    const target = datum.getPath(targetIdCopy);
    if (!current || !target) return;
    const newData = produce(data, (draft) => {
      let node: any = draft;
      let temp: DataItem[];
      let removeNode: () => void = () => {};
      let offset = 0;
      current.indexPath.forEach((p, i) => {
        if (i < current.indexPath.length - 1) {
          node = node[p][childrenKey] as DataItem[];
        } else {
          temp = node;
          removeNode = () => temp.splice(p, 1)[0];
          node = node[p];
        }
      });

      let tnode: any = draft;
      target.indexPath.forEach((p, i) => {
        if (i < target.indexPath.length - 1) {
          tnode = tnode[p][childrenKey];
        } else if (tnode === temp) {
          // same parent
          removeNode();
          if (current.index <= target.index) {
            offset = -1;
          }
          removeNode = () => {};
        }
      });

      if (positionCopy === -1) {
        tnode = tnode[target.index + offset];
        if (!Array.isArray(tnode[childrenKey])) tnode[childrenKey] = [];
        tnode[childrenKey].push(node);
        positionCopy = tnode[childrenKey].length - 1;
        const update = datum.updateMap.get(targetIdCopy);
        if (update) update('expanded', true);
      } else {
        tnode.splice(positionCopy + offset, 0, node);
        targetIdCopy = target.path[target.path.length - 1];
      }

      removeNode();
    });

    if (onDrop) {
      onDrop(newData, id, targetId, position);
    }
  };

  useEffect(() => {
    // 首次渲染不更新
    if (!context.mounted) {return;}
    if (!props.expanded) return;
    handleUpdateExpanded(expanded);
  }, [expanded]);

  useEffect(() => {
    // if (!active) return;
    handleUpdateActive(active);
  }, [active]);

  useEffect(() => {
    if (getDatum) getDatum(datum);
    context.mounted = true;
  }, []);

  return (
    <div className={rootClass} {...rest}>
      <Provider value={datum as any}>
        <RootTree
          isControlled={'expanded' in props}
          jssStyle={jssStyle}
          data={data}
          mode={mode}
          line={line}
          keygen={keygen}
          onChange={onChange}
          iconClass={iconClass}
          leafClass={leafClass}
          nodeClass={nodeClass}
          contentClass={contentClass}
          expanded={expanded}
          expandIcons={expandIcons}
          childrenClass={util.isFunc(childrenClass) ? childrenClass : () => childrenClass}
          bindNode={datum.bindNode}
          childrenKey={childrenKey}
          onNodeClick={handleNodeClick}
          renderItem={renderItem}
          loader={loader}
          inlineNode={inlineNode}
          highlight={highlight}
          onToggle={handleToggle}
          onDrop={onDrop && handleDrop}
          onDragOver={onDragOver}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onDragLeave={onDragLeave}
          dragSibling={dragSibling}
          dragHoverExpand={dragHoverExpand}
          parentClickExpand={parentClickExpand}
          doubleClickExpand={doubleClickExpand}
          dragImageSelector={getDragImageSelector}
          dragImageStyle={dragImageStyle}
        ></RootTree>
      </Provider>
    </div>
  );
};

export default Tree;
