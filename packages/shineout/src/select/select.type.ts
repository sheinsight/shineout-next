import {
  SelectPropsBase as UnStyledSelectPropsBase,
  SelectProps as UnStyledSelectProps,
  SelectPropsA as UnStyledSelectPropsA,
  SelectPropsB as UnStyledSelectPropsB,
} from '@sheinx/base';
import { GetWithFieldProps } from '../hooks/use-field-common';

export type SelectPropsComponent<DataItem, Value> = Omit<
  UnStyledSelectProps<DataItem, Value>,
  'jssStyle'
>;
export type SelectPropsComponentA<DataItem, Value> = Omit<
  UnStyledSelectPropsA<DataItem, Value>,
  'jssStyle'
>;
export type SelectPropsComponentB<DataItem, Value> = Omit<
  UnStyledSelectPropsB<DataItem, Value>,
  'jssStyle'
>;

export type SelectPropsBaseComp<DataItem, Value> = Omit<
  UnStyledSelectPropsBase<DataItem, Value>,
  'jssStyle'
>;

export type SelectProps<DataItem, Value> = GetWithFieldProps<
  SelectPropsComponent<DataItem, Value>,
  SelectPropsComponent<DataItem, Value>['value']
>;

export type SelectPropsA<DataItem, Value> = GetWithFieldProps<
  SelectPropsComponentA<DataItem, Value>,
  SelectPropsComponentA<DataItem, Value>['value']
>;

export type SelectPropsB<DataItem, Value> = GetWithFieldProps<
  SelectPropsComponentB<DataItem, Value>,
  SelectPropsComponentB<DataItem, Value>['value']
>;

/**
 * @title Select
 * 
 * @notesCn 当 data 为对象数组时，必须正确配置以下属性以确保组件正常工作：
 * 1. keygen（必需）：指定唯一标识，避免 React 渲染错误
 * 2. format（推荐）：定义 value 的格式，如 format="id" 将使用对象的 id 属性作为值
 * 3. prediction（可选）：当数据源会重新生成时使用，解决对象引用变化导致的匹配失败。如果不设置 format，强烈建议设置 prediction 来确保对象匹配的准确性
 * 4. renderItem/renderResult（推荐）：自定义显示内容，避免显示 [object Object]
 * 
 * 重要提示：format 只影响 value 格式，不影响 renderItem 和 renderResult 的显示内容
 * 
 * @notesEn When data is an object array, the following properties must be configured correctly:
 * 1. keygen (required): Specify unique identifier to avoid React rendering errors
 * 2. format (recommended): Define value format, e.g., format="id" uses object's id property as value
 * 3. prediction (optional): Use when data source regenerates to solve matching failures due to reference changes. If format is not set, it's strongly recommended to set prediction for accurate object matching
 * 4. renderItem/renderResult (recommended): Customize display content to avoid showing [object Object]
 * 
 * Important: format only affects value format, not the display content of renderItem and renderResult
 */
export type SelectPropsBase<DataItem, Value> = GetWithFieldProps<
  SelectPropsBaseComp<DataItem, Value>,
  SelectPropsBaseComp<DataItem, Value>['value']
>;
