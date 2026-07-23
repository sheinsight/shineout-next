import { util } from '@sheinx/hooks';
import { create, snapshot } from '@shined/reactive';
import { LanType, Direction } from './locale/Props';
import { SpinNameType } from '../spin/spin.type';
import type { SemanticClassNames, SemanticStyles } from '../common/use-semantic';
import type { PopoverSemanticKey } from '../popover/popover.type';
import type { TooltipSemanticKey } from '../tooltip/tooltip.type';
import type { SpinSemanticKey } from '../spin/spin.type';
import type { AlertSemanticKey } from '../alert/alert.type';
import type { ModalSemanticKey } from '../modal/modal.type';
import type { ProgressSemanticKey } from '../progress/progress.type';
import type { MessageSemanticKey } from '../message/message.type';
import type { ButtonSemanticKey } from '../button/button.type';
import type { LinkSemanticKey } from '../link/link.type';
import type { DividerSemanticKey } from '../divider/divider.type';

export type SpinConfig =
  | SpinNameType
  | {
      name: SpinNameType;
      color?: string;
      tip?: React.ReactNode;
      mode?: 'vertical' | 'horizontal';
      size?: number;
      /**
       * @en Global Semantic DOM classNames for Spin (applies to all Spin instances).
       * @cn Spin 全局 Semantic DOM 类名（作用于所有 Spin 实例）。
       * @version 3.10.0
       */
      classNames?: SemanticClassNames<SpinSemanticKey>;
      /**
       * @en Global Semantic DOM styles for Spin (applies to all Spin instances).
       * @cn Spin 全局 Semantic DOM 样式（作用于所有 Spin 实例）。
       * @version 3.10.0
       */
      styles?: SemanticStyles<SpinSemanticKey>;
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
  /**
   * @en Global Semantic DOM classNames for Modal.
   * @cn Modal 全局 Semantic DOM 类名。
   * @version 3.10.0
   */
  classNames?: SemanticClassNames<ModalSemanticKey>;
  /**
   * @en Global Semantic DOM styles for Modal.
   * @cn Modal 全局 Semantic DOM 样式。
   * @version 3.10.0
   */
  styles?: SemanticStyles<ModalSemanticKey>;
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

type AlertConfig = {
  /**
   * @en Global Semantic DOM classNames for Alert.
   * @cn Alert 全局 Semantic DOM 类名。
   * @version 3.10.0
   */
  classNames?: SemanticClassNames<AlertSemanticKey>;
  /**
   * @en Global Semantic DOM styles for Alert.
   * @cn Alert 全局 Semantic DOM 样式。
   * @version 3.10.0
   */
  styles?: SemanticStyles<AlertSemanticKey>;
}

type DrawerConfig = {
  /**
   * @en Global Semantic DOM classNames for Drawer.
   * @cn Drawer 全局 Semantic DOM 类名。
   * @version 3.10.0
   */
  classNames?: SemanticClassNames<ModalSemanticKey>;
  /**
   * @en Global Semantic DOM styles for Drawer.
   * @cn Drawer 全局 Semantic DOM 样式。
   * @version 3.10.0
   */
  styles?: SemanticStyles<ModalSemanticKey>;
}

type ProgressConfig = {
  /**
   * @en Global Semantic DOM classNames for Progress.
   * @cn Progress 全局 Semantic DOM 类名。
   * @version 3.10.0
   */
  classNames?: SemanticClassNames<ProgressSemanticKey>;
  /**
   * @en Global Semantic DOM styles for Progress.
   * @cn Progress 全局 Semantic DOM 样式。
   * @version 3.10.0
   */
  styles?: SemanticStyles<ProgressSemanticKey>;
}

type MessageConfig = {
  /**
   * @en Global Semantic DOM classNames for Message.
   * @cn Message 全局 Semantic DOM 类名。
   * @version 3.10.0
   */
  classNames?: SemanticClassNames<MessageSemanticKey>;
  /**
   * @en Global Semantic DOM styles for Message.
   * @cn Message 全局 Semantic DOM 样式。
   * @version 3.10.0
   */
  styles?: SemanticStyles<MessageSemanticKey>;
}

type ButtonConfig = {
  /**
   * @en Global Semantic DOM classNames for Button.
   * @cn Button 全局 Semantic DOM 类名。
   * @version 3.10.0
   */
  classNames?: SemanticClassNames<ButtonSemanticKey>;
  /**
   * @en Global Semantic DOM styles for Button.
   * @cn Button 全局 Semantic DOM 样式。
   * @version 3.10.0
   */
  styles?: SemanticStyles<ButtonSemanticKey>;
}

type LinkConfig = {
  /**
   * @en Global Semantic DOM classNames for Link.
   * @cn Link 全局 Semantic DOM 类名。
   * @version 3.10.0
   */
  classNames?: SemanticClassNames<LinkSemanticKey>;
  /**
   * @en Global Semantic DOM styles for Link.
   * @cn Link 全局 Semantic DOM 样式。
   * @version 3.10.0
   */
  styles?: SemanticStyles<LinkSemanticKey>;
}

type DividerConfig = {
  /**
   * @en Global Semantic DOM classNames for Divider.
   * @cn Divider 全局 Semantic DOM 类名。
   * @version 3.10.0
   */
  classNames?: SemanticClassNames<DividerSemanticKey>;
  /**
   * @en Global Semantic DOM styles for Divider.
   * @cn Divider 全局 Semantic DOM 样式。
   * @version 3.10.0
   */
  styles?: SemanticStyles<DividerSemanticKey>;
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
  /**
   * @en Global configuration for Alert component
   * @cn Alert组件的全局配置
   * @version 3.10.0
   */
  alert?: AlertConfig;
  /**
   * @en Global configuration for Drawer component
   * @cn Drawer组件的全局配置
   * @version 3.10.0
   */
  drawer?: DrawerConfig;
  /**
   * @en Global configuration for Progress component
   * @cn Progress组件的全局配置
   * @version 3.10.0
   */
  progress?: ProgressConfig;
  /**
   * @en Global configuration for Message component
   * @cn Message组件的全局配置
   * @version 3.10.0
   */
  message?: MessageConfig;
  /**
   * @en Global configuration for Button component
   * @cn Button组件的全局配置
   * @version 3.10.0
   */
  button?: ButtonConfig;
  /**
   * @en Global configuration for Link component
   * @cn Link组件的全局配置
   * @version 3.10.0
   */
  link?: LinkConfig;
  /**
   * @en Global configuration for Divider component
   * @cn Divider组件的全局配置
   * @version 3.10.0
   */
  divider?: DividerConfig;
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
  alert: {},
  drawer: {},
  progress: {},
  message: {},
  button: {},
  link: {},
  divider: {},
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
