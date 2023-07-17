import { util } from '@sheinx/hooks';
import { proxy, subscribe, useSnapshot } from 'valtio';
import { CaretType } from '../icons/caret.type';
import { INTERNAL_Snapshot as Snapshot } from 'valtio/vanilla';

export interface ConfigOption {
  // cssModule: boolean;
  // prefix: string;
  // locale: LanType;
  // autoSSL: boolean;
  // delay?: number;
  // scrollRatio?: number;
  // trim?: boolean;
  // spin?: string;
  caret?: CaretType;
  // direction: Direction;
  popupContainer?: HTMLElement | (() => HTMLElement);
}
let config: ConfigOption = {
  popupContainer: undefined,
  caret: 'line',
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
