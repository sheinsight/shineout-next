import classNames from 'classnames';
import { TransferClasses } from './transfer.type';
import { TransferListProps } from './transfer-list.type';

const TransferList = <DataItem,>(props: TransferListProps<DataItem>) => {
  const { jssStyle } = props;
  const styles = jssStyle?.transfer?.() || ({} as TransferClasses);
  const rootClass = classNames(styles.view);

  return <div className={rootClass}>List</div>;
};

export default TransferList;
