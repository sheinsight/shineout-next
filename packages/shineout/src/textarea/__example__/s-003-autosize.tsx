/**
 * cn - 自适应高度
 *    -- autosize 为 true 时， rows 为最小高度，如果要设置最大高度，使用 maxHeight 即可
 * en - 自适应高度
 *    -- autosize 为 true 时， rows 为最小高度，如果要设置最大高度，使用 maxHeight 即可
 */
import { Textarea } from 'shineout';
export default () => {
  return <Textarea autosize placeholder='input something' maxHeight={150} />;
};
