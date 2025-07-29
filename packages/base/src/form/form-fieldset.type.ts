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
   * @en The field name that binds to form data for the fieldset. Used to identify and manage a group of related form fields or array data. Supports nested object access with dot notation (e.g., 'users', 'company.employees')
   * @cn 绑定到表单数据的字段集名称。用于标识和管理一组相关的表单字段或数组数据。支持点表示法访问嵌套对象（如 'users'、'company.employees'）
   */
  name: string;
  /**
   * @en Content to render within the fieldset. Supports two modes:
   * 
   * **Object Mode** (React element): For managing nested object fields. Child field names are automatically prefixed with fieldset name. Perfect for grouping related form fields like address, contact info, or user profile sections.
   * 
   * **Array Mode** (render function): For managing dynamic array data. The function receives an object with:
   * - `list`: Complete array data for this fieldset
   * - `value`: Current item data at this index  
   * - `index`: Current item index in the array
   * - `error`: Validation errors for current item
   * - `onChange`: Update current item data
   * - `onInsert`: Insert new item before current position
   * - `onAppend`: Insert new item after current position
   * - `onRemove`: Remove current item from array
   * 
   * Ideal for dynamic lists, repeatable form sections, or editable tables.
   * 
   * @cn 在字段集内渲染的内容。支持两种模式：
   * 
   * **对象模式**（React 元素）：用于管理嵌套对象字段。子字段名称会自动加上字段集名称前缀。适用于分组相关表单字段，如地址、联系信息或用户资料等部分。
   * 
   * **数组模式**（渲染函数）：用于管理动态数组数据。函数接收包含以下属性的对象：
   * - `list`：该字段集的完整数组数据
   * - `value`：当前索引位置的数据项
   * - `index`：当前数据项在数组中的索引
   * - `error`：当前数据项的校验错误
   * - `onChange`：更新当前数据项
   * - `onInsert`：在当前位置之前插入新数据项
   * - `onAppend`：在当前位置之后插入新数据项
   * - `onRemove`：从数组中移除当前数据项
   * 
   * 适用于动态列表、可重复表单部分或可编辑表格。
   * 
   * @override ((opts: object) => ReactNode) |ReactNode
   */
  children:
    | React.ReactNode
    | FormFieldSetChildrenFunc<T extends (infer ValueItem)[] ? ValueItem : never>;
  /**
   * @en Content to display when the array is empty. Only effective in array mode (when children is a function). The render function receives an `insert` callback to add the first item. Perfect for showing "Add first item" buttons, empty state messages, or onboarding guidance for dynamic lists
   * @cn 数组为空时显示的内容。仅在数组模式下（children 为函数时）有效。渲染函数接收 `insert` 回调来添加第一个数据项。适用于显示“添加第一个项目”按钮、空状态提示或动态列表的引导信息
   */
  empty?: (insert: (val: any) => void) => React.ReactNode;
}
