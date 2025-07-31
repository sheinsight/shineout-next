import useLatestObj from '../../../common/use-latest-obj';
import { usePersistFn } from '../../../common/use-persist-fn';
import { useFormFunc } from '../form-func-context';

export interface FormDatum {
  /**
   * @en Set form field values. Accepts either an object to set multiple fields at once, or a field name with value to set a single field. Field names support nested paths like "user.name" or "items[0].price". Changes trigger form validation and re-render of affected Flow components
   * @cn 设置表单字段值。可以接收对象以批量设置多个字段，或接收字段名和值以设置单个字段。字段名支持嵌套路径如 "user.name" 或 "items[0].price"。更改会触发表单校验和相关 Flow 组件的重新渲染
   */
  set: (vals: { [name: string]: any } | string, value?: any) => void;
  /**
   * @en Get form field value by name. When no name is provided, returns the entire form data object. Supports nested paths like "user.name" or "items[0].price" to access deeply nested values
   * @cn 根据名称获取表单字段值。未提供名称时返回整个表单数据对象。支持嵌套路径如 "user.name" 或 "items[0].price" 来访问深层嵌套的值
   */
  get: (name?: string) => any;
}

const useFormDatum = () => {
  const formFunc = useFormFunc();

  const set: FormDatum['set'] = usePersistFn((vals, value) => {
    if (typeof vals === 'object') {
      formFunc?.setValue(vals);
    } else {
      formFunc?.setValue({ [vals]: value });
    }
  });
  const func = useLatestObj({
    set: set,
    get: formFunc?.getValue,
  });
  const datum = formFunc ? func : undefined;
  return datum as FormDatum | undefined;
};

export default useFormDatum;
