import { useContext, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { KeygenResult, useTree, util, ObjectKey } from '@sheinx/hooks';
import { TreeClasses } from './tree.type';
import { TreeProps } from './tree.type';
import RootTree from './tree-root';
import VirtualTree from './tree-virtual';
import { Provider } from './tree-context';
import { FormFieldContext } from '../form/form-field-context';

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
    virtual,
    expanded: expandedProp,
    expandIcons,
    iconClass,
    leafClass,
    nodeClass,
    contentClass,
    rootStyle,
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
    ignoreSetFlat = false,
    dragHoverExpand,
    active: propActive,
    setActive: propSetActive,
    disabled,
    inlineNode,
    highlight: propHighlight,
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
    rowsInView = 20,
    actionOnClick,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    tiledData,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    height,
    leafIcon,
    ...rest
  } = props;

  const [active, setActive] = useState(propActive);
  const isActiveControlled = 'active' in props;
  const highlight = propHighlight ?? isActiveControlled;

  useEffect(() => {
    if (isActiveControlled && propActive !== active) {
      setActive(propActive);
    }
  }, [active, propActive]);

  const treeRef = useRef<HTMLDivElement>(null);
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
    defaultExpandAll: expandedProp ? undefined : defaultExpandAll,
    defaultExpanded: expandedProp ? undefined : defaultExpanded,
    childrenKey: childrenKey,
    keygen,
    virtual,
    onExpand: onExpandProp,
    datum: propsDatum,
    tiledData: props.filteredData,
  });

  const treeStyle = jssStyle?.tree() || ({} as TreeClasses);
  const rootClass = classNames(treeStyle.rootClass, treeStyle.tree, className, {
    [treeStyle.line]: line,
    [treeStyle.noline]: !line,
    [treeStyle.virtual]: virtual,
    [treeStyle.sizeSmall]: props.size === 'small',
    [treeStyle.sizeLarge]: props.size === 'large',
  });

  const getDragImageSelector = (data?: DataItem) => {
    if (util.isFunc(dragImageSelector)) return dragImageSelector(data);
    return dragImageSelector;
  };

  const getHeight = () => {
    const { height: styleHeight } = props.style || {};
    if (!styleHeight && !props.height) {
      const containerHeight = treeRef.current?.parentElement?.clientHeight;
      return containerHeight;
    }

    return props.height || styleHeight;
  };

  const handleUpdateActive = (active?: KeygenResult, item?: DataItem, fromUser: boolean = false) => {
    if (isActiveControlled && fromUser) {
      // 受控模式下,用户点击时只调用外部回调,不更新内部状态
      if (active !== props.active) {
        propSetActive?.(active, item);
      }
      return;
    }

    // 其他情况(非受控模式,或受控模式下由 props.active 变化触发),更新内部状态和节点
    setActive(active);

    datum.updateMap.forEach((update, id) => {
      update('active', id === active);
    });
  };

  const handleNodeClick = (node: DataItem, id: KeygenResult) => {
    handleUpdateActive(id, node, true);

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
      if (virtual && !ignoreSetFlat) datum.removeFlat(id);
    } else {
      newExpanded = [...expandedArr, id];
      if (virtual && !ignoreSetFlat) datum.insertFlat(id);
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
      let removeNode: () => void = () => { };
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
          removeNode = () => { };
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

  const renderList = () => {
    if (virtual) {
      const realHeight = getHeight();
      if (!realHeight) return null;
      return (
        <VirtualTree
          {...props}
          data={data}
          line={line}
          rowsInView={rowsInView}
          expanded={expanded}
          height={realHeight}
          childrenKey={props.childrenKey || ('children' as ObjectKey<DataItem>)}
          isControlled={'expanded' in props}
          bindNode={datum.bindNode}
          onNodeClick={handleNodeClick}
          onToggle={handleToggle}
          actionOnClick={actionOnClick}
        />
      );
    }

    return (
      <RootTree
        rootStyle={rootStyle}
        isControlled={'expanded' in props}
        jssStyle={jssStyle}
        data={props.filteredData || data}
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
        defaultExpandAll={defaultExpandAll}
        childrenClass={childrenClass}
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
        actionOnClick={actionOnClick}
      ></RootTree>
    );
  };

  useEffect(() => {
    // 首次渲染不更新
    if (!context.mounted) {
      return;
    }
    if (!props.expanded) return;
    datum.updateExpanded(expanded);
  }, [expanded]);

  useEffect(() => {
    // if (!active) return;
    handleUpdateActive(active);
  }, [active]);

  useEffect(() => {
    if (getDatum) getDatum(datum);
    context.mounted = true;
  }, []);

  const { fieldId } = useContext(FormFieldContext);

  return (
    <div ref={treeRef} className={rootClass} id={fieldId} {...rest}>
      <Provider value={{ ...datum, size: props.size, leafIcon }}>{renderList()}</Provider>
    </div>
  );
};

export default Tree;
