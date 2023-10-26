import { TransferOperateProps } from './transfer-operate.type';
import Button from '../button';

const TransferOperate = (props: TransferOperateProps) => {
  const { jssStyle, className, listType, selectedKeys, children, onChange } = props;

  const handleChange = () => {
    onChange(listType, selectedKeys);
  };

  return (
    <span>
      <Button
        disabled={selectedKeys.length === 0}
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
