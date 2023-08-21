import React, { useMemo } from 'react';
import { Tag as UnStyledTag } from '@sheinx/base';
import { useTagStyle, useInputStyle } from '@sheinx/shineout-style';
import { TagProps } from './tag.type';

const Tag = (props: TagProps) => {
  const tagStyle = useTagStyle();
  const inputStyle = useInputStyle();
  const jssStyle = useMemo(() => ({ tag: tagStyle, input: inputStyle }), [tagStyle]);
  return <UnStyledTag {...props} jssStyle={jssStyle}></UnStyledTag>;
};

Tag.displayName = 'ShineoutTag';

export default Tag;
