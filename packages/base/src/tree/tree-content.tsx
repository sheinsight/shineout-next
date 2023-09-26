import classNames from 'classnames';
import { util } from '@sheinx/hooks';
import { TreeClasses } from './tree.type';
import { TreeContextProps } from './tree-content.type';
import Checkbox from './tree-checkbox';
import Icons from '../icons';
import Spin from '../spin';

const NodeContent = <DataItem,>(props: TreeContextProps<DataItem>) => {
  const {
    jssStyle,
    id,
    active,
    data,
    line,
    disabled,
    iconClass,
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
  } = props;

  const contentStyle = jssStyle?.tree || ({} as TreeClasses);
  const rootClass = classNames(contentStyle.contentWrapper, {
    [contentStyle.childnode]: data[childrenKey] && (data[childrenKey] as DataItem[]).length > 0,
    [contentStyle.inlineContent]: inlineNode,
  });
  const contentClass = classNames(contentStyle.content);
  const textClass = classNames(contentStyle.text);
  const hasExpandIcons = expandIcons !== undefined;
  const children = data[childrenKey] as DataItem[];
  const hasChildren = children && children.length > 0;

  const contentDataProps = () => {
    const dataProps: {
      'data-active'?: boolean;
    } = {};
    if (highlight) {
      dataProps['data-active'] = active;
    }

    return dataProps;
  };

  const handleIndicatorClick = () => {
    onToggle();

    if (data[childrenKey] !== undefined) return;

    setFetching(true);
    if (loader) loader(id, data);
  };

  const handleNodeClick = () => {
    if (parentClickExpand && hasChildren) {
      handleIndicatorClick();
    } else {
      onNodeClick(data, id);
    }
  };

  const handleNodeExpand = () => {
    if (!doubleClickExpand) return;
    if (hasChildren) handleIndicatorClick();
  };

  const renderLoading = () => {
    return (
      <span
        className={contentStyle.iconWrapper}
        data-expanded={expanded}
        data-icon={hasExpandIcons}
      >
        <Spin name='ring' size={12} jssStyle={jssStyle}></Spin>
      </span>
    );
  };

  const renderIndicator = () => {
    const children = data[childrenKey] as DataItem[];

    const icon = expandIcons
      ? expandIcons[expanded ? 1 : 0]
      : expanded
      ? Icons.TreeMinus
      : Icons.TreePlus;

    let indicator: React.ReactNode;

    if (line) {
      indicator = (
        <span
          // style={{ position: 'absolute', left: 16, top: 6 }}
          className={contentStyle.iconWrapper}
          data-expanded={expanded}
          data-icon={hasExpandIcons}
        >
          <span className={classNames(contentStyle.icon, iconClass)} onClick={handleIndicatorClick}>
            {util.isFunc(icon) ? icon(data) : icon}
          </span>
        </span>
      );
    } else {
      indicator = (
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
    }

    if (children && children.length > 0) return indicator;
    if (Array.isArray(children) || children === null) return null;
    if (fetching && !children) return renderLoading();
    if (loader && !fetching) return indicator;

    return null;
  };

  const renderCheckbox = () => {
    return (
      <Checkbox
        jssStyle={jssStyle}
        id={id}
        disabled={disabled}
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
      <div ref={bindContent} className={contentClass} {...contentDataProps()}>
        {onChange && renderCheckbox()}
        <div className={textClass} onClick={handleNodeClick} onDoubleClick={handleNodeExpand}>
          {renderNode()}
        </div>
      </div>
    </div>
  );
};

export default NodeContent;
