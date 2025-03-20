import React from 'react';
import { UseFormFlowProps, FormDatum } from '@sheinx/hooks';

/**
 * @title FormFlow
 */
export interface FormFlowProps extends UseFormFlowProps {
  /**
   * @en datum is the object of Datum.Form.
   * @cn datum 为 Datum.Form 对象
   * @override (datum: FormDatum) => ReactNode
   */
  children: ((datum?: FormDatum) => React.ReactNode) | React.ReactNode;
  /**
   * @en Specifying which fields to change trigger the Flow update.
   * @cn names 为空时，Form 内任意值变化会触发 Flow 更新；不为空时，只监听指定字段变化
   */
  names?: string[];

  /**
   * @en Whether to strictly follow the watch rules.
   * @cn 严格根据 names 配置监听变化
   * @default false
   * @version 3.6.0
   */
  strict?: boolean;
}
