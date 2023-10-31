import { TransferOperateProps } from './transfer-operate.type';
import Button from '../button';

const TransferOperate = <DataItem,>(props: TransferOperateProps<DataItem>) => {
  const { jssStyle, className, listType, datum, listDatum, children, value } = props;

  const handleChange = () => {
    const isToTarget = listType === 'source';
    const currentData = listDatum
      .getDataByValues(value)
      .filter((item: DataItem) => !listDatum.disabledCheck(item));

    if (isToTarget) {
      datum.add(currentData);
    } else {
      datum.remove(currentData);
    }
    listDatum.remove(currentData);
  };

  const disabled = listDatum.getValueMap().size === 0 || listDatum.getVaildData().length === 0;

  return (
    <span>
      <Button
        disabled={disabled}
        className={className}
        jssStyle={jssStyle}
        shape='square'
        onClick={handleChange}
      >
        {children}
      </Button>
    </span>
  );
};

export default TransferOperate;
