import { KeygenResult } from '@sheinx/hooks';
export type CheckedStatusType = 0 | 1 | 2;
export interface TreeContextProps {
  set: (id: KeygenResult, checked: CheckedStatusType) => void;
  get: (id: KeygenResult) => CheckedStatusType | undefined;
  getValue: () => KeygenResult[];
  getKey: (item: any, id?: KeygenResult, index?: number) => KeygenResult;
  getChecked: (id: KeygenResult) => boolean | 'indeterminate';
  getPath: (id: KeygenResult) => any;
  getDataByValues: (values: KeygenResult[] | KeygenResult) => any[];
  setValue: (value?: KeygenResult[]) => void;
  isDisabled: (id: KeygenResult) => boolean;
}

export interface TreeProviderProps {
  children: React.ReactNode;
  value: TreeContextProps;
}
