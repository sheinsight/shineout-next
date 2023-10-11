/**
 * cn - 基本用法
 *    --基础 Tag 用法
 * en - Base
 *    --Base Tag
 */

import { Transfer } from '@sheinx/base';
import { useTransferStyle, useButtonStyle } from '@sheinx/shineout-style';

export default () => {
  const jssStyle = {
    transfer: useTransferStyle,
    button: useButtonStyle,
  };

  return <Transfer jssStyle={jssStyle}></Transfer>;
};
