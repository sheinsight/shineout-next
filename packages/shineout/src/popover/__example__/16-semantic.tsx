/**
 * cn - Semantic DOM
 *    -- 通过 `classNames` 和 `styles` 两个 prop 精准定制 Popover 内部 DOM 节点（root / arrow / content）。可用 key 列表见组件 Semantic DOM 章节。
 * en - Semantic DOM
 *    -- Use the `classNames` and `styles` props to customize internal DOM nodes (root / arrow / content) precisely. See the Semantic DOM section for the full key list.
 */
import { Button, Popover } from 'shineout';

export default () => {
  return (
    <Button mode='outline'>
      Hover me
      <Popover
        classNames={{
          arrow: 'my-popover-arrow',
        }}
        styles={{
          content: { padding: 16, borderRadius: 8, background: '#f0f7ff' },
          arrow: { background: '#f0f7ff' },
        }}
      >
        Custom styled popover
      </Popover>
    </Button>
  );
};
