import { useState } from 'react';
import { KeygenResult, ObjectKey } from '../../common/type';
import { useTree } from '../use-tree';
import { UseTiledProps } from './use-tiled.type';
import { mergeFilteredTree } from '../../utils/tree';

const useTiled = <DataItem,>(props: UseTiledProps<DataItem>) => {
  const {
    data,
    keygen,
    childrenKey = 'children' as ObjectKey<DataItem>,
    expanded = [],
    rawData,
    onFilter,
    filterText,
    originIcon,
    moreIcon,
    onAdvancedFilter,
  } = props;

  const [tileds, setTileds] = useState<KeygenResult[]>([]);
  const { datum } = useTree({ data, childrenKey, keygen, isControlled: false });
  const { datum: rawDatum } = useTree({ data: rawData, childrenKey, keygen, isControlled: false });

  const handleToggle = (e: React.MouseEvent, key: KeygenResult) => {
    e.stopPropagation();

    const nextTileds = [...tileds];
    const index = nextTileds.indexOf(key);
    if (index >= 0) nextTileds.splice(index, 1);
    else nextTileds.push(key);
    setTileds(nextTileds);
  };

  const handleFilter = (text: string, from?: string) => {
    if (!text) setTileds([]);
    if (onFilter) onFilter(text, from);
  };

  const getIcon = (item: DataItem) => {
    const key = rawDatum.getKey(item);
    const rawDataItem = rawDatum.getDataById(key) as DataItem;

    if (!item || !rawDataItem) return originIcon;

    if (expanded.indexOf(key) === -1) return originIcon;

    const handleClick = (e: React.MouseEvent) => {
      handleToggle(e, key);
    };

    return (
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
        }}
        onClick={handleClick}
      >
        {/* <span /> */}
        {moreIcon()}
      </span>
    );
  };

  if (!filterText || !onAdvancedFilter) {
    return {
      data,
      onFilter,
    };
  }
  const nextData = mergeFilteredTree(datum, rawDatum, tileds);
  return {
    data: nextData,
    onFilter: handleFilter,
    expandIcons: [getIcon, getIcon],
  };
};

export default useTiled;
