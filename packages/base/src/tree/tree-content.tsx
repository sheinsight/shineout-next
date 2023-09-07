import classNames from 'classnames';
import { util } from '@sheinx/hooks';
import { TreeClasses } from './tree.type';
import { TreeContextProps } from './tree-content.type';
import Icons from '../icons';
// import Spin from '../spin';

const NodeContent = <DataItem,>(props: TreeContextProps<DataItem>) => {
  const {
    jssStyle,
    id,
    active,
    data,
    // line,
    renderItem,
    expanded,
    childrenKey,
    parentClickExpand,
    onToggle,
    onDragOver,
    onNodeClick,
  } = props;

  const contentStyle = jssStyle?.tree || ({} as TreeClasses);
  const rootClass = classNames(contentStyle.contentWrapper);
  const contentClass = classNames(contentStyle.content);
  const textClass = classNames(contentStyle.text);

  const handleIndicatorClick = () => {
    onToggle();
  };

  const handleClick = () => {
    const children = data[childrenKey] as DataItem[];
    if (parentClickExpand && children && children.length > 0) {
      handleIndicatorClick();
    } else {
      onNodeClick(data, id);
    }
  };
  const handleNodeExpand = () => {};

  // const renderLoading = () => {
  //   return <Spin name="ring" size={12} jssStyle={jssStyle}></Spin>
  // };

  const renderIndicator = () => {
    const children = data[childrenKey] as DataItem[];

    if (!children || children.length === 0) {
      return null;
    }

    return (
      <span className={contentStyle.iconWrapper} data-expanded={expanded}>
        <span className={contentStyle.icon} onClick={handleIndicatorClick}>
          {Icons.TreeArrow}
        </span>
      </span>
    );
  };

  const renderCheckbox = () => {
    return null;
  };

  const renderNode = () => {
    const render = util.isFunc(renderItem) ? renderItem : (item: DataItem) => item[renderItem];
    return render(data, expanded, active, id) as React.ReactNode;
  };

  return (
    <div className={rootClass} onDragOver={onDragOver}>
      {renderIndicator()}
      <div className={contentClass}>
        {renderCheckbox()}
        <div className={textClass} onClick={handleClick} onDoubleClick={handleNodeExpand}>
          {renderNode()}
        </div>
      </div>
    </div>
  );
};

export default NodeContent;
