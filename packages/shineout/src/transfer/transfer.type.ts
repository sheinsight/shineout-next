import { TransferProps as UnStyledTransfertProps } from '@sheinx/base';
import { KeygenResult } from '@sheinx/hooks';
import { GetWithFieldProps } from '../hooks/use-field-common';

export interface BaseTransferProps<DataItem, Value extends KeygenResult[]>
  extends Omit<UnStyledTransfertProps<DataItem, Value>, 'jssStyle'> {
  value?: Value;
}

/**
 * @title Transfer
 */
export type TransferProps<DataItem, Value extends KeygenResult[]> = GetWithFieldProps<
  BaseTransferProps<DataItem, Value>,
  BaseTransferProps<DataItem, Value>['value']
>;
