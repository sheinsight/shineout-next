/**
 * cn - 基本用法
 *    --基础 Tag 用法
 * en - Base
 *    --Base Tag
 */
import { useState } from 'react';
import { Tag } from '@sheinx/base';
import { useInputStyle, useTagStyle } from '@sheinx/shineout-style';

export default () => {
  const jssStyle = {
    tag: useTagStyle,
    input: useInputStyle,
  };

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
    console.log(newTags);
    setTags(newTags);
    setInputVisible(false);
  };

  return (
    <div>
      {tags.map((a) => (
        <Tag jssStyle={jssStyle} key={a} onClose={() => remove(a)}>
          {a}
        </Tag>
      ))}
      {inputVisible ? (
        <Tag.Input jssStyle={jssStyle} onBlur={handleInputBlur} />
      ) : (
        <Tag
          jssStyle={jssStyle}
          onClick={showInput}
          style={{ background: '#fff', borderStyle: 'dashed' }}
        >
          + New Tag
        </Tag>
      )}
    </div>
  );
};
