import classNames from 'classnames';
import { util, KeygenResult } from '@sheinx/hooks';
import { TransferClasses } from './transfer.type';
import { TransferListProps } from './transfer-list.type';
import TransferListItem from './transfer-list-item';
import Empty from '../empty';

const TransferList = <DataItem,>(props: TransferListProps<DataItem>) => {
  const { jssStyle, info, renderItem, footer, keygen, listHeight, empty, onSelect } = props;
  const { data, selectedKeys, disabledKeys } = info;

  const styles = jssStyle?.transfer?.() || ({} as TransferClasses);
  const rootClass = classNames(styles.view);

  const handleChange = (key: KeygenResult, checked: boolean) => {
    onSelect(key, checked);
  };

  const renderHeader = () => {
    return <div className={styles.header}>Header</div>;
  };

  const renderEmpty = () => {
    if (!empty) {
      return (
        <div className={styles.empty}>
          <Empty jssStyle={jssStyle}></Empty>
        </div>
      );
    }
    return <div className={styles.empty}>{empty}</div>;
  };

  const renderList = () => {
    return (
      <div className={styles.list} style={{ height: listHeight }}>
        <div style={{ overflowY: 'auto', height: '100%' }}>
          {data.map((d, i) => {
            const key = util.getKey(keygen, d);
            return (
              <TransferListItem
                key={i}
                jssStyle={jssStyle}
                data={d}
                keygen={keygen}
                checked={selectedKeys.has(key)}
                renderItem={renderItem}
                onChange={handleChange}
                disabled={disabledKeys.includes(d)}
              />
            );
          })}

          {data && data.length === 0 && renderEmpty()}
        </div>
      </div>
    );
  };

  const renderFooter = () => {
    if (!footer) {
      return null;
    }
    return <div className={styles.footer}>Footer</div>;
  };

  return (
    <div className={rootClass}>
      {renderHeader()}
      {renderList()}
      {renderFooter()}
    </div>
  );
};

export default TransferList;
