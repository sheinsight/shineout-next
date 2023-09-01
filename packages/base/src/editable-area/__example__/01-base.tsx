/**
 * cn - 基本用法
 *    --
 * en - Basic
 *    --
 */
import React from 'react';
import { EditableArea } from '@sheinx/base';
import { useEditableAreaStyle, useInnerTitleStyle, useTextareaStyle } from '@sheinx/shineout-style';

export default () => {
  const editableAreaStyle = useEditableAreaStyle();
  const textareaStyle = useTextareaStyle();
  const innerStyle = useInnerTitleStyle();
  return (
    <div>
      <EditableArea
        width={200}
        defaultValue={'hello world'}
        clearable
        placeholder={'please input something'}
        innerTitle={"I'm inner title"}
        jssStyle={{
          editableArea: editableAreaStyle,
          textarea: textareaStyle,
          innerTitle: innerStyle,
        }}
      />
    </div>
  );
};
