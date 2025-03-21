import { BaseFormFieldSetProps } from '@sheinx/hooks';
import React from 'react';

interface FormFieldSetChildrenOnChangeOptions {
  // 是否立即校验该字段
  validate?: boolean;
}
export interface FormFieldSetChildrenFunc<ValueItem = any> {
  (params: {
    list: ValueItem[];
    value: ValueItem;
    onChange: (value: ValueItem, options?: FormFieldSetChildrenOnChangeOptions) => void;
    onRemove: () => void;
    index: number;
    onInsert: (value: ValueItem) => void;
    onAppend: (value: ValueItem) => void;
    error: Error[];
  }): React.ReactNode;
}

export interface FormFieldSetProps<T> extends Partial<BaseFormFieldSetProps<T>> {
  /**
   * @en The name that accesses data from from
   * @cn 从 Form 中存取数据的名称
   */
  name: string;
  /**
   * @en When children type is not function, handle a set data type of object
   * When children type is function, handle a group of data type of array. options property:
   * list: all data of name.
   * value: a single piece of data for the value obtained by name.
   * onChange: a callback when the value is changing.
   * onRemove: a callback when a child component is removed.
   * index: the current index.
   * onInsert: Insert a piece of data before the current item.
   * onAppend: Insert a piece of data after the current item.
   *
   * @cn children 不为 function，用来处理 object 类型数据，children 内的 name 会拼接 FieldSet name，如 FieldSet name 为 'a', children 元素name 为 b，children 实际处理的数据为 a.b;
   * children 为 function 时，用来处理数组数据。options 属性为
   * list: name 下的全部数据。
   * value: 根据name获取的值的单条数据。
   * onChange: 子组件数据改变回调。
   * onRemove: 子组件删除回调。
   * index: 当前项索引。
   * onInsert: 在当前项之前插入一条数据。
   * onAppend: 在当前项之后附加一条数据。
   *
   * @override ((opts: object) => ReactNode) |ReactNode
   */
  children:
    | React.ReactNode
    | FormFieldSetChildrenFunc<T extends (infer ValueItem)[] ? ValueItem : never>;
  /**
   * @en Show content when data is empty. (only valid when children is function)
   * @cn 数据为空时展示内容。（仅在children为function时有效）
   */
  empty?: (insert: (val: any) => void) => React.ReactNode;
}
