import React from 'react';
import type { BorderWidth } from './util';

export interface BorderInfo {
  borderWidth: BorderWidth;
  borderRadius: string;
}

const DEFAULT_BORDER_INFO: BorderInfo = {
  borderWidth: [0, 0, 0, 0],
  borderRadius: '0px',
};

const parseBorderWidth = (value: string) => {
  const width = Number.parseFloat(value);
  return Number.isFinite(width) ? width : 0;
};

const useBorderSize = (host: HTMLElement | null) => {
  const [borderInfo, setBorderInfo] = React.useState<BorderInfo>(DEFAULT_BORDER_INFO);

  React.useEffect(() => {
    if (!host) {
      setBorderInfo(DEFAULT_BORDER_INFO);
      return;
    }
    const view = host.ownerDocument.defaultView;
    if (!view) {
      setBorderInfo(DEFAULT_BORDER_INFO);
      return;
    }
    const style = view.getComputedStyle(host);
    setBorderInfo({
      borderWidth: [
        parseBorderWidth(style.borderTopWidth),
        parseBorderWidth(style.borderRightWidth),
        parseBorderWidth(style.borderBottomWidth),
        parseBorderWidth(style.borderLeftWidth),
      ],
      borderRadius: style.borderRadius || '0px',
    });
  }, [host]);

  return borderInfo;
};

export default useBorderSize;
