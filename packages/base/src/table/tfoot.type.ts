import { TableProps } from './table.type';
import type { OptionalToRequired, TableFormatColumn } from '@sheinx/hooks';
export { SummaryItem } from './table.type';

export interface TfootProps
  extends Pick<OptionalToRequired<TableProps<any, any>>, 'summary' | 'jssStyle'> {
  fixLeftNum?: number;
  fixRightNum?: number;
  columns: TableFormatColumn<any>[];
  colgroup: (number | undefined)[];
}
