import classNames from 'classnames';
import { TreeClasses } from './tree.type';
import { TreeContextProps } from './tree-content.type';
import { util } from '@sheinx/hooks';

const NodeContent = <DataItem,>(props: TreeContextProps<DataItem>) => {
  const { jssStyle, id, active, data, renderItem, expanded, onDragOver } = props;
  console.log(id, active, data, renderItem, expanded);
  const contentStyle = jssStyle?.tree || ({} as TreeClasses);
  const rootClass = classNames(contentStyle.contentWrapper);
  const contentClass = classNames(contentStyle.content);
  const textClass = classNames(contentStyle.text);

  const renderIndicator = () => {
    return null;
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
        <div className={textClass}>{renderNode()}</div>
      </div>
    </div>
  );
};

export default NodeContent;
