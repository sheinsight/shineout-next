import classNames from 'classnames';
import { TransferListItemProps } from './transfer-list-item.type';
import { TransferClasses } from './transfer.type';
import { util, KeygenResult } from '@sheinx/hooks';

import Checkbox from '../checkbox';

const TransferListItem = <DataItem,>(props: TransferListItemProps<DataItem>) => {
  const { jssStyle, keygen, data, renderItem: renderItemProp, checked, onChange } = props;

  const styles = jssStyle?.transfer?.() || ({} as TransferClasses);
  const rootClass = classNames(styles.item);

  const renderItem = () => {
    if (util.isString(renderItemProp)) {
      return data[renderItemProp] as React.ReactNode;
    }

    return renderItemProp(data);
  };

  const handleChange = (value: any, checked: boolean) => {
    const key = util.getKey(keygen, data) as KeygenResult;
    onChange(key, checked);
  };

  return (
    <div className={rootClass}>
      <Checkbox jssStyle={jssStyle} checked={checked} onChange={handleChange}>
        {renderItem()}
      </Checkbox>
    </div>
  );
};

export default TransferListItem;
