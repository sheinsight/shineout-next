import { usePersistFn } from '@shined/hooks';

export interface ClearProps<T> {
  value?: T;
  clearable?: boolean | (() => void);
  clearToUndefined?: boolean;
  onChange?: (v?: T, ...rest: any) => void;
}

const useClear = <T,>(props: ClearProps<T>) => {
  const { clearable, clearToUndefined, value, onChange } = props;
  let clearValue = '' as T;
  if (Array.isArray(value)) {
    clearValue = [] as T;
  }

  const handleClear = usePersistFn(() => {
    onChange?.(clearToUndefined ? undefined : clearValue);
    if (typeof clearable === 'function') {
      clearable();
    }
  });

  const handleChange = usePersistFn((v: T | undefined, ...rest: any) => {
    if (value === undefined && (v === '' || (Array.isArray(v) && v.length === 0))) {
      return;
    }
    onChange?.(v, ...rest);
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
    onChange: handleChange,
    clearable: !!clearable,
    showClear: getShowClear(),
  };
};

export default useClear;
