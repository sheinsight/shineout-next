// import { useState } from 'react';
import { BaseTransferProps } from './use-transfer.type';

const useTransfer = <Value, DataItem>(props: BaseTransferProps<Value, DataItem>) => {
  const { data } = props;
  console.log(data);
};

export default useTransfer;
