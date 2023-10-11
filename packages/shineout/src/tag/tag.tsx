import React from 'react';
import { Tag as UnStyledTag } from '@sheinx/base';
import { useInputStyle, useTagStyle } from '@sheinx/shineout-style';
import { TagProps } from './tag.type';

const jssStyle = {
  tag: useTagStyle,
  input: useInputStyle,
};
const Tag = (props: TagProps) => {
  return <UnStyledTag {...props} jssStyle={jssStyle}></UnStyledTag>;
};

Tag.displayName = 'ShineoutTag';

export default Tag;
