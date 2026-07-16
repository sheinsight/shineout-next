import { util } from '@sheinx/hooks';
import { create, snapshot } from '@shined/reactive';
import { LanType, Direction } from './locale/Props';
import { SpinNameType } from '../spin/spin.type';
import type { SemanticClassNames, SemanticStyles } from '../common/use-semantic';
import type { PopoverSemanticKey } from '../popover/popover.type';
import type { TooltipSemanticKey } from '../tooltip/tooltip.type';

export type SpinConfig =
  | SpinNameType
  | {
      name: SpinNameType;
      color?: string;
      tip?: React.ReactNode;
      mode?: 'vertical' | 'horizontal';
      size?: number;
    };

type TooltipConfig = {
  persistent?: boolean;
  /**
   * @en Global Semantic DOM classNames for Tooltip (applies to all Tooltip instances).
   *     Lower priority than component-level `classNames` prop.
   * @cn Tooltip 全局 Semantic DOM 类名（作用于所有 Tooltip 实例）。
   *     优先级低于组件 prop 上的 `classNames`。
   * @version 3.10.0
   */
  classNames?: SemanticClassNames<TooltipSemanticKey>;
  /**
   * @en Global Semantic DOM styles for Tooltip (applies to all Tooltip instances).
   *     Lower priority than component-level `styles` prop.
   * @cn Tooltip 全局 Semantic DOM 样式（作用于所有 Tooltip 实例）。
   *     优先级低于组件 prop 上的 `styles`。
   * @version 3.10.0
   */
  styles?: SemanticStyles<TooltipSemanticKey>;
}

/**
 * @en Global configuration for Modal component
 * @cn Modal组件的全局配置
 * @version 3.9.10
 */
export type ModalConfig = {
  /**
   * @en Global default mask setting for Modal component. false to hide mask, { blur: true } to show blurred mask
   * @cn Modal组件的全局默认遮罩设置。false 隐藏遮罩，{ blur: true } 显示模糊遮罩
   */
  mask?: boolean | { blur?: boolean };
}

/**
 * @en Global configuration for Popover component
 * @cn Popover组件的全局配置
 * @version 3.9.9
 */
export type PopoverConfig = {
  /**
   * @en Global default animation setting for Popover component
   * @cn Popover组件的全局默认动画设置
   */
  animation?: boolean;
  /**
   * @en Global Semantic DOM classNames for Popover (applies to all Popover instances).
   *     Lower priority than component-level `classNames` prop.
   * @cn Popover 全局 Semantic DOM 类名（作用于所有 Popover 实例）。
   *     优先级低于组件 prop 上的 `classNames`。
   * @version 3.10.0
   */
  classNames?: SemanticClassNames<PopoverSemanticKey>;
  /**
   * @en Global Semantic DOM styles for Popover (applies to all Popover instances).
   *     Lower priority than component-level `styles` prop.
   * @cn Popover 全局 Semantic DOM 样式（作用于所有 Popover 实例）。
   *     优先级低于组件 prop 上的 `styles`。
   * @version 3.10.0
   */
  styles?: SemanticStyles<PopoverSemanticKey>;
}

/**
 * @en Global configuration for Empty component
 * @cn Empty组件的全局配置
 * @version 3.8.0
 */
type EmptyConfig = {
  /**
   * @en Global default icon for Empty component
   * @cn Empty组件的全局默认图标
   */
  icon?: () => React.ReactNode;
  /**
   * @en Global default description for Empty component
   * @cn Empty组件的全局默认描述
   */
  description?: React.ReactNode | boolean;
}

export interface ConfigOption {
  prefix: string;
  locale: LanType;
  delay?: number;
  trim?: boolean;
  spin?: SpinConfig;
  tooltip?: TooltipConfig;
  popover?: PopoverConfig;
  /**
   * @en Global configuration for Modal component
   * @cn Modal组件的全局配置
   * @version 3.9.10
   */
  modal?: ModalConfig;
  /**
   * @en Global configuration for Empty component
   * @cn Empty组件的全局配置
   * @version 3.8.0
   */
  empty?: EmptyConfig;
  direction: Direction;
  popupContainer?: HTMLElement | null | (() => HTMLElement | null);
}

const processEnv: Record<string, any> = typeof process !== 'undefined' ? process?.env : {};

export const defaultConfig: ConfigOption = {
  prefix: 'soui',
  locale: (processEnv.LOCALE as LanType) || 'en-US',
  delay: 400,
  trim: undefined,
  spin: 'ring',
  tooltip: {},
  popover: {},
  modal: {},
  empty: {},
  direction: 'ltr',
  popupContainer: null,
};

const state = create<ConfigOption>(defaultConfig);

export let config: ConfigOption = snapshot(state.mutate);

state.subscribe(() => {
  config = snapshot(state.mutate);
});

export function getDefaultContainer() {
  if (util.isFunc(config.popupContainer)) {
    const container = config.popupContainer();
    if (util.isDomElement(container)) {
      return container;
    }
  }

  if (util.isDomElement(config.popupContainer)) return config.popupContainer;

  return util.isBrowser() ? document.body : null;
}

export const useConfig = () => {
  return state.useSnapshot();
};

export const setConfig = (option: Partial<ConfigOption>) => {
  for (const [key, value] of Object.entries(option)) {
    if (key in config) {
      const k = key as keyof ConfigOption;
      // @ts-ignore
      state.mutate[k] = value;
    }
  }
};

export { setLocale, getLocale } from './locale/index';
