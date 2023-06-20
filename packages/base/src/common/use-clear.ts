import { usePersistFn } from '@sheinx/hooks';

export interface ClearProps<T> {
  value?: T;
  clearable?: boolean | (() => void);
  clearToUndefined?: boolean;
  onChange?: (v: T, ...rest: any) => void;
}

const useClear = <T>(props: ClearProps<T>) => {
  const { clearable, clearToUndefined, value, onChange } = props;
  let clearValue = '' as T;
  if (Array.isArray(value)) {
    clearValue = [] as T;
  }

  const handleClear = usePersistFn(() => {
    onChange?.(clearToUndefined ? (undefined as T) : clearValue);
    if (typeof clearable === 'function') {
      clearable();
    }
  });

  const getShowClear = () => {
    if (!clearable) return false;
    if (clearToUndefined) {
      return value !== undefined;
    }
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    if (value === 0) return true;
    return !!value;
  };

  return {
    onClear: handleClear,
    clearable: !!clearable,
    showClear: getShowClear(),
  };
};

export default useClear;
