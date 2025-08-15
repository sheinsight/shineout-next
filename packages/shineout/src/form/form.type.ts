import {
  FormFieldProps as UiFormFieldProps,
  FormFieldSetProps as UiFormFieldSetProps,
  FormItemProps as UiFormItemProps,
  FormProps as UiFormProps,
  ObjectType,
  FormFlowProps as UiFormFlowProps,
  FormRef as UiFormRef,
  FormDatum as UiFormDatum,
} from '@sheinx/base';
import { ButtonProps } from '../button/button.type';

/**
 * @title FormRef
 * @sort 6
 * @en Form reference object that provides a series of methods to operate the form. After obtaining the instance through ref or useForm, you can actively control the form's validation, submission, reset and other behaviors
 * @cn 表单引用对象，提供了一系列操作表单的方法。通过 ref 或 useForm 获取实例后，可以主动控制表单的校验、提交、重置等行为
 */
export type FormRef<T> = UiFormRef<T>;

/**
 * @title FormDatum
 * @sort 7
 * @en Form data management object, used to manage the internal data state and validation logic of the form
 * @cn 表单数据管理对象，用于管理表单内部的数据状态和校验逻辑
 */
export type FormDatum = UiFormDatum;

/**
 * @title Form
 * @sort 1
 */
export interface FormProps<T extends ObjectType> extends Omit<UiFormProps<T>, 'jssStyle'> {
  /**
   * @en When set, the form becomes a controlled component and needs to be used with onChange. Suitable for scenarios where external management of form state is required, such as sharing form data across components, real-time synchronization of form data to state managers, etc.
   * @cn 设置后表单变为受控组件，需要配合 onChange 使用。适用于需要外部管理表单状态的场景，如跨组件共享表单数据、实时同步表单数据到状态管理器等
   * @override object
   */
  value?: T;
  /**
   * @en Must be set in controlled mode to update external state. Triggered whenever any field value in the form changes, with the parameter being the latest data of the entire form
   * @cn 在受控模式下必须设置此函数来更新外部状态。每当表单内任意字段值改变时都会触发，参数为整个表单的最新数据
   */
  onChange?: (value: T) => void;
}
/**
 * @title Form.Item
 * @sort 2
 * @when 需要为表单控件添加标签、错误提示、必填标记等界面元素时使用。这是最常用的表单布局组件，适合包装 Input、Select、DatePicker 等表单控件
 * @en Form item component, used to wrap form controls and provide label, error tips and other functions. Each form control should be wrapped with Form.Item to properly display labels and validation information
 * @cn 表单项组件，用于包装表单控件并提供标签、错误提示等功能。每个表单控件都应该被 Form.Item 包裹，以便正确显示标签和校验信息
 */
export type FormItemProps = Omit<UiFormItemProps, 'jssStyle'>;

/**
 * @title Form.Field
 * @sort 3
 * @when 需要创建自定义表单控件或封装复杂的表单逻辑时使用。适合将非标准表单组件（如自定义的颜色选择器、代码编辑器等）接入表单系统
 * @en Form field component for creating custom form controls. Provides form data binding, validation and other functions, suitable for encapsulating complex custom form components
 * @cn 表单字段组件，用于创建自定义的表单控件。提供了表单数据绑定、校验等功能，适用于封装复杂的自定义表单组件
 */
export type FormFieldProps<T> = UiFormFieldProps<T>;

/**
 * @title Form.FieldSet
 * @sort 4
 * @when 需要处理动态表单列表、嵌套对象或数组数据时使用。典型场景包括：动态添加/删除表单项、编辑用户列表、管理多个地址信息等
 * @en Form field set component for managing a group of related form fields. Suitable for handling object or array type form data, such as dynamic form lists, nested objects and other complex scenarios
 * @cn 表单字段集组件，用于管理一组相关的表单字段。适用于处理对象或数组类型的表单数据，如动态表单列表、嵌套对象等复杂场景
 */
export type FormFieldSetProps<T> = UiFormFieldSetProps<T>;

/**
 * @title Form.Flow
 * @sort 5
 * @when 需要实现表单联动、条件渲染或监听表单数据变化时使用。例如：根据选择的国家显示不同的省份列表、根据用户类型显示不同的表单字段等
 * @en Form flow component for listening to form data changes and executing corresponding side effects. Suitable for implementing form linkage, conditional rendering and other scenarios
 * @cn 表单流程组件，用于监听表单数据变化并执行相应的副作用。适用于实现表单联动、条件渲染等场景
 */
export type FormFlowProps = UiFormFlowProps;

/**
 * @title Form.Button
 * @sort 8
 * @when 需要防止回车键意外提交表单，或需要在提交前执行自定义逻辑（如确认对话框）时使用。适合复杂表单或需要额外验证步骤的场景
 * @en Form button component with htmlType='button'. Prevents accidental form submission when users press Enter in form inputs. Users must explicitly click the button to submit the form. Internally calls formFunc.submit() for better control over submission logic
 * @cn 表单按钮组件，htmlType='button'。防止用户在表单输入框中按回车键时意外提交表单。用户必须显式点击按钮才能提交表单。内部调用 formFunc.submit() 以更好地控制提交逻辑
 */
export type FormButtonProps = ButtonProps;

/**
 * @title Form.Submit
 * @sort 9
 * @when 需要支持回车键快速提交表单时使用。适合登录表单、搜索表单等简单场景，用户体验更流畅
 * @en Form submit button component with htmlType='submit'. Uses native browser submit behavior. When users press Enter in any form input, it will trigger this button automatically. Suitable for simple forms where Enter-to-submit behavior is desired
 * @cn 表单提交按钮组件，htmlType='submit'。使用浏览器原生提交行为。当用户在任何表单输入框中按回车键时，会自动触发此按钮。适用于希望支持回车提交的简单表单
 */
export type FormSubmitProps = ButtonProps;

/**
 * @title Form.Reset
 * @sort 10
 * @when 需要提供重置表单功能时使用。适合复杂表单或编辑表单，让用户可以快速恢复到初始状态或默认值
 * @en Form reset button component with htmlType='reset'. Resets all form fields to their initial values when clicked. Useful for complex forms where users may want to start over
 * @cn 表单重置按钮组件，htmlType='reset'。点击时将所有表单字段重置为初始值。适用于需要让用户快速恢复初始状态的复杂表单
 */
export type FormResetProps = ButtonProps;
