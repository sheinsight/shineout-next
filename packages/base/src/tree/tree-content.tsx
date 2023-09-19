import classNames from 'classnames';
import { util } from '@sheinx/hooks';
import { TreeClasses } from './tree.type';
import { TreeContextProps } from './tree-content.type';
import Checkbox from './tree-checkbox';
import Icons from '../icons';
// import Spin from '../spin';

const NodeContent = <DataItem,>(props: TreeContextProps<DataItem>) => {
  const {
    jssStyle,
    id,
    active,
    data,
    line,
    iconClass,
    expandIcons,
    renderItem,
    expanded,
    childrenKey,
    parentClickExpand,
    doubleClickExpand,
    onChange,
    onToggle,
    onDragOver,
    onNodeClick,
  } = props;

  const contentStyle = jssStyle?.tree || ({} as TreeClasses);
  const rootClass = classNames(contentStyle.contentWrapper, {
    [contentStyle.childnode]: data[childrenKey] && (data[childrenKey] as DataItem[]).length > 0,
  });
  const contentClass = classNames(contentStyle.content);
  const textClass = classNames(contentStyle.text);
  const hasExpandIcons = expandIcons !== undefined;

  const handleIndicatorClick = () => {
    onToggle();
  };

  const handleNodeClick = () => {
    const children = data[childrenKey] as DataItem[];
    if (parentClickExpand && children && children.length > 0) {
      handleIndicatorClick();
    } else {
      onNodeClick(data, id);
    }
  };

  const handleNodeExpand = () => {
    if (!doubleClickExpand) return;
    const children = data[childrenKey] as DataItem[];
    const hasChildren = children && children.length > 0;
    if (hasChildren) handleIndicatorClick();
  };

  // const renderLoading = () => {
  //   return <Spin name="ring" size={12} jssStyle={jssStyle}></Spin>
  // };
  const renderIndicator = () => {
    const children = data[childrenKey] as DataItem[];

    if (!children || children.length === 0) {
      return null;
    }

    const icon = expandIcons
      ? expandIcons[expanded ? 1 : 0]
      : expanded
      ? Icons.TreeMinus
      : Icons.TreePlus;

    if (line) {
      return (
        <span
          style={{ position: 'absolute', left: 12, top: 6 }}
          data-expanded={expanded}
          data-icon={hasExpandIcons}
        >
          <span className={classNames(contentStyle.icon, iconClass)} onClick={handleIndicatorClick}>
            {util.isFunc(icon) ? icon(data) : icon}
          </span>
        </span>
      );
    }

    return (
      <span
        className={contentStyle.iconWrapper}
        data-expanded={expanded}
        data-icon={hasExpandIcons}
      >
        <span className={classNames(contentStyle.icon, iconClass)} onClick={handleIndicatorClick}>
          {util.isFunc(icon) ? icon(data) : hasExpandIcons ? icon : Icons.TreeArrow}
        </span>
      </span>
    );
  };

  const renderCheckbox = () => {
    return (
      <Checkbox
        jssStyle={jssStyle}
        id={id}
        className={contentStyle.checkbox}
        onChange={onChange}
      ></Checkbox>
    );
  };

  const renderNode = () => {
    const render = util.isFunc(renderItem) ? renderItem : (item: DataItem) => item[renderItem];
    return render(data, expanded, active, id) as React.ReactNode;
  };

  return (
    <div className={rootClass} onDragOver={onDragOver}>
      {renderIndicator()}
      <div className={contentClass}>
        {onChange && renderCheckbox()}
        <div className={textClass} onClick={handleNodeClick} onDoubleClick={handleNodeExpand}>
          {renderNode()}
        </div>
      </div>
    </div>
  );
};

export default NodeContent;
