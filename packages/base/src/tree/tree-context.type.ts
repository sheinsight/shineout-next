import { KeygenResult } from '@sheinx/hooks';
export type CheckedStatusType = 0 | 1 | 2;
export interface TreeContextProps {
  set: (id: KeygenResult, checked: CheckedStatusType) => void;
  get: (id: KeygenResult) => CheckedStatusType | undefined;
  getValue: () => KeygenResult[];
  getActive: () => KeygenResult | undefined;
  getChecked: (id: KeygenResult) => boolean | 'indeterminate';
  getPath: (id: KeygenResult) => any;
  isDisabled: (id: KeygenResult) => boolean;
}

export interface TreeProviderProps {
  children: React.ReactNode;
  value: TreeContextProps;
}
