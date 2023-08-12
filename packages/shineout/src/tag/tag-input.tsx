import React, { useMemo } from 'react';
import { TagInput as UnStyledTagInput } from '@sheinx/base';
import { useTagStyle, useInputStyle } from '@sheinx/shineout-style';
import { TagInputProps } from './tag.type';

const TagInput = (props: TagInputProps) => {
  const tagStyle = useTagStyle();
  const inputStyle = useInputStyle();
  const jssStyle = useMemo(() => ({ tag: tagStyle, input: inputStyle }), [tagStyle]);
  return <UnStyledTagInput {...props} jssStyle={jssStyle}></UnStyledTagInput>;
};

TagInput.displayName = 'ShineoutTag';

export default TagInput;
