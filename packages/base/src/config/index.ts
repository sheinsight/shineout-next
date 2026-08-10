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
import type { GapSemanticKey } from '../gap/gap.type';
import type { GridSemanticKey } from '../grid/grid.type';
import type { StepsSemanticKey } from '../steps/steps.type';
import type { MenuSemanticKey } from '../menu/menu.type';
import type { DropdownSemanticKey } from '../dropdown/dropdown.type';
import type { BreadcrumbSemanticKey } from '../breadcrumb/breadcrumb.type';
import type { PaginationSemanticKey } from '../pagination/pagination.type';
import type { BadgeSemanticKey } from '../badge/badge.type';
import type { CardSemanticKey } from '../card/card.type';
import type { CarouselSemanticKey } from '../carousel/carousel.type';
import type { CollapseSemanticKey } from '../collapse/collapse.type';
import type { DescriptionsSemanticKey } from '../descriptions/descriptions.type';
import type { EmptySemanticKey } from '../empty/empty.type';
import type { ImageSemanticKey } from '../image/image.type';
import type { ListSemanticKey } from '../list/list.type';

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
  /**
   * @en Global Semantic DOM classNames for Empty (root / icon / description).
   * @cn Empty 全局 Semantic DOM 类名（root / icon / description）。
   * @version 3.10.0
   */
  classNames?: SemanticClassNames<EmptySemanticKey>;
  /**
   * @en Global Semantic DOM styles for Empty (root / icon / description).
   * @cn Empty 全局 Semantic DOM 样式（root / icon / description）。
   * @version 3.10.0
   */
  styles?: SemanticStyles<EmptySemanticKey>;
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

type GapConfig = {
  /**
   * @en Global Semantic DOM classNames for Gap.
   * @cn Gap 全局 Semantic DOM 类名。
   * @version 3.10.0
   */
  classNames?: SemanticClassNames<GapSemanticKey>;
  /**
   * @en Global Semantic DOM styles for Gap.
   * @cn Gap 全局 Semantic DOM 样式。
   * @version 3.10.0
   */
  styles?: SemanticStyles<GapSemanticKey>;
}

type GridConfig = {
  /**
   * @en Global Semantic DOM classNames for Grid.
   * @cn Grid 全局 Semantic DOM 类名。
   * @version 3.10.0
   */
  classNames?: SemanticClassNames<GridSemanticKey>;
  /**
   * @en Global Semantic DOM styles for Grid.
   * @cn Grid 全局 Semantic DOM 样式。
   * @version 3.10.0
   */
  styles?: SemanticStyles<GridSemanticKey>;
}

type StepsConfig = {
  /**
   * @en Global Semantic DOM classNames for Steps (root / step / tail / icon / title / description / content).
   * @cn Steps 全局 Semantic DOM 类名（root / step / tail / icon / title / description / content）。
   * @version 3.10.0
   */
  classNames?: SemanticClassNames<StepsSemanticKey>;
  /**
   * @en Global Semantic DOM styles for Steps (root / step / tail / icon / title / description / content).
   * @cn Steps 全局 Semantic DOM 样式（root / step / tail / icon / title / description / content）。
   * @version 3.10.0
   */
  styles?: SemanticStyles<StepsSemanticKey>;
}

type MenuConfig = {
  /**
   * @en Global Semantic DOM classNames for Menu (root / header / list / item / itemContent / title / icon / expand).
   * @cn Menu 全局 Semantic DOM 类名（root / header / list / item / itemContent / title / icon / expand）。
   * @version 3.10.0
   */
  classNames?: SemanticClassNames<MenuSemanticKey>;
  /**
   * @en Global Semantic DOM styles for Menu (root / header / list / item / itemContent / title / icon / expand).
   * @cn Menu 全局 Semantic DOM 样式（root / header / list / item / itemContent / title / icon / expand）。
   * @version 3.10.0
   */
  styles?: SemanticStyles<MenuSemanticKey>;
}

type DropdownConfig = {
  /**
   * @en Global Semantic DOM classNames for Dropdown (root / button / caret / list / item / group).
   * @cn Dropdown 全局 Semantic DOM 类名（root / button / caret / list / item / group）。
   * @version 3.10.0
   */
  classNames?: SemanticClassNames<DropdownSemanticKey>;
  /**
   * @en Global Semantic DOM styles for Dropdown (root / button / caret / list / item / group).
   * @cn Dropdown 全局 Semantic DOM 样式（root / button / caret / list / item / group）。
   * @version 3.10.0
   */
  styles?: SemanticStyles<DropdownSemanticKey>;
}

type BreadcrumbConfig = {
  /**
   * @en Global Semantic DOM classNames for Breadcrumb (root / item / separator / content / dropdown / dropdownItem).
   * @cn Breadcrumb 全局 Semantic DOM 类名（root / item / separator / content / dropdown / dropdownItem）。
   * @version 3.10.0
   */
  classNames?: SemanticClassNames<BreadcrumbSemanticKey>;
  /**
   * @en Global Semantic DOM styles for Breadcrumb (root / item / separator / content / dropdown / dropdownItem).
   * @cn Breadcrumb 全局 Semantic DOM 样式（root / item / separator / content / dropdown / dropdownItem）。
   * @version 3.10.0
   */
  styles?: SemanticStyles<BreadcrumbSemanticKey>;
}

type PaginationConfig = {
  /**
   * @en Global Semantic DOM classNames for Pagination (root / item / prev / next / jumper / sizeList).
   * @cn Pagination 全局 Semantic DOM 类名（root / item / prev / next / jumper / sizeList）。
   * @version 3.10.0
   */
  classNames?: SemanticClassNames<PaginationSemanticKey>;
  /**
   * @en Global Semantic DOM styles for Pagination (root / item / prev / next / jumper / sizeList).
   * @cn Pagination 全局 Semantic DOM 样式（root / item / prev / next / jumper / sizeList）。
   * @version 3.10.0
   */
  styles?: SemanticStyles<PaginationSemanticKey>;
}

type BadgeConfig = {
  /**
   * @en Global Semantic DOM classNames for Badge (root / badge).
   * @cn Badge 全局 Semantic DOM 类名（root / badge）。
   * @version 3.10.0
   */
  classNames?: SemanticClassNames<BadgeSemanticKey>;
  /**
   * @en Global Semantic DOM styles for Badge (root / badge).
   * @cn Badge 全局 Semantic DOM 样式（root / badge）。
   * @version 3.10.0
   */
  styles?: SemanticStyles<BadgeSemanticKey>;
}

type CardConfig = {
  /**
   * @en Global Semantic DOM classNames for Card (root / header / headerContent / headerExtra / body / footer).
   * @cn Card 全局 Semantic DOM 类名（root / header / headerContent / headerExtra / body / footer）。
   * @version 3.10.0
   */
  classNames?: SemanticClassNames<CardSemanticKey>;
  /**
   * @en Global Semantic DOM styles for Card (root / header / headerContent / headerExtra / body / footer).
   * @cn Card 全局 Semantic DOM 样式（root / header / headerContent / headerExtra / body / footer）。
   * @version 3.10.0
   */
  styles?: SemanticStyles<CardSemanticKey>;
}

type CarouselConfig = {
  /**
   * @en Global Semantic DOM classNames for Carousel (root / slider / item / indicator / indicatorItem / arrow).
   * @cn Carousel 全局 Semantic DOM 类名（root / slider / item / indicator / indicatorItem / arrow）。
   * @version 3.10.0
   */
  classNames?: SemanticClassNames<CarouselSemanticKey>;
  /**
   * @en Global Semantic DOM styles for Carousel (root / slider / item / indicator / indicatorItem / arrow).
   * @cn Carousel 全局 Semantic DOM 样式（root / slider / item / indicator / indicatorItem / arrow）。
   * @version 3.10.0
   */
  styles?: SemanticStyles<CarouselSemanticKey>;
}

type CollapseConfig = {
  /**
   * @en Global Semantic DOM classNames for Collapse (root / header / title / extra / content / icon).
   * @cn Collapse 全局 Semantic DOM 类名（root / header / title / extra / content / icon）。
   * @version 3.10.0
   */
  classNames?: SemanticClassNames<CollapseSemanticKey>;
  /**
   * @en Global Semantic DOM styles for Collapse (root / header / title / extra / content / icon).
   * @cn Collapse 全局 Semantic DOM 样式（root / header / title / extra / content / icon）。
   * @version 3.10.0
   */
  styles?: SemanticStyles<CollapseSemanticKey>;
}

type DescriptionsConfig = {
  /**
   * @en Global Semantic DOM classNames for Descriptions (root / header / title / extra / table / label / value).
   * @cn Descriptions 全局 Semantic DOM 类名（root / header / title / extra / table / label / value）。
   * @version 3.10.0
   */
  classNames?: SemanticClassNames<DescriptionsSemanticKey>;
  /**
   * @en Global Semantic DOM styles for Descriptions (root / header / title / extra / table / label / value).
   * @cn Descriptions 全局 Semantic DOM 样式（root / header / title / extra / table / label / value）。
   * @version 3.10.0
   */
  styles?: SemanticStyles<DescriptionsSemanticKey>;
}

type ImageConfig = {
  /**
   * @en Global Semantic DOM classNames for Image (root / img / placeholder / error).
   * @cn Image 全局 Semantic DOM 类名（root / img / placeholder / error）。
   * @version 3.10.0
   */
  classNames?: SemanticClassNames<ImageSemanticKey>;
  /**
   * @en Global Semantic DOM styles for Image (root / img / placeholder / error).
   * @cn Image 全局 Semantic DOM 样式（root / img / placeholder / error）。
   * @version 3.10.0
   */
  styles?: SemanticStyles<ImageSemanticKey>;
}

type ListConfig = {
  /**
   * @en Global Semantic DOM classNames for List (root / item / footer).
   * @cn List 全局 Semantic DOM 类名（root / item / footer）。
   * @version 3.10.0
   */
  classNames?: SemanticClassNames<ListSemanticKey>;
  /**
   * @en Global Semantic DOM styles for List (root / item / footer).
   * @cn List 全局 Semantic DOM 样式（root / item / footer）。
   * @version 3.10.0
   */
  styles?: SemanticStyles<ListSemanticKey>;
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
  /**
   * @en Global configuration for Gap component
   * @cn Gap组件的全局配置
   * @version 3.10.0
   */
  gap?: GapConfig;
  /**
   * @en Global configuration for Grid component
   * @cn Grid组件的全局配置
   * @version 3.10.0
   */
  grid?: GridConfig;
  /**
   * @en Global configuration for Steps component
   * @cn Steps组件的全局配置
   * @version 3.10.0
   */
  steps?: StepsConfig;
  /**
   * @en Global configuration for Menu component
   * @cn Menu组件的全局配置
   * @version 3.10.0
   */
  menu?: MenuConfig;
  /**
   * @en Global configuration for Dropdown component
   * @cn Dropdown组件的全局配置
   * @version 3.10.0
   */
  dropdown?: DropdownConfig;
  /**
   * @en Global configuration for Breadcrumb component
   * @cn Breadcrumb组件的全局配置
   * @version 3.10.0
   */
  breadcrumb?: BreadcrumbConfig;
  /**
   * @en Global configuration for Pagination component
   * @cn Pagination组件的全局配置
   * @version 3.10.0
   */
  pagination?: PaginationConfig;
  /**
   * @en Global configuration for Badge component
   * @cn Badge组件的全局配置
   * @version 3.10.0
   */
  badge?: BadgeConfig;
  /**
   * @en Global configuration for Card component
   * @cn Card组件的全局配置
   * @version 3.10.0
   */
  card?: CardConfig;
  /**
   * @en Global configuration for Carousel component
   * @cn Carousel组件的全局配置
   * @version 3.10.0
   */
  carousel?: CarouselConfig;
  /**
   * @en Global configuration for Collapse component
   * @cn Collapse组件的全局配置
   * @version 3.10.0
   */
  collapse?: CollapseConfig;
  /**
   * @en Global configuration for Descriptions component
   * @cn Descriptions组件的全局配置
   * @version 3.10.0
   */
  descriptions?: DescriptionsConfig;
  /**
   * @en Global configuration for Image component
   * @cn Image组件的全局配置
   * @version 3.10.0
   */
  image?: ImageConfig;
  /**
   * @en Global configuration for List component
   * @cn List组件的全局配置
   * @version 3.10.0
   */
  list?: ListConfig;
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
  gap: {},
  grid: {},
  steps: {},
  menu: {},
  dropdown: {},
  breadcrumb: {},
  pagination: {},
  badge: {},
  card: {},
  carousel: {},
  collapse: {},
  descriptions: {},
  image: {},
  list: {},
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
