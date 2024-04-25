/**
 * cn - 可删除和添加标签
 *    -- 通过数组生成tags，动态增改
 * en - Delete and add tags
 *    -- Generate tags through arrays, dynamically increase and change
 */

import { useState } from 'react';
import { Tag } from 'shineout';
export default () => {
  const [tags, setTags] = useState(['Tag 1', 'Tag 2', 'Tag 3']);
  const [inputVisible, setInputVisible] = useState(false);

  const remove = (removedTag: string) => {
    const t = tags.filter((tag: string) => tag !== removedTag);
    setTags(t);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputBlur = (value: string) => {
    let newTags = tags;
    if (value && tags.indexOf(value) === -1) {
      newTags = [...tags, value];
    }
    setTags(newTags);
    setInputVisible(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', height: 24 }}>
        {tags.map((a) => (
          <Tag key={a} disabled={a === 'Tag 3' ? true : false} onClose={() => remove(a)}>
            {a}
          </Tag>
        ))}

        {inputVisible ? (
          <Tag.Input style={{ marginLeft: 8 }} onBlur={handleInputBlur} size='small' />
        ) : (
          <Tag
            style={{ cursor: 'pointer', borderStyle: 'dashed' }}
            onClick={showInput}
            mode='outline'
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ color: '#666C7C', marginInlineEnd: 4 }}>+ </div>
              <div>Add Tag</div>
            </div>
          </Tag>
        )}
      </div>
    </div>
  );
};
