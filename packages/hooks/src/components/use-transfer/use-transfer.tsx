import { useMemo } from 'react';
import { BaseTransferProps, TransferInfo } from './use-transfer.type';

const useTransfer = <Value, DataItem>(props: BaseTransferProps<Value, DataItem>) => {
  const { data, disabled, selectedKeys, value } = props;

  const [source, target] = useMemo(() => {
    const source: TransferInfo<DataItem> = {
      data: [],
      selectedKeys: [],
    };
    const target: TransferInfo<DataItem> = {
      data: [],
      selectedKeys: [],
    };

    return [source, target];
  }, [data, disabled, selectedKeys, value]);

  console.log(source, target);
};

export default useTransfer;
