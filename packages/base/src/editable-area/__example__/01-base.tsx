/**
 * cn - 基本用法
 *    --
 * en - Basic
 *    --
 */
import React from 'react';
import {EditableArea} from '@sheinx/base';
import {useEditableAreaStyle} from '@sheinx/shineout-style';

export default () => {
  const editableAreaStyle = useEditableAreaStyle();
  return (
    <div>
      <EditableArea jssStyle={{ editableArea: editableAreaStyle }} />
    </div>
  );
};
