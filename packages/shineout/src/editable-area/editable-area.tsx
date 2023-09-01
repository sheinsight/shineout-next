import { useMemo } from 'react';
import { EditableArea as UnStyledEditableArea } from '@sheinx/base';
import { useEditableAreaStyle, useInnerTitleStyle, useTextareaStyle } from '@sheinx/shineout-style';
import { BaseEditableAreaProps, EditableAreaProps } from './editable-area.type';
import useFieldCommon from '../hooks/use-field-common';

const EditableArea = (props: BaseEditableAreaProps) => {
  const editableAreaStyle = useEditableAreaStyle();
  const textareaStyle = useTextareaStyle();
  const innerTitleStyle = useInnerTitleStyle();
  const jssStyle = useMemo(
    () => ({
      editableArea: editableAreaStyle,
      textarea: textareaStyle,
      innerTitle: innerTitleStyle,
    }),
    [editableAreaStyle, innerTitleStyle, textareaStyle],
  );

  return <UnStyledEditableArea jssStyle={jssStyle} {...props} />;
};

export default (props: EditableAreaProps) => {
  return useFieldCommon<BaseEditableAreaProps, BaseEditableAreaProps['value']>(props, EditableArea);
};
