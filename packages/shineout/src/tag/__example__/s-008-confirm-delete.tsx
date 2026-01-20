/**
 * cn - 确认删除
 *    -- 通过 Modal.confirm 在删除前进行确认,onClose 返回 Promise 来控制删除流程
 * en - Confirm Delete
 *    -- Use Modal.confirm to confirm before deletion, onClose returns Promise to control the deletion process
 */

import { useState } from 'react';
import { Tag, Modal } from 'shineout';

export default () => {
  const [tags, setTags] = useState(['Tag 1', 'Tag 2', 'Tag 3']);

  const remove = (removedTag: string) => {
    const t = tags.filter((tag: string) => tag !== removedTag);
    setTags(t);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
        {tags.map((a) => (
          <Tag
            key={a}
            onClose={() => {
              return new Promise((resolve, reject) => {
                Modal.confirm({
                  title: '确认删除',
                  content: `确定要删除标签 "${a}" 吗？`,
                  onOk: () => {
                    remove(a);
                    resolve(true);
                  },
                  onCancel: () => {
                    reject();
                  },
                });
              });
            }}
          >
            {a}
          </Tag>
        ))}
      </div>
    </div>
  );
};
