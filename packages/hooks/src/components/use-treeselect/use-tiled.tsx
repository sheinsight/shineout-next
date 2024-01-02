import { useState } from 'react';
import classNames from 'classnames';
import { KeygenResult } from '../../common/type';
import { useTree } from '../use-tree';
import { UseTiledProps } from './use-tiled.type';
// import { getKey } from '../../utils';

const useTiled = <DataItem, Value>(props: UseTiledProps<DataItem, Value>) => {
  const {
    // data,
    keygen,
    childrenKey = 'children' as keyof DataItem,
    expanded = [],
    rawData,
    onFilter,
  } = props;

  const [tileds, setTileds] = useState<KeygenResult[]>([]);

  //   const { datum } = useTree({ data, childrenKey, keygen });
  const {
    // datum: rawDatum,
    getKey: getRawKey,
    getDataById: getRawDataById,
  } = useTree({ data: rawData, childrenKey, keygen });

  const handleToggle = (e: React.MouseEvent, key: KeygenResult) => {
    e.stopPropagation();

    const nextTileds = [...tileds];
    const index = nextTileds.indexOf(key);
    if (index >= 0) nextTileds.splice(index, 1);
    else nextTileds.push(key);

    setTileds(nextTileds);
  };

  const handleFilter = (text: string) => {
    if (!text) setTileds([]);
    if (onFilter) onFilter(text);
  };

  const getIcon = (item: DataItem) => {
    const originIcon = <span>1</span>;
    const key = getRawKey(item);
    const rawDataItem = getRawDataById(key) as DataItem;

    if (!item || !rawDataItem) return originIcon;

    const sameCount =
      item[childrenKey] &&
      rawDataItem[childrenKey] &&
      (item[childrenKey] as DataItem[]).length === (rawDataItem[childrenKey] as DataItem[]).length;

    if (expanded.indexOf(key) === -1) return originIcon;

    const handleClick = (e: React.MouseEvent) => {
      handleToggle(e, key);
    };

    return (
      <span className={classNames(sameCount && 'full')} onClick={handleClick}>
        <span />
      </span>
    );
  };

  return {
    onFilter: handleFilter,
    expandIcons: [getIcon, getIcon],
  };
};

export default useTiled;
