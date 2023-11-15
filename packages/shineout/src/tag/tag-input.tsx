import React from 'react';
import { TagInput as UnStyledTagInput } from '@sheinx/base';
import { useInputStyle, useTagStyle } from '@sheinx/shineout-style';
import { TagInputProps } from './tag.type';

const jssStyle = {
  tag: useTagStyle,
  input: useInputStyle,
};
const TagInput = (props: TagInputProps) => {
  return <UnStyledTagInput {...props} jssStyle={jssStyle}></UnStyledTagInput>;
};

TagInput.displayName = 'ShineoutTag';

export default TagInput;
