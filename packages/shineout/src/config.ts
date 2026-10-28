import { setConfig as setBaseConfig } from '@sheinx/base';
import { setJssConfig } from '@sheinx/shineout-style';
import { preloadMessageStyle } from './message/preload-style';

// 样式相关的配置由 shineout-style 处理，base 不依赖 shineout-style，在这里转发
export const setConfig: typeof setBaseConfig = (option) => {
  setBaseConfig(option);
  if (option && 'keepStyleSheet' in option) {
    setJssConfig({ keepStyleSheet: !!option.keepStyleSheet });
    // 和 normalize 一样在初始化时插入 Message 样式，避免第一次弹出时的开销
    if (option.keepStyleSheet) preloadMessageStyle();
  }
};
