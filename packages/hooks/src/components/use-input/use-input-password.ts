import { useState } from 'react';
import usePersistFn from '../../common/use-persist-fn';
import { InputPasswordProps } from './use-input-password.type';

const useInputPassword = (props: InputPasswordProps) => {
  const point = props.point || '•';
  const value = props.value || '';
  const [visibleState, setVisibleState] = useState(props.defaultVisibility || false);
  const control = props.visibility !== undefined;
  const visibility = control ? props.visibility : visibleState;

  const handleVisibilityChange = usePersistFn((v: boolean) => {
    if (!control) {
      setVisibleState(v);
    }
    props.onVisibilityChange?.(v);
  });

  const toggleVisibility = usePersistFn(() => {
    if (!props.visibilityToggle) return;
    handleVisibilityChange(!visibility);
  });

  const onChange = usePersistFn((val: string | undefined = '') => {
    const newValue: string[] = [];
    val.split('').forEach((v, i) => {
      newValue.push(v === point && value[i] !== undefined ? value[i] : v);
    });
    props.onChange(newValue.join(''));
  });
  const newValue = Array.from({ length: value?.length || 0 }, () => point).join('');
  return {
    inputProps: {
      value: visibility ? value : newValue,
      onChange,
      type: 'text',
    },
    toggleProps: {
      onClick: toggleVisibility,
      onMouseDown: (e: any) => e?.preventDefault?.(),
    },
    visibility,
    visibilityToggle: props.visibilityToggle,
  };
};

export default useInputPassword;
