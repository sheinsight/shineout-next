import { util } from '@sheinx/hooks';
import { proxy, subscribe, useSnapshot } from 'valtio';
import { CaretType } from '../icons/caret.type';
import { INTERNAL_Snapshot as Snapshot } from 'valtio/vanilla';
import { LanType } from './locale/Props';

export interface ConfigOption {
  // cssModule: boolean;
  // prefix: string;
  locale: LanType;
  // autoSSL: boolean;
  // delay?: number;
  // scrollRatio?: number;
  // trim?: boolean;
  // spin?: string;
  caret?: CaretType;
  // direction: Direction;
  popupContainer?: HTMLElement | null | (() => HTMLElement | null);
}

let processEnv: Record<string, any> = {};
try {
  processEnv = process?.env;
} catch (error) {
  processEnv = {};
}
export let config: ConfigOption = {
  popupContainer: undefined,
  caret: 'line',
  locale: (processEnv.LOCALE as LanType) || 'zh-CN',
  // prefix: 'so',
};

const state = proxy(config);

subscribe(state, () => {
  config = state;
});

export function getDefaultContainer() {
  if (util.isFunc(config.popupContainer)) {
    const container = config.popupContainer();
    if (container instanceof HTMLElement) {
      return container;
    }
  }

  if (config.popupContainer instanceof HTMLElement) return config.popupContainer;

  return document.body;
}

export const useConfig = (): Snapshot<ConfigOption> => {
  return useSnapshot(state) as Snapshot<ConfigOption>;
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
