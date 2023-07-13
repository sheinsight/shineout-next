import { util } from '@sheinx/hooks';
import { proxy, subscribe } from 'valtio';

interface ConfigOption {
  // cssModule: boolean;
  // prefix: string;
  // locale: LanType;
  // autoSSL: boolean;
  // delay?: number;
  // scrollRatio?: number;
  // trim?: boolean;
  // spin?: string;
  // caret?: CartType;
  // direction: Direction;
  popupContainer?: HTMLElement | (() => HTMLElement);
}
let config: ConfigOption = {
  popupContainer: undefined,
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
