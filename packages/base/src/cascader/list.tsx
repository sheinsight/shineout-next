import classNames from 'classnames';
import { KeygenResult } from '@sheinx/hooks';
import { CascaderClasses } from './cascader.type';
import { CascaderListProps } from './list.type';
import Node from './node';

const CascaderList = <DataItem, Value extends KeygenResult[]>(
  props: CascaderListProps<DataItem, Value>,
) => {
  const {
    jssStyle,
    data,
    keygen,
    parentId,
    datum,
    renderItem,
    loader,
    onChange,
    onPathChange,
    multiple,
    expandTrigger,
    childrenKey,
    shouldFinal,
    path,
  } = props;

  const styles = jssStyle?.cascader?.() as CascaderClasses;

  // 和 datum 中的 geyKey 不一样，根据 parentId 生成唯一的 key
  const getKey = (item: DataItem, index: number): KeygenResult => {
    if (typeof keygen === 'function') return keygen(item, parentId);
    if (keygen && typeof keygen === 'string') {
      const key = item[keygen];
      if (typeof key === 'string' || typeof key === 'number') {
        return key;
      }
      console.error('key must be number or string but get', key);
    }
    return parentId + (parentId ? ',' : '') + index;
  };

  const renderEmpety = () => {
    return <span>noData</span>;
  };

  if (!data || data.length === 0) return renderEmpety();

  return (
    <div className={classNames(styles.list)}>
      {data.map((item, index) => {
        const id = getKey(item, index);
        return (
          <Node
            key={id}
            jssStyle={jssStyle}
            active={props.id === id}
            id={id}
            data={item}
            datum={datum}
            renderItem={renderItem}
            keygen={keygen}
            loader={loader}
            onPathChange={onPathChange}
            onChange={onChange}
            multiple={multiple}
            expandTrigger={expandTrigger}
            childrenKey={childrenKey}
            shouldFinal={shouldFinal}
            parentId={parentId}
            path={path}
          />
        );
      })}
    </div>
  );
};

export default CascaderList;
