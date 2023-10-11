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
  return (
    <div>
      <EditableArea
        width={200}
        bordered
        defaultValue={'hello world'}
        clearable
        placeholder={'please input something'}
        innerTitle={"I'm inner title"}
        jssStyle={{
          editableArea: useEditableAreaStyle,
          textarea: useTextareaStyle,
          innerTitle: useInnerTitleStyle,
        }}
      />
    </div>
  );
};
