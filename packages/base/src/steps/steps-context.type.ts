import { StepsProps, StepsStatusType } from './steps.type';
import type { SemanticGlobalConfig } from '../common/use-semantic';
import type { StepsSemanticKey } from './steps.type';

export interface StepsContextProps
  extends Pick<
    StepsProps,
    'jssStyle' | 'labelPlacement' | 'current' | 'direction' | 'size' | 'type' | 'onChange'
  > {
  /**
   * @en Current step node status
   * @cn 当前步数节点状态
   */
  currentStatus?: StepsStatusType;
  /**
   * @en Whether the current step node is disabled
   * @cn 当前步骤节点是否被禁用
   */
  disabled?: boolean | ((index: number, id: any) => boolean);
  /**
   * @en Global semantic config for Steps (from setConfig). Passed through Context so Step items can read it.
   * @cn 来自 setConfig 的 Steps 全局 semantic 配置，通过 Context 下发给 Step 子组件。
   * @version 3.10.0
   */
  globalSemanticConfig?: SemanticGlobalConfig<StepsSemanticKey>;
}
