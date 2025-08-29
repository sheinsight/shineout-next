import { EditableArea as UnStyledEditableArea } from '@sheinx/base';
import { useEditableAreaStyle, useInnerTitleStyle, useTextareaStyle } from '@sheinx/shineout-style';
import { BaseEditableAreaProps, EditableAreaProps } from './editable-area.type';
import useFieldCommon from '../hooks/use-field-common';

const jssStyle = {
  editableArea: useEditableAreaStyle,
  textarea: useTextareaStyle,
  innerTitle: useInnerTitleStyle,
};
const EditableArea = (props: BaseEditableAreaProps) => {
  return <UnStyledEditableArea jssStyle={jssStyle} {...props} />;
};

EditableArea.displayName = 'ShineoutEditableArea';

export default (props: EditableAreaProps) => {
  return useFieldCommon(props, EditableArea);
};
