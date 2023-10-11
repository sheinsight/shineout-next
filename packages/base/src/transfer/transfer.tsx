import classNames from 'classnames';
import { TransferProps, TransferClasses, TransferListType } from './transfer.type';
import TransferList from './transfer-list';
import Button from '../button';
import Icon from '../icons';

const Transfer = <DataItem,>(props: TransferProps<DataItem>) => {
  const { jssStyle } = props;

  const source: DataItem[] = [];
  const target: DataItem[] = [];

  const styles = jssStyle?.transfer?.() || ({} as TransferClasses);
  const rootClass = classNames(styles.transfer);

  const renderOperations = () => {
    return (
      <div className={styles.operations}>
        <span>
          <Button disabled className={styles.right} jssStyle={jssStyle} shape='square'>
            {Icon.AngleRight}
          </Button>
        </span>
        <span>
          <Button disabled className={styles.left} jssStyle={jssStyle} shape='square'>
            {Icon.AngleLeft}
          </Button>
        </span>
      </div>
    );
  };

  const renderList = (listType: TransferListType) => {
    if (listType === 'source') {
      return <TransferList jssStyle={jssStyle} data={source} />;
    }

    return <TransferList jssStyle={jssStyle} data={target} />;
  };

  return (
    <div className={rootClass}>
      {renderList('source')}
      {renderOperations()}
      {renderList('target')}
    </div>
  );
};

export default Transfer;
