/**
 * cn - 可删除和添加标签
 *    -- 通过数组生成tags,动态增改
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
      {tags.map((a) => (
        <Tag key={a} onClose={() => remove(a)}>
          {a}
        </Tag>
      ))}
      {inputVisible ? (
        <Tag.Input onBlur={handleInputBlur} />
      ) : (
        <Tag onClick={showInput} style={{ background: '#fff', borderStyle: 'dashed' }}>
          + New Tag
        </Tag>
      )}
    </div>
  );
};
