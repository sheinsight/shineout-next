import { BaseListProps } from './select.type';

const List = <DataItem, Value>(props: BaseListProps<DataItem, Value>) => {
  const { height, optionWidth, header, loading } = props;
  const style = {
    width: optionWidth,
    height,
  };

  const renderLoading = () => {
    return <div>loading</div>;
  };

  const renderHeader = () => {
    return <div>header</div>;
  };

  const renderList = () => {
    if (loading) return renderLoading();

    return <div>123</div>;
  };

  return (
    <div style={style}>
      {header && renderHeader()}
      {renderList()}
    </div>
  );
};

export default List;
