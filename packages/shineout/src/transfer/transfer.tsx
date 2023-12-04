import React from 'react';
import { Transfer as UnStyleTransfer } from '@sheinx/base';
import { KeygenResult } from '@sheinx/hooks';
import { BaseTransferProps, TransferProps } from './transfer.type';
import useFieldCommon from '../hooks/use-field-common';
import {
  useSpinStyle,
  useEmptyStyle,
  useInputStyle,
  useButtonStyle,
  useTransferStyle,
  useCheckboxStyle,
} from '@sheinx/shineout-style';

const jssStyle = {
  transfer: useTransferStyle,
  button: useButtonStyle,
  checkbox: useCheckboxStyle,
  empty: useEmptyStyle,
  input: useInputStyle,
  spin: useSpinStyle,
};

const Transfer = <DataItem, Value extends KeygenResult[]>(
  props: BaseTransferProps<DataItem, Value>,
) => {
  return <UnStyleTransfer {...props} jssStyle={jssStyle} />;
};

export default <DataItem, Value extends KeygenResult[]>(props: TransferProps<DataItem, Value>) => {
  return useFieldCommon<
    BaseTransferProps<DataItem, Value>,
    BaseTransferProps<DataItem, Value>['value']
  >(props, Transfer);
};
