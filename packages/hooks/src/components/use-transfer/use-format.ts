import { ObjectKey } from '../../common/type';

const useFormat = <DataItem, Value>(f?: ObjectKey<DataItem> | ((data: DataItem) => Value)) => {
  let format;
  switch (typeof f) {
    case 'string':
      format = (item: DataItem) => item[f];
      break;
    case 'function':
      format = (item: DataItem) => f(item);
      break;
    default:
      format = (item: DataItem) => item;
      break;
  }
  return format;
};

export default useFormat;
