import React, { useEffect } from 'react';
import { util } from '@sheinx/hooks';
import { useAlertStyle, useMessageStyle } from '@sheinx/shineout-style';

let preloaded = false;

// 挂载一次 Message 用到的样式 hook 后立即卸载，配合 keepStyleSheet 让样式表常驻
// 这样第一次弹出 Message 时不用在点击回调里插入样式表
const Preload = (props: { container: HTMLElement }) => {
  useMessageStyle();
  useAlertStyle();
  useEffect(() => {
    util.ReactUnmount(props.container);
  }, []);
  return null;
};

export const preloadMessageStyle = () => {
  if (preloaded || typeof document === 'undefined') return;
  preloaded = true;
  const container = document.createElement('div');
  util.ReactRender(<Preload container={container} />, container);
};
