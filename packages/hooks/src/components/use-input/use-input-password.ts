import usePersistFn from '../../common/use-persist-fn';
import { InputPasswordPros } from './use-input-password.type';

const useInputPassword = (props: InputPasswordPros) => {
  const point = props.point || '*';
  const value = props.value || '';
  const onChange = usePersistFn((val: string | undefined = '') => {
    const newValue: string[] = [];
    val.split('').forEach((v, i) => {
      newValue.push(v === point ? value[i] : v);
    });
    props.onChange(newValue.join(''));
  });
  const newValue = Array.from({ length: props.value?.length || 0 }, () => point).join('');
  return {
    value: newValue,
    onChange,
  };
};

export default useInputPassword;
