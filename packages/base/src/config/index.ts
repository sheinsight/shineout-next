import { util } from '@sheinx/hooks';
import { create } from '@shined/reactive';
import { getSnapshot } from '@shined/reactive/vanilla';
import { CaretType } from '../icons/caret.type';
import { LanType, Direction } from './locale/Props';

export interface ConfigOption {
  prefix: string;
  locale: LanType;
  delay?: number;
  trim?: boolean;
  spin?: string;
  caret?: CaretType;
  direction: Direction;
  popupContainer?: HTMLElement | null | (() => HTMLElement | null);
}

const processEnv: Record<string, any> = typeof process !== 'undefined' ? process?.env : {};
export let config: ConfigOption = {
  prefix: 'so',
  locale: (processEnv.LOCALE as LanType) || 'en-US',
  delay: 0,
  trim: undefined,
  spin: undefined,
  caret: 'line',
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
    if (value && key in state) {
      const k = key as keyof ConfigOption;
      // @ts-ignore
      state[k] = value;
    }
  }
};

export { setLocale, getLocale } from './locale/index';
