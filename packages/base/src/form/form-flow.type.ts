import React from 'react';
import { UseFormFlowProps, FormDatum as UiFormDatum } from '@sheinx/hooks';

/**
 * @title FormFlow
 */
export interface FormFlowProps extends UseFormFlowProps {
  /**
   * @en Render function that receives the form data manager (datum) and returns React nodes. The datum object provides methods to get/set form values dynamically. Perfect for creating form field dependencies, conditional rendering based on form state, or performing actions that need access to multiple form values
   * @cn 渲染函数，接收表单数据管理器（datum）并返回 React 节点。datum 对象提供了动态获取/设置表单值的方法。适用于创建表单字段依赖关系、基于表单状态的条件渲染，或执行需要访问多个表单值的操作
   * @override (datum: FormDatum) => ReactNode
   */
  children: ((datum?: FormDatum) => React.ReactNode) | React.ReactNode;
  /**
   * @en Array of field names to watch for changes. When empty or undefined, any form value change triggers re-render. When specified, only changes to these fields trigger updates. Supports nested paths like "user.name" or "items[0].price". Use this to optimize performance by limiting unnecessary re-renders
   * @cn 要监听变化的字段名称数组。为空或未定义时，表单内任意值变化都会触发重新渲染。指定后，仅这些字段的变化会触发更新。支持嵌套路径如 "user.name" 或 "items[0].price"。通过限制不必要的重新渲染来优化性能
   */
  names?: string[];

  /**
   * @en When true, uses memoization to prevent re-renders unless watched field values actually change. In strict mode, children only re-render when the specified names fields change their values (not just references). Useful for performance optimization in complex forms with expensive render operations
   * @cn 设为 true 时，使用缓存机制防止重新渲染，除非监听的字段值真正发生变化。在严格模式下，只有指定的 names 字段值（而非仅引用）改变时才重新渲染子组件。适用于包含昂贵渲染操作的复杂表单的性能优化
   * @default false
   * @version 3.6.0
   */
  strict?: boolean;
}

/**
 * @title FormDatum
 */
export type FormDatum = UiFormDatum;
