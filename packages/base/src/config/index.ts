import { util } from '@sheinx/hooks';
import { create } from '@shined/reactive';
import { getSnapshot } from '@shined/reactive/vanilla';
import { LanType, Direction } from './locale/Props';
import { SpinNameType } from '../spin/spin.type';

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
}

export interface ConfigOption {
  prefix: string;
  locale: LanType;
  delay?: number;
  trim?: boolean;
  spin?: SpinConfig;
  tooltip?: TooltipConfig;
  direction: Direction;
  popupContainer?: HTMLElement | null | (() => HTMLElement | null);
}

const processEnv: Record<string, any> = typeof process !== 'undefined' ? process?.env : {};
export let config: ConfigOption = {
  prefix: 'soui',
  locale: (processEnv.LOCALE as LanType) || 'en-US',
  delay: 400,
  trim: undefined,
  spin: 'ring',
  tooltip: undefined,
  direction: 'ltr',
  popupContainer: null,
};

const state = create<ConfigOption>(config);

state.subscribe(() => {
  config = getSnapshot(state.mutate);
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
