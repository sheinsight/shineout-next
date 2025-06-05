import classNames from 'classnames';
import { KeygenResult, util, useRender } from '@sheinx/hooks';
import { TreeClasses } from './tree.type';
import { TreeContextProps } from './tree-content.type';
import Checkbox from './tree-checkbox';
import { useTreeContext } from './tree-context';
import Icons from '../icons';
import Spin from '../spin';
import { useConfig } from '../config';
import { FilterContext} from '@sheinx/hooks';
import { useContext } from 'react';
import { CommonClasses } from '../common/type';

const NodeContent = <DataItem, Value extends KeygenResult[]>(
  props: TreeContextProps<DataItem, Value>,
) => {
  const {
    jssStyle,
    id,
    virtual,
    level = 0,
    active,
    data,
    line,
    iconClass,
    contentClass: contentClassProp,
    expandIcons,
    renderItem,
    expanded,
    fetching,
    inlineNode,
    childrenKey,
    parentClickExpand,
    doubleClickExpand,
    bindContent,
    highlight,
    setFetching,
    loader,
    onChange,
    onToggle,
    onDragOver,
    onNodeClick,
    actionOnClick,
  } = props;
  const forceUpdate = useRender();
  const { isDisabled, bindUpdate, size, leafIcon } = useTreeContext();
  const config = useConfig();
  const disabled = isDisabled(id);

  bindUpdate(id, forceUpdate);

  const contentStyle = jssStyle?.tree() || ({} as TreeClasses);
  const commonStyles = jssStyle?.common?.() || ({} as CommonClasses);
  const rootClass = classNames(contentStyle.contentWrapper, {
    [contentStyle.childnode]: data[childrenKey] && (data[childrenKey] as DataItem[]).length > 0,
    [contentStyle.inlineContent]: inlineNode,
    [contentStyle.contentDisabled]: disabled,
  });
  const contentClass = classNames(
    contentStyle.content,
    util.isString(contentClassProp) && contentClassProp,
    util.isFunc(contentClassProp) && contentClassProp(data),
  );

  const hasExpandIcons = expandIcons !== undefined;
  const children = data[childrenKey] as DataItem[];
  const hasChildren = children && children.length > 0;

  const contentDataProps = () => {
    const dataProps: {
      'data-active'?: boolean;
      'data-disabled'?: boolean;
    } = {};
    if (highlight) {
      dataProps['data-active'] = active;
    }
    // if (disabled) {
    //   dataProps['data-disabled'] = disabled;
    // }
    return dataProps;
  };

  const handleNodeExpand = () => {
    onToggle?.(id);

    if (data[childrenKey] !== undefined) return;

    if (loader) {
      setFetching(true);
      const result = loader(id, data) as any;
      if (util.isPromise(result)) {
        result.then(() => setFetching(false));
      }
    }
  };

  const { getValue, set, getChecked } = useTreeContext();
  // 选中节点前的复选框
  const handleNodeCheck = (_: any, checked: boolean) => {
    set(id, checked ? 1 : 0);
    if (onChange) {
      onChange(getValue() as Value, id);
    }
  }
  const checked = getChecked(id);

  const handleNodeClick = () => {
    if (parentClickExpand && hasChildren) {
      handleNodeExpand();
    } else {
      onNodeClick(data, id);
    }

    if(!actionOnClick) return;
    if(actionOnClick.indexOf('expand') > -1) {
      handleNodeExpand();
    }
    if (actionOnClick.indexOf('check') > -1) {
      handleNodeCheck(null, !checked);
    }
  };

  // 双击节点展开子节点
  const onNodeDoubleClick = () => {
    if (!doubleClickExpand) return;
    if (hasChildren) handleNodeExpand();
  };

  const renderLoading = () => {
    return (
      <span
        style={ virtual ? { left: (level - 1) * 24 } : undefined}
        className={contentStyle.iconWrapper}
        data-expanded={expanded}
        data-icon={hasExpandIcons}
        dir={config.direction}
      >
        <Spin size={12} jssStyle={jssStyle} ignoreConfig name='ring'></Spin>
      </span>
    );
  };

  const renderIndicator = () => {
    const children = data[childrenKey] as DataItem[];

    const icon = expandIcons
      ? expandIcons[expanded ? 1 : 0]
      : expanded
      ? Icons.tree.LineExpand
      : Icons.tree.LineCollapse;

    let indicator: React.ReactNode;

    if (line) {
      indicator = (
        <span
          className={contentStyle.iconWrapper}
          data-expanded={expanded}
          data-icon={hasExpandIcons}
          dir={config.direction}
        >
          <span
            className={classNames(contentStyle.icon, iconClass)}
            onClick={handleNodeExpand}
            dir={config.direction}
          >
            {util.isFunc(icon) ? icon(data) : icon}
          </span>
        </span>
      );
    } else {
      indicator = (
        <span
          style={ virtual ? { left: (level - 1) * 24 } : undefined}
          className={contentStyle.iconWrapper}
          data-expanded={expanded}
          data-icon={hasExpandIcons}
          dir={config.direction}
        >
          <span
            className={classNames(contentStyle.icon, iconClass)}
            onClick={handleNodeExpand}
            dir={config.direction}
          >
            {util.isFunc(icon) ? icon(data) : hasExpandIcons ? icon : Icons.tree.Expand}
          </span>
        </span>
      );
    }

    if (children && children.length > 0) return indicator;
    if (Array.isArray(children) || children === null) return null;
    if (fetching && !children) return renderLoading();
    if (loader && children === undefined) return indicator;

    if (leafIcon) {
      let $iconContent = null;
      if (leafIcon === true) {
        $iconContent = Icons.tree.Leaf;
      } else if (util.isFunc(leafIcon)) {
        $iconContent = leafIcon(data);
      } else {
        $iconContent = leafIcon
      }

      return (
        <span
          className={contentStyle.iconWrapper}
          dir={config.direction}
        >
          <span
            className={classNames(contentStyle.icon, iconClass)}
            dir={config.direction}
          >
            {$iconContent}
          </span>
        </span>
      )
    }

    return null;
  };

  const renderCheckbox = () => {
    return (
      <Checkbox
        size={size}
        jssStyle={jssStyle}
        id={id}
        disabled={disabled}
        className={contentStyle.checkbox}
        checked={checked}
        onChange={handleNodeCheck}
      ></Checkbox>
    );
  };

  const { filterText, highlight: highlightFilter } = useContext(FilterContext);

  const renderNode = () => {
    const render = util.isFunc(renderItem) ? renderItem : (item: DataItem) => item[renderItem];

    return util.getHighlightText({
      enable: highlightFilter,
      nodeList: render(data, expanded, active, id),
      searchWords: filterText,
      highlightClassName: commonStyles?.highlight,
    }) as React.ReactNode;
  };

  return (
    <div className={rootClass} onDragOver={onDragOver} dir={config.direction}>
      {renderIndicator()}
      <div
        dir={config.direction}
        data-expanded={expanded}
        ref={bindContent}
        className={contentClass}
        {...contentDataProps()}
      >
        {onChange && renderCheckbox()}
        <div
          dir={config.direction}
          className={contentStyle.text}
          onDoubleClick={onNodeDoubleClick}
          onClick={handleNodeClick}
        >
          {renderNode()}
        </div>
      </div>
    </div>
  );
};

export default NodeContent;
