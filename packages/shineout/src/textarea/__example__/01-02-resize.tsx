/**
 * cn - 拖动高度
 *    -- 设置 resize 属性可以拖动改变高度
 * en - resize
 *    -- Set the resize property to change the height by dragging
 */
import { Textarea } from 'shineout';

export default () => {
  return <Textarea placeholder='input something' resize />;
};
