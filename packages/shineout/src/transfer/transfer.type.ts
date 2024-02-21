import { TransferProps as UnStyledTransfertProps } from '@sheinx/base';
import { KeygenResult } from '@sheinx/hooks';
import { GetWithFieldProps } from '../hooks/use-field-common';

export interface BaseTransferProps<DataItem, Value extends KeygenResult[]>
  extends Omit<UnStyledTransfertProps<DataItem, Value>, 'jssStyle'> {
  /**
   * @en The set of values displayed in the box data on the right
   * @cn 显示在右侧框数据的值集合
   */
  value?: Value;
}

/**
 * @title Transfer
 */
export type TransferProps<DataItem, Value extends KeygenResult[]> = GetWithFieldProps<
  BaseTransferProps<DataItem, Value>,
  BaseTransferProps<DataItem, Value>['value']
>;
