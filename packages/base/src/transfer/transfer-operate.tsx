import { KeygenResult } from '@sheinx/hooks';
import { TransferOperateProps } from './transfer-operate.type';
import Button from '../button';

const TransferOperate = <DataItem, Value extends KeygenResult[]>(
  props: TransferOperateProps<DataItem, Value>,
) => {
  const { jssStyle, className, size, listType, datum, listDatum, operation, children, value } =
    props;

  const handleChange = () => {
    const isToTarget = listType === 'source';
    const currentData = (listDatum.getDataByValues(value) as DataItem[]).filter(
      (item: DataItem) => !listDatum.disabledCheck(item),
    );

    if (isToTarget) {
      datum.add(currentData);
    } else {
      datum.remove(currentData);
    }
    listDatum.remove(currentData);
  };

  const disabled = listDatum.getValueMap().size === 0 || listDatum.getVaildData().length === 0;
  const style = operation ? { width: '100%' } : undefined;

  return (
    <span>
      <Button
        size={size}
        disabled={disabled}
        className={className}
        jssStyle={jssStyle}
        style={style}
        type='secondary'
        shape={operation ? undefined : 'square'}
        onClick={handleChange}
      >
        {operation}
        {children}
      </Button>
    </span>
  );
};

export default TransferOperate;
